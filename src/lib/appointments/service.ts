import "server-only";
import { randomUUID } from "node:crypto";
import { resolveServiceLabel } from "@/lib/service-resolve";
import { database, type SqlRow as Row, type SqlTransaction as Transaction } from "./db";
import {
  AppointmentError,
  appointmentTime,
  bookingStatuses,
  vietnamDate,
  vietnamTime,
  type Booking,
  type BookingReceipt,
  type BookingStatus,
  type PublicSlot,
} from "./types";

const active = "('pending','confirmed','completed')";
async function lockScheduleDates(tx: Transaction, startsAtValues: string[]) {
  const dates = [...new Set(startsAtValues.map((value) => vietnamDate(new Date(value))))].sort();
  for (const date of dates) {
    await tx.execute({
      sql: "INSERT INTO appointment_schedule_locks(date,version) VALUES(?,0) ON CONFLICT(date) DO NOTHING",
      args: [date],
    });
    await tx.execute({
      sql: "UPDATE appointment_schedule_locks SET version=version+1 WHERE date=?",
      args: [date],
    });
  }
}
const parseSlot = (row: Row): PublicSlot => ({
  id: String(row.id),
  startsAt: String(row.starts_at),
  date: vietnamDate(new Date(String(row.starts_at))),
  time: vietnamTime(new Date(String(row.starts_at))),
});
function parseBooking(row: Row): Booking {
  return {
    id: String(row.id),
    reference: String(row.reference),
    name: String(row.name),
    contact: String(row.contact),
    email: String(row.email),
    service: String(row.service),
    note: String(row.note),
    adminNote: String(row.admin_note),
    mode: row.mode as Booking["mode"],
    status: row.status as BookingStatus,
    slotId: row.slot_id ? String(row.slot_id) : null,
    startsAt: String(row.starts_at),
    date: vietnamDate(new Date(String(row.starts_at))),
    time: vietnamTime(new Date(String(row.starts_at))),
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
    version: Number(row.version),
  };
}
function receipt(row: Row): BookingReceipt {
  const booking = parseBooking(row);
  return {
    reference: booking.reference,
    status: booking.status,
    date: booking.date,
    time: booking.time,
    service: booking.service,
  };
}
function text(value: unknown, max: number, label: string, required = false) {
  if (
    typeof value !== "string" ||
    value.length > max ||
    (required && !value.trim())
  )
    throw new AppointmentError(`${label} không hợp lệ.`);
  return value.trim();
}

export async function getAvailableSlots(): Promise<PublicSlot[]> {
  const db = await database();
  const result = await db.execute({
    sql: `SELECT s.* FROM appointment_slots s WHERE active=1 AND starts_at>? AND starts_at<? AND NOT EXISTS(SELECT 1 FROM appointments a WHERE a.status IN ${active} AND a.starts_at<s.ends_at AND a.ends_at>s.starts_at) ORDER BY starts_at LIMIT 1500`,
    args: [
      new Date().toISOString(),
      new Date(Date.now() + 90 * 86400000).toISOString(),
    ],
  });
  return result.rows.map(parseSlot);
}

export async function getAdminSlots() {
  const db = await database();
  const result = await db.execute({
    sql: `SELECT s.*, EXISTS(SELECT 1 FROM appointments a WHERE a.status IN ${active} AND a.starts_at<s.ends_at AND a.ends_at>s.starts_at) AS occupied FROM appointment_slots s WHERE active=1 AND starts_at>? ORDER BY starts_at LIMIT 3000`,
    args: [new Date(Date.now() - 90 * 86400000).toISOString()],
  });
  return result.rows.map((row) => ({
    ...parseSlot(row),
    occupied: Boolean(row.occupied),
  }));
}

export async function createSlots(date: unknown, times: unknown) {
  if (!Array.isArray(times) || times.length < 1 || times.length > 27)
    throw new AppointmentError("Chọn từ 1 đến 27 khung giờ.");
  const windows = [...new Set(times)].map((time) =>
    appointmentTime(date, time),
  );
  const db = await database();
  const tx = await db.transaction("write");
  try {
    for (const window of windows) {
      await tx.execute({
        sql: "INSERT INTO appointment_slots(id,starts_at,ends_at,active) VALUES(?,?,?,1) ON CONFLICT(starts_at) DO UPDATE SET active=1",
        args: [randomUUID(), window.startsAt, window.endsAt],
      });
    }
    await tx.commit();
  } finally {
    tx.close();
  }
}

export async function closeSlot(id: string) {
  const db = await database();
  const result = await db.execute({
    sql: `UPDATE appointment_slots SET active=0 WHERE id=? AND NOT EXISTS(SELECT 1 FROM appointments WHERE slot_id=? AND status IN ${active})`,
    args: [id, id],
  });
  if (!result.rowsAffected)
    throw new AppointmentError(
      "Khung giờ đã có lịch hẹn hoặc đang được giữ. Vui lòng xử lý lịch hẹn trước.",
      409,
    );
}

async function availableSlot(tx: Transaction, id: string, excludeId = "") {
  const result = await tx.execute({
    sql: "SELECT s.* FROM appointment_slots s WHERE s.id=? AND s.active=1 AND s.starts_at>?",
    args: [id, new Date().toISOString()],
  });
  if (!result.rows.length)
    throw new AppointmentError(
      "Khung giờ này không còn trống. Vui lòng chọn giờ khác.",
      409,
    );
  const slot = result.rows[0];
  await lockScheduleDates(tx, [String(slot.starts_at)]);
  const conflict = await tx.execute({
    sql: `SELECT id FROM appointments WHERE id<>? AND status IN ${active} AND starts_at<? AND ends_at>? LIMIT 1`,
    args: [excludeId, String(slot.ends_at), String(slot.starts_at)],
  });
  if (conflict.rows.length)
    throw new AppointmentError(
      "Khung giờ này bị trùng với một lịch hẹn khác. Vui lòng chọn giờ khác.",
      409,
    );
  return slot;
}

/**
 * Overseas visitors book from another time zone. Record the language and time
 * zone they booked from at the top of the note so Sarah sees it in the admin
 * without a schema change. Only added when it is informative.
 */
function withClientContext(note: string, input: Record<string, unknown>) {
  const lang = input.lang === "en" ? "EN" : "";
  let zone = "";
  if (typeof input.timezone === "string" && input.timezone.length <= 64) {
    try {
      new Intl.DateTimeFormat("en", { timeZone: input.timezone });
      if (!["Asia/Ho_Chi_Minh", "Asia/Saigon"].includes(input.timezone))
        zone = input.timezone;
    } catch {
      zone = "";
    }
  }
  const tag = [lang, zone].filter(Boolean).join(" · ");
  if (!tag) return note;
  const tagged = `[Khách đặt từ: ${tag}]${note ? `\n${note}` : ""}`;
  return tagged.slice(0, 3000);
}

export async function createBooking(
  input: Record<string, unknown>,
): Promise<BookingReceipt> {
  const name = text(input.name, 100, "Họ tên", true),
    contact = text(input.contact, 100, "Liên hệ", true),
    email = text(input.email ?? "", 200, "Email"),
    serviceInput = text(input.service, 100, "Dịch vụ", true),
    noteText = text(input.note ?? "", 3000, "Ghi chú");
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    throw new AppointmentError("Email không hợp lệ.");
  const service = resolveServiceLabel(serviceInput);
  if (!service) throw new AppointmentError("Dịch vụ không hợp lệ.");
  const note = withClientContext(noteText, input);
  if (input.consent !== true)
    throw new AppointmentError(
      "Bạn cần đồng ý để Sarah liên hệ xác nhận lịch.",
    );
  const requestKey = text(input.requestKey, 80, "Mã yêu cầu", true);
  if (!/^[a-f0-9-]{36}$/i.test(requestKey))
    throw new AppointmentError("Mã yêu cầu không hợp lệ.");
  if (input.mode !== "slot" && input.mode !== "proposal")
    throw new AppointmentError("Chọn hình thức đặt hẹn.");
  const mode = input.mode;
  const proposedWindow =
    mode === "proposal" ? appointmentTime(input.date, input.time) : null;
  const db = await database();
  const tx = await db.transaction("write");
  try {
    const existing = await tx.execute({
      sql: "SELECT * FROM appointments WHERE request_key=?",
      args: [requestKey],
    });
    if (existing.rows[0]) {
      await tx.commit();
      return receipt(existing.rows[0]);
    }
    const slot = mode === "slot"
      ? await availableSlot(tx, text(input.slotId, 80, "Khung giờ", true))
      : null;
    const startsAt = String(slot?.starts_at ?? proposedWindow!.startsAt),
      endsAt = String(slot?.ends_at ?? proposedWindow!.endsAt);
    const now = new Date().toISOString();
    const id = randomUUID(),
      reference = `SR-${randomUUID().replaceAll("-", "").slice(0, 12).toUpperCase()}`;
    const result = await tx.execute({
      sql: `INSERT INTO appointments(id,reference,request_key,name,contact,email,service,note,mode,status,slot_id,starts_at,ends_at,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) RETURNING *`,
      args: [
        id,
        reference,
        requestKey,
        name,
        contact,
        email,
        service,
        note,
        mode,
        mode === "slot" ? "pending" : "proposed",
        slot ? String(slot.id) : null,
        startsAt,
        endsAt,
        now,
        now,
      ],
    });
    await tx.commit();
    return receipt(result.rows[0]);
  } finally {
    tx.close();
  }
}

export async function listBookings(): Promise<Booking[]> {
  const db = await database();
  const result = await db.execute(
    "SELECT * FROM appointments ORDER BY created_at DESC",
  );
  return result.rows.map(parseBooking);
}

export async function updateBooking(
  id: string,
  input: Record<string, unknown>,
): Promise<Booking> {
  if (
    !bookingStatuses.includes(input.status as BookingStatus) ||
    !Number.isInteger(input.version)
  )
    throw new AppointmentError("Trạng thái hoặc phiên bản không hợp lệ.");
  const status = input.status as BookingStatus;
  const adminNote =
    input.adminNote === undefined
      ? undefined
      : text(input.adminNote, 5000, "Ghi chú nội bộ");
  const db = await database();
  const tx = await db.transaction("write");
  try {
    const found = await tx.execute({
      sql: "SELECT * FROM appointments WHERE id=?",
      args: [id],
    });
    const row = found.rows[0];
    if (!row) throw new AppointmentError("Không tìm thấy lịch hẹn.", 404);
    if (Number(row.version) !== input.version)
      throw new AppointmentError(
        "Lịch hẹn đã thay đổi. Tải dữ liệu mới nhất rồi thử lại.",
        409,
      );
    if (status === "proposed" && row.mode !== "proposal")
      throw new AppointmentError(
        "Lịch đặt giờ trống không thể chuyển thành đề xuất.",
      );
    if (status === "completed" && row.status !== "confirmed")
      throw new AppointmentError(
        "Chỉ đánh dấu hoàn tất sau khi lịch đã được xác nhận.",
      );
    if (row.status === "cancelled" || row.status === "completed")
      throw new AppointmentError(
        "Lịch đã kết thúc. Hãy tạo một yêu cầu mới nếu cần đặt lại.",
        409,
      );
    let startsAt = String(row.starts_at),
      endsAt = String(row.ends_at),
      slotId = row.slot_id ? String(row.slot_id) : null;
    if (input.date !== undefined || input.time !== undefined) {
      const window = appointmentTime(input.date, input.time);
      startsAt = window.startsAt;
      endsAt = window.endsAt;
    }
    if (status === "confirmed" || status === "pending") {
      if (new Date(startsAt).getTime() <= Date.now())
        throw new AppointmentError(
          "Thời gian đã qua. Chọn giờ mới trước khi xác nhận.",
        );
      await tx.execute({
        sql: "INSERT INTO appointment_slots(id,starts_at,ends_at,active) VALUES(?,?,?,1) ON CONFLICT(starts_at) DO UPDATE SET active=1",
        args: [randomUUID(), startsAt, endsAt],
      });
      const slot = await tx.execute({
        sql: "SELECT id FROM appointment_slots WHERE starts_at=?",
        args: [startsAt],
      });
      slotId = String(slot.rows[0].id);
      await lockScheduleDates(tx, [String(row.starts_at), startsAt]);
      await availableSlot(tx, slotId, id);
    } else if (status === "proposed") {
      slotId = null;
    }
    const result = await tx.execute({
      sql: "UPDATE appointments SET status=?,starts_at=?,ends_at=?,slot_id=?,admin_note=?,updated_at=?,version=version+1 WHERE id=? AND version=? RETURNING *",
      args: [
        status,
        startsAt,
        endsAt,
        slotId,
        adminNote ?? String(row.admin_note),
        new Date().toISOString(),
        id,
        Number(input.version),
      ],
    });
    await tx.commit();
    return parseBooking(result.rows[0]);
  } finally {
    tx.close();
  }
}

import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { execFileSync } from "node:child_process";
import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import pg from "pg";

const postgresTestUrl = process.env.TEST_POSTGRES_URL;
const schema = `appointments_test_${randomUUID().replaceAll("-", "")}`;
const postgres = postgresTestUrl
  ? new pg.Pool({ connectionString: postgresTestUrl })
  : null;
if (postgres && postgresTestUrl) {
  const url = new URL(postgresTestUrl);
  url.searchParams.set("options", `-c search_path=${schema}`);
  await postgres.query(`CREATE SCHEMA ${schema}`);
  process.env.BOOKING_DATABASE_URL = url.href;
} else {
  await mkdir(".test-data", { recursive: true });
  process.env.BOOKING_DATABASE_URL = `file:${resolve(".test-data", `appointments-${randomUUID()}.db`)}`;
}
const {
  createSlots,
  getAvailableSlots,
  createBooking,
  listBookings,
  updateBooking,
  closeSlot,
} = await import("../src/lib/appointments/service");
const { consumeLimit, createAdmin, loginAdmin, sessionAdmin, revokeSession } =
  await import("../src/lib/appointments/auth");
const { database } = await import("../src/lib/appointments/db");
const testDatabase = database();
const future = new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10);
const data = {
  name: "Khách kiểm thử",
  contact: "0900000000",
  email: "test@example.com",
  service: "Lenormand",
  note: "Riêng tư",
  consent: true,
};

try {
  await testDatabase;
  await consumeLimit("deployment-test", 2, 60000);
  await consumeLimit("deployment-test", 2, 60000);
  await assert.rejects(
    () => consumeLimit("deployment-test", 2, 60000),
    { status: 429 },
  );
  await assert.rejects(() =>
    createBooking({
      ...data,
      mode: "proposal",
      date: "2000-01-01",
      time: "09:00",
      requestKey: randomUUID(),
    }),
  );
  await assert.rejects(() =>
    createBooking({
      ...data,
      name: " ",
      mode: "proposal",
      date: future,
      time: "09:00",
      requestKey: randomUUID(),
    }),
  );
  await assert.rejects(() =>
    createBooking({
      ...data,
      consent: false,
      mode: "proposal",
      date: future,
      time: "09:00",
      requestKey: randomUUID(),
    }),
  );
  await createSlots(future, ["09:00", "10:00", "11:00"]);
  let slots = await getAvailableSlots();
  assert.equal(slots.length, 3);
  const request = {
    ...data,
    mode: "slot",
    slotId: slots[0].id,
    requestKey: randomUUID(),
  };
  const competing = await Promise.allSettled([
    createBooking(request),
    createBooking({ ...request, requestKey: randomUUID() }),
  ]);
  assert.equal(
    competing.filter((result) => result.status === "fulfilled").length,
    1,
    "exactly one competing reservation",
  );
  const winner = competing.find((result) => result.status === "fulfilled");
  assert(winner?.status === "fulfilled");
  const receipt = winner.value;
  assert.equal((await getAvailableSlots()).length, 2);
  assert.equal(
    "contact" in receipt,
    false,
    "public receipt must not contain private admin fields",
  );
  const saved = await listBookings();
  assert.equal(saved.length, 1);
  const booking = saved[0];
  await assert.rejects(() => closeSlot(booking.slotId!), /đã có|được giữ/);
  const cancelled = await updateBooking(booking.id, {
    status: "cancelled",
    version: booking.version,
    adminNote: "Đổi lịch",
  });
  assert.equal(
    (await getAvailableSlots()).length,
    3,
    "cancel releases reservation",
  );
  await assert.rejects(
    () =>
      updateBooking(booking.id, {
        status: "confirmed",
        version: booking.version,
      }),
    /thay đổi|mới nhất/,
  );
  const key = randomUUID();
  const proposalData = {
    ...data,
    mode: "proposal",
    date: future,
    time: "10:00",
    requestKey: key,
  };
  const proposed = await createBooking(proposalData);
  assert.equal(
    (await createBooking(proposalData)).reference,
    proposed.reference,
    "retry is idempotent",
  );
  assert.equal(
    (await getAvailableSlots()).length,
    3,
    "proposal does not hold a slot",
  );
  const proposedBooking = (await listBookings()).find(
    (item) => item.reference === proposed.reference,
  )!;
  assert.equal(proposedBooking.status, "proposed");
  const confirmed = await updateBooking(proposedBooking.id, {
    status: "confirmed",
    version: proposedBooking.version,
  });
  assert.equal(confirmed.status, "confirmed");
  assert.equal(
    (await getAvailableSlots()).length,
    2,
    "confirmation holds proposed slot",
  );
  await updateBooking(confirmed.id, {
    status: "confirmed",
    date: future,
    time: "11:00",
    version: confirmed.version,
    adminNote: "Ghi chú nội bộ",
  });
  slots = await getAvailableSlots();
  assert(
    slots.some((slot) => slot.time === "10:00"),
    "reschedule releases original slot",
  );
  const second = await createBooking({
    ...data,
    mode: "proposal",
    date: future,
    time: "11:00",
    requestKey: randomUUID(),
  });
  const secondBooking = (await listBookings()).find(
    (item) => item.reference === second.reference,
  )!;
  await assert.rejects(
    () =>
      updateBooking(secondBooking.id, {
        status: "confirmed",
        version: secondBooking.version,
      }),
    /trùng|được giữ|không còn/,
  );
  await assert.rejects(
    () => createSlots(future, ["11:30"]),
    /giờ|không hợp lệ/,
  );
  await closeSlot(slots.find((slot) => slot.time === "09:00")!.id);
  assert.equal((await getAvailableSlots()).length, 1);
  await assert.rejects(() => createAdmin("admin@example.com", "short"));
  await createAdmin("admin@example.com", "Test-password-only-2026!");
  await assert.rejects(() =>
    createAdmin("attacker@example.com", "Another-test-password!"),
  );
  await assert.rejects(() => loginAdmin("admin@example.com", "wrong-password"));
  const token = await loginAdmin(
    "admin@example.com",
    "Test-password-only-2026!",
  );
  assert.equal((await sessionAdmin(token))?.email, "admin@example.com");
  assert.equal(await sessionAdmin("invalid"), null);
  await revokeSession(token);
  assert.equal(await sessionAdmin(token), null);
  assert.equal(cancelled.adminNote, "Đổi lịch");
  const persistedCount = execFileSync(
    process.execPath,
    [
      "--conditions=react-server",
      "--import",
      "tsx",
      "--input-type=module",
      "-e",
      "const {listBookings}=await import('./src/lib/appointments/service.ts'); const {database}=await import('./src/lib/appointments/db.ts'); console.log((await listBookings()).length); (await database()).close();",
    ],
    { encoding: "utf8", env: process.env },
  );
  assert.equal(
    Number(persistedCount.trim()),
    3,
    "appointments survive a new Node process",
  );
  console.log(
    "PASS: input validation, transactional reservation race, proposals, idempotency, cancellation, stale update protection, rescheduling/conflicts, slot closure, admin bootstrap, hashed passwords and revocable sessions.",
  );
} finally {
  try {
    await testDatabase.then((db) => db.close(), () => undefined);
  } finally {
    if (postgres) {
      try {
        await postgres.query(`DROP SCHEMA ${schema} CASCADE`);
      } finally {
        await postgres.end();
      }
    }
  }
}

export const bookingStatuses = [
  "proposed",
  "pending",
  "confirmed",
  "completed",
  "cancelled",
] as const;
export type BookingStatus = (typeof bookingStatuses)[number];
export const statusLabels: Record<BookingStatus, string> = {
  proposed: "Đề xuất thời gian",
  pending: "Chờ xác nhận",
  confirmed: "Đã xác nhận",
  completed: "Hoàn tất",
  cancelled: "Đã hủy",
};
export const appointmentDurationMs = 60 * 60 * 1000;
export const appointmentStartTimes = Array.from({ length: 27 }, (_, index) => {
  const minutes = 8 * 60 + index * 30;
  return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
});
export type PublicSlot = {
  id: string;
  date: string;
  time: string;
  startsAt: string;
};
export type Booking = {
  id: string;
  reference: string;
  name: string;
  contact: string;
  email: string;
  service: string;
  note: string;
  adminNote: string;
  mode: "slot" | "proposal";
  status: BookingStatus;
  slotId: string | null;
  startsAt: string;
  date: string;
  time: string;
  createdAt: string;
  updatedAt: string;
  version: number;
};
export type BookingReceipt = {
  reference: string;
  status: BookingStatus;
  date: string;
  time: string;
  service: string;
};
export class AppointmentError extends Error {
  constructor(
    message: string,
    public status = 400,
  ) {
    super(message);
  }
}

export function vietnamDate(date = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Ho_Chi_Minh",
  }).format(date);
}
export function vietnamTime(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Ho_Chi_Minh",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}
export function appointmentTime(date: unknown, time: unknown) {
  if (
    typeof date !== "string" ||
    !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
    typeof time !== "string" ||
    !appointmentStartTimes.includes(time)
  )
    throw new AppointmentError(
      "Chọn ngày và giờ hợp lệ, từ 08:00 đến 21:00, mỗi 30 phút, theo giờ Việt Nam.",
    );
  const startsAt = new Date(`${date}T${time}:00+07:00`);
  if (
    !Number.isFinite(startsAt.getTime()) ||
    vietnamDate(startsAt) !== date ||
    startsAt.getTime() <= Date.now()
  )
    throw new AppointmentError("Vui lòng chọn một thời gian trong tương lai.");
  if (startsAt.getTime() > Date.now() + 90 * 86400000)
    throw new AppointmentError("Vui lòng chọn lịch trong 90 ngày tới.");
  return {
    startsAt: startsAt.toISOString(),
    endsAt: new Date(startsAt.getTime() + appointmentDurationMs).toISOString(),
  };
}

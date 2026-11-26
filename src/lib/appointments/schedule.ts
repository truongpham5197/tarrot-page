import type { Booking, PublicSlot } from "./types";

export type ScheduleSlot = PublicSlot & { occupied: boolean };
export function shiftDate(date: string, days: number) {
  return new Date(new Date(`${date}T12:00:00Z`).getTime() + days * 86400000)
    .toISOString()
    .slice(0, 10);
}
export function weekDates(date: string) {
  const offset = (new Date(`${date}T12:00:00Z`).getUTCDay() + 6) % 7;
  return Array.from({ length: 7 }, (_, index) =>
    shiftDate(date, index - offset),
  );
}
export function daySchedule(
  date: string,
  bookings: Booking[],
  slots: ScheduleSlot[],
) {
  const daily = bookings
    .filter((booking) => booking.date === date)
    .sort(
      (a, b) =>
        a.time.localeCompare(b.time) || a.createdAt.localeCompare(b.createdAt),
    );
  const scheduled = daily.filter((booking) =>
    ["pending", "confirmed", "completed"].includes(booking.status),
  );
  const proposals = daily.filter((booking) => booking.status === "proposed");
  const cancelled = daily.filter((booking) => booking.status === "cancelled");
  const published = slots.filter((slot) => slot.date === date);
  const hours = Array.from({ length: 28 }, (_, index) => {
    const minutes = 8 * 60 + index * 30,
      endMinutes = minutes + 30,
      time = `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`,
      endTime = `${String(Math.floor(endMinutes / 60)).padStart(2, "0")}:${String(endMinutes % 60).padStart(2, "0")}`;
    return {
      time,
      endTime,
      bookings: scheduled.filter((booking) => booking.time === time),
      slot: published.find((slot) => slot.time === time),
    };
  });
  const freeSlots = published.filter(
    (slot) =>
      !slot.occupied &&
      !scheduled.some((booking) => booking.time === slot.time),
  );
  return { scheduled, proposals, cancelled, freeSlots, hours };
}

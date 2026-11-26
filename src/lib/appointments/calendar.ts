import { appointmentDurationMs, appointmentStartTimes, vietnamTime } from "./types";

export const calendarTimes = Array.from({ length: 28 }, (_, index) => {
  const minutes = 8 * 60 + index * 30;
  return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
});

export function calendarPlacement(startsAt: string) {
  const start = new Date(startsAt);
  const time = vietnamTime(start);
  const [hours, minutes] = time.split(":").map(Number);
  return {
    row: 2 + (hours * 60 + minutes - 8 * 60) / 30,
    span: 2,
    endTime: vietnamTime(new Date(start.getTime() + appointmentDurationMs)),
  };
}

export function canOpenCalendarTime(
  date: string,
  time: string,
  bookings: ReadonlyArray<{ startsAt: string; status: string }>,
  now: number,
) {
  const start = new Date(`${date}T${time}:00+07:00`).getTime();
  const end = start + appointmentDurationMs;
  return appointmentStartTimes.includes(time) &&
    Number.isFinite(start) && start > now && start <= now + 90 * 86400000 &&
    !bookings.some((booking) => {
      if (!["pending", "confirmed", "completed"].includes(booking.status)) return false;
      const reservedStart = new Date(booking.startsAt).getTime();
      return reservedStart < end && reservedStart + appointmentDurationMs > start;
    });
}

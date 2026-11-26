import assert from "node:assert/strict";
import type { Booking } from "../src/lib/appointments/types";
const { daySchedule, shiftDate, weekDates } =
  await import("../src/lib/appointments/schedule");
const date = "2026-11-21";
const base = {
  id: "confirmed",
  reference: "SR-TEST",
  name: "Khách",
  contact: "0900000000",
  email: "",
  service: "Tarot",
  note: "",
  adminNote: "",
  mode: "slot",
  slotId: "slot-09",
  startsAt: "2026-11-21T02:00:00.000Z",
  date,
  time: "09:00",
  createdAt: "2026-11-20T02:00:00.000Z",
  updatedAt: "2026-11-20T02:00:00.000Z",
  version: 1,
  status: "confirmed",
} as Booking;
const bookings: Booking[] = [
  base,
  {
    ...base,
    id: "pending",
    status: "pending",
    time: "10:00",
    slotId: "slot-10",
  },
  {
    ...base,
    id: "proposed",
    status: "proposed",
    mode: "proposal",
    time: "11:00",
    slotId: null,
  },
  {
    ...base,
    id: "cancelled",
    status: "cancelled",
    time: "12:00",
    slotId: "slot-12",
  },
  { ...base, id: "tomorrow", date: "2026-11-22" },
  {
    ...base,
    id: "completed",
    status: "completed",
    time: "08:00",
    slotId: "slot-08",
  },
];
const slots = ["08:00", "09:00", "10:00", "11:00", "12:00"].map((time) => ({
  id: `slot-${time.slice(0, 2)}`,
  date,
  time,
  startsAt: `${date}T${time}:00+07:00`,
  occupied: ["08:00", "09:00", "10:00"].includes(time),
}));
const result = daySchedule(date, bookings, slots);
assert.equal(result.scheduled.length, 3);
assert.equal(result.proposals.length, 1);
assert.equal(result.cancelled.length, 1);
assert.equal(
  result.freeSlots.length,
  2,
  "proposal and cancellation do not occupy published hours",
);
assert.equal(result.hours.length, 28);
assert.equal(
  result.hours.find((hour) => hour.time === "11:00")!.bookings.length,
  0,
);
assert.equal(
  result.hours.find((hour) => hour.time === "09:00")!.bookings[0].id,
  "confirmed",
);
assert.equal(
  result.hours.find((hour) => hour.time === "13:00")!.slot,
  undefined,
);
assert.equal(daySchedule("2026-11-22", bookings, slots).scheduled.length, 1);
assert.equal(shiftDate("2026-12-31", 1), "2027-01-01");
assert.equal(shiftDate("2026-03-01", -1), "2026-02-28");
assert.deepEqual(weekDates("2026-11-22"), [
  "2026-11-16",
  "2026-11-17",
  "2026-11-18",
  "2026-11-19",
  "2026-11-20",
  "2026-11-21",
  "2026-11-22",
]);
console.log(
  "PASS: per-day schedule, reserved versus proposed/cancelled/free hours, empty hours, week/day navigation and date boundaries.",
);

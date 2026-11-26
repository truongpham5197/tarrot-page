import assert from "node:assert/strict";
import { calendarPlacement, canOpenCalendarTime } from "../src/lib/appointments/calendar";

const placement = calendarPlacement("2026-12-01T02:30:00.000Z");
assert.equal(placement.row, 5, "09:30 starts three half-hours after 08:00, below the header");
assert.equal(placement.span, 2, "a consultation covers two half-hour rows");
assert.equal(placement.endTime, "10:30");
assert.equal(calendarPlacement("2026-12-01T14:00:00.000Z").row, 28);
assert.equal(calendarPlacement("2026-12-01T14:00:00.000Z").endTime, "22:00");

const reserved = [{ startsAt: "2026-12-01T02:30:00.000Z", status: "confirmed" }];
const now = new Date("2026-11-30T00:00:00.000Z").getTime();
assert.equal(canOpenCalendarTime("2026-12-01", "09:00", reserved, now), false);
assert.equal(canOpenCalendarTime("2026-12-01", "10:00", reserved, now), false);
assert.equal(canOpenCalendarTime("2026-12-01", "10:30", reserved, now), true, "adjacent appointments may touch");
assert.equal(canOpenCalendarTime("2026-12-01", "08:30", reserved, now), true);
for (const status of ["pending", "confirmed", "completed"]) {
  assert.equal(canOpenCalendarTime("2026-12-01", "09:00", [{ ...reserved[0], status }], now), false);
}
for (const status of ["proposed", "cancelled"]) {
  assert.equal(canOpenCalendarTime("2026-12-01", "09:30", [{ ...reserved[0], status }], now), true);
}
assert.equal(canOpenCalendarTime("2026-12-01", "21:30", [], now), false);
assert.equal(canOpenCalendarTime("2026-11-29", "09:00", [], now), false);
assert.equal(canOpenCalendarTime("2027-04-01", "09:00", [], now), false);
assert.equal(canOpenCalendarTime("2026-12-01", "21:00", [], now), true);
console.log("PASS: calendar positions, full consultation duration, overlapping and adjacent hours, status handling and publication limits.");

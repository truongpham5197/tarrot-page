"use client";

import { ChevronLeft, ChevronRight, Clock3 } from "lucide-react";
import { useMemo, useState, useSyncExternalStore } from "react";
import type { PublicSlot } from "@/lib/appointments/types";
import { fill, type Dictionary } from "@/lib/i18n/dictionaries";

const vietnamZone = "Asia/Ho_Chi_Minh";

const noSubscription = () => () => {};
function readZone() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
  } catch {
    return "";
  }
}

/** The visitor's IANA time zone, or "" while rendering on the server. */
export function useVisitorZone() {
  return useSyncExternalStore(noSubscription, readZone, () => "");
}

export function BookingCalendar({
  slots,
  today,
  selectedId,
  onSelect,
  cal,
  yourTime,
}: {
  slots: PublicSlot[];
  today: string;
  selectedId: string;
  onSelect: (id: string) => void;
  cal: Dictionary["booking"]["calendar"];
  /** Template like "Your time ({tz})". */
  yourTime: string;
}) {
  const [month, setMonth] = useState(today.slice(0, 7));
  const [selectedDate, setSelectedDate] = useState(today);
  const zone = useVisitorZone();
  const showLocal = Boolean(zone) && zone !== vietnamZone;
  const groups = useMemo(() => {
    const map = new Map<string, PublicSlot[]>();
    for (const slot of slots)
      map.set(slot.date, [...(map.get(slot.date) ?? []), slot]);
    return map;
  }, [slots]);
  const first = new Date(`${month}-01T00:00:00Z`),
    offset = (first.getUTCDay() + 6) % 7,
    days = new Date(
      first.getUTCFullYear(),
      first.getUTCMonth() + 1,
      0,
    ).getDate();
  const maxMonth = new Date(
    new Date(`${today}T00:00:00Z`).getTime() + 90 * 86400000,
  )
    .toISOString()
    .slice(0, 7);
  function moveMonth(delta: number) {
    const next = new Date(
      Date.UTC(first.getUTCFullYear(), first.getUTCMonth() + delta, 1),
    )
      .toISOString()
      .slice(0, 7);
    setMonth(next);
  }
  /** The slot's start in the visitor's own time zone; adds the day when it differs from Vietnam's. */
  function localTime(slot: PublicSlot) {
    if (!showLocal) return "";
    const start = new Date(slot.startsAt);
    const clock = new Intl.DateTimeFormat(cal.locale, {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: zone,
    }).format(start);
    const localDate = new Intl.DateTimeFormat("en-CA", {
      timeZone: zone,
    }).format(start);
    if (localDate === slot.date) return clock;
    const day = new Intl.DateTimeFormat(cal.locale, {
      month: "short",
      day: "numeric",
      timeZone: zone,
    }).format(start);
    return `${day}, ${clock}`;
  }
  const selectedLabel = new Intl.DateTimeFormat(cal.locale, {
    dateStyle: "medium",
    timeZone: "UTC",
  }).format(new Date(`${selectedDate}T00:00:00Z`));

  return (
    <div className="booking-calendar">
      <div className="calendar-heading">
        <button
          type="button"
          aria-label={cal.prev}
          disabled={month <= today.slice(0, 7)}
          onClick={() => moveMonth(-1)}
        >
          <ChevronLeft size={18} />
        </button>
        <strong>
          {new Intl.DateTimeFormat(cal.locale, {
            month: "long",
            year: "numeric",
            timeZone: "UTC",
          }).format(first)}
        </strong>
        <button
          type="button"
          aria-label={cal.next}
          disabled={month >= maxMonth}
          onClick={() => moveMonth(1)}
        >
          <ChevronRight size={18} />
        </button>
      </div>
      <div className="calendar-weekdays" aria-hidden="true">
        {cal.weekdays.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>
      <div className="calendar-days">
        {Array.from({ length: offset }, (_, i) => (
          <span key={`blank-${i}`} />
        ))}
        {Array.from({ length: days }, (_, i) => {
          const day = String(i + 1).padStart(2, "0"),
            date = `${month}-${day}`,
            count = groups.get(date)?.length ?? 0;
          return (
            <button
              key={date}
              type="button"
              data-calendar-date={date}
              disabled={!count || date < today}
              aria-label={fill(cal.dayAria, {
                day: i + 1,
                month: month.slice(5),
                count,
              })}
              aria-pressed={selectedDate === date}
              className={count ? "has-slots" : ""}
              onClick={() => {
                setSelectedDate(date);
                onSelect("");
              }}
            >
              {i + 1}
              {count > 0 && <span />}
            </button>
          );
        })}
      </div>
      <p className="calendar-legend">
        <i /> {cal.legend}
      </p>
      <div className="calendar-hours">
        <p>
          <Clock3 size={14} /> {cal.hoursFor} {selectedLabel}
        </p>
        {showLocal && (
          <p className="calendar-local-note">{fill(yourTime, { tz: zone })}</p>
        )}
        {groups.get(selectedDate)?.length ? (
          <div className="time-grid">
            {groups.get(selectedDate)!.map((slot) => {
              const local = localTime(slot);
              return (
                <button
                  key={slot.id}
                  type="button"
                  data-slot-id={slot.id}
                  aria-pressed={selectedId === slot.id}
                  onClick={() => onSelect(slot.id)}
                >
                  {slot.time}
                  {local && <small>{local}</small>}
                </button>
              );
            })}
          </div>
        ) : (
          <p className="calendar-empty">{cal.empty}</p>
        )}
      </div>
    </div>
  );
}

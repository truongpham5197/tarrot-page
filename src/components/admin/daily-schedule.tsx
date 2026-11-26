"use client";

import { ArrowUpRight, CalendarDays, CalendarPlus, ChevronLeft, ChevronRight, Inbox } from "lucide-react";
import { Fragment, useEffect, useMemo, useState, useSyncExternalStore, type CSSProperties } from "react";
import { daySchedule, shiftDate, weekDates, type ScheduleSlot } from "@/lib/appointments/schedule";
import { calendarPlacement, calendarTimes, canOpenCalendarTime } from "@/lib/appointments/calendar";
import { statusLabels, vietnamDate, vietnamTime, type Booking } from "@/lib/appointments/types";

function subscribeViewport(callback: () => void) {
  const query = window.matchMedia("(max-width: 700px)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}
const isSmallScreen = () => window.matchMedia("(max-width: 700px)").matches;
const serverScreen = () => false;
function displayDate(date: string, options: Intl.DateTimeFormatOptions) {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString("vi-VN", { ...options, timeZone: "UTC" });
}

export function DailySchedule({ date, today, bookings, slots, onDateChange, onSelect, onOpenAvailability }: {
  date: string;
  today: string;
  bookings: Booking[];
  slots: ScheduleSlot[];
  onDateChange: (date: string) => void;
  onSelect: (booking: Booking) => void;
  onOpenAvailability: (date: string, time?: string) => void;
}) {
  const smallScreen = useSyncExternalStore(subscribeViewport, isSmallScreen, serverScreen);
  const [chosenView, setChosenView] = useState<"day" | "week" | null>(null);
  const view = chosenView ?? (smallScreen ? "day" : "week");
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 60000);
    return () => window.clearInterval(timer);
  }, []);
  const week = weekDates(date);
  const days = view === "week" ? week : [date];
  const summaries = useMemo(() => new Map(weekDates(date).map((day) => [day, daySchedule(day, bookings, slots)])), [date, bookings, slots]);
  const daily = summaries.get(date)!;
  const step = view === "week" ? 7 : 1;
  const [currentHours, currentMinutes] = vietnamTime(new Date(now)).split(":").map(Number);
  const currentOffset = (currentHours * 60 + currentMinutes - 480) / 30;
  const currentDate = vietnamDate(new Date(now));
  const title = view === "day"
    ? displayDate(date, { weekday: "long", day: "numeric", month: "long", year: "numeric" })
    : `${displayDate(week[0], { day: "2-digit", month: "2-digit" })} – ${displayDate(week[6], { day: "2-digit", month: "2-digit", year: "numeric" })}`;

  return (
    <section className="admin-agenda admin-calendar" aria-label="Lịch quản lý cuộc hẹn" data-daily-schedule>
      <div className="admin-panel admin-calendar-toolbar">
        <div>
          <p className="eyebrow">LỊCH HẸN CỦA SARAH</p>
          <h2>{title}</h2>
          <p>Giờ Việt Nam (GMT+7) · Mỗi cuộc hẹn 60 phút</p>
        </div>
        <div className="admin-calendar-controls">
          <button type="button" onClick={() => onDateChange(today)}>Hôm nay</button>
          <div className="admin-calendar-arrows">
            <button type="button" aria-label={view === "week" ? "Tuần trước" : "Ngày trước"} onClick={() => onDateChange(shiftDate(date, -step))}><ChevronLeft size={18} /></button>
            <button type="button" aria-label={view === "week" ? "Tuần sau" : "Ngày sau"} onClick={() => onDateChange(shiftDate(date, step))}><ChevronRight size={18} /></button>
          </div>
          <label className="admin-calendar-date"><CalendarDays size={16} /><input type="date" name="scheduleDate" aria-label="Chọn ngày xem lịch trình" value={date} onChange={(event) => { if (/^\d{4}-\d{2}-\d{2}$/.test(event.target.value)) onDateChange(event.target.value); }} /></label>
          <select aria-label="Chế độ xem lịch" value={view} onChange={(event) => setChosenView(event.target.value as "day" | "week")}><option value="week">Xem tuần</option><option value="day">Xem ngày</option></select>
          <button type="button" className="admin-calendar-publish" onClick={() => onOpenAvailability(date)}><CalendarPlus size={16} /> Mở giờ trống</button>
        </div>
      </div>

      <div className="admin-calendar-surface">
        <div className="admin-calendar-caption">
          <div className="admin-calendar-legend">
            <span><i className="confirmed" />Đã xác nhận</span><span><i className="pending" />Chờ xác nhận</span><span><i className="completed" />Hoàn tất</span><span><i className="free" />Giờ đã mở</span>
          </div>
          <p>Bấm ô trống để mở giờ · Bấm cuộc hẹn để quản lý</p>
        </div>
        <div className="admin-calendar-scroll" tabIndex={0} aria-label="Lưới lịch, cuộn để xem các giờ và ngày">
          <div className={`admin-calendar-grid ${view}`} style={{ "--calendar-days": days.length } as CSSProperties}>
            <div className="admin-calendar-corner">GMT+7</div>
            {calendarTimes.map((time, index) => <div className={`admin-calendar-time ${time.endsWith(":30") ? "half" : ""}`} key={time} style={{ gridColumn: 1, gridRow: index + 2 }}><span>{time}</span></div>)}
            <span className="admin-calendar-end">22:00</span>
            {days.map((day, column) => {
              const summary = summaries.get(day)!;
              return <Fragment key={day}>
                <button type="button" className={`admin-calendar-day ${day === today ? "today" : ""} ${day === date ? "selected" : ""}`} style={{ gridColumn: column + 2, gridRow: 1 }} onClick={() => onDateChange(day)} aria-pressed={day === date} data-schedule-day={day}>
                  <span>{displayDate(day, { weekday: "long" })}</span><strong>{day.slice(8)}<small>/{day.slice(5, 7)}</small></strong><small>{summary.scheduled.length} cuộc hẹn</small>
                </button>
                {calendarTimes.map((time, index) => {
                  const slot = slots.find((item) => item.date === day && item.time === time);
                  const canOpen = canOpenCalendarTime(day, time, summary.scheduled, now);
                  const available = slot && !slot.occupied && canOpen;
                  return <button type="button" key={time} className={`admin-calendar-cell ${time.endsWith(":00") ? "whole" : ""} ${available ? "published" : ""}`} style={{ gridColumn: column + 2, gridRow: index + 2 }} disabled={!canOpen} onClick={() => onOpenAvailability(day, available ? undefined : time)} aria-label={`${available ? "Quản lý giờ đã mở" : "Mở khung giờ"} ${time} ngày ${day}, 60 phút`} title={available ? `${time} · Đã mở, 60 phút` : canOpen ? `Mở ${time}, 60 phút` : "Giờ đã qua, có lịch hẹn hoặc ngoài phạm vi mở lịch"}>
                    {available ? <span>{time} <small>Đã mở · 60p</small></span> : canOpen ? <span className="admin-calendar-cell-add">+ {time}</span> : null}
                  </button>;
                })}
                {summary.scheduled.map((booking) => {
                  const placement = calendarPlacement(booking.startsAt);
                  return <button type="button" className={`admin-calendar-event ${booking.status}`} key={booking.id} style={{ gridColumn: column + 2, gridRow: `${placement.row} / span ${placement.span}` }} data-schedule-booking={booking.id} aria-label={`${booking.name}, ${booking.time} đến ${placement.endTime}, ${statusLabels[booking.status]}`} onClick={() => onSelect(booking)}>
                    <span className="admin-calendar-event-time">{booking.time}–{placement.endTime}<ArrowUpRight size={12} /></span><strong>{booking.name}</strong><small>{booking.service}</small><span className="admin-calendar-event-status">{statusLabels[booking.status]}</span>
                  </button>;
                })}
                {day === currentDate && currentOffset >= 0 && currentOffset < 28 && <div className="admin-calendar-now" style={{ gridColumn: column + 2, gridRow: 2, top: `${currentOffset * 44}px` }} aria-label={`Bây giờ ${vietnamTime(new Date(now))}`}><i /></div>}
              </Fragment>;
            })}
          </div>
        </div>
      </div>

      <div className="admin-calendar-bottom">
        <section className="admin-panel admin-day-proposals">
          <div className="admin-panel-heading"><div><p className="eyebrow">NGÀY {displayDate(date, { day: "2-digit", month: "2-digit" })}</p><h2>Khách đề xuất thời gian</h2></div><span className="admin-count">{daily.proposals.length}</span></div>
          <p className="admin-panel-note">Đề xuất chưa giữ chỗ. Bấm để xem, đổi giờ và xác nhận lịch phù hợp.</p>
          {daily.proposals.length ? <div className="admin-day-proposal-list">{daily.proposals.map((booking) => <button type="button" key={booking.id} data-schedule-proposal={booking.id} onClick={() => onSelect(booking)}><span className="admin-proposal-time">{booking.time}<ArrowUpRight size={14} /></span><strong>{booking.name}</strong><small>{booking.service}</small><span className="admin-badge proposed">Đề xuất thời gian</span></button>)}</div> : <div className="admin-agenda-empty"><Inbox size={24} strokeWidth={1.2} /><p>Không có đề xuất cho ngày này.</p></div>}
        </section>
        <section className="admin-panel admin-calendar-summary">
          <h2>Ngày đang chọn</h2><p>{displayDate(date, { weekday: "long", day: "numeric", month: "long" })}</p>
          <div><strong>{daily.scheduled.length}</strong><span>cuộc hẹn</span><strong>{daily.freeSlots.length}</strong><span>giờ đã mở còn trống</span></div>
          <p>Chọn tiêu đề một ngày để xem đề xuất và tổng quan của ngày đó.</p>
          {daily.cancelled.length > 0 && <details className="admin-cancelled-day"><summary>Đã hủy trong ngày <span>{daily.cancelled.length}</span></summary>{daily.cancelled.map((booking) => <button type="button" key={booking.id} onClick={() => onSelect(booking)}><span><strong>{booking.name}</strong><small>{booking.time} · {booking.service}</small></span><ArrowUpRight size={14} /></button>)}</details>}
        </section>
      </div>
    </section>
  );
}

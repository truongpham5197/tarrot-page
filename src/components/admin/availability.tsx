"use client";

import { CalendarPlus, LoaderCircle, X } from "lucide-react";
import { FormEvent, useState } from "react";
import {
  appointmentStartTimes,
  vietnamDate,
  type PublicSlot,
} from "@/lib/appointments/types";
import { adminRequest } from "./client";
export type AdminSlot = PublicSlot & { occupied: boolean };
export function Availability({
  slots,
  onChanged,
  initialDate,
  initialTime,
}: {
  slots: AdminSlot[];
  onChanged: () => void;
  initialDate?: string;
  initialTime?: string;
}) {
  const [now] = useState(() => Date.now());
  const today = vietnamDate(new Date(now));
  const [date, setDate] = useState(initialDate ?? today),
    [times, setTimes] = useState<string[]>(initialTime ? [initialTime] : []),
    [error, setError] = useState(""),
    [message, setMessage] = useState(""),
    [busy, setBusy] = useState(false);
  const maxDate = vietnamDate(new Date(now + 90 * 86400000));
  async function publish(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");
    if (!times.length) {
      setError("Chọn ít nhất một khung giờ để mở.");
      return;
    }
    setBusy(true);
    try {
      await adminRequest("/api/admin/slots", "POST", { date, times });
      setMessage(
        "Đã mở giờ trống. Khách có thể chọn các giờ này trên trang đặt hẹn.",
      );
      setTimes([]);
      onChanged();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Chưa mở được lịch.");
    } finally {
      setBusy(false);
    }
  }
  async function close(id: string) {
    setError("");
    setBusy(true);
    try {
      await adminRequest("/api/admin/slots", "DELETE", { id });
      setMessage("Đã đóng khung giờ.");
      onChanged();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Chưa đóng được giờ.");
    } finally {
      setBusy(false);
    }
  }
  const groups = new Map<string, AdminSlot[]>();
  const futureSlots = slots.filter(
    (slot) => new Date(slot.startsAt).getTime() > now,
  );
  for (const slot of futureSlots)
    groups.set(slot.date, [...(groups.get(slot.date) ?? []), slot]);
  return (
    <div className="admin-availability">
      <section className="admin-panel">
        <div className="admin-panel-heading">
          <div>
            <p className="eyebrow">CHỦ ĐỘNG THỜI GIAN CỦA BẠN</p>
            <h2>Mở giờ trống</h2>
          </div>
          <CalendarPlus size={25} strokeWidth={1.2} />
        </div>
        <p className="admin-panel-note">
          Chỉ những giờ bạn mở mới xuất hiện trên lịch của khách. Mỗi khung giờ
          kéo dài 60 phút, theo giờ Việt Nam.
        </p>
        <form onSubmit={publish} className="admin-slot-form">
          <label>
            <span>Ngày mở lịch</span>
            <input
              name="availabilityDate"
              required
              type="date"
              min={today}
              max={maxDate}
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                setTimes([]);
              }}
            />
          </label>
          <fieldset>
            <legend>Chọn khung giờ</legend>
            <div className="admin-hour-grid">
              {appointmentStartTimes.map((hour) => {
                const past =
                    new Date(`${date}T${hour}:00+07:00`).getTime() <= now,
                  existing = slots.some(
                    (slot) => slot.date === date && slot.time === hour,
                  );
                return (
                  <label
                    key={hour}
                    className={times.includes(hour) ? "selected" : ""}
                  >
                    <input
                      type="checkbox"
                      disabled={past || existing}
                      value={hour}
                      checked={times.includes(hour)}
                      onChange={(e) =>
                        setTimes((current) =>
                          e.target.checked
                            ? [...current, hour]
                            : current.filter((time) => time !== hour),
                        )
                      }
                    />
                    <span>{hour}</span>
                    {existing && <small>Đã mở</small>}
                  </label>
                );
              })}
            </div>
          </fieldset>
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
          {message && (
            <p className="admin-notice" role="status">
              {message}
            </p>
          )}
          <button className="button button-blue" type="submit" disabled={busy}>
            {busy ? (
              <LoaderCircle size={16} className="loading-spinner" />
            ) : (
              <CalendarPlus size={16} />
            )}{" "}
            Mở {times.length || ""} khung giờ
          </button>
        </form>
      </section>
      <section className="admin-panel">
        <div className="admin-panel-heading">
          <div>
            <p className="eyebrow">LỊCH ĐÃ CÔNG BỐ</p>
            <h2>Các giờ sắp tới</h2>
          </div>
          <span className="admin-count">{futureSlots.length}</span>
        </div>
        {groups.size === 0 ? (
          <div className="admin-empty">
            Bạn chưa mở khung giờ nào. Chọn ngày và giờ ở bên cạnh để bắt đầu.
          </div>
        ) : (
          <div className="admin-slot-groups">
            {[...groups].map(([day, daySlots]) => (
              <div key={day}>
                <h3>
                  {new Date(`${day}T12:00:00+07:00`).toLocaleDateString(
                    "vi-VN",
                    {
                      weekday: "long",
                      day: "2-digit",
                      month: "2-digit",
                      timeZone: "Asia/Ho_Chi_Minh",
                    },
                  )}
                </h3>
                <div>
                  {daySlots.map((slot) => (
                    <span
                      className={`admin-published-slot ${slot.occupied ? "occupied" : ""}`}
                      key={slot.id}
                    >
                      {slot.time}
                      <small>
                        {slot.occupied ? "Có lịch hẹn" : "Còn trống"}
                      </small>
                      {!slot.occupied && (
                        <button
                          type="button"
                          disabled={busy}
                          onClick={() => void close(slot.id)}
                          aria-label={`Đóng giờ ${slot.time} ngày ${day}`}
                        >
                          <X size={13} />
                        </button>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

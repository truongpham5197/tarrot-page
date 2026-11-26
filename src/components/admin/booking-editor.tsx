"use client";

import { LoaderCircle, Mail, Phone, Save, X } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import {
  appointmentStartTimes,
  statusLabels,
  vietnamDate,
  type Booking,
  type BookingStatus,
} from "@/lib/appointments/types";
import { adminRequest } from "./client";

export function BookingEditor({
  booking,
  onClose,
  onSaved,
}: {
  booking: Booking;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [status, setStatus] = useState<BookingStatus>(booking.status),
    [date, setDate] = useState(booking.date),
    [time, setTime] = useState(booking.time),
    [note, setNote] = useState(booking.adminNote),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const closed =
    booking.status === "completed" || booking.status === "cancelled";
  useEffect(() => {
    const el = dialog.current;
    el?.showModal();
    return () => el?.close();
  }, []);
  const allowed: BookingStatus[] =
    booking.status === "proposed"
      ? ["proposed", "confirmed", "cancelled"]
      : booking.status === "pending"
        ? ["pending", "confirmed", "cancelled"]
        : booking.status === "confirmed"
          ? ["confirmed", "completed", "cancelled"]
          : [booking.status];
  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      await adminRequest(`/api/admin/bookings/${booking.id}`, "PATCH", {
        status,
        version: booking.version,
        adminNote: note,
        ...(status === "cancelled" || status === "completed"
          ? {}
          : { date, time }),
      });
      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Chưa lưu được lịch hẹn.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <dialog
      ref={dialog}
      className="admin-dialog"
      onCancel={onClose}
      aria-labelledby="booking-dialog-title"
    >
      <div className="admin-dialog-head">
        <div>
          <p className="eyebrow">{booking.reference}</p>
          <h2 id="booking-dialog-title">{booking.name}</h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Đóng chi tiết lịch hẹn"
        >
          <X size={21} />
        </button>
      </div>
      <div className="admin-booking-contact">
        <span>
          <Phone size={14} />
          {booking.contact}
        </span>
        {booking.email && (
          <a href={`mailto:${booking.email}`}>
            <Mail size={14} />
            {booking.email}
          </a>
        )}
      </div>
      <div className="admin-detail-summary">
        <span>
          Dịch vụ<strong>{booking.service}</strong>
        </span>
        <span>
          Hình thức
          <strong>
            {booking.mode === "proposal"
              ? "Khách đề xuất giờ"
              : "Chọn giờ đã mở"}{" "}
            · Online
          </strong>
        </span>
        <span>
          Đã gửi
          <strong>
            {new Date(booking.createdAt).toLocaleString("vi-VN", {
              timeZone: "Asia/Ho_Chi_Minh",
            })}
          </strong>
        </span>
      </div>
      {booking.note && (
        <div className="admin-customer-note">
          <strong>Lời nhắn của khách</strong>
          <p>{booking.note}</p>
        </div>
      )}
      <form onSubmit={save} className="admin-editor-form">
        <label>
          <span>Trạng thái</span>
          <select
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as BookingStatus)}
            disabled={closed}
          >
            {allowed.map((value) => (
              <option value={value} key={value}>
                {statusLabels[value]}
              </option>
            ))}
          </select>
        </label>
        <div className="field-grid">
          <label>
            <span>Ngày hẹn</span>
            <input
              name="date"
              type="date"
              required
              min={
                status === "completed" || status === "cancelled"
                  ? undefined
                  : vietnamDate()
              }
              value={date}
              onChange={(e) => setDate(e.target.value)}
              disabled={
                closed || status === "completed" || status === "cancelled"
              }
            />
          </label>
          <label>
            <span>Giờ hẹn (GMT+7)</span>
            <select
              name="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              disabled={
                closed || status === "completed" || status === "cancelled"
              }
            >
              {appointmentStartTimes.map((hour) => (
                <option key={hour}>{hour}</option>
              ))}
            </select>
          </label>
        </div>
        <label>
          <span>Ghi chú nội bộ · Chỉ admin thấy</span>
          <textarea
            name="adminNote"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            maxLength={5000}
            rows={3}
            disabled={closed}
            placeholder="Nội dung chuẩn bị, kênh liên hệ, thông tin cần lưu ý…"
          />
        </label>
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <div className="admin-editor-actions">
          <button
            className="button button-outline"
            type="button"
            onClick={onClose}
          >
            Đóng
          </button>
          {!closed && (
            <button
              className="button button-blue"
              type="submit"
              disabled={busy}
            >
              {busy ? (
                <LoaderCircle className="loading-spinner" size={15} />
              ) : (
                <Save size={15} />
              )}{" "}
              Lưu lịch hẹn
            </button>
          )}
        </div>
      </form>
    </dialog>
  );
}

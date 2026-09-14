"use client";

import { Check, Copy, RotateCcw, Send } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";

const serviceLabels: Record<string, string> = {
  "tarot-one-question": "Tarot 1 vấn đề",
  "tarot-deep": "Tarot chuyên sâu",
  astrology: "Bản đồ sao cá nhân",
  numerology: "Thần số học",
  "matrix-destiny": "Matrix Destiny Chart",
  "solar-return": "Solar Return Chart",
  "personal-combo": "Combo cá nhân",
};

const zaloUrl = "https://zalo.me/0328052889";
const facebookUrl = "https://www.facebook.com/misocduabeonhuheo";

type BookingData = {
  name: string;
  contact: string;
  email: string;
  service: string;
  format: string;
  date: string;
  note: string;
};

export function BookingForm({ initialService }: { initialService?: string }) {
  const newForm = (): BookingData => ({
    name: "",
    contact: "",
    email: "",
    service: serviceLabels[initialService ?? ""] ?? "Chưa chắc — cần tư vấn",
    format: "Online",
    date: "",
    note: "",
  });
  const [form, setForm] = useState<BookingData>(newForm);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const bookingEmail = process.env.NEXT_PUBLIC_BOOKING_EMAIL;

  const summary = useMemo(() => [
    "YÊU CẦU ĐẶT LỊCH — LUMIERE",
    `Họ tên: ${form.name}`,
    `Liên hệ: ${form.contact}`,
    `Email: ${form.email || "Không cung cấp"}`,
    `Dịch vụ: ${form.service}`,
    `Hình thức: ${form.format}`,
    `Ngày mong muốn: ${form.date || "Linh hoạt"}`,
    `Điều muốn chia sẻ: ${form.note || "Chưa ghi chú"}`,
  ].join("\n"), [form]);

  function update<K extends keyof BookingData>(key: K, value: BookingData[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.open(zaloUrl, "_blank", "noopener,noreferrer");
    navigator.clipboard.writeText(summary).catch(() => undefined);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function copySummary() {
    await navigator.clipboard.writeText(summary);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  if (submitted) {
    const mailHref = bookingEmail
      ? `mailto:${bookingEmail}?subject=${encodeURIComponent("Yêu cầu đặt lịch — Lumiere")}&body=${encodeURIComponent(summary)}`
      : undefined;

    return (
      <div className="booking-success" role="status">
        <span className="success-icon"><Check /></span>
        <p className="eyebrow">Nội dung đã sẵn sàng</p>
        <h2>Gửi yêu cầu qua kênh bạn thường dùng.</h2>
        <p>Zalo đã được mở và nội dung đặt lịch đã được sao chép. Hãy dán nội dung vào khung chat với số 0328 052 889 rồi bấm gửi. Lịch được xác nhận sau khi hai bên thống nhất thời gian.</p>
        <pre>{summary}</pre>
        <div className="success-actions">
          <a className="button button-gold" href={zaloUrl} target="_blank" rel="noreferrer"><Send size={18} /> Mở Zalo</a>
          <button className="button button-dark" type="button" onClick={copySummary}>
            {copied ? <Check size={18} /> : <Copy size={18} />}{copied ? "Đã sao chép" : "Sao chép nội dung"}
          </button>
          {mailHref && <a className="button button-outline-dark" href={mailHref}><Send size={18} /> Gửi email</a>}
          <a className="button button-outline-dark" href={facebookUrl} target="_blank" rel="noreferrer">Facebook</a>
          <button className="text-button" type="button" onClick={() => { setForm(newForm()); setSubmitted(false); }}><RotateCcw size={16} /> Chỉnh lại thông tin</button>
        </div>
      </div>
    );
  }

  return (
    <form className="booking-form" onSubmit={submit}>
      <div className="booking-contact-strip"><span>Nhận lịch qua</span><a href={zaloUrl} target="_blank" rel="noreferrer">Zalo 0328 052 889</a><a href={facebookUrl} target="_blank" rel="noreferrer">Facebook</a></div>
      <div className="field-grid">
        <label><span>Họ và tên *</span><input required autoComplete="name" value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Tên bạn muốn được gọi" /></label>
        <label><span>Số điện thoại / Zalo *</span><input required autoComplete="tel" value={form.contact} onChange={(e) => update("contact", e.target.value)} placeholder="Kênh xác nhận lịch" /></label>
        <label><span>Email nhận PDF</span><input type="email" autoComplete="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@example.com" /></label>
        <label><span>Gói dịch vụ *</span><select required value={form.service} onChange={(e) => update("service", e.target.value)}>{Object.values(serviceLabels).map((label) => <option key={label}>{label}</option>)}<option>Chưa chắc — cần tư vấn</option></select></label>
        <label><span>Hình thức *</span><select value={form.format} onChange={(e) => update("format", e.target.value)}><option>Online</option><option>Offline tại TP. Hồ Chí Minh</option><option>Linh hoạt</option></select></label>
        <label><span>Ngày mong muốn</span><input type="date" value={form.date} onChange={(e) => update("date", e.target.value)} /></label>
        <label className="field-wide"><span>Điều bạn muốn chia sẻ</span><textarea rows={5} value={form.note} onChange={(e) => update("note", e.target.value)} placeholder="Một vài dòng về câu hỏi hoặc giai đoạn bạn đang trải qua..." /></label>
      </div>
      <label className="consent-row"><input required type="checkbox" /><span>Tôi đồng ý để Lumiere liên hệ xác nhận lịch và hiểu rằng nội dung tư vấn mang tính tham khảo.</span></label>
      <button className="button button-dark submit-button" type="submit">Tiếp tục gửi lịch qua Zalo <Send size={18} /></button>
      <p className="form-note">Bạn chưa cần thanh toán ở bước này.</p>
    </form>
  );
}

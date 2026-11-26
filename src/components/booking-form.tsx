"use client";

import { CalendarCheck, Check, Info, LoaderCircle, Send } from "lucide-react";
import Link from "next/link";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { BookingCalendar } from "./booking-calendar";
import { isServiceCode, services, unsureCode } from "@/lib/catalog";
import { localePath, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { site } from "@/lib/site";
import {
  appointmentStartTimes,
  type BookingReceipt,
  type PublicSlot,
} from "@/lib/appointments/types";

export function BookingForm({
  lang,
  copy,
  serviceCopy,
  initialService,
  today,
}: {
  lang: Locale;
  copy: Dictionary["booking"];
  serviceCopy: Dictionary["services"];
  initialService?: string;
  today: string;
}) {
  const { form: t, success: s, calendar } = copy;
  const [form, setForm] = useState({
    name: "",
    contact: "",
    email: "",
    service:
      initialService && isServiceCode(initialService)
        ? initialService
        : unsureCode,
    note: "",
    date: "",
    time: "09:00",
  });
  const [mode, setMode] = useState<"slot" | "proposal">("slot");
  const [slots, setSlots] = useState<PublicSlot[]>([]),
    [slotId, setSlotId] = useState("");
  const [loading, setLoading] = useState(true),
    [busy, setBusy] = useState(false),
    [error, setError] = useState(""),
    [slotError, setSlotError] = useState("");
  const [receipt, setReceipt] = useState<BookingReceipt | null>(null);
  const requestKey = useRef<string | null>(null);
  const maxDate = new Date(
    new Date(`${today}T00:00:00Z`).getTime() + 90 * 86400000,
  )
    .toISOString()
    .slice(0, 10);
  const selectedService = services.find((item) => item.code === form.service);
  const fileService = Boolean(
    selectedService && selectedService.delivery !== "none",
  );
  const loadSlots = useCallback(
    (signal?: AbortSignal) => {
      return fetch("/api/booking-slots", {
        cache: "no-store",
        signal,
      })
        .then(async (response) => {
          const data = await response.json();
          if (!response.ok) throw new Error(data.error);
          return data;
        })
        .then((data) => {
          setSlots(data.slots);
          setSlotError("");
        })
        .catch((err) => {
          if (signal?.aborted) return;
          // Server messages are Vietnamese; show them only to Vietnamese visitors.
          setSlotError(
            lang === "vi" && err instanceof Error && err.message
              ? err.message
              : t.slotsFailed,
          );
        })
        .finally(() => {
          if (!signal?.aborted) setLoading(false);
        });
    },
    [lang, t.slotsFailed],
  );
  useEffect(() => {
    const controller = new AbortController();
    void loadSlots(controller.signal);
    return () => controller.abort();
  }, [loadSlots]);
  function update(key: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
    requestKey.current = null;
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setError("");
    if (mode === "slot" && !slotId) {
      setError(t.pickSlot);
      return;
    }
    setBusy(true);
    requestKey.current ??= crypto.randomUUID();
    let timezone = "";
    try {
      timezone = Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
    } catch {
      timezone = "";
    }
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          mode,
          slotId,
          consent: true,
          requestKey: requestKey.current,
          website: new FormData(event.currentTarget).get("website") ?? "",
          lang,
          timezone,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        if (response.status === 409) {
          setSlotId("");
          void loadSlots();
        }
        // Server messages are Vietnamese; English visitors get a generic message
        // (a 409 still tells them to pick another slot).
        const generic =
          response.status === 409 ? t.pickSlot : t.sendFailed;
        throw new Error(lang === "vi" ? data.error || generic : generic);
      }
      setReceipt(data.booking);
    } catch (err) {
      setError(
        err instanceof Error && err.message ? err.message : t.network,
      );
    } finally {
      setBusy(false);
    }
  }
  if (receipt)
    return (
      <div className="booking-success" role="status">
        <span className="success-icon">
          <Check />
        </span>
        <p className="eyebrow">{s.eyebrow}</p>
        <h2>
          {receipt.status === "proposed" ? s.titleProposed : s.titleBooked}
          <br />
          <em>{s.titleEm}</em>
        </h2>
        <p>
          {receipt.status === "proposed" ? s.bodyProposed : s.bodySlot}{" "}
          {s.bodyContact}
        </p>
        <div className="booking-receipt">
          <span>
            {s.reference}{" "}
            <strong data-booking-reference>{receipt.reference}</strong>
          </span>
          <span>
            {s.service}{" "}
            <strong>
              {isServiceCode(form.service)
                ? serviceCopy[form.service].title
                : t.unsure}
            </strong>
          </span>
          <span>
            {s.time}{" "}
            <strong>
              {receipt.time} · {receipt.date.split("-").reverse().join("/")}
            </strong>
          </span>
          <span>
            {s.status} <strong>{copy.status[receipt.status]}</strong>
          </span>
          <small>{s.tzNote}</small>
        </div>
        <p className="receipt-note">{s.note}</p>
        <div className="success-actions">
          <Link className="button button-blue" href={localePath(lang, "/")}>
            {s.home}
          </Link>
          <a
            className="button button-outline"
            href={site.zalo}
            target="_blank"
            rel="noreferrer"
          >
            {s.zalo}
          </a>
        </div>
      </div>
    );
  return (
    <form className="booking-form" onSubmit={submit}>
      <div className="booking-contact-strip">
        <CalendarCheck size={16} />
        <span>{t.contactStrip}</span>
        <a href={site.zalo} target="_blank" rel="noreferrer">
          {t.zalo} {site.phoneDisplay}
        </a>
        <a href={site.facebook} target="_blank" rel="noreferrer">
          {t.facebook}
        </a>
        <a href={site.telephone}>{t.call}</a>
      </div>
      <fieldset className="booking-mode">
        <legend>{t.modeLegend}</legend>
        <label>
          <input
            type="radio"
            name="bookingMode"
            value="slot"
            checked={mode === "slot"}
            onChange={() => {
              setMode("slot");
              setError("");
              requestKey.current = null;
            }}
          />
          <span>{t.modeSlot}</span>
        </label>
        <label>
          <input
            type="radio"
            name="bookingMode"
            value="proposal"
            checked={mode === "proposal"}
            onChange={() => {
              setMode("proposal");
              setError("");
              requestKey.current = null;
            }}
          />
          <span>{t.modeProposal}</span>
        </label>
      </fieldset>
      {mode === "slot" ? (
        <div className="slot-picker">
          {loading ? (
            <p className="calendar-empty">
              <LoaderCircle size={15} className="loading-spinner" />{" "}
              {t.loadingSlots}
            </p>
          ) : slotError ? (
            <div className="form-error" role="alert">
              {slotError}
              <button
                type="button"
                className="text-button"
                onClick={() => void loadSlots()}
              >
                {t.reload}
              </button>
            </div>
          ) : (
            <>
              <BookingCalendar
                slots={slots}
                today={today}
                selectedId={slotId}
                cal={calendar}
                yourTime={t.yourTime}
                onSelect={(id) => {
                  setSlotId(id);
                  requestKey.current = null;
                }}
              />
              {slots.length === 0 && (
                <p className="booking-no-slots">
                  {t.noSlotsA}{" "}
                  <button type="button" onClick={() => setMode("proposal")}>
                    {t.noSlotsButton}
                  </button>
                  .
                </p>
              )}
            </>
          )}
        </div>
      ) : (
        <div className="proposal-fields">
          <p>{t.proposalIntro}</p>
          <div className="field-grid">
            <label>
              <span>{t.date}</span>
              <input
                type="date"
                name="date"
                required
                min={today}
                max={maxDate}
                value={form.date}
                onChange={(e) => update("date", e.target.value)}
              />
            </label>
            <label>
              <span>{t.time}</span>
              <select
                name="time"
                value={form.time}
                onChange={(e) => update("time", e.target.value)}
              >
                {appointmentStartTimes.map((time) => (
                  <option key={time}>{time}</option>
                ))}
              </select>
            </label>
          </div>
          <small>{t.proposalNote}</small>
        </div>
      )}
      <div className="field-grid booking-personal-fields">
        <label>
          <span>{t.name}</span>
          <input
            name="name"
            required
            pattern=".*\S.*"
            maxLength={100}
            autoComplete="name"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder={t.namePlaceholder}
          />
        </label>
        <label>
          <span>{t.contact}</span>
          <input
            name="contact"
            required
            pattern=".*\S.*"
            maxLength={100}
            autoComplete="tel"
            value={form.contact}
            onChange={(e) => update("contact", e.target.value)}
            placeholder={t.contactPlaceholder}
          />
        </label>
        <label>
          <span>{t.email}</span>
          <input
            name="email"
            type="email"
            maxLength={200}
            autoComplete="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="you@example.com"
          />
        </label>
        <label>
          <span>{t.service}</span>
          <select
            name="service"
            required
            value={form.service}
            onChange={(e) => update("service", e.target.value)}
          >
            {services.map((item) => (
              <option key={item.code} value={item.code}>
                {serviceCopy[item.code].title}
              </option>
            ))}
            <option value={unsureCode}>{t.unsure}</option>
          </select>
        </label>
        {fileService && (
          <p className="field-wide booking-file-notice" role="note">
            <Info size={15} aria-hidden="true" /> {t.fileNotice}
          </p>
        )}
        <label className="field-wide">
          <span>{t.note}</span>
          <textarea
            name="note"
            rows={4}
            maxLength={3000}
            value={form.note}
            onChange={(e) => update("note", e.target.value)}
            placeholder={t.notePlaceholder}
          />
        </label>
      </div>
      <label className="booking-honeypot" aria-hidden="true">
        {t.honeypot}
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <label className="consent-row">
        <input name="consent" required type="checkbox" />
        <span>{t.consent}</span>
      </label>
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      <button
        className="button button-blue submit-button"
        type="submit"
        disabled={busy || (loading && mode === "slot")}
      >
        {busy ? (
          <>
            <LoaderCircle size={16} className="loading-spinner" /> {t.busy}
          </>
        ) : (
          <>
            {mode === "slot" ? t.submitSlot : t.submitProposal}{" "}
            <Send size={16} />
          </>
        )}
      </button>
      <p className="form-note">{t.formNote}</p>
    </form>
  );
}

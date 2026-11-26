import { ArrowLeft, Heart, Laptop, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BookingForm } from "@/components/booking-form";
import { SiteHeader } from "@/components/site-header";
import { isServiceCode } from "@/lib/catalog";
import { hasLocale, localePath, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { pageMetadata } from "@/lib/i18n/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return pageMetadata(lang, "/booking", getDictionary(lang).meta.booking);
}

export default async function BookingPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ service?: string }>;
}) {
  const [{ lang: rawLang }, { service }] = await Promise.all([
    params,
    searchParams,
  ]);
  if (!hasLocale(rawLang)) notFound();
  const lang: Locale = rawLang;
  const dict = getDictionary(lang);
  const { booking } = dict;
  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Ho_Chi_Minh",
  }).format(new Date());
  const switchPath = isServiceCode(service)
    ? `/booking?service=${service}`
    : "/booking";
  return (
    <>
      <SiteHeader
        lang={lang}
        nav={dict.nav}
        brandAria={dict.brandAria}
        path={switchPath}
      />
      <main className="booking-page">
        <section className="booking-hero">
          <div className="container booking-hero-inner">
            <Link className="back-link" href={localePath(lang, "/")}>
              <ArrowLeft size={15} /> {booking.back}
            </Link>
            <p className="eyebrow">{booking.eyebrow}</p>
            <h1>
              {booking.titleA}
              <br />
              <em>{booking.titleEm}</em>
            </h1>
            <p>{booking.intro}</p>
            <div className="booking-highlights">
              <span>
                <ShieldCheck /> {booking.highlights[0]}
              </span>
              <span>
                <Heart /> {booking.highlights[1]}
              </span>
              <span>
                <Laptop /> {booking.highlights[2]}
              </span>
            </div>
          </div>
        </section>
        <section className="booking-main">
          <div className="container booking-layout">
            <aside>
              <p className="eyebrow">{booking.asideEyebrow}</p>
              <h2>
                {booking.asideTitleA}
                <br />
                <em>{booking.asideTitleEm}</em>
              </h2>
              <p>{booking.asideP1}</p>
              <p>{booking.asideP2}</p>
              <ol>
                {booking.steps.map((step, index) => (
                  <li key={step}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </aside>
            <div className="booking-form-card">
              <BookingForm
                key={service ?? "default"}
                lang={lang}
                copy={booking}
                serviceCopy={dict.services}
                initialService={service}
                today={today}
              />
            </div>
          </div>
        </section>
        <footer className="booking-footer">
          <div className="container">
            <Link href={localePath(lang, "/")}>© 2026 sarahreader.com</Link>
            <span>{booking.footerTags}</span>
          </div>
        </footer>
      </main>
    </>
  );
}

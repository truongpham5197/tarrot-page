import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Heart,
  Laptop,
  LockKeyhole,
  MessageCircle,
  MoonStar,
  Sparkles,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Fragment } from "react";
import { notFound } from "next/navigation";
import { Divider, SiteFooter } from "@/components/site-footer";
import { ServiceSymbol } from "@/components/service-symbol";
import { SiteHeader } from "@/components/site-header";
import { formatPrice, lowestPrice, services } from "@/lib/catalog";
import { hasLocale, localePath, type Locale } from "@/lib/i18n/config";
import { fill, getDictionary } from "@/lib/i18n/dictionaries";
import { pageMetadata } from "@/lib/i18n/seo";
import { site } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { meta } = getDictionary(lang);
  return pageMetadata(lang, "/", { ...meta.home, absoluteTitle: true });
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  if (!hasLocale(rawLang)) notFound();
  const lang: Locale = rawLang;
  const dict = getDictionary(lang);
  const { home, footer } = dict;
  const from = formatPrice(lowestPrice, lang);
  const faqs = dict.faqs.map(([question, answer]) => [
    question,
    fill(answer, { from }),
  ]);
  const bookingHref = localePath(lang, "/booking");
  const pricingHref = localePath(lang, "/pricing");
  const showExplore = home.explore.links.length > 0;

  return (
    <>
      <SiteHeader
        lang={lang}
        nav={dict.nav}
        brandAria={dict.brandAria}
        path="/"
      />
      <main id="trang-chu">
        <section className="hero">
          <div className="hero-photo" aria-hidden="true" />
          <div className="hero-orbit" aria-hidden="true">
            <span>✦</span>
          </div>
          <span className="float-star star-one" aria-hidden="true">
            ✧
          </span>
          <span className="float-star star-two" aria-hidden="true">
            ✧
          </span>
          <div className="container hero-content">
            <p className="eyebrow">
              <span /> {home.eyebrow} <span />
            </p>
            <p className="script hero-pretitle">{home.pretitle}</p>
            <h1>
              {home.titleA}
              <br />
              {home.titleB} <em>{home.titleEm}</em>
            </h1>
            <p className="hero-description">
              {home.descA}
              <br className="desktop-break" /> {home.descB}
            </p>
            <div className="hero-actions">
              <Link href={bookingHref} className="button button-blue">
                {home.ctaBook} <ArrowUpRight size={17} />
              </Link>
              <a className="button button-outline" href="#dich-vu">
                {home.ctaServices} <ArrowDown size={15} />
              </a>
            </div>
            <div className="hero-assurances">
              <span>
                <Heart />
                {home.assurances[0]}
              </span>
              <i />
              <span>
                <LockKeyhole />
                {home.assurances[1]}
              </span>
              <i />
              <span>
                <Laptop />
                {home.assurances[2]}
              </span>
            </div>
          </div>
          <div className="photo-note">
            <span className="script">
              {home.photoNoteA}
              <br />
              {home.photoNoteB}
            </span>
            <span className="note-line">♡</span>
          </div>
          <div className="hero-bottom">
            <span>
              {home.heroBottom.map((item, index) => (
                <Fragment key={item}>
                  {index > 0 && <b>✦</b>} {item}{" "}
                </Fragment>
              ))}
            </span>
            <a href="#dich-vu" aria-label={home.ctaServices}>
              <ArrowDown size={16} />
            </a>
          </div>
        </section>

        <section className="services section" id="dich-vu">
          <div className="container">
            <header className="section-heading">
              <p className="eyebrow">{home.services.eyebrow}</p>
              <h2>
                {home.services.titleA} <em>{home.services.titleEm}</em>
              </h2>
              <p>{home.services.intro}</p>
            </header>
            <div className="services-grid">
              {home.cards.map((card) => {
                const service = services.find((s) => s.code === card.code)!;
                const lowest = Math.min(...service.prices.map((p) => p.vnd));
                return (
                  <article className="service-card" key={card.code}>
                    <div className="watercolor-icon">
                      <ServiceSymbol type={service.symbol} />
                    </div>
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                    <div className="service-price">
                      <small>{home.services.from}</small>
                      <strong>{formatPrice(lowest, lang)}</strong>
                    </div>
                    <Link
                      href={localePath(lang, `/booking?service=${card.code}`)}
                      aria-label={fill(home.services.bookAria, {
                        title: card.title,
                      })}
                    >
                      {home.services.explore} <ArrowUpRight size={15} />
                    </Link>
                  </article>
                );
              })}
            </div>
            <div className="services-pricing-cta">
              <Link className="button button-outline" href={pricingHref}>
                {home.services.pricingCta} <ArrowRight size={15} />
              </Link>
            </div>
            <Divider />
            <p className="services-footnote">
              <Sparkles size={15} /> {home.services.footnote}{" "}
              <a href={site.zalo} target="_blank" rel="noreferrer">
                {home.services.footnoteLink} <ArrowRight size={14} />
              </a>
            </p>
          </div>
        </section>

        <section className="connection section" id="dat-hen">
          <div className="container connection-grid">
            <div className="offer-wrap">
              <span className="ribbon" aria-hidden="true">
                ୨୧
              </span>
              <article className="offer-card">
                <p className="eyebrow">{home.connection.eyebrow}</p>
                <h2>
                  {home.connection.titleA} <span>{home.connection.titleEm}</span>
                </h2>
                <Divider />
                <p className="script offer-script">{home.connection.script}</p>
                <p className="offer-question">{home.connection.question}</p>
                <div className="offer-date">
                  <CalendarDays size={16} /> {home.connection.date}
                </div>
                <p className="offer-status">{home.connection.status}</p>
                <Link
                  className="text-link"
                  href={localePath(lang, "/booking?service=tarot-one-question")}
                >
                  {home.connection.link} <ArrowUpRight size={16} />
                </Link>
              </article>
              <span className="offer-sparkle" aria-hidden="true">
                ✧
              </span>
            </div>
            <div className="online-copy">
              <p className="eyebrow">{home.online.eyebrow}</p>
              <h2>
                {home.online.titleA}
                <br />
                <em>{home.online.titleEm}</em>
              </h2>
              <p>{home.online.text}</p>
              <div className="online-brush">
                <Laptop strokeWidth={1} />
                <span>
                  {home.online.brushPre} <strong>{home.online.brushStrong}</strong>
                </span>
                <span className="brush-sparkle">✧</span>
              </div>
              <ul className="online-benefits">
                {home.online.benefits.map((text) => (
                  <li key={text}>
                    <Sparkles size={16} strokeWidth={1.1} />
                    {text}
                  </li>
                ))}
              </ul>
              <Link href={bookingHref} className="button button-blue">
                {home.online.cta} <ArrowUpRight size={16} />
              </Link>
              <p className="script online-note">{home.online.note}</p>
            </div>
          </div>
        </section>

        <section className="about section" id="ve-sarah">
          <div className="container about-grid">
            <div className="about-visual">
              <div
                className="about-picture"
                role="img"
                aria-label={home.about.pictureAlt}
              />
              <span className="about-caption script">
                {home.about.captionA}
                <br />
                {home.about.captionB}
              </span>
              <span className="about-star" aria-hidden="true">
                ✦
              </span>
            </div>
            <div className="about-copy">
              <p className="eyebrow">{home.about.eyebrow}</p>
              <h2>
                {home.about.hi}
                <br />
                {home.about.iam} <span className="script">{home.about.name}</span>
              </h2>
              <p>{home.about.p1}</p>
              <p>{home.about.p2}</p>
              <blockquote>
                {home.about.quoteA}
                <br />
                {home.about.quoteB}
              </blockquote>
              <a
                className="text-link"
                href={site.facebook}
                target="_blank"
                rel="noreferrer"
              >
                {home.about.link} <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </section>

        {showExplore && (
          <section className="explore section" id="kham-pha">
            <div className="container">
              <header className="section-heading">
                <p className="eyebrow">{home.explore.eyebrow}</p>
                <h2>
                  {home.explore.titleA} <em>{home.explore.titleEm}</em>
                </h2>
                <p>{home.explore.intro}</p>
              </header>
              <div className="explore-grid">
                <a className="explore-feature" href="/games/tarot.html">
                  <div className="mini-cards" aria-hidden="true">
                    <span>☾</span>
                    <span>✦</span>
                    <span>☼</span>
                  </div>
                  <div>
                    <p className="eyebrow">{home.explore.featureEyebrow}</p>
                    <h3>
                      {home.explore.featureA}
                      <br />
                      {home.explore.featureB}
                    </h3>
                    <span className="text-link">
                      {home.explore.featureCta} <ArrowUpRight size={17} />
                    </span>
                  </div>
                </a>
                <div className="explore-links">
                  {home.explore.links.map(({ title, description, href }) => (
                    <a href={href} key={href}>
                      <span>
                        <strong>{title}</strong>
                        <small>{description}</small>
                      </span>
                      <ArrowUpRight size={19} />
                    </a>
                  ))}
                </div>
              </div>
              <p className="explore-note">{home.explore.note}</p>
            </div>
          </section>
        )}

        <section className="faq section" id="faq">
          <div className="container faq-grid">
            <div>
              <p className="eyebrow">{home.faq.eyebrow}</p>
              <h2>
                {home.faq.titleA}
                <br />
                <em>{home.faq.titleEm}</em>
              </h2>
              <p>
                {home.faq.introA}
                <br />
                {home.faq.introB}
              </p>
              <a
                className="text-link"
                href={site.zalo}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle size={16} /> {home.faq.link}{" "}
                <ArrowUpRight size={15} />
              </a>
            </div>
            <div className="faq-list">
              {faqs.map(([question, answer]) => (
                <details key={question}>
                  <summary>
                    {question}
                    <span aria-hidden="true">+</span>
                  </summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="final-cta">
          <div className="container">
            <MoonStar size={34} strokeWidth={0.8} />
            <p className="script">{home.finalCta.script}</p>
            <h2>
              {home.finalCta.titleA} <em>{home.finalCta.titleEm}</em>
            </h2>
            <p>{home.finalCta.text}</p>
            <Link className="button button-blue" href={bookingHref}>
              {home.finalCta.cta} <ArrowUpRight size={16} />
            </Link>
            <span className="cta-heart" aria-hidden="true">
              ♡
            </span>
          </div>
        </section>
      </main>
      <SiteFooter lang={lang} footer={footer} />
    </>
  );
}

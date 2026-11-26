import {
  ArrowLeft,
  ArrowUpRight,
  Globe,
  Heart,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ServiceSymbol } from "@/components/service-symbol";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  formatPrice,
  lowestPrice,
  serviceGroups,
  services,
} from "@/lib/catalog";
import { hasLocale, localePath, type Locale } from "@/lib/i18n/config";
import { fill, getDictionary } from "@/lib/i18n/dictionaries";
import { pageMetadata } from "@/lib/i18n/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { meta } = getDictionary(lang);
  const from = formatPrice(lowestPrice, lang);
  return pageMetadata(lang, "/pricing", {
    ...meta.pricing,
    description: fill(meta.pricing.description, { from }),
  });
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  if (!hasLocale(rawLang)) notFound();
  const lang: Locale = rawLang;
  const dict = getDictionary(lang);
  const { pricing } = dict;
  return (
    <>
      <SiteHeader
        lang={lang}
        nav={dict.nav}
        brandAria={dict.brandAria}
        path="/pricing"
      />
      <main className="pricing-page">
        <section className="booking-hero pricing-hero">
          <div className="container booking-hero-inner">
            <Link className="back-link" href={localePath(lang, "/")}>
              <ArrowLeft size={15} /> {pricing.back}
            </Link>
            <p className="eyebrow">{pricing.eyebrow}</p>
            <h1>
              {pricing.titleA}
              <br />
              <em>{pricing.titleEm}</em>
            </h1>
            <p>{pricing.intro}</p>
            <div className="booking-highlights">
              <span>
                <Sparkles /> {pricing.highlights[0]}
              </span>
              <span>
                <Heart /> {pricing.highlights[1]}
              </span>
              <span>
                <MessageCircle /> {pricing.highlights[2]}
              </span>
            </div>
          </div>
        </section>
        <section className="pricing-main section">
          <div className="container">
            {serviceGroups.map((group) => {
              const items = services.filter((item) => item.group === group);
              if (items.length === 0) return null;
              return (
                <section
                  className="pricing-group"
                  key={group}
                  aria-labelledby={`group-${group}`}
                >
                  <header className="pricing-group-heading">
                    <h2 id={`group-${group}`}>{dict.groups[group].title}</h2>
                    <p>{dict.groups[group].description}</p>
                  </header>
                  <div className="pricing-grid">
                    {items.map((item) => {
                      const copy = dict.services[item.code];
                      const delivery = dict.deliveries[item.delivery];
                      return (
                        <article
                          className="pricing-card"
                          id={item.code}
                          key={item.code}
                        >
                          <div className="pricing-card-head">
                            <div className="watercolor-icon">
                              <ServiceSymbol type={item.symbol} />
                            </div>
                            <h3>{copy.title}</h3>
                          </div>
                          <p className="pricing-card-desc">
                            {copy.description}
                          </p>
                          <ul className="pricing-rows">
                            {item.prices.map((price) => (
                              <li key={price.unit}>
                                <span>{dict.units[price.unit]}</span>
                                <strong>{formatPrice(price.vnd, lang)}</strong>
                              </li>
                            ))}
                          </ul>
                          {delivery && (
                            <p className="pricing-delivery">{delivery}</p>
                          )}
                          <Link
                            className="text-link"
                            href={localePath(
                              lang,
                              `/booking?service=${item.code}`,
                            )}
                          >
                            {pricing.book} <ArrowUpRight size={15} />
                          </Link>
                        </article>
                      );
                    })}
                  </div>
                </section>
              );
            })}
            <p className="pricing-unsure">{pricing.unsure}</p>
            <p className="pricing-currency-note">{pricing.currencyNote}</p>
            <aside className="pricing-overseas">
              <Globe size={20} strokeWidth={1.2} aria-hidden="true" />
              <div>
                <h2>{pricing.overseasTitle}</h2>
                <p>{pricing.overseasText}</p>
              </div>
            </aside>
          </div>
        </section>
        <section className="final-cta">
          <div className="container">
            <p className="script">{pricing.closingA}</p>
            <h2>{pricing.closingB}</h2>
            <Link
              className="button button-blue"
              href={localePath(lang, "/booking")}
            >
              {pricing.closingCta} <ArrowUpRight size={16} />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter lang={lang} footer={dict.footer} />
    </>
  );
}

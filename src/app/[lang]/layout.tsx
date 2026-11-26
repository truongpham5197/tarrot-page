import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services } from "@/lib/catalog";
import { hasLocale, locales, ogLocales } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { site } from "@/lib/site";
import "../shared-styles";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = getDictionary(lang);
  return {
    metadataBase: new URL(site.url),
    title: {
      default: dict.meta.home.title,
      template: "%s | Reader Sarah",
    },
    description: dict.meta.home.description,
    icons: { icon: "/icon.svg", apple: "/icon.svg" },
    openGraph: { siteName: site.name, locale: ogLocales[lang] },
    robots: { index: true, follow: true },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const allPrices = services.flatMap((service) => service.prices.map((price) => price.vnd));
  const lowest = Math.min(...allPrices),
    highest = Math.max(...allPrices);
  const names = services.map((service) => dict.services[service.code].title);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    url: lang === "vi" ? site.url : `${site.url}/${lang}`,
    telephone: `+84${site.phone.slice(1)}`,
    image: `${site.url}/img/sarah-seaside.webp`,
    description: dict.jsonLd.description,
    inLanguage: lang,
    availableLanguage: ["vi", "en"],
    areaServed: lang === "vi" ? "Việt Nam" : ["Vietnam", "Worldwide (online)"],
    priceRange: `${lowest.toLocaleString("en-US")}–${highest.toLocaleString("en-US")} VND`,
    currenciesAccepted: "VND",
    sameAs: [site.facebook, site.zalo],
    serviceType: names,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: dict.jsonLd.catalogName,
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        priceCurrency: "VND",
        price: Math.min(...service.prices.map((p) => p.vnd)),
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "VND",
          minPrice: Math.min(...service.prices.map((p) => p.vnd)),
          maxPrice: Math.max(...service.prices.map((p) => p.vnd)),
        },
        itemOffered: {
          "@type": "Service",
          name: dict.services[service.code].title,
          description: dict.services[service.code].description,
        },
      })),
    },
  };
  return (
    <html lang={dict.htmlLang}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}

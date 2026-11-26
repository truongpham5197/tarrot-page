import type { Metadata } from "next";
import { site } from "@/lib/site";
import {
  languageAlternates,
  localePath,
  ogLocales,
  locales,
  type Locale,
} from "./config";

type PageSeo = {
  title: string;
  /** Use the title as-is instead of "%s | Reader Sarah". */
  absoluteTitle?: boolean;
  description: string;
  keywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
  twitterDescription?: string;
  ogAlt?: string;
};

/**
 * Full metadata for one public page in one locale: canonical, hreflang
 * alternates (vi / en / x-default), Open Graph and Twitter. Next shallow-merges
 * metadata per top-level key, so every page states these keys completely
 * instead of inheriting half of them from the layout.
 */
export function pageMetadata(
  lang: Locale,
  path: string,
  seo: PageSeo,
): Metadata {
  const url = localePath(lang, path);
  const image = {
    url: "/img/sarah-seaside.webp",
    width: 1536,
    height: 1024,
    alt: seo.ogAlt ?? site.name,
  };
  return {
    title: seo.absoluteTitle ? { absolute: seo.title } : seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      type: "website",
      siteName: site.name,
      url,
      locale: ogLocales[lang],
      alternateLocale: locales
        .filter((locale) => locale !== lang)
        .map((locale) => ogLocales[locale]),
      title: seo.ogTitle ?? seo.title,
      description: seo.ogDescription ?? seo.description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.ogTitle ?? seo.title,
      description: seo.twitterDescription ?? seo.description,
      images: [image.url],
    },
  };
}

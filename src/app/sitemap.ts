import type { MetadataRoute } from "next";
import { locales, localePath } from "@/lib/i18n/config";
import { site } from "@/lib/site";

const pages = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/pricing", changeFrequency: "monthly", priority: 0.9 },
  { path: "/booking", changeFrequency: "monthly", priority: 0.8 },
] as const;

const url = (lang: (typeof locales)[number], path: string) =>
  `${site.url}${localePath(lang, path) === "/" ? "" : localePath(lang, path)}`;

// One entry per locale and page, each carrying hreflang alternates so search
// engines pair the Vietnamese and English versions of the same page.
export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap(({ path, changeFrequency, priority }) =>
    locales.map((lang) => ({
      url: url(lang, path),
      changeFrequency,
      priority,
      alternates: {
        languages: {
          ...Object.fromEntries(locales.map((l) => [l, url(l, path)])),
          "x-default": url("en", path),
        },
      },
    })),
  );
}

export const locales = ["vi", "en"] as const;
export type Locale = (typeof locales)[number];

/** Vietnamese stays at the site root (/, /booking) so existing URLs and SEO keep working. */
export const defaultLocale: Locale = "vi";

export const ogLocales: Record<Locale, string> = {
  vi: "vi_VN",
  en: "en_US",
};

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/**
 * Build a public URL path for a locale.
 *   localePath("vi", "/booking")  -> "/booking"
 *   localePath("en", "/booking")  -> "/en/booking"
 *   localePath("en", "/#faq")     -> "/en#faq"
 */
export function localePath(lang: Locale, path = "/"): string {
  const match = /^([^?#]*)(.*)$/.exec(path)!;
  const rawBase = match[1] || "/";
  const base = rawBase.startsWith("/") ? rawBase : `/${rawBase}`;
  const rest = match[2];
  if (lang === defaultLocale) return `${base}${rest}`;
  return `${base === "/" ? `/${lang}` : `/${lang}${base}`}${rest}`;
}

/** Split a public pathname into its locale and the locale-less path. */
export function splitLocale(pathname: string): { lang: Locale; path: string } {
  for (const lang of locales) {
    if (lang === defaultLocale) continue;
    if (pathname === `/${lang}`) return { lang, path: "/" };
    if (pathname.startsWith(`/${lang}/`))
      return { lang, path: pathname.slice(lang.length + 1) };
  }
  return { lang: defaultLocale, path: pathname || "/" };
}

/** hreflang alternates for a locale-less path. English doubles as x-default. */
export function languageAlternates(path: string) {
  return {
    vi: localePath("vi", path),
    en: localePath("en", path),
    "x-default": localePath("en", path),
  };
}

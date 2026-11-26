import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/lib/i18n/config";

/**
 * Vietnamese is the default locale and lives at the site root (/, /booking,
 * /pricing) so existing URLs and rankings keep working. Internally those paths
 * are rewritten to /vi/... . English lives at /en/... . There is deliberately
 * no Accept-Language redirect: every URL has exactly one language, which is
 * what search engines expect (the language switcher + hreflang handle the rest).
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // /vi and /vi/... are not public URLs: send them to the canonical root path.
  if (pathname === `/${defaultLocale}` || pathname.startsWith(`/${defaultLocale}/`)) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(defaultLocale.length + 1) || "/";
    return NextResponse.redirect(url, 308);
  }

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? `/${defaultLocale}` : `/${defaultLocale}${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip API, admin, Next internals, static asset folders and any path with a
  // file extension (robots.txt, sitemap.xml, icon.svg, game.html, sw.js, ...).
  matcher: ["/((?!_next|api|admin|games|img|fonts|css|.*\\..*).*)"],
};

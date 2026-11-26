"use client";

import { ArrowUpRight, Globe, Menu, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { locales, localePath, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export function SiteHeader({
  lang,
  nav,
  brandAria,
  path = "/",
}: {
  lang: Locale;
  nav: Dictionary["nav"];
  brandAria: string;
  /** Locale-less path of the current page, used by the language switcher. */
  path?: string;
}) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);

  const navItems: [string, string][] = [
    [nav.home, localePath(lang, "/#trang-chu")],
    [nav.services, localePath(lang, "/#dich-vu")],
    [nav.pricing, localePath(lang, "/pricing")],
    [nav.about, localePath(lang, "/#ve-sarah")],
    [nav.booking, localePath(lang, "/booking")],
    // The explore corner links to Vietnamese-only tools, so it is Vietnamese-only.
    ...(lang === "vi"
      ? ([[nav.explore, localePath(lang, "/#kham-pha")]] as [string, string][])
      : []),
  ];
  const other = locales.find((locale) => locale !== lang)!;
  const switcher = (
    <Link
      className="lang-switch"
      href={localePath(other, path)}
      hrefLang={other}
      lang={other}
      aria-label={nav.switchLabel}
      title={nav.switchLabel}
      onClick={() => setOpen(false)}
    >
      <Globe size={14} aria-hidden="true" />
      {nav.switchShort}
    </Link>
  );

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href={localePath(lang, "/")} className="brand" aria-label={brandAria}>
          <Sparkles strokeWidth={1} />
          <span className="brand-copy">
            <strong>
              Reader Sarah<span>✧</span>
            </strong>
            <small>SARAHREADER.COM</small>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label={nav.main}>
          {navItems.map(([label, href]) => (
            <Link href={href} key={href}>
              {label}
            </Link>
          ))}
        </nav>
        {switcher}
        <Link
          className="button button-blue button-compact desktop-booking"
          href={localePath(lang, "/booking")}
        >
          {nav.cta} <ArrowUpRight size={15} />
        </Link>
        <button
          className="menu-button"
          type="button"
          aria-label={open ? nav.closeMenu : nav.openMenu}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav id="mobile-menu" className="mobile-nav" aria-label={nav.mobile}>
          {navItems.map(([label, href]) => (
            <Link href={href} key={href} onClick={() => setOpen(false)}>
              {label}
            </Link>
          ))}
          <Link
            className="button button-blue"
            href={localePath(lang, "/booking")}
            onClick={() => setOpen(false)}
          >
            {nav.cta} <ArrowUpRight size={16} />
          </Link>
        </nav>
      )}
    </header>
  );
}

import { ArrowUpRight, Check, Sparkles } from "lucide-react";
import Link from "next/link";
import { localePath, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { site } from "@/lib/site";

export function Divider() {
  return (
    <div className="celestial-divider" aria-hidden="true">
      <span />✦<span />
    </div>
  );
}

export function SiteFooter({
  lang,
  footer,
}: {
  lang: Locale;
  footer: Dictionary["footer"];
}) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <Link className="footer-brand script" href={localePath(lang, "/")}>
              Reader Sarah <span>✧</span>
            </Link>
            <p>{footer.tagline}</p>
          </div>
          <div className="footer-nav">
            <Link href={localePath(lang, "/#dich-vu")}>{footer.services}</Link>
            <Link href={localePath(lang, "/pricing")}>{footer.pricing}</Link>
            <Link href={localePath(lang, "/#ve-sarah")}>{footer.about}</Link>
            <Link href={localePath(lang, "/#faq")}>{footer.faq}</Link>
            <Link href={localePath(lang, "/booking")}>{footer.booking}</Link>
          </div>
          <div className="footer-social">
            <a href={site.facebook} target="_blank" rel="noreferrer">
              {footer.facebook} <ArrowUpRight size={13} />
            </a>
            <a href={site.zalo} target="_blank" rel="noreferrer">
              {footer.zalo} · {site.phoneDisplay} <ArrowUpRight size={13} />
            </a>
            <a href={site.telephone}>
              {footer.call} <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
        <Divider />
        <div className="footer-bottom">
          <span>
            {footer.bottomA} <Sparkles size={12} />
          </span>
          <span>
            <Check size={13} /> {footer.bottomB}
          </span>
        </div>
      </div>
    </footer>
  );
}

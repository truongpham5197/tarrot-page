"use client";

import { Menu, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const navItems = [
  ["Trang chủ", "/#trang-chu"],
  ["Dịch vụ", "/#dich-vu"],
  ["Về mình", "/#ve-minh"],
  ["Cảm nhận khách hàng", "/#cam-nhan"],
  ["FAQ", "/#faq"],
  ["Trò chơi ✦", "/game.html"],
];

export function SiteHeader({ dark = true }: { dark?: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header ${dark ? "header-dark" : "header-light"} ${scrolled ? "is-scrolled" : ""}`}>
      <div className="header-inner">
        <Link className="brand" href="/#trang-chu" aria-label="Lumiere — về trang chủ">
          <span className="brand-symbol" aria-hidden="true"><Sparkles size={18} /></span>
          <span className="brand-copy"><strong>Lumiere</strong><small>Tựa sáng điều bên trong</small></span>
        </Link>

        <nav className="desktop-nav" aria-label="Điều hướng chính">
          {navItems.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}
        </nav>

        <Link className="button button-gold button-compact desktop-booking" href="/booking">Đặt lịch ngay <span>→</span></Link>
        <button
          className="menu-button"
          type="button"
          aria-label={open ? "Đóng menu" : "Mở menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <nav className="mobile-nav" id="mobile-menu" aria-label="Điều hướng di động">
          {navItems.map(([label, href]) => (
            <Link href={href} key={href} onClick={() => setOpen(false)}>{label}</Link>
          ))}
          <Link className="button button-gold" href="/booking" onClick={() => setOpen(false)}>Đặt lịch ngay <span>→</span></Link>
        </nav>
      )}
    </header>
  );
}

"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <header
      ref={navRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: "background 200ms ease-out, border-color 200ms ease-out",
        background: scrolled
          ? "rgba(23,43,54,0.92)"
          : "transparent",
        borderBottom: scrolled
          ? "1px solid rgba(217,232,226,0.08)"
          : "1px solid transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
      }}
    >
      <nav
        aria-label="Primary navigation"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
          height: "68px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <a
          href="#"
          aria-label="Synapse AI home"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
          }}
        >
          <span
            style={{
              width: 32,
              height: 32,
              background: "var(--forsythia)",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              src="/svgs/cube-16-solid.svg"
              alt=""
              width={18}
              height={18}
              style={{ filter: "invert(0)" }}
            />
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontWeight: 700,
              fontSize: "1.1rem",
              color: "var(--arctic)",
              letterSpacing: "-0.02em",
            }}
          >
            synapse<span style={{ color: "var(--forsythia)" }}>.ai</span>
          </span>
        </a>

        {/* Desktop links */}
        <ul
          style={{
            display: "flex",
            alignItems: "center",
            gap: "32px",
            listStyle: "none",
          }}
          className="desktop-nav"
        >
          {links.map((l) => (
            <li key={l.label}>
              <a href={l.href} className="nav-link">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }} className="desktop-cta">
          <a href="#pricing" className="btn-primary" style={{ padding: "9px 20px" }}>
            Start free
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
          className="mobile-menu-btn"
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: "8px",
            display: "none",
          }}
        >
          {menuOpen ? (
            <Image src="/svgs/x-mark.svg" alt="" width={22} height={22} style={{ filter: "invert(1)" }} />
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--arctic)" strokeWidth="1.5" strokeLinecap="round">
              <path d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <nav
          aria-label="Mobile navigation"
          style={{
            background: "rgba(23,43,54,0.97)",
            borderTop: "1px solid rgba(217,232,226,0.08)",
            padding: "20px 24px 28px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="nav-link"
              onClick={() => setMenuOpen(false)}
              style={{ fontSize: "1rem" }}
            >
              {l.label}
            </a>
          ))}
          <a href="#pricing" className="btn-primary" style={{ width: "fit-content" }}>
            Start free
          </a>
        </nav>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav, .desktop-cta { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </header>
  );
}

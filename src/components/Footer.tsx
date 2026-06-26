"use client";
import Image from "next/image";

// Map each footer link to its correct href
const links: Record<string, Record<string, string>> = {
  Product: {
    Features:  "#features",
    Pricing:   "#pricing",
    Changelog: "javascript:void(0)",
    Roadmap:   "javascript:void(0)",
    Status:    "javascript:void(0)",
  },
  Developers: {
    "API Reference": "javascript:void(0)",
    SDKs:            "javascript:void(0)",
    CLI:             "javascript:void(0)",
    GitHub:          "https://github.com/SwatiMogelisetty/synapse-ai",
    FAQ:             "#faq",
  },
  Company: {
    About:    "javascript:void(0)",
    Blog:     "javascript:void(0)",
    Careers:  "javascript:void(0)",
    Press:    "javascript:void(0)",
    Contact:  "#contact",
  },
  Legal: {
    "Privacy Policy":    "javascript:void(0)",
    "Terms of Service":  "javascript:void(0)",
    "Cookie Policy":     "javascript:void(0)",
    Security:            "javascript:void(0)",
  },
};

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(217,232,226,0.08)",
        padding: "72px 24px 40px",
        background: "rgba(23,43,54,0.4)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr repeat(4, 1fr)",
            gap: "48px",
            marginBottom: "64px",
          }}
          className="footer-grid"
        >
          {/* Brand column */}
          <div>
            <a
              href="javascript:void(0)"
              aria-label="Synapse AI home"
              style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", marginBottom: "16px" }}
            >
              <span
                style={{
                  width: 32, height: 32,
                  background: "var(--forsythia)",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image src="/svgs/cube-16-solid.svg" alt="" width={18} height={18} />
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: "1.05rem", color: "var(--arctic)" }}>
                synapse<span style={{ color: "var(--forsythia)" }}>.ai</span>
              </span>
            </a>
            <p style={{ fontSize: "0.875rem", color: "rgba(217,232,226,0.65)", lineHeight: 1.65, maxWidth: "240px" }}>
              The AI-native data automation platform trusted by 12,000+ engineering teams worldwide.
            </p>
            {/* Social icons placeholder */}
            <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
              {["/svgs/link-solid.svg", "/svgs/arrow-trending-up.svg", "/svgs/search.svg"].map((src, i) => (
                <a
                  key={i}
                  href="javascript:void(0)"
                  aria-label={["Website", "Updates", "Search"][i]}
                  style={{
                    width: 34, height: 34,
                    borderRadius: "8px",
                    background: "rgba(17,76,90,0.4)",
                    border: "1px solid rgba(217,232,226,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "border-color 150ms ease-out",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(255,200,1,0.4)")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(217,232,226,0.08)")}
                >
                  <Image src={src} alt="" width={14} height={14} style={{ filter: "invert(0.6)" }} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([category, items]) => (
            <nav key={category} aria-label={`${category} links`}>
              <h3
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--forsythia)",
                  marginBottom: "16px",
                }}
              >
                {category}
              </h3>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
                {Object.entries(items).map(([label, href]) => (
                  <li key={label}>
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      style={{
                        fontSize: "0.875rem",
                        color: "rgba(217,232,226,0.65)",
                        textDecoration: "none",
                        transition: "color 150ms ease-out",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--arctic)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(217,232,226,0.65)")}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(217,232,226,0.06)",
            paddingTop: "28px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <p style={{ fontSize: "0.8rem", color: "rgba(217,232,226,0.55)" }}>
            © {new Date().getFullYear()} Synapse AI, Inc. All rights reserved.
          </p>

          {/* Scroll to top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Scroll to top"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: "rgba(17,76,90,0.4)",
              border: "1px solid rgba(217,232,226,0.1)",
              borderRadius: "8px",
              padding: "6px 12px",
              cursor: "pointer",
              color: "var(--mint)",
              fontSize: "0.78rem",
              fontFamily: "var(--font-mono)",
              transition: "border-color 150ms ease-out, color 150ms ease-out",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,200,1,0.4)";
              e.currentTarget.style.color = "var(--forsythia)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(217,232,226,0.1)";
              e.currentTarget.style.color = "var(--mint)";
            }}
          >
            <Image src="/svgs/chevron-up-solid.svg" alt="" width={12} height={12} style={{ filter: "invert(0.6)" }} />
            Back to top
          </button>

          <p style={{ fontSize: "0.8rem", color: "rgba(217,232,226,0.55)", display: "flex", alignItems: "center", gap: "6px" }}>
            <Image src="/svgs/cog-8-tooth.svg" alt="" width={12} height={12} style={{ filter: "invert(0.3)" }} />
            Built with precision. Powered by intelligence.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 480px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}

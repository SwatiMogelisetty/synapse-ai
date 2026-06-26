"use client";

const logos = [
  "Stripe", "Notion", "Figma", "Linear", "Vercel",
  "Supabase", "Cloudflare", "Datadog", "Twilio", "Snowflake",
  "Stripe", "Notion", "Figma", "Linear", "Vercel",
  "Supabase", "Cloudflare", "Datadog", "Twilio", "Snowflake",
];

export default function LogoTicker() {
  return (
    <section
      aria-label="Trusted by leading companies"
      style={{
        borderTop: "1px solid rgba(217,232,226,0.06)",
        borderBottom: "1px solid rgba(217,232,226,0.06)",
        padding: "28px 0",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Fade edges */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: "0",
          background: "linear-gradient(90deg, var(--noir) 0%, transparent 15%, transparent 85%, var(--noir) 100%)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      <p
        style={{
          textAlign: "center",
          fontFamily: "var(--font-mono)",
          fontSize: "0.7rem",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "rgba(217,232,226,0.4)",
          marginBottom: "20px",
        }}
      >
        Trusted by world-class teams
      </p>

      <div style={{ display: "flex", overflow: "hidden" }}>
        <div className="marquee-track">
          {logos.map((name, i) => (
            <span
              key={i}
              style={{
                fontFamily: "var(--font-mono)",
                fontWeight: 700,
                fontSize: "0.95rem",
                letterSpacing: "0.05em",
                color: "rgba(217,232,226,0.3)",
                whiteSpace: "nowrap",
                transition: "color 150ms ease-out",
                cursor: "default",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,200,1,0.7)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(217,232,226,0.3)")}
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

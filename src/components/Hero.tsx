"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// Floating scroll-to-top button using chevron-up.svg
function ScrollTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll back to top"
      style={{
        position: "fixed",
        bottom: "32px",
        right: "32px",
        zIndex: 999,
        width: 44,
        height: 44,
        borderRadius: "50%",
        background: "var(--nocturnal)",
        border: "1px solid rgba(255,200,1,0.3)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transition: "opacity 200ms ease-out, transform 200ms ease-out",
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "var(--forsythia)";
        e.currentTarget.style.borderColor = "var(--forsythia)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "var(--nocturnal)";
        e.currentTarget.style.borderColor = "rgba(255,200,1,0.3)";
      }}
    >
      <Image
        src="/svgs/chevron-up.svg"
        alt=""
        width={16}
        height={16}
        style={{ filter: "invert(1)" }}
      />
    </button>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll(".entry-fade");
    if (!els) return;
    // Trigger entry animations right after loader clears (~360ms)
    const t = setTimeout(() => {
      els.forEach((el) => el.classList.add("visible"));
    }, 380);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-labelledby="hero-heading"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "120px 24px 80px",
        overflow: "hidden",
      }}
    >
      {/* Background orbs */}
      <div
        aria-hidden="true"
        className="glow-orb"
        style={{
          width: 600,
          height: 600,
          background: "radial-gradient(circle, rgba(17,76,90,0.6) 0%, transparent 70%)",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />
      <div
        aria-hidden="true"
        className="glow-orb"
        style={{
          width: 300,
          height: 300,
          background: "radial-gradient(circle, rgba(255,200,1,0.08) 0%, transparent 70%)",
          top: "20%",
          right: "10%",
        }}
      />
      <div
        aria-hidden="true"
        className="glow-orb"
        style={{
          width: 250,
          height: 250,
          background: "radial-gradient(circle, rgba(255,153,50,0.07) 0%, transparent 70%)",
          bottom: "20%",
          left: "5%",
        }}
      />

      {/* Grid overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(217,232,226,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(217,232,226,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", maxWidth: "860px", width: "100%" }}>
        {/* Eyebrow badge */}
        <div
          className="entry-fade"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(17,76,90,0.5)",
            border: "1px solid rgba(255,200,1,0.25)",
            borderRadius: "99px",
            padding: "6px 16px",
            marginBottom: "28px",
          }}
        >
          <Image src="/svgs/arrow-trending-up.svg" alt="" width={14} height={14} style={{ filter: "invert(1) sepia(1) saturate(5) hue-rotate(0deg)" }} />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.72rem",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--forsythia)",
            }}
          >
            AI-Powered Data Automation v2.0
          </span>
        </div>

        {/* Headline */}
        <h1
          id="hero-heading"
          className="entry-fade entry-delay-1"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "clamp(2.4rem, 6vw, 4.5rem)",
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            marginBottom: "24px",
            color: "var(--arctic)",
          }}
        >
          Automate Everything.{" "}
          <span className="gradient-text">Ship 10× Faster.</span>
        </h1>

        {/* Sub */}
        <p
          className="entry-fade entry-delay-2"
          style={{
            fontSize: "clamp(1rem, 2vw, 1.2rem)",
            fontWeight: 400,
            lineHeight: 1.65,
            color: "var(--mint)",
            maxWidth: "600px",
            margin: "0 auto 40px",
          }}
        >
          Synapse AI orchestrates your entire data pipeline — from ingestion to
          insight — with zero-code workflows, real-time monitoring, and
          enterprise-grade reliability built for modern engineering teams.
        </p>

        {/* CTAs */}
        <div
          className="entry-fade entry-delay-3"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
            flexWrap: "wrap",
            marginBottom: "64px",
          }}
        >
          <a href="#pricing" className="btn-primary" aria-label="Start your free trial - go to pricing">
            <Image src="/svgs/arrow-trending-up.svg" alt="" width={16} height={16} style={{ filter: "brightness(0)" }} />
            Start Free Trial
          </a>
          <a href="#features" className="btn-secondary" aria-label="Explore platform features">
            <Image src="/svgs/chart-pie.svg" alt="" width={16} height={16} style={{ filter: "invert(1)" }} />
            Explore Features
          </a>
        </div>

        {/* Social proof bar */}
        <div
          className="entry-fade entry-delay-4"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", gap: "-4px" }}>
            {["#114C5A","#FF9932","#FFC801","#D9E8E2","#172B36"].map((c, i) => (
              <div
                key={i}
                aria-hidden="true"
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  background: c,
                  border: "2px solid var(--noir)",
                  marginLeft: i === 0 ? 0 : -10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  fontWeight: 700,
                  color: i > 2 ? "var(--noir)" : "var(--arctic)",
                }}
              >
                {["R","J","K","A","M"][i]}
              </div>
            ))}
          </div>
          <span style={{ fontSize: "0.85rem", color: "var(--mint)" }}>
            Trusted by{" "}
            <strong style={{ color: "var(--forsythia)", fontFamily: "var(--font-mono)" }}>
              12,000+
            </strong>{" "}
            engineering teams worldwide
          </span>
        </div>
      </div>

      {/* Floating terminal card */}
      <div
        className="entry-fade entry-delay-5"
        style={{
          position: "relative",
          marginTop: "60px",
          width: "100%",
          maxWidth: "700px",
          background: "rgba(17,76,90,0.3)",
          border: "1px solid rgba(217,232,226,0.1)",
          borderRadius: "16px",
          padding: "0",
          overflow: "hidden",
          backdropFilter: "blur(12px)",
        }}
        aria-label="Code automation preview"
      >
        {/* Terminal chrome */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 16px",
            borderBottom: "1px solid rgba(217,232,226,0.08)",
            background: "rgba(23,43,54,0.5)",
          }}
        >
          {["#FF5F57","#FFBD2E","#28C840"].map((c, i) => (
            <div key={i} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} aria-hidden="true" />
          ))}
          <span style={{ marginLeft: 8, fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--mint)", opacity: 0.6 }}>
            synapse — pipeline.yaml
          </span>
        </div>

        {/* Code block */}
        <pre
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "clamp(0.72rem, 1.5vw, 0.85rem)",
            lineHeight: 1.7,
            padding: "24px",
            textAlign: "left",
            overflowX: "auto",
            margin: 0,
          }}
        >
          <code>
            <span style={{ color: "rgba(217,232,226,0.4)" }}># Synapse AI — pipeline config</span>{"\n"}
            <span style={{ color: "var(--forsythia)" }}>pipeline</span>
            <span style={{ color: "var(--arctic)" }}>:</span>{"\n"}
            {"  "}<span style={{ color: "var(--mint)" }}>name</span>
            <span style={{ color: "var(--arctic)" }}>: </span>
            <span style={{ color: "var(--saffron)" }}>&quot;fraud-detection&quot;</span>{"\n"}
            {"  "}<span style={{ color: "var(--mint)" }}>trigger</span>
            <span style={{ color: "var(--arctic)" }}>: </span>
            <span style={{ color: "var(--saffron)" }}>realtime</span>{"\n"}
            {"  "}<span style={{ color: "var(--forsythia)" }}>steps</span>
            <span style={{ color: "var(--arctic)" }}>:</span>{"\n"}
            {"    "}<span style={{ color: "var(--arctic)" }}>- </span>
            <span style={{ color: "var(--mint)" }}>ingest</span>
            <span style={{ color: "var(--arctic)" }}>: </span>
            <span style={{ color: "var(--saffron)" }}>kafka://events.stream</span>{"\n"}
            {"    "}<span style={{ color: "var(--arctic)" }}>- </span>
            <span style={{ color: "var(--mint)" }}>transform</span>
            <span style={{ color: "var(--arctic)" }}>: </span>
            <span style={{ color: "var(--saffron)" }}>ai.normalize</span>{"\n"}
            {"    "}<span style={{ color: "var(--arctic)" }}>- </span>
            <span style={{ color: "var(--mint)" }}>model</span>
            <span style={{ color: "var(--arctic)" }}>: </span>
            <span style={{ color: "var(--forsythia)" }}>synapse://fraud-v3</span>{"\n"}
            {"    "}<span style={{ color: "var(--arctic)" }}>- </span>
            <span style={{ color: "var(--mint)" }}>output</span>
            <span style={{ color: "var(--arctic)" }}>: </span>
            <span style={{ color: "var(--saffron)" }}>webhook://alerts</span>{"\n"}
            <span style={{ color: "rgba(217,232,226,0.4)" }}># ✓ Running — 0ms latency</span>
          </code>
        </pre>
      </div>

      {/* Scroll cue */}
      <div
        aria-label="Scroll down to features"
        role="button"
        tabIndex={0}
        onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
        onKeyDown={(e) => e.key === "Enter" && document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
        style={{
          marginTop: "48px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
          opacity: 0.45,
          animation: "bounce 2s ease-in-out infinite",
          cursor: "pointer",
          transition: "opacity 150ms ease-out",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.45")}
      >
        <span style={{ fontSize: "0.72rem", fontFamily: "var(--font-mono)", letterSpacing: "0.1em", color: "var(--mint)" }}>SCROLL</span>
        <Image src="/svgs/chevron-down.svg" alt="" width={16} height={16} style={{ filter: "invert(1)" }} />
      </div>

      {/* Scroll-to-top pill — appears after scrolling down */}
      <ScrollTopButton />

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
      `}</style>
    </section>
  );
}

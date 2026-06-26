"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll(".entry-fade");
    if (!els) return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add("visible"); observer.unobserve(e.target); }
        }),
      { threshold: 0.2 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      aria-labelledby="cta-heading"
      style={{
        padding: "100px 24px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background gradient */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 50% 50%, rgba(17,76,90,0.5) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", maxWidth: "640px", margin: "0 auto" }}>
        <span
          className="entry-fade section-eyebrow"
          style={{ display: "block", marginBottom: "16px" }}
        >
          Get started today
        </span>

        <h2
          id="cta-heading"
          className="entry-fade entry-delay-1 section-title"
          style={{ marginBottom: "20px" }}
        >
          Ready to automate your{" "}
          <span className="gradient-text">data future?</span>
        </h2>

        <p
          className="entry-fade entry-delay-2 section-subtitle"
          style={{ margin: "0 auto 40px" }}
        >
          Join 12,000+ teams already running smarter pipelines on Synapse AI.
          Your first pipeline is free — no card required.
        </p>

        <div
          className="entry-fade entry-delay-3"
          style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}
        >
          <a href="#contact" className="btn-primary">
            <Image src="/svgs/arrow-trending-up.svg" alt="" width={16} height={16} style={{ filter: "brightness(0)" }} />
            Start building free
          </a>
          <a href="#features" className="btn-secondary">
            <Image src="/svgs/search.svg" alt="" width={14} height={14} style={{ filter: "invert(0.7)" }} />
            Explore features
          </a>
        </div>

        <p
          className="entry-fade entry-delay-4"
          style={{
            marginTop: "28px",
            fontSize: "0.78rem",
            color: "rgba(217,232,226,0.55)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <span>✓ 14-day free trial</span>
          <span>✓ No credit card</span>
          <span>✓ Cancel anytime</span>
          <span>✓ SOC 2 compliant</span>
        </p>
      </div>
    </section>
  );
}

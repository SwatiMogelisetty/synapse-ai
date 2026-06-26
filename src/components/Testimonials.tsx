"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const testimonials = [
  {
    quote:
      "Synapse replaced three separate ETL tools overnight. Our pipeline deployment time dropped from days to minutes. The AI orchestration is genuinely magic.",
    author: "Riya Mehta",
    role: "Head of Data Engineering",
    company: "Fintech Unicorn",
    initials: "RM",
    color: "#FFC801",
  },
  {
    quote:
      "The zero-code integration builder saved us 6 weeks of engineering time. We connected 40 data sources in an afternoon.",
    author: "Jake Lindqvist",
    role: "CTO",
    company: "HealthOS",
    initials: "JL",
    color: "#FF9932",
  },
  {
    quote:
      "Enterprise-grade reliability at a price that doesn't make the CFO flinch. Synapse is the rare SaaS that actually delivers what it promises.",
    author: "Anika Patel",
    role: "VP Engineering",
    company: "ScaleUp Labs",
    initials: "AP",
    color: "#D9E8E2",
  },
  {
    quote:
      "Config-as-code with full Git support was the dealbreaker for us. Our entire pipeline is now version-controlled and reviewable. Incredible.",
    author: "Marcus Chen",
    role: "Platform Engineer",
    company: "Logistics Co.",
    initials: "MC",
    color: "#114C5A",
  },
  {
    quote:
      "The ML auto-retraining feature alone justifies the subscription. Our fraud model accuracy has never been higher.",
    author: "Sasha Novak",
    role: "ML Scientist",
    company: "NeoBank",
    initials: "SN",
    color: "#FFC801",
  },
  {
    quote:
      "Best onboarding experience I've had with any data tool. The docs are exceptional and the support team replies in under an hour.",
    author: "Tunde Osei",
    role: "Data Lead",
    company: "AgriTech Africa",
    initials: "TO",
    color: "#FF9932",
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll(".entry-fade");
    if (!els) return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add("visible"); observer.unobserve(e.target); }
        }),
      { threshold: 0.1 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const prev = () => setActiveSlide((v) => (v === 0 ? testimonials.length - 1 : v - 1));
  const next = () => setActiveSlide((v) => (v === testimonials.length - 1 ? 0 : v + 1));

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      aria-labelledby="testimonials-heading"
      style={{ padding: "100px 24px", maxWidth: "1200px", margin: "0 auto" }}
    >
      <header style={{ textAlign: "center", marginBottom: "64px" }}>
        <p className="section-eyebrow entry-fade">Social Proof</p>
        <h2
          id="testimonials-heading"
          className="section-title entry-fade entry-delay-1"
          style={{ marginTop: "12px", marginBottom: "16px" }}
        >
          Loved by engineering teams
        </h2>
        <p className="section-subtitle entry-fade entry-delay-2" style={{ margin: "0 auto" }}>
          Don&apos;t take our word for it — here&apos;s what the people actually shipping with Synapse say.
        </p>
      </header>

      {/* Desktop grid */}
      <div
        className="entry-fade entry-delay-2"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "20px",
        }}
      >
        {testimonials.map((t, i) => (
          <blockquote
            key={t.author}
            className="testimonial-card entry-fade"
            style={{ transitionDelay: `${(i % 3) * 60}ms` }}
          >
            {/* Stars */}
            <div style={{ display: "flex", gap: "3px", marginBottom: "16px" }} aria-label="5 star rating">
              {Array.from({ length: 5 }).map((_, j) => (
                <svg key={j} width="14" height="14" viewBox="0 0 24 24" fill="var(--forsythia)" aria-hidden="true">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>

            <p
              style={{
                fontSize: "0.9rem",
                lineHeight: 1.7,
                color: "var(--mint)",
                marginBottom: "20px",
                fontStyle: "italic",
              }}
            >
              &ldquo;{t.quote}&rdquo;
            </p>

            <footer style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: t.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-mono)",
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  color: t.color === "#D9E8E2" || t.color === "#114C5A" ? "var(--noir)" : "var(--noir)",
                  flexShrink: 0,
                }}
                aria-hidden="true"
              >
                {t.initials}
              </div>
              <div>
                <cite
                  style={{
                    fontStyle: "normal",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    color: "var(--arctic)",
                    display: "block",
                  }}
                >
                  {t.author}
                </cite>
                <span style={{ fontSize: "0.78rem", color: "rgba(217,232,226,0.65)" }}>
                  {t.role}, {t.company}
                </span>
              </div>
            </footer>
          </blockquote>
        ))}
      </div>

      {/* Mobile carousel nav */}
      <div
        style={{
          display: "none",
          justifyContent: "center",
          alignItems: "center",
          gap: "16px",
          marginTop: "32px",
        }}
        className="carousel-nav"
      >
        <button
          onClick={prev}
          aria-label="Previous testimonial"
          style={{
            width: 40, height: 40, borderRadius: "50%",
            background: "rgba(17,76,90,0.4)",
            border: "1px solid rgba(217,232,226,0.15)",
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <Image src="/svgs/chevron-left.svg" alt="" width={16} height={16} style={{ filter: "invert(1)" }} />
        </button>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--mint)" }}>
          {activeSlide + 1} / {testimonials.length}
        </span>
        <button
          onClick={next}
          aria-label="Next testimonial"
          style={{
            width: 40, height: 40, borderRadius: "50%",
            background: "rgba(17,76,90,0.4)",
            border: "1px solid rgba(217,232,226,0.15)",
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <Image src="/svgs/chevron-right.svg" alt="" width={16} height={16} style={{ filter: "invert(1)" }} />
        </button>
      </div>
    </section>
  );
}

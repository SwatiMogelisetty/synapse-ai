"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

interface Feature {
  id: number;
  title: string;
  description: string;
  icon: string;
  iconAlt: string;
  tag: string;
  span: string;
  accentColor: string;
}

const features: Feature[] = [
  {
    id: 0,
    title: "Intelligent Pipeline Orchestration",
    description:
      "Synapse's AI engine automatically maps dependencies, optimises execution order, and recovers from failures — all without a single line of orchestration code.",
    icon: "/svgs/arrow-path.svg",
    iconAlt: "Circular arrows indicating automated pipeline execution",
    tag: "Core Engine",
    span: "bento-span-8",
    accentColor: "#FFC801",
  },
  {
    id: 1,
    title: "Real-Time Analytics",
    description:
      "Stream events through sub-5ms processing windows with live dashboards, anomaly alerts, and custom KPI tracking out of the box.",
    icon: "/svgs/arrow-trending-up.svg",
    iconAlt: "Trending up chart indicating real-time growth analytics",
    tag: "Analytics",
    span: "bento-span-4",
    accentColor: "#FF9932",
  },
  {
    id: 2,
    title: "Zero-Code Integrations",
    description:
      "Connect to 400+ data sources with one click. OAuth flows, schema mapping, and type coercion are handled automatically.",
    icon: "/svgs/link.svg",
    iconAlt: "Chain link icon representing integrations",
    tag: "Integrations",
    span: "bento-span-4",
    accentColor: "#D9E8E2",
  },
  {
    id: 3,
    title: "Adaptive ML Models",
    description:
      "Deploy custom models or choose from Synapse's pre-trained library. Models auto-retrain on drift, ensuring accuracy never degrades silently.",
    icon: "/svgs/chart-pie.svg",
    iconAlt: "Pie chart icon representing ML model distribution",
    tag: "Machine Learning",
    span: "bento-span-8",
    accentColor: "#FFC801",
  },
  {
    id: 4,
    title: "Config-as-Code",
    description:
      "Version-controlled YAML pipelines with full GitOps support. Promote from dev → staging → prod with confidence.",
    icon: "/svgs/cog-8-tooth.svg",
    iconAlt: "Cog icon representing configuration settings",
    tag: "DevOps",
    span: "bento-span-6",
    accentColor: "#FF9932",
  },
  {
    id: 5,
    title: "Global Search & Discovery",
    description:
      "Semantic search across all pipeline artifacts, logs, and schemas. Find anything in milliseconds.",
    icon: "/svgs/search.svg",
    iconAlt: "Magnifying glass icon for search functionality",
    tag: "Discovery",
    span: "bento-span-6",
    accentColor: "#D9E8E2",
  },
];

export default function BentoFeatures() {
  // Tracks which bento card is active (hover/focus) on desktop
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  // Accordion open index on mobile — starts null, synced from activeIndex on resize
  const [accordionIndex, setAccordionIndex] = useState<number | null>(null);
  // Track previous breakpoint to detect transitions
  const wasMobileRef = useRef<boolean | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  /* ── Context Lock: transfer active bento index → accordion on resize ── */
  const handleResize = useCallback(() => {
    const isMobile = window.innerWidth <= 768;
    const wasMobile = wasMobileRef.current;

    if (wasMobile === false && isMobile) {
      // Desktop → Mobile transition: transfer activeIndex to accordionIndex
      if (activeIndex !== null) {
        setAccordionIndex(activeIndex);
      }
    } else if (wasMobile === true && !isMobile) {
      // Mobile → Desktop: sync accordion state back to bento active
      if (accordionIndex !== null) {
        setActiveIndex(accordionIndex);
      }
    }

    wasMobileRef.current = isMobile;
  }, [activeIndex, accordionIndex]);

  useEffect(() => {
    // Set initial breakpoint state
    wasMobileRef.current = window.innerWidth <= 768;
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  /* ── Intersection observer for section entry animation ── */
  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll(".entry-fade");
    if (!els) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            // After animation finishes, remove entry-fade classes entirely
            // so hover transitions on bento cards are never blocked
            const el = e.target as HTMLElement;
            const onEnd = () => {
              el.classList.remove("entry-fade", "entry-delay-1", "entry-delay-2", "entry-delay-3", "entry-delay-4", "entry-delay-5");
              el.removeEventListener("transitionend", onEnd);
            };
            el.addEventListener("transitionend", onEnd);
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const toggleAccordion = (idx: number) => {
    setAccordionIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section
      id="features"
      ref={sectionRef}
      aria-labelledby="features-heading"
      style={{
        padding: "100px 24px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      {/* Section header */}
      <header style={{ textAlign: "center", marginBottom: "64px" }}>
        <p className="section-eyebrow entry-fade">Platform Features</p>
        <h2
          id="features-heading"
          className="section-title entry-fade entry-delay-1"
          style={{ marginTop: "12px", marginBottom: "16px" }}
        >
          Everything your data stack needs
        </h2>
        <p className="section-subtitle entry-fade entry-delay-2" style={{ margin: "0 auto" }}>
          A complete suite of intelligent tools designed to replace five separate
          vendors — unified under one coherent platform.
        </p>
      </header>

      {/* ══ DESKTOP: Bento Grid ══ */}
      <div className="bento-grid" aria-label="Features overview grid" role="list">
        {features.map((f) => (
          <article
            key={f.id}
            role="listitem"
            className={`bento-card ${f.span} entry-fade entry-delay-${(f.id % 4) + 1} ${
              activeIndex === f.id ? "active" : ""
            }`}
            aria-label={f.title}
            tabIndex={0}
            onMouseEnter={() => setActiveIndex(f.id)}
            onMouseLeave={() => setActiveIndex(null)}
            onFocus={() => setActiveIndex(f.id)}
            onBlur={() => setActiveIndex(null)}
          >
            {/* Icon */}
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: "12px",
                background: "rgba(255,255,255,0.05)",
                border: `1px solid ${f.accentColor}30`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "20px",
                transition: "background 200ms ease-out",
                ...(activeIndex === f.id && {
                  background: `${f.accentColor}15`,
                }),
              }}
            >
              <Image
                src={f.icon}
                alt={f.iconAlt}
                width={22}
                height={22}
                style={{
                  filter: activeIndex === f.id
                    ? f.accentColor === "#FFC801"
                      ? "invert(82%) sepia(80%) saturate(400%) hue-rotate(3deg)"
                      : f.accentColor === "#FF9932"
                      ? "invert(65%) sepia(80%) saturate(500%) hue-rotate(340deg)"
                      : "invert(90%) sepia(10%) saturate(200%) hue-rotate(120deg)"
                    : "invert(0.7)",
                  transition: "filter 200ms ease-out",
                }}
              />
            </div>

            {/* Tag */}
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: f.accentColor,
                background: "rgba(255,255,255,0.07)",
                padding: "3px 10px",
                borderRadius: "99px",
                display: "inline-block",
                marginBottom: "14px",
              }}
            >
              {f.tag}
            </span>

            <h3
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "1.05rem",
                fontWeight: 700,
                color: "var(--arctic)",
                marginBottom: "10px",
                lineHeight: 1.3,
              }}
            >
              {f.title}
            </h3>

            <p
              style={{
                fontSize: "0.875rem",
                lineHeight: 1.65,
                color: "var(--mint)",
                opacity: 0.85,
              }}
            >
              {f.description}
            </p>

            {/* Bottom link affordance */}
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "0.8rem",
                fontWeight: 600,
                color: f.accentColor,
                opacity: activeIndex === f.id ? 1 : 0,
                transition: "opacity 200ms ease-out",
              }}
              aria-hidden="true"
            >
              <span>Learn more</span>
              <Image
                src="/svgs/chevron-right.svg"
                alt=""
                width={14}
                height={14}
                style={{
                  filter: f.accentColor === "#FFC801"
                    ? "invert(82%) sepia(80%) saturate(400%) hue-rotate(3deg)"
                    : f.accentColor === "#FF9932"
                    ? "invert(65%) sepia(80%) saturate(500%) hue-rotate(340deg)"
                    : "invert(1)",
                }}
              />
            </div>
          </article>
        ))}
      </div>

      {/* ══ MOBILE: Accordion (zero external deps) ══ */}
      <div
        className="accordion-features"
        role="list"
        aria-label="Features accordion"
        style={{ display: "none" }}
      >
        {features.map((f, idx) => {
          const isOpen = accordionIndex === idx;
          return (
            <div
              key={f.id}
              role="listitem"
              className="accordion-item"
              style={{
                borderBottom: "1px solid rgba(217,232,226,0.1)",
              }}
            >
              <button
                className={`accordion-trigger ${isOpen ? "open" : ""}`}
                onClick={() => toggleAccordion(idx)}
                aria-expanded={isOpen}
                aria-controls={`acc-body-${f.id}`}
                id={`acc-trigger-${f.id}`}
              >
                <span style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "10px",
                      background: isOpen ? `${f.accentColor}30` : "rgba(255,255,255,0.04)",
                      border: `1px solid ${isOpen ? f.accentColor + "60" : "rgba(217,232,226,0.1)"}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      transition: "background 300ms ease-in-out, border-color 300ms ease-in-out",
                    }}
                  >
                    <Image
                      src={f.icon}
                      alt=""
                      width={16}
                      height={16}
                      style={{ filter: isOpen ? "invert(82%) sepia(80%) saturate(400%) hue-rotate(3deg)" : "invert(0.6)" }}
                    />
                  </span>
                  <span style={{ color: isOpen ? "var(--forsythia)" : "var(--arctic)", transition: "color 200ms ease-out" }}>
                    {f.title}
                  </span>
                </span>
                {/* Chevron */}
                <svg
                  className="acc-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              <div
                id={`acc-body-${f.id}`}
                role="region"
                aria-labelledby={`acc-trigger-${f.id}`}
                className={`accordion-body ${isOpen ? "open" : ""}`}
              >
                <div className="accordion-inner">
                  <p
                    style={{
                      fontSize: "0.9rem",
                      lineHeight: 1.65,
                      color: "var(--mint)",
                    }}
                  >
                    {f.description}
                  </p>
                  <span
                    style={{
                      display: "inline-block",
                      marginTop: "12px",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.65rem",
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: f.accentColor,
                      background: "rgba(255,255,255,0.07)",
                      padding: "3px 10px",
                      borderRadius: "99px",
                    }}
                  >
                    {f.tag}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

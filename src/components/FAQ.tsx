"use client";
import { useEffect, useRef, useState } from "react";

const faqs = [
  {
    question: "How does Synapse AI handle data security and compliance?",
    answer:
      "Synapse AI is SOC 2 Type II certified and GDPR compliant. All data is encrypted in transit (TLS 1.3) and at rest (AES-256). We offer dedicated infrastructure on Enterprise plans with VPC isolation, private endpoints, and full audit logging.",
  },
  {
    question: "Can I connect my existing data sources without writing code?",
    answer:
      "Yes. Synapse ships with 400+ pre-built connectors covering databases, SaaS tools, cloud storage, message queues, and APIs. OAuth flows, schema mapping, and type coercion are handled automatically. Custom connectors can be built via our SDK in under 30 minutes.",
  },
  {
    question: "What happens if a pipeline fails mid-execution?",
    answer:
      "The AI orchestration engine automatically detects failures, classifies the error type, and applies the appropriate recovery strategy — retry with backoff, skip-and-alert, or rollback. You get a full execution trace in the dashboard and an alert via your configured channel (Slack, PagerDuty, webhook).",
  },
  {
    question: "How does the annual billing discount work?",
    answer:
      "Switching to annual billing applies a flat 20% discount across all tiers. You're billed once for the full year upfront. The discounted per-month equivalent is shown in the pricing section. You can switch between monthly and annual at any renewal date.",
  },
  {
    question: "Is there a free trial? Do I need a credit card?",
    answer:
      "Every plan includes a 14-day free trial with full feature access — no credit card required. After the trial you can downgrade to a free tier or choose a paid plan. We won't charge you automatically.",
  },
  {
    question: "Can I run Synapse AI on my own infrastructure?",
    answer:
      "Enterprise plans support self-hosted and hybrid deployments. We provide a Helm chart for Kubernetes, a Docker Compose stack for smaller setups, and a Terraform module for AWS, GCP, and Azure. Your data never leaves your VPC.",
  },
  {
    question: "How do adaptive ML models work?",
    answer:
      "You can deploy your own models or pick from Synapse's pre-trained library. Models are monitored continuously for data drift using statistical tests. When drift is detected beyond your configured threshold, the model is automatically retrained on the latest data window and promoted after a validation gate passes.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll(".entry-fade");
    if (!els) return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.1 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const toggle = (i: number) => setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <section
      id="faq"
      ref={sectionRef}
      aria-labelledby="faq-heading"
      style={{
        padding: "100px 24px",
        borderTop: "1px solid rgba(217,232,226,0.06)",
      }}
    >
      <div style={{ maxWidth: "760px", margin: "0 auto" }}>
        {/* Header */}
        <header style={{ textAlign: "center", marginBottom: "60px" }}>
          <p className="section-eyebrow entry-fade">FAQ</p>
          <h2
            id="faq-heading"
            className="section-title entry-fade entry-delay-1"
            style={{ marginTop: "12px", marginBottom: "16px" }}
          >
            Frequently asked questions
          </h2>
          <p className="section-subtitle entry-fade entry-delay-2" style={{ margin: "0 auto" }}>
            Everything you need to know before you start building. Can&apos;t find an answer? Chat with our team below.
          </p>
        </header>

        {/* Accordion list */}
        <div
          className="entry-fade entry-delay-3"
          style={{
            borderTop: "1px solid rgba(217,232,226,0.08)",
          }}
        >
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                style={{ borderBottom: "1px solid rgba(217,232,226,0.08)" }}
              >
                <button
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-body-${i}`}
                  id={`faq-trigger-${i}`}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "16px",
                    padding: "22px 0",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    color: isOpen ? "var(--forsythia)" : "var(--arctic)",
                    fontFamily: "var(--font-sans)",
                    fontSize: "1rem",
                    fontWeight: 600,
                    lineHeight: 1.4,
                    transition: "color 150ms ease-out",
                  }}
                >
                  <span>{faq.question}</span>

                  {/* Chevron — rotates via CSS transition */}
                  <span
                    aria-hidden="true"
                    style={{
                      flexShrink: 0,
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: isOpen
                        ? "rgba(255,200,1,0.12)"
                        : "rgba(217,232,226,0.06)",
                      border: `1px solid ${isOpen ? "rgba(255,200,1,0.3)" : "rgba(217,232,226,0.1)"}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "background 200ms ease-out, border-color 200ms ease-out",
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={isOpen ? "var(--forsythia)" : "var(--mint)"}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{
                        width: 14,
                        height: 14,
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 300ms ease-in-out, stroke 200ms ease-out",
                      }}
                    >
                      <path d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </button>

                {/* Answer body — CSS grid trick for smooth open/close */}
                <div
                  id={`faq-body-${i}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${i}`}
                  style={{
                    display: "grid",
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    transition: "grid-template-rows 350ms ease-in-out",
                  }}
                >
                  <div style={{ overflow: "hidden" }}>
                    <p
                      style={{
                        fontSize: "0.9375rem",
                        lineHeight: 1.7,
                        color: "var(--mint)",
                        paddingBottom: "22px",
                        paddingRight: "48px",
                      }}
                    >
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA link */}
        <div
          className="entry-fade entry-delay-4"
          style={{
            marginTop: "48px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <p style={{ fontSize: "0.9rem", color: "rgba(217,232,226,0.65)" }}>
            Still have questions?
          </p>
          <a
            href="#contact"
            className="btn-secondary"
            style={{ width: "fit-content" }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ width: 16, height: 16 }}
              aria-hidden="true"
            >
              <path d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
            </svg>
            Chat with our team ↓
          </a>
        </div>
      </div>
    </section>
  );
}

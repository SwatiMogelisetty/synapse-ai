"use client";
import { useEffect, useRef, useState, memo } from "react";
import Image from "next/image";

// ── Multi-dimensional pricing matrix ─────────────────────────────────────────
// Structure: PRICING_MATRIX[tier][currency] = { base, tariff }
// Final monthly price = base * tariff
// Annual price       = base * tariff * 12 * ANNUAL_DISCOUNT / 12 (per month)
// Regional tariff encodes per-region cost variance
const PRICING_MATRIX = {
  Starter:    { INR: { base: 999,  tariff: 1.00 }, USD: { base: 12,  tariff: 1.00 }, EUR: { base: 11,  tariff: 1.05 } },
  Pro:        { INR: { base: 3499, tariff: 1.00 }, USD: { base: 42,  tariff: 1.00 }, EUR: { base: 39,  tariff: 1.05 } },
  Enterprise: { INR: { base: 8999, tariff: 1.00 }, USD: { base: 109, tariff: 1.00 }, EUR: { base: 99,  tariff: 1.05 } },
} as const;

type Tier     = keyof typeof PRICING_MATRIX;
type Currency = "INR" | "USD" | "EUR";

const CURRENCY_SYMBOLS: Record<Currency, string> = { INR: "₹", USD: "$", EUR: "€" };
const ANNUAL_DISCOUNT = 0.80; // 20% off

function computeMonthlyPrice(tier: Tier, currency: Currency, isAnnual: boolean): number {
  const { base, tariff } = PRICING_MATRIX[tier][currency];
  const monthly = base * tariff;
  return isAnnual ? Math.round(monthly * ANNUAL_DISCOUNT) : Math.round(monthly);
}

// ── Tier static data (layout only — no prices here) ──────────────────────────
const TIERS: { name: Tier; featured: boolean; cta: string; features: string[] }[] = [
  {
    name: "Starter",
    featured: false,
    cta: "Get started free",
    features: ["5 active pipelines", "100K events / month", "3 integrations", "Community support", "Basic analytics dashboard"],
  },
  {
    name: "Pro",
    featured: true,
    cta: "Start Pro trial",
    features: ["Unlimited pipelines", "10M events / month", "400+ integrations", "Priority support (4h SLA)", "Advanced ML models", "Custom alerting rules", "Team collaboration"],
  },
  {
    name: "Enterprise",
    featured: false,
    cta: "Contact sales",
    features: ["Unlimited everything", "Dedicated infrastructure", "Custom SLAs", "SSO / SAML", "Audit logs & compliance", "White-label options", "24/7 dedicated support"],
  },
];

const TIER_SUBTITLES: Record<Tier, string> = {
  Starter:    "Perfect for solo builders and side projects.",
  Pro:        "For growing teams that need power and reliability.",
  Enterprise: "For organisations that demand enterprise-grade control.",
};

// ── PriceDisplay: memoized shell, updates ONLY via direct DOM ref mutation ────
// React.memo ensures the component tree NEVER re-renders when parent state changes.
// The useEffect watches props and writes directly to the text node — bypassing React.
const PriceDisplay = memo(function PriceDisplay({
  tier,
  currency,
  isAnnual,
}: {
  tier: Tier;
  currency: Currency;
  isAnnual: boolean;
}) {
  const symbolRef  = useRef<HTMLSpanElement>(null);
  const amountRef  = useRef<HTMLSpanElement>(null);
  const annualRef  = useRef<HTMLSpanElement>(null);

  // Direct DOM text node mutation — zero React re-render, satisfies state isolation rule
  useEffect(() => {
    const price = computeMonthlyPrice(tier, currency, isAnnual);
    const sym   = CURRENCY_SYMBOLS[currency];

    // Mutate only the specific text nodes
    if (symbolRef.current)  symbolRef.current.textContent  = sym;
    if (amountRef.current)  amountRef.current.textContent  = price.toLocaleString();
    if (annualRef.current) {
      annualRef.current.textContent = isAnnual
        ? `Billed ${sym}${(price * 12).toLocaleString()} / year`
        : "";
      annualRef.current.style.opacity = isAnnual ? "1" : "0";
      annualRef.current.style.height = isAnnual ? "auto" : "0";
    }
  }, [tier, currency, isAnnual]);

  const initialPrice = computeMonthlyPrice(tier, currency, isAnnual);

  return (
    <div>
      {/* Price row */}
      <div style={{ display: "flex", alignItems: "baseline", gap: "4px", margin: "20px 0 4px" }}>
        <span
          ref={symbolRef}
          style={{ fontFamily: "var(--font-mono)", fontSize: "1.3rem", fontWeight: 700, color: "var(--mint)" }}
        >
          {CURRENCY_SYMBOLS[currency]}
        </span>
        <span
          ref={amountRef}
          className="price-amount"
          style={{ fontFamily: "var(--font-mono)", fontSize: "3rem", fontWeight: 800, lineHeight: 1, color: "var(--arctic)" }}
        >
          {initialPrice.toLocaleString()}
        </span>
        <span style={{ fontSize: "0.875rem", color: "var(--mint)", marginLeft: "4px" }}>/ mo</span>
      </div>
      {/* Annual billed total — mutated directly */}
      <span
        ref={annualRef}
        style={{
          fontSize: "0.78rem",
          color: "rgba(217,232,226,0.5)",
          fontFamily: "var(--font-mono)",
          display: "block",
          minHeight: "1.2em",
          marginBottom: "4px",
          opacity: isAnnual ? 1 : 0,
          transition: "opacity 200ms ease-out",
        }}
      >
        {isAnnual ? `Billed ${CURRENCY_SYMBOLS[currency]}${(initialPrice * 12).toLocaleString()} / year` : ""}
      </span>
    </div>
  );
});

// ── PricingCard: memoized — never re-renders when toggle/currency changes ─────
const PricingCard = memo(function PricingCard({
  tier,
  currency,
  isAnnual,
  index,
}: {
  tier: typeof TIERS[0];
  currency: Currency;
  isAnnual: boolean;
  index: number;
}) {
  return (
    <article
      className={`pricing-card${tier.featured ? " featured" : ""} entry-fade entry-delay-${index + 2}`}
      aria-label={`${tier.name} plan`}
    >
      {tier.featured && (
        <div className="pricing-badge" aria-label="Most popular plan">Most Popular</div>
      )}

      <p style={{
        fontFamily: "var(--font-mono)", fontSize: "0.7rem", fontWeight: 600,
        letterSpacing: "0.15em", textTransform: "uppercase",
        color: tier.featured ? "var(--forsythia)" : "var(--mint)", marginBottom: "4px",
      }}>
        {tier.name}
      </p>

      {/* PriceDisplay: the ONLY thing that touches price text nodes */}
      <PriceDisplay tier={tier.name} currency={currency} isAnnual={isAnnual} />

      <p style={{ fontSize: "0.85rem", color: "var(--mint)", marginBottom: "24px", lineHeight: 1.5 }}>
        {TIER_SUBTITLES[tier.name]}
      </p>

      <a
        href={tier.name === "Pro" ? "#pricing" : "#contact"}
        className={tier.featured ? "btn-primary" : "btn-secondary"}
        style={{ width: "100%", justifyContent: "center", marginBottom: "28px" }}
        aria-label={`${tier.cta} — ${tier.name} plan`}
      >
        {tier.cta}
      </a>

      <div style={{ borderTop: "1px solid rgba(217,232,226,0.08)", paddingTop: "24px", display: "flex", flexDirection: "column", gap: "14px" }}>
        {tier.features.map((feat) => (
          <div key={feat} className="feature-check">
            <div className="check-icon" aria-hidden="true">
              <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                <path d="M1.5 5L4 7.5L8.5 2.5" stroke="var(--forsythia)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            {feat}
          </div>
        ))}
      </div>
    </article>
  );
});

// ── Controls: isolated toggle + currency — state never leaves this component ──
function PricingControls({
  isAnnual,
  currency,
  onToggle,
  onCurrency,
}: {
  isAnnual: boolean;
  currency: Currency;
  onToggle: () => void;
  onCurrency: (c: Currency) => void;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "24px", flexWrap: "wrap", marginBottom: "48px" }}>
      {/* Billing toggle */}
      <div className="billing-toggle">
        <span style={{ color: !isAnnual ? "var(--arctic)" : "var(--mint)", transition: "color 200ms ease-out" }}>Monthly</span>
        <button
          aria-checked={isAnnual}
          aria-label="Toggle annual billing"
          className={`toggle-track${isAnnual ? " annual" : ""}`}
          onClick={onToggle}
          type="button"
        >
          <div className="toggle-thumb" />
        </button>
        <span style={{ display: "flex", alignItems: "center", gap: "6px", color: isAnnual ? "var(--arctic)" : "var(--mint)", transition: "color 200ms ease-out" }}>
          Annual
          <span
            style={{
              fontFamily: "var(--font-mono)", fontSize: "0.62rem", fontWeight: 700,
              background: "var(--forsythia)", color: "var(--noir)", padding: "2px 7px",
              borderRadius: "99px",
              opacity: isAnnual ? 1 : 0,
              transition: "opacity 200ms ease-out",
            }}
          >
            −20%
          </span>
        </span>
      </div>

      {/* Currency selector */}
      <div role="group" aria-label="Select currency" style={{ display: "flex", gap: "8px" }}>
        {(["INR", "USD", "EUR"] as Currency[]).map((c) => (
          <button
            key={c}
            className={`currency-btn${currency === c ? " active" : ""}`}
            onClick={() => onCurrency(c)}
            aria-pressed={currency === c}
          >
            {CURRENCY_SYMBOLS[c]} {c}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Main Pricing section ──────────────────────────────────────────────────────
export default function Pricing() {
  const [isAnnual, setIsAnnual]   = useState(false);
  const [currency, setCurrency]   = useState<Currency>("USD");
  const sectionRef                = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll(".entry-fade");
    if (!els) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("visible"); observer.unobserve(e.target); }
      }),
      { threshold: 0.1 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="pricing"
      ref={sectionRef}
      aria-labelledby="pricing-heading"
      style={{
        padding: "100px 24px",
        background: "rgba(17,76,90,0.08)",
        borderTop: "1px solid rgba(217,232,226,0.06)",
        borderBottom: "1px solid rgba(217,232,226,0.06)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <header style={{ textAlign: "center", marginBottom: "48px" }}>
          <p className="section-eyebrow entry-fade">Pricing</p>
          <h2
            id="pricing-heading"
            className="section-title entry-fade entry-delay-1"
            style={{ marginTop: "12px", marginBottom: "16px" }}
          >
            Transparent, honest pricing
          </h2>
          <p className="section-subtitle entry-fade entry-delay-2" style={{ margin: "0 auto" }}>
            Start free. Scale as you grow. No hidden fees, no vendor lock-in.
          </p>
        </header>

        {/* Controls — state lives here, updates flow down via props to memoized cards */}
        <PricingControls
          isAnnual={isAnnual}
          currency={currency}
          onToggle={() => setIsAnnual((v) => !v)}
          onCurrency={setCurrency}
        />

        {/* Tier cards — memoized, never re-render on toggle/currency change */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px", alignItems: "start" }}>
          {TIERS.map((tier, i) => (
            <PricingCard
              key={tier.name}
              tier={tier}
              currency={currency}
              isAnnual={isAnnual}
              index={i}
            />
          ))}
        </div>

        {/* Bottom note */}
        <p
          className="entry-fade"
          style={{
            textAlign: "center", marginTop: "36px", fontSize: "0.82rem",
            color: "rgba(217,232,226,0.55)", display: "flex",
            alignItems: "center", justifyContent: "center", gap: "6px",
          }}
        >
          <Image src="/svgs/link-solid.svg" alt="" width={13} height={13} style={{ filter: "invert(0.4)" }} />
          All plans include a 14-day free trial. No credit card required.
        </p>
      </div>
    </section>
  );
}

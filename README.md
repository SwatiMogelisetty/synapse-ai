# Synapse AI — Next-Gen Data Automation Platform

> **FB Round 1 Submission — Next-Gen AI Platform Speed Run**
> Built by [@SwatiMogelisetty](https://github.com/SwatiMogelisetty)

A premium, high-converting, responsive landing page for an AI-driven data automation platform — built under a strict 4-hour countdown as part of the Founding Backend Round 1 challenge.

---

## 🔗 Links

| | |
|---|---|
| **Live Site** | https://synapse-ai.vercel.app |
| **GitHub Repo** | https://github.com/SwatiMogelisetty/synapse-ai |

---

## 🧱 Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + Custom CSS Variables |
| Fonts | JetBrains Mono · Inter (Google Fonts) |
| Deployment | Vercel |

---

## 🎨 Design System

### Color Palette

| Name | Hex | Usage |
|---|---|---|
| Forsythia | `#FFC801` | Primary accent, CTAs, highlights |
| Arctic Powder | `#F1F6F4` | Primary text |
| Mystic Mint | `#D9E8E2` | Secondary text, subtitles |
| Nocturnal Expedition | `#114C5A` | Card surfaces, elevated UI |
| Deep Saffron | `#FF9932` | Hover states, gradient accents |
| Oceanic Noir | `#172B36` | Page background, darkest layer |

### Typography
- **JetBrains Mono** — headings, code blocks, prices, eyebrow labels
- **Inter** — body text, UI elements, descriptions

---

## ✅ Core Features Implemented

### Feature 1 — Matrix-Driven Pricing & Currency Switcher
- Multi-dimensional configuration matrix: `PRICING_MATRIX[tier][currency]{ base, tariff }`
- Supports **INR (₹)**, **USD ($)**, **EUR (€)**
- Toggles between **Monthly** and **Annual** billing (flat 20% annual discount)
- Annual price computed as: `base × tariff × 0.80`
- Regional tariff variables applied per currency
- **Zero hardcoded UI values** — all prices computed dynamically
- State isolation enforced via `React.memo` + direct DOM `.textContent` mutation — changing currency or billing cycle does **not** trigger re-renders on surrounding layout blocks

### Feature 2 — Bento-to-Accordion with Context Lock
- **Desktop (≥769px):** Modern 12-column Bento Grid layout with hover states
- **Mobile (≤768px):** Fluid touch-optimized Accordion list
- **Context Lock Constraint:** When a user is hovering a bento card and resizes past the mobile breakpoint, the active index is programmatically transferred to the accordion — the corresponding panel opens automatically
- Built **100% from scratch** — zero external UI or animation libraries
- Accordion uses CSS `grid-template-rows: 0fr → 1fr` for smooth open/close

---

## 🚫 Constraints Respected

| Rule | Status |
|---|---|
| No Shadcn / Radix / HeadlessUI / Framer Motion | ✅ Verified — zero banned imports |
| No hardcoded price values | ✅ All from matrix |
| No global re-renders on toggle/currency change | ✅ React.memo + DOM mutation |
| No runtime CSS-in-JS animation engines | ✅ Native CSS transitions only |
| Micro-interactions: 150–200ms ease-out | ✅ All hovers comply |
| Layout reflows: 300–400ms ease-in-out | ✅ Accordion uses 350ms |
| Loader + entry animations ≤ 500ms TTI | ✅ Loader clears at 350ms |

---

## 📐 Page Structure

```
Navbar          — Fixed, scroll-aware, mobile hamburger
Hero            — Headline, CTA, terminal code preview, scroll cue
Logo Ticker     — Marquee of trusted companies
Bento Features  — 6-card bento grid (desktop) / accordion (mobile)
Stats           — Animated count-up metrics
Pricing         — 3-tier matrix pricing with toggle + currency switcher
Testimonials    — 6 social proof cards
FAQ             — Accordion with 7 questions
CTA             — Final conversion section
Footer          — Links, scroll-to-top, brand
```

---

## 🎯 SVG Assets Used

All 14 provided SVGs are integrated:

`arrow-path` · `arrow-trending-up` · `chart-pie` · `chevron-down` · `chevron-left` · `chevron-right` · `chevron-up` · `chevron-up-solid` · `cog-8-tooth` · `cube-16-solid` · `link-solid` · `link` · `search` · `x-mark`

---

## ⚡ Performance

- Static site generation (SSG) via Next.js App Router
- Google Fonts loaded via `<link rel="preconnect">` for minimal render blocking
- All animations use hardware-accelerated CSS (`transform`, `opacity`)
- No layout thrashing — transitions target isolated properties only
- Scroll-triggered entry animations via `IntersectionObserver`

---

## 🗂 Project Structure

```
synapse-ai/
├── public/
│   ├── favicon.svg
│   └── svgs/              # All 14 provided SVG assets
├── src/
│   ├── app/
│   │   ├── layout.tsx     # Metadata, OG tags, fonts, viewport
│   │   ├── page.tsx       # Page composition
│   │   └── globals.css    # Design tokens, animations, utilities
│   └── components/
│       ├── Loader.tsx
│       ├── Navbar.tsx
│       ├── Hero.tsx
│       ├── LogoTicker.tsx
│       ├── BentoFeatures.tsx   # Feature 2 — Bento + Accordion
│       ├── Stats.tsx
│       ├── Pricing.tsx         # Feature 1 — Matrix pricing
│       ├── Testimonials.tsx
│       ├── FAQ.tsx
│       ├── CTA.tsx
│       └── Footer.tsx
└── vercel.json
```

---

## 🚀 Running Locally

```bash
git clone https://github.com/SwatiMogelisetty/synapse-ai.git
cd synapse-ai
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📦 Build

```bash
npm run build
npm run start
```

---

*Built for FB Round 1 — Next-Gen AI Platform Speed Run · 26 June 2026*

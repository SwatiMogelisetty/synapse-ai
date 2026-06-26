"use client";
import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 99.99, suffix: "%", label: "Uptime SLA" },
  { value: 12000, suffix: "+", label: "Engineering teams" },
  { value: 5, suffix: "ms", label: "Avg processing latency" },
  { value: 400, suffix: "+", label: "Native integrations" },
];

function useCountUp(target: number, duration: number, triggered: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!triggered) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, triggered]);
  return count;
}

function StatItem({ stat }: { stat: typeof stats[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);
  const count = useCountUp(stat.value, 1200, triggered);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTriggered(true); obs.disconnect(); } },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const display = stat.value % 1 === 0
    ? Math.round(count).toLocaleString()
    : count.toFixed(2);

  return (
    <div ref={ref} className="stat-item">
      <div className="stat-value">
        {display}
        <span style={{ color: "var(--saffron)" }}>{stat.suffix}</span>
      </div>
      <div className="stat-label">{stat.label}</div>
    </div>
  );
}

export default function Stats() {
  return (
    <section
      aria-label="Platform statistics"
      style={{
        padding: "72px 24px",
        background: "rgba(17,76,90,0.15)",
        borderTop: "1px solid rgba(217,232,226,0.06)",
        borderBottom: "1px solid rgba(217,232,226,0.06)",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "40px",
        }}
      >
        {stats.map((s) => (
          <StatItem key={s.label} stat={s} />
        ))}
      </div>
    </section>
  );
}

import { motion } from "motion/react";

const ITEMS = [
  {
    role: "Principal Engineer",
    company: "Aurora Labs",
    period: "2024 — Present",
    points: [
      "Founded the spatial computing team, shipped 3 flagship WebXR products",
      "Cut render pipeline latency 62% with a bespoke culling system",
      "Mentored 14 engineers; two promoted to staff",
    ],
    tech: ["React", "Three.js", "WebGPU", "Rust"],
  },
  {
    role: "Senior Full-Stack Engineer",
    company: "Kinetic Studio",
    period: "2022 — 2024",
    points: [
      "Rebuilt collaboration layer on CRDTs — 400k daily active users",
      "Owned platform reliability from 99.5% → 99.98%",
      "Wrote design-tokens pipeline adopted across 6 product teams",
    ],
    tech: ["TypeScript", "Node", "Postgres", "Redis"],
  },
  {
    role: "Product Engineer",
    company: "Vector Co.",
    period: "2020 — 2022",
    points: [
      "Migrated monolith to edge-native serverless — 40% cost reduction",
      "Built a real-time analytics engine over ClickHouse",
    ],
    tech: ["Next.js", "Cloudflare", "ClickHouse"],
  },
  {
    role: "Software Engineer",
    company: "Northwind Digital",
    period: "2018 — 2020",
    points: [
      "First engineer. Shipped the MVP that secured the seed round",
      "Built the CI/CD and infra playbook still used today",
    ],
    tech: ["Ruby", "React", "AWS"],
  },
];

export function Experience() {
  return (
    <section id="experience" className="relative min-h-dvh px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <p className="font-mono text-xs text-primary tracking-[0.4em] uppercase mb-3">// 03 · Timeline</p>
          <h2 className="font-display text-5xl md:text-6xl font-bold">A decade in <span className="text-gradient">motion</span></h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px" style={{ background: "linear-gradient(180deg, transparent, oklch(0.88 0.19 210 / 0.6), oklch(0.72 0.32 330 / 0.6), transparent)" }} />

          {ITEMS.map((it, i) => (
            <motion.div
              key={it.role}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className={`relative mb-12 md:grid md:grid-cols-2 md:gap-12 ${i % 2 === 0 ? "" : "md:[direction:rtl]"}`}
            >
              <div className={`pl-12 md:pl-0 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12 md:[direction:ltr]"}`}>
                <span className="absolute left-2 md:left-1/2 top-4 -translate-x-1/2 size-4 rounded-full animate-pulse-glow" style={{ background: "var(--gradient-neon)", color: "var(--neon-cyan)" }} />
                <div className="glass-strong rounded-2xl p-6 hover:neon-border transition-all md:[direction:ltr] md:text-left">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-primary">{it.period}</div>
                  <h3 className="font-display text-2xl font-bold mt-1">{it.role}</h3>
                  <div className="text-accent mb-4">{it.company}</div>
                  <ul className="space-y-2 mb-4">
                    {it.points.map((p) => (
                      <li key={p} className="text-sm text-muted-foreground flex gap-2">
                        <span className="text-primary mt-0.5">▸</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1.5">
                    {it.tech.map((t) => (
                      <span key={t} className="text-[10px] font-mono px-2 py-1 rounded-md bg-primary/10 text-primary border border-primary/20">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
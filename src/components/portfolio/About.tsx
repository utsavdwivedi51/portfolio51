import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const SKILLS = [
  { label: "Frontend", value: 95 },
  { label: "Backend", value: 88 },
  { label: "Database", value: 82 },
  { label: "DevOps", value: 78 },
  { label: "Design", value: 84 },
  { label: "Mobile", value: 72 },
];

const TIMELINE = [
  { year: "2024", role: "Principal Engineer", org: "Aurora Labs", desc: "Leading a spatial-computing team building WebXR experiences." },
  { year: "2022", role: "Senior Full-Stack", org: "Kinetic Studio", desc: "Shipped real-time collaboration tools used by 400k designers." },
  { year: "2020", role: "Product Engineer", org: "Vector Co.", desc: "Rebuilt the product platform on a serverless edge stack." },
  { year: "2018", role: "Software Engineer", org: "Northwind Digital", desc: "First engineer. Built the MVP that raised the seed round." },
];

function RadarChart({ skills }: { skills: typeof SKILLS }) {
  const size = 320;
  const cx = size / 2;
  const cy = size / 2;
  const r = 130;
  const [hover, setHover] = useState<number | null>(null);
  const points = skills.map((s, i) => {
    const angle = (Math.PI * 2 * i) / skills.length - Math.PI / 2;
    const rr = (r * s.value) / 100;
    return {
      x: cx + Math.cos(angle) * rr,
      y: cy + Math.sin(angle) * rr,
      lx: cx + Math.cos(angle) * (r + 24),
      ly: cy + Math.sin(angle) * (r + 24),
      angle,
      ...s,
    };
  });
  const path = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";
  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-md mx-auto overflow-visible">
      <defs>
        <radialGradient id="radar-fill">
          <stop offset="0%" stopColor="oklch(0.88 0.19 210)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="oklch(0.72 0.32 330)" stopOpacity="0.2" />
        </radialGradient>
      </defs>
      {[0.25, 0.5, 0.75, 1].map((f) => (
        <circle key={f} cx={cx} cy={cy} r={r * f} fill="none" stroke="oklch(0.88 0.19 210 / 0.15)" />
      ))}
      {points.map((p, i) => (
        <line key={i} x1={cx} y1={cy} x2={cx + Math.cos(p.angle) * r} y2={cy + Math.sin(p.angle) * r} stroke="oklch(0.88 0.19 210 / 0.15)" />
      ))}
      <motion.path
        d={path}
        fill="url(#radar-fill)"
        stroke="oklch(0.88 0.19 210)"
        strokeWidth={1.5}
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        viewport={{ once: true }}
        style={{ filter: "drop-shadow(0 0 8px oklch(0.88 0.19 210 / 0.6))" }}
      />
      {points.map((p, i) => (
        <g key={p.label} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} className="cursor-pointer">
          <circle cx={p.x} cy={p.y} r={hover === i ? 7 : 4} fill="oklch(0.72 0.32 330)" style={{ filter: "drop-shadow(0 0 6px oklch(0.72 0.32 330))" }} />
          <text x={p.lx} y={p.ly} textAnchor="middle" dominantBaseline="middle" className="fill-foreground font-display text-[11px] uppercase tracking-widest">
            {p.label}
          </text>
          {hover === i && (
            <text x={p.lx} y={p.ly + 14} textAnchor="middle" className="fill-primary font-mono text-[10px]">
              {p.value}%
            </text>
          )}
        </g>
      ))}
    </svg>
  );
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let start: number;
        const dur = 1600;
        const step = (t: number) => {
          if (!start) start = t;
          const p = Math.min((t - start) / dur, 1);
          setN(Math.floor(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        io.disconnect();
      }
    });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{n}{suffix}</span>;
}

export function About() {
  return (
    <section id="about" className="relative min-h-dvh px-6 py-24 flex items-center">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <p className="font-mono text-xs text-primary tracking-[0.4em] uppercase mb-3">// 01 · About</p>
          <h2 className="font-display text-5xl md:text-6xl font-bold">Signal from <span className="text-gradient">the void</span></h2>
        </motion.div>

        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass-strong rounded-3xl p-8 md:p-10 space-y-5"
          >
            <div className="flex items-center gap-4">
              <div className="relative size-20 rounded-2xl overflow-hidden neon-border" style={{ background: "var(--gradient-neon)" }}>
                <div className="absolute inset-1 rounded-xl bg-background/70 backdrop-blur flex items-center justify-center font-display text-2xl font-black text-gradient">
                  NH
                </div>
              </div>
              <div>
                <div className="font-display text-2xl font-bold">Nova Halcyon</div>
                <div className="font-mono text-xs text-muted-foreground tracking-widest uppercase">Engineer · Artist · Systems Thinker</div>
              </div>
              <div className="ml-auto flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-primary">
                <span className="size-2 rounded-full bg-primary animate-pulse-glow" style={{ color: "var(--neon-cyan)" }} /> Online
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              I've spent a decade turning ambitious ideas into shipped systems — from
              spatial interfaces that respond to breath, to backend fabrics that keep
              humming under a million concurrent souls. My work sits at the fault line
              between engineering rigor and design instinct.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              I believe the best software feels less like software and more like a
              well-made instrument: quiet where it can be, expressive where it must be.
              I optimize for taste, tempo, and total absence of friction.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Currently obsessed with real-time 3D, edge-native architectures, and
              small tools that make big teams feel like small ones.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/50">
              <div>
                <div className="font-display text-3xl font-bold text-gradient"><Counter to={10} suffix="+" /></div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mt-1">Years shipping</div>
              </div>
              <div>
                <div className="font-display text-3xl font-bold text-gradient"><Counter to={82} /></div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mt-1">Projects delivered</div>
              </div>
              <div>
                <div className="font-display text-3xl font-bold text-gradient"><Counter to={12} suffix="M+" /></div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mt-1">Users touched</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass rounded-3xl p-6 md:p-8"
          >
            <div className="text-[10px] font-mono uppercase tracking-widest text-primary mb-4">Skill Matrix · Live</div>
            <RadarChart skills={SKILLS} />
          </motion.div>
        </div>

        <div className="mt-16">
          <div className="text-[10px] font-mono uppercase tracking-widest text-primary mb-6">Timeline · Descending</div>
          <div className="relative pl-8 md:pl-12 border-l border-border/60">
            {TIMELINE.map((t, i) => (
              <motion.div
                key={t.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative mb-8 last:mb-0"
              >
                <span
                  className="absolute -left-[calc(2rem+6px)] md:-left-[calc(3rem+6px)] top-1.5 size-3 rounded-full animate-pulse-glow"
                  style={{ background: "var(--neon-cyan)", color: "var(--neon-cyan)" }}
                />
                <div className="glass rounded-2xl p-5 hover:neon-border transition-all">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <span className="font-display font-bold text-primary">{t.year}</span>
                    <span className="font-display text-lg">{t.role}</span>
                    <span className="text-muted-foreground">·</span>
                    <span className="text-accent">{t.org}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{t.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
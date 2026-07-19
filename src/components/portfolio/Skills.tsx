import { motion } from "motion/react";

const SKILLS = [
  // inner
  { name: "React", level: 96, ring: 0 },
  { name: "TypeScript", level: 95, ring: 0 },
  { name: "Three.js", level: 90, ring: 0 },
  { name: "Node.js", level: 92, ring: 0 },
  // middle
  { name: "Rust", level: 78, ring: 1 },
  { name: "Python", level: 82, ring: 1 },
  { name: "Postgres", level: 85, ring: 1 },
  { name: "GraphQL", level: 80, ring: 1 },
  { name: "AWS", level: 76, ring: 1 },
  { name: "Docker", level: 82, ring: 1 },
  // outer
  { name: "WebGPU", level: 62, ring: 2 },
  { name: "Solidity", level: 58, ring: 2 },
  { name: "Blender", level: 70, ring: 2 },
  { name: "Flutter", level: 66, ring: 2 },
  { name: "Go", level: 60, ring: 2 },
  { name: "Elixir", level: 55, ring: 2 },
];

const RADII = [90, 160, 230];
const SPEEDS = [22, 34, 48];

export function Skills() {
  return (
    <section id="skills" className="relative min-h-dvh px-6 py-24 flex items-center">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <p className="font-mono text-xs text-primary tracking-[0.4em] uppercase mb-3">// 04 · Stack</p>
          <h2 className="font-display text-5xl md:text-6xl font-bold">Orbiting <span className="text-gradient">tools</span></h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Inner orbit: daily instruments. Outer orbit: kept sharp for the right problem.
          </p>
        </motion.div>

        <div className="relative mx-auto" style={{ width: 560, maxWidth: "100%", aspectRatio: "1/1" }}>
          {/* Rings */}
          {RADII.map((r, i) => (
            <div
              key={r}
              className="absolute rounded-full border border-primary/15"
              style={{
                width: (r * 2 * 100) / 280 + "%",
                height: (r * 2 * 100) / 280 + "%",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                boxShadow: `inset 0 0 40px oklch(0.88 0.19 210 / ${0.05 + i * 0.03})`,
              }}
            />
          ))}

          {/* Core */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-24 rounded-full glass-strong neon-border flex items-center justify-center font-display text-xs font-bold tracking-widest text-gradient">
            CORE
          </div>

          {/* Skills */}
          {SKILLS.map((s, i) => {
            const ringSkills = SKILLS.filter((k) => k.ring === s.ring);
            const idxInRing = ringSkills.indexOf(s);
            const offset = (360 / ringSkills.length) * idxInRing;
            const size = s.ring === 0 ? 72 : s.ring === 1 ? 58 : 48;
            const rPct = (RADII[s.ring] * 100) / 280;
            return (
              <div
                key={s.name}
                className="absolute top-1/2 left-1/2"
                style={{
                  width: 0,
                  height: 0,
                  animation: `orbit-${s.ring} ${SPEEDS[s.ring]}s linear infinite`,
                  transform: `rotate(${offset}deg)`,
                }}
              >
                <div
                  className="absolute"
                  style={{
                    transform: `translate(-50%, -50%) translateX(${rPct}%)`,
                    top: 0,
                    left: 0,
                  }}
                >
                  <div
                    className="group relative glass-strong rounded-full flex items-center justify-center font-display font-bold hover:scale-110 transition-transform cursor-pointer"
                    style={{
                      width: size,
                      height: size,
                      fontSize: s.ring === 0 ? 12 : 10,
                      boxShadow: `0 0 ${s.ring === 0 ? 20 : 10}px oklch(0.88 0.19 210 / ${0.6 - s.ring * 0.15})`,
                      animation: `pulse-glow ${3 + s.ring}s ease-in-out infinite`,
                    }}
                  >
                    <span className="text-center leading-tight px-1">{s.name}</span>
                    <div
                      className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono text-primary whitespace-nowrap"
                    >
                      {s.level}%
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <style>{`
            @keyframes orbit-0 { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            @keyframes orbit-1 { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
            @keyframes orbit-2 { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          `}</style>
        </div>
      </div>
    </section>
  );
}
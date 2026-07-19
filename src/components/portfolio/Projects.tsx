import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, Github, X } from "lucide-react";

type Project = {
  title: string;
  category: "Web" | "Mobile" | "AI/ML";
  short: string;
  detail: string;
  stack: string[];
  hue: string;
};

const PROJECTS: Project[] = [
  { title: "Attendance ERP System", category: "Web", short: "ERP-style system for tracking and managing attendance records.", detail: "Built with a focus on clean data flow between roles and a straightforward admin workflow — handles role-based access, record entry, and reporting without unnecessary complexity.", stack: ["React", "Node.js", "MongoDB"], hue: "#0066ff" },
  { title: "Cheapkart", category: "Web", short: "Price-comparison e-commerce app for browsing and comparing listings.", detail: "Full-stack CRUD platform built to practice a real shopping UI end to end — product listings, cart flow, and comparison logic backed by a proper data layer.", stack: ["React", "Express", "MongoDB"], hue: "#ff00ff" },
  { title: "QuickTalk", category: "Web", short: "Real-time chat application focused on fast, minimal messaging.", detail: "Socket-driven chat app prioritizing low-latency message delivery and a distraction-free conversation UI over feature bloat.", stack: ["React", "Node.js", "Socket.io"], hue: "#00ff88" },
  { title: "Resume Analyzer", category: "AI/ML", short: "Parses uploaded resumes and surfaces structured feedback.", detail: "Text-parsing utility that extracts structured data from resumes and generates actionable feedback — built to explore practical NLP-adjacent tooling.", stack: ["Python", "JavaScript"], hue: "#00f0ff" },
];
const FILTERS = ["All", "Web", "AI/ML"] as const;

export function Projects() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [open, setOpen] = useState<Project | null>(null);
  const list = PROJECTS.filter((p) => filter === "All" || p.category === filter);

  return (
    <section id="projects" className="relative min-h-dvh px-6 py-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <p className="font-mono text-xs text-primary tracking-[0.4em] uppercase mb-3">// 02 · Selected Work</p>
          <h2 className="font-display text-5xl md:text-6xl font-bold">Systems <span className="text-gradient">in orbit</span></h2>
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-10">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-widest transition-all ${
                filter === f
                  ? "text-primary-foreground neon-glow-cyan"
                  : "glass text-muted-foreground hover:text-foreground"
              }`}
              style={filter === f ? { background: "var(--gradient-neon)" } : undefined}
            >
              {f}
            </button>
          ))}
        </div>

        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <motion.button
                key={p.title}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ y: -6 }}
                onClick={() => setOpen(p)}
                className="glass-strong rounded-3xl p-6 text-left overflow-hidden group relative"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  style={{ background: `radial-gradient(circle at 30% 20%, ${p.hue}22, transparent 60%)` }}
                />
                <div className="relative aspect-video rounded-2xl mb-5 overflow-hidden" style={{ background: `linear-gradient(135deg, ${p.hue}33, oklch(0.14 0.05 290))` }}>
                  <div className="absolute inset-0 grid grid-cols-8 grid-rows-6 opacity-40">
                    {Array.from({ length: 48 }).map((_, k) => (
                      <div key={k} className="border border-white/5" />
                    ))}
                  </div>
                  <div
                    className="absolute inset-0 flex items-center justify-center font-display text-5xl font-black opacity-70"
                    style={{ color: p.hue, textShadow: `0 0 30px ${p.hue}` }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{p.category}</span>
                </div>
                <h3 className="font-display text-xl font-bold mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{p.short}</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <span key={s} className="text-[10px] font-mono px-2 py-1 rounded-md bg-primary/10 text-primary border border-primary/20">
                      {s}
                    </span>
                  ))}
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/70 backdrop-blur-md"
            onClick={() => setOpen(null)}
          >
            <motion.div
              initial={{ scale: 0.9, rotateY: -20, opacity: 0 }}
              animate={{ scale: 1, rotateY: 0, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong rounded-3xl p-8 max-w-2xl w-full relative neon-border"
            >
              <button
                onClick={() => setOpen(null)}
                className="absolute top-4 right-4 size-9 rounded-full glass flex items-center justify-center hover:text-accent"
                aria-label="Close"
              >
                <X className="size-4" />
              </button>
              <p className="text-[10px] font-mono uppercase tracking-widest text-primary">{open.category}</p>
              <h3 className="font-display text-3xl font-bold mt-2 mb-4">{open.title}</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">{open.detail}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {open.stack.map((s) => (
                  <span key={s} className="text-xs font-mono px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                    {s}
                  </span>
                ))}
              </div>
              <div className="flex gap-3">
                <a href="https://utsavdwivedi51.github.io/Attendance-ERP/" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-display text-xs uppercase tracking-widest text-primary-foreground neon-glow-cyan" style={{ background: "var(--gradient-neon)" }}>
                  <ExternalLink className="size-3.5" /> Live Demo
                </a>
                <a href="https://github.com/utsavdwivedi51" className="glass inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-display text-xs uppercase tracking-widest">
                  <Github className="size-3.5" /> Repository
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

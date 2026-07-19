import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "testimonials", label: "Words" },
  { id: "contact", label: "Contact" },
];

export function Nav() {
  const [active, setActive] = useState("hero");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
      setProgress(scrolled);
      // Determine active section
      const mid = window.scrollY + window.innerHeight / 2;
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (!el) continue;
        const top = el.offsetTop;
        const bottom = top + el.offsetHeight;
        if (mid >= top && mid < bottom) {
          setActive(s.id);
          break;
        }
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-transparent">
        <div
          className="h-full origin-left"
          style={{
            transform: `scaleX(${progress})`,
            background: "var(--gradient-neon)",
            boxShadow: "var(--shadow-neon-cyan)",
            transition: "transform 0.1s linear",
          }}
        />
      </div>

      {/* Top nav */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-40">
        <nav className="glass-strong rounded-full px-6 py-2.5 flex items-center gap-1 text-xs font-display">
          <a href="#hero" className="pr-4 mr-1 border-r border-border/60 text-gradient font-bold tracking-widest">
            NOVA.DEV
          </a>
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`px-3 py-1.5 rounded-full uppercase tracking-wider transition-all ${
                active === s.id
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {s.label}
            </a>
          ))}
        </nav>
      </header>

      {/* Right-side dots */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-4">
        {SECTIONS.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            aria-label={s.label}
            className="group relative flex items-center justify-end"
          >
            <span className="absolute right-6 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] uppercase tracking-widest text-primary font-display whitespace-nowrap">
              {s.label}
            </span>
            <span
              className={`block rounded-full transition-all ${
                active === s.id
                  ? "size-3 bg-primary animate-pulse-glow"
                  : "size-2 bg-muted-foreground/40 hover:bg-primary/70"
              }`}
              style={active === s.id ? { color: "var(--neon-cyan)" } : undefined}
            />
          </a>
        ))}
      </div>
    </>
  );
}
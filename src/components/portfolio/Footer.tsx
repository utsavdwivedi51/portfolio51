import { ArrowUp, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative px-6 py-16 border-t border-border/40">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="font-display font-black text-2xl text-gradient tracking-widest">NOVA.DEV</div>
        <div className="flex flex-wrap justify-center gap-6 text-xs font-mono uppercase tracking-widest text-muted-foreground">
          <a href="#hero" className="hover:text-primary transition-colors">Home</a>
          <a href="#projects" className="hover:text-primary transition-colors">Projects</a>
          <a href="#experience" className="hover:text-primary transition-colors">Experience</a>
          <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-xs font-mono text-muted-foreground flex items-center gap-1.5">
            Made with <Heart className="size-3 fill-accent text-accent animate-pulse" /> & Three.js
          </div>
          <a
            href="#hero"
            aria-label="Back to top"
            className="size-11 rounded-full flex items-center justify-center text-primary-foreground neon-glow-cyan"
            style={{ background: "var(--gradient-neon)" }}
          >
            <ArrowUp className="size-4" />
          </a>
        </div>
      </div>
      <div className="text-center text-[10px] font-mono uppercase tracking-widest text-muted-foreground mt-10">
        © {new Date().getFullYear()} Nova Halcyon · All signals reserved
      </div>
    </footer>
  );
}
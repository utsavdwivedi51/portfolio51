import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Github, Linkedin, Twitter, Dribbble, BookOpen, ArrowRight } from "lucide-react";

const TAGLINES = [
  "Full Stack Developer",
  "Creative Technologist",
  "Problem Solver",
  "Digital Architect",
];

function useTypewriter() {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = TAGLINES[idx];
    const speed = deleting ? 40 : 90;
    const t = setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, text.length + 1);
        setText(next);
        if (next === current) setTimeout(() => setDeleting(true), 1400);
      } else {
        const next = current.slice(0, text.length - 1);
        setText(next);
        if (next === "") {
          setDeleting(false);
          setIdx((i) => (i + 1) % TAGLINES.length);
        }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [text, deleting, idx]);

  return text;
}

const SOCIALS = [
  { icon: Github, label: "GitHub", href: "https://github.com/utsavdwivedi51" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/utsav-dwivedi51/" },
  { icon: Twitter, label: "Twitter", href: "https://x.com/utsav_dwivedi51" },
  { icon: Dribbble, label: "Dribbble", href: "https://dribbble.com/utsav-dwivedi" },
  { icon: BookOpen, label: "Medium", href: "https://medium.com/@utsavdwivedi51" },
];

export function Hero() {
  const typed = useTypewriter();
  return (
    <section
      id="hero"
      className="relative min-h-dvh flex items-center justify-center px-6 py-24"
    >
      <div className="max-w-5xl w-full text-center space-y-8">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-mono text-xs md:text-sm text-primary tracking-[0.4em] uppercase"
        >
          &lt;/ initializing runtime &gt;
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="font-display font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.9]"
        >
          <span className="text-gradient">UTSAV</span>
          <br />
          <span className="text-foreground/90">DWIVEDI</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="font-mono text-lg md:text-2xl h-8"
        >
          <span className="text-muted-foreground">$ </span>
          <span className="text-primary">{typed}</span>
          <span className="inline-block w-[2px] h-6 bg-primary translate-y-1 ml-1 animate-pulse" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="max-w-xl mx-auto text-sm md:text-base text-muted-foreground"
        >
          Building the interface between imagination and machine. I craft
          immersive digital systems where design, code, and physics collide.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.85 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <a
            href="#projects"
            className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full font-display uppercase tracking-widest text-sm text-primary-foreground overflow-hidden neon-glow-cyan"
            style={{ background: "var(--gradient-neon)" }}
          >
            <span className="relative z-10">View My Work</span>
            <ArrowRight className="size-4 relative z-10 transition-transform group-hover:translate-x-1" />
            <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
          </a>
          <a
            href="#contact"
            className="glass rounded-full px-8 py-4 font-display uppercase tracking-widest text-sm hover:neon-border transition-all"
          >
            Get In Touch
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex items-center justify-center gap-3 pt-6"
        >
          {SOCIALS.map(({ icon: Icon, label, href }, i) => (
            <motion.a
              key={label}
              href={href}
              aria-label={label}
              whileHover={{ y: -4, scale: 1.08 }}
              className="glass size-12 rounded-2xl flex items-center justify-center text-primary hover:text-accent hover:neon-border transition-colors animate-float"
              style={{ animationDelay: `${i * 0.4}s` }}
            >
              <Icon className="size-5" />
            </motion.a>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-mono tracking-[0.4em] text-muted-foreground uppercase">
        Scroll ↓
      </div>
    </section>
  );
}

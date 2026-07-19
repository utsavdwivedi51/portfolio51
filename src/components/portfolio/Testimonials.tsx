import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";

const ITEMS = [
  { name: "Ayush Chaudhary", role: "Program Coordinator · Oasis Infobyte", quote: "Utsav rewires how teams think about product surfaces. The interfaces we shipped together outperformed our best A/Bs by 3x.", rating: 5 },
  { name: "P Saxena", role: "Design Director · Navodita Infotech", quote: "One of the rare engineers who can hold both the physics and the poetry. Every review with Utsav sharpens the work.", rating: 5 },
  { name: "Giorgia Varisco", role: "CGU · UNICEF", quote: "Utsav is a force multiplier. Our shipping velocity doubled and our bug backlog collapsed. That's not a coincidence.", rating: 5 },
  { name: "Lynn Bloomer", role: "Director · Cisco", quote: "We rebuilt our platform on the architecture Utsav drafted in a weekend. Two years later it still scales cleanly.", rating: 5 },
];

export function Testimonials() {
  const [i, setI] = useState(0);
  const t = ITEMS[i];
  return (
    <section id="testimonials" className="relative min-h-dvh px-6 py-24 flex items-center">
      <div className="max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14 text-center"
        >
          <p className="font-mono text-xs text-primary tracking-[0.4em] uppercase mb-3">// 05 · Signal</p>
          <h2 className="font-display text-5xl md:text-6xl font-bold">What people <span className="text-gradient">say</span></h2>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 40, rotateY: 15 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: -40, rotateY: -15 }}
              transition={{ duration: 0.5 }}
              className="glass-strong rounded-3xl p-10 md:p-14 text-center relative neon-border"
            >
              <Quote className="size-10 text-primary/40 mx-auto mb-4" />
              <p className="text-xl md:text-2xl font-display leading-relaxed mb-8">
                "{t.quote}"
              </p>
              <div className="flex justify-center gap-1 mb-5">
                {Array.from({ length: t.rating }).map((_, k) => (
                  <Star key={k} className="size-4 fill-primary text-primary" style={{ filter: "drop-shadow(0 0 6px oklch(0.88 0.19 210))" }} />
                ))}
              </div>
              <div className="font-display font-bold">{t.name}</div>
              <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mt-1">{t.role}</div>
            </motion.div>
          </AnimatePresence>

          <button
            onClick={() => setI((n) => (n - 1 + ITEMS.length) % ITEMS.length)}
            className="absolute -left-2 md:-left-16 top-1/2 -translate-y-1/2 size-12 rounded-full glass hover:neon-border flex items-center justify-center"
            aria-label="Previous"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            onClick={() => setI((n) => (n + 1) % ITEMS.length)}
            className="absolute -right-2 md:-right-16 top-1/2 -translate-y-1/2 size-12 rounded-full glass hover:neon-border flex items-center justify-center"
            aria-label="Next"
          >
            <ChevronRight className="size-5" />
          </button>

          <div className="flex justify-center gap-2 mt-8">
            {ITEMS.map((_, k) => (
              <button
                key={k}
                onClick={() => setI(k)}
                aria-label={`Testimonial ${k + 1}`}
                className={`h-1.5 rounded-full transition-all ${k === i ? "w-8 bg-primary" : "w-1.5 bg-muted-foreground/40"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

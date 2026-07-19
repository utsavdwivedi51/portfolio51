import { useState } from "react";
import { motion } from "motion/react";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Instagram, Youtube, Send } from "lucide-react";
import { toast } from "sonner";

const SUBJECTS = ["New project", "Collaboration", "Speaking", "Just saying hi"];
const CONTACTS = [
  { icon: Mail, label: "Email", value: "hello@novahalcyon.dev" },
  { icon: Phone, label: "Phone", value: "+1 234 567 8900" },
  { icon: MapPin, label: "Location", value: "Lisbon · Portugal" },
];
const SOCIALS = [
  { icon: Github, label: "GitHub", handle: "@novahalcyon" },
  { icon: Linkedin, label: "LinkedIn", handle: "/in/novahalcyon" },
  { icon: Twitter, label: "Twitter", handle: "@novahalcyon" },
  { icon: Instagram, label: "Instagram", handle: "@nova.halcyon" },
  { icon: Youtube, label: "YouTube", handle: "@novahalcyon" },
];

export function Contact() {
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [msg, setMsg] = useState("");

  return (
    <section id="contact" className="relative min-h-dvh px-6 py-24 flex items-center">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14 text-center"
        >
          <p className="font-mono text-xs text-primary tracking-[0.4em] uppercase mb-3">// 06 · Open Channel</p>
          <h2 className="font-display text-5xl md:text-6xl font-bold">Let's <span className="text-gradient">talk</span></h2>
          <div className="mt-4 inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-primary">
            <span className="size-2 rounded-full bg-primary animate-pulse-glow" style={{ color: "var(--neon-cyan)" }} />
            Available for new projects · Q3 2026
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8">
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Transmission received. I'll reply within 48h.");
              setMsg("");
            }}
            className="glass-strong rounded-3xl p-8 space-y-5 neon-border"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-[10px] font-mono uppercase tracking-widest text-primary">Name</span>
                <input required className="mt-2 w-full bg-transparent border-b border-border focus:border-primary outline-none py-2 font-display" placeholder="Your name" />
              </label>
              <label className="block">
                <span className="text-[10px] font-mono uppercase tracking-widest text-primary">Email</span>
                <input required type="email" className="mt-2 w-full bg-transparent border-b border-border focus:border-primary outline-none py-2 font-display" placeholder="you@domain.com" />
              </label>
            </div>
            <label className="block">
              <span className="text-[10px] font-mono uppercase tracking-widest text-primary">Subject</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {SUBJECTS.map((s) => (
                  <button
                    type="button"
                    key={s}
                    onClick={() => setSubject(s)}
                    className={`px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest transition-all ${
                      subject === s ? "text-primary-foreground neon-glow-cyan" : "glass text-muted-foreground hover:text-foreground"
                    }`}
                    style={subject === s ? { background: "var(--gradient-neon)" } : undefined}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </label>
            <label className="block">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-primary">Message</span>
                <span className="text-[10px] font-mono text-muted-foreground">{msg.length}/500</span>
              </div>
              <textarea
                required
                value={msg}
                onChange={(e) => setMsg(e.target.value.slice(0, 500))}
                rows={5}
                className="mt-2 w-full bg-transparent border border-border rounded-xl focus:border-primary outline-none p-3 font-display resize-none"
                placeholder="Tell me about your project, timeline, and dreams..."
              />
            </label>
            <button
              type="submit"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full font-display uppercase tracking-widest text-sm text-primary-foreground neon-glow-cyan"
              style={{ background: "var(--gradient-neon)" }}
            >
              <Send className="size-4" /> Transmit
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-4"
          >
            {CONTACTS.map((c) => (
              <div key={c.label} className="glass rounded-2xl p-4 flex items-center gap-4 hover:neon-border transition-all">
                <div className="size-11 rounded-xl flex items-center justify-center" style={{ background: "var(--gradient-neon)", boxShadow: "var(--shadow-neon-cyan)" }}>
                  <c.icon className="size-5 text-primary-foreground" />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{c.label}</div>
                  <div className="font-display">{c.value}</div>
                </div>
              </div>
            ))}
            <div className="glass rounded-2xl p-5">
              <div className="text-[10px] font-mono uppercase tracking-widest text-primary mb-3">Networks</div>
              <div className="grid grid-cols-5 gap-2">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href="#"
                    aria-label={s.label}
                    className="group aspect-square rounded-xl glass hover:neon-border flex items-center justify-center text-primary hover:text-accent transition-colors"
                  >
                    <s.icon className="size-4" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
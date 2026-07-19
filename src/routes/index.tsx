import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { Toaster } from "sonner";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Projects } from "@/components/portfolio/Projects";
import { Experience } from "@/components/portfolio/Experience";
import { Skills } from "@/components/portfolio/Skills";
import { Testimonials } from "@/components/portfolio/Testimonials";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";

// 3D scene is browser-only (WebGL). Lazy-load to keep SSR clean.
const Scene3D = lazy(() =>
  import("@/components/portfolio/Scene3D").then((m) => ({ default: m.Scene3D })),
);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nova Halcyon · Full-Stack Developer & Creative Technologist" },
      {
        name: "description",
        content:
          "Portfolio of Nova Halcyon — engineer and creative technologist building immersive 3D interfaces, real-time systems, and edge-native software.",
      },
      { property: "og:title", content: "Nova Halcyon · Portfolio" },
      {
        property: "og:description",
        content: "Immersive 3D portfolio: full-stack, WebGL, real-time systems.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative">
      <Suspense fallback={null}>
        <Scene3D />
      </Suspense>
      <Nav />
      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <Toaster theme="dark" position="bottom-right" />
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { Toaster } from "sonner";
import { OG_SECTIONS } from "@/lib/og-sections";
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
      {
        name: "keywords",
        content:
          "Nova Halcyon, full-stack developer, creative technologist, three.js portfolio, WebGL developer, react developer, 3D web, WebGPU, creative coding, edge-native, TypeScript, real-time systems",
      },
      { name: "author", content: "Nova Halcyon" },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "theme-color", content: "#0a0a0f" },

      // Open Graph
      { property: "og:title", content: "Nova Halcyon · Portfolio" },
      {
        property: "og:description",
        content: "Immersive 3D portfolio: full-stack, WebGL, real-time systems.",
      },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "/" },
      { property: "og:site_name", content: "Nova Halcyon" },
      { property: "og:locale", content: "en_US" },
      { property: "profile:first_name", content: "Nova" },
      { property: "profile:last_name", content: "Halcyon" },
      { property: "profile:username", content: "novahalcyon" },

      // Twitter
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@novahalcyon" },
      { name: "twitter:creator", content: "@novahalcyon" },
      { name: "twitter:title", content: "Nova Halcyon · Portfolio" },
      {
        name: "twitter:description",
        content: "Immersive 3D portfolio: full-stack, WebGL, real-time systems.",
      },
      { property: "og:image", content: OG_SECTIONS.hero.image },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Nova Halcyon — immersive 3D portfolio hero" },
      { name: "twitter:image", content: OG_SECTIONS.hero.image },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Person",
              "@id": "/#person",
              name: "Nova Halcyon",
              alternateName: "novahalcyon",
              jobTitle: "Full-Stack Developer & Creative Technologist",
              description:
                "Engineer and creative technologist building immersive 3D interfaces, real-time systems, and edge-native software.",
              url: "/",
              image: "/favicon.ico",
              knowsAbout: [
                "Full-Stack Development",
                "Three.js",
                "React",
                "TypeScript",
                "WebGL",
                "WebGPU",
                "Creative Coding",
                "Edge Computing",
                "Real-Time Systems",
                "3D Graphics",
              ],
              sameAs: [
                "https://github.com/novahalcyon",
                "https://linkedin.com/in/novahalcyon",
                "https://twitter.com/novahalcyon",
                "https://dribbble.com/novahalcyon",
                "https://medium.com/@novahalcyon",
              ],
              address: {
                "@type": "PostalAddress",
                addressLocality: "Lisbon",
                addressCountry: "PT",
              },
              email: "mailto:hello@novahalcyon.dev",
              telephone: "+1-234-567-8900",
            },
            {
              "@type": "WebSite",
              "@id": "/#website",
              url: "/",
              name: "Nova Halcyon · Portfolio",
              description:
                "Immersive 3D portfolio showcasing full-stack engineering, WebGL, and real-time systems work.",
              inLanguage: "en-US",
              author: { "@id": "/#person" },
              publisher: { "@id": "/#person" },
            },
            {
              "@type": "ProfilePage",
              "@id": "/#profilepage",
              url: "/",
              name: "Nova Halcyon · Portfolio",
              about: { "@id": "/#person" },
              mainEntity: { "@id": "/#person" },
              isPartOf: { "@id": "/#website" },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "/" },
                { "@type": "ListItem", position: 2, name: "About", item: "/#about" },
                { "@type": "ListItem", position: 3, name: "Projects", item: "/#projects" },
                { "@type": "ListItem", position: 4, name: "Experience", item: "/#experience" },
                { "@type": "ListItem", position: 5, name: "Contact", item: "/#contact" },
              ],
            },
          ],
        }),
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

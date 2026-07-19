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
      { title: "Utsav Dwivedi · Full-Stack Developer & Creative Technologist" },
      {
        name: "description",
        content:
          "Portfolio of Utsav Dwivedi — engineer and creative technologist building immersive 3D interfaces, real-time systems, and edge-native software.",
      },
      {
        name: "keywords",
        content:
          "Utsav Dwivedi, full-stack developer, creative technologist, three.js portfolio, WebGL developer, react developer, 3D web, WebGPU, creative coding, edge-native, TypeScript, real-time systems",
      },
      { name: "author", content: "Utsav Dwivedi" },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "theme-color", content: "#0a0a0f" },

      // Open Graph
      { property: "og:title", content: "Utsav Dwivedi · Portfolio" },
      {
        property: "og:description",
        content: "Immersive 3D portfolio: full-stack, WebGL, real-time systems.",
      },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "/" },
      { property: "og:site_name", content: "Utsav Dwivedi" },
      { property: "og:locale", content: "en_US" },
      { property: "profile:first_name", content: "Utsav" },
      { property: "profile:last_name", content: "Dwivedi" },
      { property: "profile:username", content: "utsavdwivedi51" },

      // Twitter
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@utsav_dwivedi" },
      { name: "twitter:creator", content: "@utsav_dwivedi" },
      { name: "twitter:title", content: "Utsav Dwivedi · Portfolio" },
      {
        name: "twitter:description",
        content: "Immersive 3D portfolio: full-stack, WebGL, real-time systems.",
      },
      { property: "og:image", content: OG_SECTIONS.hero.image },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Utsav Dwivedi — immersive 3D portfolio hero" },
      { name: "twitter:image", content: OG_SECTIONS.hero.image },
    ],
    links: [{ rel: "canonical", href: "https://x.com/utsav_dwivedi51" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Person",
              "@id": "/#person",
              name: "Utsav Dwivedi",
              alternateName: "utsavdwivedi",
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
                "https://github.com/utsavdwivedi51",
                "https://linkedin.com/in/utsav-dwivedi51/",
                "https://twitter.com/utsav_dwivedi51",
                "https://dribbble.com/utsav-dwivedi",
                "https://medium.com/@utsavdwivedi51",
              ],
              address: {
                "@type": "PostalAddress",
                addressLocality: "Varanasi",
                addressCountry: "India",
              },
              email: "utsavdwivedi51@gmail.com",
              telephone: "+91-639-408-5765",
            },
            {
              "@type": "WebSite",
              "@id": "/#website",
              url: "/",
              name: "Utsav Dwivedi · Portfolio",
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
              name: "Utsav Dwivedi · Portfolio",
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

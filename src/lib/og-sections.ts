import ogHero from "@/assets/og/og-hero.jpg";
import ogAbout from "@/assets/og/og-about.jpg";
import ogProjects from "@/assets/og/og-projects.jpg";
import ogExperience from "@/assets/og/og-experience.jpg";
import ogSkills from "@/assets/og/og-skills.jpg";
import ogContact from "@/assets/og/og-contact.jpg";

export type OgSection = {
  slug: string;
  anchor: string;
  title: string;
  description: string;
  image: string;
};

export const OG_SECTIONS: Record<string, OgSection> = {
  hero: {
    slug: "hero",
    anchor: "#hero",
    title: "Nova Halcyon · Full-Stack Developer & Creative Technologist",
    description:
      "Immersive 3D portfolio — WebGL, real-time systems, and edge-native software.",
    image: ogHero,
  },
  about: {
    slug: "about",
    anchor: "#about",
    title: "About Nova Halcyon · Skills & Story",
    description:
      "Engineer and creative technologist with a decade of shipping immersive interfaces and real-time systems.",
    image: ogAbout,
  },
  projects: {
    slug: "projects",
    anchor: "#projects",
    title: "Projects · Nova Halcyon",
    description:
      "Selected work in WebGL, real-time collaboration, and edge-native product engineering.",
    image: ogProjects,
  },
  experience: {
    slug: "experience",
    anchor: "#experience",
    title: "Experience · Nova Halcyon",
    description:
      "A decade of building at the seams of graphics, product, and systems engineering.",
    image: ogExperience,
  },
  skills: {
    slug: "skills",
    anchor: "#skills",
    title: "Skills & Stack · Nova Halcyon",
    description:
      "Three.js, React, TypeScript, WebGPU, Rust, and the tools of modern edge-native software.",
    image: ogSkills,
  },
  contact: {
    slug: "contact",
    anchor: "#contact",
    title: "Contact Nova Halcyon",
    description:
      "Open to collaborations on 3D web, creative tooling, and real-time products.",
    image: ogContact,
  },
};

export const OG_SECTION_SLUGS = Object.keys(OG_SECTIONS);
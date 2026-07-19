import { createFileRoute, notFound, Navigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { OG_SECTIONS } from "@/lib/og-sections";

export const Route = createFileRoute("/share/$section")({
  loader: ({ params }) => {
    const section = OG_SECTIONS[params.section];
    if (!section) throw notFound();
    return { section };
  },
  head: ({ loaderData, params }) => {
    const section = loaderData?.section;
    if (!section) {
      return {
        meta: [
          { title: "Not found · Nova Halcyon" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const url = `/share/${params.section}`;
    return {
      meta: [
        { title: section.title },
        { name: "description", content: section.description },
        { name: "theme-color", content: "#0a0a0f" },
        { property: "og:type", content: "profile" },
        { property: "og:site_name", content: "Nova Halcyon" },
        { property: "og:title", content: section.title },
        { property: "og:description", content: section.description },
        { property: "og:url", content: url },
        { property: "og:image", content: section.image },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { property: "og:image:alt", content: section.title },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: section.title },
        { name: "twitter:description", content: section.description },
        { name: "twitter:image", content: section.image },
      ],
      links: [{ rel: "canonical", href: `/${section.anchor}` }],
    };
  },
  component: ShareRedirect,
  notFoundComponent: () => <Navigate to="/" replace />,
});

function ShareRedirect() {
  const { section } = Route.useLoaderData();
  useEffect(() => {
    // Human visitors bounce to the actual section anchor on the home page.
    // Crawlers read the head metadata above without executing this.
    window.location.replace(`/${section.anchor}`);
  }, [section]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f] text-white/70">
      <p className="text-sm tracking-wide">Redirecting to {section.title}…</p>
    </div>
  );
}
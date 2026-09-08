import { createFileRoute, Link } from "@tanstack/react-router";

import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { LogoMark } from "@/components/LogoMark";
import { POSTS } from "@/lib/posts";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Journal | Balance Design & Fashion Consultancy" },
      {
        name: "description",
        content:
          "Notes on image, identity and design from Balance Design — corporate dressing, trend forecasting, uniform design and more.",
      },
      { property: "og:title", content: "Journal | Balance Design" },
      {
        property: "og:description",
        content: "Notes on image, identity and design from the Balance Design studio.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  return (
    <div className="relative z-10 bg-background">
      <SiteHeader />

      <section className="px-6 pb-24 pt-44 md:px-12 md:pb-32 md:pt-56">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <LogoMark />
            <p className="label-xs mt-6 text-muted-foreground">Journal</p>
            <h1 className="display mt-6 text-4xl leading-[1.1] md:text-6xl">
              Notes on image, identity and design.
            </h1>
          </div>
        </Reveal>
      </section>

      <section className="px-6 pb-32 md:px-12">
        <div className="mx-auto max-w-6xl">
          {POSTS.map((post, i) => (
            <Reveal key={post.slug} delay={i * 80}>
              <Link
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="group grid gap-8 border-t border-border py-12 md:grid-cols-[1fr_1.2fr] md:gap-16 md:py-16"
              >
                <div className="overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <p className="label-xs text-muted-foreground">
                    {post.category} — {post.date}
                  </p>
                  <h2 className="display mt-5 text-2xl leading-snug md:text-4xl">{post.title}</h2>
                  <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
                    {post.excerpt}
                  </p>
                  <span className="label-xs link-underline mt-8 self-start">Read the note</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { getPost } from "@/lib/posts";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Not found | Balance Design" }, { name: "robots", content: "noindex" }],
      };
    }
    const { post } = loaderData;
    return {
      meta: [
        { title: `${post.title} | Balance Design Journal` },
        { name: "description", content: post.excerpt },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.excerpt },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: PostNotFound,
  component: PostPage,
});

function PostNotFound() {
  return (
    <div className="relative z-10 bg-background">
      <SiteHeader />
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
        <h1 className="display text-4xl md:text-6xl">Note not found.</h1>
        <Link to="/blog" className="label-xs link-underline mt-8">
          Back to the journal
        </Link>
      </div>
      <SiteFooter />
    </div>
  );
}

function PostPage() {
  const { post } = Route.useLoaderData();

  return (
    <div className="relative z-10 bg-background">
      <SiteHeader />

      <article className="px-6 pt-44 md:px-12 md:pt-56">
        <Reveal>
          <header className="mx-auto max-w-3xl text-center">
            <p className="label-xs text-muted-foreground">
              {post.category} — {post.date}
            </p>
            <h1 className="display mt-6 text-4xl leading-[1.1] md:text-6xl">{post.title}</h1>
          </header>
        </Reveal>

        <Reveal delay={100}>
          <div className="mx-auto mt-16 max-w-5xl overflow-hidden">
            <img src={post.image} alt={post.title} className="aspect-[16/9] w-full object-cover" />
          </div>
        </Reveal>

        <div className="mx-auto max-w-2xl py-20 md:py-28">
          {post.body.map((para, i) => (
            <Reveal key={i} delay={i * 60}>
              <p className="mb-8 text-base leading-[1.9] text-muted-foreground md:text-lg">
                {para}
              </p>
            </Reveal>
          ))}

          <Reveal>
            <Link to="/blog" className="label-xs link-underline">
              Back to the journal
            </Link>
          </Reveal>
        </div>
      </article>

      <SiteFooter />
    </div>
  );
}

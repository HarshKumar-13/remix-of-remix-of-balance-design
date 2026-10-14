import { createFileRoute, redirect } from "@tanstack/react-router";

// The Find Your Service page now lives as a section on the Contact Us page.
// This route only forwards old links so nothing shared previously breaks.
export const Route = createFileRoute("/find-your-service")({
  head: () => ({
    meta: [
      { title: "Find Your Service — Balance Design & Fashion Consultancy" },
      { name: "robots", content: "noindex" },
    ],
  }),
  beforeLoad: () => {
    throw redirect({ to: "/contact", hash: "find-your-service" });
  },
});
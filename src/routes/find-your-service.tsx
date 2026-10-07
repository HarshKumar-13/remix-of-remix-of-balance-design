import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getServiceRecommendation } from "@/lib/service-advisor.functions";
import { SERVICES } from "@/lib/services";

export const Route = createFileRoute("/find-your-service")({
  head: () => ({
    meta: [
      { title: "Find Your Service — Balance Design & Fashion Consultancy" },
      {
        name: "description",
        content: "Describe your image or brand goals and get an AI-powered recommendation for the right Balance Design service.",
      },
      { property: "og:title", content: "Find Your Service — Balance Design" },
      {
        property: "og:description",
        content: "Tell us your image or brand goals and discover the consultancy service that fits best.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FindYourService,
});

type Result = { serviceId: string; reason: string; alternativeId: string | null };

function FindYourService() {
  const recommend = useServerFn(getServiceRecommendation);
  const [goals, setGoals] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (goals.trim().length < 10) {
      setError("Please tell us a little more about your goals.");
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await recommend({ data: { goals } });
      if (res.ok) setResult(res.result);
      else setError(res.error);
    } catch {
      setError("We couldn't generate a recommendation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const main = result && SERVICES.find((s) => s.id === result.serviceId);
  const alt = result?.alternativeId && SERVICES.find((s) => s.id === result.alternativeId);

  return (
    <main>
      <SiteHeader introComplete forceSolid />
      <section className="bg-background px-6 pb-24 pt-40 text-center md:px-12 md:pb-36 md:pt-48">
        <div className="mx-auto max-w-3xl">
          <p className="label-xs font-semibold text-muted-foreground">AI-powered service advisor</p>
          <h1 className="display mt-6 text-[2.4rem] leading-[1.02] uppercase sm:text-6xl md:text-[4.2rem]">
            <span className="text-primary">Find</span> your service
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-[calc(1.294rem+2px)] font-medium leading-relaxed text-red md:text-[calc(1.4375rem+2px)]">
            Tell us about your image or brand goals and we&rsquo;ll suggest the service that fits you best.
          </p>

          <form onSubmit={submit} className="mt-12 text-left">
            <label htmlFor="goals" className="label-xs font-semibold text-muted-foreground">
              Your goals
            </label>
            <textarea
              id="goals"
              value={goals}
              onChange={(e) => setGoals(e.target.value)}
              maxLength={1500}
              rows={6}
              placeholder="e.g. I'm a senior manager presenting to the board and want to look more polished and confident…"
              className="mt-3 w-full border border-foreground/20 bg-background p-4 text-lg leading-relaxed text-foreground outline-none focus:border-primary"
            />
            <div className="mt-6 flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="label-xs bg-primary px-8 py-4 font-semibold text-primary-foreground transition-opacity disabled:opacity-60"
              >
                {loading ? "Finding your service…" : "Recommend a service"}
              </button>
            </div>
          </form>

          {error && (
            <p role="alert" className="mt-8 text-red">
              {error}
            </p>
          )}

          {main && result && (
            <div className="mt-14 border-t border-foreground/15 pt-12" aria-live="polite">
              <p className="label-xs font-semibold text-muted-foreground">We recommend</p>
              <h2 className="display mt-4 text-3xl uppercase text-primary md:text-5xl">{main.title}</h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-foreground">{result.reason}</p>
              {alt && (
                <p className="mt-6 text-muted-foreground">
                  You may also like: <span className="font-medium text-foreground">{alt.title}</span>
                </p>
              )}
              <Link
                to="/contact"
                className="label-xs mt-10 inline-block bg-primary px-8 py-4 font-semibold text-primary-foreground"
              >
                Get in touch
              </Link>
            </div>
          )}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}

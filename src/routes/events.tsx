import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import { SiteHeader } from "@/components/SiteHeader";
import { Reveal } from "@/components/Reveal";
import { LogoMark } from "@/components/LogoMark";
import { SiteFooter } from "@/components/SiteFooter";
import heroImg from "@/assets/hero.jpg";
import eventImg1 from "@/assets/about.jpg";
import eventImg2 from "@/assets/pers-1.jpg";
import eventImg3 from "@/assets/pers-3.jpg";
import eventImg4 from "@/assets/Picture6.jpg.asset.json";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events — Balance Design & Fashion Consultancy" },
      {
        name: "description",
        content:
          "Upcoming and past events by Balance Design — fashion consultations, styling workshops, trend talks and brand experiences.",
      },
      { property: "og:title", content: "Events — Balance Design & Fashion Consultancy" },
      {
        property: "og:description",
        content:
          "Fashion consultations, styling workshops, trend talks and brand experiences.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EventsPage,
});

const UPCOMING_EVENTS = [
  {
    date: "28 Mar 2027",
    title: "Corporate Style Masterclass",
    location: "Mumbai",
    description:
      "A half-day immersive session for leadership teams on dressing with intention, presence and brand alignment.",
    image: eventImg4.url,
    cta: "Reserve a seat",
  },
  {
    date: "15 Apr 2027",
    title: "Personal Wardrobe Reset",
    location: "Delhi",
    description:
      "An intimate styling workshop focused on colour, proportion and building a wardrobe that feels like you.",
    image: eventImg2,
    cta: "Join the waitlist",
  },
];

const PAST_EVENTS = [
  {
    date: "12 Dec 2026",
    title: "Trend Forecasting Evening",
    location: "Bangalore",
    description:
      "An editorial review of the season ahead — colour stories, silhouette directions and the ideas shaping fashion.",
    image: eventImg1,
    cta: "View recap",
  },
  {
    date: "08 Nov 2026",
    title: "Uniform Design Dialogue",
    location: "Hyderabad",
    description:
      "A conversation on how uniform design balances identity, function and the people who wear it every day.",
    image: eventImg3,
    cta: "View recap",
  },
];

function EventsHero() {
  const [y, setY] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 150);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => setY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative flex h-[70svh] min-h-[480px] items-end overflow-hidden bg-charcoal md:h-[80svh]">
      <img
        src={heroImg}
        alt="Editorial fashion backdrop for Balance Design events"
        className="absolute inset-0 h-[115%] w-full object-cover"
        style={{ transform: `translate3d(0, ${y * 0.18}px, 0) scale(${loaded ? 1.08 : 1})` }}
      />
      <div className="absolute inset-0 bg-charcoal/45" />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-charcoal/80 via-charcoal/25 to-transparent" />

      <div
        className="relative z-10 w-full px-6 pb-20 text-ivory md:px-12 md:pb-28"
        style={{ transform: `translate3d(0, ${y * -0.05}px, 0)` }}
      >
        <div
          className={`transition-all duration-1000 ${loaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
          style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          <p className="label-xs opacity-80">Balance Design</p>
        </div>
        <h1
          className={`display mt-6 text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] ${loaded ? "opacity-100" : "opacity-0"}`}
          style={{
            transform: loaded ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 1.4s cubic-bezier(0.16, 1, 0.3, 1), transform 1.4s cubic-bezier(0.16, 1, 0.3, 1)",
            transitionDelay: "200ms",
          }}
        >
          Events
        </h1>
        <p
          className={`mt-6 max-w-xl text-sm leading-relaxed opacity-80 md:text-base ${loaded ? "opacity-80" : "opacity-0"}`}
          style={{
            transform: loaded ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1)",
            transitionDelay: "500ms",
          }}
        >
          Gatherings, workshops and conversations where fashion, image and design come together.
        </p>
      </div>
    </section>
  );
}

function EventCard({
  event,
  index,
}: {
  event: (typeof UPCOMING_EVENTS)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const mid = rect.top + rect.height / 2 - window.innerHeight / 2;
      setOffset(-mid * 0.04);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const isEven = index % 2 === 0;

  return (
    <article
      ref={ref}
      className={`grid grid-cols-1 items-center gap-8 md:grid-cols-12 md:gap-16 ${isEven ? "" : "md:[direction:rtl]"}`}
    >
      <div className={`overflow-hidden md:col-span-7 ${isEven ? "" : "md:[direction:ltr]"}`}>
        <Reveal>
          <img
            src={event.image}
            alt={event.title}
            loading="lazy"
            className="aspect-[4/3] w-full object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.06]"
            style={{ transform: `translate3d(0, ${offset}px, 0)` }}
          />
        </Reveal>
      </div>
      <div className={`md:col-span-5 ${isEven ? "" : "md:[direction:ltr]"}`}>
        <Reveal>
          <p className="label-xs text-muted-foreground">
            {event.date} &nbsp;·&nbsp; {event.location}
          </p>
        </Reveal>
        <Reveal delay={80}>
          <h3 className="display mt-5 text-3xl leading-[0.98] sm:text-4xl md:text-5xl">
            {event.title}
          </h3>
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
            {event.description}
          </p>
        </Reveal>
        <Reveal delay={240}>
          <a
            href="#contact"
            className="label-xs link-underline mt-8 inline-block"
          >
            {event.cta} &nbsp;&rarr;
          </a>
        </Reveal>
      </div>
    </article>
  );
}

function EventsPage() {
  return (
    <main className="relative z-10 bg-background">
      <SiteHeader />
      <EventsHero />

      <section className="px-6 py-28 md:px-12 md:py-44">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <Reveal>
              <LogoMark className="mx-auto mb-8" />
            </Reveal>
            <Reveal delay={80}>
              <p className="label-xs text-muted-foreground">Upcoming</p>
            </Reveal>
            <Reveal delay={140}>
              <h2 className="display mx-auto mt-6 max-w-2xl text-[2.5rem] leading-[0.95] sm:text-5xl md:text-6xl">
                Experiences worth dressing for.
              </h2>
            </Reveal>
          </div>

          <div className="mt-20 flex flex-col gap-24 md:mt-32 md:gap-40">
            {UPCOMING_EVENTS.map((event, i) => (
              <EventCard key={event.title} event={event} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border px-6 py-28 md:px-12 md:py-44">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <Reveal>
              <p className="label-xs text-muted-foreground">Archive</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="display mx-auto mt-6 max-w-2xl text-[2.5rem] leading-[0.95] sm:text-5xl md:text-6xl">
                Past moments.
              </h2>
            </Reveal>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 md:mt-24 md:gap-12">
            {PAST_EVENTS.map((event, i) => (
              <Reveal key={event.title} delay={i * 120}>
                <article className="group">
                  <div className="overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      loading="lazy"
                      className="aspect-[4/5] w-full object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                    />
                  </div>
                  <p className="label-xs mt-6 text-muted-foreground">
                    {event.date} &nbsp;·&nbsp; {event.location}
                  </p>
                  <h3 className="display mt-3 text-2xl leading-[1] md:text-3xl">
                    {event.title}
                  </h3>
                  <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
                    {event.description}
                  </p>
                  <a
                    href="#contact"
                    className="label-xs link-underline mt-6 inline-block"
                  >
                    {event.cta} &nbsp;&rarr;
                  </a>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="bg-charcoal px-6 py-28 text-ivory md:px-12 md:py-44"
      >
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <p className="label-xs opacity-70">Host with us</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="display mt-6 text-[2.5rem] leading-[0.95] sm:text-5xl md:text-7xl">
              Want Balance Design at your event?
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mx-auto mt-8 max-w-xl text-sm leading-relaxed opacity-80 md:text-base">
              From corporate styling workshops to fashion experiences, we craft sessions that feel
              cinematic, considered and completely yours.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <a
              href="mailto:hello@balancedesign.in"
              className="btn-red label-xs mt-10 inline-block"
            >
              Get in touch
            </a>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

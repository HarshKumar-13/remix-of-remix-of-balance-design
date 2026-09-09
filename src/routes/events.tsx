import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";

import { LogoMark } from "@/components/LogoMark";
import { Reveal } from "@/components/Reveal";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { BookingModal } from "@/components/events/BookingModal";
import {
  EVENTS_MEDIA,
  PAST_EVENTS,
  UPCOMING_EVENTS,
  type UpcomingEvent,
} from "@/data/events";
import heroImg from "@/assets/hero.jpg";
import introImg from "@/assets/about.jpg";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events — Balance Design & Fashion Consultancy" },
      {
        name: "description",
        content:
          "Fashion shows, styling sessions, seminars and professional image workshops by Balance Design & Fashion Consultancy.",
      },
      { property: "og:title", content: "Events — Balance Design & Fashion Consultancy" },
      {
        property: "og:description",
        content:
          "Fashion shows, styling sessions, seminars and image workshops by Balance Design & Fashion Consultancy.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EventsPage,
});

/* ---------- motion helpers (local to this page) ---------- */

function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/** Editorial clip-path image reveal with slow scale settle. */
function ClipImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  delay = 0,
  parallax = 0,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  delay?: number;
  parallax?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.12);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (!parallax) return;
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const mid = rect.top + rect.height / 2 - window.innerHeight / 2;
      setOffset(-mid * parallax);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [parallax, ref]);

  return (
    <div
      ref={ref}
      className={`overflow-hidden ${className}`}
      style={{
        clipPath: inView ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)",
        transition: `clip-path 1.4s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`h-full w-full object-cover ${imgClassName}`}
        style={{
          transform: `translate3d(0, ${offset}px, 0) scale(${inView ? 1.02 : 1.16})`,
          transition: `transform 2.2s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        }}
      />
    </div>
  );
}

/** Gentle typography slide (used sparingly, not on every element). */
function SlideIn({
  children,
  delay = 0,
  from = "left",
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  from?: "left" | "right";
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView
          ? "none"
          : `translate3d(${from === "left" ? "-28px" : "28px"}, 0, 0)`,
        transition: `opacity 1.1s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 1.1s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ---------- sections ---------- */

function EventsHero() {
  const [y, setY] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 120);
    const onScroll = () => setY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section className="relative flex h-[86svh] min-h-[520px] items-end overflow-hidden bg-charcoal">
      <img
        src={heroImg}
        alt="Editorial fashion event staged by Balance Design"
        className="absolute inset-0 h-[118%] w-full object-cover"
        style={{
          transform: `translate3d(0, ${y * 0.16}px, 0) scale(${loaded ? 1.06 : 1.18})`,
          transition: "transform 2.6s cubic-bezier(0.16,1,0.3,1)",
        }}
      />
      <div className="absolute inset-0 bg-charcoal/45" />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-charcoal/85 via-charcoal/25 to-transparent" />

      <div
        className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 text-ivory md:px-12 md:pb-24"
        style={{ transform: `translate3d(0, ${y * -0.05}px, 0)` }}
      >
        <h1
          className="display text-[4.5rem] leading-[0.88] sm:text-[8rem] md:text-[11rem]"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "none" : "translateY(48px)",
            transition:
              "opacity 1.5s cubic-bezier(0.16,1,0.3,1) 150ms, transform 1.5s cubic-bezier(0.16,1,0.3,1) 150ms",
          }}
        >
          Events
        </h1>
        <p
          className="label-xs mt-6 opacity-80"
          style={{
            opacity: loaded ? 0.8 : 0,
            transform: loaded ? "none" : "translateY(20px)",
            transition:
              "opacity 1.1s cubic-bezier(0.16,1,0.3,1) 600ms, transform 1.1s cubic-bezier(0.16,1,0.3,1) 600ms",
          }}
        >
          Fashion. Image. Experience.
        </p>
      </div>
    </section>
  );
}

function Introduction() {
  return (
    <section className="px-6 py-24 md:px-12 md:py-40">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-end gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-7">
          <Reveal>
            <LogoMark className="mb-8 md:mx-0" />
          </Reveal>
          <SlideIn delay={60}>
            <h2 className="display text-[2.75rem] leading-[0.94] sm:text-6xl md:text-[5.25rem]">
              Where ideas meet experience.
            </h2>
          </SlideIn>
          <SlideIn delay={200}>
            <p className="mt-10 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
              From fashion shows and styling sessions to seminars and professional image
              workshops, Balance creates experiences that bring image, identity and impact into
              focus.
            </p>
          </SlideIn>
        </div>
        <div className="md:col-span-5 md:pl-8">
          <ClipImage
            src={introImg}
            alt="Styling session in progress at a Balance Design workshop"
            className="h-[46vh] w-full md:h-[62vh]"
            parallax={0.05}
          />
        </div>
      </div>
    </section>
  );
}

function UpcomingRow({
  event,
  index,
  onBook,
}: {
  event: UpcomingEvent;
  index: number;
  onBook: (e: UpcomingEvent) => void;
}) {
  const flipped = index % 2 === 1;
  const heights = ["md:h-[76vh]", "md:h-[58vh]", "md:h-[68vh]"];
  const spans = ["md:col-span-7", "md:col-span-6", "md:col-span-7"];

  return (
    <article className="group grid grid-cols-1 items-center gap-8 md:grid-cols-12 md:gap-14">
      <div
        className={`${spans[index % 3]} ${flipped ? "md:order-2 md:col-start-6" : ""}`}
      >
        <ClipImage
          src={event.image}
          alt={event.title}
          className={`h-[52vh] w-full ${heights[index % 3]}`}
          imgClassName="transition-transform duration-[1800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
          parallax={0.045}
        />
      </div>

      <div
        className={`md:col-span-4 ${flipped ? "md:order-1 md:col-start-2" : "md:col-start-9"}`}
      >
        <SlideIn from={flipped ? "right" : "left"}>
          <p className="label-xs text-red">{event.type}</p>
        </SlideIn>
        <SlideIn delay={80} from={flipped ? "right" : "left"}>
          <h3 className="display mt-5 text-[2rem] leading-[0.98] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 sm:text-4xl md:text-[3.25rem]">
            {event.title}
          </h3>
        </SlideIn>
        <SlideIn delay={160} from={flipped ? "right" : "left"}>
          <p className="label-xs mt-6 text-muted-foreground">
            {event.date} &nbsp;·&nbsp; {event.location}
          </p>
        </SlideIn>
        <SlideIn delay={220} from={flipped ? "right" : "left"}>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
            {event.description}
          </p>
        </SlideIn>
        <SlideIn delay={280} from={flipped ? "right" : "left"}>
          <button
            onClick={() => onBook(event)}
            className="label-xs link-underline mt-9 inline-block text-foreground transition-colors duration-500 hover:text-red"
          >
            {event.cta} &nbsp;&rarr;
          </button>
        </SlideIn>
      </div>
    </article>
  );
}

function PastGrid() {
  return (
    <div className="grid grid-cols-1 gap-x-10 gap-y-20 sm:grid-cols-2 md:gap-x-16 md:gap-y-28">
      {PAST_EVENTS.map((event, i) => (
        <article key={event.id} className={`group ${i % 2 === 1 ? "sm:mt-24" : ""}`}>
          <ClipImage
            src={event.image}
            alt={event.title}
            delay={i * 60}
            className="aspect-[4/5] w-full"
            imgClassName="transition-transform duration-[1800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
          />
          <p className="label-xs mt-7 text-red">{event.type}</p>
          <h3 className="display mt-4 text-2xl leading-[1] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 md:text-[2.25rem]">
            {event.title}
          </h3>
          <p className="label-xs mt-4 text-muted-foreground">
            {event.year} &nbsp;·&nbsp; {event.location}
          </p>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {event.description}
          </p>
        </article>
      ))}
    </div>
  );
}

function EventsTabs({ onBook }: { onBook: (e: UpcomingEvent) => void }) {
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");

  return (
    <section className="border-t border-border px-6 py-24 md:px-12 md:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap gap-8 border-b border-border pb-5 md:gap-14">
          {(
            [
              ["upcoming", "Upcoming Events"],
              ["past", "Past Events"],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className="label-xs relative pb-2 transition-colors duration-500"
              style={{ color: tab === key ? "var(--red)" : "var(--muted-foreground)" }}
            >
              {label}
              <span
                className="absolute -bottom-[21px] left-0 h-[2px] w-full bg-red origin-left"
                style={{
                  transform: `scaleX(${tab === key ? 1 : 0})`,
                  transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1)",
                }}
              />
            </button>
          ))}
        </div>

        <div
          key={tab}
          className="mt-20 md:mt-32"
          style={{
            animation: "eventsTabIn 0.9s cubic-bezier(0.16,1,0.3,1) both",
          }}
        >
          {tab === "upcoming" ? (
            <div className="flex flex-col gap-24 md:gap-40">
              {UPCOMING_EVENTS.map((event, i) => (
                <UpcomingRow key={event.id} event={event} index={i} onBook={onBook} />
              ))}
            </div>
          ) : (
            <PastGrid />
          )}
        </div>
      </div>

      <style>{`
        @keyframes eventsTabIn {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes eventsTabIn { from { opacity: 1; } to { opacity: 1; } }
        }
      `}</style>
    </section>
  );
}

function FeaturedShow() {
  return (
    <section className="relative overflow-hidden bg-charcoal text-ivory">
      <ClipImage
        src={EVENTS_MEDIA.featuredShow}
        alt="Runway presentation staged by Balance Design"
        className="h-[80svh] min-h-[460px] w-full opacity-70"
        parallax={0.06}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/30 to-charcoal/40" />
      <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-6 pb-16 md:px-12 md:pb-24">
        <SlideIn>
          <h2 className="display text-[2.75rem] leading-[0.94] sm:text-6xl md:text-[6rem]">
            Fashion Shows
          </h2>
        </SlideIn>
        <SlideIn delay={140}>
          <p className="mt-8 max-w-xl text-sm leading-relaxed opacity-80 md:text-base">
            From concept and styling to presentation, fashion becomes an experience when every
            detail speaks the same language.
          </p>
        </SlideIn>
        <SlideIn delay={220}>
          <a href="#events-list" className="label-xs link-underline mt-10 inline-block">
            Explore events &nbsp;&rarr;
          </a>
        </SlideIn>
      </div>
    </section>
  );
}

function SeminarsSection() {
  return (
    <section className="px-6 py-24 md:px-12 md:py-40">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-7">
          <ClipImage
            src={EVENTS_MEDIA.seminarPrimary}
            alt="Professional image workshop led by Balance Design"
            className="h-[52vh] w-full md:h-[76vh]"
            parallax={0.05}
          />
        </div>
        <div className="md:col-span-5 md:pt-16">
          <SlideIn from="right">
            <h2 className="display text-[2.5rem] leading-[0.95] sm:text-5xl md:text-[4rem]">
              Seminars &amp; Workshops
            </h2>
          </SlideIn>
          <SlideIn delay={140} from="right">
            <p className="mt-8 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
              Explore colour, design, wardrobe, styling and professional presentation through
              thoughtfully designed sessions for individuals and organisations.
            </p>
          </SlideIn>
          <div className="mt-12 md:pr-10">
            <ClipImage
              src={EVENTS_MEDIA.seminarSecondary}
              alt="Colour and wardrobe study from a Balance Design session"
              className="h-[30vh] w-full md:h-[36vh]"
              delay={120}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="bg-red px-6 py-24 text-white md:px-12 md:py-40">
      <div className="mx-auto max-w-4xl text-center">
        <SlideIn>
          <h2 className="display text-[2.5rem] leading-[0.95] sm:text-5xl md:text-[4.5rem]">
            Let&rsquo;s create a stronger presence.
          </h2>
        </SlideIn>
        <Reveal delay={140}>
          <p className="mx-auto mt-8 max-w-xl text-sm leading-relaxed opacity-90 md:text-base">
            Planning a fashion show, seminar or image-focused experience?
          </p>
        </Reveal>
        <Reveal delay={220}>
          <a
            href="/#contact"
            className="label-xs mt-10 inline-block border border-white px-8 py-4 transition-colors duration-500 hover:bg-white hover:text-red"
          >
            Contact us
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function EventsPage() {
  const [booking, setBooking] = useState<UpcomingEvent | null>(null);

  return (
    <main className="relative z-10 bg-background">
      <SiteHeader />
      <EventsHero />
      <Introduction />
      <div id="events-list">
        <EventsTabs onBook={setBooking} />
      </div>
      <FeaturedShow />
      <SeminarsSection />
      <FinalCta />
      <SiteFooter />
      <BookingModal event={booking} onClose={() => setBooking(null)} />
    </main>
  );
}

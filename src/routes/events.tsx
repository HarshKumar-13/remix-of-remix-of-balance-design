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
    <section className="px-6 pt-12 pb-24 md:px-12 md:pt-16 md:pb-40">
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
            <p className="mt-10 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
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

/* ---------- card carousel ---------- */

function CarouselArrow({
  direction,
  onClick,
  disabled,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      aria-label={direction === "prev" ? "Previous events" : "Next events"}
      onClick={onClick}
      disabled={disabled}
      className="group flex h-12 w-12 items-center justify-center rounded-full border border-border transition-all duration-500 hover:border-red hover:bg-red disabled:cursor-not-allowed disabled:opacity-30"
    >
      <span
        className="inline-block text-lg leading-none text-foreground transition-all duration-500 group-hover:text-primary-foreground"
        style={{ transform: direction === "prev" ? "scaleX(-1)" : "none" }}
      >
        &rarr;
      </span>
    </button>
  );
}

function useCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = () => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 8);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8);
  };

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.7;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return { trackRef, atStart, atEnd, update, scrollBy };
}

const cardReveal = (i: number) => ({
  animation: `eventsTabIn 0.9s cubic-bezier(0.16,1,0.3,1) ${i * 90}ms both`,
});

function UpcomingCard({
  event,
  index,
  onBook,
}: {
  event: UpcomingEvent;
  index: number;
  onBook: (e: UpcomingEvent) => void;
}) {
  return (
    <article
      data-card
      style={cardReveal(index)}
      className="group w-[82vw] shrink-0 snap-start overflow-hidden border border-border bg-card sm:w-[420px]"
    >
      <div className="relative h-[46vh] max-h-[380px] min-h-[260px] overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
        />
        <span className="label-xs absolute left-5 top-5 bg-background/90 px-3 py-2 text-red backdrop-blur-sm">
          {event.type}
        </span>
      </div>
      <div className="p-6 md:p-8">
        <h3 className="display text-2xl leading-[1.02] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 md:text-[1.9rem]">
          {event.title}
        </h3>
        <p className="label-xs mt-4 text-muted-foreground">
          {event.date} &nbsp;·&nbsp; {event.location}
        </p>
        <p className="mt-4 line-clamp-3 text-lg leading-relaxed text-muted-foreground">
          {event.description}
        </p>
        <button
          onClick={() => onBook(event)}
          className="label-xs link-underline mt-7 inline-block text-foreground transition-colors duration-500 hover:text-red"
        >
          {event.cta} &nbsp;&rarr;
        </button>
      </div>
    </article>
  );
}

function PastCard({ event, index }: { event: (typeof PAST_EVENTS)[number]; index: number }) {
  return (
    <article
      style={cardReveal(index % 3)}
      className="group overflow-hidden border border-border bg-card"
    >
      <div className="relative h-[46vh] max-h-[340px] min-h-[240px] overflow-hidden">
        {event.images ? (
          <CardSlides images={event.images} alt={event.title} />
        ) : (
          <img
            src={event.image}
            alt={event.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
          />
        )}
      </div>
      <div className="p-6 md:p-8">
        {event.type && <p className="label-xs mb-4 text-red">{event.type}</p>}
        <h3 className="display text-2xl leading-[1.02] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 md:text-[1.9rem]">
          {event.title}
        </h3>
        {event.date && <p className="label-xs mt-4 text-muted-foreground">{event.date}</p>}
      </div>
    </article>
  );
}

function CardSlides({ images, alt }: { images: string[]; alt: string }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % images.length), 3000);
    return () => clearInterval(t);
  }, [images.length]);
  return (
    <>
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={alt}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ opacity: i === idx ? 1 : 0, transition: "opacity 1.2s ease" }}
        />
      ))}
    </>
  );
}

function PastGrid() {
  return (
    <div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PAST_EVENTS.map((event, i) => (
          <PastCard key={event.id} event={event} index={i} />
        ))}
      </div>
    </div>
  );
}

function UpcomingCarousel({ onBook }: { onBook: (e: UpcomingEvent) => void }) {
  const { trackRef, atStart, atEnd, update, scrollBy } = useCarousel();
  return (
    <div>
      <div className="mb-8 flex items-center justify-between gap-6">
        <span aria-hidden="true" />
        <div className="flex gap-3">
          <CarouselArrow direction="prev" onClick={() => scrollBy(-1)} disabled={atStart} />
          <CarouselArrow direction="next" onClick={() => scrollBy(1)} disabled={atEnd} />
        </div>
      </div>
      <div
        ref={trackRef}
        onScroll={update}
        className="-mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:-mx-12 md:px-12"
      >
        {UPCOMING_EVENTS.map((event, i) => (
          <UpcomingCard key={event.id} event={event} index={i} onBook={onBook} />
        ))}
      </div>
    </div>
  );
}

function EventsTabs({ onBook }: { onBook: (e: UpcomingEvent) => void }) {
  const [tab, setTab] = useState<"upcoming" | "past">("past");

  return (
    <section className="border-t border-border px-6 py-16 md:px-12 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap gap-8 border-b border-border pb-5 md:gap-14">
          {(
            [
              ["past", "Past Events"],
              ["upcoming", "Upcoming Events"],
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
          className="mt-12 md:mt-16"
          style={{
            animation: "eventsTabIn 0.9s cubic-bezier(0.16,1,0.3,1) both",
          }}
        >
          {tab === "upcoming" ? (
            <UpcomingCarousel onBook={onBook} />
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

function CyclingFrame({ images, alt, className = "" }: { images: string[]; alt: string; className?: string }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % images.length), 3000);
    return () => clearInterval(t);
  }, [images.length]);
  return (
    <Reveal>
      <div className={`relative overflow-hidden ${className}`}>
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={alt}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              opacity: i === idx ? 1 : 0,
              transform: `scale(${i === idx ? 1.02 : 1.08})`,
              transition: "opacity 1.2s ease, transform 3.5s cubic-bezier(0.16,1,0.3,1)",
            }}
          />
        ))}
      </div>
    </Reveal>
  );
}

function SeminarsSection() {
  return (
    <section className="px-6 py-24 md:px-12 md:py-40">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-7">
          <CyclingFrame
            images={EVENTS_MEDIA.seminarGallery}
            alt="Professional image workshop led by Balance Design"
            className="h-[52vh] w-full md:h-[76vh]"
          />
        </div>
        <div className="md:col-span-5 md:grid md:h-full md:grid-rows-[1fr_auto_1fr] md:self-stretch">
          <div aria-hidden className="hidden md:block" />
          <div className="md:row-start-2">
            <SlideIn from="right">
              <h2 className="display text-[2.5rem] leading-[0.95] sm:text-5xl md:text-[4rem]">
                Seminars &amp; Workshops
              </h2>
            </SlideIn>
            <SlideIn delay={140} from="right">
              <p className="mt-8 max-w-md text-lg leading-relaxed text-muted-foreground md:text-xl">
                Explore colour, design, wardrobe, styling and professional presentation through
                thoughtfully designed sessions for individuals and organisations.
              </p>
            </SlideIn>
          </div>
          <div className="mt-12 md:row-start-3 md:mt-8 md:flex md:items-end md:pr-10">
            <ClipImage
              src={EVENTS_MEDIA.seminarSecondary}
              alt="Colour and wardrobe study from a Balance Design session"
              className="h-[30vh] w-full md:h-[18vh]"
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
          <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed opacity-90 md:text-xl">
            Planning a seminar or image-focused experience?
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
    <main>
      <div className="relative z-10 bg-background">
        <SiteHeader />
        <EventsHero />
        <Introduction />
        <div id="events-list">
          <EventsTabs onBook={setBooking} />
        </div>
        <SeminarsSection />
        <FinalCta />
      </div>
      <SiteFooter />
      <BookingModal event={booking} onClose={() => setBooking(null)} />
    </main>

  );
}

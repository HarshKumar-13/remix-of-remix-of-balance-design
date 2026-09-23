import { useCallback, useEffect, useRef, useState } from "react";

import spotlightVideo from "@/assets/own-your-spotlight.webm.asset.json";
import posterOne from "@/assets/styling-workshop-session-1.jpeg.asset.json";
import posterTwo from "@/assets/corporate-raymond-presentation.jpg.asset.json";
import posterThree from "@/assets/personal-workshop.png.asset.json";
import posterFour from "@/assets/styling-workshop-group-1.jpeg.asset.json";

import { LogoMark } from "./LogoMark";
import { Reveal } from "./Reveal";

type VideoTestimonial = {
  id: string;
  name: string;
  role: string;
  /** Replace with the final testimonial video URL. */
  video: string;
  poster: string;
};

// Placeholder media — swap `video` / `poster` for the approved testimonial films.
const TESTIMONIALS: VideoTestimonial[] = [
  {
    id: "ananya",
    name: "Ananya Mehta",
    role: "People Director, Meridian Group",
    video: spotlightVideo.url,
    poster: posterOne.url,
  },
  {
    id: "rohan",
    name: "Rohan Kapoor",
    role: "Brand Lead, North & Co.",
    video: spotlightVideo.url,
    poster: posterTwo.url,
  },
  {
    id: "mira",
    name: "Mira Shah",
    role: "Creative Head, Atelier Nine",
    video: spotlightVideo.url,
    poster: posterThree.url,
  },
  {
    id: "devika",
    name: "Devika Rao",
    role: "Head of Design, Studio Lumen",
    video: spotlightVideo.url,
    poster: posterFour.url,
  },
];

const AUTO_ADVANCE_MS = 9000;
const COUNT = TESTIMONIALS.length;

function offsetFrom(index: number, active: number) {
  let diff = index - active;
  if (diff > COUNT / 2) diff -= COUNT;
  if (diff < -COUNT / 2) diff += COUNT;
  return diff;
}

export function Testimonials() {
  const [active, setActive] = useState(0);
  const [timerKey, setTimerKey] = useState(0);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const drag = useRef<{ x: number; active: boolean }>({ x: 0, active: false });

  const go = useCallback((dir: number) => {
    setActive((v) => (v + dir + COUNT) % COUNT);
    setTimerKey((k) => k + 1);
  }, []);

  const select = useCallback((index: number) => {
    setActive(index);
    setTimerKey((k) => k + 1);
  }, []);

  // Track viewport visibility
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(!!entry && entry.isIntersecting && entry.intersectionRatio > 0.25),
      { threshold: [0, 0.25, 0.5] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Only the active card plays
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index === active && inView) {
        const play = video.play();
        if (play && typeof play.catch === "function") play.catch(() => {});
      } else {
        video.pause();
        if (index !== active) video.currentTime = 0;
      }
    });
  }, [active, inView]);

  // Keep the carousel moving
  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(() => go(1), AUTO_ADVANCE_MS);
    return () => window.clearTimeout(id);
  }, [active, timerKey, inView, go]);

  const onPointerDown = (event: React.PointerEvent) => {
    drag.current = { x: event.clientX, active: true };
  };
  const onPointerUp = (event: React.PointerEvent) => {
    if (!drag.current.active) return;
    const delta = event.clientX - drag.current.x;
    drag.current.active = false;
    if (Math.abs(delta) > 48) go(delta < 0 ? 1 : -1);
  };

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden border-t border-border bg-background py-16 md:py-24"
      aria-roledescription="carousel"
      aria-label="Video testimonials"
    >
      <div className="mx-auto max-w-5xl px-6 md:px-12">
        <Reveal>
          <LogoMark className="mb-8" />
        </Reveal>
      </div>

      <Reveal>
        <div
          className="relative mx-auto flex h-[96vw] max-h-[34rem] min-h-[24rem] touch-pan-y select-none items-center justify-center md:h-[32rem] lg:h-[36rem]"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={() => (drag.current.active = false)}
        >
          {TESTIMONIALS.map((item, index) => {
            const offset = offsetFrom(index, active);
            const isActive = offset === 0;
            const hidden = Math.abs(offset) > 1;
            return (
              <article
                key={item.id}
                aria-hidden={!isActive}
                onClick={() => !isActive && !hidden && select(index)}
                className="absolute top-1/2 left-1/2 w-[58vw] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none sm:w-[46vw] md:w-[min(34vw,20rem)] lg:w-[min(30vw,23rem)]"
                style={{
                  transform: `translate3d(calc(-50% + ${offset * 62}%), -50%, 0) scale(${isActive ? 1 : 0.78})`,
                  opacity: hidden ? 0 : isActive ? 1 : 0.55,
                  zIndex: isActive ? 20 : 10 - Math.abs(offset),
                  pointerEvents: hidden ? "none" : "auto",
                  cursor: isActive ? "default" : "pointer",
                }}
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-[1.75rem] bg-muted shadow-[0_30px_80px_-50px_rgba(0,0,0,0.5)]">
                  <video
                    ref={(el) => {
                      videoRefs.current[index] = el;
                    }}
                    src={item.video}
                    poster={item.poster}
                    muted
                    playsInline
                    preload="metadata"
                    onEnded={() => isActive && go(1)}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div
                  className={`mt-6 text-center transition-opacity duration-700 ${isActive ? "opacity-100" : "opacity-0"}`}
                >
                  <p className="label-xs">{item.name}</p>
                  <p className="mt-2 text-base text-muted-foreground">{item.role}</p>
                </div>
              </article>
            );
          })}

          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={() => go(-1)}
            className="absolute left-4 z-30 text-2xl text-foreground/50 transition-colors hover:text-foreground md:left-10"
          >
            &#8592;
          </button>
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={() => go(1)}
            className="absolute right-4 z-30 text-2xl text-foreground/50 transition-colors hover:text-foreground md:right-10"
          >
            &#8594;
          </button>
        </div>
      </Reveal>
    </section>
  );
}

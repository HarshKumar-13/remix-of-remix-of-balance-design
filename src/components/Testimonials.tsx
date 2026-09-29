import { useCallback, useEffect, useRef, useState } from "react";

import videoOne from "@/assets/testimonial-1.mp4";
import videoTwo from "@/assets/testimonial-2.mp4";
import posterOne from "@/assets/testimonial-1-poster.jpg";
import posterTwo from "@/assets/testimonial-2-poster.jpg";
import videoThree from "@/assets/testimonial-3.mp4";
import videoFour from "@/assets/testimonial-4.mp4";
import posterThree from "@/assets/testimonial-3-poster.jpg";
import posterFour from "@/assets/testimonial-4-poster.jpg";
import { Volume2, VolumeX } from "lucide-react";

import { LogoMark } from "./LogoMark";
import { Reveal } from "./Reveal";

type VideoTestimonial = {
  id: string;
  name: string;
  role: string;
  video: string;
  poster: string;
};

// Two supplied films, repeated so the three-card layout stays full.
const TESTIMONIALS: VideoTestimonial[] = [
  { id: "t1", name: "Ananya Mehta", role: "People Director, Meridian Group", video: videoOne, poster: posterOne },
  { id: "t2", name: "Rohan Kapoor", role: "Brand Lead, North & Co.", video: videoTwo, poster: posterTwo },
  { id: "t3", name: "", role: "", video: videoThree, poster: posterThree },
  { id: "t4", name: "", role: "", video: videoFour, poster: posterFour },
  { id: "t1b", name: "Ananya Mehta", role: "People Director, Meridian Group", video: videoOne, poster: posterOne },
  { id: "t2b", name: "Rohan Kapoor", role: "Brand Lead, North & Co.", video: videoTwo, poster: posterTwo },
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
  const [soundOn, setSoundOn] = useState(true);
  const [reach, setReach] = useState(2);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setReach(mq.matches ? 2 : 1);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
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
        video.muted = !soundOn;
        const play = video.play();
        if (play && typeof play.catch === "function")
          play.catch(() => {
            video.muted = true;
            setSoundOn(false);
            video.play().catch(() => {});
          });
      } else {
        video.pause();
        video.muted = true;
        if (index !== active) video.currentTime = 0;
      }
    });
  }, [active, inView, soundOn]);

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
          <LogoMark className="mb-12 md:mb-16" />
        </Reveal>
      </div>

      <Reveal>
        <div
          className="relative mx-auto flex h-[112vw] max-h-[40rem] min-h-[27rem] w-full touch-pan-y select-none items-center justify-center md:h-[37rem] md:w-[92vw] lg:h-[max(30vw,30rem)] lg:max-h-[38rem] lg:w-[92vw]"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={() => (drag.current.active = false)}
        >
          {TESTIMONIALS.map((item, index) => {
            const offset = offsetFrom(index, active);
            const isActive = offset === 0;
            const dist = Math.abs(offset);
            const hidden = dist > reach;
            const sign = Math.sign(offset);
            // Position (in card widths) and depth per distance from center.
            const POS = reach === 2 ? [0, 0.98, 1.84, 2.5] : [0, 0.92, 1.6, 2.2];
            const SCALE = reach === 2 ? [1, 0.85, 0.72, 0.6] : [1, 0.82, 0.66, 0.6];
            const OPACITY = reach === 2 ? [1, 0.72, 0.42, 0] : [1, 0.68, 0, 0];
            const step = Math.min(dist, 3);
            return (
              <article
                key={item.id}
                aria-hidden={!isActive}
                onClick={() => !isActive && !hidden && select(index)}
                className="absolute top-1/2 left-1/2 w-[64vw] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none sm:w-[52vw] md:w-[min(38vw,23rem)] lg:w-[min(18vw,22rem)]"
                style={{
                  transform: `translate3d(calc(-50% + ${sign * (POS[step] ?? 0) * 100}%), -50%, 0) scale(${SCALE[step] ?? 1})`,
                  opacity: hidden ? 0 : (OPACITY[step] ?? 0),
                  zIndex: 20 - dist,
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
                  {isActive && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSoundOn((v) => !v);
                      }}
                      onPointerDown={(e) => e.stopPropagation()}
                      aria-label={soundOn ? "Mute video" : "Unmute video"}
                      className="absolute bottom-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-charcoal/50 text-ivory backdrop-blur-sm transition-colors hover:bg-charcoal/80"
                    >
                      {soundOn ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
                    </button>
                  )}
                </div>
                <div
                  className={`mt-8 text-center transition-opacity duration-700 ${isActive ? "opacity-100" : "opacity-0"}`}
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
            className="group absolute top-[calc(50%-2rem)] left-2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-foreground/25 text-foreground/70 transition-all duration-300 hover:scale-105 hover:border-foreground hover:bg-foreground hover:text-background md:left-4 lg:left-2"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
          </button>
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={() => go(1)}
            className="group absolute top-[calc(50%-2rem)] right-2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-foreground/25 text-foreground/70 transition-all duration-300 hover:scale-105 hover:border-foreground hover:bg-foreground hover:text-background md:right-4 lg:right-2"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </Reveal>
    </section>
  );
}

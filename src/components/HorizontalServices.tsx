import { useEffect, useRef, useState } from "react";

import { ServiceChapter } from "./ServiceChapter";
import type { Slide } from "./EditorialCarousel";

export type ServiceChapterData = {
  label: string;
  headline: string;
  description: string;
  cta: string;
  slides: Slide[];
};

/**
 * Desktop-only scroll-driven horizontal experience for the Services chapters.
 * The section is pinned (sticky) while vertical scroll progress translates the
 * chapter track right-to-left. On mobile (and with reduced motion) the
 * original stacked layout is rendered instead.
 */
export function HorizontalServices({ chapters }: { chapters: ServiceChapterData[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef(0);
  const currentRef = useRef(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [maxShift, setMaxShift] = useState(0);

  // Detect viewport + motion preference
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setIsDesktop(mq.matches);
      setReducedMotion(rm.matches);
    };
    update();
    mq.addEventListener("change", update);
    rm.addEventListener("change", update);
    return () => {
      mq.removeEventListener("change", update);
      rm.removeEventListener("change", update);
    };
  }, []);

  const active = isDesktop && !reducedMotion;

  // Measure how far the track must travel
  useEffect(() => {
    if (!active) return;
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      setMaxShift(Math.max(0, track.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    const t = window.setTimeout(measure, 500); // after images settle
    return () => {
      window.removeEventListener("resize", measure);
      window.clearTimeout(t);
    };
  }, [active, chapters.length]);

  // Scroll -> target progress; rAF loop lerps toward it for buttery motion
  useEffect(() => {
    if (!active) return;

    let raf = 0;
    const onScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const scrollable = section.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const progressed = Math.min(Math.max(-rect.top, 0), scrollable);
      targetRef.current = (progressed / scrollable) * maxShift;
    };

    const tick = () => {
      const track = trackRef.current;
      if (track) {
        // Ease toward target for a smooth, cinematic feel
        currentRef.current += (targetRef.current - currentRef.current) * 0.075;
        if (Math.abs(targetRef.current - currentRef.current) < 0.1) {
          currentRef.current = targetRef.current;
        }
        track.style.transform = `translate3d(${-currentRef.current}px, 0, 0)`;
      }
      raf = window.requestAnimationFrame(tick);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    raf = window.requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.cancelAnimationFrame(raf);
    };
  }, [active, maxShift]);

  // Mobile / reduced motion: original stacked layout, untouched
  if (!active) {
    return (
      <>
        {chapters.map((c) => (
          <ServiceChapter key={c.label} {...c} />
        ))}
      </>
    );
  }

  return (
    <div
      ref={sectionRef}
      className="relative"
      style={{ height: `calc(100vh + ${maxShift * 1.15}px)` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div
          ref={trackRef}
          className="flex h-full items-stretch will-change-transform"
        >
          {chapters.map((c) => (
            <div
              key={c.label}
              className="flex h-full w-screen shrink-0 items-center justify-center overflow-hidden [&_.carousel-slide]:md:h-[46vh] [&>section>div:last-child]:mt-8 [&>section]:py-4 [&_a]:mt-6 [&_h2]:mt-4 [&_p]:mt-4 [&_img[alt='Balance_Design_diamond_mark']]:hidden"
            >
              <div className="w-full min-w-0">
                <ServiceChapter {...c} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

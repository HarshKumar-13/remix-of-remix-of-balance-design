import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

export type Slide = { src: string; alt: string };

export function EditorialCarousel({ slides, tall = false }: { slides: Slide[]; tall?: boolean }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const drag = useRef<{ x: number; left: number; active: boolean; moved: boolean }>({
    x: 0,
    left: 0,
    active: false,
    moved: false,
  });
  const autoScrollRef = useRef<number | null>(null);

  const scrollToIndex = useCallback((i: number, behavior: ScrollBehavior = "smooth") => {
    const el = trackRef.current;
    if (!el) return;
    const children = Array.from(el.children) as HTMLElement[];
    const target = children[i];
    if (!target) return;
    const gap = parseInt(getComputedStyle(el).gap || "0", 10) || 0;
    const targetLeft = target.offsetLeft - gap / 2;
    el.scrollTo({ left: targetLeft, behavior });
  }, []);

  // Continuous, scroll-position-driven panel motion: every panel is placed on
  // one shared visual sequence so the panel leaving the frame hands over to the
  // next one without a discrete slide change.
  const paint = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const children = Array.from(el.children) as HTMLElement[];
    const center = el.scrollLeft + el.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    children.forEach((c, i) => {
      const cCenter = c.offsetLeft + c.offsetWidth / 2;
      const d = Math.abs(cCenter - center);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
      if (reduce) {
        c.style.transform = "";
        c.style.opacity = "";
        return;
      }
      const p = Math.max(-1.6, Math.min(1.6, (cCenter - center) / c.offsetWidth));
      const abs = Math.abs(p);
      c.style.transform = `translate3d(${(-p * 26).toFixed(2)}px, 0, 0) scale(${(1 - Math.min(abs, 1) * 0.055).toFixed(4)})`;
      c.style.opacity = (1 - Math.min(abs, 1) * 0.32).toFixed(3);
      const img = c.querySelector("img");
      if (img) img.style.setProperty("--panel-shift", `${(p * 5).toFixed(2)}%`);
    });
    if (!isDragging) setIndex(best);
  }, [isDragging]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        paint();
      });
    };
    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [paint]);

  useEffect(() => {
    if (isDragging || slides.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    autoScrollRef.current = window.setInterval(() => {
      const next = (index + 1) % slides.length;
      scrollToIndex(next);
    }, 5200);
    return () => {
      if (autoScrollRef.current) window.clearInterval(autoScrollRef.current);
    };
  }, [index, isDragging, slides.length, scrollToIndex]);

  const handlePointerDown = (e: React.PointerEvent) => {
    const el = trackRef.current;
    if (!el) return;
    drag.current = { x: e.clientX, left: el.scrollLeft, active: true, moved: false };
    setIsDragging(true);
    el.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!drag.current.active) return;
    const el = trackRef.current;
    if (!el) return;
    const dx = e.clientX - drag.current.x;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    el.scrollLeft = drag.current.left - dx;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    const el = trackRef.current;
    if (!el) return;
    drag.current.active = false;
    setIsDragging(false);
    el.releasePointerCapture(e.pointerId);

    if (drag.current.moved) {
      const children = Array.from(el.children) as HTMLElement[];
      const center = el.scrollLeft + el.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      children.forEach((c, i) => {
        const d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - center);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      scrollToIndex(best);
    }
  };

  const handlePointerCancel = (e: React.PointerEvent) => {
    drag.current.active = false;
    setIsDragging(false);
    const el = trackRef.current;
    if (el) el.releasePointerCapture(e.pointerId);
  };

  const move = (direction: -1 | 1) => {
    const next = (index + direction + slides.length) % slides.length;
    setIndex(next);
    scrollToIndex(next);
  };

  return (
    <div className="relative w-full">
      <div
        ref={trackRef}
        className="no-scrollbar flex w-full snap-x snap-mandatory gap-3 overflow-x-auto px-6 md:gap-5 md:px-12"
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
      >
        {slides.map((s, i) => (
          <figure
            key={s.src}
            className={`panel-slide group relative shrink-0 snap-center overflow-hidden ${
              tall
                ? "h-[62vh] w-[88vw] md:h-[82vh] md:w-[78vw]"
                : "h-[46vh] w-[86vw] md:h-[70vh] md:w-[68vw]"
            }`}
          >
            <img
              src={s.src}
              alt={s.alt}
              loading="lazy"
              width={1600}
              height={1000}
              draggable={false}
              className="h-full w-full select-none object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
            />
            <figcaption className="sr-only">{`Slide ${i + 1}`}</figcaption>
          </figure>
        ))}
      </div>
      {slides.length > 1 && (
        <div className="pointer-events-none absolute inset-x-0 top-1/2 z-10 flex -translate-y-1/2 justify-between px-3 md:px-7">
          <button
            type="button"
            aria-label="Previous image"
            onClick={() => move(-1)}
            className="pointer-events-auto grid h-12 w-12 place-items-center border border-ivory/50 bg-charcoal/75 text-ivory backdrop-blur-sm transition-colors duration-500 hover:bg-charcoal focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-ivory"
          >
            <ArrowLeft aria-hidden="true" size={20} strokeWidth={1.5} />
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={() => move(1)}
            className="pointer-events-auto grid h-12 w-12 place-items-center border border-ivory/50 bg-charcoal/75 text-ivory backdrop-blur-sm transition-colors duration-500 hover:bg-charcoal focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-ivory"
          >
            <ArrowRight aria-hidden="true" size={20} strokeWidth={1.5} />
          </button>
        </div>
      )}
    </div>
  );
}

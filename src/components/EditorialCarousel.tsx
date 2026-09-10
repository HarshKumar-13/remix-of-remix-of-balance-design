import { useCallback, useEffect, useRef, useState } from "react";

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

  const onScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el || isDragging) return;
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
    setIndex(best);
  }, [isDragging]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [onScroll]);

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
            className={`carousel-slide group relative shrink-0 snap-center overflow-hidden ${
              i === index ? "carousel-slide-active" : "carousel-slide-inactive"
            } ${
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

    </div>
  );
}

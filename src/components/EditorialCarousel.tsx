import { useCallback, useEffect, useRef, useState } from "react";

export type Slide = { src: string; alt: string };

export function EditorialCarousel({ slides, tall = false }: { slides: Slide[]; tall?: boolean }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const drag = useRef<{ x: number; left: number; active: boolean }>({
    x: 0,
    left: 0,
    active: false,
  });
  const autoScrollRef = useRef<number | null>(null);

  const scrollToIndex = useCallback((i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const children = Array.from(el.children) as HTMLElement[];
    const target = children[i];
    if (!target) return;
    el.scrollTo({ left: target.offsetLeft - 24, behavior: "smooth" });
  }, []);

  const onScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
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
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  useEffect(() => {
    if (isDragging) return;
    autoScrollRef.current = window.setInterval(() => {
      const next = (index + 1) % slides.length;
      scrollToIndex(next);
    }, 5000);
    return () => {
      if (autoScrollRef.current) window.clearInterval(autoScrollRef.current);
    };
  }, [index, isDragging, slides.length, scrollToIndex]);

  const go = (dir: -1 | 1) => {
    const next = (index + dir + slides.length) % slides.length;
    scrollToIndex(next);
  };


  return (
    <div className="relative w-full">
      <div
        ref={trackRef}
        className="no-scrollbar flex w-full snap-x snap-mandatory gap-4 overflow-x-auto px-6 md:gap-6 md:px-12"
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
        onPointerDown={(e) => {
          const el = trackRef.current!;
          drag.current = { x: e.clientX, left: el.scrollLeft, active: true };
          setIsDragging(true);
          el.setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          if (!drag.current.active) return;
          const el = trackRef.current!;
          el.scrollLeft = drag.current.left - (e.clientX - drag.current.x);
        }}
        onPointerUp={() => {
          drag.current.active = false;
          setIsDragging(false);
        }}
        onPointerCancel={() => {
          drag.current.active = false;
          setIsDragging(false);
        }}
      >
        {slides.map((s, i) => (
          <figure
            key={s.src}
            className={`group relative shrink-0 snap-center overflow-hidden ${
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

      <div className="mt-6 flex items-center justify-end px-6 md:px-12">
        <div className="flex items-center gap-8">
          <button
            aria-label="Previous image"
            onClick={() => go(-1)}
            className="label-xs transition-opacity duration-500 hover:opacity-40"
          >
            &larr; Prev
          </button>
          <button
            aria-label="Next image"
            onClick={() => go(1)}
            className="label-xs transition-opacity duration-500 hover:opacity-40"
          >
            Next &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}

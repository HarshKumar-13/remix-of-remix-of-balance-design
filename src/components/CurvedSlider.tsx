import { useEffect, useState } from "react";

export type CurvedImage = { src: string; alt: string };

/** Convex, auto-advancing image row (one step every 2s). Hover gently enlarges an image. */
export function CurvedSlider({ images }: { images: CurvedImage[]; contain?: boolean }) {
  const [offset, setOffset] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  // Cloned slides (3 copies) so the wrap-around happens far off-screen — seamless loop.
  const slides = [...images, ...images, ...images];
  const n = slides.length;
  const half = Math.floor(n / 2);
  const VISIBLE = 4;

  useEffect(() => {
    if (hovered !== null) return;
    const id = window.setInterval(() => setOffset((o) => o + 1), 2000);
    return () => window.clearInterval(id);
  }, [hovered]);

  return (
    <div
      className="relative mx-auto h-[340px] w-full gap-[var(--slide-gap)] overflow-hidden [--slide-gap:16px] sm:h-[430px] sm:[--slide-gap:24px] md:h-[520px] md:[--slide-gap:28px]"
      style={{ perspective: "1400px" }}
    >
      {slides.map((img, i) => {
        const pos = ((((i - offset) % n) + n) % n) - half;
        const abs = Math.abs(pos);
        const wrapping = abs >= half; // only at the far hidden edge
        const hidden = abs > VISIBLE;
        const z = Math.min(abs, VISIBLE + 1);
        return (
          <div
            key={`${img.src}-${i}`}
            className="absolute left-1/2 top-1/2 w-[73vw] sm:w-[50vw] md:w-[37vw] lg:w-[32vw]"
            style={{
              transform: `translate(-50%, -50%) translateX(calc(${pos * 100}% + ${pos} * var(--slide-gap))) translateZ(${z * z * 22}px) rotateY(${-Math.max(-VISIBLE - 1, Math.min(VISIBLE + 1, pos)) * 14}deg)`,
              opacity: hidden ? 0 : 1,
              visibility: hidden ? "hidden" : "visible",
              zIndex: hovered === i ? 50 : 10 - z,
              transition: wrapping
                ? "none"
                : "transform 1.2s cubic-bezier(0.65,0,0.35,1), opacity 1.2s ease",
            }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered((h) => (h === i ? null : h))}
          >
            <div
              className="aspect-[4/3] overflow-hidden transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ transform: `scale(${hovered === i ? 1.25 : 1})` }}
            >
              <img src={img.src} alt={img.alt} loading="lazy" className="block h-full w-full object-cover object-center" />
            </div>
          </div>
        );
      })}
    </div>
  );
}

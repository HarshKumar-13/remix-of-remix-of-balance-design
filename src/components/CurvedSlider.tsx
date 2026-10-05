import { useEffect, useState } from "react";

export type CurvedImage = { src: string; alt: string };

/** Convex, auto-advancing image row (one step every 2s). Hover gently enlarges an image. */
export function CurvedSlider({ images }: { images: CurvedImage[] }) {
  const [offset, setOffset] = useState(0);
  const n = images.length;
  const half = Math.floor(n / 2);

  useEffect(() => {
    const id = window.setInterval(() => setOffset((o) => o + 1), 2000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      className="relative mx-auto h-[220px] w-full overflow-hidden sm:h-[280px] md:h-[340px]"
      style={{ perspective: "1400px" }}
    >
      {images.map((img, i) => {
        const pos = ((((i - offset) % n) + n) % n) - half; // -half..half
        const abs = Math.abs(pos);
        const edge = abs >= half;
        return (
          <div
            key={img.src}
            className="absolute left-1/2 top-1/2 w-[44vw] sm:w-[30vw] md:w-[22vw] lg:w-[19vw]"
            style={{
              transform: `translate(-50%, -50%) translateX(${pos * 104}%) translateZ(${abs * abs * 22}px) rotateY(${-pos * 14}deg)`,
              opacity: edge ? 0 : 1,
              zIndex: 10 - abs,
              transition: edge
                ? "none"
                : "transform 1.2s cubic-bezier(0.65,0,0.35,1), opacity 1.2s ease",
            }}
          >
            <div className="aspect-[4/3] overflow-hidden transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.05]">
              <img src={img.src} alt={img.alt} loading="lazy" className="h-full w-full object-cover" />
            </div>
          </div>
        );
      })}
    </div>
  );
}

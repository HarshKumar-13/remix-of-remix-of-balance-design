import { useEffect, useState } from "react";

export type HeroSlide = { src: string; alt: string };

/**
 * Replaceable media frame. Swap the slides array (or render a <video>) to change the visual.
 */
export function HeroMedia({ slides, scrollY }: { slides: HeroSlide[]; scrollY: number }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setIndex((i) => (i + 1) % slides.length), 4200);
    return () => window.clearInterval(id);
  }, [slides.length]);

  const scale = 1 + Math.min(scrollY, 900) * 0.00018;
  const inset = Math.min(scrollY, 900) * 0.012;

  return (
    <div
      className="absolute inset-0 overflow-hidden bg-charcoal"
      style={{ clipPath: `inset(${inset}% ${inset}% 0 ${inset}%)` }}
    >
      {slides.map((s, i) => (
        <img
          key={s.src}
          src={s.src}
          alt={i === index ? s.alt : ""}
          aria-hidden={i !== index}
          className="absolute inset-0 h-full w-full object-cover object-[center_30%] transition-[opacity] duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            opacity: i === index ? 1 : 0,
            transform: `scale(${(i === index ? 1.06 : 1) * scale})`,
            transition: "opacity 1.6s cubic-bezier(0.16,1,0.3,1), transform 5s cubic-bezier(0.16,1,0.3,1)",
          }}
        />
      ))}
      <div className="absolute inset-0 bg-charcoal/25" />
    </div>
  );
}

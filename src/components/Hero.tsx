import { useEffect, useRef, useState } from "react";
import heroSketching from "@/assets/hero-sketching.jpg.asset.json";
import heroStyling from "@/assets/hero-styling.jpg.asset.json";
import heroStudio from "@/assets/hero-studio.jpg.asset.json";
import heroWorkshop from "@/assets/hero-workshop.jpg.asset.json";
import heroSeminar from "@/assets/hero-seminar.jpg.asset.json";

const SLIDES = [
  { src: heroSketching.url, alt: "Design consultants reviewing sketches and fabric swatches at a work table" },
  { src: heroStyling.url, alt: "Stylist advising a client beside a rail of curated garments" },
  { src: heroStudio.url, alt: "Designers collaborating over a laptop in a fashion studio" },
  { src: heroWorkshop.url, alt: "Workshop session with participants engaged around training tables" },
  { src: heroSeminar.url, alt: "Seminar room with an audience watching a presentation on screen" },
];

export function Hero({ introComplete = true }: { introComplete?: boolean }) {
  const [y, setY] = useState(0);
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!introComplete) return;
    // Trigger entrance animation after the logo settles into the navigation.
    const t = setTimeout(() => setLoaded(true), 150);
    return () => clearTimeout(t);
  }, [introComplete]);

  useEffect(() => {
    const onScroll = () => setY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      ref={heroRef}
      id="top"
      className={`relative h-[100svh] w-full overflow-hidden bg-charcoal transition-opacity duration-700 ${introComplete ? "opacity-100" : "opacity-0"}`}
    >
      {SLIDES.map((s, i) => (
        <img
          key={s.src}
          src={s.src}
          alt={s.alt}
          className="absolute inset-0 h-[120%] w-full object-cover object-center"
          style={{
            transform: `translate3d(0, ${y * 0.22}px, 0) scale(${i === index ? 1.12 : 1})`,
            opacity: i === index ? 1 : 0,
            transition:
              i === index
                ? "opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 3s cubic-bezier(0.16, 1, 0.3, 1)"
                : "opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />
      ))}
      <div className="absolute inset-0 bg-charcoal/35" />
      <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-charcoal/80 via-charcoal/30 to-transparent" />

      <div
        className="relative z-10 flex h-full flex-col justify-end px-6 pb-20 text-ivory md:px-12 md:pb-24"
        style={{ transform: `translate3d(0, ${y * -0.08}px, 0)` }}
      >
        <h1
          className="display relative text-[4rem] leading-[0.9] sm:text-[6.5rem] md:text-[10.5rem] lg:text-[12.5rem]"
          style={{
            opacity: loaded ? 1 : 0,
            transform: `translate3d(0, ${loaded ? 0 : 32}px, 0)`,
            transition: "opacity 1.1s cubic-bezier(0.16, 1, 0.3, 1), transform 1.1s cubic-bezier(0.16, 1, 0.3, 1)",
            transitionDelay: "300ms",
          }}
        >
          Balance Design
        </h1>
        <p
          className={`label-xs mt-6 opacity-80 transition-all duration-1000 ${loaded ? "translate-y-0 opacity-80" : "translate-y-6 opacity-0"}`}
          style={{ transitionDelay: "900ms", transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          Design &amp; Fashion Consultancy
        </p>

        <div
          className={`mt-12 flex flex-wrap items-center gap-4 transition-all duration-1000 ${loaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
          style={{ transitionDelay: "1100ms", transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          <a href="#services" className="btn-red label-xs">
            Explore services
          </a>
          <a href="#contact" className="btn-ghost label-xs hover:bg-ivory hover:text-charcoal">
            Book an appointment
          </a>
        </div>

        <div
          className={`absolute right-6 top-1/2 hidden -translate-y-1/2 flex-col gap-3 md:right-12 md:flex ${loaded ? "opacity-100" : "opacity-0"}`}
          style={{ transition: "opacity 1s cubic-bezier(0.16, 1, 0.3, 1) 1.4s" }}
        >
          {SLIDES.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2 w-2 transition-all duration-500 ${i === index ? "scale-125 bg-ivory" : "bg-ivory/40 hover:bg-ivory/70"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

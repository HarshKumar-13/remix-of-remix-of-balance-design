import { useEffect, useRef, useState } from "react";
import heroImg from "@/assets/hero.jpg";
import aboutImg from "@/assets/about.jpg";
import pers1 from "@/assets/pers-1.jpg";
import pers3 from "@/assets/pers-3.jpg";

const SLIDES = [
  { src: heroImg, alt: "Model in a sculptural ivory couture gown in a minimal concrete gallery" },
  { src: pers3, alt: "Individual in a minimal monochrome outfit against a warm plaster wall" },
  { src: aboutImg, alt: "Atelier interior with fabric and design references" },
  { src: pers1, alt: "Personal styling session with a silk scarf in a warm ivory studio" },
];

const WORDS = ["BALAN", "C", "E"];

export function Hero() {
  const [progress, setProgress] = useState(0);
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 120);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight || 1;
      setProgress(Math.min(1, Math.max(0, window.scrollY / vh)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), 6500);
    return () => clearInterval(id);
  }, []);

  // Scroll-linked exit choreography: the image settles and recedes while the
  // typography drifts independently and the frame darkens.
  const imgScale = (loaded ? 1 : 1.05) - progress * 0.12;
  const imgShift = progress * 12;
  const textShift = progress * -22;
  const textFade = Math.max(0, 1 - progress * 1.5);

  return (
    <section
      id="top"
      className="sticky top-0 h-[100svh] w-full overflow-hidden bg-charcoal"
      style={{ zIndex: 0 }}
    >
      {SLIDES.map((s, i) => {
        const active = i === index;
        return (
          <img
            key={s.src}
            src={s.src}
            alt={s.alt}
            fetchPriority={i === 0 ? "high" : "low"}
            className="absolute inset-0 h-full w-full object-cover object-center will-change-transform"
            style={{
              transform: `translate3d(0, ${imgShift}%, 0) scale(${active ? imgScale : imgScale * 1.04})`,
              opacity: active ? 1 : 0,
              transition:
                "opacity 1.8s cubic-bezier(0.16, 1, 0.3, 1), transform 2.2s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
        );
      })}

      <div className="absolute inset-0 bg-charcoal/35" />
      <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-charcoal/80 via-charcoal/25 to-transparent" />
      <div
        className="absolute inset-0 bg-charcoal"
        style={{ opacity: progress * 0.55 }}
      />

      <div
        className="relative z-10 flex h-full flex-col justify-end px-6 pb-20 text-ivory md:px-12 md:pb-24"
        style={{
          transform: `translate3d(0, ${textShift}vh, 0)`,
          opacity: textFade,
        }}
      >
        <h1
          aria-label="BALANCE"
          className="display text-[4.5rem] leading-[0.9] sm:text-[7rem] md:text-[11rem] lg:text-[13rem]"
        >
          {WORDS.map((word, i) => (
            <span
              key={i}
              className={`hero-word ${word === "C" ? "text-red" : ""} ${loaded ? "hero-word-in" : ""}`}
              style={{ transitionDelay: `${350 + i * 130}ms` }}
            >
              {word}
            </span>
          ))}
        </h1>
        <p
          className={`label-xs mt-6 transition-all duration-1000 ${loaded ? "translate-y-0 opacity-80" : "translate-y-6 opacity-0"}`}
          style={{ transitionDelay: "900ms", transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          Design &amp; Fashion Consultancy
        </p>

        <div
          className={`mt-12 flex flex-wrap items-center gap-4 transition-all duration-1000 ${loaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
          style={{ transitionDelay: "1100ms", transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          <a href="#services" className="btn-ghost label-xs hover:bg-ivory hover:text-charcoal">
            Book an appointment
          </a>
        </div>
      </div>
    </section>
  );
}

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

const STATEMENTS = ["YOUR IMAGE.", "YOUR IDENTITY.", "YOUR IMPACT."];

export function Hero() {
  const [y, setY] = useState(0);
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [stmt, setStmt] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Trigger entrance animation after a short delay for dramatic effect
    const t = setTimeout(() => setLoaded(true), 150);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => setY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), 6000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    // Reveal statements one by one, then hold on the last
    if (!loaded || stmt >= STATEMENTS.length - 1) return;
    const id = setTimeout(() => setStmt((s) => Math.min(s + 1, STATEMENTS.length - 1)), 2600);
    return () => clearTimeout(id);
  }, [loaded, stmt]);

  return (
    <section ref={heroRef} id="top" className="relative h-[100svh] w-full overflow-hidden bg-charcoal">
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
                ? "opacity 1.6s cubic-bezier(0.16, 1, 0.3, 1), transform 8.5s cubic-bezier(0.16, 1, 0.3, 1)"
                : "opacity 1.6s cubic-bezier(0.16, 1, 0.3, 1), transform 1.6s cubic-bezier(0.16, 1, 0.3, 1)",
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
          aria-label="YOUR IMAGE. YOUR IDENTITY. YOUR IMPACT."
          className="display relative text-[4.5rem] leading-[0.9] sm:text-[7rem] md:text-[11rem] lg:text-[13rem]"
        >
          {STATEMENTS.map((statement, i) => (
            <span
              key={statement}
              aria-hidden={i !== stmt}
              className={i === 0 ? "block" : "absolute inset-0 block"}
              style={{
                opacity: i === stmt && loaded ? 1 : 0,
                transform: `translate3d(0, ${i === stmt ? 0 : i < stmt ? -24 : 24}px, 0)`,
                transition: "opacity 1.1s cubic-bezier(0.16, 1, 0.3, 1), transform 1.1s cubic-bezier(0.16, 1, 0.3, 1)",
                transitionDelay: loaded ? "400ms" : "0ms",
              }}
            >
              {statement}
            </span>
          ))}
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

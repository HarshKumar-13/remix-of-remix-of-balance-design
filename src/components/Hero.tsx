import { useEffect, useState } from "react";
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

export function Hero() {
  const [y, setY] = useState(0);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const onScroll = () => setY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), 5200);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="top" className="relative h-[100svh] w-full overflow-hidden bg-charcoal">
      {SLIDES.map((s, i) => (
        <img
          key={s.src}
          src={s.src}
          alt={s.alt}
          className="absolute inset-0 h-[115%] w-full object-cover object-center transition-[opacity,transform] duration-[1500ms] ease-out"
          style={{
            transform: `translate3d(0, ${y * 0.14}px, 0) scale(${i === index ? 1.06 : 1})`,
            opacity: i === index ? 1 : 0,
            transitionDuration: i === index ? "1500ms, 7000ms" : "1500ms, 1500ms",
          }}
        />
      ))}
      <div className="absolute inset-0 bg-charcoal/40" />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-charcoal/75 to-transparent" />

      <div
        className="relative z-10 flex h-full flex-col justify-end px-6 pb-20 text-ivory md:px-12 md:pb-24"
        style={{ transform: `translate3d(0, ${y * -0.05}px, 0)` }}
      >
        <h1 className="display text-[4.5rem] leading-[0.9] sm:text-[7rem] md:text-[11rem] lg:text-[13rem]">
          BALAN<span className="text-red">C</span>E
        </h1>
        <p className="label-xs mt-6 opacity-80">Design &amp; Fashion Consultancy</p>

        <div className="mt-12 flex flex-wrap items-center gap-4">
          <a href="#services" className="btn-red label-xs hover:bg-charcoal">
            Explore services
          </a>
          <a href="#contact" className="btn-ghost label-xs hover:bg-ivory hover:text-charcoal">
            Book an appointment
          </a>
        </div>
      </div>
    </section>
  );
}

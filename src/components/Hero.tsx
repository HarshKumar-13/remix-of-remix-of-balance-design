import { useCallback, useEffect, useState } from "react";
import h1 from "@/assets/hero-new-1.jpg";
import h2 from "@/assets/hero-new-2.jpg";
import h3 from "@/assets/hero-new-3.jpg";
import h4 from "@/assets/hero-new-4.jpg";
import h5 from "@/assets/hero-new-5.jpg";
import h6 from "@/assets/hero-new-6.jpg";
import h7 from "@/assets/hero-new-7.jpg";
import h8 from "@/assets/hero-new-8.jpg";
import h9 from "@/assets/hero-new-9.jpg";
import { BrandReveal } from "./hero/BrandReveal";
import { HeroMedia, type HeroSlide } from "./hero/HeroMedia";
import { QuestionSequence } from "./hero/QuestionSequence";
import { HeroStatement } from "./hero/HeroStatement";

// Replace these with the final campaign images when supplied.
const SLIDES: HeroSlide[] = [
  { src: h4, alt: "Upma Shrian seated in a floral armchair" },
  { src: h7, alt: "Upma Shrian speaking on stage in front of a screen reading I Create Who I Am" },
  { src: h5, alt: "Upma Shrian seated on a blue velvet sofa" },
  { src: h2, alt: "Upma Shrian leading an interactive workshop discussion" },
  { src: h1, alt: "Workshop participants seated along long tables watching a presentation" },
  { src: h3, alt: "Styling workshop session in a training room" },
  { src: h6, alt: "Workshop at IIM Bangalore" },
  { src: h8, alt: "Seminar audience watching a video presentation" },
  { src: h9, alt: "Audience viewing a complementary colour scheme presentation" },
];

export function Hero(_props: { introComplete?: boolean }) {
  const [revealed, setRevealed] = useState(false);
  const [settled, setSettled] = useState(false);
  const [y, setY] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRevealed(true);
      setSettled(true);
    }
    const onScroll = () => setY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onRevealed = useCallback(() => setRevealed(true), []);
  const onSettled = useCallback(() => setSettled(true), []);

  return (
    <section id="top" className="relative h-[100svh] w-full overflow-hidden bg-background">
      {!revealed && <BrandReveal onDone={onRevealed} />}

      {/* Editorial frame: image fills the right of the viewport on desktop, the full frame on mobile */}
      <div className="absolute bottom-0 right-0 top-[118px] w-full md:top-[148px] md:w-[66vw]">
        <HeroMedia slides={SLIDES} scrollY={y} />
      </div>

      <QuestionSequence start={revealed && !settled} onDone={onSettled} />
      <HeroStatement show={settled} scrollY={y} />

      {revealed && !settled && (
        <button
          type="button"
          onClick={onSettled}
          className="label-xs absolute right-6 top-[136px] z-10 text-background mix-blend-difference md:right-12 md:top-[172px]"
        >
          Skip
        </button>
      )}
    </section>
  );
}

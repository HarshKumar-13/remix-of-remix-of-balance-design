import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { motion, useReducedMotion } from "motion/react";
import { useHeroScroll } from "@/hooks/use-hero-scroll";
import h0560 from "@/assets/hero-0560.jpg";
import h0541 from "@/assets/hero-0541.jpg";
import h0545 from "@/assets/hero-0545.jpg";
import h0556 from "@/assets/hero-0556.jpg";
import h1616 from "@/assets/hero-1616b.jpg";
import h1627 from "@/assets/hero-1627.jpg";
import h1628 from "@/assets/hero-1628.jpg";
import h1629 from "@/assets/hero-1629.jpg";
import h1630 from "@/assets/hero-1630.jpg";
import h1631 from "@/assets/hero-1631.jpg";

export const HERO_COLUMNS = [
  [{ src: h0560, alt: "Design workshop audience" }, { src: h1616, alt: "Garment sketches and colour palette" }, { src: h0541, alt: "Fashion seminar audience" }],
  [{ src: h1627, alt: "Artistic fashion portrait collage" }, { src: h1628, alt: "Geometric textile designs and embroidered shoes" }, { src: h0545, alt: "Colour and styling workshop" }],
  [{ src: h1629, alt: "Fashion portrait design board" }, { src: h1631, alt: "Fashion illustrations in printed garments" }, { src: h1630, alt: "Floral textile pattern" }, { src: h0556, alt: "Fashion and colour theory seminar" }],
];
export const PHRASES = ["Design & Styling Workshops", "Creating Looks", "Personal Image Consulting", "Fashion Forecasting", "Creating Fashion Collections", "Design Aesthetics Workshops"];

const BANNER_IMAGES = [h0560, h0541, h0545, h1616, h1627, h0556];

export function Hero({ introComplete = true }: { introComplete?: boolean }) {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [phraseVisible, setPhraseVisible] = useState(true);
  const heroRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [scrollPinned, setScrollPinned] = useState(false);
  const rotationRef = useRef<gsap.core.Timeline | null>(null);
  useHeroScroll(stageRef, introComplete, setScrollPinned);

  useEffect(() => {
    if (!introComplete || reduced) return;
    // A single index owns both the picture and its service phrase.
    const clock = gsap.timeline({ repeat: -1 });
    rotationRef.current = clock;
    PHRASES.forEach((_, i) => {
      clock.call(() => setPhraseVisible(false), [], (i + 1) * 2 - 0.3);
      clock.call(() => { setActive((i + 1) % PHRASES.length); setPhraseVisible(true); }, [], (i + 1) * 2);
    });
    clock.to({}, { duration: 0.01 }, PHRASES.length * 2);
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) clock.resume();
      else clock.pause();
    });
    if (heroRef.current) observer.observe(heroRef.current);
    return () => { clock.kill(); rotationRef.current = null; observer.disconnect(); };
  }, [introComplete, reduced]);

  return (
    <section ref={heroRef} id="top" className={`cinematic-hero bg-background${introComplete ? " hero-settled" : ""}`}>
      <div data-hero-copy className="cinematic-copy">
        <h1 className="display cinematic-title text-brand-red"><span>BALANCE DESIGN</span></h1>
        <p className="display cinematic-descriptor"><span>&amp; FASHION CONSULTANCY</span></p>
      </div>
      <div ref={stageRef} className="hero-scroll-stage">
      <div className="hero-scroll-viewport">
      <div data-banner-destination className="editorial-banner-destination">
        <div data-featured-banner className="editorial-banner">
          {BANNER_IMAGES.map((src, i) => (
            <motion.img key={src} src={src} alt={PHRASES[i]} data-banner-image={i} data-intro-image="true"
              initial={false} animate={{ opacity: active === i ? 1 : 0 }} transition={{ duration: reduced ? 0 : 0.65 }}
              aria-hidden={active !== i} className="editorial-banner-image" decoding="async" loading="eager" />
          ))}
          <div data-banner-phrase className="editorial-banner-caption" aria-label="Consultancy specialisms">
            <motion.p initial={false} animate={{ opacity: phraseVisible ? 1 : 0 }}
              transition={{ duration: reduced ? 0 : 0.3 }} className="editorial-banner-phrase">{PHRASES[active]}</motion.p>
          </div>
        </div>
      </div>
      </div>
      </div>
      <div data-hero-gallery className="cinematic-gallery" aria-hidden="true">
        {HERO_COLUMNS.map((photos, column) => (
          <div key={column} data-hero-column className="cinematic-column">
            <div data-column-track className="cinematic-track">
              {Array.from({ length: 16 }, (_, repetition) => photos.map((photo, photoIndex) => (
                <div key={`${repetition}-${photo.src}`} data-column-image data-cycle-start={photoIndex === 0 ? "true" : undefined} className="cinematic-image">
                  <img src={photo.src} alt="" data-intro-image={repetition === 0 ? "true" : undefined} loading="eager" decoding="async" />
                </div>
              )))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

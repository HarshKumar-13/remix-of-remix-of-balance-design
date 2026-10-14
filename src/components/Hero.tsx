import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { motion, useReducedMotion } from "motion/react";
import { Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroImageLightbox, type ExpandedHeroImage } from "@/components/HeroImageLightbox";
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
  const [expandedImage, setExpandedImage] = useState<ExpandedHeroImage | null>(null);
  const [gridPaused, setGridPaused] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [scrollPinned, setScrollPinned] = useState(false);
  const rotationRef = useRef<gsap.core.Timeline | null>(null);
  useHeroScroll(stageRef, introComplete, setScrollPinned);

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;
    // Native delegation survives LogoIntro temporarily moving this node to body.
    const click = (event: MouseEvent) => {
      if (gallery.dataset['phase'] !== "hold" && gallery.dataset['phase'] !== "movement") return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const cell = target.closest<HTMLElement>("[data-column-image]");
      const image = cell?.querySelector<HTMLImageElement>("img");
      if (!cell || !image) return;
      gallery.dispatchEvent(new CustomEvent("grid-lightbox", { detail: true }));
      setExpandedImage({ src: image.currentSrc || image.src, alt: image.alt, trigger: cell });
    };
    const state = (event: Event) => setGridPaused(Boolean((event as CustomEvent<boolean>).detail));
    gallery.addEventListener("click", click);
    gallery.addEventListener("grid-pause-state", state);
    return () => { gallery.removeEventListener("click", click); gallery.removeEventListener("grid-pause-state", state); };
  }, []);

  const closeImage = () => {
    setExpandedImage(null);
    // Wait for the dialog's exit and scroll-lock release before restarting.
    galleryRef.current?.dispatchEvent(new CustomEvent("grid-lightbox", { detail: false }));
  };

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
      <div ref={galleryRef} data-hero-gallery className="cinematic-gallery" aria-label="Balance Design image gallery">
        {HERO_COLUMNS.map((photos, column) => (
          <div key={column} data-hero-column className="cinematic-column">
            <div data-column-track className="cinematic-track">
              {Array.from({ length: 16 }, (_, repetition) => photos.map((photo, photoIndex) => (
                <Button key={`${repetition}-${photo.src}`} variant="ghost" tabIndex={-1} aria-label={`Expand ${photo.alt}`} data-column-image data-cycle-start={photoIndex === 0 ? "true" : undefined} className="cinematic-image">
                  <img src={photo.src} alt={photo.alt} data-intro-image={repetition === 0 ? "true" : undefined} loading="eager" decoding="async" />
                </Button>
              )))}
            </div>
          </div>
        ))}
        <Button variant="secondary" size="icon" data-grid-toggle className="grid-motion-toggle" aria-label={gridPaused ? "Resume grid animation" : "Pause grid animation"} title={gridPaused ? "Resume grid animation" : "Pause grid animation"} aria-pressed={gridPaused}>
          {gridPaused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
        </Button>
      </div>
      <HeroImageLightbox image={expandedImage} onClose={closeImage} />
    </section>
  );
}

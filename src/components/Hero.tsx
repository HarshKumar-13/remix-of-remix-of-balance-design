import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { ArrowDown, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroImageLightbox, type ExpandedHeroImage } from "@/components/HeroImageLightbox";
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
  [{ src: h1616, alt: "Garment sketches and colour palette" }, { src: h0541, alt: "Fashion seminar audience" }],
  [{ src: h1627, alt: "Artistic fashion portrait collage" }, { src: h1628, alt: "Geometric textile designs and embroidered shoes" }, { src: h0545, alt: "Colour and styling workshop" }],
  [{ src: h1629, alt: "Fashion portrait design board" }, { src: h1631, alt: "Fashion illustrations in printed garments" }, { src: h1630, alt: "Floral textile pattern" }, { src: h0556, alt: "Fashion and colour theory seminar" }],
];
export const PHRASES = ["Design & Styling Workshops", "Creating Looks", "Personal Image Consulting", "Fashion Forecasting", "Creating Fashion Collections", "Design Aesthetics Workshops"];

export function Hero() {
  const reduced = useReducedMotion();
  const [expandedImage, setExpandedImage] = useState<ExpandedHeroImage | null>(null);
  const [gridPaused, setGridPaused] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);
  const continueAfterClose = useRef(false);

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

  const navigateToServices = () => {
    const services = document.getElementById("services");
    if (!services) return;
    services.focus({ preventScroll: true });
    services.scrollIntoView({ behavior: reduced ? "instant" : "smooth", block: "start" });
  };
  const explore = () => {
    galleryRef.current?.dispatchEvent(new CustomEvent("grid-explore"));
    if (expandedImage) { continueAfterClose.current = true; closeImage(); }
    else navigateToServices();
  };
  const afterClose = () => {
    if (!continueAfterClose.current) return;
    continueAfterClose.current = false;
    requestAnimationFrame(navigateToServices);
  };

  return (
    <section id="top" className="cinematic-hero bg-background" aria-label="Balance Design & Fashion Consultancy">
      <h1 className="sr-only">Balance Design &amp; Fashion Consultancy</h1>
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
        <Button variant="ghost" data-grid-explore className="grid-explore-cue" onClick={explore}>
          SCROLL TO EXPLORE <ArrowDown aria-hidden="true" />
        </Button>
      </div>
      <HeroImageLightbox image={expandedImage} onClose={closeImage} onExplore={explore} onAfterClose={afterClose} />
    </section>
  );
}

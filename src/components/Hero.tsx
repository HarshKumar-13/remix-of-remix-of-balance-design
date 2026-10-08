import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
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

type Photo = { src: string; alt: string };

const PHOTOS: Photo[] = [
  { src: h0560, alt: "Workshop audience watching a presentation on screen" },
  { src: h0541, alt: "Seminar audience in an auditorium watching a presentation" },
  { src: h0545, alt: "Audience viewing a colour and styling presentation in a hall" },
  { src: h0556, alt: "Fashion and colour theory seminar in a school hall" },
  { src: h1616, alt: "Fashion design board with garment sketches, photographs and a colour palette" },
  { src: h1627, alt: "Artistic portrait collage with paint streaks and printed text on a dark background" },
  { src: h1628, alt: "Design panel of colourful geometric patterns beside embroidered pink slip-on shoes" },
  { src: h1629, alt: "Studio portrait in black lace with printed text on a white background" },
  { src: h1630, alt: "Black and white repeating floral pattern panel" },
  { src: h1631, alt: "Fashion illustration of four figures in printed outfits and headpieces" },
];
const PHRASES = [
  "Design & Styling Workshops",
  "Creating Looks",
  "Personal Image Consulting",
  "Fashion Forecasting",
  "Creating Fashion Collections",
  "Design Aesthetics Workshops",
];
const EASE = [0.65, 0, 0.35, 1] as const;

/**
 * A photo, shown whole and uncropped, centred over a soft out-of-focus wash of
 * itself — the wash fills the frame, the picture is never cropped or stretched.
 */
function HeroPhoto({
  image,
  active,
  hero,
  reduced,
  eager,
}: {
  image: Photo;
  active: boolean;
  hero: { w: number; h: number };
  reduced: boolean;
  eager: boolean;
}) {
  const [nat, setNat] = useState<{ w: number; h: number } | null>(null);
  const baseRef = useRef<HTMLImageElement>(null);

  // A cached photo can finish loading before React attaches its load handler, so
  // the picture's own proportions are read from the element itself.
  useEffect(() => {
    const el = baseRef.current;
    if (!el) return;
    const read = () => {
      if (el.naturalWidth && el.naturalHeight) {
        setNat({ w: el.naturalWidth, h: el.naturalHeight });
      }
    };
    if (el.complete) {
      read();
      return;
    }
    el.addEventListener("load", read);
    return () => el.removeEventListener("load", read);
  }, [image.src]);

  // The picture is scaled up to the largest size that still fits the frame whole.
  const fit = useMemo(() => {
    if (!nat || !hero.w || !hero.h) return null;
    const aspect = nat.w / nat.h;
    if (aspect < hero.w / hero.h) {
      return { w: Math.round(hero.h * aspect), h: hero.h };
    }
    return { w: hero.w, h: Math.round(hero.w / aspect) };
  }, [nat, hero]);

  const onImgLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const el = e.currentTarget;
    if (el.naturalWidth && el.naturalHeight) {
      setNat({ w: el.naturalWidth, h: el.naturalHeight });
    }
  };

  return (
    <motion.div
      aria-hidden={!active}
      initial={false}
      animate={{ opacity: active ? 1 : 0, y: active ? 0 : 8 }}
      transition={{ duration: reduced ? 0 : 1.6, ease: EASE }}
      className="absolute inset-0 flex h-full w-full items-center justify-center"
    >
      {/* Out-of-focus wash of the same photo, filling the frame behind the picture. */}
      <img
        ref={baseRef}
        src={image.src}
        alt=""
        aria-hidden="true"
        loading={eager ? "eager" : "lazy"}
        onLoad={onImgLoad}
        className="absolute inset-0 h-full w-full scale-110 object-cover blur-2xl"
      />
      {fit ? (
        <img
          src={image.src}
          alt={image.alt}
          loading={eager ? "eager" : "lazy"}
          onLoad={onImgLoad}
          style={{ width: fit.w, height: fit.h }}
          className="relative block"
        />
      ) : (
        <img
          src={image.src}
          alt={image.alt}
          loading={eager ? "eager" : "lazy"}
          onLoad={onImgLoad}
          className="absolute inset-0 h-full w-full object-contain"
        />
      )}
    </motion.div>
  );
}

export function Hero({ introComplete = true }: { introComplete?: boolean }) {
  const reducedMotion = useReducedMotion();
  const [phrase, setPhrase] = useState<number | null>(null);
  const [photo, setPhoto] = useState(0);
  const [hero, setHero] = useState({ w: 0, h: 0 });
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!introComplete || reducedMotion) return;
    // One repeating clock: ten photos every 3.9s, phrases every 2.6s.
    // The shared 39s cycle wraps both sequences without restarting the intro.
    const CYCLE = 39;
    const PHOTO_STEP = CYCLE / PHOTOS.length;
    const clock = gsap.timeline({ repeat: -1, delay: 0.7 });
    for (let step = 0; step < 15; step += 1) {
      clock.call(() => setPhrase(step % PHRASES.length), [], step * 2.6);
      clock.call(() => setPhrase(null), [], step * 2.6 + 2);
    }
    for (let step = 0; step < PHOTOS.length; step += 1) {
      clock.call(() => setPhoto(step), [], step * PHOTO_STEP);
    }
    clock.to({}, { duration: 0.6 }, CYCLE - 0.6);
    const element = heroRef.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) clock.resume();
      else clock.pause();
    }, { threshold: 0 });
    if (element) observer.observe(element);
    return () => { clock.kill(); observer.disconnect(); };
  }, [introComplete, reducedMotion]);

  // The reflection wings are sized from the live frame, so they follow the
  // viewport instead of assuming a shape for the picture.
  useEffect(() => {
    const element = heroRef.current;
    if (!element) return;
    const measure = () => setHero({ w: element.clientWidth, h: element.clientHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(element);
    return () => ro.disconnect();
  }, []);

  const currentPhrase = reducedMotion ? 0 : phrase;

  return (
    <motion.section
      ref={heroRef}
      id="top"
      initial={{ opacity: 0 }}
      animate={{ opacity: introComplete ? 1 : 0 }}
      transition={{ duration: reducedMotion ? 0 : 0.7, ease: EASE }}
      className="relative h-[100svh] min-h-[600px] w-full overflow-hidden bg-charcoal"
    >
      {PHOTOS.map((image, index) => (
        <HeroPhoto
          key={image.src}
          image={image}
          active={photo === index}
          hero={hero}
          reduced={!!reducedMotion}
          eager={index < 2}
        />
      ))}
      <div aria-hidden="true" className="hero-overlay pointer-events-none absolute inset-0" />
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: introComplete ? 1 : 0, y: introComplete ? 0 : 8 }}
        transition={{ duration: reducedMotion ? 0 : 0.9, ease: EASE, delay: reducedMotion ? 0 : 0.15 }}
        className="hero-copy relative z-10 flex h-full flex-col justify-end text-ivory"
      >
        <div className="w-full px-6 pb-10 pt-16 md:px-12 md:pb-20 md:pt-40">
        <h1 className="hero-title display whitespace-nowrap text-[calc(9.45vw_-_12px)] leading-[0.98] md:text-[calc(min(9vw_-_13.5px,11.25rem_-_4.5px))]">
          Balance Design
        </h1>
        <p className="hero-label hero-ink label-xs mt-5 inline-block">&amp; Fashion Consultancy</p>
        <div className="relative mt-7 h-14 max-w-3xl sm:h-16" aria-label="Consultancy specialisms">
          <AnimatePresence mode="wait">
            {currentPhrase !== null && (
              <motion.p
                key={currentPhrase}
                initial={reducedMotion ? false : { opacity: 0, scale: 0.96, y: 5 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.02, y: -3, transition: { duration: 0.5, ease: EASE } }}
                transition={{ duration: reducedMotion ? 0 : 0.6, ease: EASE }}
                className="hero-ink absolute inset-x-0 top-0 origin-left font-sans text-2xl font-medium leading-tight sm:text-3xl md:text-4xl"
              >
                {PHRASES[currentPhrase]}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
        </div>
      </motion.div>
    </motion.section>
  );
}

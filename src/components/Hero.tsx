import { useEffect, useRef, useState } from "react";
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

const PHOTOS = [
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

export function Hero({ introComplete = true }: { introComplete?: boolean }) {
  const reducedMotion = useReducedMotion();
  const [phrase, setPhrase] = useState<number | null>(null);
  const [photo, setPhoto] = useState(0);
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
        <motion.div
          key={image.src}
          aria-hidden={photo !== index}
          initial={false}
          animate={{ opacity: photo === index ? 1 : 0, y: photo === index ? 0 : 8 }}
          transition={{ duration: reducedMotion ? 0 : 1.6, ease: EASE }}
          className="absolute inset-0 h-full w-full"
        >
          <img
            src={image.src}
            alt=""
            aria-hidden="true"
            loading={index < 2 ? "eager" : "lazy"}
            className="absolute inset-0 h-full w-full scale-110 object-cover object-[center_30%] blur-2xl brightness-[0.82]"
          />
          <img
            src={image.src}
            alt={image.alt}
            loading={index < 2 ? "eager" : "lazy"}
            className="absolute inset-0 h-full w-full object-contain object-[center_18%]"
          />
        </motion.div>
      ))}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: introComplete ? 1 : 0, y: introComplete ? 0 : 8 }}
        transition={{ duration: reducedMotion ? 0 : 0.9, ease: EASE, delay: reducedMotion ? 0 : 0.15 }}
        className="hero-copy relative z-10 flex h-full flex-col justify-end text-ivory"
      >
        <div className="w-full px-6 pb-10 pt-16 md:px-12 md:pb-20 md:pt-40">
        <h1 className="display whitespace-nowrap text-[calc(12.6vw_-_16px)] leading-[0.98] md:text-[calc(min(12vw_-_18px,15rem_-_6px))]">
          Balance Design
        </h1>
        <p className="hero-label hero-ink label-xs mt-5 inline-block bg-charcoal/60 px-3 py-1.5 backdrop-blur-[2px]">&amp; Fashion Consultancy</p>
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
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <a href="#services" className="btn-red label-xs">Explore services</a>
          <a href="#contact" className="btn-ghost label-xs bg-charcoal/50 backdrop-blur-[3px] hover:bg-ivory hover:text-charcoal">Book an appointment</a>
        </div>
        </div>
      </motion.div>
    </motion.section>
  );
}

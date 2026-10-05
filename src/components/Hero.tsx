import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import h1 from "@/assets/hero-new-1.jpg";
import h2 from "@/assets/hero-new-2.jpg";
import h3 from "@/assets/hero-new-3.jpg";
import h4 from "@/assets/hero-new-4.jpg";
import h5 from "@/assets/hero-new-5.jpg";
import h6 from "@/assets/hero-new-6.jpg";
import h7 from "@/assets/hero-new-7.jpg";
import h8 from "@/assets/hero-new-8.jpg";
import h9 from "@/assets/hero-new-9.jpg";

type Slide = { type: "image" | "video"; src: string; alt: string };
const SLIDES: Slide[] = [
  { type: "image", src: h1, alt: "Workshop participants seated along long tables watching a presentation" },
  { type: "image", src: h2, alt: "Upma Shrian leading an interactive workshop discussion" },
  { type: "image", src: h3, alt: "Styling workshop session in a training room" },
  { type: "image", src: h4, alt: "Upma Shrian seated in a floral armchair" },
  { type: "image", src: h5, alt: "Upma Shrian seated on a blue velvet sofa" },
  { type: "image", src: h6, alt: "Workshop at IIM Bangalore" },
  { type: "image", src: h7, alt: "Upma Shrian speaking on stage in front of a screen reading I Create Who I Am" },
  { type: "image", src: h8, alt: "Seminar audience watching a video presentation" },
  { type: "image", src: h9, alt: "Audience viewing a complementary colour scheme presentation" },
];

export function Hero({ introComplete = true }: { introComplete?: boolean }) {
  const [y, setY] = useState(0);
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    if (!introComplete) return;
    const t = setTimeout(() => setLoaded(true), 150);
    return () => clearTimeout(t);
  }, [introComplete]);

  useEffect(() => {
    const onScroll = () => setY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [inView, setInView] = useState(true);
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(!!e && e.isIntersecting && e.intersectionRatio >= 0.4), {
      threshold: [0, 0.4, 1],
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Sound only while the hero is on screen
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (!inView) {
      v.muted = true;
      return;
    }
    v.muted = muted;
    if (!muted && !v.paused) {
      v.play().catch(() => {
        v.muted = true;
        setMuted(true);
      });
    }
  }, [inView, muted]);

  const next = () => setIndex((i) => (i + 1) % SLIDES.length);

  useEffect(() => {
    const v = videoRef.current;
    if (SLIDES[index]?.type === "video") {
      if (v) {
        v.currentTime = 0;
        v.muted = muted || !inView;
        v.play().catch(() => {
          v.muted = true;
          setMuted(true);
          v.play().catch(() => {});
        });
      }
      return;
    }
    v?.pause();
    const t = setTimeout(next, 2000);
    return () => clearTimeout(t);
  }, [index]);

  return (
    <section
      ref={heroRef}
      id="top"
      className={`relative h-[100svh] w-full overflow-hidden bg-charcoal transition-opacity duration-700 ${introComplete ? "opacity-100" : "opacity-0"}`}
    >
      {SLIDES.map((s, i) => {
        const style = {
          transform: `translate3d(0, ${y * 0.22}px, 0) scale(${i === index && s.type === "image" ? 1.12 : 1})`,
          opacity: i === index ? 1 : 0,
          transition:
            i === index
              ? "opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 3s cubic-bezier(0.16, 1, 0.3, 1)"
              : "opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
        };
        return s.type === "video" ? (
          <video
            key={s.src}
            ref={videoRef}
            src={s.src}
            muted={muted || !inView}
            playsInline
            preload="metadata"
            onEnded={next}
            aria-label={s.alt}
            className="absolute inset-0 h-[120%] w-full object-cover object-center"
            style={style}
          />
        ) : (
          <img
            key={s.src}
            src={s.src}
            alt={s.alt}
            className="absolute inset-0 h-[120%] w-full object-cover object-[center_30%]"
            style={style}
          />
        );
      })}
      <div className="absolute inset-0 bg-charcoal/35" />
      <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-charcoal/80 via-charcoal/30 to-transparent" />

      {SLIDES[index]?.type === "video" && (
        <button
          type="button"
          onClick={() => setMuted((m) => !m)}
          aria-label={muted ? "Unmute video" : "Mute video"}
          className="absolute bottom-6 right-6 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-ivory/60 text-ivory transition-colors hover:bg-ivory hover:text-charcoal md:bottom-10 md:right-12"
        >
          {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </button>
      )}
      <div
        className="relative z-10 flex h-full flex-col justify-end px-6 pb-20 text-ivory md:px-12 md:pb-24"
        style={{ transform: `translate3d(0, ${y * -0.08}px, 0)` }}
      >
        <h1
          className="display relative whitespace-nowrap text-[min(10.5vw,12rem)] leading-[0.9]"
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

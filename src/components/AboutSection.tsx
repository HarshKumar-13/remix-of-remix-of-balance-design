import { useEffect, useRef, useState } from "react";

import board1 from "@/assets/about-board-1.jpg";
import board2 from "@/assets/about-board-2.jpg";
import board3 from "@/assets/about-board-3.jpg";
import board4 from "@/assets/about-board-4.jpg";

const BOARDS = [
  { src: board1, alt: "Super heroes Boys 2-8 yrs trend board with Pantone palette" },
  { src: board2, alt: "Assembling Girls 2-8 yrs trend page with folk prints and Pantone palette" },
  { src: board3, alt: "The Remixing colour palette page across age groups" },
  { src: board4, alt: "The Remixing mood board of red and yellow folk prints" },
];
import { Reveal } from "./Reveal";

function ParallaxImage({
  offset: start,
  speed = 0.06,
  className = "",
}: {
  offset: number;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setTick((v) => v + 1), 2500);
    return () => window.clearInterval(id);
  }, []);
  const current = (tick + start) % BOARDS.length;

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const mid = rect.top + rect.height / 2 - window.innerHeight / 2;
      setOffset(-mid * speed);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [speed]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {BOARDS.map((b, i) => (
        <img
          key={b.src}
          src={b.src}
          alt={i === current ? b.alt : ""}
          aria-hidden={i !== current}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ease-in-out"
          style={{ transform: `translate3d(0, ${offset}px, 0) scale(1.15)`, opacity: i === current ? 1 : 0 }}
        />
      ))}
    </div>
  );
}

const HEADLINE_LINES = [
  "Fashion is",
  "more than",
  "what you",
  "wear. It is",
  "how you",
  "are seen.",
];

export function AboutSection() {
  return (
    <section
      id="about"
      className="border-t border-border bg-ivory py-28 md:py-36 lg:py-44"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-12 md:gap-16 lg:gap-20">
          {/* Left column: label + headline */}
          <div className="md:col-span-6 lg:col-span-6">
            <Reveal delay={0}>
              <p className="label-xs text-muted-foreground">About Balance Design</p>
            </Reveal>

            <h2 className="display text-accent mt-5 text-[2.75rem] leading-[0.95] sm:text-5xl md:mt-6 md:text-[4.25rem] lg:text-[4.75rem]">
              {HEADLINE_LINES.map((line, i) => (
                <Reveal key={line} delay={80 + i * 60}>
                  <span className="block">{line}</span>
                </Reveal>
              ))}
            </h2>
          </div>

          {/* Right column: body copy + CTA */}
          <div className="md:col-span-5 lg:col-span-5">
            <Reveal delay={180}>
              <p className="max-w-xl text-xl leading-[1.75] text-foreground md:text-[1.35rem]">
                Balance Design &amp; Fashion Consultancy works across fashion, image and design to
                help individuals, brands and organisations create a stronger and more meaningful
                visual expression.
              </p>
            </Reveal>
            <Reveal delay={260}>
              <p className="mt-10 max-w-xl text-xl leading-[1.75] text-muted-foreground md:text-[1.35rem]">
                Our expertise spans corporate image consulting, personal image consulting, trend
                forecasting, line and range presentation, graphic design, uniform design and
                fashion experiences.
              </p>
            </Reveal>
            <Reveal delay={340}>
              <a
                href="#contact"
                className="link-underline mt-12 inline-flex items-center gap-3 text-lg font-medium uppercase tracking-[0.18em] text-foreground transition-opacity duration-500 hover:opacity-70"
              >
                Get to know us <span aria-hidden="true">&rarr;</span>
              </a>
            </Reveal>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-12 md:mt-28 md:gap-8">
          <div className="sm:col-span-5 sm:col-start-3 sm:self-end">
            <Reveal>
              <ParallaxImage
                offset={0}
                className="h-[38vh] w-full md:h-[46vh]"
              />
            </Reveal>
          </div>
          <div className="sm:col-span-5">
            <Reveal delay={120}>
              <ParallaxImage
                offset={2}
                speed={0.09}
                className="h-[52vh] w-full md:h-[70vh]"
              />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

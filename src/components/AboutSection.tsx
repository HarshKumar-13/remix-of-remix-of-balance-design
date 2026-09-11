import { useEffect, useRef, useState } from "react";

import aboutImg from "@/assets/about.jpg";
import aboutImg2 from "@/assets/pers-3.jpg";
import { Reveal } from "./Reveal";

function ParallaxImage({
  src,
  alt,
  speed = 0.06,
  className = "",
}: {
  src: string;
  alt: string;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

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
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="h-full w-full scale-[1.15] object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.08]"
        style={{ transform: `translate3d(0, ${offset}px, 0) scale(1.15)` }}
      />
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
                src={aboutImg}
                alt="Designer draping fabric on a mannequin in a sunlit atelier"
                className="h-[38vh] w-full md:h-[46vh]"
              />
            </Reveal>
          </div>
          <div className="sm:col-span-5">
            <Reveal delay={120}>
              <ParallaxImage
                src={aboutImg2}
                alt="Individual in a minimal monochrome outfit against a warm plaster wall"
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

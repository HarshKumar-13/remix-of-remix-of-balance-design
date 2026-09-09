import { useEffect, useRef, useState } from "react";

import aboutImg from "@/assets/about.jpg";
import aboutImg2 from "@/assets/pers-3.jpg";
import { LogoMark } from "./LogoMark";
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
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const mid = rect.top + rect.height / 2 - window.innerHeight / 2;
      setOffset(-mid * speed);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [speed]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="h-full w-full object-cover will-change-transform"
        style={{ transform: `translate3d(0, ${offset}px, 0) scale(1.15)` }}
      />
    </div>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="relative bg-background py-28 md:py-48">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Asymmetric magazine composition: heading / portrait / narrative */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-4 md:pt-10">
            <Reveal>
              <LogoMark className="mb-8 md:mx-0" />
            </Reveal>
            <Reveal delay={60}>
              <p className="label-xs text-muted-foreground">About Balance</p>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="display mt-8 text-[2.75rem] leading-[0.98] sm:text-5xl md:text-[4rem]">
                Fashion is more than what you wear.
                <span className="text-red"> It is how you are seen.</span>
              </h2>
            </Reveal>
          </div>

          <div className="md:col-span-5 md:-mt-16">
            <Reveal>
              <ParallaxImage
                src={aboutImg2}
                alt="Individual in a minimal monochrome outfit against a warm plaster wall"
                speed={0.08}
                className="h-[62vh] w-full md:h-[86vh]"
              />
            </Reveal>
          </div>

          <div className="md:col-span-3 md:self-end md:pb-24">
            <Reveal delay={80}>
              <p className="text-sm leading-relaxed text-foreground md:text-base">
                Balance Design &amp; Fashion Consultancy works across fashion, image and design to
                help individuals, brands and organisations create a stronger, more meaningful
                visual expression.
              </p>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
                Corporate and personal image consulting, trend forecasting, line and range
                presentation, graphic design, uniform design and fashion experiences.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <a href="#contact" className="label-xs link-underline mt-10 inline-block">
                Get to know us &nbsp;&rarr;
              </a>
            </Reveal>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-1 gap-10 md:mt-40 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-7">
            <Reveal>
              <ParallaxImage
                src={aboutImg}
                alt="Designer draping fabric on a mannequin in a sunlit atelier"
                className="h-[44vh] w-full md:h-[64vh]"
              />
            </Reveal>
          </div>
          <div className="md:col-span-4 md:col-start-9 md:self-center">
            <Reveal delay={100}>
              <p className="display text-[1.5rem] leading-[1.25] md:text-[2rem]">
                Fashion as communication. Fashion as confidence. Fashion as impact.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

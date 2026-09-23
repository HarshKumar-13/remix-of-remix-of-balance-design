import { useEffect, useRef, useState } from "react";

import { LogoMark } from "./LogoMark";
import { Reveal } from "./Reveal";

import w1 from "@/assets/Picture8.jpg";
import w2 from "@/assets/Picture14.jpg";
import w3 from "@/assets/Picture18.jpg";
import w4 from "@/assets/Picture6.jpg";

function Parallax({
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
        className="h-full w-full scale-[1.12] object-cover"
        style={{ transform: `translate3d(0, ${offset}px, 0) scale(1.12)` }}
      />
    </div>
  );
}

export function SelectedWork() {
  return (
    <section id="work" className="border-t border-border py-24 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <Reveal>
          <LogoMark className="mb-8 md:mx-0" />
        </Reveal>
        <Reveal delay={60}>
          <p className="label-xs text-muted-foreground">Selected work</p>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="display mt-6 max-w-3xl text-[2.5rem] leading-[0.95] sm:text-6xl md:text-[5rem]">
            Consultancy, seen through the work.
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-12 md:mt-24">
          <div className="sm:col-span-7">
            <Reveal>
              <Parallax
                src={w1}
                alt="Trend forecasting board with seasonal colour and material story"
                className="h-[46vh] md:h-[72vh]"
              />
              <p className="label-xs mt-4 text-muted-foreground">
                Trend Forecasting &amp; Line Presentation
              </p>
            </Reveal>
          </div>

          <div className="sm:col-span-5 sm:self-end">
            <Reveal delay={100}>
              <Parallax
                src={w2}
                alt="Uniform print development with matching footwear and accessory studies"
                speed={0.1}
                className="h-[34vh] md:h-[48vh]"
              />
              <p className="label-xs mt-4 text-muted-foreground">Uniform Design</p>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-10 max-w-sm text-lg leading-relaxed text-muted-foreground">
                Work developed for apparel brands, hospitality and institutions — including MAX
                Fashion, Van Heusen, Raymond, IIM Bangalore, ISB, Leela Palace Bangalore and Taj
                Palace, New Delhi.
              </p>
            </Reveal>
          </div>

          <div className="sm:col-span-4 sm:col-start-2">
            <Reveal>
              <Parallax
                src={w3}
                alt="Streetwear graphic library and colour palette development"
                speed={0.08}
                className="h-[32vh] md:h-[44vh]"
              />
              <p className="label-xs mt-4 text-muted-foreground">Graphic &amp; T-Shirt Design</p>
            </Reveal>
          </div>

          <div className="sm:col-span-6 sm:col-start-7">
            <Reveal delay={100}>
              <Parallax
                src={w4}
                alt="Balance Design consultant leading a corporate image workshop"
                className="h-[40vh] md:h-[58vh]"
              />
              <p className="label-xs mt-4 text-muted-foreground">Corporate Image Consulting</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

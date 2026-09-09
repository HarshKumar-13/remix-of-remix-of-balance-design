import { useEffect, useRef, useState } from "react";

import { LogoMark } from "./LogoMark";
import { Reveal } from "./Reveal";
import type { Slide } from "./EditorialCarousel";

export type Service = {
  label: string;
  headline: string;
  description: string;
  cta: string;
  slides: Slide[];
};

/** A living editorial image: slow crossfade with a slight scale and drift. */
function LivingImage({ slides, active }: { slides: Slide[]; active: boolean }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (!active || slides.length < 2) return;
    const id = setInterval(() => setI((v) => (v + 1) % slides.length), 5200);
    return () => clearInterval(id);
  }, [active, slides.length]);

  return (
    <>
      {slides.map((s, n) => (
        <img
          key={s.src}
          src={s.src}
          alt={s.alt}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover will-change-transform"
          style={{
            opacity: active && n === i ? 1 : 0,
            transform: `scale(${active && n === i ? 1 : 1.06}) translate3d(0, ${active && n === i ? 0 : 1.5}%, 0)`,
            transition:
              "opacity 1.6s cubic-bezier(0.16, 1, 0.3, 1), transform 6s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />
      ))}
    </>
  );
}

export function ServicesSequence({ services }: { services: Service[] }) {
  const [active, setActive] = useState(0);
  const blocks = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const nodes = blocks.current.filter(Boolean) as HTMLDivElement[];
    if (!nodes.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const n = Number((e.target as HTMLElement).dataset["index"]);
            if (!Number.isNaN(n)) setActive(n);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [services.length]);

  return (
    <section id="services" className="relative bg-background">
      <div className="mx-auto max-w-7xl px-6 pt-28 md:px-12 md:pt-44">
        <Reveal>
          <LogoMark className="mb-8 md:mx-0" />
        </Reveal>
        <Reveal delay={60}>
          <p className="label-xs text-muted-foreground">Services</p>
        </Reveal>
        <Reveal delay={120}>
          <h2 className="display mt-6 max-w-3xl text-[2.5rem] leading-[0.95] sm:text-6xl md:text-[5rem]">
            Creating image, identity &amp; impact.
          </h2>
        </Reveal>
      </div>

      {/* Desktop: sticky image area, scrolling service content */}
      <div className="mx-auto hidden max-w-7xl gap-16 px-6 md:grid md:grid-cols-12 md:px-12">
        <div className="md:col-span-6">
          <div className="sticky top-0 flex h-[100svh] items-center">
            <div className="relative h-[74vh] w-full overflow-hidden bg-charcoal">
              {services.map((s, i) => (
                <LivingImage key={s.label} slides={s.slides} active={i === active} />
              ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-6">
          {services.map((s, i) => (
            <div
              key={s.label}
              data-index={i}
              ref={(el) => {
                blocks.current[i] = el;
              }}
              className="flex min-h-[100svh] flex-col justify-center py-24"
            >
              <div
                className="transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  opacity: i === active ? 1 : 0.18,
                  transform: i === active ? "none" : "translateY(18px)",
                }}
              >
                <p className="label-xs text-red">{s.label}</p>
                <h3 className="display mt-8 max-w-lg text-[2rem] leading-[1] sm:text-4xl md:text-[3.25rem]">
                  {s.headline}
                </h3>
                <p className="mt-8 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
                  {s.description}
                </p>
                <a href="#contact" className="label-xs link-underline mt-10 inline-block">
                  {s.cta} &nbsp;&rarr;
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: simplified stacked sequence */}
      <div className="md:hidden">
        {services.map((s) => (
          <div key={s.label} className="px-6 pb-20 pt-16">
            <Reveal>
              <div className="relative h-[58vh] w-full overflow-hidden bg-charcoal">
                <LivingImage slides={s.slides} active />
              </div>
            </Reveal>
            <Reveal delay={80}>
              <p className="label-xs mt-8 text-red">{s.label}</p>
            </Reveal>
            <Reveal delay={120}>
              <h3 className="display mt-5 text-[1.9rem] leading-[1.02]">{s.headline}</h3>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
            </Reveal>
            <Reveal delay={200}>
              <a href="#contact" className="label-xs link-underline mt-8 inline-block">
                {s.cta} &nbsp;&rarr;
              </a>
            </Reveal>
          </div>
        ))}
      </div>
    </section>
  );
}

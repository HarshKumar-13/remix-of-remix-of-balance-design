import { useEffect, useRef, useState } from "react";
import corpImg from "@/assets/Picture3.jpg.asset.json";
import corpImg2 from "@/assets/Picture7.jpg.asset.json";
import { LogoMark } from "./LogoMark";
import { Reveal } from "./Reveal";

const POINTS = [
  "Understanding and application of design tools such as lines, shapes, patterns, textures, color theory, and their impact on dressing.",
  "Understanding and applying the 'concept of focus' in apparel dressing, which brings out the visual impact to others.",
  "Evaluating and assessing ones physical features including body type and skin tone",
  "Creating wardrobes that enhance our strength areas and diminish our problem areas.",
];

function Heading() {
  return (
    <h2 className="display text-[2.5rem] leading-[0.95] sm:text-6xl md:text-[5.5rem]">
      Master the
      <br />
      right <span className="text-red">dress code</span>.
    </h2>
  );
}

function useActiveIndex(ref: React.RefObject<HTMLDivElement | null>, count: number) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) return;
      const p = Math.min(Math.max(-rect.top / total, 0), 0.9999);
      const next = Math.floor(p * count);
      setActive((prev) => (prev === next ? prev : next));
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref, count]);

  return active;
}

function PinnedSequence() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const active = useActiveIndex(wrapRef, POINTS.length);

  return (
    <div ref={wrapRef} className="relative hidden md:block" style={{ height: `${POINTS.length * 90 + 100}vh` }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-12">
          <div className="grid grid-cols-12 gap-16">
            <div className="col-span-6">
              <LogoMark className="mb-8 md:mx-0" />
              <Heading />
              <p className="mt-10 max-w-md text-lg leading-relaxed text-ivory/70 md:text-xl">
                Fashion as communication. Fashion as confidence. Fashion as impact.
              </p>
            </div>

            <div className="col-span-6 flex flex-col justify-center">
              <div className="relative min-h-[13rem]">
                {POINTS.map((p, i) => (
                  <p
                    key={p}
                    aria-hidden={i !== active}
                    className="absolute inset-x-0 top-0 text-3xl leading-[1.3] text-ivory/90 lg:text-[2.6rem] lg:leading-[1.25]"
                    style={{
                      opacity: i === active ? 1 : 0,
                      transform:
                        i === active
                          ? "translateY(0) scale(1)"
                          : `translateY(${i < active ? -32 : 32}px) scale(0.98)`,
                      transition:
                        "opacity 700ms cubic-bezier(0.16,1,0.3,1), transform 900ms cubic-bezier(0.16,1,0.3,1)",
                      pointerEvents: i === active ? "auto" : "none",
                    }}
                  >
                    {p}
                  </p>
                ))}
              </div>

              <div className="mt-16 flex items-center gap-6">
                <span className="text-sm tracking-[0.3em] text-ivory/50">
                  {String(active + 1).padStart(2, "0")} / {String(POINTS.length).padStart(2, "0")}
                </span>
                <div className="flex gap-3">
                  {POINTS.map((p, i) => (
                    <span
                      key={p}
                      className="h-[2px] w-10 transition-all duration-500"
                      style={{
                        backgroundColor: i === active ? "var(--color-red, #e2231a)" : "currentColor",
                        opacity: i === active ? 1 : 0.25,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StackedSequence() {
  return (
    <div className="mx-auto max-w-7xl px-6 md:hidden">
      <Reveal>
        <LogoMark className="mb-8 md:mx-0" />
      </Reveal>
      <Reveal delay={60}>
        <Heading />
      </Reveal>
      <Reveal delay={140}>
        <p className="mt-8 max-w-md text-lg leading-relaxed text-ivory/70">
          Fashion as communication. Fashion as confidence. Fashion as impact.
        </p>
      </Reveal>

      <div className="mt-14 space-y-16 border-t border-ivory/15 pt-10">
        {POINTS.map((p, i) => (
          <Reveal key={p}>
            <div>
              <span className="text-xs tracking-[0.3em] text-ivory/45">
                {String(i + 1).padStart(2, "0")} / {String(POINTS.length).padStart(2, "0")}
              </span>
              <p className="mt-4 text-2xl leading-[1.35] text-ivory/90">{p}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export function DressCode() {
  return (
    <section className="bg-charcoal py-24 text-ivory md:py-0">
      <PinnedSequence />
      <StackedSequence />

      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="mt-16 grid grid-cols-1 gap-6 pb-0 sm:grid-cols-12 md:mt-0 md:gap-8 md:pb-40 md:pt-8">
          <div className="sm:col-span-7">
            <Reveal>
              <div className="overflow-hidden">
                <img
                  src={corpImg.url}
                  alt="Balance Design dress code workshop in session with a corporate audience"
                  loading="lazy"
                  className="h-[42vh] w-full object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.04] md:h-[60vh]"
                />
              </div>
            </Reveal>
          </div>
          <div className="sm:col-span-5 sm:self-end">
            <Reveal delay={120}>
              <div className="overflow-hidden">
                <img
                  src={corpImg2.url}
                  alt="Participants working through a corporate image consulting exercise"
                  loading="lazy"
                  className="h-[32vh] w-full object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.04] md:h-[44vh]"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

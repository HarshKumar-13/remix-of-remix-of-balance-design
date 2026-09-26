import { useEffect, useState } from "react";

import upmaBurgundyPortrait from "@/assets/about-upma-burgundy.jpg";
import upmaCloseupPortrait from "@/assets/about-upma-closeup.jpg";
import upmaCoralPortrait from "@/assets/about-upma-coral.webp";
import upmaCouchPortrait from "@/assets/about-upma-couch.jpg";
import upmaGardenPortrait from "@/assets/about-upma-garden.jpg";
import upmaPolkaDotPortrait from "@/assets/about-upma-polka-dot.jpg";
import upmaRedPortrait from "@/assets/about-upma-red.jpg";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";

const PORTRAITS = [
  {
    src: upmaCoralPortrait,
    alt: "Upma Shrian seated on a teal bench in a coral outfit",
    position: "object-center",
  },
  {
    src: upmaBurgundyPortrait,
    alt: "Upma Shrian wearing a burgundy top and cream trousers",
    position: "object-[center_24%]",
  },
  {
    src: upmaRedPortrait,
    alt: "Upma Shrian wearing a red top and tartan trousers",
    position: "object-[center_24%]",
  },
  {
    src: upmaGardenPortrait,
    alt: "Upma Shrian seated outdoors in a patterned dress",
    position: "object-center",
  },
  {
    src: upmaCloseupPortrait,
    alt: "Close portrait of Upma Shrian wearing a burgundy top",
    position: "object-center",
  },
  {
    src: upmaPolkaDotPortrait,
    alt: "Upma Shrian seated in a red chair wearing a polka-dot top",
    position: "object-center",
  },
  {
    src: upmaCouchPortrait,
    alt: "Upma Shrian seated on a blue velvet sofa wearing a tan wrap dress",
    position: "object-top",
  },
];

const AUTOPLAY_MS = 2000;

export function AboutMe() {
  const [active, setActive] = useState(0);
  const [timerKey, setTimerKey] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const interval = window.setInterval(
      () => setActive((current) => (current + 1) % PORTRAITS.length),
      AUTOPLAY_MS,
    );
    return () => window.clearInterval(interval);
  }, [reducedMotion, timerKey]);

  const selectPortrait = (index: number) => {
    setActive(index);
    setTimerKey((key) => key + 1);
  };

  return (
    <section aria-labelledby="about-me-title" className="bg-background px-6 py-24 md:px-10 md:py-32 lg:px-12 lg:py-40">
      <div className="mx-auto grid max-w-[1500px] grid-cols-1 items-center gap-14 md:grid-cols-[minmax(0,28fr)_minmax(19rem,35fr)_minmax(0,28fr)] md:gap-8 lg:gap-14 xl:gap-20">
        <Reveal className="md:pr-2">
          <div className="mx-auto max-w-sm md:mx-0">
            <h2 id="about-me-title" className="display text-[2.5rem] leading-[1.03] uppercase sm:text-5xl md:text-[2.25rem] lg:text-[2.8rem]">
              About Me:
            </h2>
            <p className="mt-8 text-base leading-[1.75] text-muted-foreground lg:text-lg">
              With over twenty-eight years of experience in the fashion and apparel industry, I
              have specialized in defining design direction that aligns with business strategy and
              evolving consumer trends. I also impart training to enhance team performance in the
              Apparel and Fashion Industry.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120} className="mx-auto w-full max-w-[31rem]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-muted">
            {PORTRAITS.map((portrait, index) => (
              <img
                key={portrait.src}
                src={portrait.src}
                alt={portrait.alt}
                width={1200}
                height={1500}
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
                className={`absolute inset-0 h-full w-full object-cover ${portrait.position}`}
                style={{
                  opacity: active === index ? 1 : 0,
                  transform: reducedMotion ? undefined : `scale(${active === index ? 1 : 1.015})`,
                  transition: reducedMotion
                    ? "opacity 300ms ease"
                    : "opacity 1100ms cubic-bezier(0.16, 1, 0.3, 1), transform 1600ms cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              />
            ))}

            <div className="absolute inset-x-0 bottom-5 z-10 flex justify-center gap-3" aria-label="Choose portrait">
              {PORTRAITS.map((portrait, index) => (
                <Button
                  key={portrait.src}
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => selectPortrait(index)}
                  aria-label={`Show portrait ${index + 1}`}
                  aria-current={active === index ? "true" : undefined}
                  className="h-5 w-5 rounded-full p-0 hover:bg-primary-foreground/15"
                >
                  <span
                    className={`block h-2.5 w-2.5 rounded-full border border-primary-foreground transition-colors duration-500 ${
                      active === index ? "bg-primary-foreground" : "bg-foreground/20"
                    }`}
                  />
                </Button>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={240}>
          <div className="mx-auto max-w-sm text-left md:mx-0 md:text-center">
            <div aria-hidden="true" className="mx-auto mb-9 hidden w-16 flex-col items-center gap-2 text-border md:flex">
              <span className="h-12 w-px rotate-12 bg-border" />
              <span className="h-px w-10 -rotate-6 bg-border" />
              <span className="h-8 w-px -rotate-12 bg-border" />
            </div>
            <p className="text-base leading-[1.75] text-muted-foreground lg:text-lg">
              My mission is to transform creativity into measurable business impact. Whether it’s
              launching a new label, crafting consumer-centric brand stories, scaling design
              processes for growth, through directing design teams, or mentoring the next
              generation of fashion leaders.
            </p>
            <p
              aria-hidden="true"
              className="mt-10 text-right text-[2.75rem] leading-none text-foreground md:text-[3.25rem]"
              style={{ fontFamily: "'Mrs Saint Delafield', cursive" }}
            >
              Upma Shrian
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
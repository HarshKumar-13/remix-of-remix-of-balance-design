import { EditorialCarousel, type Slide } from "./EditorialCarousel";
import { LogoMark } from "./LogoMark";
import { Reveal } from "./Reveal";

let chapterCounter = 0;

export function ServiceChapter({
  label,
  headline,
  description,
  cta,
  slides,
  tall = false,
}: {
  label: string;
  headline: string;
  description: string;
  cta: string;
  slides: Slide[];
  tall?: boolean;
}) {
  chapterCounter += 1;
  const number = String(chapterCounter).padStart(2, "0");

  return (
    <section className="py-28 md:py-44">
      <div className="mx-auto max-w-4xl px-6 text-center md:px-12">
        <Reveal>
          <LogoMark className="mb-8" />
        </Reveal>
        <Reveal delay={80}>
          <p className="label-xs text-muted-foreground">
            {number} / {label}
          </p>
        </Reveal>
        <Reveal delay={120}>
          <h2 className="display mx-auto mt-8 max-w-3xl text-[2.25rem] leading-[0.95] sm:text-5xl md:text-[4.5rem]">
            {headline}
          </h2>
        </Reveal>
        <Reveal delay={180}>
          <p className="mx-auto mt-8 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
            {description}
          </p>
        </Reveal>
        <Reveal delay={240}>
          <a href="#contact" className="label-xs link-underline mt-10 inline-block">
            {cta} &nbsp;&rarr;
          </a>
        </Reveal>
      </div>

      <Reveal className="mt-16 md:mt-24">
        <EditorialCarousel slides={slides} tall={tall} />
      </Reveal>
    </section>
  );
}

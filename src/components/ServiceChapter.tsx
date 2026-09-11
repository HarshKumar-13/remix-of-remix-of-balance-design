import { EditorialCarousel, type Slide } from "./EditorialCarousel";
import { LogoMark } from "./LogoMark";
import { Reveal } from "./Reveal";

export function ServiceChapter({
  label,
  headline,
  description,
  cta,
  slides,
  tall = false,
  tone = "light",
}: {
  label: string;
  headline: string;
  description: string;
  cta: string;
  slides: Slide[];
  tall?: boolean;
  tone?: "red" | "light";
}) {
  return (
    <section
      className={`flex min-h-svh flex-col justify-center py-24 md:py-32 ${
        tone === "red" ? "service-red bg-[var(--red)] text-white" : ""
      }`}
    >
      <div className="mx-auto max-w-4xl px-6 text-center md:px-12">
        <Reveal>
          <LogoMark className="mb-8" />
        </Reveal>
        <Reveal delay={80}>
          <p className={`label-xs ${tone === "red" ? "text-white/75" : "text-muted-foreground"}`}>{label}</p>
        </Reveal>
        <Reveal delay={120}>
          <h2 className="display mx-auto mt-8 max-w-3xl text-[2.25rem] leading-[0.95] sm:text-5xl md:text-[4.5rem]">
            {headline}
          </h2>
        </Reveal>
        <Reveal delay={180}>
          <p className={`mx-auto mt-8 max-w-xl text-lg leading-relaxed md:text-xl ${tone === "red" ? "text-white/80" : "text-muted-foreground"}`}>
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

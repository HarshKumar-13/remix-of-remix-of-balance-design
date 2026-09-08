import aboutImg from "@/assets/about.jpg";
import aboutImg2 from "@/assets/pers-3.jpg";
import { LogoMark } from "./LogoMark";
import { Reveal } from "./Reveal";

export function AboutSection() {
  return (
    <section id="about" className="border-t border-border py-24 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-6">
            <Reveal>
              <LogoMark className="mb-8 md:mx-0" />
            </Reveal>
            <Reveal delay={80}>
              <h2 className="display text-accent text-[3rem] leading-[0.95] sm:text-6xl md:text-[6rem]">
                ABOUT US
              </h2>
            </Reveal>
          </div>

          <div className="md:col-span-6 md:pt-4">
            <Reveal delay={80}>
              <p className="max-w-xl text-sm leading-relaxed text-foreground md:text-base">
                Balance Design &amp; Fashion Consultancy works across fashion, image and design to
                help individuals, brands and organisations create a stronger and more meaningful
                visual expression.
              </p>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
                Our expertise spans corporate image consulting, personal image consulting, trend
                forecasting, line and range presentation, graphic design, uniform design and
                fashion experiences.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <a href="#contact" className="label-xs link-underline mt-10 inline-block">
                Get to know us &nbsp;&rarr;
              </a>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-12 md:mt-24 md:gap-8">
          <div className="sm:col-span-5 sm:col-start-3 sm:self-end">
            <Reveal>
              <div className="overflow-hidden">
                <img
                  src={aboutImg}
                  alt="Designer draping fabric on a mannequin in a sunlit atelier"
                  loading="lazy"
                  width={1200}
                  height={900}
                  className="h-[38vh] w-full object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.04] md:h-[46vh]"
                />
              </div>
            </Reveal>
          </div>
          <div className="sm:col-span-5">
            <Reveal delay={120}>
              <div className="overflow-hidden">
                <img
                  src={aboutImg2}
                  alt="Individual in a minimal monochrome outfit against a warm plaster wall"
                  loading="lazy"
                  width={1200}
                  height={1500}
                  className="h-[52vh] w-full object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.04] md:h-[70vh]"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

import corpImg from "@/assets/Picture3.jpg.asset.json";
import corpImg2 from "@/assets/Picture7.jpg.asset.json";
import { LogoMark } from "./LogoMark";
import { Reveal } from "./Reveal";

const POINTS = [
  "Represent yourself or your brand confidently through dressing.",
  "Feel comfortable representing your company.",
  "Feel powerful in professional attire.",
  "Understand the fashion do's and don'ts.",
  "Ensure your wardrobe reflects your professional success and stature.",
];

export function DressCode() {
  return (
    <section className="bg-charcoal text-ivory py-24 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <Reveal>
          <LogoMark className="mb-8 md:mx-0" />
        </Reveal>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-7">
            <Reveal delay={60}>
              <h2 className="display text-[2.5rem] leading-[0.95] sm:text-6xl md:text-[5.5rem]">
                Master the
                <br />
                right <span className="text-red">dress code</span>.
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-10 max-w-md text-sm leading-relaxed text-ivory/70 md:text-base">
                Fashion as communication. Fashion as confidence. Fashion as impact.
              </p>
            </Reveal>
          </div>

          <div className="md:col-span-5 md:pt-6">
            <ul className="space-y-6 border-t border-ivory/15 pt-8">
              {POINTS.map((p, i) => (
                <Reveal key={p} delay={80 + i * 60}>
                  <li className="flex gap-5 text-sm leading-relaxed text-ivory/85">
                    <span className="mt-[0.55em] block h-[5px] w-[5px] shrink-0 rotate-45 bg-red" />
                    {p}
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-12 md:mt-24 md:gap-8">
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

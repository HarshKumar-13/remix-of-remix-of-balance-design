import { Reveal } from "./Reveal";

const QUESTIONS = [
  "Do you represent yourself or your brand and come out as a confident personality by way of your dressing up?",
  "Are you comfortable in being yourself, as you represent your company?",
  "Do you feel powerful in your attire, as you rub shoulders with the top brass of various segments of your industry?",
  "Are you aware of Fashion's do's and don't s as you meet your clients and alliances worldwide?",
  "Do you feel your wardrobe represents your professional success and stature?",
];

const RESULTS = [
  "Clarity to for a lifetime :on what to pick up, for one\u2019s body type and skin tone. One picks up a wider range of products which one was reluctant to try earlier.",
  "Get the exposure to new fits, colours, styles, patterns and silhouettes that most importantly work for you.",
  "Gets aware of which trends to pick up and which ones to drop",
];

export function ServicesPurpose({ image }: { image?: { src: string; alt: string } }) {
  return (
    <div className="px-6 pb-28 md:px-12 md:pb-40">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-6">
            <Reveal>
              <p className="label-xs text-muted-foreground">
                THE PURPOSE OF THE STYLING WORKSHOPS:(B,C,D):
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h3 className="display mt-8 max-w-xl text-[2.25rem] leading-[1] md:text-[3.25rem]">
                lies in the answers of the following questions, we confront quite often:
              </h3>
            </Reveal>
            {image && (
              <Reveal delay={140}>
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  decoding="async"
                  className="mt-12 aspect-[4/3] w-full object-cover"
                />
              </Reveal>
            )}
          </div>

          <div className="md:col-span-6 md:pt-24">
            <ul className="space-y-8 border-t border-foreground/15 pt-8">
              {QUESTIONS.map((q, i) => (
                <Reveal key={q} delay={i * 60}>
                  <li className="flex gap-4 text-lg leading-relaxed text-muted-foreground md:text-xl">
                    <span aria-hidden className="text-[var(--red)]">&#10151;</span>
                    <span>{q}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-28 grid gap-16 md:mt-40 md:grid-cols-12">
          <div className="md:col-span-5">
            <Reveal>
              <p className="label-xs text-muted-foreground">RESULTS</p>
            </Reveal>
            <Reveal delay={80}>
              <h3 className="display mt-8 max-w-md text-[2rem] leading-[1.05] md:text-[2.75rem]">
                To transform the way we dress up such that our visual impact is more powerful and
                confident.
              </h3>
            </Reveal>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <ul className="space-y-8 border-t border-foreground/15 pt-8">
              {RESULTS.map((r, i) => (
                <Reveal key={r} delay={i * 60}>
                  <li className="flex gap-4 text-lg leading-relaxed text-muted-foreground md:text-xl">
                    <span aria-hidden className="text-[var(--red)]">&#10151;</span>
                    <span>{r}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>

        <Reveal>
          <blockquote className="display mx-auto mt-28 max-w-4xl text-center text-[1.85rem] leading-[1.15] md:mt-40 md:text-[3rem]">
            I transform professionals inside out, by aligning their personal style with a mindset
            that radiates self confidence and earns respect in every room.
          </blockquote>
        </Reveal>
      </div>
    </div>
  );
}

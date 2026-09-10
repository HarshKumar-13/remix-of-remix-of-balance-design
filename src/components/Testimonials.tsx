import { useEffect, useState } from "react";

import { LogoMark } from "./LogoMark";
import { Reveal } from "./Reveal";

// Demo entries — replace with client-approved testimonials when available.
const QUOTES = [
  {
    quote:
      "The session brought clarity and confidence to how our leadership team presents itself. Every recommendation felt considered, practical and true to our culture.",
    name: "Ananya Mehta",
    role: "People Director, Meridian Group",
  },
  {
    quote:
      "Balance translated our brand values into a uniform direction that feels distinctive, elegant and genuinely comfortable for our team.",
    name: "Rohan Kapoor",
    role: "Brand Lead, North & Co.",
  },
  {
    quote:
      "The trend presentation was insightful and commercially relevant. It gave our design team a focused point of view for the season ahead.",
    name: "Mira Shah",
    role: "Creative Head, Atelier Nine",
  },
];

export function Testimonials() {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((v) => (v + 1) % QUOTES.length), 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="border-t border-border py-24 md:py-40">
      <div className="mx-auto max-w-5xl px-6 md:px-12">
        <Reveal>
          <LogoMark className="mb-10" />
        </Reveal>

        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
            style={{ transform: `translate3d(-${i * 100}%, 0, 0)` }}
          >
            {QUOTES.map((testimonial) => (
              <article
                key={testimonial.name}
                className="min-h-[16rem] w-full shrink-0 text-center"
              >
                <blockquote className="display mx-auto max-w-3xl text-[1.75rem] leading-[1.2] sm:text-4xl md:text-[3rem]">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <p className="label-xs mt-10">{testimonial.name}</p>
                <p className="mt-3 text-lg text-muted-foreground">{testimonial.role}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

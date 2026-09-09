import { useEffect, useState } from "react";

import { LogoMark } from "./LogoMark";
import { Reveal } from "./Reveal";

// Placeholder entries — replace with real, client-approved testimonials.
const QUOTES = [
  {
    quote: "Testimonial copy to be supplied by the client.",
    name: "Client name",
    role: "Designation, Organisation",
  },
  {
    quote: "Testimonial copy to be supplied by the client.",
    name: "Client name",
    role: "Designation, Organisation",
  },
  {
    quote: "Testimonial copy to be supplied by the client.",
    name: "Client name",
    role: "Designation, Organisation",
  },
];

export function Testimonials() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % QUOTES.length), 6000);
    return () => clearInterval(id);
  }, []);

  const active = QUOTES[i]!;

  return (
    <section className="border-t border-border py-24 md:py-40">
      <div className="mx-auto max-w-5xl px-6 md:px-12">
        <Reveal>
          <LogoMark className="mb-10" />
        </Reveal>

        <div className="min-h-[16rem] text-center">
          <blockquote
            key={i}
            className="display mx-auto max-w-3xl text-[1.75rem] leading-[1.2] transition-opacity duration-700 sm:text-4xl md:text-[3rem]"
          >
            &ldquo;{active.quote}&rdquo;
          </blockquote>
          <p className="label-xs mt-10">{active.name}</p>
          <p className="mt-3 text-lg text-muted-foreground">{active.role}</p>
        </div>

        <div className="mt-12 flex justify-center gap-4">
          {QUOTES.map((_, n) => (
            <button
              key={n}
              aria-label={`Show testimonial ${n + 1}`}
              onClick={() => setI(n)}
              className={`h-[7px] w-[7px] rotate-45 transition-colors duration-500 ${
                n === i ? "bg-red" : "bg-border"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

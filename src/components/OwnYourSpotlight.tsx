import { useEffect, useState } from "react";

import { Reveal } from "@/components/Reveal";

import s1 from "@/assets/oys-home-1.jpeg";
import s2 from "@/assets/oys-home-2.jpeg";
import s3 from "@/assets/oys-home-3.jpeg";
import s4 from "@/assets/oys-home-4.jpeg";
import s5 from "@/assets/oys-home-5.jpeg";
import s6 from "@/assets/oys-home-6.jpeg";

const SLIDES = [s1, s2, s3, s4, s5, s6];

export function OwnYourSpotlight() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % SLIDES.length), 2000);
    return () => clearInterval(t);
  }, []);
  return (
    <section
      aria-labelledby="own-your-spotlight-title"
      className="bg-background px-6 py-16 sm:py-20 md:px-12 md:py-24"
    >
      <div className="mx-auto max-w-[1500px]">
        <div className="flex flex-col items-center gap-10 text-center">
          <div>
            <Reveal>
              <p className="label-xs font-semibold text-muted-foreground">
                Design Workshops &amp; Seminars
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h2
                id="own-your-spotlight-title"
                className="display mt-6 text-[2.4rem] leading-[1.02] uppercase sm:text-6xl md:text-[4.6rem]"
              >
                <span className="text-primary">Own</span> Your Spotlight
              </h2>
            </Reveal>
          </div>
          <div>
            <Reveal delay={160}>
              <p className="mx-auto max-w-2xl text-[calc(1.294rem+2px)] leading-relaxed md:text-[calc(1.4375rem+2px)] font-medium text-red">
                We coach professionals to look sharp and stylish, build self confidence and have a
                personality that is magnetic, as they meet and interact with world.
              </p>
            </Reveal>
          </div>
        </div>

        <Reveal delay={200}>
          <div className="relative mt-10 aspect-[16/10] overflow-hidden bg-foreground sm:aspect-[3/2] md:mt-14 md:aspect-[16/9]">
            {SLIDES.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={i === idx ? "Own Your Spotlight online coaching session" : ""}
                aria-hidden={i !== idx}
                className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-1000 ease-in-out md:object-cover ${i === idx ? "opacity-100" : "opacity-0"}`}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
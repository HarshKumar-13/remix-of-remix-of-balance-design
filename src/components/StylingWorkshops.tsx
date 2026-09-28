import { useEffect, useState } from "react";

import { Reveal } from "@/components/Reveal";

import daw1 from "@/assets/daw-1.jpeg";
import daw2 from "@/assets/daw-2.jpeg";
import daw3 from "@/assets/daw-3.jpeg";
import daw4 from "@/assets/daw-4.jpeg";
import daw5 from "@/assets/daw-5.jpeg";

const FILM = [
  { src: daw1, alt: "Workshop audience learning about the complementary colour scheme" },
  { src: daw2, alt: "Participants seated along long tables watching a presentation" },
  { src: daw3, alt: "Facilitator addressing a styling workshop in a studio classroom" },
  { src: daw4, alt: "Workshop audience watching a video presentation" },
  { src: daw5, alt: "Facilitator speaking with engaged workshop participants" },
];

const FRAME_MS = 2000;

export function StylingWorkshops() {
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(
      () => setActive((i) => (i + 1) % FILM.length),
      FRAME_MS,
    );
    return () => window.clearInterval(id);
  }, [reduced]);

  return (
    <section
      aria-label="Design Aesthetics and Styling Workshops"
      className="bg-background px-6 py-24 md:px-12 md:py-36"
    >
      <div className="mx-auto max-w-[1500px]">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Reveal>
              <p className="label-xs text-muted-foreground">
                Design Workshops &amp; Seminars
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="display mt-6 text-[2.4rem] leading-[1.02] uppercase sm:text-6xl md:text-[4.6rem]">
                <span className="text-primary">Design Aesthetics</span> &amp; Styling Workshops
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-5">
            <Reveal delay={160}>
              <p className="max-w-md text-lg leading-relaxed text-muted-foreground md:ml-auto md:text-xl">
                For constant exposure and growth of internal teams, we design
                workshops to raise the quality of team productivity to a new
                level. for TEAMS of fashion and retail Brands.like VM and floor
                sales teams.
              </p>
            </Reveal>
          </div>
        </div>

        <Reveal delay={200}>
          <div className="relative mt-14 aspect-[4/5] overflow-hidden sm:aspect-[3/2] md:mt-20 md:aspect-[16/9]">
            {FILM.map((img, i) => {
              const isActive = i === active;
              return (
                <img
                  key={img.src}
                  src={img.src}
                  alt={img.alt}
                  width={1920}
                  height={1280}
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover will-change-transform"
                  style={{
                    opacity: isActive ? 1 : 0,
                    transform: reduced
                      ? undefined
                      : `scale(${isActive ? 1.06 : 1})`,
                    transition: reduced
                      ? "opacity 0.8s ease"
                      : "opacity 1.8s ease-in-out, transform 6.5s ease-out",
                    zIndex: isActive ? 2 : 1,
                  }}
                />
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

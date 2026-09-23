import { Reveal } from "@/components/Reveal";

import spotlightVideo from "@/assets/own-your-spotlight.webm";

export function OwnYourSpotlight() {
  return (
    <section
      aria-labelledby="own-your-spotlight-title"
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
              <h2
                id="own-your-spotlight-title"
                className="display mt-6 text-[2.4rem] leading-[1.02] uppercase sm:text-6xl md:text-[4.6rem]"
              >
                Own Your Spotlight
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-5">
            <Reveal delay={160}>
              <p className="max-w-md text-lg leading-relaxed text-muted-foreground md:ml-auto md:text-xl">
                We coach professionals to look sharp and stylish, build self confidence and have a
                personality that is magnetic, as they meet and interact with world.
              </p>
            </Reveal>
          </div>
        </div>

        <Reveal delay={200}>
          <div className="relative mt-14 aspect-[4/5] overflow-hidden sm:aspect-[3/2] md:mt-20 md:aspect-[16/9]">
            <video
              className="h-full w-full object-cover"
              src={spotlightVideo}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="Own Your Spotlight coaching session"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
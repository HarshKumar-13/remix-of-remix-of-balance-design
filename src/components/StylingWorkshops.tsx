import { Reveal } from "@/components/Reveal";
import { CurvedSlider } from "@/components/CurvedSlider";
import { BookWorkshopCta } from "@/components/BookWorkshopCta";
import { RotatingPoints } from "@/components/RotatingPoints";

import daw1 from "@/assets/daw-1.jpeg";
import daw2 from "@/assets/daw-2.jpeg";
import daw3 from "@/assets/daw-3.jpeg";
import daw4 from "@/assets/daw-4.jpeg";
import daw5 from "@/assets/daw-5.jpeg";
import dawNew1 from "@/assets/daw-new-1.jpg";
import dawNew2 from "@/assets/daw-new-2.jpg";
import dawNew3 from "@/assets/daw-new-3.jpg";
import dawNew4 from "@/assets/daw-new-4.jpg";


const FILM = [
  { src: daw1, alt: "Workshop audience learning about the complementary colour scheme" },
  { src: daw2, alt: "Participants seated along long tables watching a presentation" },
  { src: daw3, alt: "Facilitator addressing a styling workshop in a studio classroom" },
  { src: daw4, alt: "Workshop audience watching a video presentation" },
  { src: daw5, alt: "Facilitator speaking with engaged workshop participants" },
  { src: dawNew1, alt: "Retail team seated around long tables at a workshop" },
  { src: dawNew2, alt: "Team members attending a workshop session" },
  { src: dawNew3, alt: "Facilitator addressing a retail team workshop" },
  { src: dawNew4, alt: "Team watching a styling presentation on screen" },
];

export function StylingWorkshops() {
  return (
    <section
      aria-label="Design Aesthetics and Styling Workshops"
      className="bg-background px-6 py-16 sm:py-20 md:px-12 md:py-24"
    >
      <div className="mx-auto max-w-[1500px]">
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <p className="label-xs font-semibold text-muted-foreground">
              Design Workshops &amp; Seminars
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="display mx-auto mt-6 max-w-5xl text-[2.4rem] leading-[1.02] uppercase sm:text-6xl md:text-[4.6rem]">
              <span className="text-primary">Design Aesthetics</span> &amp; Styling Workshops
            </h2>
          </Reveal>
          <RotatingPoints />
          <Reveal delay={160}>
            <p className="mx-auto mt-8 max-w-5xl text-balance text-center text-[calc(1.294rem+2px)] font-medium leading-relaxed text-red md:text-[calc(1.4375rem+2px)]">
              For <span className="font-medium">TEAMS</span> of fashion and retail brands.
              <br className="hidden md:inline" />{" "}
              For <span className="font-medium">Visual Merchandising teams</span>, such that the retail space
              <br className="hidden md:inline" />{" "}
              look more attractive to shop &amp; experience.
              <br className="hidden md:inline" />{" "}
              For <span className="font-medium">Sales team</span> such that they become stylists
              <br className="hidden md:inline" />{" "}
              for the customers and guide them as they shop.
            </p>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <div className="relative left-1/2 mt-10 w-screen -translate-x-1/2 md:mt-14">
            <CurvedSlider images={FILM} />
          </div>
        </Reveal>

        <Reveal delay={260}>
          <BookWorkshopCta />
        </Reveal>
      </div>
    </section>
  );
}

import { Reveal } from "@/components/Reveal";
import { CurvedSlider } from "@/components/CurvedSlider";

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

export function StylingWorkshops() {
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
              <p className="max-w-md text-[calc(1.125rem+2px)] leading-relaxed text-muted-foreground md:ml-auto md:text-[calc(1.25rem+2px)]">
                or TEAMS of fashion and retail brands.
                <br />
                <br />
                *for VM teams, such that the retail stores look more attractive to shop
                <br />
                <br />
                *for &ldquo;sales team&rdquo; such that they become stylists for the customers and guide them as they shop.
              </p>
            </Reveal>
          </div>
        </div>

        <Reveal delay={200}>
          <div className="-mx-6 mt-14 md:-mx-12 md:mt-20">
            <CurvedSlider images={FILM} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

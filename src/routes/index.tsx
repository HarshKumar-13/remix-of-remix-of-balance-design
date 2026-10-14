import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState } from "react";

import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";
import { LogoIntro } from "@/components/LogoIntro";
import { Reveal } from "@/components/Reveal";
import { LogoMark } from "@/components/LogoMark";
// import { AboutSection } from "@/components/AboutSection"; // section hidden on request — component kept
import { Testimonials } from "@/components/Testimonials";
import { CtaSection } from "@/components/CtaSection";
import { SiteFooter } from "@/components/SiteFooter";
import { ScrollStory, StoryScene } from "@/components/ScrollStory";
import { SlideStack, SlidePanel } from "@/components/SlideStack";
import { StylingWorkshops } from "@/components/StylingWorkshops";
import { BookWorkshopCta } from "@/components/BookWorkshopCta";
import { CorporateImageConsulting } from "@/components/CorporateImageConsulting";
import { PersonalImageConsulting } from "@/components/PersonalImageConsulting";
import { OwnYourSpotlight } from "@/components/OwnYourSpotlight";
import { RedEditorialService } from "@/components/RedEditorialService";
import { AboutMe } from "@/components/AboutMe";


import trend1 from "@/assets/Picture8.jpg";
import trend2 from "@/assets/Picture9.jpg";
import trend3 from "@/assets/Picture10.jpg";
import trend4 from "@/assets/Picture11.gif";
import trendScrapbook from "@/assets/trend-scrapbook.jpeg";
import trendReworked from "@/assets/trend-reworked.jpeg";
import trendAbstract from "@/assets/trend-abstract-prints.jpeg";
import trendFolksy from "@/assets/trend-folksy.jpeg";
import trend1606 from "@/assets/trend-1606.jpg";
import trend1607 from "@/assets/trend-1607.jpg";
import trend1612 from "@/assets/trend-1612.jpg";
import trend1613 from "@/assets/trend-1613.jpg";
import trend1614 from "@/assets/trend-1614.jpg";
import trend1615 from "@/assets/trend-1615.jpg";
import trend1616 from "@/assets/trend-1616.jpg";
import trend1629 from "@/assets/hero-1629.jpg";
import trend1630 from "@/assets/hero-1630.jpg";
import trend1631 from "@/assets/hero-1631.jpg";
import graphic1Asset from "@/assets/graphic-1.jpg";
import graphic2Asset from "@/assets/graphic-2.jpg";
import graphic3Asset from "@/assets/graphic-3.jpg";
import graphic4Asset from "@/assets/graphic-4.jpg";
import graphic5Asset from "@/assets/graphic-5.jpg";
import graphic6Asset from "@/assets/graphic-6.jpg";
import graphic7Asset from "@/assets/graphic-7.jpg";
import graphic8Asset from "@/assets/graphic-8.jpg";
import graphic9Asset from "@/assets/graphic-9.jpg";
import { CurvedSlider } from "@/components/CurvedSlider";
import dws1 from "@/assets/dws-1.jpg";
import dws2 from "@/assets/dws-2.jpg";
import dws3 from "@/assets/dws-3.jpg";
import dws4 from "@/assets/dws-4.jpg";
import dws5 from "@/assets/dws-5.jpg";
import dws6 from "@/assets/dws-6.jpg";
import dws7 from "@/assets/dws-7.jpg";
import dws8 from "@/assets/dws-8.jpg";
import dws9 from "@/assets/dws-9.jpg";

const WORKSHOP_IMAGES = [
  { src: dws1, alt: "Workshop in a warm conference room" },
  { src: dws2, alt: "Style workshop body shapes demonstration" },
  { src: dws3, alt: "Audience watching a colour theory presentation" },
  { src: dws4, alt: "Facilitator speaking in front of the stage" },
  { src: dws5, alt: "Participants exploring colour material at Max" },
  { src: dws6, alt: "Session at ORRA Fine Jewellery" },
  { src: dws7, alt: "Audience at ORRA Fine Jewellery session" },
  { src: dws8, alt: "Participants applauding at Max workshop" },
  { src: dws9, alt: "Master the Right Dress Code seminar" },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Balance Design & Fashion Consultancy | Image, Identity, Impact" },
      {
        name: "description",
        content:
          "Balance Design brings fashion, image and design together — corporate and personal image consulting, trend forecasting, graphic, uniform design.",
      },
      { property: "og:title", content: "Balance Design & Fashion Consultancy" },
      {
        property: "og:description",
        content:
          "Fashion, image and design brought together to create powerful expressions for individuals, brands and organisations.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const TREND_IMAGES = [
  { src: trend1606, alt: "Night Sparkles Girls 9-14 yrs trend board with kaleidoscopic mosaic prints" },
  { src: trend1607, alt: "Multi-colour stripes trend board with knitwear and digital prints" },
  { src: trend1612, alt: "Assembling Girls 2-8 yrs folk theme trend board with Pantone palette" },
  { src: trend1613, alt: "Fusion of art and craft trend board with crochet bags and folk motifs" },
  { src: trend1614, alt: "Scrapbook Boys 2-8 yrs trend board with illustration and Pantone palette" },
  { src: trend1615, alt: "Fabrics and Prints board with graphic tees, stripes and overlapped prints" },
  { src: trend1616, alt: "Boys outerwear and shirt CAD flats board with Pantone palette" },
  { src: trend1629, alt: "Illusive — Tweens Girls board, model in black lace body paint with 'Which is the real skin'" },
  { src: trend1630, alt: "Black and white ornamental geometric print board" },
  { src: trend1631, alt: "Prints board with four illustrated figures in swirling retro prints" },
];

const GRAPHIC_IMAGES = [
  { src: graphic1Asset, alt: "Infants/Toddlers A/W 09-10 theme board with cow illustration on red" },
  { src: graphic2Asset, alt: "Infants/Toddlers boys mood board with giraffe, cow and dragonfly illustrations and Pantone colour chips" },
  { src: graphic3Asset, alt: "Infants/Toddlers girls mood board with bunny, birds, trees and fabric print tiles" },
  { src: graphic4Asset, alt: "Fabrics and Prints board with kidswear cargo pants, graphic tees and striped shorts" },
  { src: graphic5Asset, alt: "Abstract Prints board of circular kaleidoscopic textile prints" },
  { src: graphic6Asset, alt: "Child-inspired psychedelic pattern board with mosaic florals and overlapping circles" },
  { src: graphic7Asset, alt: "Geometric print board beside pink embroidered slip-on shoes" },
  { src: graphic8Asset, alt: "Prints board with repeating black-and-white geometric mandala pattern" },
  { src: graphic9Asset, alt: "Prints board with four fashion figures in patterned maxi dresses" },
];


function Index() {
  const [introComplete, setIntroComplete] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const revealHero = useCallback(() => {}, []);
  const finishIntro = useCallback(() => setIntroComplete(true), []);
  const doneIntro = useCallback(() => setIntroDone(true), []);

  return (
    <main>
      <LogoIntro onReveal={revealHero} onComplete={finishIntro} onFinish={doneIntro} />
      <div className="relative z-10 bg-background">
        <SiteHeader introComplete={introComplete} logoVisible={introDone} />
        <Hero />
        <ScrollStory>
          <SlideStack>
            <SlidePanel>
            <section
              id="services"
              tabIndex={-1}
              className="px-6 pt-20 pb-14 text-center sm:pt-24 sm:pb-12 md:px-12 md:pt-32 md:pb-16"
            >
              <Reveal>
                <LogoMark className="mb-8" />
              </Reveal>
              <Reveal delay={80}>
                <h2 className="display mx-auto mt-8 max-w-4xl text-[2.5rem] sm:text-6xl md:text-[5rem]">
                  Design workshops &amp; seminars
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="mx-auto mt-10 max-w-5xl text-[calc(1.294rem+2px)] font-medium leading-relaxed text-red md:text-[calc(1.4375rem+2px)]">
                  Are conducted For TEAMS of Apparel and Fashion Brands
                  <br />
                  in areas of <span className="font-medium">Design Aesthetics, Fashion Styling and Trend Forecasting</span>.
                </p>
              </Reveal>
              <Reveal delay={200}>
                <div className="-mx-6 mt-10 md:-mx-12 md:mt-14">
                  <CurvedSlider images={WORKSHOP_IMAGES} contain />
                </div>
              </Reveal>
              <Reveal delay={260}>
                <BookWorkshopCta className="mt-4 md:mt-6" />
              </Reveal>
            </section>
          </SlidePanel>
          </SlideStack>

          <StylingWorkshops />

          <CorporateImageConsulting />

          <PersonalImageConsulting />

          <OwnYourSpotlight />

          <section id="services-story" className="relative bg-background">
            <RedEditorialService
              headline={
                <>
                  <span className="text-red">Trend Forecasting</span> &amp;
                  <br />
                  Line Presentation
                </>
              }
              description="Filtering the global fashion picture and anticipating what customers will be ready to embrace in upcoming seasons. Tracking trends and interpreting those trends for the company's target market. Balancing a product line by including a range of seasonal & staple styles, fashions & basic styles and setting the width & depth of the collection with reference to the brand image, price points, size range, style, colous and previous season sales record."
              images={TREND_IMAGES}
              imageFit="contain"
              wideDescription
            />
            <RedEditorialService
              sectionLabel="Graphic & Print Design"
              headline={
                <>
                  <span className="text-red">Graphic &amp;</span>
                  <br />
                  Print Design
                </>
              }
              description="We do CAD'S for shirts, graphic design for T-shirts and textile print design"
              images={GRAPHIC_IMAGES}
              imageFit="contain"
            />
          </section>

          {/* About Balance Design section hidden on request — component kept in src/components/AboutSection.tsx
          <StoryScene>
            <AboutSection />
          </StoryScene>
          */}

          <AboutMe />
          <StoryScene className="story-scene-testimonials">
            <Testimonials />
          </StoryScene>
          <StoryScene className="story-scene-final">
            <CtaSection />
          </StoryScene>
        </ScrollStory>
      </div>
      <SiteFooter />
    </main>
  );
}


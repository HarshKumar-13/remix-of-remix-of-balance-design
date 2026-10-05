import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useState } from "react";

import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";
import { LogoIntro } from "@/components/LogoIntro";
import { Reveal } from "@/components/Reveal";
import { LogoMark } from "@/components/LogoMark";
import { AboutSection } from "@/components/AboutSection";
import { DressCode } from "@/components/DressCode";
import { Testimonials } from "@/components/Testimonials";
import { CtaSection } from "@/components/CtaSection";
import { SiteFooter } from "@/components/SiteFooter";
import { ScrollStory, StoryScene } from "@/components/ScrollStory";
import { SlideStack, SlidePanel } from "@/components/SlideStack";
import { StylingWorkshops } from "@/components/StylingWorkshops";
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
import graphic1Asset from "@/assets/graphic-1.jpeg";
import graphic2Asset from "@/assets/graphic-2.jpeg";

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
  { src: trend1, alt: "Global Shopper trend board with travel-inspired colour and material story" },
  { src: trend2, alt: "Kidswear collage trend story with applique, patchwork and bold palette" },
  { src: trend3, alt: "Detail page of colour loops, patchwork and psychedelic prints" },
  { src: trend4, alt: "Polo solid style line sheet in Indigo / Global Shopper colourways" },
  { src: trendScrapbook, alt: "Boys 2-8 yrs Scrapbook trend page with illustration and Pantone palette" },
  { src: trendReworked, alt: "Reworked Boys 9-14 yrs trend page with felt textures, checks and Pantone palette" },
  { src: trendAbstract, alt: "Abstract Prints trend board with kaleidoscopic and circular motifs" },
  { src: trendFolksy, alt: "Folksy trend board with embroidered garment flats, knits, fringes and braids" },
];

const GRAPHIC_IMAGES = [
  { src: graphic1Asset, alt: "Boys' garment CAD flats range board" },
  { src: graphic2Asset, alt: "Super heroes boys 2-8 yrs theme board with Pantone colours" },
];


function Index() {
  const introComplete = true;

  return (
    <main>
      <div className="relative z-10 bg-background">
        <SiteHeader introComplete={introComplete} forceSolid />
        <ScrollStory>
          <SlideStack>
            <SlidePanel>
              <Hero introComplete={introComplete} />
            </SlidePanel>
            <SlidePanel>
            <section id="services" className="px-6 py-28 text-center md:px-12 md:py-44">
              <Reveal>
                <LogoMark className="mb-8" />
              </Reveal>
              <Reveal delay={80}>
                <h2 className="display mx-auto mt-8 max-w-4xl text-[2.5rem] sm:text-6xl md:text-[5rem]">
                  Design workshops &amp; seminars
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="mx-auto mt-10 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                  From fashion &amp; apparel workshops to corporate identity, Balance brings together
                  fashion, design and image consulting through specialised services for individuals,
                  brands and organisations.
                </p>
              </Reveal>
              <Reveal delay={220}>
                <Link
                  to="/services/fashion-apparel-workshops"
                  className="label-xs link-underline mt-10 inline-block text-foreground"
                >
                  Explore More &nbsp;&rarr;
                </Link>
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
              eyebrow="TREND FORECASTING & LINE PRESENTATION"
              headline={<>See what&rsquo;s next.<br />Design what&rsquo;s now.</>}
              description="Filtering the global fashion picture and anticipating what customers will be ready to embrace in upcoming seasons — then defining the individual styles or style groups needed to meet the business target."
              images={TREND_IMAGES}
            />
            <RedEditorialService
              eyebrow="GRAPHIC & PRINT DESIGN"
              headline={<>Graphic &amp;<br />Print Design</>}
              description="We do CAD'S for shirts, graphic design for T-shirts and textile print design — expressive directions that bring concepts, culture and visual identity into apparel"
              images={GRAPHIC_IMAGES}
              single
            />
          </section>

          <StoryScene>
            <AboutSection />
          </StoryScene>
          <StoryScene>
            <DressCode />
          </StoryScene>

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


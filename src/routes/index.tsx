import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useState } from "react";

import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";
import { LogoIntro } from "@/components/LogoIntro";
import { Reveal } from "@/components/Reveal";
import { LogoMark } from "@/components/LogoMark";
import { ServicesStory, type StoryService } from "@/components/ServicesStory";
import { ServicesPurpose } from "@/components/ServicesPurpose";
import { AboutSection } from "@/components/AboutSection";
import { DressCode } from "@/components/DressCode";
import { Testimonials } from "@/components/Testimonials";
import { CtaSection } from "@/components/CtaSection";
import { SiteFooter } from "@/components/SiteFooter";
import { ScrollStory, StoryScene } from "@/components/ScrollStory";
import { SlideStack, SlidePanel } from "@/components/SlideStack";


import corp1 from "@/assets/Picture6.jpg.asset.json";
import corp2 from "@/assets/Picture3.jpg.asset.json";
import corp3 from "@/assets/Picture4.jpg.asset.json";
import corp4 from "@/assets/Picture5.jpg.asset.json";
import corp5 from "@/assets/Picture7.jpg.asset.json";

import pers1 from "@/assets/pers-1.jpg";
import pers2 from "@/assets/pers-2.jpg";
import pers3 from "@/assets/pers-3.jpg";
import trend1 from "@/assets/Picture8.jpg.asset.json";
import trend2 from "@/assets/Picture9.jpg.asset.json";
import trend3 from "@/assets/Picture10.jpg.asset.json";
import trend4 from "@/assets/Picture11.gif.asset.json";
import trend5 from "@/assets/Picture12.gif.asset.json";
import graphic1Asset from "@/assets/Picture17.jpg.asset.json";
import graphic2Asset from "@/assets/Picture18.jpg.asset.json";
import graphic3Asset from "@/assets/Picture19.jpg.asset.json";
import uniform1 from "@/assets/Picture15.jpg.asset.json";
import uniform2 from "@/assets/Picture14.jpg.asset.json";
import uniform3 from "@/assets/Picture13.jpg.asset.json";

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

const SERVICES: StoryService[] = [
  {
    number: "01",
    title: "DESIGN WORKSHOPS & SEMINARS",
    items: [
      {
        title: "A) DESIGN AESTHETICS AND & STYLING WORKSHOPS",
        body: "for TEAMS of fashion and retail Brands.like VM and floor sales teams",
      },
      {
        title: "B) CORPORATE IMAGE CONSULTING",
        body: "we coach professionals to look sharp and stylish, build self confidence and have a personality that is magnetic, as they meet and interact with world.",
      },
      { title: "C) PERSONAL IMAGE CONSULTING" },
      {
        title: "D) OWN YOUR SPOTLIGHT",
        body: "we coach professionals to look sharp and stylish, build self confidence and have a personality that is magnetic, as they meet and interact with world.",
      },
    ],
    images: [
      { src: corp1.url, alt: "Balance Design consultant leading a corporate image workshop" },
      { src: corp2.url, alt: "Master the dress code corporate training session in progress" },
      { src: corp3.url, alt: "Corporate styling presentation to a seated audience" },
      { src: pers1, alt: "Personal styling session with a silk scarf in a warm ivory studio" },
      { src: pers3, alt: "Individual in a minimal monochrome outfit against a warm plaster wall" },
    ],
  },
  {
    number: "02",
    title: "TREND FORECASTING & LINE PRESENTATION",
    images: [
      { src: trend1.url, alt: "Global Shopper trend board with travel-inspired colour and material story" },
      { src: trend2.url, alt: "Kidswear collage trend story with applique, patchwork and bold palette" },
      { src: trend3.url, alt: "Detail page of colour loops, patchwork and psychedelic prints" },
      { src: trend4.url, alt: "Polo solid style line sheet in Indigo / Global Shopper colourways" },
    ],
  },
  {
    number: "03",
    title: "GRAPHIC & PRINT DESIGN",
    images: [
      { src: graphic1Asset.url, alt: "Tempt graphic tee development boards with Pantone colour story" },
      { src: graphic2Asset.url, alt: "Red Edge streetwear graphic library and colour palette" },
      { src: graphic3Asset.url, alt: "Womenswear graphic tee and knitwear range flats" },
    ],
  },
];


let hasCompletedHomeIntro = false;

function Index() {
  const [introComplete, setIntroComplete] = useState(hasCompletedHomeIntro);
  const completeIntro = useCallback(() => {
    hasCompletedHomeIntro = true;
    setIntroComplete(true);
  }, []);

  return (
    <main>
      {!introComplete && <LogoIntro onComplete={completeIntro} />}
      <div className="relative z-10 bg-background">
        <SiteHeader introComplete={introComplete} />
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
                <p className="label-xs text-[17px] text-muted-foreground">Fashion &amp; Apparel Workshops</p>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="display mx-auto mt-8 max-w-4xl text-[2.5rem] sm:text-6xl md:text-[5rem]">
                  Creating image, identity &amp; impact.
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

          <ServicesStory services={SERVICES}>
            <ServicesPurpose
              image={{
                src: corp4.url,
                alt: "Group photo of workshop participants with the Balance Design banner",
              }}
            />
          </ServicesStory>

          <StoryScene>
            <AboutSection />
          </StoryScene>
          <StoryScene>
            <DressCode />
          </StoryScene>
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


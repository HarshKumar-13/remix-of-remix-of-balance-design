import { createFileRoute } from "@tanstack/react-router";

import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";
import { ServicesSequence, type Service } from "@/components/ServicesSequence";
import { AboutSection } from "@/components/AboutSection";
import { LogoMarquee } from "@/components/LogoMarquee";
import { DressCode } from "@/components/DressCode";
import { SelectedWork } from "@/components/SelectedWork";
import { Testimonials } from "@/components/Testimonials";
import { CtaSection } from "@/components/CtaSection";
import { SiteFooter } from "@/components/SiteFooter";

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

const SERVICES: Service[] = [
  {
    label: "Corporate Image Consulting",
    headline: "How your people present your brand matters.",
    description:
      "Balance conducts training and workshops on dressing up for corporates — building a confident, professional and authentic image that aligns teams with the identity and values of their organisation.",
    cta: "Book an appointment",
    slides: [
      { src: corp1.url, alt: "Balance Design consultant leading a corporate image workshop" },
      { src: corp2.url, alt: "Master the dress code corporate training session in progress" },
      { src: corp3.url, alt: "Corporate styling presentation to a seated audience" },
      { src: corp4.url, alt: "Group photo of workshop participants with the Balance Design banner" },
      { src: corp5.url, alt: "Participants working through a corporate image consulting exercise" },
    ],
  },
  {
    label: "Personal Image Consulting",
    headline: "Your image is your personal signature.",
    description:
      "Clothing and dressing up is a powerful means of non-verbal communication. We help individuals express themselves through colour, styling and a wardrobe that reflects who they truly are.",
    cta: "Book an appointment",
    slides: [
      { src: pers1, alt: "Personal styling session with a silk scarf in a warm ivory studio" },
      { src: pers2, alt: "Draped fabric swatches in ivory, camel and bronze tones" },
      { src: pers3, alt: "Individual in a minimal monochrome outfit against a warm plaster wall" },
    ],
  },
  {
    label: "Trend Forecasting & Line Presentation",
    headline: "See what's next. Design what's now.",
    description:
      "Filtering the global fashion picture and anticipating what customers will be ready to embrace in upcoming seasons — then defining the styles and style groups needed to meet the business target.",
    cta: "Book an appointment",
    slides: [
      { src: trend1.url, alt: "Global Shopper trend board with travel-inspired colour and material story" },
      { src: trend2.url, alt: "Kidswear collage trend story with applique, patchwork and bold palette" },
      { src: trend3.url, alt: "Detail page of colour loops, patchwork and psychedelic prints" },
      { src: trend4.url, alt: "Polo solid style line sheet in Indigo and Global Shopper colourways" },
      { src: trend5.url, alt: "Polo solid style line presentation with Fun Trip palette and specs" },
    ],
  },
  {
    label: "Graphic & T-Shirt Design",
    headline: "Ideas made to be worn.",
    description:
      "CADs for shirts, graphic design for T-shirts and textile print design — expressive directions that bring concepts, culture and visual identity into apparel.",
    cta: "Book an appointment",
    slides: [
      { src: graphic1Asset.url, alt: "Tempt graphic tee development boards with Pantone colour story" },
      { src: graphic2Asset.url, alt: "Red Edge streetwear graphic library and colour palette" },
      { src: graphic3Asset.url, alt: "Womenswear graphic tee and knitwear range flats" },
    ],
  },
  {
    label: "Uniform Design",
    headline: "Function meets identity.",
    description:
      "We design uniforms as per the client's briefing, so the designs represent the objective and vision of the brand while balancing comfort, functionality and visual identity.",
    cta: "Book an appointment",
    slides: [
      { src: uniform1.url, alt: "Waistcoat and shirt uniform combination design boards with colour palette" },
      { src: uniform2.url, alt: "Chevron and tulip print development with matching footwear and accessory" },
      { src: uniform3.url, alt: "Uniform styling detail with Pantone colour story and motif studies" },
    ],
  },
];

function Index() {
  return (
    <main>
      <SiteHeader />
      <Hero />
      <div className="relative z-10 bg-background">
        <LogoMarquee />
        <ServicesSequence services={SERVICES} />
        <AboutSection />
        <DressCode />
        <SelectedWork />
        <Testimonials />
        <CtaSection />
      </div>
      <SiteFooter />
    </main>
  );
}

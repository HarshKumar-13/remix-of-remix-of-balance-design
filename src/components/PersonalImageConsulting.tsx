import { useEffect, useRef, useState } from "react";

import personalWorkshopAsset from "@/assets/personal-workshop.png.asset.json";
import personalStylingDetailAsset from "@/assets/personal-styling-detail.png.asset.json";
import personalFittingAsset from "@/assets/personal-fitting.jpg.asset.json";
import personalConsultationAsset from "@/assets/personal-consultation.jpg.asset.json";

const landscapeImages = [
  { src: personalWorkshopAsset.url, alt: "Design team reviewing a lookbook together in a bright studio" },
  { src: personalStylingDetailAsset.url, alt: "Stylist helping a client choose the right accessories" },
  { src: personalFittingAsset.url, alt: "Personal image consultant adjusting a client's blazer" },
  { src: personalConsultationAsset.url, alt: "Wardrobe consultation with a curated clothing selection" },
];

export function PersonalImageConsulting() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return;

    const interval = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % landscapeImages.length);
    }, 5200);

    return () => window.clearInterval(interval);
  }, []);

  const reveal = visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4";
  const imageReveal = visible
    ? "opacity-100 translate-y-0 [clip-path:inset(0_0_0_0)]"
    : "opacity-0 translate-y-5 [clip-path:inset(10%_0_18%_0)]";

  return (
    <section
      ref={sectionRef}
      aria-labelledby="personal-image-consulting-title"
      className="bg-background px-6 py-24 md:px-12 md:py-36"
    >
      <div className="mx-auto max-w-[1500px]">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-start md:gap-x-10 lg:gap-x-16">
          <div className="md:col-span-6">
            <p
              className={`label-xs mb-6 text-muted-foreground transition-[opacity,transform] duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${reveal}`}
            >
              Design Workshops &amp; Seminars
            </p>
            <h2
              id="personal-image-consulting-title"
              className={`display text-[2rem] leading-[0.98] uppercase transition-[opacity,transform] delay-100 duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] sm:text-5xl md:text-[3.4rem] lg:text-[4.2rem] ${reveal}`}
            >
              <span className="block text-red">Personal</span>
              <span className="block whitespace-nowrap text-foreground">Image Consulting</span>
            </h2>
          </div>

          <p
            className={`max-w-xl text-left text-lg leading-relaxed text-muted-foreground transition-[opacity,transform] delay-200 duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] md:col-span-5 md:col-start-8 md:pt-10 md:text-xl ${reveal}`}
          >
            Clothing and Dressing up is a powerful means of non-verbal communication. We all carry
            in our minds an image we look up to or would want to look like. And each one of us has
            the need to look acceptable and presentable to ourselves and to others.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 md:mt-20 md:grid-cols-12 md:items-stretch md:gap-x-8 lg:gap-x-12">
          <div
            className={`relative aspect-[16/10] overflow-hidden transition-[clip-path,opacity,transform] delay-300 duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] md:col-span-7 ${imageReveal}`}
          >
            {landscapeImages.map((image, index) => (
              <img
                key={image.src}
                src={image.src}
                alt={image.alt}
                loading="lazy"
                decoding="async"
                className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-[1800ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                  activeImage === index ? "scale-100 opacity-100" : "scale-[1.025] opacity-0"
                }`}
              />
            ))}
          </div>

          <div
            aria-hidden="true"
            className={`flex min-h-40 flex-col justify-between border-y border-border py-6 transition-[opacity,transform] delay-500 duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] md:col-span-5 md:min-h-full md:py-8 ${reveal}`}
          >
            <span className="h-px w-12 bg-foreground" />
            <span className="h-px w-full bg-border" />
          </div>
        </div>
      </div>
    </section>
  );
}
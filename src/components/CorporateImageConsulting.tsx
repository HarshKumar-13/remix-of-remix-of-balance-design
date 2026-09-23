import { useEffect, useRef, useState } from "react";

import corporatePresentation from "@/assets/Picture3.jpg.asset.json";
import corporateAudience from "@/assets/Picture4.jpg.asset.json";
import corporateGroup from "@/assets/Picture5.jpg.asset.json";
import corporateWorkshop from "@/assets/Picture6.jpg.asset.json";

const verticalImages = [
  {
    src: corporateWorkshop.url,
    alt: "Corporate image consultant coaching professionals in a workshop",
  },
  {
    src: corporateGroup.url,
    alt: "Professionals gathered during a corporate image workshop",
  },
  {
    src: corporatePresentation.url,
    alt: "Professional styling presentation in progress",
  },
];

const horizontalImages = [
  {
    src: corporatePresentation.url,
    alt: "Professionals attending a corporate appearance and styling presentation",
  },
  {
    src: corporateAudience.url,
    alt: "Corporate styling presentation to a seated audience",
  },
  {
    src: corporateGroup.url,
    alt: "Participants at a professional image consulting session",
  },
];

export function CorporateImageConsulting() {
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
      setActiveImage((current) => (current + 1) % verticalImages.length);
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
      aria-labelledby="corporate-image-consulting-title"
      className="bg-background px-6 py-24 md:px-12 md:py-36"
    >
      <div className="mx-auto max-w-[1500px]">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-start md:gap-x-10 lg:gap-x-16">
          <h2
            id="corporate-image-consulting-title"
            className={`display text-[2.55rem] leading-[0.98] uppercase transition-[opacity,transform] delay-100 duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] sm:text-6xl md:col-span-6 md:text-[4.25rem] lg:text-[4.75rem] ${reveal}`}
          >
            <span className="text-red">Corporate</span>
            <span className="block text-foreground">Image Consulting</span>
          </h2>

          <p
            className={`max-w-xl text-left text-lg leading-relaxed text-muted-foreground transition-[opacity,transform] delay-200 duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] md:col-span-5 md:col-start-8 md:pt-2 md:text-xl ${reveal}`}
          >
            we coach professionals to look sharp and stylish, build self confidence and have a
            personality that is magnetic, as they meet and interact with world.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 items-start gap-5 md:mt-20 md:grid-cols-12 md:gap-x-8 lg:gap-x-12">
          <div
            className={`relative aspect-[4/5] overflow-hidden transition-[clip-path,opacity,transform] delay-300 duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] md:col-span-5 md:aspect-[4/5] ${imageReveal}`}
          >
            {verticalImages.map((image, index) => (
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
            className={`relative aspect-[16/10] overflow-hidden transition-[clip-path,opacity,transform] delay-500 duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] md:col-span-7 md:mt-[12%] ${imageReveal}`}
          >
            {horizontalImages.map((image, index) => (
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
        </div>
      </div>
    </section>
  );
}
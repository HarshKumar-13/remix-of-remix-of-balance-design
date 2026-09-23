import { useEffect, useRef, useState } from "react";

import corporateWorkshop from "@/assets/Picture6.jpg.asset.json";
import corporatePresentation from "@/assets/Picture3.jpg.asset.json";

export function CorporateImageConsulting() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

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
        <div className="max-w-5xl">
          <h2
            id="corporate-image-consulting-title"
            className={`display text-[2.55rem] leading-[0.98] uppercase transition-[opacity,transform] duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] sm:text-6xl md:text-[4.75rem] ${reveal}`}
            style={{ transitionDelay: "180ms" }}
          >
            <span className="text-red">Corporate</span>
            <span className="block text-foreground">Image Consulting</span>
          </h2>

          <p
            className={`mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground transition-[opacity,transform] duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] md:mt-10 md:text-xl ${reveal}`}
            style={{ transitionDelay: "320ms" }}
          >
            we coach professionals to look sharp and stylish, build self confidence and have a
            personality that is magnetic, as they meet and interact with world.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-3 sm:grid-cols-2 md:mt-20 md:gap-4">
          <div
            className={`aspect-[4/5] overflow-hidden transition-[clip-path,opacity,transform] duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] sm:aspect-[5/6] ${imageReveal}`}
          >
            <img
              src={corporateWorkshop.url}
              alt="Corporate image consultant coaching professionals in a workshop"
              width={614}
              height={587}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>
          <div
            className={`aspect-[4/5] overflow-hidden transition-[clip-path,opacity,transform] duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] sm:aspect-[5/6] ${imageReveal}`}
            style={{ transitionDelay: "110ms" }}
          >
            <img
              src={corporatePresentation.url}
              alt="Professionals attending a corporate appearance and styling presentation"
              width={613}
              height={586}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
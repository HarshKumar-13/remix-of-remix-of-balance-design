import { useEffect, useRef, useState } from "react";
import { CurvedSlider } from "@/components/CurvedSlider";

import c1 from "@/assets/corp-new-1.jpg";
import c2 from "@/assets/corp-new-2.jpg";
import c3 from "@/assets/corp-new-3.jpg";
import c4 from "@/assets/corp-new-4.jpg";
import c5 from "@/assets/corp-new-5.jpg";
import c6 from "@/assets/corp-new-6.jpg";
import c7 from "@/assets/corp-new-7.jpg";

const IMAGES = [
  { src: c1, alt: "Van Heusen Master the Right Dress Code seminar audience" },
  { src: c2, alt: "Corporate Image Consulting presentation for Van Heusen" },
  { src: c3, alt: "Upma Shrian addressing Van Heusen professionals" },
  { src: c4, alt: "Van Heusen participants working on seminar exercises" },
  { src: c5, alt: "Presentation to Van Heusen team at round tables" },
  { src: c6, alt: "Colour wheel presentation at a corporate seminar" },
  { src: c7, alt: "Upma Shrian engaging participants at a corporate seminar" },
];

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

  return (
    <section
      ref={sectionRef}
      aria-labelledby="corporate-image-consulting-title"
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
              id="corporate-image-consulting-title"
              className={`display text-[2rem] leading-[0.98] uppercase transition-[opacity,transform] delay-100 duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] sm:text-5xl md:text-[3.4rem] lg:text-[4.2rem] ${reveal}`}
            >
              <span className="block text-red">Corporate</span>
              <span className="block whitespace-nowrap text-foreground">Image Consulting</span>
            </h2>
          </div>

          <p
            className={`max-w-xl text-left text-[calc(1.294rem+2px)] font-medium leading-relaxed text-red transition-[opacity,transform] delay-200 duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] md:col-span-5 md:col-start-8 md:pt-10 md:text-[calc(1.4375rem+2px)] ${reveal}`}
          >
            we coach professionals to look sharp and stylish, build self confidence and have a
            personality that is magnetic. Through a combination of styling sessions and mindset
            coaching, professionals learn to command respect, and own their presence in meetings,
            presentations and high stake conversations.
          </p>
        </div>

        <div
          className={`relative left-1/2 mt-14 w-screen -translate-x-1/2 transition-opacity delay-300 duration-[1400ms] md:mt-20 ${visible ? "opacity-100" : "opacity-0"}`}
        >
          <CurvedSlider images={[...verticalImages, ...horizontalImages]} contain />
        </div>
      </div>
    </section>
  );
}
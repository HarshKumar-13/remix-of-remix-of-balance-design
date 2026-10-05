import { useEffect, useRef, useState } from "react";

import p1 from "@/assets/pers-upd-1.jpg";
import p2 from "@/assets/pers-upd-2.jpg";
import p3 from "@/assets/pers-upd-3.jpg";
import p4 from "@/assets/pers-upd-4.jpg";

const landscapeImages = [
  { src: p1, alt: "Coral blazer styled with black top, striped skirt and accessories" },
  { src: p2, alt: "Red cardigan styled with beige skirt, red bag and nude heels" },
  { src: p3, alt: "What colours look good on you - women, ivory to deep bronze" },
  { src: p4, alt: "Polka-dot dress on a mannequin with black blazer, bag and heels" },
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
            className={`max-w-xl text-left text-[calc(1.294rem+2px)] font-medium leading-relaxed text-red transition-[opacity,transform] delay-200 duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] md:col-span-5 md:col-start-8 md:pt-10 md:text-[calc(1.4375rem+2px)] ${reveal}`}
          >
            "Master the Right Dress Code" is a highly visual and interactive seminar, sharing the
            design tools, such that the individual can make decisions for themselves, about which
            colour, fit and style shall suit their skin tone, height and body type.
            <span className="mt-5 block">
              Our styling seminars transform the way YOU dress up, such that their visual impact is
              more powerful and confident for your lifetime.
            </span>
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
            className={`relative aspect-[4/5] overflow-hidden transition-[clip-path,opacity,transform] delay-500 duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] md:col-span-5 md:aspect-auto ${imageReveal}`}
          >
            {landscapeImages.map((image, index) => (
              <img
                key={image.src}
                src={image.src}
                alt={image.alt}
                loading="lazy"
                decoding="async"
                className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-[1800ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                  (activeImage + 2) % landscapeImages.length === index
                    ? "scale-100 opacity-100"
                    : "scale-[1.025] opacity-0"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
import { useEffect, useRef, useState } from "react";

import p1 from "@/assets/pers-upd-1.jpg";
import p2 from "@/assets/pers-upd-2.jpg";
import p3 from "@/assets/pers-upd-3.jpg";
import p4 from "@/assets/pers-upd-4.jpg";
import p5 from "@/assets/pers-upd-5.jpg";
import p6 from "@/assets/pers-upd-6.jpg";
import p7 from "@/assets/pers-upd-7.jpg";
import p8 from "@/assets/pers-upd-8.jpg";
import s1 from "@/assets/pers-sq-1.jpg";
import s2 from "@/assets/pers-sq-2.jpg";
import s3 from "@/assets/pers-sq-3.jpg";
import s4 from "@/assets/pers-sq-4.jpg";
import diamond from "@/assets/balance-diamond.png";

const squareImages: { src: string; alt: string }[] = [
  { src: s1, alt: "Presenter explaining warm and cool colours at a personal image consulting seminar" },
  { src: s2, alt: "Presenter at a Balance Design seminar with colour palette handouts on the tables" },
  { src: s3, alt: "Presenter addressing a personal image consulting seminar in a conference hall" },
  { src: s4, alt: "Participants taking notes during a Balance Design workshop" },
];

const landscapeImages: { src: string; alt: string; fit: "cover" | "contain" }[] = [
  { src: p1, alt: "Coral blazer styled with black top, striped skirt and accessories", fit: "cover" },
  { src: p2, alt: "Red cardigan styled with beige skirt, red bag and nude heels", fit: "cover" },
  { src: p3, alt: "What colours look good on you - women, ivory to deep bronze", fit: "cover" },
  { src: p4, alt: "Polka-dot dress on a mannequin with black blazer, bag and heels", fit: "cover" },
  { src: p5, alt: "Five styled day-to-evening outfits in contrasting colour combinations", fit: "contain" },
  { src: p6, alt: "Four colour-blocking outfits in red, royal blue and bright yellow", fit: "contain" },
  { src: p7, alt: "Analogous colour outfits in purple, berry, deep red and coral with a colour palette", fit: "contain" },
  { src: p8, alt: "Three monochromatic outfits in yellow, green and blush pink", fit: "contain" },
];

const ribbonStatements = [
  "Clarity for a lifetime: on what to pick up for one’s body type and skin tone. One picks up a wider range of products which one was reluctant to try earlier.",
  "Get the exposure to new fits, colours, styles, patterns and silhouettes that most importantly work for you.",
  "Get aware of which trends to pick up and which ones to drop.",
  "Creating wardrobes that enhance our strength areas and diminish our problem areas.",
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
      className="bg-background px-6 py-16 sm:py-20 md:px-12 md:py-24"
    >
      <div className="mx-auto max-w-[1500px]">
        <div className="flex flex-col items-center gap-8 text-center">
          <div>
            <p
              className={`label-xs mb-6 font-semibold text-muted-foreground transition-[opacity,transform] duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${reveal}`}
            >
              Design Workshops &amp; Seminars
            </p>
            <h2
              id="personal-image-consulting-title"
              className={`display text-[2rem] leading-[0.98] uppercase transition-[opacity,transform] delay-100 duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] sm:text-5xl md:text-[3.4rem] lg:text-[4.2rem] ${reveal}`}
            >
              <span className="block text-red">Personal</span>
              <span className="block whitespace-nowrap text-foreground">Image Consulting:</span>
              <span className="block text-foreground">Master the Right Dress Code</span>
            </h2>
          </div>

          <p
            className={`mx-auto max-w-4xl text-center text-[calc(1.294rem+2px)] font-medium leading-relaxed text-red transition-[opacity,transform] delay-200 duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]  md:text-[calc(1.4375rem+2px)] ${reveal}`}
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

        <div className="mt-10 grid grid-cols-1 gap-8 md:mt-14 md:grid-cols-12 md:items-stretch md:gap-x-8 lg:gap-x-12">
          <div
            className={`relative aspect-[16/10] overflow-hidden bg-white transition-[clip-path,opacity,transform] delay-300 duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] md:col-span-7 ${imageReveal}`}
          >
            {landscapeImages.map((image, index) => (
              <img
                key={image.src}
                src={image.src}
                alt={image.alt}
                loading="lazy"
                decoding="async"
                style={{ objectFit: image.fit, objectPosition: "center" }}
                className={`absolute inset-0 h-full w-full transition-[opacity,transform] duration-[1800ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                  activeImage === index ? "scale-100 opacity-100" : "scale-[1.025] opacity-0"
                }`}
              />
            ))}
          </div>

          <div
            className={`relative aspect-[4/5] overflow-hidden transition-[clip-path,opacity,transform] delay-500 duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] md:col-span-5 md:aspect-auto ${imageReveal}`}
          >
            {squareImages.map((image, index) => (
              <img
                key={image.src}
                src={image.src}
                alt={image.alt}
                loading="lazy"
                decoding="async"
                className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-[1800ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                  activeImage % squareImages.length === index
                    ? "scale-100 opacity-100"
                    : "scale-[1.025] opacity-0"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Full-bleed editorial statement ribbon, directly connected to the slider above. */}
      <div
        className="-mx-6 mt-7 overflow-hidden border-y border-border/70 py-5 md:-mx-12 md:py-6"
        role="marquee"
      >
        <div className="ribbon-track flex w-max items-center">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              aria-hidden={copy === 1}
              className="flex items-center"
            >
              {ribbonStatements.map((statement) => (
                <span key={statement} className="flex items-center">
                  <span className="whitespace-nowrap px-8 text-[calc(0.95rem+2px)] leading-relaxed text-foreground md:px-10 md:text-[calc(1.125rem+2px)]">
                    {statement}
                  </span>
                  <img
                    src={diamond}
                    alt=""
                    aria-hidden="true"
                    className="h-3 w-auto shrink-0 md:h-4"
                    loading="lazy"
                  />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
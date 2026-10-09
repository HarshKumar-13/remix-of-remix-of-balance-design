import { useEffect, useRef, useState } from "react";
import { CurvedSlider } from "@/components/CurvedSlider";
import { BookingDialog } from "@/components/BookWorkshopCta";
import diamond from "@/assets/balance-diamond.png";

import c1 from "@/assets/corp-new-1.jpg";
import v1 from "@/assets/corp-vh-1.jpg";
import v2 from "@/assets/corp-vh-2.jpg";
import v3 from "@/assets/corp-vh-3.jpg";
import v4 from "@/assets/corp-vh-4.jpg";
import c6 from "@/assets/corp-new-6.jpg";
import c7 from "@/assets/corp-new-7.jpg";

// Written on the slides themselves: the service, then the client beneath it.
const VH = { title: "Corporate Image Consulting", sub: "VAN HEUSEN" };

const IMAGES = [
  { src: c1, alt: "Van Heusen Master the Right Dress Code seminar audience", caption: VH },
  {
    src: v1,
    alt: "Presenter addressing participants seated at round tables at a Van Heusen corporate seminar",
    caption: VH,
  },
  {
    src: v2,
    alt: "Participants completing seminar exercises at round tables beside a Van Heusen standee",
    caption: VH,
  },
  {
    src: v3,
    alt: "Presenter beside a projection screen at a Van Heusen corporate image consulting seminar",
    caption: VH,
  },
  {
    src: v4,
    alt: "Presenter guiding four participants demonstrating dress styles at a Van Heusen seminar",
    caption: VH,
  },
  { src: c6, alt: "Colour wheel presentation at a corporate seminar" },
  { src: c7, alt: "Upma Shrian engaging participants at a corporate seminar" },
];

// The five questions the seminar puts to a working professional.
const ribbonStatements = [
  "Do you represent yourself or your brand and come out as a confident personality by way of your dressing up?",
  "Are you comfortable in being yourself, as you represent your company?",
  "Do you feel powerful in your attire, as you rub shoulders with the top brass of various segments of your industry?",
  "Are you aware of Fashion's do's and don'ts as you meet your clients and alliances worldwide?",
  "Do you feel your wardrobe represents your professional success and stature?",
];

export function CorporateImageConsulting() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [enquiryOpen, setEnquiryOpen] = useState(false);

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
              id="corporate-image-consulting-title"
              className={`display text-[2rem] leading-[0.98] uppercase transition-[opacity,transform] delay-100 duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] sm:text-5xl md:text-[3.4rem] lg:text-[4.2rem] ${reveal}`}
            >
              <span className="block text-red">Corporate</span>
              <span className="block whitespace-nowrap text-foreground">Image Consulting</span>
            </h2>
          </div>

          <p
            className={`mx-auto max-w-4xl text-center text-[calc(1.294rem+2px)] font-medium leading-relaxed text-red transition-[opacity,transform] delay-200 duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]  md:text-[calc(1.4375rem+2px)] ${reveal}`}
          >
            We coach professionals to look sharp and stylish, build self confidence and have a
            personality that is magnetic. Through a combination of styling sessions and mindset
            coaching, professionals learn to command respect, and own their presence in meetings,
            presentations and high stake conversations.
          </p>

          {/* Text-only enquiry link: the rule under it draws itself in from the left on hover. */}
          <button
            type="button"
            onClick={() => setEnquiryOpen(true)}
            className={`group inline-flex flex-col items-center gap-3 transition-[opacity,transform] delay-300 duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${reveal}`}
          >
            <span className="label-xs text-[calc(0.9375rem+2px)] font-normal uppercase tracking-[0.22em] text-foreground transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:text-red">
              Enquire About Corporate Consulting
            </span>
            <span className="relative block h-px w-full bg-border/60">
              <span className="absolute inset-0 origin-left scale-x-0 bg-red transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
            </span>
          </button>
        </div>

        <div
          className={`relative left-1/2 mt-10 w-screen -translate-x-1/2 transition-opacity delay-300 duration-[1400ms] md:mt-14 ${visible ? "opacity-100" : "opacity-0"}`}
        >
          <CurvedSlider images={IMAGES} contain />
        </div>
      </div>

      {/* Full-bleed editorial question ribbon, directly connected to the slider above. */}
      <div
        className="-mx-6 mt-7 overflow-hidden border-y border-border/70 bg-charcoal py-5 md:-mx-12 md:py-6"
        role="marquee"
      >
        <div className="ribbon-track flex w-max items-center">
          {[0, 1].map((copy) => (
            <div key={copy} aria-hidden={copy === 1} className="flex items-center">
              {ribbonStatements.map((statement) => (
                <span key={statement} className="flex items-center">
                  <span className="whitespace-nowrap px-8 text-[calc(0.95rem+2px)] leading-relaxed text-background md:px-10 md:text-[calc(1.125rem+2px)]">
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
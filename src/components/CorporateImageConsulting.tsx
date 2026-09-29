import { useEffect, useRef, useState } from "react";

import raymondGroup from "@/assets/corporate-raymond-group.jpg";
import raymondColourSession from "@/assets/corporate-raymond-colour-session.jpg";
import raymondVenue from "@/assets/corporate-raymond-venue.jpg";
import teamSession from "@/assets/corporate-team-session.jpg";
import raymondPresentation from "@/assets/corporate-raymond-presentation.jpg";
import raymondInvitation from "@/assets/corporate-raymond-invitation.jpg";
import corpP1 from "@/assets/corporate-Picture1.jpg";
import corpP2 from "@/assets/corporate-Picture2.jpg";
import corpP4 from "@/assets/corporate-Picture4-2.jpg";
import corpP5 from "@/assets/corporate-Picture5.jpg";

const verticalImages = [
  {
    src: raymondVenue,
    alt: "Raymond Master the Right Dress Code workshop venue",
  },
  {
    src: raymondInvitation,
    alt: "Raymond exclusive grooming workshop invitation",
  },
  {
    src: teamSession,
    alt: "Corporate team gathered after an image consulting session",
  },
  { src: corpP2, alt: "Presenter addressing a small corporate group at round tables" },
  { src: corpP1, alt: "Presenter engaging participants in a corporate image session" },
];

const horizontalImages = [
  {
    src: raymondPresentation,
    alt: "Corporate dress-code presentation for professionals",
  },
  {
    src: raymondColourSession,
    alt: "Professionals attending a colour and styling workshop",
  },
  {
    src: raymondGroup,
    alt: "Participants at the Raymond Master the Right Dress Code workshop",
  },
  { src: corpP4, alt: "Corporate seminar in a hotel ballroom with a colour wheel presentation" },
  { src: corpP5, alt: "Presenter speaking to professionals seated at round tables" },
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
            className={`max-w-xl text-left text-lg leading-relaxed text-muted-foreground transition-[opacity,transform] delay-200 duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] md:col-span-5 md:col-start-8 md:pt-10 md:text-xl ${reveal}`}
          >
            we coach professionals to look sharp and stylish, build self confidence and have a
            personality that is magnetic, as they meet and interact with world.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 items-start gap-5 md:mt-20 md:grid-cols-12 md:items-end md:gap-x-8 lg:gap-x-12">
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
            className={`relative aspect-[16/10] overflow-hidden transition-[clip-path,opacity,transform] delay-500 duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] md:col-span-7 ${imageReveal}`}
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
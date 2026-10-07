import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import logoMark from "@/assets/balance-logo-mark.png";
import { Button } from "@/components/ui/button";
import { Reveal } from "./Reveal";

type ServiceImage = { src: string; alt: string };

type RedEditorialServiceProps = {
  eyebrow: string;
  headline: React.ReactNode;
  description?: string;
  images: ServiceImage[];
  single?: boolean;
};

function SingleImageSlideshow({ images, label }: { images: ServiceImage[]; label: string }) {
  const oddLast = images.length % 2 === 1 && images.length > 1;
  return (
    <div
      className="mx-auto grid w-full max-w-6xl grid-cols-1 items-start gap-6 px-6 sm:grid-cols-2 md:gap-8 md:px-12"
      aria-label={`${label} image gallery`}
    >
      {images.map((image, i) => {
        const wide = oddLast && i === images.length - 1;
        return (
          <figure
            key={image.src}
            className={`overflow-hidden bg-background/95 p-3 md:p-4 ${wide ? "sm:col-span-2" : ""} ${
              i % 2 === 1 && !wide ? "sm:mt-16" : ""
            }`}
          >
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              decoding="async"
              className="block h-auto w-full object-contain transition-transform duration-700 ease-out hover:scale-[1.02]"
            />
          </figure>
        );
      })}
    </div>
  );
}

const AUTOPLAY_DELAY = 2000;

function EditorialCarousel({ images, label }: { images: ServiceImage[]; label: string }) {
  const [position, setPosition] = useState(1);
  const [animated, setAnimated] = useState(true);
  const [paused, setPaused] = useState(false);
  const [timerKey, setTimerKey] = useState(0);
  const track = [images[images.length - 1], ...images, images[0]].filter(
    (image): image is ServiceImage => Boolean(image),
  );

  const move = useCallback((direction: number, manual = false) => {
    setAnimated(true);
    setPosition((current) => current + direction);
    if (manual) setTimerKey((current) => current + 1);
  }, []);

  useEffect(() => {
    if (paused || images.length < 2) return;
    const timer = window.setInterval(() => move(1), AUTOPLAY_DELAY);
    return () => window.clearInterval(timer);
  }, [images.length, move, paused, timerKey]);

  const settleLoop = () => {
    if (position === 0) {
      setAnimated(false);
      setPosition(images.length);
    } else if (position === images.length + 1) {
      setAnimated(false);
      setPosition(1);
    }
  };

  const activeIndex = (position - 1 + images.length) % images.length;
  const carouselStyle = { "--gallery-index": position } as CSSProperties;

  return (
    <div
      className="red-service-carousel relative overflow-hidden"
      aria-label={`${label} image gallery`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className={`red-service-carousel-track ${animated ? "red-service-carousel-track-animated" : ""}`}
        style={carouselStyle}
        onTransitionEnd={settleLoop}
      >
        {track.map((image, index) => {
          const logicalIndex = (index - 1 + images.length) % images.length;
          const isActive = logicalIndex === activeIndex && index === position;
          return (
            <figure
              key={`${image.src}-${index}`}
              className={`red-service-carousel-slide ${isActive ? "red-service-carousel-slide-active" : ""}`}
              aria-hidden={!isActive}
            >
              <img
                src={image.src}
                alt={isActive ? image.alt : ""}
                className="h-full w-full object-cover"
                loading={index < 3 ? "eager" : "lazy"}
                decoding="async"
              />
            </figure>
          );
        })}
      </div>

      {images.length > 1 && (
        <>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={`Previous ${label} image`}
            onClick={() => move(-1, true)}
            className="absolute left-4 top-1/2 z-10 size-11 -translate-y-1/2 rounded-none border border-primary-foreground/55 bg-foreground/55 text-primary-foreground hover:bg-foreground hover:text-primary-foreground md:left-8 md:size-12"
          >
            <ArrowLeft aria-hidden="true" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={`Next ${label} image`}
            onClick={() => move(1, true)}
            className="absolute right-4 top-1/2 z-10 size-11 -translate-y-1/2 rounded-none border border-primary-foreground/55 bg-foreground/55 text-primary-foreground hover:bg-foreground hover:text-primary-foreground md:right-8 md:size-12"
          >
            <ArrowRight aria-hidden="true" />
          </Button>
        </>
      )}
    </div>
  );
}

export function RedEditorialService({
  eyebrow,
  headline,
  description,
  images,
  single = false,
}: RedEditorialServiceProps) {
  return (
    <section className="overflow-hidden bg-background py-24 text-foreground md:py-36" aria-label={eyebrow}>
      <div className="mx-auto px-6 text-center md:px-12">
        <Reveal>
          <img
            src={logoMark}
            alt="Balance Design"
            data-bg-logo
            className="mx-auto h-14 w-auto object-contain md:h-20"
            width={120}
            height={80}
          />
        </Reveal>
        <Reveal delay={80}>
          <p className="label-xs mt-8 font-semibold text-muted-foreground">{eyebrow}</p>
        </Reveal>
        <Reveal delay={150}>
          <h2 className="display mx-auto mt-7 max-w-5xl text-[2.65rem] leading-[1.02] sm:text-6xl md:text-[5.25rem]">
            {headline}
          </h2>
        </Reveal>
        <div className="mx-auto mt-9 min-h-20 max-w-2xl md:min-h-24">
          {description && (
            <Reveal delay={230}>
              <p className="text-[calc(1.294rem+2px)] leading-relaxed md:text-[calc(1.4375rem+2px)] font-medium text-red">
                {description}
              </p>
            </Reveal>
          )}
        </div>
      </div>

      <Reveal delay={390} className="mt-20 md:mt-28">
        {single ? (
          <SingleImageSlideshow images={images} label={eyebrow} />
        ) : (
          <EditorialCarousel images={images} label={eyebrow} />
        )}
      </Reveal>
    </section>
  );
}
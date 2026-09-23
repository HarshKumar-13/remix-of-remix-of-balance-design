import { useEffect, useRef, useState } from "react";

export type StoryImage = { src: string; alt: string };

export type StoryService = {
  number: string;
  title: string;
  items?: { title: string; body?: string }[];
  images: StoryImage[];
};

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

function useIsDesktop() {
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return desktop;
}

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

/* ---------------- Desktop: pinned editorial sequence ---------------- */

function DesktopStory({ services }: { services: StoryService[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const el = wrapRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        if (total <= 0) return;
        setProgress(clamp(-rect.top / total));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const n = services.length;
  const raw = clamp(progress) * n;
  const index = Math.min(n - 1, Math.floor(raw));
  const local = clamp(raw - index);
  const service = services[index];

  // image sequence inside the active service
  const imgs = service.images;
  const imgRaw = local * imgs.length;

  return (
    <div ref={wrapRef} style={{ height: `${n * 140}vh` }} className="relative">
      <div className="sticky top-0 flex h-svh items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-[1500px] grid-cols-12 items-center gap-12 px-10 xl:px-16">
          {/* image stage */}
          <div className="col-span-7 relative aspect-[4/3] overflow-hidden">
            {imgs.map((img, i) => {
              const d = imgRaw - i;
              const enter = clamp(d / 0.85);
              const exit = clamp(d - 1);
              const inset = reduced ? 0 : (1 - easeInOut(enter)) * 100;
              const scale = reduced ? 1 : 1.12 - 0.12 * easeInOut(enter) - exit * 0.05;
              const shift = reduced ? 0 : -exit * 6;
              return (
                <img
                  key={img.src}
                  src={img.src}
                  alt={img.alt}
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover will-change-transform"
                  style={{
                    clipPath: `inset(0% 0% ${inset}% 0%)`,
                    transform: `translate3d(0, ${shift}%, 0) scale(${scale})`,
                    opacity: d < -0.2 ? 0 : 1,
                    zIndex: i,
                  }}
                />
              );
            })}
          </div>

          {/* typography */}
          <div className="col-span-5">
            <div
              className="will-change-transform"
              style={{
                opacity: reduced ? 1 : clamp(local / 0.12) * clamp((1 - local) / 0.12),
                transform: reduced ? undefined : `translate3d(0, ${(0.5 - local) * 18}px, 0)`,
              }}
            >
              <p className="label-xs text-muted-foreground">Services</p>
              <p className="display mt-6 text-[5.5rem] leading-[0.85] text-[var(--red)]">
                {service.number}
              </p>
              <h3 className="display mt-6 max-w-lg text-[2.6rem] leading-[0.95] xl:text-[3.2rem]">
                {service.title}
              </h3>
              {service.items && (
                <ul className="mt-10 max-w-md space-y-6 border-t border-foreground/15 pt-8">
                  {service.items.map((item, i) => {
                    const appear = clamp((local - 0.12 - i * 0.12) / 0.18);
                    return (
                      <li
                        key={item.title}
                        style={{
                          opacity: reduced ? 1 : appear,
                          transform: reduced ? undefined : `translate3d(0, ${(1 - appear) * 14}px, 0)`,
                        }}
                      >
                        <p className="label-xs text-foreground">{item.title}</p>
                        {item.body && (
                          <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                            {item.body}
                          </p>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* progress */}
            <div className="mt-14 flex items-center gap-4">
              {services.map((s, i) => (
                <span
                  key={s.number}
                  className="h-px w-12 origin-left bg-foreground/20"
                  style={{
                    transform: `scaleY(${i === index ? 3 : 1})`,
                    background: i === index ? "var(--red)" : undefined,
                    transition: "transform .5s ease, background .5s ease",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Mobile: stacked editorial sequence ---------------- */

function MobileStory({ services }: { services: StoryService[] }) {
  return (
    <div className="space-y-24 px-6 py-20">
      {services.map((service) => (
        <article key={service.number}>
          <div className="relative -mx-6 overflow-hidden">
            <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {service.images.map((img, i) => (
                <img
                  key={img.src}
                  src={img.src}
                  alt={img.alt}
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                  className="aspect-[4/5] w-[82vw] shrink-0 snap-center object-cover"
                />
              ))}
            </div>
          </div>
          <p className="display mt-8 text-[3.5rem] leading-[0.85] text-[var(--red)]">
            {service.number}
          </p>
          <h3 className="display mt-3 text-[2rem] leading-[1]">{service.title}</h3>
          {service.items && (
            <ul className="mt-8 space-y-6 border-t border-foreground/15 pt-6">
              {service.items.map((item) => (
                <li key={item.title}>
                  <p className="label-xs text-foreground">{item.title}</p>
                  {item.body && (
                    <p className="mt-2 text-base leading-relaxed text-muted-foreground">{item.body}</p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </article>
      ))}
    </div>
  );
}

export function ServicesStory({
  services,
  children,
}: {
  services: StoryService[];
  children?: React.ReactNode;
}) {
  const desktop = useIsDesktop();
  return (
    <section id="services-story" className="relative bg-background">
      {desktop ? <DesktopStory services={services} /> : <MobileStory services={services} />}
      {children}
    </section>
  );
}

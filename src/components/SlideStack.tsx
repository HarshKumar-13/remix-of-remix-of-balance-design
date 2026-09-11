import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Full-screen editorial panels. Each panel sticks to the top of the viewport
 * while the following panel slides up over it, scrubbed directly by scroll.
 * The outgoing panel recedes slightly for depth — no fades to white, no bounce.
 */
export function SlideStack({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const panels = Array.from(root.querySelectorAll<HTMLElement>("[data-slide-panel]"));

    // Panels taller than the viewport must finish scrolling through fully
    // before pinning, otherwise their lower content (e.g. carousels) is
    // covered by the incoming panel. Stick them at a negative offset equal
    // to their overflow so the entire panel is visible before the next
    // one slides over.
    const setPanelOffsets = () => {
      const vh = window.innerHeight;
      panels.forEach((panel) => {
        const overflow = panel.offsetHeight - vh;
        panel.style.top = overflow > 0 ? `${-overflow}px` : "0px";
      });
      ScrollTrigger.refresh();
    };
    setPanelOffsets();
    const ro = new ResizeObserver(setPanelOffsets);
    panels.forEach((panel) => ro.observe(panel));
    window.addEventListener("resize", setPanelOffsets);

    const ctx = gsap.context(() => {
      panels.forEach((panel, i) => {
        const next = panels[i + 1];
        if (!next) return;
        const inner = panel.querySelector<HTMLElement>(".slide-panel-inner");
        if (!inner) return;

        gsap.to(inner, {
          yPercent: -10,
          scale: 0.98,
          opacity: 0.55,
          ease: "none",
          scrollTrigger: {
            trigger: next,
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        });
      });
    }, root);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={rootRef} className="slide-stack">
      {children}
    </div>
  );
}

export function SlidePanel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div data-slide-panel className={`slide-panel ${className}`}>
      <div className="slide-panel-inner">{children}</div>
    </div>
  );
}

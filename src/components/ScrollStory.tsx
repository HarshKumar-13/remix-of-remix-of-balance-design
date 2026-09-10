import { useEffect, useRef, type ReactNode } from "react";

function clamp(value: number) {
  return Math.min(1, Math.max(0, value));
}

export function ScrollStory({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const scenes = Array.from(root.querySelectorAll<HTMLElement>("[data-scroll-scene]"));
    let frame = 0;

    const update = () => {
      frame = 0;
      const viewportHeight = window.innerHeight;
      const mobile = window.innerWidth < 768;

      scenes.forEach((scene) => {
        const rect = scene.getBoundingClientRect();
        const enter = clamp((viewportHeight - rect.top) / (viewportHeight * 0.78));
        const exit = clamp((viewportHeight * 0.34 - rect.bottom) / (viewportHeight * 0.66));
        const travel = mobile ? 20 : 52;
        const exitTravel = mobile ? 12 : 32;
        const y = (1 - enter) * travel - exit * exitTravel;
        const scale = 0.985 + enter * 0.015 - exit * (mobile ? 0.006 : 0.014);
        const opacity = Math.min(1, enter * 1.7) * (1 - exit * (mobile ? 0.16 : 0.38));
        const clip = (1 - enter) * (mobile ? 2.5 : 7);

        scene.style.setProperty("--story-y", `${y.toFixed(2)}px`);
        scene.style.setProperty("--story-scale", scale.toFixed(4));
        scene.style.setProperty("--story-opacity", opacity.toFixed(3));
        scene.style.setProperty("--story-clip", `${clip.toFixed(2)}%`);
        scene.style.setProperty("--story-depth", `${((1 - enter) * (mobile ? 8 : 22)).toFixed(2)}px`);
      });
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={rootRef} className="scroll-story">
      {children}
    </div>
  );
}

export function StoryScene({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div data-scroll-scene className={`story-scene ${className}`}>
      <div className="story-scene-content">{children}</div>
    </div>
  );
}
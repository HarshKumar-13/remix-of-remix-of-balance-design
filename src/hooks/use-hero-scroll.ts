import { useEffect, useRef, type RefObject } from "react";

/** Native sticky flow owns pin/release; a single frame writes banner geometry. */
export function useHeroScroll(
  stageRef: RefObject<HTMLDivElement | null>,
  enabled: boolean,
  onPinned: (pinned: boolean) => void,
) {
  const callback = useRef(onPinned);
  callback.current = onPinned;
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || !enabled) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let start = 0;
    let height = 0;
    let viewport = 0;
    let expansionDistance = 400;
    let initialTop = 0;
    let initialHeight = 0;
    let gutter = 0;
    let pinned = false;
    const update = () => {
      frame = 0;
      const distance = window.scrollY - start;
      const nextPinned = !media.matches && distance > 0 && distance < height;
      if (nextPinned !== pinned) {
        pinned = nextPinned;
        callback.current(pinned);
      }
      const progress = media.matches ? 0 : Math.max(0, Math.min(1, distance / expansionDistance));
      const eased = progress * progress * (3 - 2 * progress);
      stage.style.setProperty("--hero-scroll-gutter", `${gutter * (1 - eased)}px`);
      stage.style.setProperty("--hero-scroll-height", `${initialHeight + (viewport - initialHeight) * eased}px`);
      stage.style.setProperty("--hero-scroll-top", `${initialTop * (1 - eased)}px`);
      stage.dataset['scrollProgress'] = progress.toFixed(3);
    };
    const request = () => { if (!frame) frame = requestAnimationFrame(update); };
    const measure = () => {
      const destination = stage.querySelector<HTMLElement>("[data-banner-destination]");
      const sticky = stage.querySelector<HTMLElement>(".hero-scroll-viewport");
      if (!destination || !sticky) return;
      // Clear only our scroll overrides to read the unchanged initial frame.
      stage.style.removeProperty("--hero-scroll-gutter");
      stage.style.removeProperty("--hero-scroll-height");
      // Pin at the rendered banner's resting position, not after it travels to zero.
      initialTop = stage.getBoundingClientRect().top + window.scrollY;
      start = 0;
      viewport = sticky.clientHeight || window.innerHeight;
      expansionDistance = Math.max(350, Math.min(450, viewport * 0.5));
      const holdDistance = Math.max(100, Math.min(150, viewport * 0.16));
      stage.style.setProperty("--hero-initial-top", `${initialTop}px`);
      stage.style.setProperty("--hero-expansion-distance", `${expansionDistance}px`);
      stage.style.setProperty("--hero-hold-distance", `${holdDistance}px`);
      height = expansionDistance + holdDistance + viewport;
      stage.dataset['expansionDistance'] = String(expansionDistance);
      stage.dataset['holdDistance'] = String(holdDistance);
      initialHeight = destination.offsetHeight;
      gutter = (stage.clientWidth - destination.clientWidth) / 2;
      update();
    };
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", measure);
    media.addEventListener("change", measure);
    measure();
    // ResizeObserver catches typography fitting and viewport changes too.
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", measure);
      media.removeEventListener("change", measure);
      cancelAnimationFrame(frame);
      callback.current(false);
      stage.style.removeProperty("--hero-scroll-gutter");
      stage.style.removeProperty("--hero-scroll-height");
      stage.style.removeProperty("--hero-expansion-distance");
      stage.style.removeProperty("--hero-hold-distance");
      stage.style.removeProperty("--hero-initial-top");
      stage.style.removeProperty("--hero-scroll-top");
    };
  }, [enabled, stageRef]);
}
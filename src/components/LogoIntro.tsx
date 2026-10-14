import { useEffect, useRef } from "react";
import gsap from "gsap";
import originalLogo from "@/assets/balance-logo-navbar.png";

/** One entrance clock owns the unchanged loader, grid reveal and slow travel. */
export function LogoIntro({ onReveal, onComplete, onFinish }: { onReveal: () => void; onComplete: () => void; onFinish: () => void }) {
  const layerRef = useRef<HTMLDivElement>(null);
  const surfaceRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    const layer = layerRef.current;
    const surface = surfaceRef.current;
    const logo = logoRef.current;
    const counter = counterRef.current;
    const gallery = document.querySelector<HTMLElement>("[data-hero-gallery]");
    if (!layer || !surface || !logo || !counter || !gallery) {
      onReveal(); onComplete(); onFinish(); return;
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let disposed = false;
    let entrance: gsap.core.Timeline | undefined;
    const columns = Array.from(gallery.querySelectorAll<HTMLElement>("[data-hero-column]"));
    const tracks = Array.from(gallery.querySelectorAll<HTMLElement>("[data-column-track]"));
    const geometry = { travel: 0 };
    let offscreen = false;
    const manual = { offset: 0 };
    let manualTarget = 0;
    let manualTween: gsap.core.Tween | undefined;
    let resumeTimer: ReturnType<typeof setTimeout> | undefined;
    let userPaused = false;
    let lightboxOpen = false;
    let touchY: number | undefined;
    let dragged = false;
    const interactive = () => gallery.dataset['phase'] === "hold" || gallery.dataset['phase'] === "movement";
    const announce = () => gallery.dispatchEvent(new CustomEvent("grid-pause-state", { detail: userPaused || reduced || Boolean(entrance?.paused()) }));
    const pause = () => { clearTimeout(resumeTimer); entrance?.pause(); announce(); };
    const resume = () => {
      if (disposed || userPaused || lightboxOpen || touchY !== undefined || document.hidden || offscreen || reduced || !interactive()) return;
      manualTween?.kill(); manualTarget = manual.offset;
      entrance?.resume(); announce();
    };
    const resumeLater = () => { clearTimeout(resumeTimer); resumeTimer = setTimeout(resume, 1600); };
    const phase = (value: string) => {
      layer.dataset['phase'] = value;
      gallery.dataset['phase'] = value;
      if (value === "movement") entrance?.timeScale(0.55);
      place();
    };
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    layer.dataset['phase'] = "loading";
    gsap.set(gallery, { opacity: 1 });
    gsap.set(columns, { clipPath: "inset(100% 0 0 0)" });
    const place = () => {
      const height = window.innerHeight;
      columns.forEach((column, i) => {
        const track = tracks[i];
        if (!track) return;
        const cycles = track.querySelectorAll<HTMLElement>("[data-cycle-start]");
        const first = cycles[0];
        const next = cycles[1];
        if (!first || !next) return;
        const cycleHeight = next.offsetTop - first.offsetTop;
        if (cycleHeight <= 0) return;
        const distance = height * (i === 0 ? 0.7 : i === 1 ? 0.6 : 0.85);
        // Measure natural photo stacks, never impose a uniform cell height.
        // Leave several complete cycles above and below every viewport.
        const start = Math.min(-cycleHeight, -cycleHeight * 3 + (i === 0 ? height * 0.18 + distance * 0.776 : i === 1 ? -height * 0.45 : -height * 0.12));
        const travel = distance * geometry.travel + manual.offset;
        const wrapped = gsap.utils.wrap(-cycleHeight, cycleHeight, travel);
        gsap.set(track, { y: start + (i === 1 ? 1 : -1) * wrapped });
        track.querySelectorAll<HTMLElement>("[data-column-image]").forEach(cell => {
          const rect = cell.getBoundingClientRect();
          cell.tabIndex = interactive() && rect.bottom > 0 && rect.top < height ? 0 : -1;
        });
      });
    };
    const move = (delta: number) => {
      if (!interactive() || lightboxOpen) return;
      pause();
      // Bounded travel retains ample repeated cycles on either side of the viewport.
      const cycles = tracks[0]?.querySelectorAll<HTMLElement>("[data-cycle-start]");
      const cycle = cycles?.[1] && cycles[0] ? cycles[1].offsetTop - cycles[0].offsetTop : window.innerHeight;
      manualTarget = Math.max(-cycle * 1.5, Math.min(cycle * 6, manualTarget + delta));
      manualTween?.kill();
      manualTween = gsap.to(manual, { offset: manualTarget, duration: 0.65, ease: "power2.out", onUpdate: place });
      resumeLater();
    };
    const wheel = (event: WheelEvent) => {
      if (!interactive() || lightboxOpen || event.ctrlKey) return;
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1;
      move(Math.max(-100, Math.min(100, event.deltaY * unit * 0.35)));
    };
    const touchStart = (event: TouchEvent) => { if (interactive()) { touchY = event.touches[0]?.clientY; dragged = false; pause(); } };
    const touchMove = (event: TouchEvent) => {
      const next = event.touches[0]?.clientY;
      if (!interactive() || lightboxOpen || touchY === undefined || next === undefined) return;
      const delta = touchY - next;
      if (Math.abs(delta) > 2) dragged = true;
      move(delta * 0.55); touchY = next;
    };
    const touchEnd = () => { touchY = undefined; resumeLater(); };
    const click = (event: MouseEvent) => {
      if (dragged && event.detail > 0) { event.preventDefault(); event.stopImmediatePropagation(); dragged = false; return; }
      dragged = false;
      if (!interactive() || !(event.target instanceof Element) || !event.target.closest("[data-grid-toggle]")) return;
      userPaused = !userPaused;
      if (userPaused) pause(); else resume();
    };
    const lightbox = (event: Event) => {
      lightboxOpen = Boolean((event as CustomEvent<boolean>).detail);
      if (lightboxOpen) { pause(); manualTween?.kill(); manualTarget = manual.offset; }
      else resumeLater();
    };
    const explore = () => { userPaused = true; pause(); manualTween?.kill(); manualTarget = manual.offset; };
    const visibility = () => { if (document.hidden && interactive()) pause(); else resumeLater(); };
    const focus = () => { if (interactive()) pause(); };
    const blur = () => { if (!lightboxOpen) resumeLater(); };
    gallery.addEventListener("wheel", wheel, { passive: true });
    gallery.addEventListener("touchstart", touchStart, { passive: true });
    gallery.addEventListener("touchmove", touchMove, { passive: true });
    gallery.addEventListener("touchend", touchEnd);
    gallery.addEventListener("touchcancel", touchEnd);
    gallery.addEventListener("click", click, true);
    gallery.addEventListener("grid-explore", explore);
    gallery.addEventListener("grid-lightbox", lightbox);
    gallery.addEventListener("focusin", focus);
    gallery.addEventListener("focusout", blur);
    document.addEventListener("visibilitychange", visibility);
    const observer = new IntersectionObserver(([entry]) => {
      offscreen = !entry?.isIntersecting;
      if (offscreen && interactive()) pause(); else resumeLater();
    });
    observer.observe(gallery);
    place();
    let watchdog: ReturnType<typeof setTimeout> | undefined;
    const prepare = async () => {
      const images = Array.from(document.querySelectorAll<HTMLImageElement>("[data-intro-image], [data-intro-logo]"));
      await Promise.all(images.map(async image => { try { await image.decode(); } catch { /* Failed assets cannot trap the loader. */ } }));
    };
    const assetsReady = Promise.race([prepare(), new Promise<void>(resolve => { watchdog = setTimeout(resolve, 8000); })]);
    const begin = () => {
      if (disposed) return;
      clearTimeout(watchdog);
      place();
      entrance = gsap.timeline();
      entrance.call(() => { phase("reveal"); }, [], 0)
        .to(counter, { opacity: 0, duration: 0.4 }, 0)
        .to(surface, { opacity: 0, duration: 0.85, ease: "power2.inOut" }, 0.2)
        .to(columns, { clipPath: "inset(0% 0 0 0)", duration: 0.9, stagger: 0.08, ease: "power3.inOut" }, 0.2)
        .to(logo, { opacity: 0, duration: 0.6 }, 0.3)
        .call(() => {
          phase("hold");
          // Only loading locks the page. The grid never owns page navigation.
          document.documentElement.style.overflow = previousOverflow;
          gsap.set(layer, { display: "none" });
          onReveal(); onComplete(); onFinish();
        }, [], 1.26)
        .call(() => { phase("movement"); }, [], 3.01)
        .to(geometry, { travel: 1, duration: 3.4, ease: "power2.inOut", onUpdate: place }, 3.01)
        .to(geometry, { travel: "+=1", duration: 12, repeat: -1, repeatRefresh: true, ease: "none", onUpdate: place });
    };
    const progress = { value: 0 };
    const loading = gsap.timeline();
    if (reduced) {
      phase("hold");
      gsap.set(columns, { clipPath: "inset(0% 0 0 0)" });
      gsap.set(layer, { display: "none" });
      document.documentElement.style.overflow = previousOverflow;
      userPaused = true;
      onReveal(); onComplete(); onFinish();
      announce();
    } else loading.to(progress, { value: 94, duration: 3.15, ease: "none", onUpdate: () => { counter.textContent = `${Math.floor(progress.value)}%`; } });
    if (!reduced) loading.call(() => {
      void assetsReady.then(() => {
        if (disposed) return;
        loading.to(progress, { value: 100, duration: 0.3, ease: "none", onUpdate: () => { counter.textContent = `${Math.floor(progress.value)}%`; } })
          .to({}, { duration: 0.3 }).call(begin);
      });
    });
    window.addEventListener("resize", place);
    return () => {
      disposed = true;
      clearTimeout(resumeTimer);
      manualTween?.kill();
      gallery.removeEventListener("wheel", wheel);
      gallery.removeEventListener("touchstart", touchStart);
      gallery.removeEventListener("touchmove", touchMove);
      gallery.removeEventListener("touchend", touchEnd);
      gallery.removeEventListener("touchcancel", touchEnd);
      gallery.removeEventListener("click", click, true);
      gallery.removeEventListener("grid-explore", explore);
      observer.disconnect();
      gallery.removeEventListener("grid-lightbox", lightbox);
      gallery.removeEventListener("focusin", focus);
      gallery.removeEventListener("focusout", blur);
      document.removeEventListener("visibilitychange", visibility);
      delete gallery.dataset['phase'];
      clearTimeout(watchdog);
      loading.kill(); entrance?.kill();
      window.removeEventListener("resize", place);
      document.documentElement.style.overflow = previousOverflow;
      gsap.set(gallery, { clearProps: "opacity" });
      gsap.set(tracks, { clearProps: "transform" });
      gsap.set(columns, { clearProps: "transform,opacity,clipPath" });
    };
  }, [onReveal, onComplete, onFinish]);
  return (
    <div ref={layerRef} data-logo-intro className="fixed inset-0 z-[80] pointer-events-none" aria-label="Loading Balance Design">
      <div ref={surfaceRef} data-loader-surface className="absolute inset-0 bg-intro-background" />
      <div ref={logoRef} className="intro-logo">
        <img src={originalLogo} data-intro-logo alt="Balance Design" width={800} height={648} className="absolute inset-0 w-full h-full object-contain" />
      </div>
      <p ref={counterRef} data-loading-counter className="intro-counter text-intro-foreground" aria-live="off">0%</p>
    </div>
  );
}

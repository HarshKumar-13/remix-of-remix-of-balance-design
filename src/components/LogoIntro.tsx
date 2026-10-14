import { useEffect, useRef } from "react";
import gsap from "gsap";
import originalLogo from "@/assets/balance-logo-navbar.png";

/** One entrance clock: preparation, reveal, still hold, travel and shared banner. */
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
    const banner = document.querySelector<HTMLElement>("[data-featured-banner]");
    const destination = document.querySelector<HTMLElement>("[data-banner-destination]");
    const copy = document.querySelector<HTMLElement>("[data-hero-copy]");
    const caption = document.querySelector<HTMLElement>("[data-banner-phrase]");
    const target = document.querySelector<HTMLImageElement>("[data-navbar-logo] img");
    if (!layer || !surface || !logo || !counter || !gallery || !banner || !destination || !copy || !caption || !target) {
      onReveal(); onComplete(); onFinish(); return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { onReveal(); onComplete(); onFinish(); return; }
    let disposed = false;
    let entrance: gsap.core.Timeline | undefined;
    const columns = Array.from(gallery.querySelectorAll<HTMLElement>("[data-hero-column]"));
    const tracks = Array.from(gallery.querySelectorAll<HTMLElement>("[data-column-track]"));
    const geometry = { travel: 0, expansion: 0, logoLanding: 0 };
    const manual = { offset: 0 };
    let manualTarget = 0;
    let manualTween: gsap.core.Tween | undefined;
    let resumeTimer: ReturnType<typeof setTimeout> | undefined;
    let userPaused = false;
    let lightboxOpen = false;
    let touchY: number | undefined;
    let dragged = false;
    const interactive = () => gallery.dataset['phase'] === "hold" || gallery.dataset['phase'] === "movement";
    const announce = () => gallery.dispatchEvent(new CustomEvent("grid-pause-state", { detail: Boolean(entrance?.paused()) }));
    const pause = () => { clearTimeout(resumeTimer); entrance?.pause(); announce(); };
    const resume = () => {
      if (disposed || userPaused || lightboxOpen || document.hidden || !interactive()) return;
      entrance?.resume(); announce();
    };
    const resumeLater = () => { clearTimeout(resumeTimer); resumeTimer = setTimeout(resume, 1600); };
    const phase = (value: string) => {
      layer.dataset['phase'] = value;
      gallery.dataset['phase'] = value;
      if (value === "movement") entrance?.timeScale(0.55);
      if (value === "expansion") entrance?.timeScale(1);
      place();
    };
    let source: HTMLElement | undefined;
    let sharedImage: HTMLImageElement | undefined;
    let originalImageClass = "";
    const firstBannerImage = banner.querySelector<HTMLImageElement>("[data-banner-image='0']");
    let expanding = false;
    const galleryParent = gallery.parentNode;
    const bannerParent = banner.parentNode;
    // Retain the actual nodes, but escape sticky/overflow ancestors during flight.
    document.body.appendChild(gallery);
    const restoreNodes = () => {
      if (sharedImage && source) {
        sharedImage.className = originalImageClass;
        delete sharedImage.dataset['sharedFlight'];
        source.appendChild(sharedImage);
        source.style.removeProperty("aspect-ratio");
        source.style.removeProperty("opacity");
        sharedImage = undefined;
      }
      firstBannerImage?.style.removeProperty("visibility");
      if (galleryParent) galleryParent.appendChild(gallery);
      if (bannerParent) bannerParent.appendChild(banner);
    };
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    layer.dataset['phase'] = "loading";
    gsap.set(copy, { opacity: 0, y: 16 });
    gsap.set(caption, { opacity: 0 });
    gsap.set(banner, { visibility: "hidden" });
    gsap.set(gallery, { display: "grid", position: "fixed", inset: 0, zIndex: 70, opacity: 1 });
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
        const distance = height * (i === 0 ? 0.7 : i === 1 ? 0.6 : 0.85);
        // Measure natural photo stacks, never impose a uniform cell height.
        // Leave several complete cycles above and below every viewport.
        const start = Math.min(-cycleHeight, -cycleHeight * 3 + (i === 0 ? height * 0.18 + distance * 0.776 : i === 1 ? -height * 0.45 : -height * 0.12));
        gsap.set(track, { y: start + (i === 1 ? distance : -distance) * geometry.travel + (i === 1 ? 1 : -1) * manual.offset });
        track.querySelectorAll<HTMLElement>("[data-column-image]").forEach(cell => {
          const rect = cell.getBoundingClientRect();
          cell.tabIndex = interactive() && rect.bottom > 0 && rect.top < height ? 0 : -1;
        });
      });
      const to = target.getBoundingClientRect();
      const width = logo.offsetWidth;
      const h = logo.offsetHeight;
      const fromLeft = (window.innerWidth - width) / 2;
      const fromTop = (window.innerHeight - h) / 2;
      const p = geometry.logoLanding;
      gsap.set(logo, { x: (to.left - fromLeft) * p, y: (to.top - fromTop) * p, scale: 1 + (to.width / width - 1) * p });
      if (expanding && source) {
        // Continue the gallery's motion while the very same photograph expands.
        const from = source.getBoundingClientRect();
        const final = destination.getBoundingClientRect();
        const q = geometry.expansion;
        gsap.set(banner, {
          autoRound: false,
          left: from.left + (final.left - from.left) * q,
          top: from.top + (final.top - from.top) * q,
          width: from.width + (final.width - from.width) * q,
          height: from.height + (final.height - from.height) * q,
        });
      }
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
      event.preventDefault();
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1;
      move(Math.max(-100, Math.min(100, event.deltaY * unit * 0.35)));
    };
    const touchStart = (event: TouchEvent) => { if (interactive()) { touchY = event.touches[0]?.clientY; dragged = false; pause(); } };
    const touchMove = (event: TouchEvent) => {
      const next = event.touches[0]?.clientY;
      if (!interactive() || lightboxOpen || touchY === undefined || next === undefined) return;
      event.preventDefault();
      const delta = touchY - next;
      if (Math.abs(delta) > 2) dragged = true;
      move(delta * 0.55); touchY = next;
    };
    const touchEnd = () => { touchY = undefined; resumeLater(); };
    const click = (event: MouseEvent) => {
      if (dragged) { event.preventDefault(); event.stopImmediatePropagation(); dragged = false; return; }
      if (!interactive() || !(event.target instanceof Element) || !event.target.closest("[data-grid-toggle]")) return;
      userPaused = !userPaused;
      if (userPaused) pause(); else resume();
    };
    const keyboard = (event: KeyboardEvent) => {
      if (!interactive() || lightboxOpen) return;
      const deltas: Record<string, number> = { ArrowDown: 70, ArrowUp: -70, PageDown: 160, PageUp: -160 };
      const delta = deltas[event.key];
      if (delta !== undefined) { event.preventDefault(); move(delta); }
    };
    const lightbox = (event: Event) => {
      lightboxOpen = Boolean((event as CustomEvent<boolean>).detail);
      if (lightboxOpen) { pause(); manualTween?.kill(); manualTarget = manual.offset; }
      else resumeLater();
    };
    const visibility = () => { if (document.hidden && interactive()) pause(); else resumeLater(); };
    const focus = () => { if (interactive()) pause(); };
    const blur = () => { if (!lightboxOpen) resumeLater(); };
    gallery.addEventListener("wheel", wheel, { passive: false });
    gallery.addEventListener("touchstart", touchStart, { passive: true });
    gallery.addEventListener("touchmove", touchMove, { passive: false });
    gallery.addEventListener("touchend", touchEnd);
    gallery.addEventListener("touchcancel", touchEnd);
    gallery.addEventListener("click", click, true);
    gallery.addEventListener("keydown", keyboard);
    gallery.addEventListener("grid-lightbox", lightbox);
    gallery.addEventListener("focusin", focus);
    gallery.addEventListener("focusout", blur);
    document.addEventListener("visibilitychange", visibility);
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
      entrance = gsap.timeline({ onComplete: () => {
        restoreNodes();
        gsap.set(banner, { clearProps: "position,zIndex,left,top,width,height,visibility" });
        gsap.set(gallery, { clearProps: "display,position,inset,zIndex,opacity" });
        gsap.set(copy, { clearProps: "opacity,transform" });
        gsap.set(caption, { clearProps: "opacity" });
        document.documentElement.style.overflow = previousOverflow;
        onReveal(); onFinish();
      } });
      entrance.call(() => { phase("reveal"); }, [], 0)
        .to(counter, { opacity: 0, duration: 0.4 }, 0)
        .to(surface, { opacity: 0, duration: 0.85, ease: "power2.inOut" }, 0.2)
        .to(columns, { clipPath: "inset(0% 0 0 0)", duration: 0.9, stagger: 0.08, ease: "power3.inOut" }, 0.2)
        .to(logo, { opacity: 0, duration: 0.6 }, 0.3)
        .call(() => { phase("hold"); }, [], 1.26)
        // All tracks remain stationary for 1.75 seconds after fully revealing.
        .call(() => { phase("movement"); }, [], 3.01)
        .to(geometry, { travel: 1, duration: 3.4, ease: "power2.inOut", onUpdate: place }, 3.01)
        .call(() => {
          phase("expansion");
          // Choose a visible occurrence of the exact first banner photograph.
          const candidates = Array.from(columns[0]?.querySelectorAll<HTMLElement>("[data-cycle-start]") ?? []);
          source = candidates.filter(image => {
            const rect = image.getBoundingClientRect();
            return rect.bottom > 0 && rect.top < window.innerHeight;
          }).sort((a, b) => Math.abs(a.getBoundingClientRect().top - window.innerHeight * 0.18) - Math.abs(b.getBoundingClientRect().top - window.innerHeight * 0.18))[0];
          if (!source) return;
          const image = source.querySelector<HTMLImageElement>("img");
          if (!image) return;
          // Fly the actual collage image, not a second image fading into its place.
          sharedImage = image;
          originalImageClass = image.className;
          source.style.aspectRatio = `${image.naturalWidth} / ${image.naturalHeight}`;
          expanding = true;
          document.body.appendChild(banner);
          gsap.set(banner, { position: "fixed", zIndex: 75, visibility: "visible" });
          place();
          if (firstBannerImage) firstBannerImage.style.visibility = "hidden";
          image.className = "editorial-banner-image";
          image.dataset['sharedFlight'] = "true";
          banner.appendChild(image);
          gsap.set(source, { opacity: 0 });
        }, [], 5.11)
        .to(geometry, { expansion: 1, duration: 2.35, ease: "power2.inOut", onUpdate: place }, 5.11)
        .to(columns, { xPercent: i => i === 0 ? -105 : i === 2 ? 105 : 0, opacity: 0, duration: 1.8, ease: "power2.inOut" }, 5.56)
        .to(gallery, { opacity: 0, duration: 0.8, ease: "power2.inOut" }, 6.66)
        .to(geometry, { logoLanding: 1, duration: 2.1, ease: "power3.inOut", onUpdate: place }, 5.11)
        .to(logo, { opacity: 1, duration: 0.65 }, 6.81)
        .call(onComplete, [], 6.81)
        .to(copy, { opacity: 1, y: 0, duration: 0.95, ease: "power2.out" }, 6.51)
        .to(caption, { opacity: 1, duration: 0.65 }, 6.81);
    };
    const progress = { value: 0 };
    const loading = gsap.timeline();
    loading.to(progress, { value: 94, duration: 3.15, ease: "none", onUpdate: () => { counter.textContent = `${Math.floor(progress.value)}%`; } });
    loading.call(() => {
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
      gallery.removeEventListener("keydown", keyboard);
      gallery.removeEventListener("grid-lightbox", lightbox);
      gallery.removeEventListener("focusin", focus);
      gallery.removeEventListener("focusout", blur);
      document.removeEventListener("visibilitychange", visibility);
      delete gallery.dataset['phase'];
      restoreNodes();
      clearTimeout(watchdog);
      loading.kill(); entrance?.kill();
      window.removeEventListener("resize", place);
      document.documentElement.style.overflow = previousOverflow;
      gsap.set(gallery, { clearProps: "display,position,inset,zIndex,opacity" });
      gsap.set(banner, { clearProps: "position,zIndex,left,top,width,height,visibility" });
      gsap.set(copy, { clearProps: "opacity,transform" });
      gsap.set(caption, { clearProps: "opacity" });
      gsap.set(tracks, { clearProps: "transform" });
      gsap.set(columns, { clearProps: "transform,opacity" });
      if (source) gsap.set(source, { clearProps: "opacity" });
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

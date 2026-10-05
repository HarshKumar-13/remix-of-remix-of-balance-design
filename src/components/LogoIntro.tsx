import { useEffect, useRef } from "react";
import gsap from "gsap";

import logoOriginal from "@/assets/balance-logo-navbar.png";

export function LogoIntro({ onComplete }: { onComplete: () => void }) {
  const layerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    const logo = logoRef.current;
    const navbarLogo = document.querySelector<HTMLElement>("[data-navbar-logo]");

    if (!layer || !logo || !navbarLogo) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onComplete();
      return;
    }

    const destination = navbarLogo.getBoundingClientRect();
    const startWidth = Math.min(window.innerWidth * 0.58, 420);
    const startHeight = startWidth * (destination.height / destination.width);
    gsap.set(logo, {
      left: window.innerWidth / 2 - startWidth / 2,
      top: window.innerHeight / 2 - startHeight / 2,
      width: startWidth,
      height: startHeight,
    });

    const timeline = gsap.timeline({ defaults: { ease: "power3.inOut" } });

    timeline
      .to(logo, {
        left: destination.left,
        top: destination.top,
        width: destination.width,
        height: destination.height,
        duration: 1.35,
        delay: 1.1,
      })
      .to(layer, { opacity: 0, duration: 0.45, ease: "power2.out" }, "-=0.12")
      .call(onComplete);

    return () => {
      timeline.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={layerRef}
      className="fixed inset-0 z-[80] overflow-hidden bg-white"
      aria-hidden="true"
    >
      <img
        ref={logoRef}
        src={logoOriginal}
        alt=""
        className="absolute object-contain"
      />
    </div>
  );
}
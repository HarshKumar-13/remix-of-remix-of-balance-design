import { useEffect, useRef } from "react";
import gsap from "gsap";

import logoOriginal from "@/assets/balance-logo-navbar.png";

export function LogoIntro({ onComplete, onFinish }: { onComplete: () => void; onFinish?: () => void }) {
  const layerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    const logo = logoRef.current;
    const navbarLogo = document.querySelector<HTMLElement>("[data-navbar-logo]");

    if (!layer || !logo || !navbarLogo) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onComplete();
      onFinish?.();
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

    gsap.set(logo, { opacity: 0, scale: 0.96 });
    const timeline = gsap.timeline({ defaults: { ease: "power2.inOut" } });

    timeline
      .to(logo, { opacity: 1, scale: 1, duration: 0.9, ease: "power2.out" })
      .addLabel("move", "+=0.7")
      .to(
        logo,
        {
          left: destination.left,
          top: destination.top,
          width: destination.width,
          height: destination.height,
          duration: 1.6,
          ease: "power3.inOut",
        },
        "move",
      )
      .to(layer, { backgroundColor: "rgba(255,255,255,0)", duration: 1.6 }, "move")
      .call(onComplete, [], "move+=0.9")
      .to(logo, { opacity: 0, duration: 0.5, ease: "power1.out" }, "move+=1.6")
      .call(() => onFinish?.());

    return () => {
      timeline.kill();
    };
  }, [onComplete, onFinish]);

  return (
    <div
      ref={layerRef}
      className="pointer-events-none fixed inset-0 z-[80] overflow-hidden bg-white"
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
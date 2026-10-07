import { useEffect, useRef } from "react";
import gsap from "gsap";

import logoOriginal from "@/assets/balance-logo-navbar.png";

export function LogoIntro({ onComplete, onFinish }: { onComplete: () => void; onFinish?: () => void }) {
  const layerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    const logo = logoRef.current;
    if (!layer || !logo) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onComplete();
      onFinish?.();
      return;
    }

    gsap.set(logo, { opacity: 0, scale: 0.96 });
    const timeline = gsap.timeline({ defaults: { ease: "power2.inOut" } });

    timeline
      .to(logo, { opacity: 1, scale: 1, duration: 0.7 }, 0.8)
      // Logo holds centered, then shrinks and glides into the navbar logo slot
      .call(
        () => {
          const target = document.querySelector<HTMLElement>("[data-navbar-logo] img");
          if (!target) return;
          const from = logo.getBoundingClientRect();
          const to = target.getBoundingClientRect();
          const scale = to.height / from.height;
          const dx = to.left + to.width / 2 - (from.left + from.width / 2);
          const dy = to.top + to.height / 2 - (from.top + from.height / 2);
          gsap.to(logo, {
            x: dx,
            y: dy,
            scale,
            duration: 0.8,
            ease: "power2.inOut",
          });
        },
        [],
        3.5,
      )
      // White backdrop dissolves as the logo travels
      .to(layer, { opacity: 0, duration: 0.7 }, 3.6)
      // Navbar fades in exactly as the intro logo lands in its slot
      .call(onComplete, [], 4.2)
      .to(logo, { opacity: 0, duration: 0.15 }, 4.25)
      .call(() => onFinish?.(), [], 4.4);

    return () => {
      timeline.kill();
    };
  }, [onComplete, onFinish]);

  return (
    <div
      ref={layerRef}
      className="fixed inset-0 z-[80] flex items-center justify-center overflow-hidden bg-background"
      aria-hidden="true"
    >
      <img
        ref={logoRef}
        src={logoOriginal}
        alt=""
        className="h-auto w-[58%] max-w-[420px] object-contain opacity-0"
      />
    </div>
  );
}

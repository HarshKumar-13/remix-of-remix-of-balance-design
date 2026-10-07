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
      .call(onComplete, [], 3.5)
      .to(logo, { opacity: 0, duration: 0.6 }, 3.5)
      .to(layer, { opacity: 0, duration: 0.7 }, 3.5)
      .call(() => onFinish?.(), [], 4.2);

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
import { useEffect, useRef, useState } from "react";
import logoLight from "@/assets/logo-light.png.asset.json";

export function SiteFooter() {
  const ref = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the footer first enters, 1 when it is fully revealed
      const p = Math.min(1, Math.max(0, (vh - rect.top) / Math.min(rect.height, vh)));
      setProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <footer
      ref={ref}
      id="contact"
      className="bg-charcoal text-ivory sticky bottom-0 z-0 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6 pb-4 pt-20 md:px-12 md:pt-28">
        <div
          className="transition-none"
          style={{
            opacity: Math.min(1, progress * 1.6),
            transform: `translateY(${(1 - Math.min(1, progress * 1.4)) * 40}px)`,
          }}
        >
          <img
            src={logoLight.url}
            alt="Balance Design & Fashion Consultancy logo"
            className="h-24 w-auto md:h-32"
          />

          <p className="label-xs mt-6 opacity-60">Design &amp; Fashion Consultancy</p>

          <div className="mt-14 grid grid-cols-1 gap-10 border-t border-ivory/15 pt-10 sm:grid-cols-3">
            <nav className="flex flex-col gap-4">
              {[
                { l: "Home", h: "/#top" },
                { l: "About Us", h: "/#about" },
                { l: "Services", h: "/#services" },
                { l: "Journal", h: "/blog" },
                { l: "Contact Us", h: "/#contact" },
              ].map((n) => (
                <a
                  key={n.l}
                  href={n.h}
                  className="label-xs transition-opacity duration-500 hover:opacity-50"
                >
                  {n.l}
                </a>
              ))}
            </nav>
            <div>
              <p className="label-xs opacity-50">Website</p>
              <a
                href="https://www.balancedesign.in"
                className="link-underline mt-4 inline-block font-display text-2xl md:text-3xl"
              >
                www.balancedesign.in
              </a>
            </div>
            <div>
              <p className="label-xs opacity-50">Enquiries</p>
              <p className="mt-4 text-lg opacity-60">
                Contact details to be supplied by the client.
              </p>
            </div>
          </div>

          <div className="mt-14 flex flex-wrap items-center gap-8 border-t border-ivory/15 pt-8">
            <span className="label-xs opacity-40">
              &copy; 2026 Balance Design. All Rights Reserved.
            </span>
            <span className="label-xs opacity-40">Privacy</span>
            <span className="label-xs opacity-40">Terms</span>
          </div>

        </div>
      </div>

      {/* Oversized wordmark that rises into view as the footer is revealed */}
      <div className="pointer-events-none select-none overflow-hidden">
        <h2
          aria-hidden="true"
          className="display whitespace-nowrap text-center text-[22vw] leading-[0.78] text-ivory"
          style={{
            transform: `translateY(${(1 - progress) * 22}%)`,
            opacity: 0.15 + progress * 0.85,
          }}
        >
          BALANCE
        </h2>
      </div>
    </footer>
  );
}

import { useEffect, useState } from "react";

import logoDark from "@/assets/balance-logo-navbar.png";

const NAV = [
  { label: "Home", href: "/#top" },
  { label: "About Us", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Find Your Service", href: "/find-your-service" },
  { label: "Contact Us", href: "/contact" },
];

export function SiteHeader({
  introComplete = true,
  forceSolid = false,
}: {
  introComplete?: boolean;
  forceSolid?: boolean;
}) {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const showSolid = solid || forceSolid;
  const tone = open ? "text-ivory" : "text-foreground";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[60] transition-all duration-700 ${
          open
            ? "bg-transparent"
            : showSolid
              ? "border-b border-border bg-background/95 backdrop-blur-sm"
              : "bg-white/70 backdrop-blur-md"
        }`}
      >
        <div
          className={`flex items-center justify-between px-6 py-3 transition-opacity duration-700 md:px-12 ${tone} ${introComplete ? "opacity-100" : "opacity-0"}`}
        >
          <a
            href="/#top"
            aria-label="Balance Design & Fashion Consultancy"
            className="block"
            data-navbar-logo
          >
            <img
              src={logoDark}
              alt="Balance Design & Fashion Consultancy"
              className="h-[4.375rem] w-auto md:h-[6.25rem]"
            />
          </a>

          <div className="flex items-center gap-8 md:gap-12">
            <a href="/contact" className="label-xs link-underline hidden sm:inline-block">
              Contact
            </a>
            <button
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="label-xs flex items-center gap-3 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4"
            >
              <span className="hidden md:inline">{open ? "Close" : "Menu"}</span>
              <span className="flex h-4 w-6 flex-col justify-center gap-[5px]">
                <span
                  className={`block h-px w-full bg-current transition-transform duration-500 ${open ? "translate-y-[3px] rotate-45" : ""}`}
                />
                <span
                  className={`block h-px w-full bg-current transition-transform duration-500 ${open ? "-translate-y-[3px] -rotate-45" : ""}`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        aria-hidden={!open}
        className={`fixed inset-0 z-50 bg-charcoal text-ivory transition-opacity duration-700 ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav className="flex h-full flex-col justify-center gap-2 px-6 pt-24 md:px-12 md:pt-28">
          {NAV.map((n, i) => (
            <a
              key={n.label}
              href={n.href}
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
              className="display w-fit text-[2.5rem] leading-[1.15] transition-[opacity,transform,color] duration-700 hover:text-red md:text-[5rem]"
              style={{
                opacity: open ? 1 : 0,
                transform: open ? "none" : "translateY(28px)",
                transitionDelay: `${open ? 120 + i * 70 : 0}ms`,
              }}
            >
              {n.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}

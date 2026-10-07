import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";

/**
 * Persistent workshop enquiry CTA. It emerges once the reader is past the
 * opening screen, steps aside before the closing contact panel, and stays out
 * of the way of the "Design workshops & seminars" section's own CTA so the two
 * identical buttons never sit on screen together.
 */
export function FloatingBookCta() {
  const location = useLocation();
  const [pastIntro, setPastIntro] = useState(false);
  const [awayFromEnd, setAwayFromEnd] = useState(true);
  const [nearSectionCta, setNearSectionCta] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      const remaining = document.documentElement.scrollHeight - (y + vh);
      setPastIntro(y > vh * 0.85);
      setAwayFromEnd(remaining > vh * 0.6);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [location.pathname]);

  useEffect(() => {
    const section = document.getElementById("services");
    if (!section) {
      setNearSectionCta(false);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => setNearSectionCta(entries.some((entry) => entry.isIntersecting)),
      { threshold: 0.01 },
    );
    io.observe(section);
    return () => io.disconnect();
  }, [location.pathname]);

  const visible =
    !nearSectionCta && pastIntro && awayFromEnd && location.pathname !== "/contact";

  return (
    <div
      className="floating-cta fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-5 sm:justify-end sm:px-6 sm:pb-7"
      data-visible={visible}
      aria-hidden={!visible}
    >
      <Link to="/contact" tabIndex={visible ? 0 : -1} className="btn-red label-xs">
        Book your workshop
      </Link>
    </div>
  );
}

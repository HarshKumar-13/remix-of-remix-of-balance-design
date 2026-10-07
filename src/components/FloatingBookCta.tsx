import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";

/**
 * Persistent workshop enquiry CTA. It emerges once the reader is past the
 * opening screen and steps aside before the closing contact panel, so the two
 * never compete for the same attention.
 */
export function FloatingBookCta() {
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (location.pathname === "/contact") {
      setVisible(false);
      return;
    }

    const onScroll = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      const remaining = document.documentElement.scrollHeight - (y + vh);
      setVisible(y > vh * 0.85 && remaining > vh * 0.6);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [location.pathname]);

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

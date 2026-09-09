import { useEffect, useRef, useState, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";

/**
 * Short editorial page transition: a charcoal mask wipes across on
 * navigation instead of a white flash or a spinner.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const first = useRef(true);
  const [wiping, setWiping] = useState(false);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setWiping(true);
    const t = setTimeout(() => setWiping(false), 620);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <>
      <div
        aria-hidden="true"
        className={`page-wipe ${wiping ? "page-wipe-active" : ""}`}
      />
      <div key={pathname} className="page-enter">
        {children}
      </div>
    </>
  );
}

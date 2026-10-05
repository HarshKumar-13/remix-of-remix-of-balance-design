import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const COLS = 14;
const ROWS = 8;
const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Intro: a grid of checkboxes ticks in, BALANCE DESIGN emerges from it,
 * then the whole panel collapses upward into the white navigation bar.
 */
export function BrandReveal({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"grid" | "word" | "bar" | "gone">("grid");

  useEffect(() => {
    const t1 = window.setTimeout(() => setPhase("word"), 1100);
    const t2 = window.setTimeout(() => setPhase("bar"), 2100);
    const t3 = window.setTimeout(() => {
      setPhase("gone");
      onDone();
    }, 3000);
    return () => [t1, t2, t3].forEach(window.clearTimeout);
  }, [onDone]);

  if (phase === "gone") return null;

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[70] overflow-hidden bg-background"
      initial={{ height: "100svh" }}
      animate={{ height: phase === "bar" ? "var(--hero-bar-h)" : "100svh" }}
      transition={{ duration: 0.85, ease: EASE }}
      style={{ ["--hero-bar-h" as string]: "118px" }}
    >
      <style>{`@media (min-width:768px){[data-brand-reveal]{--hero-bar-h:148px}}`}</style>
      <div data-brand-reveal className="absolute inset-0">
        <motion.div
          className="absolute inset-0 grid place-items-center p-4 md:p-10"
          style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}
          animate={{
            scale: phase === "grid" ? 1 : 1.35,
            opacity: phase === "grid" ? 1 : phase === "word" ? 0.18 : 0,
          }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          {Array.from({ length: COLS * ROWS }).map((_, i) => {
            const r = Math.floor(i / COLS);
            const c = i % COLS;
            const checked = (r + c) % 2 === 0;
            const delay = ((r + c) / (COLS + ROWS)) * 0.7;
            return (
              <motion.span
                key={i}
                className="relative block aspect-square w-[58%] border border-foreground/70"
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, delay, ease: EASE }}
              >
                {checked && (
                  <motion.span
                    className="absolute inset-[22%] bg-foreground"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.3, delay: delay + 0.25, ease: EASE }}
                  />
                )}
              </motion.span>
            );
          })}
        </motion.div>

        <div className="absolute inset-0 flex items-center justify-center">
          <motion.h2
            className="display whitespace-nowrap text-[11vw] leading-none text-foreground md:text-[8vw]"
            initial={{ clipPath: "inset(50% 0 50% 0)", opacity: 0, letterSpacing: "0.4em" }}
            animate={
              phase === "grid"
                ? { clipPath: "inset(50% 0 50% 0)", opacity: 0, letterSpacing: "0.4em" }
                : phase === "word"
                  ? { clipPath: "inset(0% 0 0% 0)", opacity: 1, letterSpacing: "0.04em" }
                  : { clipPath: "inset(0% 0 0% 0)", opacity: 0, letterSpacing: "0.04em", scale: 0.35, y: "-40vh" }
            }
            transition={{ duration: 0.85, ease: EASE }}
          >
            Balance Design
          </motion.h2>
        </div>
      </div>
    </motion.div>
  );
}

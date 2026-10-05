import { motion, type TargetAndTransition } from "framer-motion";
import type { Beat, Motion, Placement, Seg } from "./sequence";

const EASE = [0.16, 1, 0.3, 1] as const;

const VARIANTS: Record<Motion, { initial: TargetAndTransition; animate: TargetAndTransition; exit: TargetAndTransition }> = {
  fadeScale: {
    initial: { opacity: 0, scale: 0.94 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: EASE } },
    exit: { opacity: 0, scale: 1.04, transition: { duration: 0.5, ease: EASE } },
  },
  clip: {
    initial: { clipPath: "inset(0 100% 0 0)", opacity: 1 },
    animate: { clipPath: "inset(0 0% 0 0)", transition: { duration: 0.9, ease: EASE } },
    exit: { clipPath: "inset(0 0 0 100%)", transition: { duration: 0.6, ease: EASE } },
  },
  blur: {
    initial: { opacity: 0, filter: "blur(14px)" },
    animate: { opacity: 1, filter: "blur(0px)", transition: { duration: 0.9, ease: EASE } },
    exit: { opacity: 0, filter: "blur(10px)", transition: { duration: 0.55 } },
  },
  slide: {
    initial: { opacity: 0, x: -40 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE } },
    exit: { opacity: 0, x: 30, transition: { duration: 0.5, ease: EASE } },
  },
  flash: {
    initial: { opacity: 0 },
    animate: { opacity: [0, 1, 0.2, 1], transition: { duration: 0.5, times: [0, 0.3, 0.55, 1] } },
    exit: { opacity: 0, transition: { duration: 0.25 } },
  },
  dissolve: {
    initial: { opacity: 0, y: 8, letterSpacing: "0.08em" },
    animate: { opacity: 1, y: 0, letterSpacing: "0em", transition: { duration: 1.1, ease: EASE } },
    exit: { opacity: 0, y: -6, transition: { duration: 0.7, ease: EASE } },
  },
};

// Text sits on a fixed composition: the image fills the right of the hero on desktop,
// so "left"/"outside" land on ivory space, "edge" straddles the seam, "over" sits on the subject.
const PLACE: Record<Placement, string> = {
  left: "left-6 top-[18%] max-w-[85vw] md:left-12 md:top-[26%] md:max-w-[40vw]",
  edge: "left-6 bottom-[22%] max-w-[85vw] md:left-[28vw] md:bottom-[24%] md:max-w-[38vw]",
  over: "right-6 top-[28%] max-w-[80vw] text-right md:right-[8vw] md:top-[30%] md:max-w-[34vw]",
  outside: "left-6 bottom-[12%] max-w-[85vw] md:left-12 md:bottom-[14%] md:max-w-[30vw]",
  oversize: "inset-x-6 top-1/2 -translate-y-1/2 md:inset-x-12",
  low: "left-6 bottom-[14%] max-w-[85vw] md:left-[44vw] md:bottom-[12%] md:max-w-[40vw]",
};

const SIZE: Record<Beat["kind"], string> = {
  phrase: "display uppercase text-[9vw] leading-[0.95] md:text-[4.6vw]",
  question: "font-sans font-light italic text-[7vw] leading-[1.12] md:text-[3vw]",
  statement: "font-sans font-light text-[6.2vw] leading-[1.18] md:text-[2.5vw]",
};

function render(parts: Seg[]) {
  return parts.map((p, i) =>
    typeof p === "string" ? (
      <span key={i}>{p}</span>
    ) : (
      <span key={i} className="display not-italic text-[1.35em] uppercase leading-none">
        {p.em}
      </span>
    ),
  );
}

export function DynamicPhrase({ beat }: { beat: Beat }) {
  const v = VARIANTS[beat.motion];
  const size = beat.place === "oversize" ? "display uppercase text-[13vw] leading-[0.9] md:text-[10vw]" : SIZE[beat.kind];
  return (
    <motion.p
      className={`absolute ${PLACE[beat.place]} ${size} text-background mix-blend-difference`}
      initial={v.initial}
      animate={v.animate}
      exit={v.exit}
    >
      {render(beat.parts)}
    </motion.p>
  );
}

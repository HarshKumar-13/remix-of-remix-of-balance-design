import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Calm final composition once the sequence has played. */
export function HeroStatement({ show, scrollY }: { show: boolean; scrollY: number }) {
  return (
    <div
      className="absolute inset-x-6 bottom-[10%] text-background mix-blend-difference md:inset-x-12 md:bottom-[12%]"
      style={{ transform: `translate3d(0, ${scrollY * -0.12}px, 0)` }}
    >
      <h1 className="display text-[12vw] uppercase leading-[0.9] md:text-[7.4vw]">
        {["We transform", "the way you dress."].map((line, i) => (
          <span key={line} className="block overflow-hidden">
            <motion.span
              className="block"
              initial={{ y: "105%" }}
              animate={{ y: show ? "0%" : "105%" }}
              transition={{ duration: 1.1, delay: show ? 0.15 * i : 0, ease: EASE }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </h1>
      <motion.div
        className="mt-6 flex flex-wrap items-end justify-between gap-6 md:mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: show ? 1 : 0 }}
        transition={{ duration: 0.9, delay: show ? 0.6 : 0 }}
      >
        <p className="label-xs">Personal Image Consulting · Design · Styling · Fashion</p>
        <a href="#services" className="label-xs link-underline pointer-events-auto">
          Explore &nbsp;&rarr;
        </a>
      </motion.div>
    </div>
  );
}

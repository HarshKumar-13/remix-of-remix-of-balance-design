import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { DynamicPhrase } from "./DynamicPhrase";
import { BEATS } from "./sequence";

/** Plays phrases → questions → statements one at a time, then calls onDone. */
export function QuestionSequence({ start, onDone }: { start: boolean; onDone: () => void }) {
  const [i, setI] = useState(-1);

  useEffect(() => {
    if (start && i === -1) setI(0);
  }, [start, i]);

  useEffect(() => {
    if (i < 0) return;
    if (i >= BEATS.length) {
      onDone();
      return;
    }
    const t = window.setTimeout(() => setI((v) => v + 1), BEATS[i]!.ms);
    return () => window.clearTimeout(t);
  }, [i, onDone]);

  const beat = i >= 0 && i < BEATS.length ? BEATS[i] : null;

  return (
    <div aria-live="polite" className="pointer-events-none absolute inset-0">
      <AnimatePresence mode="wait">{beat && <DynamicPhrase key={i} beat={beat} />}</AnimatePresence>
    </div>
  );
}

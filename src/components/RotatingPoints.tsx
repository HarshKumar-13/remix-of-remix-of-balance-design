import { useEffect, useState } from "react";

import diamond from "@/assets/balance-diamond.png";

const TERMS = ["Design Aesthetics", "Fashion Styling", "Trend Forecasting & VM"];
const POINT_MS = 3000;
const TERM_MS = 3000;
const FADE_MS = 700;

/** Step 0 = point 1; steps 1..3 = point 2 with each rotating term. */
export function RotatingPoints() {
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(true);
  const [termVisible, setTermVisible] = useState(true);

  useEffect(() => {
    let t: number;
    const isLastOfPoint = step === 0 || step === TERMS.length;
    const hold = step === 0 ? POINT_MS : TERM_MS;
    if (isLastOfPoint) {
      t = window.setTimeout(() => setVisible(false), hold);
      const t2 = window.setTimeout(() => {
        setStep((s) => (s === 0 ? 1 : 0));
        setVisible(true);
      }, hold + FADE_MS);
      return () => {
        window.clearTimeout(t);
        window.clearTimeout(t2);
      };
    }
    t = window.setTimeout(() => setTermVisible(false), hold - 300);
    const t2 = window.setTimeout(() => {
      setStep((s) => s + 1);
      setTermVisible(true);
    }, hold);
    return () => {
      window.clearTimeout(t);
      window.clearTimeout(t2);
    };
  }, [step]);

  return (
    <div className="mt-8 min-h-[4.5rem] md:mt-10">
      <p
        className="flex items-start gap-3 text-lg leading-snug text-foreground md:text-xl"
        style={{ opacity: visible ? 1 : 0, transition: `opacity ${FADE_MS}ms ease-in-out` }}
        aria-live="polite"
      >
        <img src={diamond} alt="" aria-hidden="true" className="mt-[0.3em] h-4 w-auto shrink-0 md:h-5" />
        {step === 0 ? (
          <span>Elevate their skill and knowledge</span>
        ) : (
          <span>
            Enhance productivity in areas of{" "}
            <span
              className="inline-block"
              style={{ opacity: termVisible ? 1 : 0, transition: "opacity 300ms ease-in-out" }}
            >
              {TERMS[step - 1]}
            </span>
          </span>
        )}
      </p>
    </div>
  );
}

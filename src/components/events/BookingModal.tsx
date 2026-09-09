import { useEffect, useState } from "react";

import type { UpcomingEvent } from "@/data/events";

export function BookingModal({
  event,
  onClose,
}: {
  event: UpcomingEvent | null;
  onClose: () => void;
}) {
  const [sent, setSent] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!event) {
      setSent(false);
      setMounted(false);
      return;
    }
    const t = setTimeout(() => setMounted(true), 20);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [event, onClose]);

  if (!event) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center overflow-y-auto sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-label={`Book ${event.title}`}
    >
      <button
        aria-label="Close booking"
        onClick={onClose}
        className={`absolute inset-0 bg-charcoal/70 transition-opacity duration-700 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className={`relative z-10 my-0 w-full max-w-4xl bg-background transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] sm:my-10 ${
          mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative hidden overflow-hidden md:block">
            <img
              src={event.image}
              alt={event.title}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="relative px-6 py-10 sm:px-10 md:py-14">
            <button
              onClick={onClose}
              aria-label="Close"
              className="label-xs absolute right-5 top-5 text-muted-foreground transition-colors hover:text-red"
            >
              Close
            </button>

            {sent ? (
              <div className="py-16 text-center">
                <p className="label-xs text-red">Confirmed</p>
                <p className="display mt-6 text-3xl leading-[1.05] md:text-4xl">
                  Thank you. Your place has been requested.
                </p>
                <button onClick={onClose} className="label-xs link-underline mt-10">
                  Back to events
                </button>
              </div>
            ) : (
              <>
                <p className="label-xs text-red">{event.type}</p>
                <h2 className="display mt-4 text-3xl leading-[1.02] md:text-[2.6rem]">
                  {event.title}
                </h2>
                <p className="label-xs mt-5 text-muted-foreground">
                  {event.date} &nbsp;·&nbsp; {event.location}
                </p>
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                  {event.description}
                </p>

                <form
                  className="mt-8 flex flex-col gap-5"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSent(true);
                  }}
                >
                  <Field label="Full Name" type="text" name="name" />
                  <Field label="Email" type="email" name="email" />
                  <Field label="Phone Number" type="tel" name="phone" />
                  <Field label="Number of Guests" type="number" name="guests" defaultValue="1" />
                  <button type="submit" className="btn-red label-xs mt-2 w-full">
                    Confirm your place
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  type,
  name,
  defaultValue,
}: {
  label: string;
  type: string;
  name: string;
  defaultValue?: string;
}) {
  return (
    <label className="block">
      <span className="label-xs text-muted-foreground">{label}</span>
      <input
        required
        type={type}
        name={name}
        min={type === "number" ? 1 : undefined}
        defaultValue={defaultValue}
        className="mt-2 w-full border-b border-border bg-transparent pb-2 text-sm outline-none transition-colors focus:border-red"
      />
    </label>
  );
}

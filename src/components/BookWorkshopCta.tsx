import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const inputClass =
  "w-full border border-foreground/20 bg-background px-5 py-3.5 text-base text-foreground placeholder:text-foreground/40 focus:border-red focus:outline-none";

/**
 * The shared enquiry popup (the same "Enquire about workshop" form).
 * Controlled by the caller so any custom trigger can open it.
 */
export function BookingDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setError(null);
    const data = new FormData(e.currentTarget);
    const { error: insertError } = await supabase.from("booking_requests").insert({
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      phone: String(data.get("phone") || "").trim() || null,
      workshop: String(data.get("workshop") || "").trim() || null,
      message: String(data.get("message") || "").trim() || null,
    });
    setSending(false);
    if (insertError) {
      setError("Something went wrong. Please try again.");
      return;
    }
    setSubmitted(true);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        onOpenChange(next);
        if (!next) {
          setSubmitted(false);
          setError(null);
        }
      }}
    >
      <DialogContent className="max-w-xl border-foreground/10 bg-background p-7 sm:p-9">
        {submitted ? (
          <div className="py-6 text-center">
            <DialogHeader>
              <DialogTitle className="font-display text-3xl tracking-wide text-red">
                Thank you for reaching out
              </DialogTitle>
              <DialogDescription className="pt-3 text-lg text-foreground/70">
                Our team will contact you soon.
              </DialogDescription>
            </DialogHeader>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="btn-red label-xs mt-8"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-display text-3xl tracking-wide text-red">
                Enquire about workshop
              </DialogTitle>
              <DialogDescription className="text-base text-foreground/70">
                Tell us a little about yourself and the workshop you're interested in.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
              <input name="name" required placeholder="Your name" className={inputClass} />
              <input
                name="email"
                type="email"
                required
                placeholder="Email address"
                className={inputClass}
              />
              <input name="phone" type="tel" placeholder="Phone (optional)" className={inputClass} />
              <input
                name="workshop"
                placeholder="Which workshop? (optional)"
                className={inputClass}
              />
              <textarea
                name="message"
                rows={4}
                placeholder="Anything you'd like us to know? (optional)"
                className={`${inputClass} resize-none`}
              />
              {error && <p className="text-sm text-red">{error}</p>}
              <button type="submit" disabled={sending} className="btn-red label-xs mt-4 self-center">
                {sending ? "Sending…" : "Send your enquiry"}
              </button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

/** Shared red "Enquire about workshop" call-to-action used at the end of every service section. Opens the enquiry popup. */
export function BookWorkshopCta({ className = "mt-4 md:mt-6" }: { className?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`flex justify-center ${className}`}>
      <button type="button" onClick={() => setOpen(true)} className="btn-red label-xs">
        Enquire about workshop
      </button>

      <BookingDialog open={open} onOpenChange={setOpen} />
    </div>
  );
}

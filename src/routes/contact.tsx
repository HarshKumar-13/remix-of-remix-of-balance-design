import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Facebook, Instagram, Linkedin, Mail, Twitter, Youtube } from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Balance Design & Fashion Consultancy" },
      {
        name: "description",
        content: "Get in touch with Balance Design & Fashion Consultancy for workshops, image consulting and design enquiries.",
      },
      { property: "og:title", content: "Contact Us — Balance Design & Fashion Consultancy" },
      {
        property: "og:description",
        content: "Send us a message about workshops, image consulting or design projects.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  phone: z
    .string()
    .trim()
    .regex(/^[+\d][\d\s-]{6,19}$/, "Please enter a valid number"),
  email: z.string().trim().email("Please enter a valid email").max(255),
  message: z.string().trim().min(1, "Please enter a message").max(1000),
});

type Errors = Partial<Record<keyof z.infer<typeof schema>, string>>;

const SOCIALS = [
  { label: "Facebook", href: "https://www.facebook.com", Icon: Facebook },
  { label: "LinkedIn", href: "https://www.linkedin.com", Icon: Linkedin },
  { label: "Instagram", href: "https://www.instagram.com", Icon: Instagram },
  { label: "Twitter", href: "https://twitter.com", Icon: Twitter },
  { label: "YouTube", href: "https://www.youtube.com", Icon: Youtube },
];

function ContactPage() {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [tab, setTab] = useState<"enquiry" | "appointment">("enquiry");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const res = schema.safeParse(data);
    if (!res.success) {
      const errs: Errors = {};
      for (const i of res.error.issues) errs[i.path[0] as keyof Errors] ??= i.message;
      setErrors(errs);
      return;
    }
    setErrors({});
    const { name, phone, email, message } = res.data;
    const body = `Name: ${name}\nNumber: ${phone}\nEmail: ${email}\n\n${message}`;
    window.location.href = `mailto:info@balancedesign.in?subject=${encodeURIComponent(
      `${tab === "appointment" ? "Appointment request" : "Enquiry"} from ${name}`,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
    e.currentTarget.reset();
  };

  return (
    <>
      <SiteHeader forceSolid />
      <main className="bg-background pb-24 pt-44 md:pb-32 md:pt-56">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 md:grid-cols-[40%_1fr] md:gap-24 md:px-12">
          <div>
            <Reveal>
              <p className="label-xs text-red">Contact Us</p>
              <h1 className="display mt-6 text-5xl leading-[0.95] md:text-7xl">
                Let&rsquo;s talk.
              </h1>
            </Reveal>
            <Reveal delay={100}>
              <p className="mt-8 max-w-md text-lg leading-relaxed text-muted-foreground">
                Share a few details and we&rsquo;ll get back to you.
              </p>
              <a
                href="mailto:info@balancedesign.in"
                className="link-underline mt-10 inline-flex items-center gap-3 font-display text-2xl"
              >
                <Mail size={20} strokeWidth={1.4} /> info@balancedesign.in
              </a>
            </Reveal>
            <Reveal delay={180}>
              <p className="label-xs mt-14 text-muted-foreground">Connect with us</p>
              <div className="mt-5 flex items-center gap-6">
                {SOCIALS.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="transition-colors duration-500 hover:text-red"
                  >
                    <Icon aria-hidden="true" size={24} strokeWidth={1.4} />
                  </a>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={120}>
            {sent ? (
              <div className="border-t border-border pt-12">
                <p className="label-xs text-red">Thank you</p>
                <p className="display mt-6 text-3xl leading-[1.05] md:text-4xl">
                  Your message is ready to send.
                </p>
                <button onClick={() => setSent(false)} className="label-xs link-underline mt-10">
                  Send another message
                </button>
              </div>
            ) : (
              <>
              <div role="tablist" className="mb-10 flex gap-8 border-b border-border">
                {([["enquiry", "Enquiry"], ["appointment", "Book an Appointment"]] as const).map(([k, l]) => (
                  <button
                    key={k}
                    type="button"
                    role="tab"
                    aria-selected={tab === k}
                    onClick={() => setTab(k)}
                    className={`label-xs -mb-px border-b-2 pb-3 transition-colors ${tab === k ? "border-red text-red" : "border-transparent text-muted-foreground hover:text-foreground"}`}
                  >
                    {l}
                  </button>
                ))}
              </div>
              <form noValidate onSubmit={onSubmit} className="flex flex-col gap-8">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <Field label="Name" name="name" type="text" error={errors.name} />
                  <Field label="Number" name="phone" type="tel" error={errors.phone} />
                </div>
                <Field label="Email" name="email" type="email" error={errors.email} />
                <label className="block">
                  <span className="label-xs text-muted-foreground">Message</span>
                  <textarea
                    name="message"
                    rows={5}
                    maxLength={1000}
                    className="mt-3 w-full resize-none border-b border-border bg-transparent pb-2 text-base outline-none transition-colors focus:border-red"
                  />
                  {errors.message && <span className="mt-2 block text-sm text-red">{errors.message}</span>}
                </label>
                <button type="submit" className="btn-red label-xs mt-2 self-start">
                  {tab === "appointment" ? "Confirm & Pay" : "Send your message"}
                </button>
              </form>
              </>
            )}
          </Reveal>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

function Field({ label, name, type, error }: { label: string; name: string; type: string; error?: string | undefined }) {
  return (
    <label className="block">
      <span className="label-xs text-muted-foreground">{label}</span>
      <input
        name={name}
        type={type}
        maxLength={255}
        className="mt-3 w-full border-b border-border bg-transparent pb-2 text-base outline-none transition-colors focus:border-red"
      />
      {error && <span className="mt-2 block text-sm text-red">{error}</span>}
    </label>
  );
}

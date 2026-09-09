import { Reveal } from "./Reveal";

export function CtaSection() {
  return (
    <section id="contact" className="bg-red text-primary-foreground py-36 md:py-56">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <Reveal>
          <h2 className="display max-w-4xl text-[2.75rem] leading-[0.95] sm:text-6xl md:text-[6.5rem]">
            Let&rsquo;s create a
            <br />
            stronger presence.
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <a
            href="mailto:contact@balancedesign.in"
            className="btn-ghost label-xs mt-20 inline-block hover:bg-background hover:text-red md:mt-28"
          >
            Book an appointment
          </a>
        </Reveal>
      </div>
    </section>
  );
}

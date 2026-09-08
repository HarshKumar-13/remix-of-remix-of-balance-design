import { Reveal } from "./Reveal";

export function CtaSection() {
  return (
    <section className="bg-red text-primary-foreground py-24 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <Reveal>
          <h2 className="display max-w-4xl text-[2.75rem] leading-[0.95] sm:text-6xl md:text-[6rem]">
            Let&rsquo;s create a
            <br />
            stronger presence.
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="label-xs mt-10 opacity-80">Design &amp; Fashion Consultancy</p>
        </Reveal>
        <Reveal delay={160}>
          <a
            href="#contact"
            className="btn-ghost label-xs mt-12 inline-block hover:bg-background hover:text-red"
          >
            Book an appointment
          </a>
        </Reveal>
      </div>
    </section>
  );
}

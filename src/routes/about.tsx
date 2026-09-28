import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { LogoMark } from "@/components/LogoMark";
import { Reveal } from "@/components/Reveal";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import logoMark from "@/assets/balance-logo-mark.png";
import heroImg from "@/assets/hero.jpg";
import aboutImg from "@/assets/about.jpg";
import pers1 from "@/assets/pers-1.jpg";
import pers2 from "@/assets/pers-2.jpg";
import pers3 from "@/assets/pers-3.jpg";
import founder1 from "@/assets/founder-1.jpeg";
import founder2 from "@/assets/founder-2.webp";
import founder3 from "@/assets/founder-3.jpg";
import founder4 from "@/assets/founder-4.jpg";
import founder5 from "@/assets/founder-5.jpg";
import founder6 from "@/assets/founder-6.jpg";
import founder7 from "@/assets/founder-7.jpg";
const FOUNDER_IMAGES = [founder1, founder2, founder3, founder4, founder5, founder6, founder7];

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Balance Design & Fashion Consultancy" },
      {
        name: "description",
        content:
          "The story, philosophy and people behind Balance Design & Fashion Consultancy — fashion, image and design for individuals, brands and organisations.",
      },
      { property: "og:title", content: "About Us — Balance Design & Fashion Consultancy" },
      {
        property: "og:description",
        content:
          "The story, philosophy and people behind Balance Design & Fashion Consultancy.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

type TabKey = "about" | "founder" | "philosophy" | "journey" | "recognition";

const TABS: { key: TabKey; label: string }[] = [
  { key: "about", label: "About Balance" },
  { key: "founder", label: "Our Founder" },
  { key: "philosophy", label: "Our Philosophy" },
  { key: "journey", label: "Our Journey" },
  { key: "recognition", label: "Recognition" },
];

const CLIENTS = [
  "MAX Fashion",
  "Van Heusen",
  "IIM Bangalore",
  "ISB",
  "Leela Palace Bangalore",
  "Taj Palace, New Delhi",
  "Raymond",
];

/* ---------- hero ---------- */

function AboutHero() {
  const [y, setY] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 120);
    const onScroll = () => setY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section className="relative flex h-[72svh] min-h-[460px] items-end overflow-hidden bg-charcoal">
      <img
        src={heroImg}
        alt="Editorial fashion imagery representing Balance Design & Fashion Consultancy"
        className="absolute inset-0 h-[118%] w-full object-cover"
        style={{
          transform: `translate3d(0, ${y * 0.16}px, 0) scale(${loaded ? 1.06 : 1.18})`,
          transition: "transform 2.6s cubic-bezier(0.16,1,0.3,1)",
        }}
      />
      <div className="absolute inset-0 bg-charcoal/45" />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-charcoal/85 via-charcoal/25 to-transparent" />

      <div
        className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-14 text-ivory md:px-12 md:pb-20"
        style={{ transform: `translate3d(0, ${y * -0.05}px, 0)` }}
      >
        <p
          className="label-xs"
          style={{
            opacity: loaded ? 0.8 : 0,
            transform: loaded ? "none" : "translateY(20px)",
            transition:
              "opacity 1.1s cubic-bezier(0.16,1,0.3,1) 500ms, transform 1.1s cubic-bezier(0.16,1,0.3,1) 500ms",
          }}
        >
          About Balance
        </p>
        <h1
          className="display mt-6 text-[3.5rem] leading-[0.9] sm:text-[6rem] md:text-[8.5rem]"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "none" : "translateY(48px)",
            transition:
              "opacity 1.5s cubic-bezier(0.16,1,0.3,1) 150ms, transform 1.5s cubic-bezier(0.16,1,0.3,1) 150ms",
          }}
        >
          The House of Balance
        </h1>
      </div>
    </section>
  );
}

/* ---------- tabs ---------- */

function AboutTabs() {
  const [tab, setTab] = useState<TabKey>("about");

  return (
    <section className="px-6 pt-16 pb-24 md:px-12 md:pt-20 md:pb-36">
      <div className="mx-auto max-w-7xl">
        <div className="no-scrollbar -mx-6 overflow-x-auto px-6 md:-mx-12 md:px-12">
          <div
            role="tablist"
            aria-label="About Balance sections"
            className="flex w-max gap-10 border-b border-border pb-5 md:w-full md:justify-between md:gap-14"
          >
            {TABS.map((t) => (
              <button
                key={t.key}
                role="tab"
                aria-selected={tab === t.key}
                onClick={() => setTab(t.key)}
                className="label-xs relative pb-2 whitespace-nowrap transition-colors duration-500"
                style={{ color: tab === t.key ? "var(--red)" : "var(--muted-foreground)" }}
              >
                {t.label}
                <span
                  className="absolute -bottom-[21px] left-0 h-[2px] w-full origin-left bg-red"
                  style={{
                    transform: `scaleX(${tab === t.key ? 1 : 0})`,
                    transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1)",
                  }}
                />
              </button>
            ))}
          </div>
        </div>

        <div
          key={tab}
          className="mt-14 md:mt-20"
          style={{ animation: "aboutTabIn 0.9s cubic-bezier(0.16,1,0.3,1) both" }}
        >
          {tab === "about" && <AboutBalancePanel />}
          {tab === "founder" && <FounderPanel />}
          {tab === "philosophy" && <PhilosophyPanel />}
          {tab === "journey" && <JourneyPanel />}
          {tab === "recognition" && <RecognitionPanel />}
        </div>
      </div>

      <style>{`
        @keyframes aboutTabIn {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes aboutTabIn { from { opacity: 1; } to { opacity: 1; } }
        }
      `}</style>
    </section>
  );
}

/* ---------- panels ---------- */

function AboutBalancePanel() {
  return (
    <div>
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <Reveal>
            <LogoMark className="mb-8 md:mx-0" />
          </Reveal>
          <Reveal delay={80}>
            <p className="label-xs text-muted-foreground">Design &amp; Fashion Consultancy</p>
          </Reveal>
          <Reveal delay={140}>
            <h2 className="display text-accent mt-6 text-[2.5rem] leading-[0.95] sm:text-[3.5rem] md:text-[4rem]">
              Fashion is more than what you wear. It is how you are seen.
            </h2>
          </Reveal>
        </div>
        <div className="md:col-span-7">
          <Reveal delay={100}>
            <p className="max-w-xl text-lg leading-relaxed text-foreground md:text-xl">
              Balance Design &amp; Fashion Consultancy works across fashion, image and design to
              help individuals, brands and organisations create a stronger, more meaningful visual
              expression.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              Balance Design &amp; Fashion Consultancy is the venture of its Founder and Creative
              Head Upma Shrian and was set up in January 2008. It operates with an ever growing
              network of Design and Fashion consultants who works on projects provided by the
              Consultancy. Balance bridges the gap in the fashion industry when it comes to
              providing long term and Short term trends, in the various apparel and design market
              segments and developing profitable product mix that matches with the target
              customer's expectations.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              It also passionately conducts training and workshops on Dressing up for corporates
              and individuals as means of non-verbal communication and impact.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-12 md:mt-24 md:gap-8">
        <div className="sm:col-span-5 sm:col-start-2 sm:self-end">
          <Reveal>
            <img
              src={aboutImg}
              alt="Designer draping fabric on a mannequin in a sunlit atelier"
              loading="lazy"
              className="h-[38vh] w-full object-cover md:h-[46vh]"
            />
          </Reveal>
        </div>
        <div className="sm:col-span-5">
          <Reveal delay={120}>
            <img
              src={pers3}
              alt="Individual in a minimal monochrome outfit against a warm plaster wall"
              loading="lazy"
              className="h-[52vh] w-full object-cover md:h-[68vh]"
            />
          </Reveal>
        </div>
      </div>
    </div>
  );
}

function FounderPanel() {
  const [founderIdx, setFounderIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setFounderIdx((i) => (i + 1) % FOUNDER_IMAGES.length), 2000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-12 md:gap-16">
      <div className="md:col-span-6">
        <Reveal>
          <div className="relative h-[56vh] w-full overflow-hidden md:h-[78vh]">
            {FOUNDER_IMAGES.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={i === founderIdx ? "Upma Shrian, Founder of Balance Design & Fashion Consultancy" : ""}
                aria-hidden={i !== founderIdx}
                className={`absolute inset-0 h-full w-full object-cover object-[center_20%] transition-opacity duration-1000 ease-in-out ${i === founderIdx ? "opacity-100" : "opacity-0"}`}
              />
            ))}
          </div>
        </Reveal>
      </div>
      <div className="md:col-span-6 md:pt-12">
        <Reveal>
          <p className="label-xs text-muted-foreground">Our Founder</p>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="display mt-6 text-[2.75rem] leading-[0.95] sm:text-5xl md:text-[4.25rem]">
            A lifelong study of image, craft and culture.
          </h2>
        </Reveal>
        <Reveal delay={180}>
          <p className="mt-10 max-w-xl text-lg leading-relaxed text-foreground md:text-xl">
            Balance was founded on a simple conviction: that the way a person — or a brand —
            presents itself shapes how it is understood. Years spent across fashion, styling and
            design became the foundation of a consultancy built on both instinct and discipline.
          </p>
        </Reveal>
        <Reveal delay={240}>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            <span className="text-foreground">[Placeholder]</span> Founder biography, credentials
            and career milestones will be added here once provided.
          </p>
        </Reveal>
      </div>
    </div>
  );
}

function PhilosophyPanel() {
  return (
    <div>
      <div className="max-w-4xl">
        <Reveal>
          <p className="label-xs text-muted-foreground">Our Philosophy</p>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="display mt-6 text-[2.75rem] leading-[0.95] sm:text-6xl md:text-[5.25rem]">
            Image is identity made visible.
          </h2>
        </Reveal>
        <Reveal delay={180}>
          <p className="mt-10 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            We believe confidence begins with coherence — when what you wear, how you present and
            what you stand for speak the same language. Design, in this sense, is not decoration;
            it is clarity with intent.
          </p>
        </Reveal>
        <Reveal delay={240}>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Every engagement at Balance is measured by a single outcome: a presence that feels
            honest, assured and unmistakably your own.
          </p>
        </Reveal>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-12 md:mt-24 md:gap-8">
        <div className="sm:col-span-7">
          <Reveal>
            <img
              src={pers2}
              alt="Editorial portrait reflecting the Balance design philosophy"
              loading="lazy"
              className="h-[46vh] w-full object-cover md:h-[64vh]"
            />
          </Reveal>
        </div>
        <div className="sm:col-span-4 sm:self-end">
          <Reveal delay={120}>
            <img
              src={aboutImg}
              alt="Atelier detail — fabric, form and craftsmanship"
              loading="lazy"
              className="h-[32vh] w-full object-cover md:h-[40vh]"
            />
          </Reveal>
        </div>
      </div>
    </div>
  );
}

function JourneyPanel() {
  const MILESTONES = [
    {
      phase: "The Beginning",
      text: "[Placeholder] The founding of Balance — the idea, the first studio, the first client.",
    },
    {
      phase: "Growing Practice",
      text: "[Placeholder] Early collaborations and the development of the consultancy's core services.",
    },
    {
      phase: "Wider Canvas",
      text: "[Placeholder] Expansion into corporate image, fashion experiences and organisational design work.",
    },
    {
      phase: "Today",
      text: "[Placeholder] Balance today — the consultancy's current focus and direction.",
    },
  ];

  return (
    <div>
      <div className="max-w-3xl">
        <Reveal>
          <p className="label-xs text-muted-foreground">Our Journey</p>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="display mt-6 text-[2.75rem] leading-[0.95] sm:text-5xl md:text-[4.25rem]">
            A journey written in chapters.
          </h2>
        </Reveal>
      </div>

      <div className="mt-16 md:mt-24">
        {MILESTONES.map((m, i) => (
          <Reveal key={m.phase} delay={i * 80}>
            <div className="grid grid-cols-1 gap-4 border-t border-border py-10 md:grid-cols-12 md:gap-8 md:py-14">
              <div className="md:col-span-4">
                <h3 className="display text-2xl md:text-[2.5rem]">{m.phase}</h3>
              </div>
              <div className="md:col-span-7 md:col-start-6">
                <p className="max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                  {m.text}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function RecognitionPanel() {
  return (
    <div>
      <div className="max-w-3xl">
        <Reveal>
          <p className="label-xs text-muted-foreground">Recognition</p>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="display mt-6 text-[2.75rem] leading-[0.95] sm:text-5xl md:text-[4.25rem]">
            Trusted by houses of distinction.
          </h2>
        </Reveal>
      </div>

      <div className="mt-16 border-t border-border md:mt-24">
        {CLIENTS.map((name, i) => (
          <Reveal key={name} delay={i * 60}>
            <div className="flex items-center justify-between gap-6 border-b border-border py-8 md:py-10">
              <span className="font-display text-2xl tracking-wide md:text-4xl">{name}</span>
              <img src={logoMark} alt="" aria-hidden="true" className="h-5 w-auto opacity-50" />
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={120}>
        <p className="mt-12 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
          <span className="text-foreground">[Placeholder]</span> Awards, press and formal
          recognition will be listed here once confirmed.
        </p>
      </Reveal>
    </div>
  );
}

/* ---------- page ---------- */

function AboutPage() {
  return (
    <main>
      <div className="relative z-10 bg-background">
        <SiteHeader />
        <AboutHero />
        <AboutTabs />
      </div>
      <SiteFooter />
    </main>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { LogoMark } from "@/components/LogoMark";
import { Reveal } from "@/components/Reveal";
import { Testimonials } from "@/components/Testimonials";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { ACHIEVEMENTS } from "@/data/achievements";
import logoMark from "@/assets/balance-logo-mark.png";
import heroImg from "@/assets/hero.jpg";
import aboutImg from "@/assets/about.jpg";
import pers2 from "@/assets/pers-2.jpg";
import aboutBal1 from "@/assets/about-balance-1.jpg";
import aboutBal2 from "@/assets/about-balance-2.jpg";
import aboutBal3 from "@/assets/about-balance-3.jpg";
import aboutBal4 from "@/assets/about-balance-4.jpg";
import aboutBal5 from "@/assets/about-balance-5.jpg";
import aboutBal6 from "@/assets/about-balance-6.jpg";
import aboutBal7 from "@/assets/about-balance-7.jpg";
import brandMax from "@/assets/brand-max.png";
import brandVanHeusen from "@/assets/brand-vanheusen.png";
import brandIimb from "@/assets/brand-iimb.png";
import brandRaymond from "@/assets/brand-raymond.png";
import brandReliance from "@/assets/brand-reliance.png";
import brandNift from "@/assets/brand-nift.png";
import brandLifestyle from "@/assets/brand-lifestyle.png";
import brandLeela from "@/assets/brand-leela.png";
import brandGap from "@/assets/brand-gap.png";
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
          "The story and people behind Balance Design & Fashion Consultancy — fashion, image and design for individuals, brands and organisations.",
      },
      { property: "og:title", content: "About Us — Balance Design & Fashion Consultancy" },
      {
        property: "og:description",
        content:
          "The story and people behind Balance Design & Fashion Consultancy.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

type TabKey = "about" | "founder" | "recognition";

const TABS: { key: TabKey; label: string }[] = [
  { key: "about", label: "About Balance" },
  { key: "founder", label: "Our Founder" },
  { key: "recognition", label: "Achievements" },
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

const ABOUT_BALANCE_IMAGES = [aboutBal1, aboutBal2, aboutBal3, aboutBal4, aboutBal5, aboutBal6, aboutBal7];

function FadeFrame({ offset, className }: { offset: number; className: string }) {
  const [idx, setIdx] = useState(offset);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % ABOUT_BALANCE_IMAGES.length), 2500);
    return () => clearInterval(t);
  }, []);
  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      {ABOUT_BALANCE_IMAGES.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={i === idx ? "Balance Design workshop and seminar moments" : ""}
          aria-hidden={i !== idx}
          loading="lazy"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${i === idx ? "opacity-100" : "opacity-0"}`}
        />
      ))}
    </div>
  );
}


const EXPERTISE: { title: string; note?: string; items: string[] }[] = [
  {
    title: "Design & Creative Direction",
    items: [
      "Design strategy and creative direction for fashion and lifestyle brands",
      "Seasonal collections and apparel line presentation across Menswear, Womenswear, Children’s Wear.",
      "Fashion styling for apparel and luxury brands",
      "Styling and creative direction for fashion shows and brand presentations",
    ],
  },
  {
    title: "Trend Forecasting & Market Intelligence",
    items: [
      "Trend forecasting and trend analysis - Colour, fabric, silhouette and styling directions",
      "Converting emerging trends into commercially relevant product opportunities",
    ],
  },
  {
    title: "Styling & Image Consulting Workshops for Individuals",
    items: [
      "Corporate and Personal Styling Seminars",
      "Fashion Styling and mindset coaching workshops",
    ],
  },
  {
    title: "Design Workshops",
    note: "We conduct customised workshops and seminars for fashion, apparel, retail and brand professionals, helping teams bridge the gap between creativity and commerce.",
    items: [
      "Design Aesthetics & Styling for Brand Teams",
      "Forecasting, Trend Analysis & Consumer Mindsets",
      "Fashion Cycle & Its Business Implications",
      "Design, Brand and Consumer Thinking",
    ],
  },
];

function AboutBalancePanel() {
  return (
    <div>
      {/* Firm brief: full width, left aligned, sits first */}
      <Reveal>
        <p className="text-lg leading-relaxed text-foreground md:text-xl md:leading-[1.7] lg:text-[1.4rem]">
          <span className="font-medium text-primary">
            Balance Design &amp; Fashion Consultancy
          </span>{" "}
          is a <span className="font-medium text-primary">Fashion</span> and{" "}
          <span className="font-medium text-primary">Apparel Design</span> firm. We
          partner with fashion, apparel and lifestyle businesses to build
          consumer-centric brands, strengthen design direction and create products and
          experiences that foster commercial success. We also Train and Coach apparel
          teams and individuals in{" "}
          <span className="font-medium text-primary">Design Aesthetics</span> and{" "}
          <span className="font-medium text-primary">Fashion Styling</span>.
        </p>

      </Reveal>

      {/* Logo + expertise heading now sits below the brief */}
      <div className="mt-24 md:mt-36">
        <Reveal>
          <LogoMark className="mb-8 md:mx-0" />
        </Reveal>
        <Reveal delay={80}>
          <p className="label-xs text-muted-foreground">Design &amp; Fashion Consultancy</p>
        </Reveal>
        <Reveal delay={140}>
          <h2 className="display text-accent mt-6 text-[2.5rem] leading-[0.95] sm:text-[3.5rem] md:text-[4rem]">
            Our Expertise
            <br />
            &amp; Deliverables
          </h2>
        </Reveal>
      </div>


      <div className="mt-14 border-t border-border md:mt-20">
        {EXPERTISE.map((group, gi) => (
          <Reveal key={group.title} delay={gi * 60}>
            <div className="grid grid-cols-1 gap-6 border-b border-border py-10 md:grid-cols-12 md:gap-16 md:py-14">
              <div className="flex items-start gap-5 md:col-span-4">
                <span
                  aria-hidden="true"
                  className="font-display text-[1.75rem] leading-none text-red md:text-[2.25rem]"
                >
                  {gi + 1}
                </span>
                <h3 className="font-display text-2xl leading-tight tracking-wide md:text-[1.9rem]">
                  {group.title}
                </h3>
              </div>
              <div className="md:col-span-8">
                {group.note && (
                  <p className="max-w-2xl text-lg leading-relaxed text-foreground md:text-xl">
                    {group.note}
                  </p>
                )}
                <ul className="mt-4 max-w-2xl space-y-3">
                  {group.items.map((li) => (
                    <li
                      key={li}
                      className="flex gap-4 text-lg leading-relaxed text-muted-foreground md:text-xl"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[0.7em] h-px w-5 shrink-0 bg-primary"
                      />
                      <span>{li}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-12 md:mt-24 md:gap-8">
        <div className="sm:col-span-5 sm:col-start-2 sm:self-end">
          <Reveal>
            <FadeFrame offset={0} className="h-[38vh] md:h-[46vh]" />
          </Reveal>
        </div>
        <div className="sm:col-span-5">
          <Reveal delay={120}>
            <FadeFrame offset={3} className="h-[52vh] md:h-[68vh]" />
          </Reveal>
        </div>
      </div>
    </div>
  );
}

const FOUNDER_ROLES = [
  {
    title: "As a Design Head:",
    body: "My experience includes managing design, research, product development, and trend forecasting for multiple international brands such as Kappa, UCLA, Smiley, Disney, Warner Brothers,Rene Derhy USA/ France, GAP, Yonex,Wall-Mart,K Mart & Petrie.",
  },
  {
    title: "As a Strategist & Creative Head:",
    body: "I have also led design teams, fostering innovation while ensuring commercial success for Indian retail brands such as Lifestyle Stores, Reliance Trends & Weekender, identified gaps and worked on brand positioning.Introduced structured trend research frameworks, revised process calendars, and competitive bench marking, ensuring alignment between creative direction and commercial outcomes.",
  },
  {
    title: "As Associate Professor :",
    body: "at NIFT, besides guiding and nurturing young designers, I have bridged academia and industry by leading international-facing initiatives such as buyer meets, Hong Kong fair collections, and also taking on Indian crafts initiative as Hampi cluster project - Promoting the crafts like Lambani embroidery, stone carving, banana fibre from concept to product and market positioning for better sales.",
  },
];

function FounderPanel() {
  const [founderIdx, setFounderIdx] = useState(0);
  const [roleIdx, setRoleIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setRoleIdx((i) => (i + 1) % FOUNDER_ROLES.length), 5000);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    const t = setInterval(() => setFounderIdx((i) => (i + 1) % FOUNDER_IMAGES.length), 2000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="grid grid-cols-1 items-stretch gap-12 md:grid-cols-12 md:gap-16">
      <div className="md:col-span-6 md:[&>*]:h-full">
        <Reveal>
          <div className="relative h-[56vh] w-full overflow-hidden md:h-full md:min-h-[60vh]">
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
      <div className="md:col-span-6">
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
            With over twenty-eight years of experience in the fashion and apparel industry, I have specialized in defining design direction that aligns with business strategy and evolving consumer trends.I also impart training to enhance team performance in the Apparel and Fashion Industry.
          </p>
        </Reveal>
        <Reveal delay={240}>
          <div className="mt-10 grid max-w-xl">
            {FOUNDER_ROLES.map((r, i) => (
              <div
                key={r.title}
                aria-hidden={i !== roleIdx}
                className={`col-start-1 row-start-1 transition-opacity duration-1000 ease-in-out ${i === roleIdx ? "opacity-100" : "pointer-events-none opacity-0"}`}
              >
                <p className="label-xs text-primary text-[1.1875rem]">{r.title}</p>
                <p className="mt-4 text-lg leading-relaxed text-muted-foreground md:text-xl">{r.body}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
      <div className="md:col-span-12">
        <Reveal>
          <div className="relative aspect-video w-full overflow-hidden">
            <iframe
              src="https://www.youtube.com/embed/fNXmuiE3k-M"
              title="Upma Shrian — Balance Design & Fashion Consultancy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>
        </Reveal>
      </div>
    </div>
  );
}

const BRANDS: { name: string; logo?: string }[] = [
  { name: "Raymond", logo: brandRaymond },
  { name: "Reliance Trends", logo: brandReliance },
  { name: "MAX Fashion", logo: brandMax },
  { name: "Van Heusen", logo: brandVanHeusen },
  { name: "IIM Bangalore", logo: brandIimb },
  { name: "Leela Palace Bangalore", logo: brandLeela },
  { name: "Lifestyle", logo: brandLifestyle },
  { name: "NIFT", logo: brandNift },
  { name: "GAP", logo: brandGap },
  { name: "ISB" },
  { name: "Taj Palace, New Delhi" },
  { name: "Weekender" },
];

function RecognitionPanel() {
  return (
    <div>
      <Testimonials />

      <div className="mt-16 md:mt-24">
        <Reveal>
          <p className="label-xs text-center text-red">Brands We Worked With</p>
          <h2 className="display mt-4 mb-10 text-center text-3xl leading-[1.05] md:mb-14 md:text-5xl">
            Brands We Worked With
          </h2>
        </Reveal>
        <div className="grid grid-cols-2 border-t border-l border-border sm:grid-cols-4">
          {BRANDS.map((brand) => (
            <Reveal key={brand.name}>
              <div className="flex h-24 items-center justify-center border-b border-r border-border px-5 md:h-28">
                {brand.logo ? (
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    loading="lazy"
                    className="max-h-14 w-auto max-w-[80%] object-contain md:max-h-24"
                  />
                ) : (
                  <span className="font-display text-center text-sm tracking-wide text-foreground md:text-lg">
                    {brand.name}
                  </span>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mt-16 max-w-3xl md:mt-24">
        <Reveal>
          <p className="text-lg leading-relaxed text-foreground md:text-xl">Sharing some examples of Balance Design achievements with various BRANDS.</p>
        </Reveal>
      </div>
      <div className="mt-10 border-t border-border md:mt-14">
        {ACHIEVEMENTS.map((g, gi) => (
          <Reveal key={g.title} delay={gi * 60}>
            <div className="grid grid-cols-1 gap-6 border-b border-border py-10 md:grid-cols-12 md:gap-16 md:py-14">
              <h3 className="font-display text-2xl leading-tight tracking-wide md:col-span-4 md:text-3xl">
                {g.title}
              </h3>
              <div className="space-y-8 md:col-span-8">
                {g.items.map((item, ii) => (
                  <div key={ii}>
                    {item.heading && (
                      <p className="label-xs text-[1.1875rem] leading-snug text-primary">{item.heading}</p>
                    )}
                    {item.text && (
                      <p className={`${item.heading ? "mt-4 " : ""}max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl`}>
                        {item.text}
                      </p>
                    )}
                    {item.list && (
                      <ul className="mt-4 max-w-2xl space-y-3">
                        {item.list.map((li) => (
                          <li key={li} className="flex gap-4 text-lg leading-relaxed text-muted-foreground md:text-xl">
                            <span aria-hidden="true" className="mt-[0.7em] h-px w-5 shrink-0 bg-primary" />
                            <span>{li}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
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

import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import aboutImg from "@/assets/about.jpg";
import corp1 from "@/assets/Picture6.jpg.asset.json";
import corp2 from "@/assets/Picture3.jpg.asset.json";
import corp3 from "@/assets/Picture4.jpg.asset.json";
import corp4 from "@/assets/Picture5.jpg.asset.json";
import corp5 from "@/assets/Picture7.jpg.asset.json";
import pers1 from "@/assets/pers-1.jpg";
import pers2 from "@/assets/pers-2.jpg";
import pers3 from "@/assets/pers-3.jpg";
import trend1 from "@/assets/Picture8.jpg.asset.json";

export const Route = createFileRoute("/services/fashion-apparel-workshops")({
  head: () => ({
    meta: [
      { title: "Fashion & Apparel Workshops — Balance Design" },
      {
        name: "description",
        content:
          "Fashion and apparel workshops by Balance Design for confident professional dressing, leadership presence and authentic identity.",
      },
      { property: "og:title", content: "Fashion & Apparel Workshops — Balance Design" },
      {
        property: "og:description",
        content:
          "Master the right dress code through Balance Design's premium fashion and apparel workshops.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FashionWorkshopsPage,
});

function useInView<T extends HTMLElement>(threshold = 0.12) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -5% 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

function EditorialImage({
  src,
  alt,
  className = "",
  delay = 0,
  position = "object-center",
}: {
  src: string;
  alt: string;
  className?: string;
  delay?: number;
  position?: string;
}) {
  const { ref, visible } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`overflow-hidden ${className}`}
      style={{
        clipPath: visible ? "inset(0 0 0 0)" : "inset(100% 0 0 0)",
        transition: `clip-path 1.4s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`h-full w-full object-cover ${position}`}
        style={{
          transform: visible ? "scale(1)" : "scale(0.96)",
          transition: `transform 1.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        }}
      />
    </div>
  );
}

function EditorialReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, visible } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translate3d(0,0,0)" : "translate3d(0,32px,0)",
        transition: `opacity 1.1s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 1.1s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function WorkshopHero() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 100);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <section className="overflow-hidden bg-background px-6 pb-28 pt-40 md:px-12 md:pb-44 md:pt-52">
      <div className="mx-auto max-w-7xl">
        <div
          className="max-w-5xl"
          style={{
            opacity: ready ? 1 : 0,
            transform: ready ? "none" : "translateY(36px)",
            transition: "opacity 1.3s cubic-bezier(0.16,1,0.3,1), transform 1.3s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <p className="label-xs text-red">Fashion &amp; Apparel Workshops</p>
          <h1 className="display mt-7 text-[3.25rem] leading-[0.9] sm:text-[5.5rem] md:text-[8rem]">
            Master the right dress code
          </h1>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-12 md:mt-24 md:gap-8">
          <div className="sm:col-span-5 sm:col-start-1 sm:pt-36">
            <EditorialImage
              src={aboutImg}
              alt="Fashion stylist preparing fabric and a professional outfit"
              className="aspect-[4/3] w-full"
            />
          </div>
          <div className="sm:col-span-5 sm:col-start-8">
            <EditorialImage
              src={pers3}
              alt="Professionally dressed person in a refined editorial portrait"
              className="aspect-[2/3] w-full"
              delay={140}
            />
          </div>
          <EditorialReveal className="sm:col-span-5 sm:col-start-2 sm:-mt-8" delay={180}>
            <p className="max-w-xl text-xl leading-[1.7] text-muted-foreground md:text-[1.35rem]">
              “We address the awareness of Indian professionals in areas of dressing up as leaders
              and nurturing high self-esteem.”
            </p>
          </EditorialReveal>
        </div>
      </div>
    </section>
  );
}

const QUESTIONS = [
  "Whether what we wear will suit us?",
  "Do we come out confident, by way of our dressing up?",
  "Are we appropriately dressed in the corporate wear or casual wear?",
  "What is the right dress code?",
  "Do we represent our brand as our persona?",
  "Does the way we look, stop us from interacting and being ourselves with others?",
];

const QUESTION_IMAGES = [corp1.url, pers1, corp5.url, pers2, corp3.url, pers3];

function IntroductionSection() {
  return (
    <section className="border-t border-border px-6 py-28 md:px-12 md:py-44">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-7">
            <EditorialImage
              src={corp2.url}
              alt="Corporate image workshop with professionals discussing presentation"
              className="aspect-[4/3] w-full"
            />
          </div>
          <div className="md:col-span-4 md:col-start-9 md:pt-40">
            <EditorialReveal>
              <p className="label-xs text-red">Introduction</p>
              <h2 className="display mt-6 text-[2.75rem] leading-[0.95] sm:text-5xl md:text-[4.5rem]">
                The way we present ourselves matters
              </h2>
              <p className="mt-9 text-lg leading-[1.75] text-muted-foreground md:text-xl">
                “We observe that each one of us has the need to look acceptable and presentable to
                ourselves and to others who come in our contact such as our clients, team members,
                business associates and our professional network.”
              </p>
            </EditorialReveal>
          </div>
          <div className="md:col-span-4 md:col-start-2 md:-mt-10">
            <EditorialImage
              src={pers1}
              alt="Styling detail with fabric and accessories being prepared"
              className="aspect-square w-full"
              delay={120}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function QuestionsSection() {
  return (
    <section className="bg-background px-6 py-28 md:px-12 md:py-44">
      <div className="mx-auto max-w-7xl">
        <EditorialReveal className="max-w-4xl">
          <p className="label-xs text-red">Questions of presence</p>
          <h2 className="display mt-6 text-[2.75rem] leading-[0.95] sm:text-6xl md:text-[5.5rem]">
            How we dress can raise questions
          </h2>
          <p className="mt-8 text-xl text-muted-foreground md:text-[1.35rem]">
            “However we are usually stuck with doubts like:”
          </p>
        </EditorialReveal>

        <div className="mt-24 space-y-28 md:mt-40 md:space-y-48">
          {QUESTIONS.map((question, index) => {
            const imageFirst = index % 2 === 0;
            return (
              <article
                key={question}
                className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-12"
              >
                <div
                  className={`md:col-span-5 ${imageFirst ? "md:col-start-1" : "md:col-start-8 md:order-2"}`}
                >
                  <EditorialImage
                    src={QUESTION_IMAGES[index] ?? corp1.url}
                    alt={`Editorial professional dressing study for question ${index + 1}`}
                    className={`${index % 3 === 0 ? "aspect-[3/4]" : index % 3 === 1 ? "aspect-[4/3]" : "aspect-square"} w-full`}
                    position={index === 1 ? "object-left" : "object-center"}
                  />
                </div>
                <EditorialReveal
                  className={`md:col-span-5 ${imageFirst ? "md:col-start-8" : "md:col-start-1 md:row-start-1"}`}
                  delay={120}
                >
                  <span className="label-xs text-red">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="display mt-6 text-[2.25rem] leading-[1.05] sm:text-5xl md:text-[3.75rem]">
                    {question}
                  </h3>
                </EditorialReveal>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function KeyStatement() {
  return (
    <section className="bg-charcoal px-6 py-28 text-ivory md:px-12 md:py-44">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-end gap-12 md:grid-cols-12 md:gap-16">
        <EditorialReveal className="md:col-span-7">
          <p className="display text-[2.75rem] leading-[1.02] sm:text-6xl md:text-[5.5rem]">
            “All these questions come in the way of our performance, our communication to others
            and in being an effective leader.”
          </p>
        </EditorialReveal>
        <div className="md:col-span-5 md:pb-10">
          <EditorialImage
            src={corp4.url}
            alt="Professionals gathered for a leadership and image workshop"
            className="aspect-[3/4] w-full"
            delay={120}
          />
        </div>
      </div>
    </section>
  );
}

function WorkshopIntroduction() {
  return (
    <section className="px-6 py-28 md:px-12 md:py-44">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <EditorialImage
              src={pers2}
              alt="Professional wardrobe and styling editorial"
              className="aspect-[2/3] w-full"
            />
          </div>
          <EditorialReveal className="md:col-span-5 md:col-start-8 md:pt-24" delay={100}>
            <p className="label-xs text-red">The workshop</p>
            <h2 className="display mt-6 text-[2.75rem] leading-[0.95] sm:text-6xl md:text-[5rem]">
              Dressing up with purpose
            </h2>
            <p className="mt-10 text-lg leading-[1.75] text-muted-foreground md:text-xl">
              “To address this gap effectively we conduct 'Dressing up seminars/workshops' as our
              initiative to inform and educate Indian corporate/officers/leaders.”
            </p>
            <p className="mt-7 text-lg leading-[1.75] text-foreground md:text-xl">
              “The seminar is conducted to deliver the following”
            </p>
          </EditorialReveal>
          <div className="md:col-span-4 md:col-start-7 md:-mt-20">
            <EditorialImage
              src={trend1.url}
              alt="Clothing, colour and fabric details prepared for a fashion workshop"
              className="aspect-square w-full"
              delay={140}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

const GOALS = [
  {
    title: "Create a more powerful visual impact",
    text: "“To transform the way we dress, such that our visual impact is more powerful and confident.”",
    image: corp1.url,
  },
  {
    title: "Build confidence from within",
    text: "“To remove the blocks of self-doubts, fears & low self esteem.”",
    image: pers3,
  },
  {
    title: "Unlock your performance",
    text: "“To authentically believe that each one of us has the highest level of performance capability and each of us is a WINNER.”",
    image: corp3.url,
  },
];

function GoalsSection() {
  return (
    <section className="border-t border-border px-6 py-28 md:px-12 md:py-44">
      <div className="mx-auto max-w-7xl">
        <EditorialReveal>
          <h2 className="display text-[3.5rem] sm:text-6xl md:text-[7rem]">Goals</h2>
        </EditorialReveal>

        <div className="mt-20 space-y-28 md:mt-32 md:space-y-44">
          {GOALS.map((goal, index) => {
            const imageFirst = index !== 1;
            return (
              <article
                key={goal.title}
                className="grid grid-cols-1 items-center gap-10 border-t border-border pt-12 md:grid-cols-12 md:gap-16 md:pt-16"
              >
                <div
                  className={`md:col-span-6 ${imageFirst ? "md:col-start-1" : "md:col-start-7 md:order-2"}`}
                >
                  <EditorialImage
                    src={goal.image}
                    alt={`Fashion and professional presence study for ${goal.title}`}
                    className={`${index === 1 ? "aspect-[3/4]" : "aspect-[4/3]"} w-full`}
                  />
                </div>
                <EditorialReveal
                  className={`md:col-span-5 ${imageFirst ? "md:col-start-8" : "md:col-start-1 md:row-start-1"}`}
                  delay={120}
                >
                  <span className="label-xs text-red">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="display mt-6 text-[2.5rem] leading-[1] sm:text-5xl md:text-[4.25rem]">
                    {goal.title}
                  </h3>
                  <p className="mt-9 text-lg leading-[1.75] text-muted-foreground md:text-xl">
                    {goal.text}
                  </p>
                </EditorialReveal>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ClosingCta() {
  return (
    <section className="bg-red px-6 py-28 text-primary-foreground md:px-12 md:py-44">
      <div className="mx-auto max-w-7xl">
        <EditorialReveal className="max-w-5xl">
          <h2 className="display text-[3rem] leading-[0.95] sm:text-6xl md:text-[6.5rem]">
            Ready to master the right dress code?
          </h2>
          <p className="mt-9 max-w-2xl text-xl leading-[1.65] opacity-80 md:text-[1.35rem]">
            “Build a stronger visual presence, greater confidence and an authentic professional
            identity.”
          </p>
          <div className="mt-12 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <a href="mailto:info@balancedesign.in" className="btn-ghost label-xs hover:bg-background hover:text-red">
              Book a workshop
            </a>
            <Link
              to="/"
              hash="services"
              className="label-xs link-underline inline-block text-primary-foreground"
            >
              Explore our services
            </Link>
          </div>
        </EditorialReveal>
      </div>
    </section>
  );
}

function FashionWorkshopsPage() {
  return (
    <main className="overflow-x-clip bg-background">
      <div className="relative z-10 bg-background">
        <SiteHeader forceSolid />
        <WorkshopHero />
        <IntroductionSection />
        <QuestionsSection />
        <KeyStatement />
        <WorkshopIntroduction />
        <GoalsSection />
        <ClosingCta />
      </div>
      <SiteFooter />
    </main>
  );
}
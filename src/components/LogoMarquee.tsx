import logoMark from "@/assets/balance-logo-mark.png.asset.json";

const NAMES = [
  "MAX Fashion",
  "Van Heusen",
  "IIM Bangalore",
  "ISB",
  "Leela Palace Bangalore",
  "Taj Palace, New Delhi",
  "Raymond",
];

export function LogoMarquee() {
  const row = [...NAMES, ...NAMES];

  return (
    <section
      aria-label="Selected clients and projects"
      className="overflow-hidden border-y border-border py-8 md:py-10"
    >
      <div className="marquee-track flex w-max items-center gap-12 md:gap-20">
        {row.map((n, i) => (
          <span key={`${n}-${i}`} className="flex items-center gap-12 md:gap-20">
            <span className="font-display whitespace-nowrap text-lg tracking-wide md:text-2xl">
              {n}
            </span>
            <img src={logoMark.url} alt="" aria-hidden="true" className="h-4 w-auto opacity-60" />
          </span>
        ))}
      </div>
    </section>
  );
}

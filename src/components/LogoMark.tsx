import logoMark from "@/assets/balance-logo-mark.png";

export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <img
      src={logoMark}
      alt="Balance Design diamond mark"
      className={`mx-auto h-10 w-auto object-contain md:h-14 ${className}`}
      width={120}
      height={80}
    />
  );
}

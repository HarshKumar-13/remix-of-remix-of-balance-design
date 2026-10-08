import { Link } from "@tanstack/react-router";

/** Shared red "Book your workshop" call-to-action used at the end of every service section. */
export function BookWorkshopCta({ className = "mt-4 md:mt-6" }: { className?: string }) {
  return (
    <div className={`flex justify-center ${className}`}>
      <Link to="/contact" className="btn-red label-xs">
        Book your workshop
      </Link>
    </div>
  );
}

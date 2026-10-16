/**
 * Balance Design — complete homepage in one file.
 * Includes the loader, photo grid, scroll animations, sliders, enquiry popup, header and footer.
 * Replace src/routes/index.tsx with this file in the existing Balance Design project.
 * Requires its npm packages, shared src/styles.css, src/assets media and configured enquiry connection.
 * Section-prefixed names preserve each section's original variables and types.
 */
import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import {
  useCallback,
  useState,
  useEffect,
  useRef,
  type ReactNode,
  type CSSProperties,
} from "react";
import { useReducedMotion } from "motion/react";
import {
  ArrowDown,
  Pause,
  Play,
  X,
  Volume2,
  VolumeX,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { supabase } from "@/integrations/supabase/client";
import asset_assets_balance_logo_navbar_png from "@/assets/balance-logo-navbar.png";
import asset_assets_hero_0541_jpg from "@/assets/hero-0541.jpg";
import asset_assets_hero_0545_jpg from "@/assets/hero-0545.jpg";
import asset_assets_hero_0556_jpg from "@/assets/hero-0556.jpg";
import asset_assets_hero_1616b_jpg from "@/assets/hero-1616b.jpg";
import asset_assets_hero_1627_jpg from "@/assets/hero-1627.jpg";
import asset_assets_hero_1628_jpg from "@/assets/hero-1628.jpg";
import asset_assets_hero_1629_jpg from "@/assets/hero-1629.jpg";
import asset_assets_hero_1630_jpg from "@/assets/hero-1630.jpg";
import asset_assets_hero_1631_jpg from "@/assets/hero-1631.jpg";
import asset_assets_balance_logo_mark_png from "@/assets/balance-logo-mark.png";
import asset_assets_testimonial_1_mp4 from "@/assets/testimonial-1.mp4";
import asset_assets_testimonial_2_mp4 from "@/assets/testimonial-2.mp4";
import asset_assets_testimonial_1_poster_jpg from "@/assets/testimonial-1-poster.jpg";
import asset_assets_testimonial_2_poster_jpg from "@/assets/testimonial-2-poster.jpg";
import asset_assets_testimonial_3_mp4 from "@/assets/testimonial-3.mp4";
import asset_assets_testimonial_4_mp4 from "@/assets/testimonial-4.mp4";
import asset_assets_testimonial_3_poster_jpg from "@/assets/testimonial-3-poster.jpg";
import asset_assets_testimonial_4_poster_jpg from "@/assets/testimonial-4-poster.jpg";
import asset_assets_testimonial_5_mp4 from "@/assets/testimonial-5.mp4";
import asset_assets_testimonial_6_mp4 from "@/assets/testimonial-6.mp4";
import asset_assets_testimonial_7_mp4 from "@/assets/testimonial-7.mp4";
import asset_assets_testimonial_8_mp4 from "@/assets/testimonial-8.mp4";
import asset_assets_testimonial_9_mp4 from "@/assets/testimonial-9.mp4";
import asset_assets_testimonial_10_mp4 from "@/assets/testimonial-10.mp4";
import asset_assets_testimonial_11_mp4 from "@/assets/testimonial-11.mp4";
import asset_assets_testimonial_12_mp4 from "@/assets/testimonial-12.mp4";
import asset_assets_testimonial_13_mp4 from "@/assets/testimonial-13.mp4";
import asset_assets_testimonial_5_poster_jpg from "@/assets/testimonial-5-poster.jpg";
import asset_assets_testimonial_6_poster_jpg from "@/assets/testimonial-6-poster.jpg";
import asset_assets_testimonial_7_poster_jpg from "@/assets/testimonial-7-poster.jpg";
import asset_assets_testimonial_8_poster_jpg from "@/assets/testimonial-8-poster.jpg";
import asset_assets_testimonial_9_poster_jpg from "@/assets/testimonial-9-poster.jpg";
import asset_assets_testimonial_10_poster_jpg from "@/assets/testimonial-10-poster.jpg";
import asset_assets_testimonial_11_poster_jpg from "@/assets/testimonial-11-poster.jpg";
import asset_assets_testimonial_12_poster_jpg from "@/assets/testimonial-12-poster.jpg";
import asset_assets_testimonial_13_poster_jpg from "@/assets/testimonial-13-poster.jpg";
import asset_assets_balance_logo_on_black_png from "@/assets/balance-logo-on-black.png";
import asset_assets_balance_diamond_png from "@/assets/balance-diamond.png";
import asset_assets_daw_1_jpeg from "@/assets/daw-1.jpeg";
import asset_assets_daw_2_jpeg from "@/assets/daw-2.jpeg";
import asset_assets_daw_3_jpeg from "@/assets/daw-3.jpeg";
import asset_assets_daw_4_jpeg from "@/assets/daw-4.jpeg";
import asset_assets_daw_5_jpeg from "@/assets/daw-5.jpeg";
import asset_assets_daw_new_1_jpg from "@/assets/daw-new-1.jpg";
import asset_assets_daw_new_2_jpg from "@/assets/daw-new-2.jpg";
import asset_assets_daw_new_3_jpg from "@/assets/daw-new-3.jpg";
import asset_assets_daw_new_4_jpg from "@/assets/daw-new-4.jpg";
import asset_assets_corp_new_1_jpg from "@/assets/corp-new-1.jpg";
import asset_assets_corp_vh_1_jpg from "@/assets/corp-vh-1.jpg";
import asset_assets_corp_vh_2_jpg from "@/assets/corp-vh-2.jpg";
import asset_assets_corp_vh_3_jpg from "@/assets/corp-vh-3.jpg";
import asset_assets_corp_vh_4_jpg from "@/assets/corp-vh-4.jpg";
import asset_assets_corp_new_6_jpg from "@/assets/corp-new-6.jpg";
import asset_assets_corp_new_7_jpg from "@/assets/corp-new-7.jpg";
import asset_assets_pers_sq_1_jpg from "@/assets/pers-sq-1.jpg";
import asset_assets_pers_sq_2_jpg from "@/assets/pers-sq-2.jpg";
import asset_assets_pers_sq_3_jpg from "@/assets/pers-sq-3.jpg";
import asset_assets_pers_sq_4_jpg from "@/assets/pers-sq-4.jpg";
import asset_assets_pers_sq_5_jpg from "@/assets/pers-sq-5.jpg";
import asset_assets_pers_slide_2_jpg from "@/assets/pers-slide-2.jpg";
import asset_assets_pers_slide_3_jpg from "@/assets/pers-slide-3.jpg";
import asset_assets_pers_slide_4_jpg from "@/assets/pers-slide-4.jpg";
import asset_assets_pers_slide_4_1_jpg from "@/assets/pers-slide-4-1.jpg";
import asset_assets_pers_slide_5_jpg from "@/assets/pers-slide-5.jpg";
import asset_assets_oys_1_png from "@/assets/oys-1.png";
import asset_assets_oys_2_png from "@/assets/oys-2.png";
import asset_assets_oys_3_png from "@/assets/oys-3.png";
import asset_assets_oys_4_png from "@/assets/oys-4.png";
import asset_assets_oys_5_png from "@/assets/oys-5.png";
import asset_assets_about_me_1_jpg from "@/assets/about-me-1.jpg";
import asset_assets_about_me_2_jpg from "@/assets/about-me-2.jpg";
import asset_assets_Picture8_jpg from "@/assets/Picture8.jpg";
import asset_assets_Picture9_jpg from "@/assets/Picture9.jpg";
import asset_assets_Picture10_jpg from "@/assets/Picture10.jpg";
import asset_assets_Picture11_gif from "@/assets/Picture11.gif";
import asset_assets_trend_scrapbook_jpeg from "@/assets/trend-scrapbook.jpeg";
import asset_assets_trend_reworked_jpeg from "@/assets/trend-reworked.jpeg";
import asset_assets_trend_abstract_prints_jpeg from "@/assets/trend-abstract-prints.jpeg";
import asset_assets_trend_folksy_jpeg from "@/assets/trend-folksy.jpeg";
import asset_assets_trend_1606_jpg from "@/assets/trend-1606.jpg";
import asset_assets_trend_1607_jpg from "@/assets/trend-1607.jpg";
import asset_assets_trend_1612_jpg from "@/assets/trend-1612.jpg";
import asset_assets_trend_1613_jpg from "@/assets/trend-1613.jpg";
import asset_assets_trend_1614_jpg from "@/assets/trend-1614.jpg";
import asset_assets_trend_1615_jpg from "@/assets/trend-1615.jpg";
import asset_assets_trend_1616_jpg from "@/assets/trend-1616.jpg";
import asset_assets_graphic_1_jpg from "@/assets/graphic-1.jpg";
import asset_assets_graphic_2_jpg from "@/assets/graphic-2.jpg";
import asset_assets_graphic_3_jpg from "@/assets/graphic-3.jpg";
import asset_assets_graphic_4_jpg from "@/assets/graphic-4.jpg";
import asset_assets_graphic_6_jpg from "@/assets/graphic-6.jpg";
import asset_assets_graphic_7_jpg from "@/assets/graphic-7.jpg";
import asset_assets_graphic_10_jpg from "@/assets/graphic-10.jpg";
import asset_assets_dws_1_jpg from "@/assets/dws-1.jpg";
import asset_assets_dws_2_jpg from "@/assets/dws-2.jpg";
import asset_assets_dws_3_jpg from "@/assets/dws-3.jpg";
import asset_assets_dws_4_jpg from "@/assets/dws-4.jpg";
import asset_assets_dws_5_jpg from "@/assets/dws-5.jpg";
import asset_assets_dws_6_jpg from "@/assets/dws-6.jpg";
import asset_assets_dws_7_jpg from "@/assets/dws-7.jpg";
import asset_assets_dws_8_jpg from "@/assets/dws-8.jpg";
import asset_assets_dws_9_jpg from "@/assets/dws-9.jpg";
/** Complete Balance Design homepage, including animations. Requires the existing project styles, assets, npm packages and enquiry connection. */

// Module_components_SiteHeader
const Module_components_SiteHeader_logoDark = asset_assets_balance_logo_navbar_png;
const Module_components_SiteHeader_NAV = [
  { label: "Home", href: "/#top" },
  { label: "About Us", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Contact Us", href: "/contact" },
];
function Module_components_SiteHeader_SiteHeader({
  introComplete = true,
  forceSolid = false,
  logoVisible = true,
}: {
  introComplete?: boolean;
  forceSolid?: boolean;
  logoVisible?: boolean;
}) {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  const showSolid = solid || forceSolid;
  const tone = open ? "text-ivory" : "text-foreground";
  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[60] transition-[background-color,border-color,backdrop-filter] duration-700 ease-in-out ${introComplete ? "" : "pointer-events-none"} ${
          open
            ? "bg-transparent"
            : showSolid
              ? "border-b border-border bg-background/95 backdrop-blur-sm"
              : introComplete
                ? "bg-background/70 backdrop-blur-md"
                : "bg-transparent"
        }`}
      >
        <div className={`flex items-center justify-between px-6 py-3 md:px-12 ${tone}`}>
          <a
            href="/#top"
            aria-label="Balance Design & Fashion Consultancy"
            className="block"
            data-navbar-logo
          >
            <img
              src={Module_components_SiteHeader_logoDark}
              alt="Balance Design & Fashion Consultancy"
              width={800}
              height={648}
              className={`h-[4.375rem] w-auto md:h-[6.25rem] ${logoVisible ? "opacity-100" : "opacity-0"}`}
            />
          </a>

          <div
            className={`flex items-center gap-8 transition-opacity duration-500 ease-in-out md:gap-12 ${introComplete ? "opacity-100" : "opacity-0"}`}
          >
            <a href="/contact" className="label-xs link-underline hidden sm:inline-block">
              Contact
            </a>
            <button
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="label-xs flex items-center gap-3 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4"
            >
              <span className="hidden md:inline">{open ? "Close" : "Menu"}</span>
              <span className="flex h-4 w-6 flex-col justify-center gap-[5px]">
                <span
                  className={`block h-px w-full bg-current transition-transform duration-500 ${open ? "translate-y-[3px] rotate-45" : ""}`}
                />
                <span
                  className={`block h-px w-full bg-current transition-transform duration-500 ${open ? "-translate-y-[3px] -rotate-45" : ""}`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        aria-hidden={!open}
        className={`fixed inset-0 z-50 bg-charcoal text-ivory transition-opacity duration-700 ${open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <nav className="flex h-full flex-col justify-center gap-2 px-6 pt-24 md:px-12 md:pt-28">
          {Module_components_SiteHeader_NAV.map((n, i) => (
            <a
              key={n.label}
              href={n.href}
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
              className="display w-fit text-[2.5rem] leading-[1.15] transition-[opacity,transform,color] duration-700 hover:text-red md:text-[5rem]"
              style={{
                opacity: open ? 1 : 0,
                transform: open ? "none" : "translateY(28px)",
                transitionDelay: `${open ? 120 + i * 70 : 0}ms`,
              }}
            >
              {n.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}

// Module_lib_utils
function Module_lib_utils_cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Module_components_ui_button
const Module_components_ui_button_buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);
interface Module_components_ui_button_ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof Module_components_ui_button_buttonVariants> {
  asChild?: boolean;
}
const Module_components_ui_button_Button = React.forwardRef<
  HTMLButtonElement,
  Module_components_ui_button_ButtonProps
>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={Module_lib_utils_cn(
        Module_components_ui_button_buttonVariants({ variant, size, className }),
      )}
      ref={ref}
      {...props}
    />
  );
});
Module_components_ui_button_Button.displayName = "Button";

// Module_components_ui_dialog
const Module_components_ui_dialog_Dialog = DialogPrimitive.Root;
const Module_components_ui_dialog_DialogTrigger = DialogPrimitive.Trigger;
const Module_components_ui_dialog_DialogPortal = DialogPrimitive.Portal;
const Module_components_ui_dialog_DialogClose = DialogPrimitive.Close;
const Module_components_ui_dialog_DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={Module_lib_utils_cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
  />
));
Module_components_ui_dialog_DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
const Module_components_ui_dialog_DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <Module_components_ui_dialog_DialogPortal>
    <Module_components_ui_dialog_DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={Module_lib_utils_cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className,
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </Module_components_ui_dialog_DialogPortal>
));
Module_components_ui_dialog_DialogContent.displayName = DialogPrimitive.Content.displayName;
const Module_components_ui_dialog_DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={Module_lib_utils_cn("flex flex-col space-y-1.5 text-center sm:text-left", className)}
    {...props}
  />
);
Module_components_ui_dialog_DialogHeader.displayName = "DialogHeader";
const Module_components_ui_dialog_DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={Module_lib_utils_cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className,
    )}
    {...props}
  />
);
Module_components_ui_dialog_DialogFooter.displayName = "DialogFooter";
const Module_components_ui_dialog_DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={Module_lib_utils_cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
Module_components_ui_dialog_DialogTitle.displayName = DialogPrimitive.Title.displayName;
const Module_components_ui_dialog_DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={Module_lib_utils_cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
Module_components_ui_dialog_DialogDescription.displayName = DialogPrimitive.Description.displayName;

// Module_components_HeroImageLightbox
type Module_components_HeroImageLightbox_ExpandedHeroImage = {
  src: string;
  alt: string;
  trigger: HTMLElement;
};
function Module_components_HeroImageLightbox_HeroImageLightbox({
  image,
  onClose,
  onExplore,
  onAfterClose,
}: {
  image: Module_components_HeroImageLightbox_ExpandedHeroImage | null;
  onClose: () => void;
  onExplore?: () => void;
  onAfterClose?: () => void;
}) {
  const trigger = useRef<HTMLElement | null>(null);
  if (image) trigger.current = image.trigger;
  return (
    <Module_components_ui_dialog_Dialog
      open={image !== null}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <Module_components_ui_dialog_DialogPortal>
        <DialogPrimitive.Overlay className="hero-lightbox-backdrop" />
        <DialogPrimitive.Content
          className="hero-lightbox"
          aria-describedby={undefined}
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            trigger.current?.focus({ preventScroll: true });
            onAfterClose?.();
          }}
        >
          <Module_components_ui_dialog_DialogTitle className="sr-only">
            {image?.alt}
          </Module_components_ui_dialog_DialogTitle>
          {image && <img src={image.src} alt={image.alt} className="hero-lightbox-image" />}
          <Module_components_ui_dialog_DialogClose asChild>
            <Module_components_ui_button_Button
              variant="secondary"
              size="icon"
              className="hero-lightbox-close"
              aria-label="Close expanded image"
              title="Close expanded image"
            >
              <X aria-hidden="true" />
            </Module_components_ui_button_Button>
          </Module_components_ui_dialog_DialogClose>
          {onExplore && (
            <Module_components_ui_button_Button
              variant="secondary"
              className="hero-lightbox-explore"
              onClick={onExplore}
            >
              SCROLL TO EXPLORE <ArrowDown aria-hidden="true" />
            </Module_components_ui_button_Button>
          )}
        </DialogPrimitive.Content>
      </Module_components_ui_dialog_DialogPortal>
    </Module_components_ui_dialog_Dialog>
  );
}

// Module_components_Hero
const Module_components_Hero_h0541 = asset_assets_hero_0541_jpg;
const Module_components_Hero_h0545 = asset_assets_hero_0545_jpg;
const Module_components_Hero_h0556 = asset_assets_hero_0556_jpg;
const Module_components_Hero_h1616 = asset_assets_hero_1616b_jpg;
const Module_components_Hero_h1627 = asset_assets_hero_1627_jpg;
const Module_components_Hero_h1628 = asset_assets_hero_1628_jpg;
const Module_components_Hero_h1629 = asset_assets_hero_1629_jpg;
const Module_components_Hero_h1630 = asset_assets_hero_1630_jpg;
const Module_components_Hero_h1631 = asset_assets_hero_1631_jpg;
const Module_components_Hero_HERO_COLUMNS = [
  [
    { src: Module_components_Hero_h1616, alt: "Garment sketches and colour palette" },
    { src: Module_components_Hero_h0541, alt: "Fashion seminar audience" },
  ],
  [
    { src: Module_components_Hero_h1627, alt: "Artistic fashion portrait collage" },
    { src: Module_components_Hero_h1628, alt: "Geometric textile designs and embroidered shoes" },
    { src: Module_components_Hero_h0545, alt: "Colour and styling workshop" },
  ],
  [
    { src: Module_components_Hero_h1629, alt: "Fashion portrait design board" },
    { src: Module_components_Hero_h1631, alt: "Fashion illustrations in printed garments" },
    { src: Module_components_Hero_h1630, alt: "Floral textile pattern" },
    { src: Module_components_Hero_h0556, alt: "Fashion and colour theory seminar" },
  ],
];
const Module_components_Hero_PHRASES = [
  "Design & Styling Workshops",
  "Creating Looks",
  "Personal Image Consulting",
  "Fashion Forecasting",
  "Creating Fashion Collections",
  "Design Aesthetics Workshops",
];
function Module_components_Hero_Hero() {
  const reduced = useReducedMotion();
  const [expandedImage, setExpandedImage] =
    useState<Module_components_HeroImageLightbox_ExpandedHeroImage | null>(null);
  const [gridPaused, setGridPaused] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);
  const continueAfterClose = useRef(false);
  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;
    // Native delegation survives LogoIntro temporarily moving this node to body.
    const click = (event: MouseEvent) => {
      if (gallery.dataset["phase"] !== "hold" && gallery.dataset["phase"] !== "movement") return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const cell = target.closest<HTMLElement>("[data-column-image]");
      const image = cell?.querySelector<HTMLImageElement>("img");
      if (!cell || !image) return;
      gallery.dispatchEvent(new CustomEvent("grid-lightbox", { detail: true }));
      setExpandedImage({ src: image.currentSrc || image.src, alt: image.alt, trigger: cell });
    };
    const state = (event: Event) => setGridPaused(Boolean((event as CustomEvent<boolean>).detail));
    gallery.addEventListener("click", click);
    gallery.addEventListener("grid-pause-state", state);
    return () => {
      gallery.removeEventListener("click", click);
      gallery.removeEventListener("grid-pause-state", state);
    };
  }, []);
  const closeImage = () => {
    setExpandedImage(null);
    // Wait for the dialog's exit and scroll-lock release before restarting.
    galleryRef.current?.dispatchEvent(new CustomEvent("grid-lightbox", { detail: false }));
  };
  const navigateToServices = () => {
    const services = document.getElementById("services");
    if (!services) return;
    services.focus({ preventScroll: true });
    services.scrollIntoView({ behavior: reduced ? "instant" : "smooth", block: "start" });
  };
  const explore = () => {
    galleryRef.current?.dispatchEvent(new CustomEvent("grid-explore"));
    if (expandedImage) {
      continueAfterClose.current = true;
      closeImage();
    } else navigateToServices();
  };
  const afterClose = () => {
    if (!continueAfterClose.current) return;
    continueAfterClose.current = false;
    requestAnimationFrame(navigateToServices);
  };
  return (
    <section
      id="top"
      className="cinematic-hero bg-background"
      aria-label="Balance Design & Fashion Consultancy"
    >
      <h1 className="sr-only">Balance Design &amp; Fashion Consultancy</h1>
      <div
        ref={galleryRef}
        data-hero-gallery
        className="cinematic-gallery"
        aria-label="Balance Design image gallery"
      >
        {Module_components_Hero_HERO_COLUMNS.map((photos, column) => (
          <div key={column} data-hero-column className="cinematic-column">
            <div data-column-track className="cinematic-track">
              {Array.from({ length: 16 }, (_, repetition) =>
                photos.map((photo, photoIndex) => (
                  <Module_components_ui_button_Button
                    key={`${repetition}-${photo.src}`}
                    variant="ghost"
                    tabIndex={-1}
                    aria-label={`Expand ${photo.alt}`}
                    data-column-image
                    data-cycle-start={photoIndex === 0 ? "true" : undefined}
                    className="cinematic-image"
                  >
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      data-intro-image={repetition === 0 ? "true" : undefined}
                      loading="eager"
                      decoding="async"
                    />
                  </Module_components_ui_button_Button>
                )),
              )}
            </div>
          </div>
        ))}
        <Module_components_ui_button_Button
          variant="secondary"
          size="icon"
          data-grid-toggle
          className="grid-motion-toggle"
          aria-label={gridPaused ? "Resume grid animation" : "Pause grid animation"}
          title={gridPaused ? "Resume grid animation" : "Pause grid animation"}
          aria-pressed={gridPaused}
        >
          {gridPaused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
        </Module_components_ui_button_Button>
        <Module_components_ui_button_Button
          variant="ghost"
          data-grid-explore
          className="grid-explore-cue"
          onClick={explore}
        >
          SCROLL TO EXPLORE <ArrowDown aria-hidden="true" />
        </Module_components_ui_button_Button>
      </div>
      <Module_components_HeroImageLightbox_HeroImageLightbox
        image={expandedImage}
        onClose={closeImage}
        onExplore={explore}
        onAfterClose={afterClose}
      />
    </section>
  );
}

// Module_components_LogoIntro
const Module_components_LogoIntro_originalLogo = asset_assets_balance_logo_navbar_png;
/** One entrance clock owns the unchanged loader, grid reveal and slow travel. */
function Module_components_LogoIntro_LogoIntro({
  onReveal,
  onComplete,
  onFinish,
}: {
  onReveal: () => void;
  onComplete: () => void;
  onFinish: () => void;
}) {
  const layerRef = useRef<HTMLDivElement>(null);
  const surfaceRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    const layer = layerRef.current;
    const surface = surfaceRef.current;
    const logo = logoRef.current;
    const counter = counterRef.current;
    const gallery = document.querySelector<HTMLElement>("[data-hero-gallery]");
    if (!layer || !surface || !logo || !counter || !gallery) {
      onReveal();
      onComplete();
      onFinish();
      return;
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let disposed = false;
    let entrance: gsap.core.Timeline | undefined;
    const columns = Array.from(gallery.querySelectorAll<HTMLElement>("[data-hero-column]"));
    const tracks = Array.from(gallery.querySelectorAll<HTMLElement>("[data-column-track]"));
    const geometry = { travel: 0 };
    let offscreen = false;
    const manual = { offset: 0 };
    let manualTarget = 0;
    let manualTween: gsap.core.Tween | undefined;
    let resumeTimer: ReturnType<typeof setTimeout> | undefined;
    let userPaused = false;
    let lightboxOpen = false;
    let touchY: number | undefined;
    let dragged = false;
    const interactive = () =>
      gallery.dataset["phase"] === "hold" || gallery.dataset["phase"] === "movement";
    const announce = () =>
      gallery.dispatchEvent(
        new CustomEvent("grid-pause-state", {
          detail: userPaused || reduced || Boolean(entrance?.paused()),
        }),
      );
    const pause = () => {
      clearTimeout(resumeTimer);
      entrance?.pause();
      announce();
    };
    const resume = () => {
      if (
        disposed ||
        userPaused ||
        lightboxOpen ||
        touchY !== undefined ||
        document.hidden ||
        offscreen ||
        reduced ||
        !interactive()
      )
        return;
      manualTween?.kill();
      manualTarget = manual.offset;
      entrance?.resume();
      announce();
    };
    const resumeLater = () => {
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(resume, 1600);
    };
    const phase = (value: string) => {
      layer.dataset["phase"] = value;
      gallery.dataset["phase"] = value;
      if (value === "movement") entrance?.timeScale(0.55);
      place();
    };
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    layer.dataset["phase"] = "loading";
    gsap.set(gallery, { opacity: 1 });
    gsap.set(columns, { clipPath: "inset(100% 0 0 0)" });
    const place = () => {
      const height = window.innerHeight;
      columns.forEach((column, i) => {
        const track = tracks[i];
        if (!track) return;
        const cycles = track.querySelectorAll<HTMLElement>("[data-cycle-start]");
        const first = cycles[0];
        const next = cycles[1];
        if (!first || !next) return;
        const cycleHeight = next.offsetTop - first.offsetTop;
        if (cycleHeight <= 0) return;
        const distance = height * (i === 0 ? 0.7 : i === 1 ? 0.6 : 0.85);
        // Measure natural photo stacks, never impose a uniform cell height.
        // Leave several complete cycles above and below every viewport.
        const start = Math.min(
          -cycleHeight,
          -cycleHeight * 3 +
            (i === 0
              ? height * 0.18 + distance * 0.776
              : i === 1
                ? -height * 0.45
                : -height * 0.12),
        );
        const travel = distance * geometry.travel + manual.offset;
        const wrapped = gsap.utils.wrap(-cycleHeight, cycleHeight, travel);
        gsap.set(track, { y: start + (i === 1 ? 1 : -1) * wrapped });
        track.querySelectorAll<HTMLElement>("[data-column-image]").forEach((cell) => {
          const rect = cell.getBoundingClientRect();
          cell.tabIndex = interactive() && rect.bottom > 0 && rect.top < height ? 0 : -1;
        });
      });
    };
    const move = (delta: number) => {
      if (!interactive() || lightboxOpen) return;
      pause();
      // Bounded travel retains ample repeated cycles on either side of the viewport.
      const cycles = tracks[0]?.querySelectorAll<HTMLElement>("[data-cycle-start]");
      const cycle =
        cycles?.[1] && cycles[0] ? cycles[1].offsetTop - cycles[0].offsetTop : window.innerHeight;
      manualTarget = Math.max(-cycle * 1.5, Math.min(cycle * 6, manualTarget + delta));
      manualTween?.kill();
      manualTween = gsap.to(manual, {
        offset: manualTarget,
        duration: 0.65,
        ease: "power2.out",
        onUpdate: place,
      });
      resumeLater();
    };
    const wheel = (event: WheelEvent) => {
      if (!interactive() || lightboxOpen || event.ctrlKey) return;
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1;
      move(Math.max(-100, Math.min(100, event.deltaY * unit * 0.35)));
    };
    const touchStart = (event: TouchEvent) => {
      if (interactive()) {
        touchY = event.touches[0]?.clientY;
        dragged = false;
        pause();
      }
    };
    const touchMove = (event: TouchEvent) => {
      const next = event.touches[0]?.clientY;
      if (!interactive() || lightboxOpen || touchY === undefined || next === undefined) return;
      const delta = touchY - next;
      if (Math.abs(delta) > 2) dragged = true;
      move(delta * 0.55);
      touchY = next;
    };
    const touchEnd = () => {
      touchY = undefined;
      resumeLater();
    };
    const click = (event: MouseEvent) => {
      if (dragged && event.detail > 0) {
        event.preventDefault();
        event.stopImmediatePropagation();
        dragged = false;
        return;
      }
      dragged = false;
      if (
        !interactive() ||
        !(event.target instanceof Element) ||
        !event.target.closest("[data-grid-toggle]")
      )
        return;
      userPaused = !userPaused;
      if (userPaused) pause();
      else resume();
    };
    const lightbox = (event: Event) => {
      lightboxOpen = Boolean((event as CustomEvent<boolean>).detail);
      if (lightboxOpen) {
        pause();
        manualTween?.kill();
        manualTarget = manual.offset;
      } else resumeLater();
    };
    const explore = () => {
      userPaused = true;
      pause();
      manualTween?.kill();
      manualTarget = manual.offset;
    };
    const visibility = () => {
      if (document.hidden && interactive()) pause();
      else resumeLater();
    };
    const focus = () => {
      if (interactive()) pause();
    };
    const blur = () => {
      if (!lightboxOpen) resumeLater();
    };
    gallery.addEventListener("wheel", wheel, { passive: true });
    gallery.addEventListener("touchstart", touchStart, { passive: true });
    gallery.addEventListener("touchmove", touchMove, { passive: true });
    gallery.addEventListener("touchend", touchEnd);
    gallery.addEventListener("touchcancel", touchEnd);
    gallery.addEventListener("click", click, true);
    gallery.addEventListener("grid-explore", explore);
    gallery.addEventListener("grid-lightbox", lightbox);
    gallery.addEventListener("focusin", focus);
    gallery.addEventListener("focusout", blur);
    document.addEventListener("visibilitychange", visibility);
    const observer = new IntersectionObserver(([entry]) => {
      offscreen = !entry?.isIntersecting;
      if (offscreen && interactive()) pause();
      else resumeLater();
    });
    observer.observe(gallery);
    place();
    let watchdog: ReturnType<typeof setTimeout> | undefined;
    const prepare = async () => {
      const images = Array.from(
        document.querySelectorAll<HTMLImageElement>("[data-intro-image], [data-intro-logo]"),
      );
      await Promise.all(
        images.map(async (image) => {
          try {
            await image.decode();
          } catch {
            /* Failed assets cannot trap the loader. */
          }
        }),
      );
    };
    const assetsReady = Promise.race([
      prepare(),
      new Promise<void>((resolve) => {
        watchdog = setTimeout(resolve, 8000);
      }),
    ]);
    const begin = () => {
      if (disposed) return;
      clearTimeout(watchdog);
      place();
      entrance = gsap.timeline();
      entrance
        .call(
          () => {
            phase("reveal");
          },
          [],
          0,
        )
        .to(counter, { opacity: 0, duration: 0.4 }, 0)
        .to(surface, { opacity: 0, duration: 0.85, ease: "power2.inOut" }, 0.2)
        .to(
          columns,
          { clipPath: "inset(0% 0 0 0)", duration: 0.9, stagger: 0.08, ease: "power3.inOut" },
          0.2,
        )
        .to(logo, { opacity: 0, duration: 0.6 }, 0.3)
        .call(
          () => {
            phase("hold");
            // Only loading locks the page. The grid never owns page navigation.
            document.documentElement.style.overflow = previousOverflow;
            gsap.set(layer, { display: "none" });
            onReveal();
            onComplete();
            onFinish();
          },
          [],
          1.26,
        )
        .call(
          () => {
            phase("movement");
          },
          [],
          3.01,
        )
        .to(geometry, { travel: 1, duration: 3.4, ease: "power2.inOut", onUpdate: place }, 3.01)
        .to(geometry, {
          travel: "+=1",
          duration: 12,
          repeat: -1,
          repeatRefresh: true,
          ease: "none",
          onUpdate: place,
        });
    };
    const progress = { value: 0 };
    const loading = gsap.timeline();
    if (reduced) {
      phase("hold");
      gsap.set(columns, { clipPath: "inset(0% 0 0 0)" });
      gsap.set(layer, { display: "none" });
      document.documentElement.style.overflow = previousOverflow;
      userPaused = true;
      onReveal();
      onComplete();
      onFinish();
      announce();
    } else
      loading.to(progress, {
        value: 94,
        duration: 3.15,
        ease: "none",
        onUpdate: () => {
          counter.textContent = `${Math.floor(progress.value)}%`;
        },
      });
    if (!reduced)
      loading.call(() => {
        void assetsReady.then(() => {
          if (disposed) return;
          loading
            .to(progress, {
              value: 100,
              duration: 0.3,
              ease: "none",
              onUpdate: () => {
                counter.textContent = `${Math.floor(progress.value)}%`;
              },
            })
            .to({}, { duration: 0.3 })
            .call(begin);
        });
      });
    window.addEventListener("resize", place);
    return () => {
      disposed = true;
      clearTimeout(resumeTimer);
      manualTween?.kill();
      gallery.removeEventListener("wheel", wheel);
      gallery.removeEventListener("touchstart", touchStart);
      gallery.removeEventListener("touchmove", touchMove);
      gallery.removeEventListener("touchend", touchEnd);
      gallery.removeEventListener("touchcancel", touchEnd);
      gallery.removeEventListener("click", click, true);
      gallery.removeEventListener("grid-explore", explore);
      observer.disconnect();
      gallery.removeEventListener("grid-lightbox", lightbox);
      gallery.removeEventListener("focusin", focus);
      gallery.removeEventListener("focusout", blur);
      document.removeEventListener("visibilitychange", visibility);
      delete gallery.dataset["phase"];
      clearTimeout(watchdog);
      loading.kill();
      entrance?.kill();
      window.removeEventListener("resize", place);
      document.documentElement.style.overflow = previousOverflow;
      gsap.set(gallery, { clearProps: "opacity" });
      gsap.set(tracks, { clearProps: "transform" });
      gsap.set(columns, { clearProps: "transform,opacity,clipPath" });
    };
  }, [onReveal, onComplete, onFinish]);
  return (
    <div
      ref={layerRef}
      data-logo-intro
      className="fixed inset-0 z-[80] pointer-events-none"
      aria-label="Loading Balance Design"
    >
      <div ref={surfaceRef} data-loader-surface className="absolute inset-0 bg-intro-background" />
      <div ref={logoRef} className="intro-logo">
        <img
          src={Module_components_LogoIntro_originalLogo}
          data-intro-logo
          alt="Balance Design"
          width={800}
          height={648}
          className="absolute inset-0 w-full h-full object-contain"
        />
      </div>
      <p
        ref={counterRef}
        data-loading-counter
        className="intro-counter text-intro-foreground"
        aria-live="off"
      >
        0%
      </p>
    </div>
  );
}

// Module_components_Reveal
function Module_components_Reveal_Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`reveal ${shown ? "reveal-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// Module_components_LogoMark
const Module_components_LogoMark_logoMark = asset_assets_balance_logo_mark_png;
function Module_components_LogoMark_LogoMark({ className = "" }: { className?: string }) {
  return (
    <img
      src={Module_components_LogoMark_logoMark}
      alt="Balance Design diamond mark"
      className={`mx-auto h-10 w-auto object-contain md:h-14 ${className}`}
      width={120}
      height={80}
    />
  );
}

// Module_components_Testimonials
const Module_components_Testimonials_videoOne = asset_assets_testimonial_1_mp4;
const Module_components_Testimonials_videoTwo = asset_assets_testimonial_2_mp4;
const Module_components_Testimonials_posterOne = asset_assets_testimonial_1_poster_jpg;
const Module_components_Testimonials_posterTwo = asset_assets_testimonial_2_poster_jpg;
const Module_components_Testimonials_videoThree = asset_assets_testimonial_3_mp4;
const Module_components_Testimonials_videoFour = asset_assets_testimonial_4_mp4;
const Module_components_Testimonials_posterThree = asset_assets_testimonial_3_poster_jpg;
const Module_components_Testimonials_posterFour = asset_assets_testimonial_4_poster_jpg;
const Module_components_Testimonials_video5 = asset_assets_testimonial_5_mp4;
const Module_components_Testimonials_video6 = asset_assets_testimonial_6_mp4;
const Module_components_Testimonials_video7 = asset_assets_testimonial_7_mp4;
const Module_components_Testimonials_video8 = asset_assets_testimonial_8_mp4;
const Module_components_Testimonials_video9 = asset_assets_testimonial_9_mp4;
const Module_components_Testimonials_video10 = asset_assets_testimonial_10_mp4;
const Module_components_Testimonials_video11 = asset_assets_testimonial_11_mp4;
const Module_components_Testimonials_video12 = asset_assets_testimonial_12_mp4;
const Module_components_Testimonials_video13 = asset_assets_testimonial_13_mp4;
const Module_components_Testimonials_poster5 = asset_assets_testimonial_5_poster_jpg;
const Module_components_Testimonials_poster6 = asset_assets_testimonial_6_poster_jpg;
const Module_components_Testimonials_poster7 = asset_assets_testimonial_7_poster_jpg;
const Module_components_Testimonials_poster8 = asset_assets_testimonial_8_poster_jpg;
const Module_components_Testimonials_poster9 = asset_assets_testimonial_9_poster_jpg;
const Module_components_Testimonials_poster10 = asset_assets_testimonial_10_poster_jpg;
const Module_components_Testimonials_poster11 = asset_assets_testimonial_11_poster_jpg;
const Module_components_Testimonials_poster12 = asset_assets_testimonial_12_poster_jpg;
const Module_components_Testimonials_poster13 = asset_assets_testimonial_13_poster_jpg;
type Module_components_Testimonials_VideoTestimonial = {
  id: string;
  name: string;
  role: string;
  video: string;
  poster: string;
};
const Module_components_Testimonials_TESTIMONIALS: Module_components_Testimonials_VideoTestimonial[] =
  [
    {
      id: "t1",
      name: "",
      role: "",
      video: Module_components_Testimonials_videoOne,
      poster: Module_components_Testimonials_posterOne,
    },
    {
      id: "t2",
      name: "",
      role: "",
      video: Module_components_Testimonials_videoTwo,
      poster: Module_components_Testimonials_posterTwo,
    },
    {
      id: "t3",
      name: "",
      role: "",
      video: Module_components_Testimonials_videoThree,
      poster: Module_components_Testimonials_posterThree,
    },
    {
      id: "t4",
      name: "",
      role: "",
      video: Module_components_Testimonials_videoFour,
      poster: Module_components_Testimonials_posterFour,
    },
    {
      id: "t5",
      name: "",
      role: "",
      video: Module_components_Testimonials_video5,
      poster: Module_components_Testimonials_poster5,
    },
    {
      id: "t6",
      name: "",
      role: "",
      video: Module_components_Testimonials_video6,
      poster: Module_components_Testimonials_poster6,
    },
    {
      id: "t7",
      name: "",
      role: "",
      video: Module_components_Testimonials_video7,
      poster: Module_components_Testimonials_poster7,
    },
    {
      id: "t8",
      name: "",
      role: "",
      video: Module_components_Testimonials_video8,
      poster: Module_components_Testimonials_poster8,
    },
    {
      id: "t9",
      name: "",
      role: "",
      video: Module_components_Testimonials_video9,
      poster: Module_components_Testimonials_poster9,
    },
    {
      id: "t10",
      name: "",
      role: "",
      video: Module_components_Testimonials_video10,
      poster: Module_components_Testimonials_poster10,
    },
    {
      id: "t11",
      name: "",
      role: "",
      video: Module_components_Testimonials_video11,
      poster: Module_components_Testimonials_poster11,
    },
    {
      id: "t12",
      name: "",
      role: "",
      video: Module_components_Testimonials_video12,
      poster: Module_components_Testimonials_poster12,
    },
    {
      id: "t13",
      name: "",
      role: "",
      video: Module_components_Testimonials_video13,
      poster: Module_components_Testimonials_poster13,
    },
  ];
const Module_components_Testimonials_COUNT = Module_components_Testimonials_TESTIMONIALS.length;
function Module_components_Testimonials_offsetFrom(index: number, active: number) {
  let diff = index - active;
  if (diff > Module_components_Testimonials_COUNT / 2) diff -= Module_components_Testimonials_COUNT;
  if (diff < -Module_components_Testimonials_COUNT / 2)
    diff += Module_components_Testimonials_COUNT;
  return diff;
}
function Module_components_Testimonials_Testimonials() {
  const [active, setActive] = useState(0);
  const [, setTimerKey] = useState(0);
  const [inView, setInView] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [reach, setReach] = useState(2);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setReach(mq.matches ? 2 : 1);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const drag = useRef<{
    x: number;
    active: boolean;
  }>({ x: 0, active: false });
  const go = useCallback((dir: number) => {
    setActive(
      (v) =>
        (v + dir + Module_components_Testimonials_COUNT) % Module_components_Testimonials_COUNT,
    );
    setTimerKey((k) => k + 1);
  }, []);
  const select = useCallback((index: number) => {
    setActive(index);
    setTimerKey((k) => k + 1);
  }, []);
  // Track viewport visibility
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(!!entry && entry.isIntersecting && entry.intersectionRatio > 0.25),
      { threshold: [0, 0.25, 0.5] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  // Only the active card plays
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index === active && inView) {
        video.muted = !soundOn;
        const play = video.play();
        if (play && typeof play.catch === "function")
          play.catch(() => {
            video.muted = true;
            setSoundOn(false);
            video.play().catch(() => {});
          });
      } else {
        video.pause();
        video.muted = true;
        if (index !== active) video.currentTime = 0;
      }
    });
  }, [active, inView, soundOn]);
  const onPointerDown = (event: React.PointerEvent) => {
    drag.current = { x: event.clientX, active: true };
  };
  const onPointerUp = (event: React.PointerEvent) => {
    if (!drag.current.active) return;
    const delta = event.clientX - drag.current.x;
    drag.current.active = false;
    if (Math.abs(delta) > 48) go(delta < 0 ? 1 : -1);
  };
  return (
    <section
      ref={sectionRef}
      className="overflow-hidden border-t border-border bg-background py-16 md:py-24"
      aria-roledescription="carousel"
      aria-label="Video testimonials"
    >
      <div className="mx-auto max-w-5xl px-6 md:px-12">
        <Module_components_Reveal_Reveal>
          <Module_components_LogoMark_LogoMark className="mb-8 md:mb-10" />
        </Module_components_Reveal_Reveal>
        <Module_components_Reveal_Reveal delay={80}>
          <p className="label-xs text-center text-red">Testimonials</p>
          <h2 className="display mt-4 mb-12 text-center text-4xl leading-[1.05] md:mb-16 md:text-6xl">
            What Brands and Customers Say About Us
          </h2>
        </Module_components_Reveal_Reveal>
      </div>

      <Module_components_Reveal_Reveal>
        <div
          className="relative mx-auto flex h-[112vw] max-h-[40rem] min-h-[27rem] w-full touch-pan-y select-none items-center justify-center md:h-[37rem] md:w-[92vw] lg:h-[max(30vw,30rem)] lg:max-h-[38rem] lg:w-[92vw]"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={() => (drag.current.active = false)}
        >
          {Module_components_Testimonials_TESTIMONIALS.map((item, index) => {
            const offset = Module_components_Testimonials_offsetFrom(index, active);
            const isActive = offset === 0;
            const dist = Math.abs(offset);
            const hidden = dist > reach;
            const sign = Math.sign(offset);
            // Position (in card widths) and depth per distance from center.
            const POS = reach === 2 ? [0, 0.98, 1.84, 2.5] : [0, 0.92, 1.6, 2.2];
            const SCALE = reach === 2 ? [1, 0.85, 0.72, 0.6] : [1, 0.82, 0.66, 0.6];
            const OPACITY = reach === 2 ? [1, 0.72, 0.42, 0] : [1, 0.68, 0, 0];
            const step = Math.min(dist, 3);
            return (
              <article
                key={item.id}
                aria-hidden={!isActive}
                onClick={() => !isActive && !hidden && select(index)}
                className="absolute top-1/2 left-1/2 w-[64vw] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none sm:w-[52vw] md:w-[min(38vw,23rem)] lg:w-[min(18vw,22rem)]"
                style={{
                  transform: `translate3d(calc(-50% + ${sign * (POS[step] ?? 0) * 100}%), -50%, 0) scale(${SCALE[step] ?? 1})`,
                  opacity: hidden ? 0 : (OPACITY[step] ?? 0),
                  zIndex: 20 - dist,
                  pointerEvents: hidden ? "none" : "auto",
                  cursor: isActive ? "default" : "pointer",
                }}
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-[1.75rem] bg-muted shadow-[0_30px_80px_-50px_rgba(0,0,0,0.5)]">
                  <video
                    ref={(el) => {
                      videoRefs.current[index] = el;
                    }}
                    src={item.video}
                    poster={item.poster}
                    muted
                    playsInline
                    preload="metadata"
                    onEnded={() => isActive && go(1)}
                    className="h-full w-full object-cover"
                  />
                  {isActive && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSoundOn((v) => !v);
                      }}
                      onPointerDown={(e) => e.stopPropagation()}
                      aria-label={soundOn ? "Mute video" : "Unmute video"}
                      className="absolute bottom-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-charcoal/50 text-ivory backdrop-blur-sm transition-colors hover:bg-charcoal/80"
                    >
                      {soundOn ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
                    </button>
                  )}
                </div>
              </article>
            );
          })}

          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={() => go(-1)}
            className="group absolute top-[calc(50%-2rem)] left-2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-foreground/25 text-foreground/70 transition-all duration-300 hover:scale-105 hover:border-foreground hover:bg-foreground hover:text-background md:left-4 lg:left-2"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M15 5l-7 7 7 7" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={() => go(1)}
            className="group absolute top-[calc(50%-2rem)] right-2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-foreground/25 text-foreground/70 transition-all duration-300 hover:scale-105 hover:border-foreground hover:bg-foreground hover:text-background md:right-4 lg:right-2"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </Module_components_Reveal_Reveal>
    </section>
  );
}

// Module_components_CtaSection
function Module_components_CtaSection_CtaSection() {
  return (
    <section id="contact" className="bg-red text-primary-foreground py-28 md:py-44">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <Module_components_Reveal_Reveal>
          <h2 className="display max-w-4xl text-[2.75rem] leading-[0.95] sm:text-6xl md:text-[6rem]">
            Let&rsquo;s create a
            <br />
            stronger presence.
          </h2>
        </Module_components_Reveal_Reveal>
        <Module_components_Reveal_Reveal delay={100}>
          <p className="label-xs mt-10 opacity-80">Design &amp; Fashion Consultancy</p>
        </Module_components_Reveal_Reveal>
        <Module_components_Reveal_Reveal delay={180}>
          <a
            href="mailto:contact@balancedesign.in"
            className="btn-ghost label-xs mt-12 inline-block hover:bg-background hover:text-red"
          >
            Book an appointment
          </a>
        </Module_components_Reveal_Reveal>
      </div>
    </section>
  );
}

// Module_components_SiteFooter
const Module_components_SiteFooter_logoLight = asset_assets_balance_logo_on_black_png;
function Module_components_SiteFooter_SiteFooter() {
  const ref = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.innerWidth < 768;
    let target = 0;
    let value = 0;
    let velocity = 0;
    let raf = 0;
    let running = false;
    const measure = () => {
      const el = ref.current;
      if (!el) return 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the footer first enters, 1 when it is fully revealed
      return Math.min(1, Math.max(0, (vh - rect.top) / Math.min(rect.height, vh)));
    };
    // Spring-driven reveal: the footer settles with a light elastic overshoot
    // whose strength follows how fast the reader scrolled into it, and unwinds
    // the same way when scrolling back up.
    const tick = () => {
      const stiffness = mobile ? 0.14 : 0.11;
      const damping = mobile ? 0.74 : 0.8;
      velocity += (target - value) * stiffness;
      velocity *= damping;
      value += velocity;
      setProgress(value);
      if (Math.abs(target - value) > 0.0008 || Math.abs(velocity) > 0.0008) {
        raf = window.requestAnimationFrame(tick);
      } else {
        value = target;
        velocity = 0;
        setProgress(value);
        running = false;
      }
    };
    const onScroll = () => {
      const next = measure();
      if (reduce) {
        setProgress(next);
        return;
      }
      velocity += (next - target) * (mobile ? 0.18 : 0.3);
      target = next;
      if (!running) {
        running = true;
        raf = window.requestAnimationFrame(tick);
      }
    };
    target = measure();
    value = target;
    setProgress(target);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <footer ref={ref} id="contact" className="relative z-0 overflow-hidden bg-charcoal text-ivory">
      <div className="mx-auto max-w-7xl px-6 pb-4 pt-20 md:px-12 md:pt-28">
        <div
          className="transition-none"
          style={{
            opacity: Math.max(0, Math.min(1, progress * 1.6)),
            transform: `translateY(${((1 - progress * 1.4) * 40).toFixed(2)}px)`,
          }}
        >
          <img
            src={Module_components_SiteFooter_logoLight}
            alt="Balance Design & Fashion Consultancy logo"
            className="h-24 w-auto md:h-32"
          />

          <p className="label-xs mt-6 opacity-60">Design &amp; Fashion Consultancy</p>

          <div className="mt-14 grid grid-cols-1 gap-10 border-t border-ivory/15 pt-10 sm:grid-cols-3">
            <nav className="flex flex-col gap-4">
              {[
                { l: "Home", h: "/#top" },
                { l: "About Us", h: "/about" },
                { l: "Events", h: "/events" },
                { l: "Contact Us", h: "/contact" },
              ].map((n) => (
                <a
                  key={n.l}
                  href={n.h}
                  className="label-xs transition-opacity duration-500 hover:opacity-50"
                >
                  {n.l}
                </a>
              ))}
            </nav>
            <div>
              <p className="label-xs opacity-50">Enquiries</p>
              <a
                href="mailto:info@balancedesign.in"
                className="link-underline mt-4 inline-block font-display text-2xl md:text-3xl"
              >
                info@balancedesign.in
              </a>
            </div>
            <div>
              <p className="label-xs opacity-50">Connect with us</p>
              <div className="mt-5 flex items-center gap-5">
                {[
                  { label: "Facebook", href: "https://www.facebook.com", Icon: Facebook },
                  {
                    label: "LinkedIn",
                    href: "https://www.linkedin.com/in/upmashrian",
                    Icon: Linkedin,
                  },
                  { label: "Instagram", href: "https://www.instagram.com", Icon: Instagram },
                  { label: "Twitter", href: "https://x.com/upmashrian?s=11", Icon: Twitter },
                  {
                    label: "YouTube",
                    href: "https://www.youtube.com/@upmashrianyourstylestateme8378",
                    Icon: Youtube,
                  },
                ].map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="transition-opacity duration-500 hover:opacity-50"
                  >
                    <Icon aria-hidden="true" size={23} strokeWidth={1.4} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-14 flex flex-wrap items-center gap-8 border-t border-ivory/15 pt-8">
            <span className="label-xs opacity-40">
              &copy; 2026 Balance Design. All Rights Reserved.
            </span>
            <span className="label-xs opacity-40">Privacy</span>
            <span className="label-xs opacity-40">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Module_components_ScrollStory
function Module_components_ScrollStory_clamp(value: number) {
  return Math.min(1, Math.max(0, value));
}
function Module_components_ScrollStory_ScrollStory({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const scenes = Array.from(root.querySelectorAll<HTMLElement>("[data-scroll-scene]"));
    let frame = 0;
    const update = () => {
      frame = 0;
      const viewportHeight = window.innerHeight;
      const mobile = window.innerWidth < 768;
      scenes.forEach((scene) => {
        const rect = scene.getBoundingClientRect();
        const enter = Module_components_ScrollStory_clamp(
          (viewportHeight - rect.top) / (viewportHeight * 0.78),
        );
        const exit = Module_components_ScrollStory_clamp(
          (viewportHeight * 0.34 - rect.bottom) / (viewportHeight * 0.66),
        );
        const travel = mobile ? 20 : 52;
        const exitTravel = mobile ? 12 : 32;
        const y = (1 - enter) * travel - exit * exitTravel;
        const scale = 0.985 + enter * 0.015 - exit * (mobile ? 0.006 : 0.014);
        const opacity = Math.min(1, enter * 1.7) * (1 - exit * (mobile ? 0.16 : 0.38));
        const clip = (1 - enter) * (mobile ? 2.5 : 7);
        const centerReveal = (1 - enter) * 50;
        scene.style.setProperty("--story-y", `${y.toFixed(2)}px`);
        scene.style.setProperty("--story-scale", scale.toFixed(4));
        scene.style.setProperty("--story-opacity", opacity.toFixed(3));
        scene.style.setProperty("--story-clip", `${clip.toFixed(2)}%`);
        scene.style.setProperty("--story-center-reveal", `${centerReveal.toFixed(2)}%`);
        scene.style.setProperty(
          "--story-depth",
          `${((1 - enter) * (mobile ? 8 : 22)).toFixed(2)}px`,
        );
      });
    };
    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <div ref={rootRef} className="scroll-story">
      {children}
    </div>
  );
}
function Module_components_ScrollStory_StoryScene({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div data-scroll-scene className={`story-scene ${className}`}>
      <div className="story-scene-content">{children}</div>
    </div>
  );
}

// Module_components_SlideStack
gsap.registerPlugin(ScrollTrigger);
/**
 * Full-screen editorial panels. Each panel sticks to the top of the viewport
 * while the following panel slides up over it, scrubbed directly by scroll.
 * The outgoing panel recedes slightly for depth — no fades to white, no bounce.
 */
function Module_components_SlideStack_SlideStack({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const panels = Array.from(root.querySelectorAll<HTMLElement>("[data-slide-panel]"));
    // Panels taller than the viewport must finish scrolling through fully
    // before pinning, otherwise their lower content (e.g. carousels) is
    // covered by the incoming panel. Stick them at a negative offset equal
    // to their overflow so the entire panel is visible before the next
    // one slides over.
    const setPanelOffsets = () => {
      const vh = window.innerHeight;
      panels.forEach((panel, i) => {
        // The last panel is position: relative (it never gets covered), so a
        // negative top would shift it up over the previous panel — skip it.
        if (i === panels.length - 1) return;
        const overflow = panel.offsetHeight - vh;
        panel.style.top = overflow > 0 ? `${-overflow}px` : "0px";
      });
      ScrollTrigger.refresh();
    };
    setPanelOffsets();
    const ro = new ResizeObserver(setPanelOffsets);
    panels.forEach((panel) => ro.observe(panel));
    window.addEventListener("resize", setPanelOffsets);
    const ctx = gsap.context(() => {
      panels.forEach((panel, i) => {
        const next = panels[i + 1];
        if (!next) return;
        const inner = panel.querySelector<HTMLElement>(".slide-panel-inner");
        if (!inner) return;
        // Panels taller than the viewport sit stuck with their bottom flush
        // to the viewport bottom — a vertical recede would push their lower
        // content (carousels) out of view, so only scale/fade those.
        const tallerThanViewport = panel.offsetHeight > window.innerHeight;
        gsap.to(inner, {
          yPercent: tallerThanViewport ? 0 : -10,
          scale: 0.98,
          opacity: 0.55,
          ease: "none",
          scrollTrigger: {
            trigger: next,
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        });
      });
    }, root);
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    return () => {
      window.removeEventListener("load", refresh);
      window.removeEventListener("resize", setPanelOffsets);
      ro.disconnect();
      ctx.revert();
    };
  }, []);
  return (
    <div ref={rootRef} className="slide-stack">
      {children}
    </div>
  );
}
function Module_components_SlideStack_SlidePanel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div data-slide-panel className={`slide-panel ${className}`}>
      <div className="slide-panel-inner">{children}</div>
    </div>
  );
}

// Module_components_CurvedSlider
type Module_components_CurvedSlider_CurvedImage = {
  src: string;
  alt: string;
  /** Words written on the slide itself: a line, then a line beneath it in capitals. */
  caption?: {
    title: string;
    sub: string;
  };
};
/** Convex, auto-advancing image row (one step every 2s). Hover gently enlarges an image. */
function Module_components_CurvedSlider_CurvedSlider({
  images,
  imageFit = "cover",
}: {
  images: Module_components_CurvedSlider_CurvedImage[];
  contain?: boolean;
  imageFit?: "cover" | "contain";
}) {
  const [offset, setOffset] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  // Cloned slides (3 copies) so the wrap-around happens far off-screen — seamless loop.
  const slides = [...images, ...images, ...images];
  const n = slides.length;
  const half = Math.floor(n / 2);
  const VISIBLE = 4;
  useEffect(() => {
    if (hovered !== null) return;
    const id = window.setInterval(() => setOffset((o) => o + 1), 2000);
    return () => window.clearInterval(id);
  }, [hovered]);
  return (
    <div
      className="relative mx-auto h-[340px] w-full gap-[var(--slide-gap)] overflow-hidden [--slide-gap:16px] sm:h-[430px] sm:[--slide-gap:24px] md:h-[520px] md:[--slide-gap:28px]"
      style={{ perspective: "1400px" }}
    >
      {slides.map((img, i) => {
        const pos = ((((i - offset) % n) + n) % n) - half;
        const abs = Math.abs(pos);
        const wrapping = abs >= half; // only at the far hidden edge
        const hidden = abs > VISIBLE;
        const z = Math.min(abs, VISIBLE + 1);
        return (
          <div
            key={`${img.src}-${i}`}
            className="absolute left-1/2 top-1/2 w-[73vw] sm:w-[50vw] md:w-[37vw] lg:w-[32vw]"
            style={{
              transform: `translate(-50%, -50%) translateX(calc(${pos * 100}% + ${pos} * var(--slide-gap))) translateZ(${z * z * 22}px) rotateY(${-Math.max(-VISIBLE - 1, Math.min(VISIBLE + 1, pos)) * 14}deg)`,
              opacity: hidden ? 0 : 1,
              visibility: hidden ? "hidden" : "visible",
              zIndex: hovered === i ? 50 : 10 - z,
              transition: wrapping
                ? "none"
                : "transform 1.2s cubic-bezier(0.65,0,0.35,1), opacity 1.2s ease",
            }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered((h) => (h === i ? null : h))}
          >
            <div
              className="aspect-[4/3] overflow-hidden transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ transform: `scale(${hovered === i ? 1.25 : 1})` }}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className={`block h-full w-full object-center ${imageFit === "contain" ? "object-contain" : "object-cover"}`}
              />
            </div>
            {img.caption && (
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-center gap-1.5 px-4 pb-5 pt-14 text-center">
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/35 to-transparent"
                />
                <p className="label-xs relative font-semibold text-ivory/85">{img.caption.title}</p>
                <p className="display relative text-[1.05rem] uppercase leading-none tracking-[0.18em] text-ivory sm:text-[1.3rem]">
                  {img.caption.sub}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// Module_components_BookWorkshopCta
const Module_components_BookWorkshopCta_inputClass =
  "w-full border border-foreground/20 bg-background px-5 py-3.5 text-base text-foreground placeholder:text-foreground/40 focus:border-red focus:outline-none";
/**
 * The shared enquiry popup (the same "Enquire about this workshop" form).
 * Controlled by the caller so any custom trigger can open it.
 */
function Module_components_BookWorkshopCta_BookingDialog({
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
      age_group: String(data.get("ageGroup") || "").trim() || null,
      profession: String(data.get("profession") || "").trim() || null,
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
    <Module_components_ui_dialog_Dialog
      open={open}
      onOpenChange={(next) => {
        onOpenChange(next);
        if (!next) {
          setSubmitted(false);
          setError(null);
        }
      }}
    >
      <Module_components_ui_dialog_DialogContent className="max-w-xl border-foreground/10 bg-background p-7 sm:p-9">
        {submitted ? (
          <div className="py-6 text-center">
            <Module_components_ui_dialog_DialogHeader>
              <Module_components_ui_dialog_DialogTitle className="font-display text-3xl tracking-wide text-red">
                Thank you for reaching out
              </Module_components_ui_dialog_DialogTitle>
              <Module_components_ui_dialog_DialogDescription className="pt-3 text-lg text-foreground/70">
                Our team will contact you soon.
              </Module_components_ui_dialog_DialogDescription>
            </Module_components_ui_dialog_DialogHeader>
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
            <Module_components_ui_dialog_DialogHeader>
              <Module_components_ui_dialog_DialogTitle className="font-display text-3xl tracking-wide text-red">
                Enquire about this workshop
              </Module_components_ui_dialog_DialogTitle>
              <Module_components_ui_dialog_DialogDescription className="text-base text-foreground/70">
                Tell us a little about yourself and the workshop you're interested in.
              </Module_components_ui_dialog_DialogDescription>
            </Module_components_ui_dialog_DialogHeader>
            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
              <input
                name="name"
                required
                placeholder="Your name"
                className={Module_components_BookWorkshopCta_inputClass}
              />
              <input
                name="email"
                type="email"
                required
                placeholder="Email address"
                className={Module_components_BookWorkshopCta_inputClass}
              />
              <input
                name="phone"
                type="tel"
                placeholder="Phone"
                className={Module_components_BookWorkshopCta_inputClass}
              />
              <input
                name="workshop"
                placeholder="Name of the workshop/seminar"
                className={Module_components_BookWorkshopCta_inputClass}
              />
              <select
                name="ageGroup"
                required
                defaultValue=""
                aria-label="Age group"
                className={`${Module_components_BookWorkshopCta_inputClass} appearance-none`}
              >
                <option value="" disabled>
                  Age group
                </option>
                <option value="18-25">18-25</option>
                <option value="25-35">25-35</option>
                <option value="35-45">35-45</option>
                <option value="Above 45">Above 45</option>
              </select>
              <input
                name="profession"
                placeholder="Profession / Industry"
                className={Module_components_BookWorkshopCta_inputClass}
              />
              <textarea
                name="message"
                rows={4}
                placeholder="Kindly share your requirement/queries (optional)"
                className={`${Module_components_BookWorkshopCta_inputClass} resize-none`}
              />
              {error && <p className="text-sm text-red">{error}</p>}
              <button
                type="submit"
                disabled={sending}
                className="btn-red label-xs mt-4 self-center"
              >
                {sending ? "Sending…" : "Send your enquiry"}
              </button>
            </form>
          </>
        )}
      </Module_components_ui_dialog_DialogContent>
    </Module_components_ui_dialog_Dialog>
  );
}
/** Shared red "Enquire about this workshop" call-to-action used at the end of every service section. Opens the enquiry popup. */
function Module_components_BookWorkshopCta_BookWorkshopCta({
  className = "mt-4 md:mt-6",
  label = "Enquire about this workshop",
}: {
  className?: string;
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`flex justify-center ${className}`}>
      <button type="button" onClick={() => setOpen(true)} className="btn-red label-xs">
        {label}
      </button>

      <Module_components_BookWorkshopCta_BookingDialog open={open} onOpenChange={setOpen} />
    </div>
  );
}

// Module_components_RotatingPoints
const Module_components_RotatingPoints_diamond = asset_assets_balance_diamond_png;
const Module_components_RotatingPoints_TERMS = [
  "Design Aesthetics",
  "Fashion Styling",
  "Trend Forecasting & VM",
];
const Module_components_RotatingPoints_POINT_MS = 3000;
const Module_components_RotatingPoints_TERM_MS = 3000;
const Module_components_RotatingPoints_FADE_MS = 700;
/** Step 0 = point 1; steps 1..3 = point 2 with each rotating term. */
function Module_components_RotatingPoints_RotatingPoints() {
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(true);
  const [termVisible, setTermVisible] = useState(true);
  useEffect(() => {
    let t: number;
    const isLastOfPoint = step === 0 || step === Module_components_RotatingPoints_TERMS.length;
    const hold =
      step === 0
        ? Module_components_RotatingPoints_POINT_MS
        : Module_components_RotatingPoints_TERM_MS;
    if (isLastOfPoint) {
      t = window.setTimeout(() => setVisible(false), hold);
      const t2 = window.setTimeout(() => {
        setStep((s) => (s === 0 ? 1 : 0));
        setVisible(true);
      }, hold + Module_components_RotatingPoints_FADE_MS);
      return () => {
        window.clearTimeout(t);
        window.clearTimeout(t2);
      };
    }
    t = window.setTimeout(() => setTermVisible(false), hold - 300);
    const t2 = window.setTimeout(() => {
      setStep((s) => s + 1);
      setTermVisible(true);
    }, hold);
    return () => {
      window.clearTimeout(t);
      window.clearTimeout(t2);
    };
  }, [step]);
  return (
    <div className="mt-8 min-h-[4.5rem] md:mt-10">
      <p
        className="flex items-start justify-center gap-3 text-center text-lg leading-snug text-foreground md:text-xl"
        style={{
          opacity: visible ? 1 : 0,
          transition: `opacity ${Module_components_RotatingPoints_FADE_MS}ms ease-in-out`,
        }}
        aria-live="polite"
      >
        <img
          src={Module_components_RotatingPoints_diamond}
          alt=""
          aria-hidden="true"
          className="mt-[0.3em] h-4 w-auto shrink-0 md:h-5"
        />
        {step === 0 ? (
          <span>Elevate their skill and knowledge</span>
        ) : (
          <span>
            Enhance productivity in areas of{" "}
            <span
              className="inline-block"
              style={{ opacity: termVisible ? 1 : 0, transition: "opacity 300ms ease-in-out" }}
            >
              {Module_components_RotatingPoints_TERMS[step - 1]}
            </span>
          </span>
        )}
      </p>
    </div>
  );
}

// Module_components_StylingWorkshops
const Module_components_StylingWorkshops_daw1 = asset_assets_daw_1_jpeg;
const Module_components_StylingWorkshops_daw2 = asset_assets_daw_2_jpeg;
const Module_components_StylingWorkshops_daw3 = asset_assets_daw_3_jpeg;
const Module_components_StylingWorkshops_daw4 = asset_assets_daw_4_jpeg;
const Module_components_StylingWorkshops_daw5 = asset_assets_daw_5_jpeg;
const Module_components_StylingWorkshops_dawNew1 = asset_assets_daw_new_1_jpg;
const Module_components_StylingWorkshops_dawNew2 = asset_assets_daw_new_2_jpg;
const Module_components_StylingWorkshops_dawNew3 = asset_assets_daw_new_3_jpg;
const Module_components_StylingWorkshops_dawNew4 = asset_assets_daw_new_4_jpg;
const Module_components_StylingWorkshops_FILM = [
  {
    src: Module_components_StylingWorkshops_daw1,
    alt: "Workshop audience learning about the complementary colour scheme",
  },
  {
    src: Module_components_StylingWorkshops_daw2,
    alt: "Participants seated along long tables watching a presentation",
  },
  {
    src: Module_components_StylingWorkshops_daw3,
    alt: "Facilitator addressing a styling workshop in a studio classroom",
  },
  {
    src: Module_components_StylingWorkshops_daw4,
    alt: "Workshop audience watching a video presentation",
  },
  {
    src: Module_components_StylingWorkshops_daw5,
    alt: "Facilitator speaking with engaged workshop participants",
  },
  {
    src: Module_components_StylingWorkshops_dawNew1,
    alt: "Retail team seated around long tables at a workshop",
  },
  {
    src: Module_components_StylingWorkshops_dawNew2,
    alt: "Team members attending a workshop session",
  },
  {
    src: Module_components_StylingWorkshops_dawNew3,
    alt: "Facilitator addressing a retail team workshop",
  },
  {
    src: Module_components_StylingWorkshops_dawNew4,
    alt: "Team watching a styling presentation on screen",
  },
];
function Module_components_StylingWorkshops_StylingWorkshops() {
  return (
    <section
      aria-label="Design Aesthetics and Styling Workshops"
      className="bg-background px-6 py-16 sm:py-20 md:px-12 md:py-24"
    >
      <div className="mx-auto max-w-[1500px]">
        <div className="flex flex-col items-center text-center">
          <Module_components_Reveal_Reveal>
            <p className="label-xs font-semibold text-muted-foreground">
              Design Workshops &amp; Seminars
            </p>
          </Module_components_Reveal_Reveal>
          <Module_components_Reveal_Reveal delay={80}>
            <h2 className="display mx-auto mt-6 max-w-5xl text-[2.4rem] leading-[1.02] uppercase sm:text-6xl md:text-[4.6rem]">
              <span className="text-primary">Design Aesthetics</span> &amp; Styling Workshops
            </h2>
          </Module_components_Reveal_Reveal>
          <Module_components_RotatingPoints_RotatingPoints />
          <Module_components_Reveal_Reveal delay={160}>
            <p className="mx-auto mt-8 max-w-5xl text-pretty text-center text-[calc(1.294rem+2px)] font-medium leading-relaxed text-red md:text-balance md:text-[calc(1.4375rem+2px)]">
              For <span className="font-medium">TEAMS</span> of fashion and retail brands.
              <br className="hidden md:inline" /> For{" "}
              <span className="font-medium">Visual Merchandising teams</span>, such that the retail
              space
              <br className="hidden md:inline" /> look more attractive to shop &amp; experience.
              <br className="hidden md:inline" /> For{" "}
              <span className="font-medium">Sales team</span> such that they become stylists
              <br className="hidden md:inline" /> <br className="sm:hidden" /> for the customers{" "}
              <span className="whitespace-nowrap">and guide them as they shop.</span>
            </p>
          </Module_components_Reveal_Reveal>
        </div>

        <Module_components_Reveal_Reveal delay={200}>
          <div className="relative left-1/2 mt-10 w-screen -translate-x-1/2 md:mt-14">
            <Module_components_CurvedSlider_CurvedSlider
              images={Module_components_StylingWorkshops_FILM}
            />
          </div>
        </Module_components_Reveal_Reveal>

        <Module_components_Reveal_Reveal delay={260}>
          <Module_components_BookWorkshopCta_BookWorkshopCta />
        </Module_components_Reveal_Reveal>
      </div>
    </section>
  );
}

// Module_components_CorporateImageConsulting
const Module_components_CorporateImageConsulting_diamond = asset_assets_balance_diamond_png;
const Module_components_CorporateImageConsulting_c1 = asset_assets_corp_new_1_jpg;
const Module_components_CorporateImageConsulting_v1 = asset_assets_corp_vh_1_jpg;
const Module_components_CorporateImageConsulting_v2 = asset_assets_corp_vh_2_jpg;
const Module_components_CorporateImageConsulting_v3 = asset_assets_corp_vh_3_jpg;
const Module_components_CorporateImageConsulting_v4 = asset_assets_corp_vh_4_jpg;
const Module_components_CorporateImageConsulting_c6 = asset_assets_corp_new_6_jpg;
const Module_components_CorporateImageConsulting_c7 = asset_assets_corp_new_7_jpg;
// Written on the slides themselves: the service, then the client beneath it.
const Module_components_CorporateImageConsulting_VH = {
  title: "Corporate Image Consulting",
  sub: "VAN HEUSEN",
};
const Module_components_CorporateImageConsulting_RAYMOND = {
  title: "Corporate Image Consulting",
  sub: "The Raymond Shop",
};
const Module_components_CorporateImageConsulting_IMAGES = [
  {
    src: Module_components_CorporateImageConsulting_c1,
    alt: "Van Heusen Master the Right Dress Code seminar audience",
    caption: Module_components_CorporateImageConsulting_VH,
  },
  {
    src: Module_components_CorporateImageConsulting_v1,
    alt: "Presenter addressing participants seated at round tables at a Van Heusen corporate seminar",
    caption: Module_components_CorporateImageConsulting_VH,
  },
  {
    src: Module_components_CorporateImageConsulting_v2,
    alt: "Participants completing seminar exercises at round tables beside a Van Heusen standee",
    caption: Module_components_CorporateImageConsulting_VH,
  },
  {
    src: Module_components_CorporateImageConsulting_v3,
    alt: "Presenter beside a projection screen at a Van Heusen corporate image consulting seminar",
    caption: Module_components_CorporateImageConsulting_VH,
  },
  {
    src: Module_components_CorporateImageConsulting_v4,
    alt: "Presenter guiding four participants demonstrating dress styles at a Van Heusen seminar",
    caption: Module_components_CorporateImageConsulting_VH,
  },
  {
    src: Module_components_CorporateImageConsulting_c6,
    alt: "Colour wheel presentation at a corporate seminar",
    caption: Module_components_CorporateImageConsulting_RAYMOND,
  },
  {
    src: Module_components_CorporateImageConsulting_c7,
    alt: "Upma Shrian engaging participants at a corporate seminar",
    caption: Module_components_CorporateImageConsulting_RAYMOND,
  },
];
// The five questions the seminar puts to a working professional.
const Module_components_CorporateImageConsulting_ribbonStatements = [
  "Do you represent yourself or your brand and come out as a confident personality by way of your dressing up?",
  "Are you comfortable in being yourself, as you represent your company?",
  "Do you feel powerful in your attire, as you rub shoulders with the top brass of various segments of your industry?",
  "Are you aware of Fashion's do's and don'ts as you meet your clients and alliances worldwide?",
  "Do you feel your wardrobe represents your professional success and stature?",
];
function Module_components_CorporateImageConsulting_CorporateImageConsulting() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);
  const reveal = visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4";
  return (
    <section
      ref={sectionRef}
      aria-labelledby="corporate-image-consulting-title"
      className="bg-background px-6 py-16 sm:py-20 md:px-12 md:py-24"
    >
      <div className="mx-auto max-w-[1500px]">
        <div className="flex flex-col items-center gap-8 text-center">
          <div>
            <p
              className={`label-xs mb-6 font-semibold text-muted-foreground transition-[opacity,transform] duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${reveal}`}
            >
              Design Workshops &amp; Seminars
            </p>
            <h2
              id="corporate-image-consulting-title"
              className={`display text-[2rem] leading-[0.98] uppercase transition-[opacity,transform] delay-100 duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] sm:text-5xl md:text-[3.4rem] lg:text-[4.2rem] ${reveal}`}
            >
              <span className="block text-red">Corporate</span>
              <span className="block whitespace-nowrap text-foreground">Image Consulting</span>
            </h2>
          </div>

          <p
            className={`mx-auto max-w-4xl text-center text-[calc(1.294rem+2px)] font-medium leading-relaxed text-red transition-[opacity,transform] delay-200 duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]  md:text-[calc(1.4375rem+2px)] ${reveal}`}
          >
            We coach professionals to look sharp and stylish, build self confidence and have a
            personality that is magnetic. Through a combination of styling sessions and mindset
            coaching, professionals learn to command respect, and own their presence in meetings,
            presentations and high stake conversations.
          </p>

          {/* The shared red enquiry button, the same one that closes every other service section. */}
          <div
            className={`transition-[opacity,transform] delay-300 duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${reveal}`}
          >
            <Module_components_BookWorkshopCta_BookWorkshopCta className="" />
          </div>
        </div>

        <div
          className={`relative left-1/2 mt-10 w-screen -translate-x-1/2 transition-opacity delay-300 duration-[1400ms] md:mt-14 ${visible ? "opacity-100" : "opacity-0"}`}
        >
          <Module_components_CurvedSlider_CurvedSlider
            images={Module_components_CorporateImageConsulting_IMAGES}
            contain
          />
        </div>
      </div>

      {/* Full-bleed editorial question ribbon, directly connected to the slider above. */}
      <div
        className="-mx-6 mt-7 overflow-hidden border-y border-border/70 bg-charcoal py-5 md:-mx-12 md:py-6"
        role="marquee"
      >
        <div className="ribbon-track flex w-max items-center">
          {[0, 1].map((copy) => (
            <div key={copy} aria-hidden={copy === 1} className="flex items-center">
              {Module_components_CorporateImageConsulting_ribbonStatements.map((statement) => (
                <span key={statement} className="flex items-center">
                  <span className="whitespace-nowrap px-8 text-[calc(0.95rem+2px)] leading-relaxed text-background md:px-10 md:text-[calc(1.125rem+2px)]">
                    {statement}
                  </span>
                  <img
                    src={Module_components_CorporateImageConsulting_diamond}
                    alt=""
                    aria-hidden="true"
                    className="h-3 w-auto shrink-0 md:h-4"
                    loading="lazy"
                  />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Module_components_PersonalImageConsulting
const Module_components_PersonalImageConsulting_s1 = asset_assets_pers_sq_1_jpg;
const Module_components_PersonalImageConsulting_s2 = asset_assets_pers_sq_2_jpg;
const Module_components_PersonalImageConsulting_s3 = asset_assets_pers_sq_3_jpg;
const Module_components_PersonalImageConsulting_s4 = asset_assets_pers_sq_4_jpg;
const Module_components_PersonalImageConsulting_s5 = asset_assets_pers_sq_5_jpg;
const Module_components_PersonalImageConsulting_slide2 = asset_assets_pers_slide_2_jpg;
const Module_components_PersonalImageConsulting_slide3 = asset_assets_pers_slide_3_jpg;
const Module_components_PersonalImageConsulting_slide4 = asset_assets_pers_slide_4_jpg;
const Module_components_PersonalImageConsulting_slide4_1 = asset_assets_pers_slide_4_1_jpg;
const Module_components_PersonalImageConsulting_slide5 = asset_assets_pers_slide_5_jpg;
const Module_components_PersonalImageConsulting_diamond = asset_assets_balance_diamond_png;
const Module_components_PersonalImageConsulting_squareImages: {
  src: string;
  alt: string;
  fit: "cover" | "contain";
}[] = [
  {
    src: Module_components_PersonalImageConsulting_s1,
    alt: "Colour combinations with outfit examples - contrast of dark with light, light with light, and dark with dark",
    fit: "contain",
  },
  {
    src: Module_components_PersonalImageConsulting_s2,
    alt: "Five styled looks under the heading Dressing in Colour, showing colour combinations with outfits",
    fit: "contain",
  },
  {
    src: Module_components_PersonalImageConsulting_s3,
    alt: "Three outfit examples under the heading Dressing in Colour, combining blue, yellow, red, green and pink",
    fit: "contain",
  },
  {
    src: Module_components_PersonalImageConsulting_s4,
    alt: "Three outfit examples under the heading Dressing in Colour, with striped, white, mustard and floral styling",
    fit: "contain",
  },
  {
    src: Module_components_PersonalImageConsulting_s5,
    alt: "Colour wheel with outfit examples showing colour combinations used in dressing",
    fit: "contain",
  },
];
const Module_components_PersonalImageConsulting_landscapeImages: {
  src: string;
  alt: string;
  fit: "cover" | "contain";
}[] = [
  {
    src: Module_components_PersonalImageConsulting_slide2,
    alt: "Five styled day-to-evening outfits in contrasting colour combinations",
    fit: "contain",
  },
  {
    src: Module_components_PersonalImageConsulting_slide3,
    alt: "Four colour-blocking outfits in red, royal blue and bright yellow",
    fit: "contain",
  },
  {
    src: Module_components_PersonalImageConsulting_slide4,
    alt: "Analogous colour outfits in purple, berry, deep red and coral with a colour palette",
    fit: "contain",
  },
  {
    src: Module_components_PersonalImageConsulting_slide4_1,
    alt: "Contrast of plain with pattern and print outfits in black and white",
    fit: "contain",
  },
  {
    src: Module_components_PersonalImageConsulting_slide5,
    alt: "Three monochromatic outfits in yellow, green and blush pink",
    fit: "contain",
  },
];
const Module_components_PersonalImageConsulting_ribbonStatements = [
  "Clarity for a lifetime: on what to pick up for one’s body type and skin tone. One picks up a wider range of products which one was reluctant to try earlier.",
  "Get the exposure to new fits, colours, styles, patterns and silhouettes that most importantly work for you.",
  "Get aware of which trends to pick up and which ones to drop.",
  "Creating wardrobes that enhance our strength areas and diminish our problem areas.",
];
function Module_components_PersonalImageConsulting_PersonalImageConsulting() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return;
    const interval = window.setInterval(() => {
      setActiveImage(
        (current) =>
          (current + 1) % Module_components_PersonalImageConsulting_landscapeImages.length,
      );
    }, 5200);
    return () => window.clearInterval(interval);
  }, []);
  const reveal = visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4";
  const imageReveal = visible
    ? "opacity-100 translate-y-0 [clip-path:inset(0_0_0_0)]"
    : "opacity-0 translate-y-5 [clip-path:inset(10%_0_18%_0)]";
  return (
    <section
      ref={sectionRef}
      aria-labelledby="personal-image-consulting-title"
      className="bg-background px-6 py-16 sm:py-20 md:px-12 md:py-24"
    >
      <div className="mx-auto max-w-[1500px]">
        <div className="flex flex-col items-center gap-8 text-center">
          <div>
            <p
              className={`label-xs mb-6 font-semibold text-muted-foreground transition-[opacity,transform] duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${reveal}`}
            >
              Design Workshops &amp; Seminars
            </p>
            <h2
              id="personal-image-consulting-title"
              className={`display text-[clamp(1.2rem,5vw,4.2rem)] leading-[0.98] uppercase transition-[opacity,transform] delay-100 duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${reveal}`}
            >
              <span className="mb-[0.35em] block whitespace-nowrap text-red sm:mb-[0.12em]">
                Personal Image Consulting
              </span>
              <span className="block text-foreground">Master the Right Dress Code</span>
            </h2>
          </div>

          <p
            className={`mx-auto max-w-4xl text-center text-[calc(1.294rem+2px)] font-medium leading-relaxed text-red transition-[opacity,transform] delay-200 duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]  md:text-[calc(1.4375rem+2px)] ${reveal}`}
          >
            "Master the Right Dress Code" is a highly visual and interactive seminar, sharing the
            design tools, such that the individual can make decisions for themselves, about which
            colour, fit and style shall suit their skin tone, height and body type.
            <span className="mt-5 block">
              Our styling seminars transform the way YOU dress up, such that your visual impact is
              more powerful and confident for your lifetime.
            </span>
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 md:mt-14 md:grid-cols-12 md:items-stretch md:gap-x-8 lg:gap-x-12">
          <div
            className={`relative aspect-[16/10] overflow-hidden bg-white transition-[clip-path,opacity,transform] delay-300 duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] md:col-span-7 ${imageReveal}`}
          >
            {Module_components_PersonalImageConsulting_landscapeImages.map((image, index) => (
              <img
                key={image.src}
                src={image.src}
                alt={image.alt}
                loading="lazy"
                decoding="async"
                style={{ objectFit: image.fit, objectPosition: "center" }}
                className={`absolute inset-0 h-full w-full transition-[opacity,transform] duration-[1800ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${activeImage === index ? "scale-100 opacity-100" : "scale-[1.025] opacity-0"}`}
              />
            ))}
          </div>

          <div
            className={`relative aspect-[7/5] overflow-hidden bg-white transition-[clip-path,opacity,transform] delay-500 duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] md:col-span-5 md:aspect-auto ${imageReveal}`}
          >
            {Module_components_PersonalImageConsulting_squareImages.map((image, index) => (
              <img
                key={image.src}
                src={image.src}
                alt={image.alt}
                loading="lazy"
                decoding="async"
                style={{ objectFit: image.fit, objectPosition: "center" }}
                className={`absolute inset-0 h-full w-full transition-[opacity,transform] duration-[1800ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                  activeImage % Module_components_PersonalImageConsulting_squareImages.length ===
                  index
                    ? "scale-100 opacity-100"
                    : "scale-[1.025] opacity-0"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Full-bleed editorial statement ribbon, directly connected to the slider above. */}
      <div
        className="-mx-6 mt-7 overflow-hidden border-y border-border/70 bg-charcoal py-5 md:-mx-12 md:py-6"
        role="marquee"
      >
        <div className="ribbon-track flex w-max items-center">
          {[0, 1].map((copy) => (
            <div key={copy} aria-hidden={copy === 1} className="flex items-center">
              {Module_components_PersonalImageConsulting_ribbonStatements.map((statement) => (
                <span key={statement} className="flex items-center">
                  <span className="whitespace-nowrap px-8 text-[calc(0.95rem+2px)] leading-relaxed text-background md:px-10 md:text-[calc(1.125rem+2px)]">
                    {statement}
                  </span>
                  <img
                    src={Module_components_PersonalImageConsulting_diamond}
                    alt=""
                    aria-hidden="true"
                    className="h-3 w-auto shrink-0 md:h-4"
                    loading="lazy"
                  />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <Module_components_BookWorkshopCta_BookWorkshopCta />
    </section>
  );
}

// Module_components_OwnYourSpotlight
const Module_components_OwnYourSpotlight_s1 = asset_assets_oys_1_png;
const Module_components_OwnYourSpotlight_s2 = asset_assets_oys_2_png;
const Module_components_OwnYourSpotlight_s3 = asset_assets_oys_3_png;
const Module_components_OwnYourSpotlight_s4 = asset_assets_oys_4_png;
const Module_components_OwnYourSpotlight_s5 = asset_assets_oys_5_png;
const Module_components_OwnYourSpotlight_SLIDES = [
  Module_components_OwnYourSpotlight_s1,
  Module_components_OwnYourSpotlight_s2,
  Module_components_OwnYourSpotlight_s3,
  Module_components_OwnYourSpotlight_s4,
  Module_components_OwnYourSpotlight_s5,
];
function Module_components_OwnYourSpotlight_OwnYourSpotlight() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(
      () => setIdx((i) => (i + 1) % Module_components_OwnYourSpotlight_SLIDES.length),
      2000,
    );
    return () => clearInterval(t);
  }, []);
  return (
    <section
      aria-labelledby="own-your-spotlight-title"
      className="bg-background px-6 py-16 sm:py-20 md:px-12 md:py-24"
    >
      <div className="mx-auto max-w-[1500px]">
        <div className="flex flex-col items-center gap-10 text-center">
          <div>
            <Module_components_Reveal_Reveal>
              <p className="label-xs font-semibold text-muted-foreground">
                Design Workshops &amp; Seminars
              </p>
            </Module_components_Reveal_Reveal>
            <Module_components_Reveal_Reveal delay={80}>
              <h2
                id="own-your-spotlight-title"
                className="display mt-6 text-[2.4rem] leading-[1.02] uppercase text-balance sm:text-6xl md:text-[4.6rem]"
              >
                <span className="text-primary">Own</span> Your Spotlight Webinar
              </h2>
            </Module_components_Reveal_Reveal>
          </div>
          <div>
            <Module_components_Reveal_Reveal delay={160}>
              <p className="mx-auto max-w-2xl text-[calc(1.294rem+2px)] leading-relaxed md:text-[calc(1.4375rem+2px)] font-medium text-red">
                We coach professionals to look sharp and stylish, build self confidence and have a
                personality that is magnetic, as they meet and interact with world.
              </p>
            </Module_components_Reveal_Reveal>
          </div>
        </div>

        <Module_components_Reveal_Reveal delay={200}>
          <div className="relative mt-10 aspect-[16/10] overflow-hidden bg-foreground sm:aspect-[3/2] md:mt-14 md:aspect-[16/9]">
            {Module_components_OwnYourSpotlight_SLIDES.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={i === idx ? "Own Your Spotlight online coaching session" : ""}
                aria-hidden={i !== idx}
                className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-1000 ease-in-out md:object-cover ${i === idx ? "opacity-100" : "opacity-0"}`}
              />
            ))}
          </div>
        </Module_components_Reveal_Reveal>
        <Module_components_BookWorkshopCta_BookWorkshopCta />
      </div>
    </section>
  );
}

// Module_components_RedEditorialService
const Module_components_RedEditorialService_logoMark = asset_assets_balance_logo_mark_png;
/** Repeat short image lists so the curved slider always looks full. */
function Module_components_RedEditorialService_padImages<T>(list: T[]): T[] {
  if (list.length === 0) return list;
  const out = [...list];
  while (out.length < 8) out.push(...list);
  return out;
}
type Module_components_RedEditorialService_ServiceImage = {
  src: string;
  alt: string;
};
type Module_components_RedEditorialService_RedEditorialServiceProps = {
  eyebrow?: string;
  sectionLabel?: string;
  headline: React.ReactNode;
  description?: string;
  images: Module_components_RedEditorialService_ServiceImage[];
  single?: boolean;
  imageFit?: "cover" | "contain";
  wideDescription?: boolean;
  ctaLabel?: string;
};
function Module_components_RedEditorialService_SingleImageSlideshow({
  images,
  label,
}: {
  images: Module_components_RedEditorialService_ServiceImage[];
  label: string;
}) {
  const oddLast = images.length % 2 === 1 && images.length > 1;
  return (
    <div
      className="mx-auto grid w-full max-w-6xl grid-cols-1 items-start gap-6 px-6 sm:grid-cols-2 md:gap-8 md:px-12"
      aria-label={`${label} image gallery`}
    >
      {images.map((image, i) => {
        const wide = oddLast && i === images.length - 1;
        return (
          <figure
            key={image.src}
            className={`overflow-hidden bg-background/95 p-3 md:p-4 ${wide ? "sm:col-span-2" : ""} ${i % 2 === 1 && !wide ? "sm:mt-16" : ""}`}
          >
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              decoding="async"
              className="block h-auto w-full object-contain transition-transform duration-700 ease-out hover:scale-[1.02]"
            />
          </figure>
        );
      })}
    </div>
  );
}
const Module_components_RedEditorialService_AUTOPLAY_DELAY = 2000;
function Module_components_RedEditorialService_EditorialCarousel({
  images,
  label,
}: {
  images: Module_components_RedEditorialService_ServiceImage[];
  label: string;
}) {
  const [position, setPosition] = useState(1);
  const [animated, setAnimated] = useState(true);
  const [paused, setPaused] = useState(false);
  const [timerKey, setTimerKey] = useState(0);
  const track = [images[images.length - 1], ...images, images[0]].filter(
    (image): image is Module_components_RedEditorialService_ServiceImage => Boolean(image),
  );
  const move = useCallback((direction: number, manual = false) => {
    setAnimated(true);
    setPosition((current) => current + direction);
    if (manual) setTimerKey((current) => current + 1);
  }, []);
  useEffect(() => {
    if (paused || images.length < 2) return;
    const timer = window.setInterval(
      () => move(1),
      Module_components_RedEditorialService_AUTOPLAY_DELAY,
    );
    return () => window.clearInterval(timer);
  }, [images.length, move, paused, timerKey]);
  const settleLoop = () => {
    if (position === 0) {
      setAnimated(false);
      setPosition(images.length);
    } else if (position === images.length + 1) {
      setAnimated(false);
      setPosition(1);
    }
  };
  const activeIndex = (position - 1 + images.length) % images.length;
  const carouselStyle = { "--gallery-index": position } as CSSProperties;
  return (
    <div
      className="red-service-carousel relative overflow-hidden"
      aria-label={`${label} image gallery`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className={`red-service-carousel-track ${animated ? "red-service-carousel-track-animated" : ""}`}
        style={carouselStyle}
        onTransitionEnd={settleLoop}
      >
        {track.map((image, index) => {
          const logicalIndex = (index - 1 + images.length) % images.length;
          const isActive = logicalIndex === activeIndex && index === position;
          return (
            <figure
              key={`${image.src}-${index}`}
              className={`red-service-carousel-slide ${isActive ? "red-service-carousel-slide-active" : ""}`}
              aria-hidden={!isActive}
            >
              <img
                src={image.src}
                alt={isActive ? image.alt : ""}
                className="h-full w-full object-cover"
                loading={index < 3 ? "eager" : "lazy"}
                decoding="async"
              />
            </figure>
          );
        })}
      </div>

      {images.length > 1 && (
        <>
          <Module_components_ui_button_Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={`Previous ${label} image`}
            onClick={() => move(-1, true)}
            className="absolute left-4 top-1/2 z-10 size-11 -translate-y-1/2 rounded-none border border-primary-foreground/55 bg-foreground/55 text-primary-foreground hover:bg-foreground hover:text-primary-foreground md:left-8 md:size-12"
          >
            <ArrowLeft aria-hidden="true" />
          </Module_components_ui_button_Button>
          <Module_components_ui_button_Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={`Next ${label} image`}
            onClick={() => move(1, true)}
            className="absolute right-4 top-1/2 z-10 size-11 -translate-y-1/2 rounded-none border border-primary-foreground/55 bg-foreground/55 text-primary-foreground hover:bg-foreground hover:text-primary-foreground md:right-8 md:size-12"
          >
            <ArrowRight aria-hidden="true" />
          </Module_components_ui_button_Button>
        </>
      )}
    </div>
  );
}
function Module_components_RedEditorialService_RedEditorialService({
  eyebrow,
  sectionLabel,
  headline,
  description,
  images,
  single = false,
  imageFit = "cover",
  wideDescription = false,
  ctaLabel = "Enquire about this workshop",
}: Module_components_RedEditorialService_RedEditorialServiceProps) {
  return (
    <section
      className="overflow-hidden bg-background py-16 text-foreground sm:py-20 md:py-24"
      aria-label={sectionLabel ?? (typeof eyebrow === "string" && eyebrow ? eyebrow : "Service")}
    >
      <div className="mx-auto px-6 text-center md:px-12">
        <Module_components_Reveal_Reveal>
          <img
            src={Module_components_RedEditorialService_logoMark}
            alt="Balance Design"
            data-bg-logo
            className="mx-auto h-14 w-auto object-contain md:h-20"
            width={120}
            height={80}
          />
        </Module_components_Reveal_Reveal>
        {eyebrow && (
          <Module_components_Reveal_Reveal delay={80}>
            <p className="label-xs mt-8 font-semibold text-muted-foreground">{eyebrow}</p>
          </Module_components_Reveal_Reveal>
        )}
        <Module_components_Reveal_Reveal delay={150}>
          <h2 className="display mx-auto mt-7 max-w-5xl text-[2.65rem] leading-[1.02] sm:text-6xl md:text-[5.25rem]">
            {headline}
          </h2>
        </Module_components_Reveal_Reveal>
        <div
          className={`mx-auto mt-9 min-h-20 md:min-h-24 ${wideDescription ? "max-w-[900px] xl:max-w-[1100px]" : "max-w-2xl"}`}
        >
          {description && (
            <Module_components_Reveal_Reveal delay={230}>
              <p className="text-[calc(1.294rem+2px)] leading-relaxed md:text-[calc(1.4375rem+2px)] font-medium text-red">
                {description}
              </p>
            </Module_components_Reveal_Reveal>
          )}
        </div>
      </div>

      <Module_components_Reveal_Reveal delay={390} className="mt-10 md:mt-14">
        <Module_components_CurvedSlider_CurvedSlider
          images={Module_components_RedEditorialService_padImages(images)}
          imageFit={imageFit}
        />
      </Module_components_Reveal_Reveal>
      <Module_components_BookWorkshopCta_BookWorkshopCta
        className="mt-4 md:mt-6"
        label={ctaLabel}
      />
    </section>
  );
}

// Module_components_AboutMe
const Module_components_AboutMe_aboutMe1 = asset_assets_about_me_1_jpg;
const Module_components_AboutMe_aboutMe2 = asset_assets_about_me_2_jpg;
const Module_components_AboutMe_PORTRAITS = [
  {
    src: Module_components_AboutMe_aboutMe1,
    alt: "Upma Shrian seated on a red sofa in a polka-dot top",
    position: "object-[center_30%]",
  },
  {
    src: Module_components_AboutMe_aboutMe2,
    alt: "Upma Shrian in a burgundy top with a silver necklace",
    position: "object-[center_30%]",
  },
];
const Module_components_AboutMe_AUTOPLAY_MS = 2000;
function Module_components_AboutMe_AboutMe() {
  const [active, setActive] = useState(0);
  const [timerKey, setTimerKey] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    if (reducedMotion) return;
    const interval = window.setInterval(
      () => setActive((current) => (current + 1) % Module_components_AboutMe_PORTRAITS.length),
      Module_components_AboutMe_AUTOPLAY_MS,
    );
    return () => window.clearInterval(interval);
  }, [reducedMotion, timerKey]);
  const selectPortrait = (index: number) => {
    setActive(index);
    setTimerKey((key) => key + 1);
  };
  return (
    <section
      aria-labelledby="about-me-title"
      className="bg-background px-6 py-24 md:px-10 md:py-32 lg:px-12 lg:py-40"
    >
      <div className="mx-auto grid max-w-[1500px] grid-cols-1 items-center gap-14 md:grid-cols-[minmax(0,28fr)_minmax(19rem,35fr)_minmax(0,28fr)] md:gap-8 lg:gap-14 xl:gap-20">
        <Module_components_Reveal_Reveal className="md:pr-2">
          <div className="mx-auto max-w-sm md:mx-0">
            <h2
              id="about-me-title"
              className="display text-[2.5rem] leading-[1.03] uppercase sm:text-5xl md:text-[2.25rem] lg:text-[2.8rem]"
            >
              About the Founder:
            </h2>
            <p className="mt-8 font-normal text-[calc(1rem+2px)] leading-[1.75] text-muted-foreground lg:text-[calc(1.125rem+2px)]">
              With close to three decades of experience in the fashion and apparel industry, Upma
              Shrian has specialized in defining design direction that aligns with business strategy
              and evolving consumer trends. She also imparts training to enhance team performance in
              the Apparel and Fashion Industry.
            </p>
          </div>
        </Module_components_Reveal_Reveal>

        <Module_components_Reveal_Reveal delay={120} className="mx-auto w-full max-w-[31rem]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-muted">
            {Module_components_AboutMe_PORTRAITS.map((portrait, index) => (
              <img
                key={portrait.src}
                src={portrait.src}
                alt={portrait.alt}
                width={1200}
                height={1500}
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
                className={`absolute inset-0 h-full w-full object-cover ${portrait.position}`}
                style={{
                  opacity: active === index ? 1 : 0,
                  transform: reducedMotion ? undefined : `scale(${active === index ? 1 : 1.015})`,
                  transition: reducedMotion
                    ? "opacity 300ms ease"
                    : "opacity 1100ms cubic-bezier(0.16, 1, 0.3, 1), transform 1600ms cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              />
            ))}

            <div
              className="absolute inset-x-0 bottom-5 z-10 flex justify-center gap-3"
              aria-label="Choose portrait"
            >
              {Module_components_AboutMe_PORTRAITS.map((portrait, index) => (
                <Module_components_ui_button_Button
                  key={portrait.src}
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => selectPortrait(index)}
                  aria-label={`Show portrait ${index + 1}`}
                  aria-current={active === index ? "true" : undefined}
                  className="h-5 w-5 rounded-full p-0 hover:bg-primary-foreground/15"
                >
                  <span
                    className={`block h-2.5 w-2.5 rounded-full border border-primary-foreground transition-colors duration-500 ${active === index ? "bg-primary-foreground" : "bg-foreground/20"}`}
                  />
                </Module_components_ui_button_Button>
              ))}
            </div>
          </div>
        </Module_components_Reveal_Reveal>

        <Module_components_Reveal_Reveal delay={240}>
          <div className="mx-auto max-w-sm text-left md:mx-0 md:text-center">
            <div
              aria-hidden="true"
              className="mx-auto mb-9 hidden w-16 flex-col items-center gap-2 text-border md:flex"
            >
              <span className="h-12 w-px rotate-12 bg-border" />
              <span className="h-px w-10 -rotate-6 bg-border" />
              <span className="h-8 w-px -rotate-12 bg-border" />
            </div>
            <p className="font-normal text-[calc(1rem+2px)] leading-[1.75] text-muted-foreground lg:text-[calc(1.125rem+2px)]">
              Her mission is to transform creativity into measurable business impact. Whether it’s
              launching a new label, crafting consumer-centric brand stories, scaling design
              processes for growth, directing design teams, or mentoring the next generation of
              fashion leaders.
            </p>
            <p
              aria-hidden="true"
              className="mt-10 text-right text-[2.75rem] leading-none text-foreground md:text-[3.25rem]"
              style={{ fontFamily: "'Mr Dafoe', cursive" }}
            >
              Upma Shrian
            </p>
          </div>
        </Module_components_Reveal_Reveal>
      </div>
    </section>
  );
}
const trend1 = asset_assets_Picture8_jpg;
const trend2 = asset_assets_Picture9_jpg;
const trend3 = asset_assets_Picture10_jpg;
const trend4 = asset_assets_Picture11_gif;
const trendScrapbook = asset_assets_trend_scrapbook_jpeg;
const trendReworked = asset_assets_trend_reworked_jpeg;
const trendAbstract = asset_assets_trend_abstract_prints_jpeg;
const trendFolksy = asset_assets_trend_folksy_jpeg;
const trend1606 = asset_assets_trend_1606_jpg;
const trend1607 = asset_assets_trend_1607_jpg;
const trend1612 = asset_assets_trend_1612_jpg;
const trend1613 = asset_assets_trend_1613_jpg;
const trend1614 = asset_assets_trend_1614_jpg;
const trend1615 = asset_assets_trend_1615_jpg;
const trend1616 = asset_assets_trend_1616_jpg;
const trend1629 = asset_assets_hero_1629_jpg;
const trend1630 = asset_assets_hero_1630_jpg;
const trend1631 = asset_assets_hero_1631_jpg;
const graphic1Asset = asset_assets_graphic_1_jpg;
const graphic2Asset = asset_assets_graphic_2_jpg;
const graphic3Asset = asset_assets_graphic_3_jpg;
const graphic4Asset = asset_assets_graphic_4_jpg;
const graphic6Asset = asset_assets_graphic_6_jpg;
const graphic7Asset = asset_assets_graphic_7_jpg;
const graphic10Asset = asset_assets_graphic_10_jpg;
const dws1 = asset_assets_dws_1_jpg;
const dws2 = asset_assets_dws_2_jpg;
const dws3 = asset_assets_dws_3_jpg;
const dws4 = asset_assets_dws_4_jpg;
const dws5 = asset_assets_dws_5_jpg;
const dws6 = asset_assets_dws_6_jpg;
const dws7 = asset_assets_dws_7_jpg;
const dws8 = asset_assets_dws_8_jpg;
const dws9 = asset_assets_dws_9_jpg;
const WORKSHOP_IMAGES = [
  { src: dws1, alt: "Workshop in a warm conference room" },
  { src: dws2, alt: "Style workshop body shapes demonstration" },
  { src: dws3, alt: "Audience watching a colour theory presentation" },
  { src: dws4, alt: "Facilitator speaking in front of the stage" },
  { src: dws5, alt: "Participants exploring colour material at Max" },
  { src: dws6, alt: "Session at ORRA Fine Jewellery" },
  { src: dws7, alt: "Audience at ORRA Fine Jewellery session" },
  { src: dws8, alt: "Participants applauding at Max workshop" },
  { src: dws9, alt: "Master the Right Dress Code seminar" },
];
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Balance Design & Fashion Consultancy | Image, Identity, Impact" },
      {
        name: "description",
        content:
          "Balance Design brings fashion, image and design together — corporate and personal image consulting, trend forecasting, graphic, uniform design.",
      },
      { property: "og:title", content: "Balance Design & Fashion Consultancy" },
      {
        property: "og:description",
        content:
          "Fashion, image and design brought together to create powerful expressions for individuals, brands and organisations.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});
const TREND_IMAGES = [
  {
    src: trend1606,
    alt: "Night Sparkles Girls 9-14 yrs trend board with kaleidoscopic mosaic prints",
  },
  { src: trend1607, alt: "Multi-colour stripes trend board with knitwear and digital prints" },
  { src: trend1612, alt: "Assembling Girls 2-8 yrs folk theme trend board with Pantone palette" },
  { src: trend1613, alt: "Fusion of art and craft trend board with crochet bags and folk motifs" },
  {
    src: trend1614,
    alt: "Scrapbook Boys 2-8 yrs trend board with illustration and Pantone palette",
  },
  {
    src: trend1615,
    alt: "Fabrics and Prints board with graphic tees, stripes and overlapped prints",
  },
  { src: trend1616, alt: "Boys outerwear and shirt CAD flats board with Pantone palette" },
  {
    src: trend1629,
    alt: "Illusive — Tweens Girls board, model in black lace body paint with 'Which is the real skin'",
  },
  { src: trend1630, alt: "Black and white ornamental geometric print board" },
  { src: trend1631, alt: "Prints board with four illustrated figures in swirling retro prints" },
];
const GRAPHIC_IMAGES = [
  {
    src: graphic1Asset,
    alt: "Infants/Toddlers A/W 09-10 theme board with cow illustration on red",
  },
  {
    src: graphic2Asset,
    alt: "Infants/Toddlers boys mood board with giraffe, cow and dragonfly illustrations and Pantone colour chips",
  },
  {
    src: graphic3Asset,
    alt: "Infants/Toddlers girls mood board with bunny, birds, trees and fabric print tiles",
  },
  {
    src: graphic4Asset,
    alt: "Fabrics and Prints board with kidswear cargo pants, graphic tees and striped shorts",
  },
  {
    src: graphic6Asset,
    alt: "Child-inspired psychedelic pattern board with mosaic florals and overlapping circles",
  },
  { src: graphic7Asset, alt: "Geometric print board beside pink embroidered slip-on shoes" },
  {
    src: graphic10Asset,
    alt: "Uniform design board with black-and-white chevron print, pink lotus motifs, matching shoes and a bow tie",
  },
];
function Index() {
  const [introComplete, setIntroComplete] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const revealHero = useCallback(() => {}, []);
  const finishIntro = useCallback(() => setIntroComplete(true), []);
  const doneIntro = useCallback(() => setIntroDone(true), []);
  return (
    <main>
      <Module_components_LogoIntro_LogoIntro
        onReveal={revealHero}
        onComplete={finishIntro}
        onFinish={doneIntro}
      />
      <div className="relative z-10 bg-background">
        <Module_components_SiteHeader_SiteHeader
          introComplete={introComplete}
          logoVisible={introDone}
        />
        <Module_components_Hero_Hero />
        <Module_components_ScrollStory_ScrollStory>
          <Module_components_SlideStack_SlideStack>
            <Module_components_SlideStack_SlidePanel>
              <section
                id="services"
                tabIndex={-1}
                className="px-6 pt-20 pb-14 text-center sm:pt-24 sm:pb-12 md:px-12 md:pt-32 md:pb-16"
              >
                <Module_components_Reveal_Reveal>
                  <Module_components_LogoMark_LogoMark className="mb-8" />
                </Module_components_Reveal_Reveal>
                <Module_components_Reveal_Reveal delay={80}>
                  <h2 className="display mx-auto mt-8 max-w-4xl text-[2.5rem] sm:text-6xl md:text-[5rem]">
                    Design workshops &amp; seminars
                  </h2>
                </Module_components_Reveal_Reveal>
                <Module_components_Reveal_Reveal delay={160}>
                  <p className="mx-auto mt-10 max-w-5xl text-[calc(1.294rem+2px)] font-medium leading-relaxed text-red md:text-[calc(1.4375rem+2px)]">
                    Are conducted For TEAMS of Apparel and Fashion Brands
                    <br />
                    in areas of{" "}
                    <span className="font-medium">
                      Design Aesthetics, Fashion Styling and Trend Forecasting
                    </span>
                    .
                  </p>
                </Module_components_Reveal_Reveal>
                <Module_components_Reveal_Reveal delay={200}>
                  <div className="-mx-6 mt-10 md:-mx-12 md:mt-14">
                    <Module_components_CurvedSlider_CurvedSlider images={WORKSHOP_IMAGES} contain />
                  </div>
                </Module_components_Reveal_Reveal>
                <Module_components_Reveal_Reveal delay={260}>
                  <Module_components_BookWorkshopCta_BookWorkshopCta className="mt-4 md:mt-6" />
                </Module_components_Reveal_Reveal>
              </section>
            </Module_components_SlideStack_SlidePanel>
          </Module_components_SlideStack_SlideStack>

          <Module_components_StylingWorkshops_StylingWorkshops />

          <Module_components_CorporateImageConsulting_CorporateImageConsulting />

          <Module_components_PersonalImageConsulting_PersonalImageConsulting />

          <Module_components_OwnYourSpotlight_OwnYourSpotlight />

          <section id="services-story" className="relative bg-background">
            <Module_components_RedEditorialService_RedEditorialService
              headline={
                <>
                  <span className="text-red">Trend Forecasting</span> &amp;
                  <br />
                  Line Presentation
                </>
              }
              description="Filtering the global fashion picture and anticipating what customers will be ready to embrace in upcoming seasons. Tracking trends and interpreting those trends for the company's target market. Balancing a product line by including a range of seasonal & staple styles, fashions & basic styles and setting the width & depth of the collection with reference to the brand image, price points, size range, style, colous and previous season sales record."
              images={TREND_IMAGES}
              imageFit="contain"
              wideDescription
              ctaLabel="Send your request"
            />
            <Module_components_RedEditorialService_RedEditorialService
              sectionLabel="Graphic & Print Design"
              headline={
                <>
                  <span className="text-red">Graphic &amp;</span>
                  <br />
                  Print Design
                </>
              }
              description="We do CAD'S for shirts, graphic design for T-shirts and textile print design"
              images={GRAPHIC_IMAGES}
              imageFit="contain"
              ctaLabel="Send your request"
            />
          </section>

          {/* About Balance Design section hidden on request — component kept in src/components/AboutSection.tsx
        <StoryScene>
          <AboutSection />
        </StoryScene>
        */}

          <Module_components_AboutMe_AboutMe />
          <Module_components_ScrollStory_StoryScene className="story-scene-testimonials">
            <Module_components_Testimonials_Testimonials />
          </Module_components_ScrollStory_StoryScene>
          <Module_components_ScrollStory_StoryScene className="story-scene-final">
            <Module_components_CtaSection_CtaSection />
          </Module_components_ScrollStory_StoryScene>
        </Module_components_ScrollStory_ScrollStory>
      </div>
      <Module_components_SiteFooter_SiteFooter />
    </main>
  );
}

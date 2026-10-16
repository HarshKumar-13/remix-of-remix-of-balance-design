import { createFileRoute } from ;
import * as React from ;
import { useCallback, useState, useEffect, useRef, type ReactNode, type CSSProperties } from ;
import { useReducedMotion } from ;
import { ArrowDown, Pause, Play, X, Volume2, VolumeX, Facebook, Instagram, Linkedin, Twitter, Youtube, ArrowLeft, ArrowRight } from ;
import { Slot } from ;
import { cva, type VariantProps } from ;
import { clsx, type ClassValue } from ;
import { twMerge } from ;
import * as DialogPrimitive from ;
import gsap from ;
import { ScrollTrigger } from ;
import { supabase } from ;
import asset_assets_balance_logo_navbar_png from ;
import asset_assets_hero_0541_jpg from ;
import asset_assets_hero_0545_jpg from ;
import asset_assets_hero_0556_jpg from ;
import asset_assets_hero_1616b_jpg from ;
import asset_assets_hero_1627_jpg from ;
import asset_assets_hero_1628_jpg from ;
import asset_assets_hero_1629_jpg from ;
import asset_assets_hero_1630_jpg from ;
import asset_assets_hero_1631_jpg from ;
import asset_assets_balance_logo_mark_png from ;
import asset_assets_testimonial_1_mp4 from ;
import asset_assets_testimonial_2_mp4 from ;
import asset_assets_testimonial_1_poster_jpg from ;
import asset_assets_testimonial_2_poster_jpg from ;
import asset_assets_testimonial_3_mp4 from ;
import asset_assets_testimonial_4_mp4 from ;
import asset_assets_testimonial_3_poster_jpg from ;
import asset_assets_testimonial_4_poster_jpg from ;
import asset_assets_testimonial_5_mp4 from ;
import asset_assets_testimonial_6_mp4 from ;
import asset_assets_testimonial_7_mp4 from ;
import asset_assets_testimonial_8_mp4 from ;
import asset_assets_testimonial_9_mp4 from ;
import asset_assets_testimonial_10_mp4 from ;
import asset_assets_testimonial_11_mp4 from ;
import asset_assets_testimonial_12_mp4 from ;
import asset_assets_testimonial_13_mp4 from ;
import asset_assets_testimonial_5_poster_jpg from ;
import asset_assets_testimonial_6_poster_jpg from ;
import asset_assets_testimonial_7_poster_jpg from ;
import asset_assets_testimonial_8_poster_jpg from ;
import asset_assets_testimonial_9_poster_jpg from ;
import asset_assets_testimonial_10_poster_jpg from ;
import asset_assets_testimonial_11_poster_jpg from ;
import asset_assets_testimonial_12_poster_jpg from ;
import asset_assets_testimonial_13_poster_jpg from ;
import asset_assets_balance_logo_on_black_png from ;
import asset_assets_balance_diamond_png from ;
import asset_assets_daw_1_jpeg from ;
import asset_assets_daw_2_jpeg from ;
import asset_assets_daw_3_jpeg from ;
import asset_assets_daw_4_jpeg from ;
import asset_assets_daw_5_jpeg from ;
import asset_assets_daw_new_1_jpg from ;
import asset_assets_daw_new_2_jpg from ;
import asset_assets_daw_new_3_jpg from ;
import asset_assets_daw_new_4_jpg from ;
import asset_assets_corp_new_1_jpg from ;
import asset_assets_corp_vh_1_jpg from ;
import asset_assets_corp_vh_2_jpg from ;
import asset_assets_corp_vh_3_jpg from ;
import asset_assets_corp_vh_4_jpg from ;
import asset_assets_corp_new_6_jpg from ;
import asset_assets_corp_new_7_jpg from ;
import asset_assets_pers_sq_1_jpg from ;
import asset_assets_pers_sq_2_jpg from ;
import asset_assets_pers_sq_3_jpg from ;
import asset_assets_pers_sq_4_jpg from ;
import asset_assets_pers_sq_5_jpg from ;
import asset_assets_pers_slide_2_jpg from ;
import asset_assets_pers_slide_3_jpg from ;
import asset_assets_pers_slide_4_jpg from ;
import asset_assets_pers_slide_4_1_jpg from ;
import asset_assets_pers_slide_5_jpg from ;
import asset_assets_oys_1_png from ;
import asset_assets_oys_2_png from ;
import asset_assets_oys_3_png from ;
import asset_assets_oys_4_png from ;
import asset_assets_oys_5_png from ;
import asset_assets_about_me_1_jpg from ;
import asset_assets_about_me_2_jpg from ;
import asset_assets_Picture8_jpg from ;
import asset_assets_Picture9_jpg from ;
import asset_assets_Picture10_jpg from ;
import asset_assets_Picture11_gif from ;
import asset_assets_trend_scrapbook_jpeg from ;
import asset_assets_trend_reworked_jpeg from ;
import asset_assets_trend_abstract_prints_jpeg from ;
import asset_assets_trend_folksy_jpeg from ;
import asset_assets_trend_1606_jpg from ;
import asset_assets_trend_1607_jpg from ;
import asset_assets_trend_1612_jpg from ;
import asset_assets_trend_1613_jpg from ;
import asset_assets_trend_1614_jpg from ;
import asset_assets_trend_1615_jpg from ;
import asset_assets_trend_1616_jpg from ;
import asset_assets_graphic_1_jpg from ;
import asset_assets_graphic_2_jpg from ;
import asset_assets_graphic_3_jpg from ;
import asset_assets_graphic_4_jpg from ;
import asset_assets_graphic_6_jpg from ;
import asset_assets_graphic_7_jpg from ;
import asset_assets_graphic_10_jpg from ;
import asset_assets_dws_1_jpg from ;
import asset_assets_dws_2_jpg from ;
import asset_assets_dws_3_jpg from ;
import asset_assets_dws_4_jpg from ;
import asset_assets_dws_5_jpg from ;
import asset_assets_dws_6_jpg from ;
import asset_assets_dws_7_jpg from ;
import asset_assets_dws_8_jpg from ;
import asset_assets_dws_9_jpg from ;
/** Complete Balance Design homepage, including animations. Requires the existing project styles, assets, npm packages and enquiry connection. */

// Module_components_SiteHeader
const Module_components_SiteHeader_logoDark = asset_assets_balance_logo_navbar_png;
const Module_components_SiteHeader_NAV = [
    { label: , href:  }, { label: , href:  }, { label: , href:  }, { label: , href:  },
];
function Module_components_SiteHeader_SiteHeader({ introComplete = true, forceSolid = false, logoVisible = true, }: {
    introComplete?: boolean;
    forceSolid?: boolean;
    logoVisible?: boolean;
}) {
    const [solid, setSolid] = useState(false);
    const [open, setOpen] = useState(false);
    useEffect(() => {
        const onScroll = () => setSolid(window.scrollY > window.innerHeight * );
        onScroll();
        window.addEventListener(, onScroll, { passive: true });
        return () => window.removeEventListener(, onScroll);
    }, []);
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === )
                setOpen(false);
        };
        window.addEventListener(, onKey);
        return () => window.removeEventListener(, onKey);
    }, []);
    useEffect(() => {
        document.body.style.overflow = open ?  : ;
        return () => {
            document.body.style.overflow = ;
        };
    }, [open]);
    const showSolid = solid || forceSolid;
    const tone = open ?  : ;
    return (<>
      <header className={introComplete ?  : open ?  : showSolid ?  : introComplete ?  : }>
        <div className={tone}>
          <a href= aria-label= className= data-navbar-logo>
            <img src={Module_components_SiteHeader_logoDark} alt= width={} height={} className={logoVisible ?  : }/>
          </a>

          <div className={introComplete ?  : }>
            <a href= className=>
              Contact
            </a>
            <button aria-label={open ?  : } aria-expanded={open} onClick={() => setOpen((v) => !v)} className=>
              <span className=>{open ?  : }</span>
              <span className=>
                <span className={open ?  : }/>
                <span className={open ?  : }/>
              </span>
            </button>
          </div>
        </div>
      </header>

      <div aria-hidden={!open} className={open ?  : }>
        <nav className=>
          {Module_components_SiteHeader_NAV.map((n, i) => (<a key={n.label} href={n.href} onClick={() => setOpen(false)} tabIndex={open ?  : -} className= style={{
        opacity: open ?  : , transform: open ?  : , transitionDelay: open ?  + i *  : ,
    }}>
              {n.label}
            </a>))}
        </nav>
      </div>
    </>);
}

// Module_lib_utils
function Module_lib_utils_cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Module_components_ui_button
const Module_components_ui_button_buttonVariants = cva(, {
    variants: {
        variant: {
            default: , destructive: , outline: , secondary: , ghost: , link: ,
        }, size: {
            default: , sm: , lg: , icon: ,
        },
    }, defaultVariants: {
        variant: , size: ,
    },
});
interface Module_components_ui_button_ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof Module_components_ui_button_buttonVariants> {
    asChild?: boolean;
}
const Module_components_ui_button_Button = React.forwardRef<HTMLButtonElement, Module_components_ui_button_ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : ;
    return (<Comp className={Module_lib_utils_cn(Module_components_ui_button_buttonVariants({ variant, size, className }))} ref={ref} {...props}/>);
});
Module_components_ui_button_Button.displayName = ;

// Module_components_ui_dialog
const Module_components_ui_dialog_Dialog = DialogPrimitive.Root;
const Module_components_ui_dialog_DialogTrigger = DialogPrimitive.Trigger;
const Module_components_ui_dialog_DialogPortal = DialogPrimitive.Portal;
const Module_components_ui_dialog_DialogClose = DialogPrimitive.Close;
const Module_components_ui_dialog_DialogOverlay = React.forwardRef<React.ElementRef<typeof DialogPrimitive.Overlay>, React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>>(({ className, ...props }, ref) => (<DialogPrimitive.Overlay ref={ref} className={Module_lib_utils_cn(, className)} {...props}/>));
Module_components_ui_dialog_DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
const Module_components_ui_dialog_DialogContent = React.forwardRef<React.ElementRef<typeof DialogPrimitive.Content>, React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>>(({ className, children, ...props }, ref) => (<Module_components_ui_dialog_DialogPortal>
    <Module_components_ui_dialog_DialogOverlay />
    <DialogPrimitive.Content ref={ref} className={Module_lib_utils_cn(, className)} {...props}>
      {children}
      <DialogPrimitive.Close className=>
        <X className=/>
        <span className=>Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </Module_components_ui_dialog_DialogPortal>));
Module_components_ui_dialog_DialogContent.displayName = DialogPrimitive.Content.displayName;
const Module_components_ui_dialog_DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (<div className={Module_lib_utils_cn(, className)} {...props}/>);
Module_components_ui_dialog_DialogHeader.displayName = ;
const Module_components_ui_dialog_DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (<div className={Module_lib_utils_cn(, className)} {...props}/>);
Module_components_ui_dialog_DialogFooter.displayName = ;
const Module_components_ui_dialog_DialogTitle = React.forwardRef<React.ElementRef<typeof DialogPrimitive.Title>, React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>>(({ className, ...props }, ref) => (<DialogPrimitive.Title ref={ref} className={Module_lib_utils_cn(, className)} {...props}/>));
Module_components_ui_dialog_DialogTitle.displayName = DialogPrimitive.Title.displayName;
const Module_components_ui_dialog_DialogDescription = React.forwardRef<React.ElementRef<typeof DialogPrimitive.Description>, React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>>(({ className, ...props }, ref) => (<DialogPrimitive.Description ref={ref} className={Module_lib_utils_cn(, className)} {...props}/>));
Module_components_ui_dialog_DialogDescription.displayName = DialogPrimitive.Description.displayName;

// Module_components_HeroImageLightbox
type Module_components_HeroImageLightbox_ExpandedHeroImage = {
    src: string;
    alt: string;
    trigger: HTMLElement;
};
function Module_components_HeroImageLightbox_HeroImageLightbox({ image, onClose, onExplore, onAfterClose }: {
    image: Module_components_HeroImageLightbox_ExpandedHeroImage | null;
    onClose: () => void;
    onExplore?: () => void;
    onAfterClose?: () => void;
}) {
    const trigger = useRef<HTMLElement | null>(null);
    if (image)
        trigger.current = image.trigger;
    return (<Module_components_ui_dialog_Dialog open={image !== null} onOpenChange={open => { if (!open)
        onClose(); }}>
      <Module_components_ui_dialog_DialogPortal>
        <DialogPrimitive.Overlay className=/>
        <DialogPrimitive.Content className= aria-describedby={undefined} onCloseAutoFocus={event => { event.preventDefault(); trigger.current?.focus({ preventScroll: true }); onAfterClose?.(); }}>
          <Module_components_ui_dialog_DialogTitle className=>{image?.alt}</Module_components_ui_dialog_DialogTitle>
          {image && <img src={image.src} alt={image.alt} className=/>}
          <Module_components_ui_dialog_DialogClose asChild>
            <Module_components_ui_button_Button variant= size= className= aria-label= title=>
              <X aria-hidden=/>
            </Module_components_ui_button_Button>
          </Module_components_ui_dialog_DialogClose>
          {onExplore && <Module_components_ui_button_Button variant= className= onClick={onExplore}>SCROLL TO EXPLORE <ArrowDown aria-hidden=/></Module_components_ui_button_Button>}
        </DialogPrimitive.Content>
      </Module_components_ui_dialog_DialogPortal>
    </Module_components_ui_dialog_Dialog>);
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
    [{ src: Module_components_Hero_h1616, alt:  }, { src: Module_components_Hero_h0541, alt:  }], [{ src: Module_components_Hero_h1627, alt:  }, { src: Module_components_Hero_h1628, alt:  }, { src: Module_components_Hero_h0545, alt:  }], [{ src: Module_components_Hero_h1629, alt:  }, { src: Module_components_Hero_h1631, alt:  }, { src: Module_components_Hero_h1630, alt:  }, { src: Module_components_Hero_h0556, alt:  }],
];
const Module_components_Hero_PHRASES = [, , , , , ];
function Module_components_Hero_Hero() {
    const reduced = useReducedMotion();
    const [expandedImage, setExpandedImage] = useState<Module_components_HeroImageLightbox_ExpandedHeroImage | null>(null);
    const [gridPaused, setGridPaused] = useState(false);
    const galleryRef = useRef<HTMLDivElement>(null);
    const continueAfterClose = useRef(false);
    useEffect(() => {
        const gallery = galleryRef.current;
        if (!gallery)
            return;
        const click = (event: MouseEvent) => {
            if (gallery.dataset[] !==  && gallery.dataset[] !== )
                return;
            const target = event.target;
            if (!(target instanceof Element))
                return;
            const cell = target.closest<HTMLElement>();
            const image = cell?.querySelector<HTMLImageElement>();
            if (!cell || !image)
                return;
            gallery.dispatchEvent(new CustomEvent(, { detail: true }));
            setExpandedImage({ src: image.currentSrc || image.src, alt: image.alt, trigger: cell });
        };
        const state = (event: Event) => setGridPaused(Boolean((event as CustomEvent<boolean>).detail));
        gallery.addEventListener(, click);
        gallery.addEventListener(, state);
        return () => { gallery.removeEventListener(, click); gallery.removeEventListener(, state); };
    }, []);
    const closeImage = () => {
        setExpandedImage(null);
        galleryRef.current?.dispatchEvent(new CustomEvent(, { detail: false }));
    };
    const navigateToServices = () => {
        const services = document.getElementById();
        if (!services)
            return;
        services.focus({ preventScroll: true });
        services.scrollIntoView({ behavior: reduced ?  : , block:  });
    };
    const explore = () => {
        galleryRef.current?.dispatchEvent(new CustomEvent());
        if (expandedImage) {
            continueAfterClose.current = true;
            closeImage();
        }
        else
            navigateToServices();
    };
    const afterClose = () => {
        if (!continueAfterClose.current)
            return;
        continueAfterClose.current = false;
        requestAnimationFrame(navigateToServices);
    };
    return (<section id= className= aria-label=>
      <h1 className=>Balance Design &amp; Fashion Consultancy</h1>
      <div ref={galleryRef} data-hero-gallery className= aria-label=>
        {Module_components_Hero_HERO_COLUMNS.map((photos, column) => (<div key={column} data-hero-column className=>
            <div data-column-track className=>
              {Array.from({ length:  }, (_, repetition) => photos.map((photo, photoIndex) => (<Module_components_ui_button_Button key={repetitionphoto.src} variant= tabIndex={-} aria-label={photo.alt} data-column-image data-cycle-start={photoIndex ===  ?  : undefined} className=>
                  <img src={photo.src} alt={photo.alt} data-intro-image={repetition ===  ?  : undefined} loading= decoding=/>
                </Module_components_ui_button_Button>)))}
            </div>
          </div>))}
        <Module_components_ui_button_Button variant= size= data-grid-toggle className= aria-label={gridPaused ?  : } title={gridPaused ?  : } aria-pressed={gridPaused}>
          {gridPaused ? <Play aria-hidden=/> : <Pause aria-hidden=/>}
        </Module_components_ui_button_Button>
        <Module_components_ui_button_Button variant= data-grid-explore className= onClick={explore}>
          SCROLL TO EXPLORE <ArrowDown aria-hidden=/>
        </Module_components_ui_button_Button>
      </div>
      <Module_components_HeroImageLightbox_HeroImageLightbox image={expandedImage} onClose={closeImage} onExplore={explore} onAfterClose={afterClose}/>
    </section>);
}

// Module_components_LogoIntro
const Module_components_LogoIntro_originalLogo = asset_assets_balance_logo_navbar_png;
function Module_components_LogoIntro_LogoIntro({ onReveal, onComplete, onFinish }: {
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
        const gallery = document.querySelector<HTMLElement>();
        if (!layer || !surface || !logo || !counter || !gallery) {
            onReveal();
            onComplete();
            onFinish();
            return;
        }
        const reduced = window.matchMedia().matches;
        let disposed = false;
        let entrance: gsap.core.Timeline | undefined;
        const columns = Array.from(gallery.querySelectorAll<HTMLElement>());
        const tracks = Array.from(gallery.querySelectorAll<HTMLElement>());
        const geometry = { travel:  };
        let offscreen = false;
        const manual = { offset:  };
        let manualTarget = ;
        let manualTween: gsap.core.Tween | undefined;
        let resumeTimer: ReturnType<typeof setTimeout> | undefined;
        let userPaused = false;
        let lightboxOpen = false;
        let touchY: number | undefined;
        let dragged = false;
        const interactive = () => gallery.dataset[] ===  || gallery.dataset[] === ;
        const announce = () => gallery.dispatchEvent(new CustomEvent(, { detail: userPaused || reduced || Boolean(entrance?.paused()) }));
        const pause = () => { clearTimeout(resumeTimer); entrance?.pause(); announce(); };
        const resume = () => {
            if (disposed || userPaused || lightboxOpen || touchY !== undefined || document.hidden || offscreen || reduced || !interactive())
                return;
            manualTween?.kill();
            manualTarget = manual.offset;
            entrance?.resume();
            announce();
        };
        const resumeLater = () => { clearTimeout(resumeTimer); resumeTimer = setTimeout(resume, ); };
        const phase = (value: string) => {
            layer.dataset[] = value;
            gallery.dataset[] = value;
            if (value === )
                entrance?.timeScale();
            place();
        };
        const previousOverflow = document.documentElement.style.overflow;
        document.documentElement.style.overflow = ;
        layer.dataset[] = ;
        gsap.set(gallery, { opacity:  });
        gsap.set(columns, { clipPath:  });
        const place = () => {
            const height = window.innerHeight;
            columns.forEach((column, i) => {
                const track = tracks[i];
                if (!track)
                    return;
                const cycles = track.querySelectorAll<HTMLElement>();
                const first = cycles[];
                const next = cycles[];
                if (!first || !next)
                    return;
                const cycleHeight = next.offsetTop - first.offsetTop;
                if (cycleHeight <= )
                    return;
                const distance = height * (i ===  ?  : i ===  ?  : );
                const start = Math.min(-cycleHeight, -cycleHeight *  + (i ===  ? height *  + distance *  : i ===  ? -height *  : -height * ));
                const travel = distance * geometry.travel + manual.offset;
                const wrapped = gsap.utils.wrap(-cycleHeight, cycleHeight, travel);
                gsap.set(track, { y: start + (i ===  ?  : -) * wrapped });
                track.querySelectorAll<HTMLElement>().forEach(cell => {
                    const rect = cell.getBoundingClientRect();
                    cell.tabIndex = interactive() && rect.bottom >  && rect.top < height ?  : -;
                });
            });
        };
        const move = (delta: number) => {
            if (!interactive() || lightboxOpen)
                return;
            pause();
            const cycles = tracks[]?.querySelectorAll<HTMLElement>();
            const cycle = cycles?.[] && cycles[] ? cycles[].offsetTop - cycles[].offsetTop : window.innerHeight;
            manualTarget = Math.max(-cycle * , Math.min(cycle * , manualTarget + delta));
            manualTween?.kill();
            manualTween = gsap.to(manual, { offset: manualTarget, duration: , ease: , onUpdate: place });
            resumeLater();
        };
        const wheel = (event: WheelEvent) => {
            if (!interactive() || lightboxOpen || event.ctrlKey)
                return;
            const unit = event.deltaMode ===  ?  : event.deltaMode ===  ? window.innerHeight : ;
            move(Math.max(-, Math.min(, event.deltaY * unit * )));
        };
        const touchStart = (event: TouchEvent) => { if (interactive()) {
            touchY = event.touches[]?.clientY;
            dragged = false;
            pause();
        } };
        const touchMove = (event: TouchEvent) => {
            const next = event.touches[]?.clientY;
            if (!interactive() || lightboxOpen || touchY === undefined || next === undefined)
                return;
            const delta = touchY - next;
            if (Math.abs(delta) > )
                dragged = true;
            move(delta * );
            touchY = next;
        };
        const touchEnd = () => { touchY = undefined; resumeLater(); };
        const click = (event: MouseEvent) => {
            if (dragged && event.detail > ) {
                event.preventDefault();
                event.stopImmediatePropagation();
                dragged = false;
                return;
            }
            dragged = false;
            if (!interactive() || !(event.target instanceof Element) || !event.target.closest())
                return;
            userPaused = !userPaused;
            if (userPaused)
                pause();
            else
                resume();
        };
        const lightbox = (event: Event) => {
            lightboxOpen = Boolean((event as CustomEvent<boolean>).detail);
            if (lightboxOpen) {
                pause();
                manualTween?.kill();
                manualTarget = manual.offset;
            }
            else
                resumeLater();
        };
        const explore = () => { userPaused = true; pause(); manualTween?.kill(); manualTarget = manual.offset; };
        const visibility = () => { if (document.hidden && interactive())
            pause();
        else
            resumeLater(); };
        const focus = () => { if (interactive())
            pause(); };
        const blur = () => { if (!lightboxOpen)
            resumeLater(); };
        gallery.addEventListener(, wheel, { passive: true });
        gallery.addEventListener(, touchStart, { passive: true });
        gallery.addEventListener(, touchMove, { passive: true });
        gallery.addEventListener(, touchEnd);
        gallery.addEventListener(, touchEnd);
        gallery.addEventListener(, click, true);
        gallery.addEventListener(, explore);
        gallery.addEventListener(, lightbox);
        gallery.addEventListener(, focus);
        gallery.addEventListener(, blur);
        document.addEventListener(, visibility);
        const observer = new IntersectionObserver(([entry]) => {
            offscreen = !entry?.isIntersecting;
            if (offscreen && interactive())
                pause();
            else
                resumeLater();
        });
        observer.observe(gallery);
        place();
        let watchdog: ReturnType<typeof setTimeout> | undefined;
        const prepare = async () => {
            const images = Array.from(document.querySelectorAll<HTMLImageElement>());
            await Promise.all(images.map(async (image) => { try {
                await image.decode();
            }
            catch { } }));
        };
        const assetsReady = Promise.race([prepare(), new Promise<void>(resolve => { watchdog = setTimeout(resolve, ); })]);
        const begin = () => {
            if (disposed)
                return;
            clearTimeout(watchdog);
            place();
            entrance = gsap.timeline();
            entrance.call(() => { phase(); }, [], ).to(counter, { opacity: , duration:  }, ).to(surface, { opacity: , duration: , ease:  }, ).to(columns, { clipPath: , duration: , stagger: , ease:  }, ).to(logo, { opacity: , duration:  }, ).call(() => {
                phase();
                document.documentElement.style.overflow = previousOverflow;
                gsap.set(layer, { display:  });
                onReveal();
                onComplete();
                onFinish();
            }, [], ).call(() => { phase(); }, [], ).to(geometry, { travel: , duration: , ease: , onUpdate: place }, ).to(geometry, { travel: , duration: , repeat: -, repeatRefresh: true, ease: , onUpdate: place });
        };
        const progress = { value:  };
        const loading = gsap.timeline();
        if (reduced) {
            phase();
            gsap.set(columns, { clipPath:  });
            gsap.set(layer, { display:  });
            document.documentElement.style.overflow = previousOverflow;
            userPaused = true;
            onReveal();
            onComplete();
            onFinish();
            announce();
        }
        else
            loading.to(progress, { value: , duration: , ease: , onUpdate: () => { counter.textContent = Math.floor(progress.value); } });
        if (!reduced)
            loading.call(() => {
                void assetsReady.then(() => {
                    if (disposed)
                        return;
                    loading.to(progress, { value: , duration: , ease: , onUpdate: () => { counter.textContent = Math.floor(progress.value); } }).to({}, { duration:  }).call(begin);
                });
            });
        window.addEventListener(, place);
        return () => {
            disposed = true;
            clearTimeout(resumeTimer);
            manualTween?.kill();
            gallery.removeEventListener(, wheel);
            gallery.removeEventListener(, touchStart);
            gallery.removeEventListener(, touchMove);
            gallery.removeEventListener(, touchEnd);
            gallery.removeEventListener(, touchEnd);
            gallery.removeEventListener(, click, true);
            gallery.removeEventListener(, explore);
            observer.disconnect();
            gallery.removeEventListener(, lightbox);
            gallery.removeEventListener(, focus);
            gallery.removeEventListener(, blur);
            document.removeEventListener(, visibility);
            delete gallery.dataset[];
            clearTimeout(watchdog);
            loading.kill();
            entrance?.kill();
            window.removeEventListener(, place);
            document.documentElement.style.overflow = previousOverflow;
            gsap.set(gallery, { clearProps:  });
            gsap.set(tracks, { clearProps:  });
            gsap.set(columns, { clearProps:  });
        };
    }, [onReveal, onComplete, onFinish]);
    return (<div ref={layerRef} data-logo-intro className= aria-label=>
      <div ref={surfaceRef} data-loader-surface className=/>
      <div ref={logoRef} className=>
        <img src={Module_components_LogoIntro_originalLogo} data-intro-logo alt= width={} height={} className=/>
      </div>
      <p ref={counterRef} data-loading-counter className= aria-live=>0%</p>
    </div>);
}

// Module_components_Reveal
function Module_components_Reveal_Reveal({ children, delay = , className = , }: {
    children: ReactNode;
    delay?: number;
    className?: string;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const [shown, setShown] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el)
            return;
        const io = new IntersectionObserver(([entry]) => {
            if (entry?.isIntersecting) {
                setShown(true);
                io.disconnect();
            }
        }, { threshold: , rootMargin:  });
        io.observe(el);
        return () => io.disconnect();
    }, []);
    return (<div ref={ref} className={shown ?  : className} style={{ transitionDelay: delay }}>
      {children}
    </div>);
}

// Module_components_LogoMark
const Module_components_LogoMark_logoMark = asset_assets_balance_logo_mark_png;
function Module_components_LogoMark_LogoMark({ className =  }: {
    className?: string;
}) {
    return (<img src={Module_components_LogoMark_logoMark} alt= className={className} width={} height={}/>);
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
const Module_components_Testimonials_TESTIMONIALS: Module_components_Testimonials_VideoTestimonial[] = [
    { id: , name: , role: , video: Module_components_Testimonials_videoOne, poster: Module_components_Testimonials_posterOne }, { id: , name: , role: , video: Module_components_Testimonials_videoTwo, poster: Module_components_Testimonials_posterTwo }, { id: , name: , role: , video: Module_components_Testimonials_videoThree, poster: Module_components_Testimonials_posterThree }, { id: , name: , role: , video: Module_components_Testimonials_videoFour, poster: Module_components_Testimonials_posterFour }, { id: , name: , role: , video: Module_components_Testimonials_video5, poster: Module_components_Testimonials_poster5 }, { id: , name: , role: , video: Module_components_Testimonials_video6, poster: Module_components_Testimonials_poster6 }, { id: , name: , role: , video: Module_components_Testimonials_video7, poster: Module_components_Testimonials_poster7 }, { id: , name: , role: , video: Module_components_Testimonials_video8, poster: Module_components_Testimonials_poster8 }, { id: , name: , role: , video: Module_components_Testimonials_video9, poster: Module_components_Testimonials_poster9 }, { id: , name: , role: , video: Module_components_Testimonials_video10, poster: Module_components_Testimonials_poster10 }, { id: , name: , role: , video: Module_components_Testimonials_video11, poster: Module_components_Testimonials_poster11 }, { id: , name: , role: , video: Module_components_Testimonials_video12, poster: Module_components_Testimonials_poster12 }, { id: , name: , role: , video: Module_components_Testimonials_video13, poster: Module_components_Testimonials_poster13 },
];
const Module_components_Testimonials_COUNT = Module_components_Testimonials_TESTIMONIALS.length;
function Module_components_Testimonials_offsetFrom(index: number, active: number) {
    let diff = index - active;
    if (diff > Module_components_Testimonials_COUNT / )
        diff -= Module_components_Testimonials_COUNT;
    if (diff < -Module_components_Testimonials_COUNT / )
        diff += Module_components_Testimonials_COUNT;
    return diff;
}
function Module_components_Testimonials_Testimonials() {
    const [active, setActive] = useState();
    const [, setTimerKey] = useState();
    const [inView, setInView] = useState(false);
    const [soundOn, setSoundOn] = useState(true);
    const [reach, setReach] = useState();
    useEffect(() => {
        const mq = window.matchMedia();
        const update = () => setReach(mq.matches ?  : );
        update();
        mq.addEventListener(, update);
        return () => mq.removeEventListener(, update);
    }, []);
    const sectionRef = useRef<HTMLElement | null>(null);
    const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
    const drag = useRef<{
        x: number;
        active: boolean;
    }>({ x: , active: false });
    const go = useCallback((dir: number) => {
        setActive((v) => (v + dir + Module_components_Testimonials_COUNT) % Module_components_Testimonials_COUNT);
        setTimerKey((k) => k + );
    }, []);
    const select = useCallback((index: number) => {
        setActive(index);
        setTimerKey((k) => k + );
    }, []);
    useEffect(() => {
        const el = sectionRef.current;
        if (!el)
            return;
        const io = new IntersectionObserver(([entry]) => setInView(!!entry && entry.isIntersecting && entry.intersectionRatio > ), { threshold: [, , ] });
        io.observe(el);
        return () => io.disconnect();
    }, []);
    useEffect(() => {
        videoRefs.current.forEach((video, index) => {
            if (!video)
                return;
            if (index === active && inView) {
                video.muted = !soundOn;
                const play = video.play();
                if (play && typeof play.catch === )
                    play.catch(() => {
                        video.muted = true;
                        setSoundOn(false);
                        video.play().catch(() => { });
                    });
            }
            else {
                video.pause();
                video.muted = true;
                if (index !== active)
                    video.currentTime = ;
            }
        });
    }, [active, inView, soundOn]);
    const onPointerDown = (event: React.PointerEvent) => {
        drag.current = { x: event.clientX, active: true };
    };
    const onPointerUp = (event: React.PointerEvent) => {
        if (!drag.current.active)
            return;
        const delta = event.clientX - drag.current.x;
        drag.current.active = false;
        if (Math.abs(delta) > )
            go(delta <  ?  : -);
    };
    return (<section ref={sectionRef} className= aria-roledescription= aria-label=>
      <div className=>
        <Module_components_Reveal_Reveal>
          <Module_components_LogoMark_LogoMark className=/>
        </Module_components_Reveal_Reveal>
        <Module_components_Reveal_Reveal delay={}>
          <p className=>Testimonials</p>
          <h2 className=>
            What Brands and Customers Say About Us
          </h2>
        </Module_components_Reveal_Reveal>
      </div>

      <Module_components_Reveal_Reveal>
        <div className= onPointerDown={onPointerDown} onPointerUp={onPointerUp} onPointerCancel={() => (drag.current.active = false)}>
          {Module_components_Testimonials_TESTIMONIALS.map((item, index) => {
        const offset = Module_components_Testimonials_offsetFrom(index, active);
        const isActive = offset === ;
        const dist = Math.abs(offset);
        const hidden = dist > reach;
        const sign = Math.sign(offset);
        const POS = reach ===  ? [, , , ] : [, , , ];
        const SCALE = reach ===  ? [, , , ] : [, , , ];
        const OPACITY = reach ===  ? [, , , ] : [, , , ];
        const step = Math.min(dist, );
        return (<article key={item.id} aria-hidden={!isActive} onClick={() => !isActive && !hidden && select(index)} className= style={{
            transform: sign * (POS[step] ?? ) * SCALE[step] ?? , opacity: hidden ?  : (OPACITY[step] ?? ), zIndex:  - dist, pointerEvents: hidden ?  : , cursor: isActive ?  : ,
        }}>
                <div className=>
                  <video ref={(el) => {
            videoRefs.current[index] = el;
        }} src={item.video} poster={item.poster} muted playsInline preload= onEnded={() => isActive && go()} className=/>
                  {isActive && (<button type= onClick={(e) => {
            e.stopPropagation();
            setSoundOn((v) => !v);
        }} onPointerDown={(e) => e.stopPropagation()} aria-label={soundOn ?  : } className=>
                      {soundOn ? <Volume2 className=/> : <VolumeX className=/>}
                    </button>)}
                </div>
              </article>);
    })}

          <button type= aria-label= onClick={() => go(-)} className=>
            <svg width= height= viewBox= fill= stroke= strokeWidth= strokeLinecap= strokeLinejoin= aria-hidden=><path d=/></svg>
          </button>
          <button type= aria-label= onClick={() => go()} className=>
            <svg width= height= viewBox= fill= stroke= strokeWidth= strokeLinecap= strokeLinejoin= aria-hidden=><path d=/></svg>
          </button>
        </div>
      </Module_components_Reveal_Reveal>
    </section>);
}

// Module_components_CtaSection
function Module_components_CtaSection_CtaSection() {
    return (<section id= className=>
      <div className=>
        <Module_components_Reveal_Reveal>
          <h2 className=>
            Let&rsquo;s create a
            <br />
            stronger presence.
          </h2>
        </Module_components_Reveal_Reveal>
        <Module_components_Reveal_Reveal delay={}>
          <p className=>Design &amp; Fashion Consultancy</p>
        </Module_components_Reveal_Reveal>
        <Module_components_Reveal_Reveal delay={}>
          <a href= className=>
            Book an appointment
          </a>
        </Module_components_Reveal_Reveal>
      </div>
    </section>);
}

// Module_components_SiteFooter
const Module_components_SiteFooter_logoLight = asset_assets_balance_logo_on_black_png;
function Module_components_SiteFooter_SiteFooter() {
    const ref = useRef<HTMLElement>(null);
    const [progress, setProgress] = useState();
    useEffect(() => {
        const reduce = window.matchMedia().matches;
        const mobile = window.innerWidth < ;
        let target = ;
        let value = ;
        let velocity = ;
        let raf = ;
        let running = false;
        const measure = () => {
            const el = ref.current;
            if (!el)
                return ;
            const rect = el.getBoundingClientRect();
            const vh = window.innerHeight;
            return Math.min(, Math.max(, (vh - rect.top) / Math.min(rect.height, vh)));
        };
        const tick = () => {
            const stiffness = mobile ?  : ;
            const damping = mobile ?  : ;
            velocity += (target - value) * stiffness;
            velocity *= damping;
            value += velocity;
            setProgress(value);
            if (Math.abs(target - value) >  || Math.abs(velocity) > ) {
                raf = window.requestAnimationFrame(tick);
            }
            else {
                value = target;
                velocity = ;
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
            velocity += (next - target) * (mobile ?  : );
            target = next;
            if (!running) {
                running = true;
                raf = window.requestAnimationFrame(tick);
            }
        };
        target = measure();
        value = target;
        setProgress(target);
        window.addEventListener(, onScroll, { passive: true });
        window.addEventListener(, onScroll);
        return () => {
            window.removeEventListener(, onScroll);
            window.removeEventListener(, onScroll);
            if (raf)
                window.cancelAnimationFrame(raf);
        };
    }, []);
    return (<footer ref={ref} id= className=>
      <div className=>
        <div className= style={{
        opacity: Math.max(, Math.min(, progress * )), transform: (( - progress * ) * ).toFixed(),
    }}>
          <img src={Module_components_SiteFooter_logoLight} alt= className=/>

          <p className=>Design &amp; Fashion Consultancy</p>

          <div className=>
            <nav className=>
              {[
        { l: , h:  }, { l: , h:  }, { l: , h:  }, { l: , h:  },
    ].map((n) => (<a key={n.l} href={n.h} className=>
                  {n.l}
                </a>))}
            </nav>
            <div>
              <p className=>Enquiries</p>
              <a href= className=>
                info@balancedesign.in
              </a>
            </div>
            <div>
              <p className=>Connect with us</p>
              <div className=>
                {[
        { label: , href: , Icon: Facebook }, { label: , href: , Icon: Linkedin }, { label: , href: , Icon: Instagram }, { label: , href: , Icon: Twitter }, { label: , href: , Icon: Youtube },
    ].map(({ label, href, Icon }) => (<a key={label} href={href} target= rel= aria-label={label} className=>
                    <Icon aria-hidden= size={} strokeWidth={}/>
                  </a>))}
              </div>
            </div>
          </div>

          <div className=>
            <span className=>
              &copy; 2026 Balance Design. All Rights Reserved.
            </span>
            <span className=>Privacy</span>
            <span className=>Terms</span>
          </div>

        </div>
      </div>

    </footer>);
}

// Module_components_ScrollStory
function Module_components_ScrollStory_clamp(value: number) {
    return Math.min(, Math.max(, value));
}
function Module_components_ScrollStory_ScrollStory({ children }: {
    children: ReactNode;
}) {
    const rootRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const root = rootRef.current;
        if (!root || window.matchMedia().matches)
            return;
        const scenes = Array.from(root.querySelectorAll<HTMLElement>());
        let frame = ;
        const update = () => {
            frame = ;
            const viewportHeight = window.innerHeight;
            const mobile = window.innerWidth < ;
            scenes.forEach((scene) => {
                const rect = scene.getBoundingClientRect();
                const enter = Module_components_ScrollStory_clamp((viewportHeight - rect.top) / (viewportHeight * ));
                const exit = Module_components_ScrollStory_clamp((viewportHeight *  - rect.bottom) / (viewportHeight * ));
                const travel = mobile ?  : ;
                const exitTravel = mobile ?  : ;
                const y = ( - enter) * travel - exit * exitTravel;
                const scale =  + enter *  - exit * (mobile ?  : );
                const opacity = Math.min(, enter * ) * ( - exit * (mobile ?  : ));
                const clip = ( - enter) * (mobile ?  : );
                const centerReveal = ( - enter) * ;
                scene.style.setProperty(, y.toFixed());
                scene.style.setProperty(, scale.toFixed());
                scene.style.setProperty(, opacity.toFixed());
                scene.style.setProperty(, clip.toFixed());
                scene.style.setProperty(, centerReveal.toFixed());
                scene.style.setProperty(, (( - enter) * (mobile ?  : )).toFixed());
            });
        };
        const requestUpdate = () => {
            if (frame)
                return;
            frame = window.requestAnimationFrame(update);
        };
        update();
        window.addEventListener(, requestUpdate, { passive: true });
        window.addEventListener(, requestUpdate);
        return () => {
            window.removeEventListener(, requestUpdate);
            window.removeEventListener(, requestUpdate);
            if (frame)
                window.cancelAnimationFrame(frame);
        };
    }, []);
    return (<div ref={rootRef} className=>
      {children}
    </div>);
}
function Module_components_ScrollStory_StoryScene({ children, className = , }: {
    children: ReactNode;
    className?: string;
}) {
    return (<div data-scroll-scene className={className}>
      <div className=>{children}</div>
    </div>);
}

// Module_components_SlideStack
gsap.registerPlugin(ScrollTrigger);
function Module_components_SlideStack_SlideStack({ children }: {
    children: ReactNode;
}) {
    const rootRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const root = rootRef.current;
        if (!root)
            return;
        if (window.matchMedia().matches)
            return;
        const panels = Array.from(root.querySelectorAll<HTMLElement>());
        const setPanelOffsets = () => {
            const vh = window.innerHeight;
            panels.forEach((panel, i) => {
                if (i === panels.length - )
                    return;
                const overflow = panel.offsetHeight - vh;
                panel.style.top = overflow >  ? -overflow : ;
            });
            ScrollTrigger.refresh();
        };
        setPanelOffsets();
        const ro = new ResizeObserver(setPanelOffsets);
        panels.forEach((panel) => ro.observe(panel));
        window.addEventListener(, setPanelOffsets);
        const ctx = gsap.context(() => {
            panels.forEach((panel, i) => {
                const next = panels[i + ];
                if (!next)
                    return;
                const inner = panel.querySelector<HTMLElement>();
                if (!inner)
                    return;
                const tallerThanViewport = panel.offsetHeight > window.innerHeight;
                gsap.to(inner, {
                    yPercent: tallerThanViewport ?  : -, scale: , opacity: , ease: , scrollTrigger: {
                        trigger: next, start: , end: , scrub: true,
                    },
                });
            });
        }, root);
        const refresh = () => ScrollTrigger.refresh();
        window.addEventListener(, refresh);
        return () => {
            window.removeEventListener(, refresh);
            window.removeEventListener(, setPanelOffsets);
            ro.disconnect();
            ctx.revert();
        };
    }, []);
    return (<div ref={rootRef} className=>
      {children}
    </div>);
}
function Module_components_SlideStack_SlidePanel({ children, className = , }: {
    children: ReactNode;
    className?: string;
}) {
    return (<div data-slide-panel className={className}>
      <div className=>{children}</div>
    </div>);
}

// Module_components_CurvedSlider
type Module_components_CurvedSlider_CurvedImage = {
    src: string;
    alt: string;
    caption?: {
        title: string;
        sub: string;
    };
};
function Module_components_CurvedSlider_CurvedSlider({ images, imageFit =  }: {
    images: Module_components_CurvedSlider_CurvedImage[];
    contain?: boolean;
    imageFit?:  | ;
}) {
    const [offset, setOffset] = useState();
    const [hovered, setHovered] = useState<number | null>(null);
    const slides = [...images, ...images, ...images];
    const n = slides.length;
    const half = Math.floor(n / );
    const VISIBLE = ;
    useEffect(() => {
        if (hovered !== null)
            return;
        const id = window.setInterval(() => setOffset((o) => o + ), );
        return () => window.clearInterval(id);
    }, [hovered]);
    return (<div className= style={{ perspective:  }}>
      {slides.map((img, i) => {
        const pos = ((((i - offset) % n) + n) % n) - half;
        const abs = Math.abs(pos);
        const wrapping = abs >= half;
        const hidden = abs > VISIBLE;
        const z = Math.min(abs, VISIBLE + );
        return (<div key={img.srci} className= style={{
            transform: pos * posz * z * -Math.max(-VISIBLE - , Math.min(VISIBLE + , pos)) * , opacity: hidden ?  : , visibility: hidden ?  : , zIndex: hovered === i ?  :  - z, transition: wrapping ?  : ,
        }} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered((h) => (h === i ? null : h))}>
            <div className= style={{ transform: hovered === i ?  :  }}>
              <img src={img.src} alt={img.alt} loading= className={imageFit ===  ?  : }/>
            </div>
            {img.caption && (<div className=>
                <span aria-hidden= className=/>
                <p className=>{img.caption.title}</p>
                <p className=>
                  {img.caption.sub}
                </p>
              </div>)}
          </div>);
    })}
    </div>);
}

// Module_components_BookWorkshopCta
const Module_components_BookWorkshopCta_inputClass = ;
function Module_components_BookWorkshopCta_BookingDialog({ open, onOpenChange, }: {
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
        const { error: insertError } = await supabase.from().insert({
            name: String(data.get() || ).trim(), email: String(data.get() || ).trim(), phone: String(data.get() || ).trim() || null, workshop: String(data.get() || ).trim() || null, age_group: String(data.get() || ).trim() || null, profession: String(data.get() || ).trim() || null, message: String(data.get() || ).trim() || null,
        });
        setSending(false);
        if (insertError) {
            setError();
            return;
        }
        setSubmitted(true);
    }
    return (<Module_components_ui_dialog_Dialog open={open} onOpenChange={(next) => {
        onOpenChange(next);
        if (!next) {
            setSubmitted(false);
            setError(null);
        }
    }}>
      <Module_components_ui_dialog_DialogContent className=>
        {submitted ? (<div className=>
            <Module_components_ui_dialog_DialogHeader>
              <Module_components_ui_dialog_DialogTitle className=>
                Thank you for reaching out
              </Module_components_ui_dialog_DialogTitle>
              <Module_components_ui_dialog_DialogDescription className=>
                Our team will contact you soon.
              </Module_components_ui_dialog_DialogDescription>
            </Module_components_ui_dialog_DialogHeader>
            <button type= onClick={() => onOpenChange(false)} className=>
              Close
            </button>
          </div>) : (<>
            <Module_components_ui_dialog_DialogHeader>
              <Module_components_ui_dialog_DialogTitle className=>
                Enquire about this workshop
              </Module_components_ui_dialog_DialogTitle>
              <Module_components_ui_dialog_DialogDescription className=>
                Tell us a little about yourself and the workshop you're interested in.
              </Module_components_ui_dialog_DialogDescription>
            </Module_components_ui_dialog_DialogHeader>
            <form onSubmit={handleSubmit} className=>
              <input name= required placeholder= className={Module_components_BookWorkshopCta_inputClass}/>
              <input name= type= required placeholder= className={Module_components_BookWorkshopCta_inputClass}/>
              <input name= type= placeholder= className={Module_components_BookWorkshopCta_inputClass}/>
              <input name= placeholder= className={Module_components_BookWorkshopCta_inputClass}/>
              <select name= required defaultValue= aria-label= className={Module_components_BookWorkshopCta_inputClass}>
                <option value= disabled>
                  Age group
                </option>
                <option value=>18-25</option>
                <option value=>25-35</option>
                <option value=>35-45</option>
                <option value=>Above 45</option>
              </select>
              <input name= placeholder= className={Module_components_BookWorkshopCta_inputClass}/>
              <textarea name= rows={} placeholder= className={Module_components_BookWorkshopCta_inputClass}/>
              {error && <p className=>{error}</p>}
              <button type= disabled={sending} className=>
                {sending ?  : }
              </button>
            </form>
          </>)}
      </Module_components_ui_dialog_DialogContent>
    </Module_components_ui_dialog_Dialog>);
}
function Module_components_BookWorkshopCta_BookWorkshopCta({ className = , label = , }: {
    className?: string;
    label?: string;
}) {
    const [open, setOpen] = useState(false);
    return (<div className={className}>
      <button type= onClick={() => setOpen(true)} className=>
        {label}
      </button>

      <Module_components_BookWorkshopCta_BookingDialog open={open} onOpenChange={setOpen}/>
    </div>);
}

// Module_components_RotatingPoints
const Module_components_RotatingPoints_diamond = asset_assets_balance_diamond_png;
const Module_components_RotatingPoints_TERMS = [, , ];
const Module_components_RotatingPoints_POINT_MS = ;
const Module_components_RotatingPoints_TERM_MS = ;
const Module_components_RotatingPoints_FADE_MS = ;
function Module_components_RotatingPoints_RotatingPoints() {
    const [step, setStep] = useState();
    const [visible, setVisible] = useState(true);
    const [termVisible, setTermVisible] = useState(true);
    useEffect(() => {
        let t: number;
        const isLastOfPoint = step ===  || step === Module_components_RotatingPoints_TERMS.length;
        const hold = step ===  ? Module_components_RotatingPoints_POINT_MS : Module_components_RotatingPoints_TERM_MS;
        if (isLastOfPoint) {
            t = window.setTimeout(() => setVisible(false), hold);
            const t2 = window.setTimeout(() => {
                setStep((s) => (s ===  ?  : ));
                setVisible(true);
            }, hold + Module_components_RotatingPoints_FADE_MS);
            return () => {
                window.clearTimeout(t);
                window.clearTimeout(t2);
            };
        }
        t = window.setTimeout(() => setTermVisible(false), hold - );
        const t2 = window.setTimeout(() => {
            setStep((s) => s + );
            setTermVisible(true);
        }, hold);
        return () => {
            window.clearTimeout(t);
            window.clearTimeout(t2);
        };
    }, [step]);
    return (<div className=>
      <p className= style={{ opacity: visible ?  : , transition: Module_components_RotatingPoints_FADE_MS }} aria-live=>
        <img src={Module_components_RotatingPoints_diamond} alt= aria-hidden= className=/>
        {step ===  ? (<span>Elevate their skill and knowledge</span>) : (<span>
            Enhance productivity in areas of{}
            <span className= style={{ opacity: termVisible ?  : , transition:  }}>
              {Module_components_RotatingPoints_TERMS[step - ]}
            </span>
          </span>)}
      </p>
    </div>);
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
    { src: Module_components_StylingWorkshops_daw1, alt:  }, { src: Module_components_StylingWorkshops_daw2, alt:  }, { src: Module_components_StylingWorkshops_daw3, alt:  }, { src: Module_components_StylingWorkshops_daw4, alt:  }, { src: Module_components_StylingWorkshops_daw5, alt:  }, { src: Module_components_StylingWorkshops_dawNew1, alt:  }, { src: Module_components_StylingWorkshops_dawNew2, alt:  }, { src: Module_components_StylingWorkshops_dawNew3, alt:  }, { src: Module_components_StylingWorkshops_dawNew4, alt:  },
];
function Module_components_StylingWorkshops_StylingWorkshops() {
    return (<section aria-label= className=>
      <div className=>
        <div className=>
          <Module_components_Reveal_Reveal>
            <p className=>
              Design Workshops &amp; Seminars
            </p>
          </Module_components_Reveal_Reveal>
          <Module_components_Reveal_Reveal delay={}>
            <h2 className=>
              <span className=>Design Aesthetics</span> &amp; Styling Workshops
            </h2>
          </Module_components_Reveal_Reveal>
          <Module_components_RotatingPoints_RotatingPoints />
          <Module_components_Reveal_Reveal delay={}>
            <p className=>
              For <span className=>TEAMS</span> of fashion and retail brands.
              <br className=/>{}
              For <span className=>Visual Merchandising teams</span>, such that the retail space
              <br className=/>{}
              look more attractive to shop &amp; experience.
              <br className=/>{}
              For <span className=>Sales team</span> such that they become stylists
              <br className=/>{}
              <br className=/>{}
              for the customers{}
              <span className=>and guide them as they shop.</span>
            </p>
          </Module_components_Reveal_Reveal>
        </div>

        <Module_components_Reveal_Reveal delay={}>
          <div className=>
            <Module_components_CurvedSlider_CurvedSlider images={Module_components_StylingWorkshops_FILM}/>
          </div>
        </Module_components_Reveal_Reveal>

        <Module_components_Reveal_Reveal delay={}>
          <Module_components_BookWorkshopCta_BookWorkshopCta />
        </Module_components_Reveal_Reveal>
      </div>
    </section>);
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
const Module_components_CorporateImageConsulting_VH = { title: , sub:  };
const Module_components_CorporateImageConsulting_RAYMOND = { title: , sub:  };
const Module_components_CorporateImageConsulting_IMAGES = [
    { src: Module_components_CorporateImageConsulting_c1, alt: , caption: Module_components_CorporateImageConsulting_VH }, {
        src: Module_components_CorporateImageConsulting_v1, alt: , caption: Module_components_CorporateImageConsulting_VH,
    }, {
        src: Module_components_CorporateImageConsulting_v2, alt: , caption: Module_components_CorporateImageConsulting_VH,
    }, {
        src: Module_components_CorporateImageConsulting_v3, alt: , caption: Module_components_CorporateImageConsulting_VH,
    }, {
        src: Module_components_CorporateImageConsulting_v4, alt: , caption: Module_components_CorporateImageConsulting_VH,
    }, {
        src: Module_components_CorporateImageConsulting_c6, alt: , caption: Module_components_CorporateImageConsulting_RAYMOND,
    }, {
        src: Module_components_CorporateImageConsulting_c7, alt: , caption: Module_components_CorporateImageConsulting_RAYMOND,
    },
];
const Module_components_CorporateImageConsulting_ribbonStatements = [
    , , , , ,
];
function Module_components_CorporateImageConsulting_CorporateImageConsulting() {
    const sectionRef = useRef<HTMLElement>(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const section = sectionRef.current;
        if (!section)
            return;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry?.isIntersecting) {
                setVisible(true);
                observer.disconnect();
            }
        }, { threshold: , rootMargin:  });
        observer.observe(section);
        return () => observer.disconnect();
    }, []);
    const reveal = visible ?  : ;
    return (<section ref={sectionRef} aria-labelledby= className=>
      <div className=>
        <div className=>
          <div>
            <p className={reveal}>
              Design Workshops &amp; Seminars
            </p>
            <h2 id= className={reveal}>
              <span className=>Corporate</span>
              <span className=>Image Consulting</span>
            </h2>
          </div>

          <p className={reveal}>
            We coach professionals to look sharp and stylish, build self confidence and have a
            personality that is magnetic. Through a combination of styling sessions and mindset
            coaching, professionals learn to command respect, and own their presence in meetings,
            presentations and high stake conversations.
          </p>

          
          <div className={reveal}>
            <Module_components_BookWorkshopCta_BookWorkshopCta className=/>
          </div>
        </div>

        <div className={visible ?  : }>
          <Module_components_CurvedSlider_CurvedSlider images={Module_components_CorporateImageConsulting_IMAGES} contain/>
        </div>
      </div>

      
      <div className= role=>
        <div className=>
          {[, ].map((copy) => (<div key={copy} aria-hidden={copy === } className=>
              {Module_components_CorporateImageConsulting_ribbonStatements.map((statement) => (<span key={statement} className=>
                  <span className=>
                    {statement}
                  </span>
                  <img src={Module_components_CorporateImageConsulting_diamond} alt= aria-hidden= className= loading=/>
                </span>))}
            </div>))}
        </div>
      </div>
    </section>);
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
    fit:  | ;
}[] = [
    { src: Module_components_PersonalImageConsulting_s1, alt: , fit:  }, { src: Module_components_PersonalImageConsulting_s2, alt: , fit:  }, { src: Module_components_PersonalImageConsulting_s3, alt: , fit:  }, { src: Module_components_PersonalImageConsulting_s4, alt: , fit:  }, { src: Module_components_PersonalImageConsulting_s5, alt: , fit:  },
];
const Module_components_PersonalImageConsulting_landscapeImages: {
    src: string;
    alt: string;
    fit:  | ;
}[] = [
    { src: Module_components_PersonalImageConsulting_slide2, alt: , fit:  }, { src: Module_components_PersonalImageConsulting_slide3, alt: , fit:  }, { src: Module_components_PersonalImageConsulting_slide4, alt: , fit:  }, { src: Module_components_PersonalImageConsulting_slide4_1, alt: , fit:  }, { src: Module_components_PersonalImageConsulting_slide5, alt: , fit:  },
];
const Module_components_PersonalImageConsulting_ribbonStatements = [
    , , , ,
];
function Module_components_PersonalImageConsulting_PersonalImageConsulting() {
    const sectionRef = useRef<HTMLElement>(null);
    const [visible, setVisible] = useState(false);
    const [activeImage, setActiveImage] = useState();
    useEffect(() => {
        const section = sectionRef.current;
        if (!section)
            return;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry?.isIntersecting) {
                setVisible(true);
                observer.disconnect();
            }
        }, { threshold: , rootMargin:  });
        observer.observe(section);
        return () => observer.disconnect();
    }, []);
    useEffect(() => {
        const reduceMotion = window.matchMedia();
        if (reduceMotion.matches)
            return;
        const interval = window.setInterval(() => {
            setActiveImage((current) => (current + ) % Module_components_PersonalImageConsulting_landscapeImages.length);
        }, );
        return () => window.clearInterval(interval);
    }, []);
    const reveal = visible ?  : ;
    const imageReveal = visible ?  : ;
    return (<section ref={sectionRef} aria-labelledby= className=>
      <div className=>
        <div className=>
          <div>
            <p className={reveal}>
              Design Workshops &amp; Seminars
            </p>
            <h2 id= className={reveal}>
              <span className=>
                Personal Image Consulting
              </span>
              <span className=>Master the Right Dress Code</span>
            </h2>
          </div>

          <p className={reveal}>
            "Master the Right Dress Code" is a highly visual and interactive seminar, sharing the
            design tools, such that the individual can make decisions for themselves, about which
            colour, fit and style shall suit their skin tone, height and body type.
            <span className=>
              Our styling seminars transform the way YOU dress up, such that your visual impact is
              more powerful and confident for your lifetime.
            </span>
          </p>
        </div>

        <div className=>
          <div className={imageReveal}>
            {Module_components_PersonalImageConsulting_landscapeImages.map((image, index) => (<img key={image.src} src={image.src} alt={image.alt} loading= decoding= style={{ objectFit: image.fit, objectPosition:  }} className={activeImage === index ?  : }/>))}
          </div>

          <div className={imageReveal}>
            {Module_components_PersonalImageConsulting_squareImages.map((image, index) => (<img key={image.src} src={image.src} alt={image.alt} loading= decoding= style={{ objectFit: image.fit, objectPosition:  }} className={activeImage % Module_components_PersonalImageConsulting_squareImages.length === index ?  : }/>))}
          </div>
        </div>
      </div>

      
      <div className= role=>
        <div className=>
          {[, ].map((copy) => (<div key={copy} aria-hidden={copy === } className=>
              {Module_components_PersonalImageConsulting_ribbonStatements.map((statement) => (<span key={statement} className=>
                  <span className=>
                    {statement}
                  </span>
                  <img src={Module_components_PersonalImageConsulting_diamond} alt= aria-hidden= className= loading=/>
                </span>))}
            </div>))}
        </div>
      </div>
      <Module_components_BookWorkshopCta_BookWorkshopCta />
    </section>);
}

// Module_components_OwnYourSpotlight
const Module_components_OwnYourSpotlight_s1 = asset_assets_oys_1_png;
const Module_components_OwnYourSpotlight_s2 = asset_assets_oys_2_png;
const Module_components_OwnYourSpotlight_s3 = asset_assets_oys_3_png;
const Module_components_OwnYourSpotlight_s4 = asset_assets_oys_4_png;
const Module_components_OwnYourSpotlight_s5 = asset_assets_oys_5_png;
const Module_components_OwnYourSpotlight_SLIDES = [Module_components_OwnYourSpotlight_s1, Module_components_OwnYourSpotlight_s2, Module_components_OwnYourSpotlight_s3, Module_components_OwnYourSpotlight_s4, Module_components_OwnYourSpotlight_s5];
function Module_components_OwnYourSpotlight_OwnYourSpotlight() {
    const [idx, setIdx] = useState();
    useEffect(() => {
        const t = setInterval(() => setIdx((i) => (i + ) % Module_components_OwnYourSpotlight_SLIDES.length), );
        return () => clearInterval(t);
    }, []);
    return (<section aria-labelledby= className=>
      <div className=>
        <div className=>
          <div>
            <Module_components_Reveal_Reveal>
              <p className=>
                Design Workshops &amp; Seminars
              </p>
            </Module_components_Reveal_Reveal>
            <Module_components_Reveal_Reveal delay={}>
              <h2 id= className=>
                <span className=>Own</span> Your Spotlight Webinar
              </h2>
            </Module_components_Reveal_Reveal>
          </div>
          <div>
            <Module_components_Reveal_Reveal delay={}>
              <p className=>
                We coach professionals to look sharp and stylish, build self confidence and have a
                personality that is magnetic, as they meet and interact with world.
              </p>
            </Module_components_Reveal_Reveal>
          </div>
        </div>

        <Module_components_Reveal_Reveal delay={}>
          <div className=>
            {Module_components_OwnYourSpotlight_SLIDES.map((src, i) => (<img key={src} src={src} alt={i === idx ?  : } aria-hidden={i !== idx} className={i === idx ?  : }/>))}
          </div>
        </Module_components_Reveal_Reveal>
        <Module_components_BookWorkshopCta_BookWorkshopCta />
      </div>
    </section>);
}

// Module_components_RedEditorialService
const Module_components_RedEditorialService_logoMark = asset_assets_balance_logo_mark_png;
function Module_components_RedEditorialService_padImages<T>(list: T[]): T[] {
    if (list.length === )
        return list;
    const out = [...list];
    while (out.length < )
        out.push(...list);
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
    imageFit?:  | ;
    wideDescription?: boolean;
    ctaLabel?: string;
};
function Module_components_RedEditorialService_SingleImageSlideshow({ images, label }: {
    images: Module_components_RedEditorialService_ServiceImage[];
    label: string;
}) {
    const oddLast = images.length %  ===  && images.length > ;
    return (<div className= aria-label={label}>
      {images.map((image, i) => {
        const wide = oddLast && i === images.length - ;
        return (<figure key={image.src} className={wide ?  : i %  ===  && !wide ?  : }>
            <img src={image.src} alt={image.alt} loading= decoding= className=/>
          </figure>);
    })}
    </div>);
}
const Module_components_RedEditorialService_AUTOPLAY_DELAY = ;
function Module_components_RedEditorialService_EditorialCarousel({ images, label }: {
    images: Module_components_RedEditorialService_ServiceImage[];
    label: string;
}) {
    const [position, setPosition] = useState();
    const [animated, setAnimated] = useState(true);
    const [paused, setPaused] = useState(false);
    const [timerKey, setTimerKey] = useState();
    const track = [images[images.length - ], ...images, images[]].filter((image): image is Module_components_RedEditorialService_ServiceImage => Boolean(image));
    const move = useCallback((direction: number, manual = false) => {
        setAnimated(true);
        setPosition((current) => current + direction);
        if (manual)
            setTimerKey((current) => current + );
    }, []);
    useEffect(() => {
        if (paused || images.length < )
            return;
        const timer = window.setInterval(() => move(), Module_components_RedEditorialService_AUTOPLAY_DELAY);
        return () => window.clearInterval(timer);
    }, [images.length, move, paused, timerKey]);
    const settleLoop = () => {
        if (position === ) {
            setAnimated(false);
            setPosition(images.length);
        }
        else if (position === images.length + ) {
            setAnimated(false);
            setPosition();
        }
    };
    const activeIndex = (position -  + images.length) % images.length;
    const carouselStyle = { : position } as CSSProperties;
    return (<div className= aria-label={label} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className={animated ?  : } style={carouselStyle} onTransitionEnd={settleLoop}>
        {track.map((image, index) => {
        const logicalIndex = (index -  + images.length) % images.length;
        const isActive = logicalIndex === activeIndex && index === position;
        return (<figure key={image.srcindex} className={isActive ?  : } aria-hidden={!isActive}>
              <img src={image.src} alt={isActive ? image.alt : } className= loading={index <  ?  : } decoding=/>
            </figure>);
    })}
      </div>

      {images.length >  && (<>
          <Module_components_ui_button_Button type= variant= size= aria-label={label} onClick={() => move(-, true)} className=>
            <ArrowLeft aria-hidden=/>
          </Module_components_ui_button_Button>
          <Module_components_ui_button_Button type= variant= size= aria-label={label} onClick={() => move(, true)} className=>
            <ArrowRight aria-hidden=/>
          </Module_components_ui_button_Button>
        </>)}
    </div>);
}
function Module_components_RedEditorialService_RedEditorialService({ eyebrow, sectionLabel, headline, description, images, single = false, imageFit = , wideDescription = false, ctaLabel = , }: Module_components_RedEditorialService_RedEditorialServiceProps) {
    return (<section className= aria-label={sectionLabel ?? (typeof eyebrow ===  && eyebrow ? eyebrow : )}>
      <div className=>
        <Module_components_Reveal_Reveal>
          <img src={Module_components_RedEditorialService_logoMark} alt= data-bg-logo className= width={} height={}/>
        </Module_components_Reveal_Reveal>
        {eyebrow && (<Module_components_Reveal_Reveal delay={}>
            <p className=>{eyebrow}</p>
          </Module_components_Reveal_Reveal>)}
        <Module_components_Reveal_Reveal delay={}>
          <h2 className=>
            {headline}
          </h2>
        </Module_components_Reveal_Reveal>
        <div className={wideDescription ?  : }>
          {description && (<Module_components_Reveal_Reveal delay={}>
              <p className=>
                {description}
              </p>
            </Module_components_Reveal_Reveal>)}
        </div>
      </div>

      <Module_components_Reveal_Reveal delay={} className=>
        <Module_components_CurvedSlider_CurvedSlider images={Module_components_RedEditorialService_padImages(images)} imageFit={imageFit}/>
      </Module_components_Reveal_Reveal>
      <Module_components_BookWorkshopCta_BookWorkshopCta className= label={ctaLabel}/>
    </section>);
}

// Module_components_AboutMe
const Module_components_AboutMe_aboutMe1 = asset_assets_about_me_1_jpg;
const Module_components_AboutMe_aboutMe2 = asset_assets_about_me_2_jpg;
const Module_components_AboutMe_PORTRAITS = [
    {
        src: Module_components_AboutMe_aboutMe1, alt: , position: ,
    }, {
        src: Module_components_AboutMe_aboutMe2, alt: , position: ,
    },
];
const Module_components_AboutMe_AUTOPLAY_MS = ;
function Module_components_AboutMe_AboutMe() {
    const [active, setActive] = useState();
    const [timerKey, setTimerKey] = useState();
    const [reducedMotion, setReducedMotion] = useState(false);
    useEffect(() => {
        const media = window.matchMedia();
        const update = () => setReducedMotion(media.matches);
        update();
        media.addEventListener(, update);
        return () => media.removeEventListener(, update);
    }, []);
    useEffect(() => {
        if (reducedMotion)
            return;
        const interval = window.setInterval(() => setActive((current) => (current + ) % Module_components_AboutMe_PORTRAITS.length), Module_components_AboutMe_AUTOPLAY_MS);
        return () => window.clearInterval(interval);
    }, [reducedMotion, timerKey]);
    const selectPortrait = (index: number) => {
        setActive(index);
        setTimerKey((key) => key + );
    };
    return (<section aria-labelledby= className=>
      <div className=>
        <Module_components_Reveal_Reveal className=>
          <div className=>
            <h2 id= className=>
              About the Founder:
            </h2>
            <p className=>
              With close to three decades of experience in the fashion and apparel industry, Upma
              Shrian has specialized in defining design direction that aligns with business strategy
              and evolving consumer trends. She also imparts training to enhance team performance in
              the Apparel and Fashion Industry.
            </p>
          </div>
        </Module_components_Reveal_Reveal>

        <Module_components_Reveal_Reveal delay={} className=>
          <div className=>
            {Module_components_AboutMe_PORTRAITS.map((portrait, index) => (<img key={portrait.src} src={portrait.src} alt={portrait.alt} width={} height={} loading={index ===  ?  : } decoding= className={portrait.position} style={{
        opacity: active === index ?  : , transform: reducedMotion ? undefined : active === index ?  : , transition: reducedMotion ?  : ,
    }}/>))}

            <div className= aria-label=>
              {Module_components_AboutMe_PORTRAITS.map((portrait, index) => (<Module_components_ui_button_Button key={portrait.src} type= variant= size= onClick={() => selectPortrait(index)} aria-label={index + } aria-current={active === index ?  : undefined} className=>
                  <span className={active === index ?  : }/>
                </Module_components_ui_button_Button>))}
            </div>
          </div>
        </Module_components_Reveal_Reveal>

        <Module_components_Reveal_Reveal delay={}>
          <div className=>
            <div aria-hidden= className=>
              <span className=/>
              <span className=/>
              <span className=/>
            </div>
            <p className=>
              Her mission is to transform creativity into measurable business impact. Whether it’s
              launching a new label, crafting consumer-centric brand stories, scaling design
              processes for growth, directing design teams, or mentoring the next generation of
              fashion leaders.
            </p>
            <p aria-hidden= className= style={{ fontFamily:  }}>
              Upma Shrian
            </p>
          </div>
        </Module_components_Reveal_Reveal>
      </div>
    </section>);
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
    { src: dws1, alt:  }, { src: dws2, alt:  }, { src: dws3, alt:  }, { src: dws4, alt:  }, { src: dws5, alt:  }, { src: dws6, alt:  }, { src: dws7, alt:  }, { src: dws8, alt:  }, { src: dws9, alt:  },
];
export const Route = createFileRoute()({
    head: () => ({
        meta: [
            { title:  }, {
                name: , content: ,
            }, { property: , content:  }, {
                property: , content: ,
            }, { property: , content:  }, { name: , content:  },
        ],
    }), component: Index,
});
const TREND_IMAGES = [
    { src: trend1606, alt:  }, { src: trend1607, alt:  }, { src: trend1612, alt:  }, { src: trend1613, alt:  }, { src: trend1614, alt:  }, { src: trend1615, alt:  }, { src: trend1616, alt:  }, { src: trend1629, alt:  }, { src: trend1630, alt:  }, { src: trend1631, alt:  },
];
const GRAPHIC_IMAGES = [
    { src: graphic1Asset, alt:  }, { src: graphic2Asset, alt:  }, { src: graphic3Asset, alt:  }, { src: graphic4Asset, alt:  }, { src: graphic6Asset, alt:  }, { src: graphic7Asset, alt:  }, { src: graphic10Asset, alt:  },
];
function Index() {
    const [introComplete, setIntroComplete] = useState(false);
    const [introDone, setIntroDone] = useState(false);
    const revealHero = useCallback(() => { }, []);
    const finishIntro = useCallback(() => setIntroComplete(true), []);
    const doneIntro = useCallback(() => setIntroDone(true), []);
    return (<main>
      <Module_components_LogoIntro_LogoIntro onReveal={revealHero} onComplete={finishIntro} onFinish={doneIntro}/>
      <div className=>
        <Module_components_SiteHeader_SiteHeader introComplete={introComplete} logoVisible={introDone}/>
        <Module_components_Hero_Hero />
        <Module_components_ScrollStory_ScrollStory>
          <Module_components_SlideStack_SlideStack>
            <Module_components_SlideStack_SlidePanel>
            <section id= tabIndex={-} className=>
              <Module_components_Reveal_Reveal>
                <Module_components_LogoMark_LogoMark className=/>
              </Module_components_Reveal_Reveal>
              <Module_components_Reveal_Reveal delay={}>
                <h2 className=>
                  Design workshops &amp; seminars
                </h2>
              </Module_components_Reveal_Reveal>
              <Module_components_Reveal_Reveal delay={}>
                <p className=>
                  Are conducted For TEAMS of Apparel and Fashion Brands
                  <br />
                  in areas of <span className=>Design Aesthetics, Fashion Styling and Trend Forecasting</span>.
                </p>
              </Module_components_Reveal_Reveal>
              <Module_components_Reveal_Reveal delay={}>
                <div className=>
                  <Module_components_CurvedSlider_CurvedSlider images={WORKSHOP_IMAGES} contain/>
                </div>
              </Module_components_Reveal_Reveal>
              <Module_components_Reveal_Reveal delay={}>
                <Module_components_BookWorkshopCta_BookWorkshopCta className=/>
              </Module_components_Reveal_Reveal>
            </section>
          </Module_components_SlideStack_SlidePanel>
          </Module_components_SlideStack_SlideStack>

          <Module_components_StylingWorkshops_StylingWorkshops />

          <Module_components_CorporateImageConsulting_CorporateImageConsulting />

          <Module_components_PersonalImageConsulting_PersonalImageConsulting />

          <Module_components_OwnYourSpotlight_OwnYourSpotlight />

          <section id= className=>
            <Module_components_RedEditorialService_RedEditorialService headline={<>
                  <span className=>Trend Forecasting</span> &amp;
                  <br />
                  Line Presentation
                </>} description= images={TREND_IMAGES} imageFit= wideDescription ctaLabel=/>
            <Module_components_RedEditorialService_RedEditorialService sectionLabel= headline={<>
                  <span className=>Graphic &amp;</span>
                  <br />
                  Print Design
                </>} description= images={GRAPHIC_IMAGES} imageFit= ctaLabel=/>
          </section>

          

          <Module_components_AboutMe_AboutMe />
          <Module_components_ScrollStory_StoryScene className=>
            <Module_components_Testimonials_Testimonials />
          </Module_components_ScrollStory_StoryScene>
          <Module_components_ScrollStory_StoryScene className=>
            <Module_components_CtaSection_CtaSection />
          </Module_components_ScrollStory_StoryScene>
        </Module_components_ScrollStory_ScrollStory>
      </div>
      <Module_components_SiteFooter_SiteFooter />
    </main>);
}

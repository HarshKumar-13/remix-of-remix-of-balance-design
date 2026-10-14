import { useRef } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ArrowDown, X } from "lucide-react";
import { Dialog, DialogPortal, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export type ExpandedHeroImage = { src: string; alt: string; trigger: HTMLElement };

export function HeroImageLightbox({ image, onClose, onExplore, onAfterClose }: { image: ExpandedHeroImage | null; onClose: () => void; onExplore?: () => void; onAfterClose?: () => void }) {
  const trigger = useRef<HTMLElement | null>(null);
  if (image) trigger.current = image.trigger;
  return (
    <Dialog open={image !== null} onOpenChange={open => { if (!open) onClose(); }}>
      <DialogPortal>
        <DialogPrimitive.Overlay className="hero-lightbox-backdrop" />
        <DialogPrimitive.Content className="hero-lightbox" aria-describedby={undefined}
          onCloseAutoFocus={event => { event.preventDefault(); trigger.current?.focus({ preventScroll: true }); onAfterClose?.(); }}>
          <DialogTitle className="sr-only">{image?.alt}</DialogTitle>
          {image && <img src={image.src} alt={image.alt} className="hero-lightbox-image" />}
          <DialogClose asChild>
            <Button variant="secondary" size="icon" className="hero-lightbox-close" aria-label="Close expanded image" title="Close expanded image">
              <X aria-hidden="true" />
            </Button>
          </DialogClose>
          {onExplore && <Button variant="secondary" className="hero-lightbox-explore" onClick={onExplore}>SCROLL TO EXPLORE <ArrowDown aria-hidden="true" /></Button>}
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}
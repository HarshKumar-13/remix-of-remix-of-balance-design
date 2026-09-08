# Refine Design & Motion for Launch

Goal: polish the Balance Design landing page toward a bold, cinematic, luxury editorial feel while keeping the existing ivory/charcoal/red mood. Focus on the four areas the user flagged.

## 1. Audit the current motion system
- Review `src/styles.css` tokens and existing animation utilities.
- Check `Reveal.tsx`, `ServiceChapter.tsx`, `EditorialCarousel.tsx`, `Hero.tsx`, and `SiteHeader.tsx` for current motion patterns.
- Identify gaps: easing curves, stagger timing, parallax depth, carousel drag physics.

## 2. Hero impact — bold & cinematic
- Increase hero parallax range and add a slow Ken Burns zoom on the active slide.
- Introduce a refined text reveal for the headline and sub-line on load/transition.
- Keep the large "BALANCE" headline but add subtle split-character or word stagger on first paint.
- Ensure the CTA buttons have a confident hover state (underline sweep, slight lift).

## 3. Scroll animations
- Replace or augment `Reveal` with a more theatrical fade-up + translate-y + slight scale.
- Add section-level stagger so labels, headlines, descriptions, and CTAs enter in sequence.
- Use a custom cubic-bezier (`cubic-bezier(0.16, 1, 0.3, 1)`) for an editorial "snap" finish.
- Add gentle parallax to selected large images (About section, selected work).

## 4. Service carousels
- Improve drag/swipe physics with momentum and snap-to-slide behavior.
- Add slide counter and subtle prev/next arrows.
- Scale the active slide up slightly while dragging; dim non-active slides.
- Ensure images are edge-to-edge and never cropped awkwardly on mobile.

## 5. Mobile & typography polish
- Audit headline sizing on mobile so "BALANCE" remains large but never overflows.
- Tighten line-height and letter-spacing for editorial headlines.
- Ensure tap targets are at least 44px and carousels are swipeable.
- Fix any section spacing inconsistencies between breakpoints.

## 6. Verify & publish-readiness
- Run the build and check `/tmp/observability/build-errors.log`.
- Test hero, carousels, and scroll behavior in desktop and mobile preview.
- Confirm no layout shifts or broken crops.

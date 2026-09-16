# Balance homepage client corrections

## Scope
Update only the homepage entry sequence and requested second-section content. Preserve the existing visual system, section layouts, content, scroll effects, and all other pages.

## Changes
1. **Logo introduction**
   - Add a full-viewport, non-layout-shifting intro layer on the homepage.
   - Start with the existing light Balance logo centered, hold it briefly, then animate it with GSAP to the exact live navbar-logo position using measured screen coordinates.
   - Keep the real navbar logo hidden only during the transfer, reveal it at the handoff, then uncover the unchanged hero and start its existing entrance animation.
   - Play once per page entry, never on scroll; skip or shorten motion for reduced-motion users and keep mobile sizing responsive.

2. **Remove client strip**
   - Remove the `LogoMarquee` section from the homepage render only, keeping its component and image assets intact for later reuse.
   - Preserve balanced spacing by leaving the existing second-section spacing unchanged.

3. **Second-section label**
   - Replace “Services” with “Fashion & Apparel Workshops”.
   - Increase only this label from the shared 15px label size to 17px, without changing its family, weight, color, or alignment.

## Technical details
- Coordinate the intro state from the homepage so the existing header and hero can hand off cleanly without duplicate visible logos.
- Use the installed GSAP package for the measured center-to-navbar animation and clean up the timeline on unmount.
- Do not alter the existing service-panel `ScrollTrigger` behavior.

## Verification
- Check desktop and mobile viewport screenshots at the intro, handoff, and completed hero states.
- Confirm the client strip is absent, the updated label is 17px, layout dimensions remain stable, normal scroll animation still works, and no browser console errors occur.

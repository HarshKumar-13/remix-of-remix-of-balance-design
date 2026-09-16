# Fashion & Apparel Workshops service page

## Scope
Preserve the current Balance website and implement only the requested homepage updates plus a new editorial service page at `/services/fashion-apparel-workshops`.

## Homepage updates
- Keep the current full-screen logo introduction and center-to-navbar handoff, tightening its completion handoff only if verification finds a mismatch.
- Keep the client/logo strip excluded from the homepage without deleting its component or assets.
- Retain the second-section label “Fashion & Apparel Workshops” at 17px, exactly 2px above the shared 15px label size.
- Add an “Explore More” CTA in the existing Balance interaction style, linking internally to the new service page without altering the section layout or other content.

## New service detail page
- Create the dedicated route with its own search/social metadata, existing header, and existing footer.
- Build a white, spacious editorial hero with the supplied eyebrow, headline, supporting text, and two unequal, offset images.
- Add the supplied introduction as an asymmetric large-image/small-image/text composition.
- Present the six supplied questions as an alternating, scroll-led editorial sequence rather than cards.
- Add the supplied key statement as a large magazine-style image-and-type spread.
- Add the supplied workshop introduction with one tall image, one smaller detail image, and text placed in the surrounding whitespace.
- Present the three supplied goals as numbered alternating editorial chapters with varied image proportions.
- Finish with the supplied primary and secondary calls to action; “Explore Our Services” returns to `/#services`.

## Images and motion
- Reuse the strongest existing Balance fashion, styling, workshop, fabric, and professional imagery; do not replace or alter existing homepage assets.
- Use varied portrait, landscape, tall, and detail crops with generous whitespace and asymmetric placement.
- Reuse the site’s restrained reveal language: clipped image entrances, subtle 0.96-to-1 settling, staged text movement, and reduced-motion fallbacks.
- Keep the page naturally scrollable and simplify offsets/animation on smaller screens.

## Technical details
- Add the route file first so every new internal link remains valid and type-safe.
- Keep styling semantic and scoped to the new page, using the current design tokens, typefaces, buttons, header, and footer.
- Avoid new packages and avoid changes to unrelated homepage sections or shared visual rules.

## Verification
- Check the logo intro handoff, hidden logo strip, 17px label, CTA destination, and existing homepage scroll behavior.
- Check the new page at desktop, tablet, and mobile widths for image loading, readable typography, intentional whitespace, touch-friendly CTAs, no overlap, and no horizontal scrolling.
- Confirm all supplied copy appears exactly, links work, reduced-motion is respected, metadata is present, and the browser console is clean.

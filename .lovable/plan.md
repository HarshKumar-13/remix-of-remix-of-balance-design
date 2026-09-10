# Cinematic Scroll Storytelling

Enhance only the homepage scrolling behavior while preserving its current sections, content, images, typography, colors, header, footer, and carousel behavior.

## Scroll-linked scene system
- Add a reusable wrapper that measures each existing homepage section against the viewport and exposes reversible scroll progress.
- Use that progress to gently translate, scale, fade, and layer outgoing and incoming content.
- Keep the document in normal vertical flow; no permanent sticky page, horizontal page scrolling, or changed section order.

## Homepage transitions
- Apply the wrapper around the existing hero, introduction, each service chapter, About, Testimonials, and final CTA.
- Let adjacent scenes overlap visually only during their transition window, with controlled depth and clipping so each handoff feels continuous.
- Strengthen the requested handoffs: Hero → Introduction, Introduction → Services, Service → Service, Services → About, About → Testimonials, and Testimonials → CTA.
- Preserve each section’s internal carousel, links, imagery, spacing, and existing layout.

## Motion treatment
- Drive progress directly from scroll position so movement reverses naturally when scrolling upward.
- Use slow editorial easing, restrained image depth, small text offsets, subtle scale, and opacity changes.
- Retain existing entrance animations while preventing conflicts with the new scene transforms.
- Respect reduced-motion preferences by disabling scroll transforms.

## Mobile and performance
- Reduce movement distance, scale changes, and overlap on smaller screens while keeping the storytelling sequence.
- Use one passive, animation-frame-throttled scroll observer for the page rather than separate heavy listeners per scene.
- Avoid layout-shifting properties and animate only transforms, opacity, and clipping.

## Verification
- Check the homepage at desktop and mobile sizes through the full scroll journey.
- Confirm no horizontal scrollbar, no persistent sticky behavior, no carousel regression, no overlaps after transitions, and no browser errors.

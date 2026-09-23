# About Me editorial section

## Build
- Add a new homepage section immediately before the existing About Balance section.
- Preserve the exact desktop composition: left biography, dominant portrait carousel, right mission statement.
- Use the supplied copy verbatim and reuse the strongest existing portrait-oriented fashion imagery.
- Add a fixed-size 3-second crossfade carousel with clickable overlay dots that reset autoplay.
- Add restrained reveal motion for the left copy, center image, and right copy.
- Stack the content in the requested order on mobile while preserving the portrait image ratio.

## Technical details
- Create a focused `AboutMe` component and add it only to the homepage.
- Use existing semantic colors and typography; no global style, navigation, or unrelated section changes.
- Respect reduced-motion preferences and verify desktop/mobile layout, image loading, autoplay, dot controls, overflow, and build status.

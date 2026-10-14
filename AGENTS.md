<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep user-supplied site media as source-controlled files under `src/assets` when portability to GitHub, local downloads, and Vercel is required; this avoids host-specific asset URLs.
- AI features call Lovable AI Gateway from server-only *.server.ts modules (Responses API, streamed) behind createServerFn in *.functions.ts; keeps the API key off the client.
- Use the existing GSAP entrance timeline for the loader, grid reveal and continuous grid travel; one clock prevents competing transform owners.

- Keep the homepage grid hero outside ScrollStory/SlideStack in normal page flow, followed immediately by Services; only the loader locks page scroll, and no default grid image transfers into a separate banner.
- Keep grid interactions on the existing entrance timeline with native passive gallery listeners; manual input, offscreen visibility and image dialogs pause that clock without intercepting page scroll or resetting transforms.
- Keep LogoIntro mounted after loading to own the persistent grid clock; hide its completed loader layer instead of unmounting the animation owner.
- The grid and image dialog share a Services cue; close the dialog and release its scroll lock before navigating, with focus restoration using preventScroll to retain the grid position.

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
- Use a GSAP timeline for the opening sequence and coordinated hero loop, with Motion AnimatePresence for phrase exits; one clock keeps imagery and typography choreographed without unrelated timers.

- Keep the homepage opening outside ScrollStory/SlideStack: LogoIntro transfers the actual grid image into Hero, and useHeroScroll owns native sticky banner expansion without competing parent transforms.
- Keep grid interactions on the existing entrance timeline with native gallery listeners (the gallery is temporarily reparented); modal and manual input pause that clock and retain its transforms, avoiding competing motion owners.

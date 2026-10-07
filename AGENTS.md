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

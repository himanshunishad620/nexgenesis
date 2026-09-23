# Stage 1 — Project setup

## What's in this stage
- A bare Vite + React project (no router, no axios, no pages yet)
- Tailwind CSS wired up and confirmed working (`postcss.config.js`,
  `tailwind.config.js`, the `@tailwind` directives in `src/index.css`)
- `src/App.jsx` renders one card, styled with Tailwind classes, as proof
  the whole pipeline (Vite → React → Tailwind) is working

## Why this is its own stage
Everything else in the assignment depends on this working first. If
Tailwind classes don't apply, or the dev server won't start, you want
to know that *before* you've also added routing, axios and five pages
on top of it — much easier to debug one thing at a time.

## How to run it
```bash
npm install
npm run dev
```
Open the printed URL. You should see a white card with "Product Admin
Dashboard" in blue, on a light gray background. If the background is
plain white/unstyled, Tailwind isn't wired up correctly — check
`tailwind.config.js`'s `content` array and `src/index.css`.

## What to look at before you commit
- `package.json` — only `react`, `react-dom` as real dependencies;
  everything else here is a build tool (Vite, Tailwind, PostCSS)
- `src/main.jsx` — the actual entry point; it mounts `<App />` into the
  `#root` div from `index.html`
- `src/App.jsx` — will be replaced with real routing in Stage 3, so
  don't worry about it being a placeholder

## Suggested commit message
`chore: set up Vite, React and Tailwind`

# Hireloop — Agent Quickstart

This file contains high-signal guidance for future OpenCode sessions. If a line doesn't help an agent avoid mistakes or ramp up quickly, it's omitted.

## Commands

| Command | Result |
|---|---|
| `npm run dev` | Starts Next.js dev server (http://localhost:3000) |
| `npm run build` | Runs Next.js build |
| `npm run start` | Starts production server |
| `npm run lint` | Runs ESLint |
| `npm run format` | Runs Prettier on `**/*.{ts,tsx}` |
| `npm run typecheck` | Runs `tsc --noEmit` |

## Project structure

- **App router** (Next.js 16): `app/` — pages, API routes, and layout
- **Components**: `components/ui/` — shadcn/ui primitives (button, etc.)
- **Lib**: `app/lib/` — auth (`auth.ts`, `auth-client.ts`) and utils (`utils.ts`)
- **CSS**: `app/globals.css` — Tailwind v4 base; Prettier plugin tailwind configured here
- **Env**: `.env` must define `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, `BETTER_AUTH_URL`

## Key conventions

- `@/` aliases repo root (tsconfig `paths: { "@/*": ["./*"] }`)
- Tailwind CSS **v4** — config is in `postcss.config.mjs`; no `tailwind.config.ts`
- `cn` utility from the `cn` package is used everywhere for class merging
- `class-variance-authority` (cva) powers button variants and `cn` tailwind integration
- `next-themes` provides dark mode; toggle with **⌘D / Ctrl+D** ( ThemeHotkey in `components/theme-provider.tsx`)
- Better-auth with MongoDB adapter — **MongoDB must be running locally** on `mongodb://localhost:27017/database`
- App router: `app/api/auth/[...all]/route.ts` wires `better-auth` to Next.js handlers
- Imports use `@/` prefix per tsconfig paths

## Environment setup

Copy `.env.example` (or ask the team) and set:

```
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...
BETTER_AUTH_URL=http://localhost:3000
```

MongoDB must be accessible at `mongodb://localhost:27017/database`.

## Developer workflow

> **Order matters:** `lint` → `typecheck` → `test` (if tests exist). Currently no test script is configured.

1. `npm run dev` to spin up the server
2. Edit components under `components/ui/` — `shadcn` add/remove works via `npx shadcn@latest add <component>`
3. Dark mode toggles with ⌘D / Ctrl+D when focus is not in an input/textarea/select
4. Run `npm run lint` / `npm run typecheck` / `npm run format` before committing

## Things an agent might misstep on

- **Assuming Tailwind config is in `tailwind.config.ts`** — it's inlined into PostCSS via `postcss.config.mjs`. Don't look for a separate config file.
- **Assuming `better-auth` is pre-configured** — it creates its own MongoDB client; ensure `.env` vars are set and MongoDB is running.
- **Missing the dark-mode hotkey** — the `ThemeHotkey` component listens for ⌘D / Ctrl+D globally; it won't trigger if the cursor is inside a form control.
- **Thinking `@/` maps to `src/`** — it maps to the repo root; imports like `import { cn } from "@/lib/utils"` resolve to `app/lib/utils.ts`.
- **Running `npm test`** — no test script exists in `package.json`. Don't be surprised if it's not defined.
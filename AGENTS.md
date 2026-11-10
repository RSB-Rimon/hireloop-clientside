# Hireloop — Agent Quickstart

Single Next.js app (no monorepo, no workspace). Stack: **Next.js 16.4.4** App Router (Turbopack), React 19, TypeScript `strict`, Tailwind v4, shadcn/ui style `base-nova` (**Base UI, not Radix**), better-auth + MongoDB adapter.

CLAUDE.md is just `@AGENTS.md` — edit this file only.

## Commands

| Command | Notes |
|---|---|
| `npm run dev` | `next dev` → http://localhost:3000 |
| `npm run build` | `next build` — **runs TS typecheck**, so it fails while the tree is red (see Baseline) |
| `npm run start` | `next start` (needs a successful build) |
| `npm run lint` | `eslint` with **no path argument** → lints the whole repo |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run format` | `prettier --write "**/*.{ts,tsx}"` — write-only; there is no `format:check` script |

- **No test script, no CI, no husky/lint-staged.** Nothing runs automatically — run lint/typecheck yourself before calling work done.
- `npx shadcn@latest add <component>` works (shadcn is a local dependency; `components.json` pins style `base-nova`). `npx cn build --help` is also available (needs Node 22+).

## Layout

```
app/
  page.tsx                     re-exports ./home/page — landing page lives in app/home/page.tsx
  (auth)/sign-in|sign-up/      route group → URLs are /sign-in and /sign-up
  dashboard/                   layout.tsx + seeker/ recruiter/ admin/ (all stubs)
  api/auth/[...all]/route.ts   better-auth handler (exports POST, GET)
  lib/auth.ts                  server betterAuth config: Mongo client, role field, GitHub provider
  lib/auth-client.ts           client authClient + inferAdditionalFields plugin
  globals.css                  Tailwind v4 theme (oklch tokens)
components/ui/                 shadcn components (Base UI based)
components/                    theme-provider.tsx, site-navbar.tsx
hooks/use-mobile.ts            sidebar breakpoint hook
lib/utils.ts                   export { cn } from "cn"
```

`@/*` maps to the **repo root** (`tsconfig.json` `paths`). So `@/lib/utils` → `lib/utils.ts`, `@/hooks/use-mobile` → `hooks/use-mobile.ts`. There is **no** `app/lib/utils.ts` — `app/lib/` holds only `auth.ts` and `auth-client.ts`.

## Conventions that differ from the defaults you'd guess

- **Base UI, not Radix.** `components/ui/*` import from `@base-ui/react/*`. Compose with the `render` prop — `<Button render={<Link href="/x" />}>` — Radix's `asChild` does not exist here (same for `SidebarMenuButton render={<a />}`).
- **`cn` is the standalone `cn` npm package** (v0.5.2, replaces `clsx` + `tailwind-merge`; neither is installed). `lib/utils.ts` re-exports it; `components/ui/*` import `{ cn } from "cn"` directly. Tailwind v4 only.
- **Tailwind v4** — there is no `tailwind.config.ts`; config is inlined in `postcss.config.mjs` and tokens live in `app/globals.css`, which imports `shadcn/tailwind.css` (the `shadcn` package is a **runtime dependency**, not just a CLI) and `tw-animate-css`.
- **Prettier** (`.prettierrc`): no semicolons, double quotes, 80 cols, LF. `prettier-plugin-tailwindcss` sorts classes inside `cn(...)`/`cva(...)` calls (`tailwindFunctions`).
- **Formatting is not enforced.** 17 ts/tsx files currently fail `prettier --check`. Don't run `npm run format` repo-wide for a small change — it produces a huge unrelated diff.
- Dark mode is `next-themes` with `attribute="class"`; **⌘D / Ctrl+D** toggles it via `ThemeHotkey` in `components/theme-provider.tsx` (ignored while the cursor is in a field).

## Baseline health — the tree is currently RED

These failures predate any change you make; don't chase them as regressions:

- `npm run typecheck` → `app/(auth)/sign-up/page.tsx:36` — `role` is typed `string`, but better-auth's `inferAdditionalFields` narrows it to `"seeker" | "recruiter" | "admin" | null`.
- `npm run lint` → 1 error + 5 warnings: `hooks/use-mobile.ts` violates `react-hooks/set-state-in-effect`; `app/components/DashboardSidebar.tsx` has unused vars.
- `npm run build` fails as a consequence (Next typechecks during build).

## Auth & data model

- User `role` is `seeker | recruiter | admin`, default `seeker` (`user.additionalFields` in `app/lib/auth.ts`).
- Self-signup as `admin` is blocked **server-side** by a better-auth `before` hook (`ADMIN_ROLE_RESTRICTED`); the sign-up radio is disabled too. Admins can only be created by an existing admin.
- Email + password is enabled; a GitHub social provider is also configured.
- Mongo: `new MongoClient(process.env.MONGODB_URI)` in `app/lib/auth.ts`, database name `hireloopdb`.
- Dashboard pages are stubs and `DashboardSidebar`'s role menu is an empty array with its render loop commented out.

## Environment

There is **no `.env.example`**, and `.env*` is gitignored — create `.env` yourself:

```
BETTER_AUTH_SECRET=...
BETTER_AUTH_URL=http://localhost:3000
MONGODB_URI=mongodb://...
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...
```

- `MONGODB_URI` is read with no fallback, so the app fails to boot without it. The current local `.env` points at a remote Atlas cluster — there is no local MongoDB.
- `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` are **missing from the current `.env`** even though the provider is configured → GitHub sign-in fails until they're added.

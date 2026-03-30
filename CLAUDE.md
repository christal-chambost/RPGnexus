# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start dev server with Turbopack
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm format       # Format all .ts/.tsx files with Prettier
pnpm typecheck    # TypeScript type checking (no emit)
```

**Docker:**
```bash
docker compose up         # Start app + PostgreSQL
docker compose up postgres # Start only the database
```

**Adding shadcn/ui components:**
```bash
pnpm dlx shadcn@latest add <component-name>
```

## Architecture

**Stack:** Next.js 16 (App Router) + TypeScript strict + Tailwind CSS v4 + shadcn/ui + PostgreSQL

### App Router structure

- `app/layout.tsx` — root layout; loads Google Fonts (Noto Serif, Roboto, Geist Mono) and wraps the app in `ThemeProvider`
- `app/globals.css` — all CSS custom properties for theming (OKLch colors, light/dark variables, sidebar scheme)
- `components/ui/` — shadcn/ui components; generated here via CLI, customized as needed
- `components/theme-provider.tsx` — wraps `next-themes`; also handles the `d` key hotkey to toggle dark mode (skips when focus is in an input/textarea)
- `lib/utils.ts` — exports `cn()` (clsx + tailwind-merge); use this for all className merging

### Styling conventions

- Tailwind CSS v4 via PostCSS (`@tailwindcss/postcss`), configured through `app/globals.css` — no `tailwind.config.ts`
- Prettier auto-sorts Tailwind classes using `prettier-plugin-tailwindcss` (configured with `tailwindStylesheet` and `tailwindFunctions: ["cn", "cva"]`)
- `class-variance-authority` (CVA) is used for component variants (see `components/ui/button.tsx` as the pattern)
- Base UI primitives (`@base-ui/react`) underpin shadcn components

### Database

PostgreSQL 16 is configured via Docker Compose. The connection string is in `.env` as `DATABASE_URL`. The database is not yet wired into application code — ORM/query layer is not yet set up.

### Path alias

`@/*` maps to the project root — use it for all imports (e.g., `import { cn } from "@/lib/utils"`).

### Code style

Prettier config (enforced on save/format):
- No semicolons, double quotes, 2-space indent, trailing commas (ES5), LF line endings

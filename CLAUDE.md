# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start dev server with Turbopack
pnpm build        # Production build
pnpm start        # Production server
pnpm lint         # Run ESLint
pnpm format       # Prettier format all TS/TSX files
pnpm typecheck    # TypeScript type check (no emit)

pnpm prisma generate        # Regenerate Prisma client from schema (no DB needed)
pnpm prisma migrate dev     # Apply schema changes to the local DB
pnpm prisma studio          # Open Prisma Studio to browse DB data
```

## Architecture

**Next.js 16 App Router** project with React 19, TypeScript (strict), and Tailwind CSS 4.

Key path alias: `@/*` maps to the project root.

### Directory layout

- `app/` — App Router pages and root layout. `layout.tsx` sets up fonts (Geist, Roboto, Noto Serif), the theme provider, and the `<Navbar />`.
- `app/auth/` — Registration page (`/auth`).
- `components/navbar.tsx` — Full-width top navigation bar (RPGnexus home link left, Inscription link right).
- `components/auth/` — Auth-related client components (e.g. `register-form.tsx`).
- `components/ui/` — shadcn/ui components. Add new ones via `pnpm dlx shadcn@latest add <component>`.
- `components/theme-provider.tsx` — Wraps `next-themes`. Pressing `"d"` in the browser toggles dark/light mode.
- `lib/actions/` — Next.js Server Actions (e.g. `register.ts`).
- `lib/validations/` — Shared Zod schemas used by both client forms and server actions (e.g. `auth.ts`).
- `lib/prisma.ts` — Prisma client singleton (prevents excess connections during hot-reload).
- `lib/utils.ts` — Exports `cn()` (clsx + tailwind-merge) for conditional class merging. Tailwind plugin is also aware of `cva()`.
- `hooks/` — Custom React hooks (currently empty).
- `prisma/schema.prisma` — Database schema. Currently has a `User` model (id, email, pseudo, password, createdAt).

### Database

- PostgreSQL via **Prisma 5**. Connection string in `.env` as `DATABASE_URL`.
- After editing `schema.prisma`, always run `pnpm prisma generate` to sync TypeScript types, then `pnpm prisma migrate dev` to apply to the DB.
- Use Zod **v3** (not v4) — `@hookform/resolvers` is not yet compatible with Zod v4.

### Forms

- Form state: `react-hook-form` with `zodResolver` from `@hookform/resolvers/zod`.
- Validation schemas live in `lib/validations/` and are imported by both the client component and the Server Action (server re-validates with `safeParse`).
- Form UI uses `Field`, `FieldLabel`, `FieldError` from `components/ui/field.tsx` (base-mira style — not the `Form`/`FormField` pattern).
- Server Actions return a discriminated union `{ success: true } | { success: false; error: string }`.
- Wrap Server Action calls with `useTransition` (React 19 pattern); use local `useState` for `serverError` and `success`.

### Styling

- Tailwind CSS 4 via PostCSS (`@tailwindcss/postcss`).
- Colors use the OKLch color space and are defined as CSS variables in `app/globals.css`. Edit variables there for theming, not in Tailwind config.
- Class merging: always use `cn()` from `@/lib/utils`.

### Component conventions

- shadcn/ui uses the **base-mira** style, neutral base color. Use `pnpm dlx shadcn@latest add` (not `npx`) to add components.
- Icon library: `lucide-react`.
- Variant logic: `class-variance-authority` (`cva`).

### Formatting

Prettier is enforced (no semicolons, double quotes, 2-space indent, LF line endings, trailing commas ES5, print width 80). Run `pnpm format` before committing.

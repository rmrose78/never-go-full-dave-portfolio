# vite-react-ts-starter

A frontend starter template: Vite + React + TypeScript, with an
accessibility-first testing stack wired in. This is a scaffold, not a
finished site — `src/components/{layout,sections,ui}/` are empty on
purpose, ready for your own components.

## Stack

- Vite + React + TypeScript
- SCSS Modules (no Tailwind, no inline styles)
- Jest + React Testing Library + jest-axe for component tests
- Playwright + `@axe-core/playwright` for real-browser accessibility checks

## Conventions

- **SCSS Modules per component** — one `.module.scss` file next to each
  component, camelCase classes, no BEM.
- **AAA test structure** — Arrange, Act, Assert, in that order, in every
  test.
- **`@/` path alias** — maps to `src/`, use it instead of relative
  `../../` imports.
- **Mobile-first breakpoints** — SCSS uses `min-width` only, never
  `max-width`.

See `.claude/skills/4-tdd/fe-standards.md` for the full set of frontend
conventions (component structure, TypeScript rules, folder layout).

## Commands

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run lint` — ESLint
- `npm test` — Jest
- `npm run test:watch` — Jest watch mode
- `npm run format` — Prettier

## Structure

```
src/
  components/
    layout/     # Nav, Footer, page chrome
    sections/   # Page-level sections
    ui/         # Reusable primitives
  hooks/        # Custom React hooks
  styles/       # globals.scss, _variables.scss, _mixins.scss
  types/        # Shared TypeScript types
  utils/        # Pure helper functions
  assets/
```

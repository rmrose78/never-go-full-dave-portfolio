# Frontend Standards

Read this before writing any component. For testing conventions
(red-green discipline, stateful-async testability), see
`fe-testing-patterns.md` instead.

## Stack
- React 19 + TypeScript + Vite
- SCSS modules — one `.module.scss` per component, no exceptions
- NO Tailwind — pure SCSS only (this starter ships with Tailwind removed;
  see the handoff doc if you're working from a snapshot that still has it)
- Radix UI for accessible primitives, where a primitive is genuinely needed
- Framer Motion for animations, where animation is genuinely needed
- Jest + React Testing Library + jest-axe for tests

## Component Conventions
- File naming: kebab-case or PascalCase to match existing components in
  this repo — match whatever convention the sibling files in the same
  folder already use
- Component naming: PascalCase (`StatCard`, `ContactModal`)
- One component per file
- Props interface typed explicitly above component
- Default export for components, named exports for hooks and utils

```tsx
interface StatCardProps {
  label: string
  value: string
}

export default function StatCard({ label, value }: StatCardProps) {
  ...
}
```

## SCSS Modules
- One `.module.scss` per component, lives next to the component file
- camelCase class names — no BEM, modules handle scoping
- No inline styles ever
- Every module starts with:

```scss
@use '@/styles/_variables.scss' as *;
@use '@/styles/_mixins.scss' as *;
```

## Mobile-First
Always min-width, never max-width:

```scss
.element {
  padding: 1rem;        // mobile base
  @include desktop {
    padding: 3rem;      // desktop override
  }
}
```

## TypeScript
- Use `interface` for objects that might be extended
- Use `type` for unions and aliases
- Never use `any` — use `unknown` or proper typing
- Type event handlers explicitly:

```tsx
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {}
const handleSubmit = (e: React.FormEvent) => {}
```

## External Service Calls
- If this project has a backend (check CLAUDE.md's stack declaration),
  frontend calls to it go through a shared `src/utils/api.ts`, never
  called ad hoc from a component.
- If this project is frontend-only and talks to a third-party service
  directly (e.g. a form submission endpoint), keep the call scoped to
  that component if it's the only consumer — but never inline the same
  integration in more than one place. If a second component needs it,
  extract it to `src/utils/` first.
- Never hardcode secrets — read from `import.meta.env.VITE_*`

## Framer Motion
Define variants outside components:

```tsx
const fadeIn = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
} as const
```

Always respect reduced motion — use a `useReducedMotion` hook:

```tsx
const reduced = useReducedMotion()
<motion.div
  variants={fadeIn}
  initial={reduced ? 'visible' : 'hidden'}
  animate="visible"
>
```

For keeping stateful async animation logic (loops, retries, multi-step
flows) testable without mocking Framer Motion's internals, see
`fe-testing-patterns.md`'s "Testability of Stateful Async Processes".

## States Every Component With Async Behavior Must Handle
- Loading — skeleton or spinner
- Empty — friendly message, not blank
- Error — distinct message with retry or fallback action
- Success — the actual content

## Folder Structure
```
src/
  components/
    layout/     # Nav, Footer, page chrome
    sections/   # Page-level sections, named for what this project actually has
    ui/         # Modal, StatCard, icons — reusable primitives
  hooks/        # Custom React hooks
  styles/       # globals.scss, _variables.scss, _mixins.scss
  types/        # Shared TypeScript interfaces
  utils/        # pure helper functions and shared service calls
  assets/
```

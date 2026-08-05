# Frontend Coding Standards

Canonical standards for React, TypeScript, and SCSS modules in this repository. Read before creating or editing any component.

---

## Directory & File Structure

```
src/
├── components/
│   ├── layout/       # Header, Footer, Navigation, Container
│   ├── sections/     # Hero, Gallery, Dispatches, Commissions
│   └── ui/           # Button, Card, Badge, Modal, Input
├── styles/
│   ├── _variables.scss
│   ├── _mixins.scss
│   └── index.scss
```

Component files follow PascalCase directory or file naming:
`src/components/ui/Button/Button.tsx`
`src/components/ui/Button/Button.module.scss`
`src/components/ui/Button/Button.test.tsx`

---

## React & TypeScript Rules

- **Named Exports Only**: Export components using named exports (`export const Button = ...`). No default exports.
- **Strict Props Interface**: Define explicit interface `ButtonProps` for component props.
- **Semantic HTML**: Use proper HTML5 elements (`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`, `<button>`). Never use `div` for interactive elements.
- **Accessibility Attributes**: Explicit `aria-label`, `aria-expanded`, `aria-controls`, and `role` attributes where required.

---

## Styling (SCSS Modules)

- **SCSS Modules Only**: Import styles via `import styles from './Button.module.scss'`.
- **No Inline Styles & No Tailwind**: Do not use `style={{ ... }}` or Tailwind classes.
- **CSS Custom Properties**: Leverage design tokens for color, typography, radius, and spacing.
- **Responsive Mobile-First**: Build mobile layout first, use `@media (min-width: ...)` breakpoint mixins for desktop overrides.

---

## Contrast & Visual Standards

- **Color Contrast**: Normal text minimum 4.5:1 ratio, large text/interactive minimum 3:1 ratio against background.
- **Focus Styles**: Visible outline/box-shadow on `:focus-visible`. Never set `outline: none` without a visible focus state substitute.

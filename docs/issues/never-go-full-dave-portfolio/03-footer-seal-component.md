# Issue 3: Footer Studio Seal Component

## What
Build site footer component featuring studio Iron Halo seal, Instagram social link, and copyright notice.

## Why
Provides studio branding closure and official social link at the bottom of the page.

## Acceptance Criteria
- [ ] Implement `Footer` component (`src/components/layout/Footer/Footer.tsx`) and SCSS module.
- [ ] Render studio emblem seal SVG with subtle hover glow.
- [ ] Render Instagram social link pointing to `@nevergofulldave` with `target="_blank"` and `rel="noopener"`.
- [ ] Provide unit tests testing social links and `jest-axe` accessibility.

## Layers Touched
- [ ] Frontend — `src/components/layout/Footer/*`
- [ ] Tests/a11y — `Footer.test.tsx` with jest-axe

## Edge Cases
- Screen reader focus on social link → announces full `Instagram @nevergofulldave` label via `aria-label`.

## Blocked By
- Issue 1.

## Definition of Done
- [ ] Implementation complete per fe-standards.md
- [ ] Unit tests passing (`npm test`)
- [ ] Red-green TDD verified
- [ ] jest-axe passing on every distinct render state

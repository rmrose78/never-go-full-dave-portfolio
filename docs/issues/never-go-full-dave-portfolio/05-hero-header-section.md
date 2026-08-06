# Issue 5: Hero Header Section Component

## What
Build Hero Header section featuring Mechanicus terminal log sequence, hacker title scramble reveal, centerpiece Iron Halo emblem, purity seal stamp, and primary CTA button.

## Why
Delivers the high-impact landing page entrance that establishes studio craftsmanship and drives visitors into the portfolio.

## Acceptance Criteria
- [ ] Implement `useScrambleText` custom hook (`src/hooks/useScrambleText.ts`) for matrix/hacker text reveal.
- [ ] Implement `Hero` component (`src/components/sections/Hero/Hero.tsx`) and SCSS module.
- [ ] Render terminal boot log text sequence, "NEVER GO FULL DAVE" scramble reveal, purity seal stamp, and primary CTA button.
- [ ] Provide 100% unit tests for `useScrambleText` hook and `Hero` section component with `jest-axe`.

## Layers Touched
- [ ] Frontend — `src/hooks/useScrambleText.ts`, `src/components/sections/Hero/*`
- [ ] Tests/a11y — `useScrambleText.test.ts`, `Hero.test.tsx` with jest-axe

## Edge Cases
- User prefers reduced motion (`prefers-reduced-motion: reduce`) → text renders immediately without scramble delay.

## Blocked By
- Issue 1.

## Definition of Done
- [ ] Implementation complete per fe-standards.md
- [ ] Unit tests passing (`npm test`)
- [ ] Red-green TDD verified
- [ ] jest-axe passing on every distinct render state

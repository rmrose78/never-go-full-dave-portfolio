# Issue 2: Header Navigation Bar Component

## What
Build responsive top navigation bar with brand logo "Never Go Full DAVE", Morse light indicator, static navigation links, and mobile hamburger drawer.

## Why
Enables visitors to navigate smoothly to all sections of the studio portfolio across mobile and desktop viewports.

## Acceptance Criteria
- [ ] Implement `Header` component (`src/components/layout/Header/Header.tsx`) and SCSS module.
- [ ] Render brand emblem SVG + "Never Go Full DAVE" text with gold accent.
- [ ] Render static navigation links (`Gallery`, `Specialties`, `Standards`, `Commission`, `Showcase`, `About`, `Dispatches`) with uniform font-weight 600 (zero neighbor layout shift on hover).
- [ ] Render mobile hamburger toggle button with full keyboard accessibility and `aria-expanded` state.
- [ ] Provide unit tests testing link navigation, drawer toggle, and `jest-axe` accessibility.

## Layers Touched
- [ ] Frontend — `src/components/layout/Header/*`
- [ ] Tests/a11y — `Header.test.tsx` with jest-axe and RTL interaction tests

## Edge Cases
- Mobile drawer open + window resized to desktop → drawer automatically closes cleanly.

## Blocked By
- Issue 1.

## Definition of Done
- [ ] Implementation complete per fe-standards.md
- [ ] Unit tests passing (`npm test`)
- [ ] Red-green TDD verified
- [ ] jest-axe passing on every distinct render state

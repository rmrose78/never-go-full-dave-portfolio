# Issue 1: Design Tokens & Base Layout Scaffold

## What
Establish core SCSS design tokens, base mixins, App container layout, and Iron Halo SVG emblem component with unit tests.

## Why
Provides the foundational styling tokens and layout structure required by all downstream UI sections.

## Acceptance Criteria
- [ ] Implement `src/styles/_variables.scss` and `_mixins.scss` with void base, brass metallic, ember orange, chakra petch fonts, and breakpoint mixins.
- [ ] Build `StudioEmblem` SVG component (`src/components/ui/StudioEmblem/StudioEmblem.tsx`) rendering Iron Halo & Crossed Paintbrushes geometry.
- [ ] Scaffold `App` container layout (`src/components/layout/App/App.tsx`).
- [ ] Provide unit tests for `StudioEmblem` and `App` with `jest-axe` accessibility assertion.

## Layers Touched
- [ ] Frontend — `src/styles/*`, `src/components/ui/StudioEmblem/*`, `src/components/layout/App/*`
- [ ] Tests/a11y — `StudioEmblem.test.tsx`, `App.test.tsx` with jest-axe

## Edge Cases
- Window resized to ultra-wide (>2000px) → layout remains centered max-width 80rem.

## Blocked By
- None.

## Definition of Done
- [ ] Implementation complete per fe-standards.md
- [ ] Unit tests passing (`npm test`)
- [ ] Red-green TDD verified
- [ ] jest-axe passing on every distinct render state

# Issue 7: Specialties & Painting Standards Sections

## What
Build Specialties & Capabilities 4-grid section and Quality Standards & Pricing Tiers 3-column section with centerpiece masterpiece styling.

## Why
Communicates Dave's unit type capabilities (Troops, Characters, Vehicles, Dioramas) and clear price expectations ($40-70 Tabletop, $90-160 Display, Custom Masterpiece).

## Acceptance Criteria
- [ ] Implement `src/data/pricing.ts` strongly-typed data constants.
- [ ] Implement `Specialties` section (`src/components/sections/Specialties/Specialties.tsx`).
- [ ] Implement `Standards` section (`src/components/sections/Standards/Standards.tsx`) and `TierCard` component (`src/components/ui/TierCard/TierCard.tsx`).
- [ ] Render 3 pricing tiers with highlight features and centerpiece accent badge.
- [ ] Provide unit tests for `Specialties` and `Standards` with `jest-axe` accessibility assertions.

## Layers Touched
- [ ] Frontend — `src/data/pricing.ts`, `src/components/sections/Specialties/*`, `src/components/sections/Standards/*`, `src/components/ui/TierCard/*`
- [ ] Tests/a11y — `Specialties.test.tsx`, `Standards.test.tsx` with jest-axe

## Edge Cases
- Screen reader navigation → pricing amounts and feature bullet lists read cleanly in logical order.

## Blocked By
- Issue 1.

## Definition of Done
- [ ] Implementation complete per fe-standards.md
- [ ] Unit tests passing (`npm test`)
- [ ] Red-green TDD verified
- [ ] jest-axe passing on every distinct render state

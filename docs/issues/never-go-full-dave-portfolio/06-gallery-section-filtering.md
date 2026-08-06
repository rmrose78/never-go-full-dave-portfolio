# Issue 6: Painted Vault Gallery & Faction Filter

## What
Build Painted Vault portfolio gallery section with faction filter tabs (All, Astra Militarum, Khorne Chaos), portfolio card grid, and `useFactionFilter` hook.

## Why
Enables prospective clients to inspect painted squads, characters, and centerpieces filtered by their army of interest.

## Acceptance Criteria
- [ ] Implement `src/data/portfolio.ts` strongly-typed data constants.
- [ ] Implement `useFactionFilter` custom hook (`src/hooks/useFactionFilter.ts`).
- [ ] Implement `Gallery` section (`src/components/sections/Gallery/Gallery.tsx`) and `PortfolioCard` component (`src/components/ui/PortfolioCard/PortfolioCard.tsx`).
- [ ] Render faction filter tabs with count badges (`All 6`, `Astra Militarum 3`, `Khorne Chaos 3`).
- [ ] Provide 100% unit tests for `useFactionFilter` and `Gallery` with `jest-axe` accessibility assertions.

## Layers Touched
- [ ] Frontend — `src/data/portfolio.ts`, `src/hooks/useFactionFilter.ts`, `src/components/sections/Gallery/*`, `src/components/ui/PortfolioCard/*`
- [ ] Tests/a11y — `useFactionFilter.test.ts`, `Gallery.test.tsx` with jest-axe

## Edge Cases
- Rapid switching between filter tabs → non-matching cards hide cleanly without layout jitter.

## Blocked By
- Issue 1.

## Definition of Done
- [ ] Implementation complete per fe-standards.md
- [ ] Unit tests passing (`npm test`)
- [ ] Red-green TDD verified
- [ ] jest-axe passing on every distinct render state

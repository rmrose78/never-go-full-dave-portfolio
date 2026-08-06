# Issue 9: Showcase, Bio, Dispatches & Modals

## What
Build Environment Showcase section, Artist Bio card ("Meet Dave"), Dispatches desk logs, and accessible Modal Dialogs (`RecipeModal`, `ArchiveModal`).

## Why
Delivers background storytelling, trust-building bio, and recipe/desk log detail modals.

## Acceptance Criteria
- [ ] Implement `src/data/dispatches.ts` strongly-typed data constants.
- [ ] Implement `Modal` UI component (`src/components/ui/Modal/Modal.tsx`) using HTML `<dialog>` element with backdrop blur and escape key handling.
- [ ] Implement `Showcase` section (`src/components/sections/Showcase/Showcase.tsx`).
- [ ] Implement `AboutBio` section (`src/components/sections/AboutBio/AboutBio.tsx`).
- [ ] Implement `Dispatches` section (`src/components/sections/Dispatches/Dispatches.tsx`).
- [ ] Provide 100% unit tests for `Modal`, `Showcase`, `AboutBio`, and `Dispatches` with `jest-axe` accessibility assertions.

## Layers Touched
- [ ] Frontend — `src/data/dispatches.ts`, `src/components/ui/Modal/*`, `src/components/sections/Showcase/*`, `src/components/sections/AboutBio/*`, `src/components/sections/Dispatches/*`
- [ ] Tests/a11y — `Modal.test.tsx`, `Showcase.test.tsx`, `AboutBio.test.tsx`, `Dispatches.test.tsx` with jest-axe

## Edge Cases
- Modal open + escape key pressed → modal closes smoothly and focus returns to triggering button.

## Blocked By
- Issue 1.

## Definition of Done
- [ ] Implementation complete per fe-standards.md
- [ ] Unit tests passing (`npm test`)
- [ ] Red-green TDD verified
- [ ] jest-axe passing on every distinct render state

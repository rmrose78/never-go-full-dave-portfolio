# Issue 8: Interactive Commission Intake Form & Transmit Utils

## What
Build 5-step interactive commission quote intake form with `useCommissionWizard` hook, mailto link builder pre-filled to `westphds@gmail.com`, and copy-to-clipboard utility.

## Why
Positioned directly under pricing standards to capture high-intent prospective clients and convert them into structured quote emails.

## Acceptance Criteria
- [ ] Implement `mailtoBuilder` utility (`src/utils/mailtoBuilder.ts`) pre-formatting mailto recipient as `westphds@gmail.com` with 100% unit tests.
- [ ] Implement `clipboard` utility (`src/utils/clipboard.ts`) with fallback copy handling and 100% unit tests.
- [ ] Implement `useCommissionWizard` custom hook (`src/hooks/useCommissionWizard.ts`) with 100% unit tests.
- [ ] Implement `CommissionForm` section (`src/components/sections/CommissionForm/CommissionForm.tsx`) with explicit `<label for="...">` bindings.
- [ ] Render transmit button pre-filling email to `westphds@gmail.com` and copy inquiry fallback.
- [ ] Provide 100% unit tests for `CommissionForm` with `jest-axe` accessibility assertions.

## Layers Touched
- [ ] Frontend — `src/utils/mailtoBuilder.ts`, `src/utils/clipboard.ts`, `src/hooks/useCommissionWizard.ts`, `src/components/sections/CommissionForm/*`
- [ ] Tests/a11y — `mailtoBuilder.test.ts`, `clipboard.test.ts`, `useCommissionWizard.test.ts`, `CommissionForm.test.tsx` with jest-axe

## Edge Cases
- Empty army field → pre-fills "Not specified" default parameters cleanly.

## Blocked By
- Issue 1.

## Definition of Done
- [ ] Implementation complete per fe-standards.md
- [ ] Unit tests passing (`npm test`)
- [ ] Red-green TDD verified
- [ ] jest-axe passing on every distinct render state

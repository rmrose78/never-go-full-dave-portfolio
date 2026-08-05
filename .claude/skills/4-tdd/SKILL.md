---
name: 4-tdd
description: Implement one vertical-slice issue at a time using component-first TDD red-green discipline, background test execution, and accessibility verification.
---

# Skill: 4-tdd

Implement one vertical slice issue at a time. Never proceed to the next issue until the current one has passing unit tests, jest-axe compliance, and developer sign-off.

---

## Pre-Implementation Workflow
1. **Read `AGY.md` stack declaration**: Confirm frontend-only rules.
2. **Branch Check**: Switch to branch `<issue-number>-<slug>` created via `gh issue develop`.
3. **Read Standards**: Read `.agents/skills/4-tdd/fe-standards.md` before writing components.
4. **Confidence Check**: Run `.agents/skills/shared/confidence-gate.md` to confirm 95%+ confidence on definition of done.

---

## Frontend TDD Cycle (Component-First)

```
1. READ       — Inspect fe-standards.md & fe-testing-patterns.md
2. BUILD      — Create component structure & SCSS module
3. A11Y       — Apply a11y-checklist.md rules (roles, contrast, labels)
4. TEST       — Write Jest + RTL + jest-axe tests for all render states
5. FORCE RED  — Intentionally break component logic to confirm test fails
6. RESTORE    — Fix component back to green
7. VERIFY     — Run `npm test -- src/components/<component>.test.tsx`
8. VISUAL     — Run /visual-check via subagent if requested by developer
9. PRECOMMIT  — Run pre-commit.md checklist
10. REPORT    — Output completion report
```

---

## Test Verification Commands
Execute tests using `run_command`:
```bash
npm test -- src/components/<component>.test.tsx
```

For full suite validation:
```bash
npm test
```

---

## Visual & Accessibility Verification
- **Visual Verification**: Delegate to an isolated subagent (`/visual-check`).
- **Real-Browser Accessibility**: Delegate to an isolated subagent (`/a11y-sweep`).

---

## When Issue is Complete

1. **GitHub PR Creation Gate**:
   - Push feature branch (`git push -u origin <issue-number>-<slug>`).
   - Create Pull Request (`gh pr create`).
   - **STOP IMMEDIATELY**. Never merge PR into `main` unless explicitly instructed by the developer.

2. Reconcile issue markdown spec and output completion report:

```
ISSUE COMPLETE & PR OPENED

Issue: <title>
Branch: <issue-number>-<slug>
Pull Request: <PR URL>
Built: ✅
A11y checked (jest-axe + native AGY Chrome tools): ✅
Tests: <n> added, all passing ✅
Red-green verified: ✅
Visual verification: <confirmed / skipped>
Pre-commit gate (build/lint/test): ✅

Acceptance criteria:
- [x] <criterion met>

QA Verification Checklist:
- [ ] <testable user behavior line 1>
- [ ] <testable user behavior line 2>

Suggested commit message:
feat: <description>

- A11y: <accessibility details>
- Tests: <unit & jest-axe test coverage>

Status: PR opened and ready for developer code review. STOPPED (Awaiting developer instructions to merge).
Next issue: <title or NONE>
```

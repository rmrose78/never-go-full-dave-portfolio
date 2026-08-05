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

## Frontend TDD Cycle (Component-First + Automated Verification)

```
1. READ       — Inspect fe-standards.md & fe-testing-patterns.md
2. BUILD      — Create component structure & SCSS module (*.module.scss)
3. A11Y       — Apply a11y-checklist.md rules (roles, contrast, labels)
4. TEST       — Write Jest/Vitest + RTL + jest-axe tests for all render states
5. FORCE RED  — Intentionally break component logic to confirm test fails
6. RESTORE    — Fix component back to green
7. VERIFY     — Run `npm test -- src/components/<component>.test.tsx`
8. SWARM A11Y — Automatically invoke /a11y-sweep subagent for real-browser Playwright + axe-core check
9. SWARM VIS  — Automatically invoke /visual-check subagent to capture multi-viewport UI screenshot carousel
10. PRECOMMIT — Automatically execute full pre-commit gate (`npm run precommit` / pre-commit.md)
11. REPORT    — Output completion report with visual & accessibility artifacts
```

---

## Parallel Subagent Swarm Execution
When `/3-to-issues` flags unblocked parallel issues, launch concurrent subagents using `invoke_subagent`:

```json
{
  "Subagents": [
    {
      "TypeName": "self",
      "Role": "Subagent Swarm A - Header Component",
      "Prompt": "Implement Issue #2 (Header Component) using /4-tdd workflow in workspace 'share'."
    },
    {
      "TypeName": "self",
      "Role": "Subagent Swarm B - Footer Component",
      "Prompt": "Implement Issue #3 (Footer Component) using /4-tdd workflow in workspace 'share'."
    }
  ]
}
```

---

## Test Verification & Automated Pre-Commit Commands
Execute tests using `run_command`:
```bash
npm test -- src/components/<component>.test.tsx
```

Automated Full Pre-Commit Gate (MUST run before issue completion):
```bash
npm run precommit  # Runs npm run build && npm run lint && npm test
```

---

## Automated Verification Gates
- **Real-Browser Accessibility Gate**: Automatically trigger `/a11y-sweep` subagent upon unit test pass.
- **Visual Verification Gate**: Automatically trigger `/visual-check` subagent upon unit test pass to embed side-by-side screenshot carousels in the completion report.
- **Pre-Commit Automated Gate**: Automatically execute `npm run precommit` (build, lint, test, jest-axe checks, zero console.log) before declaring issue complete.

---

## When Issue is Complete

Reconcile issue markdown spec and output:

```
ISSUE COMPLETE

Issue: <title>
Built: ✅
A11y checked (jest-axe): ✅
Tests: <n> added, all passing ✅
Red-green verified: ✅
Visual verification: <confirmed / skipped>

Acceptance criteria:
- [x] <criterion met>

QA Verification Checklist:
- [ ] <testable user behavior line 1>
- [ ] <testable user behavior line 2>

Suggested commit message:
feat: <description>

- A11y: <accessibility details>
- Tests: <unit & jest-axe test coverage>

Status: Ready for developer review and PR.
Next issue: <title or NONE>
```

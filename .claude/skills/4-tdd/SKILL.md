---
name: 4-tdd
description: Implement a single issue using TDD. Component-first for frontend work, test-first for backend work. Run on one issue at a time.
---

# Skill: tdd

Implement one vertical slice issue at a time. Never move to the next
issue until the current one has passing tests and, if visual
verification was run, developer sign-off.

**Read CLAUDE.md's stack declaration first.** This skill has both a
backend flow and a frontend flow below — only follow the flow(s) for
layers this project actually has. A frontend-only project skips the
backend flow entirely; a full-stack issue may need both, one after the
other, for the same issue.

## Before Starting
0. Enter plan mode before writing any code. Read the issue file from
   `docs/issues/<feature-name>/` and cross-reference it against the
   *actual current code* it touches — not just the issue's prose — and
   against the mockup/design reference if the issue points to one. Run
   `shared/confidence-gate.md`: ask questions until 95% confident on what
   "done" looks like for this specific issue. Only exit plan mode once
   aligned with the developer.
1. Confirm the current branch is specific to this issue (e.g.
   `<issue-number>-<slug>`) — if on `main`, or on a branch for a
   different issue, create/switch to the correct branch before writing
   any code. Never implement an issue directly on `main`. Create the
   branch with `gh issue develop <issue-number> --name <issue-number>-<slug>
   --base <base-branch> --checkout` (not plain `git checkout -b`) so
   GitHub actually links the branch to the issue in its Development
   panel — a name matching the issue number is not the same as a linked
   branch, and an unlinked branch means the issue won't auto-close on
   merge unless the PR merges to the repo's default branch.
2. For frontend work: read `fe-standards.md` in this directory before
   writing any component. For backend work (if this project has one):
   read `pytest-backend-standards.md` in this directory first.
3. If committing — run through `pre-commit.md` in this directory

## Rules
- ONE issue per session
- Commit/PR permissions follow CLAUDE.md's pipeline rule (Critical Rules) —
  this skill never runs `git commit` itself; always end the completion
  report with a "ready for commit" status instead
- Never commit without running pre-commit.md checklist (once the developer
  does ask for a commit)
- Frontend work: act as UI/UX engineer — produce modern, accessible,
  polished UI
  - When no visual direction is specified beyond
    `docs/reference/design-direction.md`, default to a modern, accessible
    execution of the existing tokens — don't ask permission to apply the
    established design system
  - If a genuinely distinctive idea occurs to you (an interaction, layout,
    or animation flourish not implied by fe-standards.md or the design
    tokens), pause and describe it to the developer as a proposal before
    building it — don't silently build it, and don't silently skip it either
- Developer is product manager — flag design decisions for approval
- The full completion report in "When Issue is Complete" below is posted
  **once per issue** — when the developer is satisfied and the issue is
  actually done. A bug found mid-stream does not get its own report —
  keep working, then fold everything into the one final report. Outside
  of that final report, just say what you did in a sentence or two and
  move on

---

## Backend Flow — Test First (only if this project has a backend)

```
1. READ    — read pytest-backend-standards.md before writing any test
2. RED     — write the test first, confirm it fails
3. GREEN   — write the minimum code to pass
4. VERIFY  — confirm the test passes
5. REFACTOR — clean up implementation without changing behavior
6. FULL SUITE — run the entire test suite once, not just the new test
7. CONFIDENCE GATE — shared/confidence-gate.md
8. REPORT  — output the completion report below and stop. Do not run
   any commit command — that only happens if the developer explicitly asks.
```

---

## Frontend Flow — Component First

```
1. READ    — read fe-standards.md before writing any component
2. BUILD   — create component following fe-standards.md
3. A11Y    — run through a11y-checklist.md before writing tests
4. TEST    — write test against the real component, per
   fe-testing-patterns.md's red-green discipline
5. FORCE RED — break something to confirm test can fail
6. RESTORE — fix back to correct
7. VERIFY GREEN — confirm test passes
8. VISUAL VERIFY (ask first) — see below, this step is opt-in
9. PRE-COMMIT — run pre-commit.md checklist
10. CONFIDENCE GATE — shared/confidence-gate.md: confident the implementation
    matches the issue's acceptance criteria?
11. REPORT — output the completion report below and stop. Do not run
    a commit command — that only happens if the developer explicitly asks.
```

### Frontend Commands
```bash
npm run dev
npm test
npm test -- src/components/<component>.test.tsx
```

### Frontend Test Pattern
```tsx
it('<behavior>', async () => {
    // Arrange
    render(<Component />)

    // Act
    await userEvent.click(screen.getByRole('button', { name: /search/i }))

    // Assert
    expect(await screen.findByText(/results/i)).toBeInTheDocument()
})
```

---

## Visual Verification — Opt In, Ask First

Playwright MCP screenshot verification is token-heavy. Unlike the rest of
this flow, **do not run it automatically.** At frontend step 8, ask the
developer:

> Want me to run visual verification via Playwright now? It's a heavier
> token cost than the rest of this step.

- If yes — read and follow `.claude/skills/visual-check/SKILL.md`, then
  continue to step 9.
- If no, or no response — skip it, note in the completion report that
  visual verification was not run this session, and fall back to the
  manual keyboard/behavior checklist below instead:

```
MANUAL CHECK SUGGESTED (visual verification skipped)

URL: http://localhost:5173/<path>

Expected behavior:
- [ ] <what user sees>
- [ ] <what happens on interaction>
- [ ] <edge case behavior>

Keyboard test:
- Tab through the change — all interactive elements reachable
- Enter/Space activates buttons
```

The developer can also invoke `/visual-check` standalone at any time,
outside of this flow.

---

## Suggested Commit Message Format

This is a suggestion to include in the completion report, not something to
execute — commits happen only when the developer explicitly asks.
```
feat: <what was implemented>

- A11y: <accessibility features added, frontend work only>
- Tests: <what tests verify>
```

## When Issue is Complete

Post this once, when the issue is actually done — not after every
intermediate fix along the way. If the developer finds a bug or asks for a
change mid-stream, just fix it and briefly say what changed; save the full
report for the end.

Before reporting, reconcile scope: if any acceptance criteria were added,
changed, or dropped mid-build, update the issue's markdown file
(`docs/issues/<feature>/<n>-<slug>.md`) *and* the corresponding GitHub
issue (`gh issue edit`) so the source of truth matches what was actually
built — never let the report describe scope the issue file doesn't reflect.

Then output:
```
ISSUE COMPLETE

Issue: <title>
Built: ✅
A11y checked: ✅ (frontend work only)
Tests: <n> added, all passing ✅
Red-green verified: ✅
Visual verification: <confirmed / skipped by developer choice> (frontend only)

Acceptance criteria — original (from the issue as first read):
- [x] <criterion that was met>
- [ ] <criterion NOT met — say why, don't drop it silently>

Acceptance criteria — added during this build:
- <criterion that emerged mid-build, wasn't in the original issue>
  — why: <one-line reason>
(state "None — stayed within original scope" if nothing changed)

QA / Product verification checklist:
- [ ] <concrete, testable thing a non-engineer can check — one line per
  meaningfully distinct behavior or state this issue changed>

Suggested commit message:
<message>

Status: ready for commit — I have not committed anything.
Let me know when to commit, or commit it yourself.
Next issue: <title or NONE>
```

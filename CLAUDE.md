# CLAUDE.md — vite-react-ts-starter

A frontend starter template (Vite + React + TypeScript). Read this before
writing any code or making any decisions.

Known state: the sanitization pass described in
`docs/handoff/2026-07-29-fe-starter-modernization.md` is complete —
rr-dev branding is gone, Tailwind is removed, the Jest config bug is
fixed, and the accessibility/testing tooling below is wired up. See that
doc for the full history if you need it, but `src/`/`package.json` now
match what this file describes.

---

## Stack Declaration

**This project is frontend-only. It has no backend.** Skills in
`.claude/skills/` that have a backend-specific flow or file
(`4-tdd/SKILL.md`'s backend flow, `4-tdd/be-standards.md`,
`4-tdd/pytest-backend-standards.md`, `pytest-fix/SKILL.md`) exist so this
template stays useful if a backend gets added later — they do not apply
right now. Don't read them, don't ask backend discovery questions, don't
run backend test standards, don't expect a `backend/` directory to exist.

If this ever becomes a full-stack project, update this section first —
every pipeline skill checks it before deciding which flow(s) to follow.

## Skill Shortcuts
- "write tests for <file>" → read `.claude/skills/4-tdd/fe-testing-patterns.md`
  and `.claude/skills/4-tdd/a11y-checklist.md`, then write Jest + RTL +
  jest-axe tests for that component
- "run visual check" / "run playwright" → read
  `.claude/skills/visual-check/SKILL.md`. Never run this without being
  asked — it's a heavier token cost than everything else in this repo's
  workflow
- "run a11y sweep" / "check accessibility violations" → read
  `.claude/skills/a11y-sweep/SKILL.md`. Never run this without being
  asked — same rule as visual check

## Commands
- Start dev server: `npm run dev`
- Run tests: `npm test`
- Run tests (watch): `npm run test:watch`
- Lint: `npm run lint`
- Build: `npm run build`
- Format: `npm run format`
- Full pre-commit gate (build + lint + test): `npm run precommit`

## Critical Rules
- Never commit `.env` or `.env.local`
- SCSS modules only — no Tailwind, no inline styles
- Frontend conventions (component structure, SCSS modules, TypeScript
  rules, folder layout) are canonical in
  `.claude/skills/4-tdd/fe-standards.md` — read that before writing any
  component, don't duplicate it here
- Every new component with rendered markup gets a jest-axe test, one
  assertion per meaningfully distinct render state — not just the
  default render (see `.claude/skills/4-tdd/pre-commit.md`)
- Any new text/background color pairing gets checked against a
  contrast-ratio utility before shipping — 4.5:1 normal text, 3:1 large
  text/interactive elements. Don't eyeball contrast
- Testability is a design constraint, not just a test-writing habit: keep
  decision logic separate from I/O and side effects (HTTP calls,
  animation/timer calls) so the core logic can be unit-tested without
  heavy mocking. This doesn't restrict what can be built — but if an
  implementation choice would make a feature only testable via expensive
  or brittle means (or not testable at all), flag that to the developer
  before building it that way, don't silently skip the test. See
  `4-tdd/fe-testing-patterns.md`'s stateful-async section for a concrete
  frontend pattern, and `4-tdd/be-standards.md`'s equivalent for the
  backend one once this project has a backend
- Run tests before every commit
- Never run Playwright visual verification automatically — always ask
  first, or wait to be explicitly told to run it
- Real-browser a11y sweep (`a11y-sweep/SKILL.md`) is opt-in, not a
  mandatory pre-commit gate — ask before running it
- All AI-assisted feature work goes through the pipeline: `/1-grill-me` →
  `/2-to-prd` → `/3-to-issues` → `/4-tdd`. Every issue gets its own GitHub
  issue and its own branch (`<issue-number>-<slug>`) before any code is
  written — never implement directly on `main`. `/4-tdd` never commits or
  opens the PR automatically on its own initiative; the developer triggers
  both explicitly. Once triggered, committing (including multiple commits
  to structure a solution into a logical sequence) and opening the PR do
  not need per-step permission — the review gate is the PR itself, which
  the developer reviews as a whole before merging, not each individual
  commit inside it. **Never merge without the developer's explicit
  go-ahead for that specific PR** — a blanket earlier "looks good"
  doesn't count as approval of a PR that didn't exist yet when they said it
- No em dashes in copy, prose, or commit messages — use periods or commas

## Collaboration Style
- No conversational filler — no "Certainly!", no restating the request
- Plain, direct language, no corporate or academic jargon
- Don't explain obvious logic — only flag genuinely non-obvious decisions
- Prefer code + a one-line rationale over prose explanations
- Long or multi-section output goes in an Artifact so it's editable
  section by section
- Any summary reporting a commit, push, or opened/updated PR ends with
  the actual PR URL — not just a reference to "the PR" — so the developer
  has something to click straight to the code changes

---

## What This Project Is

A frontend starter template — a clean, opinionated Vite + React +
TypeScript scaffold with an accessibility-first testing stack already
wired in, meant to be the starting point for a new frontend (or
eventually full-stack) project rather than shipped as-is.

## Current Priority

The sanitization pass is done — this is now a clean scaffold. Next
priority is real feature work: pick a design direction (see the `Docs`
section below) and start building out `src/components/{layout,sections,ui}/`
through the standard pipeline.

---

## Docs

- Forking this template for a new project? Run through
  `docs/reference/project-setup-checklist.md` before calling it launched
- Design direction (palette, typography, spacing, component feel) →
  `docs/reference/design-direction.md` (create this once a real design
  direction is chosen — don't invent one silently)
- Tech stack → `docs/reference/tech-stack.md`
- Frontend conventions, SCSS architecture, folder structure →
  `.claude/skills/4-tdd/fe-standards.md`
- Frontend testing patterns (red-green, stateful-async testability) →
  `.claude/skills/4-tdd/fe-testing-patterns.md`
- Accessibility checklist → `.claude/skills/4-tdd/a11y-checklist.md`
- Cross-project handoffs → `docs/handoff/` — check for pending handoff
  docs from sibling projects before starting new work

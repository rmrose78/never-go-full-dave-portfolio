---
name: 3-to-issues
description: Break a PRD into vertical slice implementation tasks and create GitHub Issues. Run after /2-to-prd is complete.
---

# Skill: to-issues

Break the PRD into small, vertical slice implementation tasks. Each task
must deliver something visible and testable at the end — not a layer with
nothing to look at. Then create GitHub Issues automatically.

## Rules
- Only run after /to-prd is complete
- Read the PRD from `docs/prd/<feature-name>.md` before generating issues
- Each issue must be a vertical slice — never horizontal
- Each issue must be independently completable
- Each issue must have a clear definition of done
- Issues should be small enough to complete in one Claude Code session
- Save issues to `docs/issues/<feature-name>/`
- After saving all markdown files, create GitHub Issues using the gh CLI

## What is a Vertical Slice

For a full-stack issue (touches database, backend, and frontend), a
vertical slice cuts through every layer the feature actually needs —
not just the frontend, and not just the backend:

```
❌ Horizontal (wrong):
  Issue 1: Build the database schema
  Issue 2: Build all the backend endpoints with no frontend
  Issue 3: Wire up all the frontend with no real data

✅ Vertical (correct):
  Issue 1: Visitor can search and see real results end-to-end
  Issue 2: Visitor can save an item and see it in a persisted list
  Issue 3: Visitor can filter results and see the filtered view update
```

For a frontend-only project (no backend in this repo — check CLAUDE.md's
stack declaration first), the same principle applies one layer down: a
slice is still something the user can see and interact with, it just
doesn't need a Database/Backend row in its own "Layers Touched" section.

## Issue Structure

Save each issue as `docs/issues/<feature-name>/<number>-<slug>.md`:

```markdown
# Issue <number>: <Title>

## What
One sentence description of what this issue delivers.

## Why
Why does this matter to the user?

## Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

## Layers Touched
- [ ] Database — <schema/migration changes, if this project has one>
- [ ] Backend — <routes/services/schemas changed, if this project has one>
- [ ] Frontend — <components, styles, state>
- [ ] Tests/a11y — <what test coverage is added>

(Drop any row this project's stack doesn't have — check CLAUDE.md's
stack declaration rather than listing rows that don't apply.)

## Edge Cases
- Edge case → expected behavior

## Blocked By
List any issues that must be completed first. None if independent.

## Definition of Done
- [ ] Tests written and passing
- [ ] Red-green verified
- [ ] jest-axe passing on every new render state (frontend work only)
- [ ] Manually tested in browser
```

## GitHub Issues — Auto Creation

After saving all markdown files, create GitHub Issues using the gh CLI.

For each issue run:

```bash
gh issue create \
  --title "<issue title>" \
  --body "$(cat docs/issues/<feature-name>/<number>-<slug>.md)" \
  --label "vertical-slice"
```

If the `vertical-slice` label doesn't exist yet, create it first:

```bash
gh label create "vertical-slice" --color "#0075ca" --description "Vertical slice feature ticket"
```

## Blocking Relationships

After generating all issues output a dependency graph:

```
Issue 1 → blocks nothing
Issue 2 → blocked by Issue 1
Issue 3 → blocked by Issue 1
Issue 4 → blocked by Issue 2, Issue 3
```

## Confidence Gate
Before producing the ISSUES COMPLETE summary, run
`.claude/skills/shared/confidence-gate.md`. The question it's gating: is
there enough here that each issue is a true vertical slice and
independently completable?

## When Done

Output exactly this:

```
ISSUES COMPLETE

Generated <n> issues saved to docs/issues/<feature-name>/
GitHub Issues created: <links to each issue>

Dependency order:
1. <Issue 1 title>
2. <Issue 2 title>
...

Ready to run /tdd on Issue 1
```

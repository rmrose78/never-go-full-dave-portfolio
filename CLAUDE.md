# CLAUDE.md — vite-react-ts-starter (Claude & AGY Dual Compatibility)

Primary instructions for Claude Code and Antigravity agents working in this repository.

> [!NOTE]
> This project supports dual compatibility: `.agents/` and `AGY.md` power the native **Antigravity (AGY)** workflow, while `.claude/` and `CLAUDE.md` maintain backwards compatibility with Claude Code.

---

## Stack Declaration

**This project is frontend-only. It has no backend.**
All skills in `.claude/skills/` and `.agents/skills/` are scoped for frontend development (Vite + React + TypeScript + SCSS Modules + Jest/RTL + jest-axe + Playwright). Do not ask backend discovery questions or expect a `backend/` directory.

---

## Skill Shortcuts & Commands

### Workflow Skill Shortcuts
- `/1-grill-me` → Conduct pre-code feature discovery & UI/UX interview.
- `/2-to-prd` → Convert grill-me interview into an interactive PRD Artifact.
- `/3-to-issues` → Break PRD into vertical slice implementation tickets & create GitHub Issues.
- `/4-tdd` → Implement one issue at a time using component-first TDD red-green discipline.
- `/visual-check` → Run Playwright screenshot verification loop.
- `/a11y-sweep` → Run real-browser `@axe-core/playwright` accessibility sweep.
- `/manual-a11y-verification` → 11-point human judgment accessibility checklist.

### Project Commands
- **Start dev server**: `npm run dev` (runs at `http://localhost:5173`)
- **Run tests**: `npm test`
- **Run tests (watch)**: `npm run test:watch`
- **Lint**: `npm run lint`
- **Build**: `npm run build`
- **Format**: `npm run format`
- **Full pre-commit gate**: `npm run precommit` (`npm run build && npm run lint && npm test`)

---

## Critical Rules

1. **Subagent & Context Isolation**:
   - Heavy tasks (`visual-check`, `a11y-sweep`) are isolated in subagents to keep main thread context clean.
2. **Frontend Architecture & Styling**:
   - SCSS modules only (`*.module.scss`). No TailwindCSS, no inline styles.
   - Component standards are canonical in `.agents/skills/4-tdd/fe-standards.md` (and `.claude/skills/4-tdd/fe-standards.md`).
3. **Accessibility (a11y) & Contrast**:
   - Every component with rendered markup gets a `jest-axe` test with one assertion per distinct render state.
   - Verify text contrast: 4.5:1 for normal text, 3:1 for large text/interactive elements.
4. **TDD & Commit Permissions**:
   - Feature work goes through the pipeline: `/1-grill-me` → `/2-to-prd` → `/3-to-issues` → `/4-tdd`.
   - Every issue gets its own branch (`<issue-number>-<slug>`). Never implement directly on `main`.
5. **Copywriting Rule**:
   - **No em dashes** in copy, prose, or commit messages — use periods or commas.

---

## Current Priority

Sanitization pass complete. Next priority: Write `docs/reference/design-direction.md` from `mockdrafts/mockdraft_dark.html` to unblock feature work on `src/components/{layout,sections,ui}/`.

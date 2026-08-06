# AGY.md — vite-react-ts-starter (Antigravity AGY Workflow)

Primary rules and instructions for Antigravity agents working in this workspace. Read this before writing any code or making architectural decisions.

---

## Stack Declaration

**This project is frontend-only. It has no backend.**
All skills in `.agents/skills/` are scoped for frontend development (Vite + React + TypeScript + SCSS Modules + Jest/RTL + jest-axe + Native AGY Chrome CDP Browser Tools). Do not ask backend discovery questions or expect a `backend/` directory. If a backend is added in the future, update this section first.

---

## Skill Shortcuts & Commands

### Antigravity Skill Shortcuts
- `/1-grill-me` → Conduct pre-code feature discovery & UI/UX interview using `ask_question` and structured prompts (`.agents/skills/1-grill-me/SKILL.md`).
- `/2-to-prd` → Convert grill-me interview into an interactive PRD Artifact (`.agents/skills/2-to-prd/SKILL.md`).
- `/3-to-issues` → Break PRD into vertical slice implementation tickets & create GitHub Issues (`.agents/skills/3-to-issues/SKILL.md`).
- `/4-tdd` → Implement one issue at a time using component-first TDD red-green discipline (`.agents/skills/4-tdd/SKILL.md`).
- `/visual-check` → Run AGY native Chrome CDP screenshot verification via an isolated subagent and generate visual comparison carousels (`.agents/skills/visual-check/SKILL.md`).
- `/a11y-sweep` → Run native AGY Chrome browser accessibility sweep via an isolated subagent (`.agents/skills/a11y-sweep/SKILL.md`).
- `/manual-a11y-verification` → 11-point human judgment accessibility checklist (`.agents/skills/manual-a11y-verification/SKILL.md`).
- `/agy-md-organizer` → Pass 0 completeness check & Pass 1 slim `AGY.md` (`.agents/skills/agy-md-organizer/SKILL.md`).

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
   - Heavy tasks (`visual-check`, `a11y-sweep`, full test sweeps) MUST be delegated to subagents (`invoke_subagent` with `Model: "flash"`). Never dump raw Playwright DOM snapshots, axe-core JSON payloads, or multi-page terminal outputs into the main conversation context.
2. **Interactive UI & Artifacts**:
   - Deliver multi-section plans, PRDs, issue specs, and walkthroughs as user-facing Antigravity Artifacts (`write_to_file` with `user_facing: true`).
   - Use Mermaid diagrams (`mermaid`), GitHub alert boxes (`> [!NOTE]`, `> [!IMPORTANT]`), and carousels (`carousel`) for visual comparisons.
3. **Frontend Architecture & Styling**:
   - SCSS modules only (`*.module.scss`). No TailwindCSS, no inline styles.
   - Component standards are canonical in `.agents/skills/4-tdd/fe-standards.md`.
4. **Accessibility (a11y) & Contrast**:
   - Every component with rendered markup gets a `jest-axe` test with one assertion per distinct render state (`.agents/skills/4-tdd/pre-commit.md`).
   - Verify text contrast: 4.5:1 for normal text, 3:1 for large text/interactive elements.
5. **Git & PR Strategy**:
   - Create a GitHub Issue (`gh issue create`).
   - Create a dedicated feature branch (`<issue-number>-<slug>`).
   - Make commits in logical, descriptive chunks.
   - Open Pull Request (`gh pr create`).
   - **Auto-Merge Approved**: Automatically merge PRs into `main` after all verification steps (tests, a11y sweeps, visual checks, pre-commit) pass cleanly.
6. **Copywriting Rule**:
   - **No em dashes** in copy, prose, or commit messages — use periods or commas.
7. **Testability-First Architecture & Near 100% Coverage Target**:
   - Separate stateful logic, sound control envelopes, and quote calculation formulas out of `.tsx` files into pure custom hooks (`src/hooks/*.ts`) and pure utility functions (`src/utils/*.ts`).
   - TSX components MUST remain purely presentational with explicit callback props (`onClick`, `onToggle`, `onSubmit`) for clean dependency injection and effortless unit testing (`Vitest` + `React Testing Library` + `jest-axe`). Target near 100% test coverage across all `.ts` and `.tsx` modules.

---

## Current Priority

Sanitization pass complete. Next priority: Write `docs/reference/design-direction.md` from `mockdrafts/mockdraft_dark.html` to unblock feature work on `src/components/{layout,sections,ui}/`.

---

## Docs & Reference Index

- **Design Direction**: `docs/reference/design-direction.md`
- **Handoff Documentation**: `docs/handoff/2026-08-04-antigravity-workflow-handoff.md`
- **Frontend Standards**: `.agents/skills/4-tdd/fe-standards.md`
- **Frontend Testing Patterns**: `.agents/skills/4-tdd/fe-testing-patterns.md`
- **Accessibility Checklist**: `.agents/skills/4-tdd/a11y-checklist.md`
- **Project Setup Checklist**: `docs/reference/project-setup-checklist.md`

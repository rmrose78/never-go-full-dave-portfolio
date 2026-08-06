# Workspace Rules for Antigravity (AGY)

Primary project rules and agent guidelines for this workspace. See [`AGY.md`](file:///Users/ryan/Desktop/Development/never-go-full-dave-portfolio/AGY.md) for full context.

## Stack Declaration
- **Frontend-only** (Vite + React + TypeScript + SCSS Modules). No backend.

## Pipeline & Workflows
- `/1-grill-me` → `/2-to-prd` → `/3-to-issues` → `/4-tdd`
- **Git PR & Auto-Merge Protocol**:
  - Always create a GitHub Issue (`gh issue create`) before pushing code.
  - Work on a dedicated branch (`<issue-number>-<slug>`).
  - Open Pull Request (`gh pr create`) with summary of changes.
  - Automatically merge PRs into `main` after automated verification passes.
  - Respect explicit developer restraints when instructed not to commit or push.

## Agent Guidelines & Subagent Isolation
- Run heavy visual and accessibility sweeps via isolated subagents (`invoke_subagent` with `Model: "flash"`).
- Render multi-section documentation, PRDs, issue specs, and walkthroughs as structured user-facing Artifacts.
- No em dashes in prose, copy, or commit messages.

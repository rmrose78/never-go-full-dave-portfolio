# Workspace Rules for Antigravity (AGY)

Primary project rules and agent guidelines for this workspace. See [`AGY.md`](file:///Users/ryan/Desktop/Development/never-go-full-dave-portfolio/AGY.md) for full context.

## Stack Declaration
- **Frontend-only** (Vite + React + TypeScript + SCSS Modules). No backend.

## Pipeline & Workflows
- `/1-grill-me` → `/2-to-prd` → `/3-to-issues` → `/4-tdd`
- All issue branches follow `<issue-number>-<slug>`. Never commit directly to `main`.

## Agent Guidelines & Subagent Isolation
- Run heavy visual and accessibility sweeps via isolated subagents (`invoke_subagent` with `Model: "flash"`).
- Render multi-section documentation, PRDs, issue specs, and walkthroughs as structured user-facing Artifacts.
- No em dashes in prose, copy, or commit messages.

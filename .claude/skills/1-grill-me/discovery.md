# Discovery — Read Before Asking Any Questions

Before interviewing the developer, read the codebase and report
what exists. This prevents asking questions that the codebase
already answers.

Check CLAUDE.md's stack declaration first — this repo may be
frontend-only or full-stack, and that determines whether the Backend
State section below applies at all.

## What to Read

### Project Context
- Read CLAUDE.md — understand stack, conventions, design direction, and
  whether this project currently has a backend
- Read README.md — understand the pitch and current status
- Read docs/prd/ — what features have already been planned?
- Read docs/issues/ — what work is already broken down?

### Frontend State
- Read package.json for installed dependencies
- Does src/styles/_variables.scss exist? Read it — design tokens defined?
- Does src/styles/_mixins.scss exist?
- Does src/components/layout/ exist? What's in it?
- Does src/components/sections/ exist? What sections are already built,
  in what order (check App.tsx)?
- Does src/types/ exist? What interfaces are defined?
- Is there a third-party service integration already in use (e.g. a form
  submission endpoint)? Where does it live?

### Backend State (only if CLAUDE.md declares this project has a backend)
- What routers/endpoints already exist?
- What schemas/models are already defined?
- What does the database schema currently look like?
- Skip this whole section entirely for a frontend-only project — don't
  ask backend discovery questions on a repo that doesn't have one.

## Report Format

Output this before asking any questions:

```
DISCOVERY COMPLETE

Project: <name from CLAUDE.md>
Stack: <frontend-only / full-stack, per CLAUDE.md>
Design direction: <found in CLAUDE.md / not defined>

Frontend:
- Scaffold: exists / does not exist
- Design tokens: defined / not defined
- Section order: <list from App.tsx>
- Existing types: <list or none>

Backend (skip if frontend-only):
- Routers/endpoints: <list or none>
- Schemas/models: <list or none>

Existing PRDs: <list or none>
Existing issues: <list or none>

Foundation needed before feature work: yes / no
Reason: <why if yes>

Starting interview...
```

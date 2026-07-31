---
name: 1-grill-me
description: Interview the developer about a feature before writing any code. Discovers project state first, then conducts UI/UX and feature interviews.
---

# Skill: grill-me

Before writing any code, discover what exists then interview the
developer. Think like a UI/UX designer and product engineer.

## Flow

```
1. Run discovery.md — report project state
2. If frontend missing or incomplete — run foundation questions
3. Run ux-interview.md — visual and interaction requirements
4. Run feature interview — functional requirements
5. Run confidence gate — shared/confidence-gate.md
6. Output GRILL COMPLETE summary
```

## Step 1 — Discovery
Read and follow discovery.md in this directory.

## Step 2 — Foundation Check
If discovery reveals the site does not exist or is missing core
infrastructure, ask these before feature questions:

- Do you have scaffolding started or is this from scratch?
- Do you have a design direction or should I read CLAUDE.md and propose one?
- What is the primary device target — desktop, mobile, or both?
- Is there a brand name or logo to incorporate?

Do NOT skip this if the scaffold doesn't exist.

## Step 3 — UI/UX Interview
Read and follow ux-interview.md in this directory.

## Step 4 — Feature Interview
Ask ONE question at a time. Wait for answer before next.

## Step 5 — Confidence Gate
Before producing the GRILL COMPLETE summary, run
`.claude/skills/shared/confidence-gate.md`. The question it's gating: is
there enough here that the feature summary has no gaps the developer will
have to correct later?

**What**
- What exactly does this feature do?
- What does success look like to the user?
- What is explicitly out of scope?

**Who**
- Who is the target user for this feature?
- What problem does it solve for them?

**Data**
- What data goes in (form fields, static content, API params)?
- What comes out (rendered content, persisted records, API responses)?
- What gets persisted — is anything sent to a third-party service, stored
  in a database (if this project has a backend), localStorage, or is this
  purely presentational?

**Edge Cases**
- What happens with invalid input?
- What happens if a third-party service call fails, or (if this project
  has a backend) a backend/database call fails?
- What are the boundary conditions (very long text, empty state, small
  viewport)?

**Integration**
- Does this require a new dependency?
- Does this touch routing or is it a single-page addition?
- Does this require a new third-party service integration?
- Does this touch the backend/database (if this project has one)?

## Rules
- ONE question at a time — never stack
- Wait for answer before asking next
- Never suggest implementation during this phase
- Never write code during this phase
- Read CLAUDE.md for project-specific context before starting, including
  its stack declaration (frontend-only vs full-stack) — don't ask
  backend questions on a project that has none

## When Done

```
GRILL COMPLETE

Project state:
- Scaffold: <exists / needs scaffolding>
- Stack: <frontend-only / full-stack, per CLAUDE.md>
- Foundation needed: <yes / no>
- Design direction: <from CLAUDE.md or approved proposal>

Feature summary:
- Feature: <one sentence>
- User: <who>
- Inputs: <what goes in>
- Outputs: <what comes out>
- States: <loading / empty / error / success behaviors>
- Edge cases: <list>
- Out of scope: <list>

Ready to run /to-prd
```

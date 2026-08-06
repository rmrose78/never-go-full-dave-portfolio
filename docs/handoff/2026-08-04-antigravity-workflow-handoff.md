# Handoff: Never Go Full Dave, project context for Antigravity

Written up for a fresh agentic workflow (Antigravity) to pick up this
project without re-deriving state that's already settled. Nothing in
`src/` is touched by this doc, it's context only. Read this before
running any interview/discovery flow against this repo.

## 1. What this project is

Never Go Full Dave is a portfolio site for a friend, Dave (Instagram
`nevergofulldave`), who paints Warhammer 40k and Age of Sigmar
miniatures. The repo is a frontend-only Vite + React + TypeScript
starter template. Per its `CLAUDE.md`:

> This project is frontend-only. It has no backend.

The scaffold exists (`npm run dev`, SCSS modules, Jest + RTL + jest-axe,
Playwright + axe-core all wired up) but no real site has been built yet.
`src/App.tsx` is still a placeholder `<h1>Starter</h1>`, and
`src/components/{layout,sections,ui}/` are empty directories with only
`.gitkeep` files in them. `docs/reference/design-direction.md` does not
exist yet either. This repo's own rules say never invent a design
direction silently, it has to come from what's described below.

## 2. How we got a design direction without guessing

Rather than pick a visual direction and build blind, two fully
self-contained static HTML mockdrafts were built (no build step, inline
CSS/JS) and sent to Dave to react to:

- `mockdrafts/mockdraft_dark.html`, a maximalist grimdark 40k direction
  (dark palette, heraldic eagle emblem, patina/tarnished-metal textures,
  particle effects, terminal/dataslate voice).
- `mockdrafts/mockdraft_light.html`, a clean, restrained professional
  direction (same section order and copy structure, quieter palette and
  motion, for apples-to-apples comparison).

Both files were originally named `flashy-v2.html` and
`professional-v4.html`. They got renamed to their current names outside
any tracked conversation session, the old filenames no longer exist
anywhere in the repo. `mockdrafts/assets/` holds the real CC-licensed
placeholder photography both files reference (with footer attribution
where the license requires it).

All earlier iterations (`flashy.html`, `professional.html`,
`professional-v2.html`, `professional-v3.html`, and one experiment
backup file) have been deleted. Only the two final files plus `assets/`
remain in `mockdrafts/`. Note: `mockdrafts/` has never been committed,
it's fully untracked in git. There is no history or diff safety net on
those two files, treat them carefully.

## 3. Dave picked a direction

Dave's reply, verbatim, worth keeping for tone:

> Dude these are sick! Great start. I definitely prefer the darker
> theme (the second one). I got too stoned and ended up just deleting
> old photos and crying at pictures of Olivia (she passed away sadly).
> so I still haven't got a portfolio together. the layout and features
> look great, "Dispatches" as a blog title thing is dope. What more
> input would help you the most? Is it mostly media? I just got a light
> box for more professional photography, so I'll be able to take higher
> quality stuff soon.

The developer's reply back, also worth keeping for the working
relationship's tone (casual, no over-explaining, genuine condolence
first):

> Oh man, sorry to hear about Olivia, sweet dog. That really sucks.
> Glad you like the second; I liked that one better too. I can get
> started if there wasn't something major you wanted added or removed?
> If not, I can start building out the codebase now.

**Decision: build the dark direction (`mockdraft_dark.html`) for real.**
The light/professional direction is kept for reference only, it is not
being built, do not delete it and do not build it out further.

Dave does not have real photos ready yet (a rough personal stretch, see
above) but just bought a lightbox and will supply real photography
incrementally. Build with the existing CC-licensed placeholders for now
and swap in real photos as they arrive, do not block the build waiting
for them.

The first real step for whatever workflow picks this up: write
`docs/reference/design-direction.md` from `mockdraft_dark.html` (palette,
typography, spacing, component feel, motion), since that file existing
is what unblocks this repo's real pipeline per its own CLAUDE.md rule.

## 4. What's still genuinely open (do not pre-decide, this is what the next interview should resolve)

**Content-authoring pipeline for Dave.** How does Dave update blog posts
and gallery photos after launch, without the developer hand-editing
every change. Three options are on the table, not yet decided:

1. Give Dave a GitHub account, VS Code, and the Claude Code CLI.
   Content lives as files in the repo. Define a restricted "manager
   mode" in this repo's CLAUDE.md that Dave's own sessions operate
   under, developer reviews at check-in. Real autonomy with guardrails,
   but requires Dave to adopt an actual dev workflow.
2. A URL-key-param-gated admin panel built into the app itself, unlocked
   by a secret validated against a hosting-platform env var. Dave edits
   through a normal web UI, no GitHub or CLI needed on his end. This
   requires some backend or serverless surface, which contradicts the
   project's current frontend-only stack declaration, that tradeoff
   needs to be made explicit if this option is chosen.
3. Static content in the repo for now (developer updates it as Dave
   sends material, same as today), but keep the content data shape
   (a typed interface for posts/gallery items) decoupled enough that
   either option above can be swapped in later without a rewrite.

Whichever gets picked constrains the data-layer and component
architecture, this should be resolved early in the next real interview
pass, not left implicit.

**Hosting/deploy target.** Not chosen yet. The developer told Dave he'll
host an early build so Dave can preview it, then hand over hosting
control once it's further along. Whatever platform gets picked here also
constrains option 2 above (needs secret/env var support).

**Commission-inquiry mechanism.** Both mockdrafts use a plain `mailto:`
link for commission requests. Whether that ships as-is or becomes a real
form (would need a third-party form service, since this repo has no
backend) is undecided.

**"Dispatches" (the blog section).** Dave explicitly liked this name for
the blog/notes section. It needs a real content source once the
authoring-pipeline decision above lands, right now both mockdrafts treat
it as a styled placeholder.

## 5. Working agreements worth carrying over

- No more round-trip confirmation is needed from Dave on visual/design
  specifics now that a direction is picked. Implement using judgment as
  content and feedback arrive, rather than blocking on approval for
  every detail.
- This repo's real feature pipeline gates all implementation work, per
  CLAUDE.md:

  > All AI-assisted feature work goes through the pipeline:
  > `/1-grill-me` → `/2-to-prd` → `/3-to-issues` → `/4-tdd`. Every issue
  > gets its own GitHub issue and its own branch
  > (`<issue-number>-<slug>`) before any code is written, never
  > implement directly on `main`.

- No em dashes in copy, prose, or commit messages, repo-wide rule. This
  doc follows it too.
- **A structural gotcha worth flagging regardless of which workflow
  runs this project**: during this project's mockdraft phase, a single
  background-agent task handle ended up being resumed from two
  different parallel conversation threads at once, and received
  conflicting instructions from each. This caused the same unauthorized
  copy change to be applied, reverted, and reapplied to both mockdraft
  files multiple times before it was caught. The fix each time was to
  never trust a task's own self-reported "done" status, and instead
  independently re-check actual file state (grep/read the file) before
  treating any background task's report as ground truth. Any workflow
  that allows a long-lived task or agent handle to be addressed from
  more than one place should assume this can happen.

## 6. Where the real conventions live (pointers, not copies)

- Frontend component/SCSS/TypeScript conventions:
  `.claude/skills/4-tdd/fe-standards.md`
- Frontend testing patterns (red-green, stateful-async testability):
  `.claude/skills/4-tdd/fe-testing-patterns.md`
- Accessibility checklist: `.claude/skills/4-tdd/a11y-checklist.md`
- Forking/setup checklist: `docs/reference/project-setup-checklist.md`
- The two mockdrafts themselves are the real spec for section order,
  copy tone, and visual language: `mockdrafts/mockdraft_dark.html`
  (build this one) and `mockdrafts/mockdraft_light.html` (reference
  only).

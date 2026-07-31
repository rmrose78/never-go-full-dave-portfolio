# Project Setup Checklist

Run through this once a project forked from this template has real
content and is heading toward a first deploy. Not everything applies to
every project — skip what genuinely doesn't fit, but don't skip silently;
note why in the project's own CLAUDE.md if it's a deliberate omission.

## Bootstrap sequence for a brand-new project
- [ ] Run `/init` to generate a CLAUDE.md from the actual codebase
- [ ] Run the `claude-md-organizer` skill — its Pass 0 checks the
      `.claude/skills/` set and CLAUDE.md skeleton are complete (filling
      gaps, not overwriting anything already there), then its Pass 1
      slims CLAUDE.md down to what's load-bearing every session
- [ ] `.claude/skills/4-tdd/be-standards.md` and `pytest-fix/SKILL.md` are
      now part of this template's baseline skill set (inert until the
      project actually has a backend — CLAUDE.md's Stack Declaration
      should say so explicitly, see below)

## Repo hygiene
- [ ] `package.json` metadata updated for this project (name, author,
      repo/homepage URL) — template placeholders are easy to forget
- [ ] `LICENSE` file present and correct for this project's actual intent
- [ ] `.env.example` committed with every required variable name (no
      real values); `.env`/`.env.local` gitignored
- [ ] `docs/handoff/` directory present for future cross-project handoffs

## CI and dependency hygiene
- [ ] GitHub Actions workflow running build + lint + test on push/PR to
      main (`.github/workflows/ci.yml`)
- [ ] Dependabot config for npm + github-actions ecosystems, weekly
      interval (`.github/dependabot.yml`)

## Discoverability
- [ ] README has a quickstart section: install, env setup, run, deploy
- [ ] `robots.txt` present (`public/robots.txt`) — skip `sitemap.xml` for
      single-page sites, low value for the effort
- [ ] `index.html` has: meta description, canonical URL, OG title/
      description/image tags. Use a real screenshot for the OG image, not
      a placeholder. Skip Twitter/X card tags unless there's an actual
      X/Twitter presence to back them

## Testing and accessibility
- [ ] jest-axe test on every component with rendered markup, one
      assertion per meaningfully distinct render state, not just the
      default render
- [ ] Contrast-ratio utility (`src/utils/contrast-ratio.ts`, already in
      this template) wired up against the project's actual design tokens
      once a real palette is chosen — jsdom can't paint pixels, so this
      is the only reliable automated contrast check pre-browser-sweep
- [ ] Real-browser a11y sweep (`npm run test:a11y`, Playwright +
      axe-core, already in this template) and Lighthouse a11y script
      (`npm run lighthouse:a11y`) still wired up and passing against real
      composed pages, not just isolated components
- [ ] Testability-first design principle called out in this project's
      own CLAUDE.md Critical Rules, not just assumed to carry over from
      this template — link back to this checklist item
- [ ] Coverage: `collectCoverageFrom` excludes bootstrap/env files (e.g.
      `main.tsx`, `env.ts`); `coverageThreshold` set at or just below the
      real achieved number once meaningful tests exist. Never chase 100%
      for its own sake — decorative/animation code with genuine
      environment barriers (jsdom has no layout engine, no real
      `PointerEvent`) is fine to leave documented and uncovered rather
      than smoke-tested for the sake of a number
- [ ] If a coverage badge is added, it's paired with the threshold above
      so it actually gates regressions instead of just displaying a
      number that can silently go stale

## Documentation
- [ ] Architecture diagram doc (`docs/reference/architecture.md`) once
      the deploy topology is decided — even a simple flowchart of
      build → host → external services
- [ ] House style rules (no em dashes, collaboration style, etc.) carried
      into this project's own CLAUDE.md if applicable — don't assume they
      inherit from this template once the project has its own file

# Handoff: FE starter modernization

Scanned and written up, not executed. This repo's `src/`, `package.json`,
and other application code are untouched by this handoff — only
`.claude/` and this doc were added. Do this work in a dedicated session
in this repo.

## Why this exists

This repo started as a snapshot of `rr-dev` and was never genericized.
Real bugs and rr-dev-specific branding are still baked in, and the
accessibility/testing stack this template wants to showcase (matching
rr-dev's mature setup) was never actually wired up here.

## 1. Real bugs found (fix these regardless of anything else below)

- **`jest.config.ts` has an invalid config key.** It uses
  `setupFilesAfterFramework`, which is not a real Jest option — the
  correct key is `setupFilesAfterEnv`. As written, `@testing-library/
  jest-dom`'s matchers (`toBeInTheDocument()`, etc.) are very likely not
  loading at all, silently. Fix:
  ```ts
  export default {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['@testing-library/jest-dom'],
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',
      '\\.(scss|css)$': 'identity-obj-proxy',
    },
    transform: { '^.+\\.tsx?$': 'ts-jest' },
  }
  ```
  Verify the fix actually did something: write one throwaway test using
  `toBeInTheDocument()`, confirm it fails without the fix and passes with
  it — don't just trust that changing the key name was enough.
- **`src/main.tsx` imports `globals.scss` twice** (once before the
  Tailwind import, once after). Removing Tailwind (section 3 below) also
  removes the second import as a side effect, but if Tailwind removal
  happens first, come back and confirm only one `globals.scss` import
  remains.

## 2. Sanitization

This repo currently reads as a lightly-stripped copy of rr-dev, not a
generic template. Concretely:

- `package.json`'s `"name"` is `"rr-dev"` — rename to something generic
  (`"vite-react-ts-starter"` or similar).
- `index.html`'s `<title>` is `rr-dev` — same fix.
- `App.tsx` renders `<h1>rr.dev</h1>` as its only content — replace with
  genuinely placeholder content (e.g. "Starter" or a comment explaining
  this is meant to be replaced).
- `src/styles/_variables.scss` has rr-dev's exact brand palette baked in
  (`$navy: #040d1a`, `$electric-blue: #38bdf8`, `$teal: #64e4c8`) and its
  exact font choices (Syne / DM Mono / DM Sans, pulled from Google Fonts
  via `@import url(...)` in `globals.scss`). Replace with clearly-labeled
  placeholder tokens — a comment like `/* placeholder — replace with
  your own palette */` above the color block, and either drop the
  Google Fonts import or replace it with system fonts as the default,
  noting in a comment how to swap in custom fonts.
- `src/assets/hero.png` — an actual portfolio hero image left in the
  starter. Remove it; there's nothing generic about it.
- `public/favicon.svg` and `public/icons.svg` (and their duplicates
  under `src/assets/`) — check these render as something generic before
  deciding to keep or replace. If they're personal-brand icons, swap for
  a neutral placeholder mark.
- `README.md` is rr-dev's own README, describing sections (Hero/About/
  Skills/Experience/Testimonials/Contact) and components (Button/Modal/
  Pill/StatCard) that don't exist in this repo — only empty `.gitkeep`
  placeholders do in `src/components/{layout,sections,ui}/`. Rewrite the
  README to describe this repo's actual state: a scaffold, not a
  finished site. Keep describing, as-is, the parts genuinely worth
  showcasing:
  - SCSS-modules-per-component convention (one `.module.scss` next to
    each component, camelCase classes, no BEM)
  - The AAA (Arrange/Act/Assert) test-structure convention
  - The `@/` → `src/` path alias
  - The mobile-first breakpoint convention (`min-width` only, never
    `max-width`)

## 3. Tailwind removal

Tailwind v4 is wired up (`@tailwindcss/postcss`, CSS-first config, no
`tailwind.config.*` file) but zero components actually use a utility
class — `globals.scss` + SCSS variables do all the real styling.
Remove:
- `tailwindcss`, `@tailwindcss/postcss`, `postcss`, `autoprefixer` from
  `devDependencies`
- `postcss.config.js`
- `src/styles/tailwind.css`
- The `import '@/styles/tailwind.css'` line in `main.tsx` (this also
  fixes the duplicate `globals.scss` import noted in section 1, since
  that import sits between the two `globals.scss` imports)

## 4. Dependency updates

Bring this repo's versions in line with rr-dev's post-modernization
state (verified working there as of this handoff):

| Package | This repo has | Bring to |
|---|---|---|
| `jest` | ^30.4.2 | keep, already current |
| `ts-jest` | ^29.4.11 | ^29.4.12 |
| `@testing-library/react` | ^16.3.2 | keep, already current |
| `@testing-library/jest-dom` | ^6.9.1 | ^7.0.0 (verify against the config fix in section 1 together) |
| `@testing-library/user-event` | ^14.6.1 | keep, already current |
| `@types/jest` | ^30.0.0 | keep, already current |
| `@types/node` | ^24.12.4 | ^26.1.2 |
| `@types/react` | ^19.2.14 | ^19.2.17 |
| `@types/react-dom` | ^19.2.3 | keep, already current |
| `react` / `react-dom` | ^19.2.6 | ^19.2.8 |
| `vite` | ^8.0.12 | ^8.1.5 — **check this machine's Node version first** (see the gotcha below) |
| `eslint` | ^10.3.0 | ^10.8.0 |
| `typescript` | ~6.0.2 | ~6.0.3 (stop there — `typescript-eslint` doesn't support TS 7.0 yet, tracked upstream in `typescript-eslint/typescript-eslint#10940`; don't bump past 6.x until that's resolved) |

**Gotcha found in rr-dev, will likely reproduce here**: Vite 8.1.5 (and
its bundled `rolldown`) ships a native binding as an *optional*
dependency gated by an `engines.node` check. If the machine running
`npm install` has Node below `22.12.0`, npm silently skips installing
that binding — no error at install time, but the build then fails at
runtime with `Cannot find module './rolldown-binding.darwin-universal.node'`
(or the equivalent for your platform). This isn't a version-pinning
problem, it's a Node-version problem: install/use a Node ≥22.12.0 or in
the `^20.19.0` range (e.g. via `nvm use <compatible-version>` for just
this repo, without changing any global default) before running
`npm install` here. Add an `engines` field once a target Node version is
settled (see section 9).

Also skip `@vitejs/plugin-react@6.0.4` if you get there — it has a
broken peer chain wanting `@babel/core@^8.0.0` while the rest of the
Jest/ESLint toolchain is still on Babel 7. Stay on `^6.0.2` until that's
resolved upstream.

## 5. Add jest-axe

Add `jest-axe` (`^11.0.0`, matching rr-dev) and `@types/jest-axe` as
devDependencies. Add a contrast-ratio test pattern, genericized from
rr-dev's `src/utils/contrast-ratio.ts` (`contrastRatio()`,
`WCAG_AA_NORMAL_TEXT = 4.5`, `WCAG_AA_LARGE_TEXT = 3`, plain hex-math, no
dependencies) plus a `design-tokens.contrast.test.ts` that hand-mirrors
whatever real color tokens end up in `_variables.scss` after section 2's
sanitization — comment at the top of that file noting it's a manually
maintained mirror that must be updated whenever a token's hex value
changes.

## 6. Add Playwright + `@axe-core/playwright`

Add `@playwright/test` and `@axe-core/playwright` as devDependencies.
Add `playwright.config.ts` (rr-dev's is a good starting point —
`testDir: './e2e'`, `fullyParallel: false` / `workers: 1` since parallel
Chrome instances can race animation timing and produce false contrast
positives, `contextOptions: { reducedMotion: 'reduce' }` so the sweep
runs against the settled state, `channel: 'chrome'` in the `chromium`
project — **this last one matters**: Playwright's own bundled Chromium
build was unsupported on macOS 13 as of Playwright 1.62, so this repo
uses the system-installed Chrome instead via the `channel` option).

Add an `e2e/a11y.spec.ts` testing key routes/interactive-open states at
375px and 1440px viewports. Add the `test:a11y` script:
```json
"test:a11y": "playwright test"
```

Also wire up Playwright MCP so Claude Code can drive the browser
directly during `/visual-check` and `/a11y-sweep`. In
`.claude/settings.local.json` (create if it doesn't exist):
```json
{
  "permissions": {
    "allow": [
      "mcp__playwright__browser_navigate",
      "mcp__playwright__browser_resize",
      "mcp__playwright__browser_console_messages",
      "mcp__playwright__browser_click",
      "mcp__playwright__browser_take_screenshot",
      "mcp__playwright__browser_evaluate",
      "mcp__playwright__browser_snapshot"
    ]
  },
  "enabledMcpjsonServers": ["playwright"]
}
```

## 7. Add Lighthouse a11y check

Add `lighthouse` as a devDependency and the script:
```json
"lighthouse:a11y": "lighthouse http://localhost:5173 --only-categories=accessibility --output=html --output-path=./lighthouse-a11y-report.html --chrome-flags='--headless' --view"
```
Dev server must be running first — this script doesn't manage its own
server lifecycle the way Playwright's `webServer` config does.

## 8. Add `eslint-plugin-jsx-a11y`

Add as a devDependency, wire into the flat `eslint.config.js`. If this
repo's ESLint config uses the same `overrides` trick rr-dev does to pin
`eslint-plugin-jsx-a11y`'s own `eslint` peer to the root project's
version (`"eslint-plugin-jsx-a11y": { "eslint": "$eslint" }` in
`package.json`'s `overrides`), carry that over too — otherwise a
mismatched nested `eslint` copy can produce confusing duplicate-rule
warnings.

## 9. Add `engines` field + `.nvmrc`

Once a target Node version is settled (informed by section 4's Vite
gotcha — needs `^20.19.0` or `>=22.12.0`), add both:
```json
"engines": { "node": "^20.19.0 || >=22.12.0" }
```
and a matching `.nvmrc`. Neither exists in this repo currently.

## 10. Port the `.claude` directory

Already done as of this handoff — see this repo's `.claude/` directory
(skills pipeline, genericized `fe-standards.md`, both a frontend and a
backend TDD flow gated by this `CLAUDE.md`'s stack declaration, the
portable `manual-a11y-verification` and `claude-md-organizer` skills).
Nothing further needed here unless the pipeline itself needs
adjustment once real feature work starts.

## Also noticed, out of scope for this handoff

A large number of untracked, stray " 2"-suffixed duplicate files have
been showing up across `rr-dev` and `researchpulse` during the same
session this handoff was written in (e.g. a stray `package.json 2` in
researchpulse's `frontend/`) — confirmed byte-identical to their
canonical counterparts where checked, harmless but noisy. Likely a
background sync/backup tool (iCloud Drive conflict resolution is the
usual suspect) rather than anything caused by this work. Worth checking
whether this repo has any before starting the above, and worth tracking
down the actual sync tool causing it across all three repos rather than
cleaning up after it repeatedly.

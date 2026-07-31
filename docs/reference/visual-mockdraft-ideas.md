# Visual mockdraft idea bank

Not a spec, not rr-dev's site. A list to skim when sketching a new
project's visual direction, so you're picking from a menu instead of
starting blank. Treat everything here as "worth considering," never
"do this."

## Proven in rr-dev (real, shipped, worth reusing the *idea* of)

- **Velocity-reactive particle trail.** Starfield dots grow a motion
  trail scaled to cursor/scroll velocity, decaying over time
  (`useStarTrail` + a CSS custom property driving width/opacity). The
  reusable idea: tie a visual property to *speed of change*, not just
  presence/absence — it reads as physical, not scripted.
- **Box-outline-then-fill hover**, not underline-grow. A border traces
  in first (`scaleY` from 2 → 1 on a pseudo-element), then a fill
  sweeps in behind the text on top. Two-stage hover states read as more
  considered than a single instant color swap.
- **Motion gated behind `prefers-reduced-motion`, not bolted on after.**
  Every animated effect had its reduced-motion fallback written in the
  same pass as the effect itself, not retrofitted. Bake the check into
  the first draft of any animation, not a later accessibility pass.
- **Real scroll-position-aware fixed elements.** Nav and full-screen
  overlays anchor to the viewport (`position: fixed`), not the document
  (`position: absolute`) — the failure mode when you get this wrong
  (content stuck off-screen after scrolling) only shows up after
  scrolling, so it's easy to ship broken and not notice in a quick
  check at scroll position 0.

## Worth exploring next time (not built yet, genuinely interesting)

- **"Light-speed" entry burst.** On initial load, particles/lines
  streak radially outward from center at high velocity and rapidly
  decelerate into their resting state — a warp-jump-to-sublight beat
  instead of a fade-in. Pairs naturally with the velocity-trail system
  above since the trail-length logic already exists; entry becomes a
  scripted burst of "fake" velocity rather than real cursor input.
- **Magnetic buttons/links.** Element subtly translates toward the
  cursor within a small radius before the pointer actually reaches it
  (transform based on cursor distance, clamped and eased back to
  center on mouseleave). Reads as tactile; costs one `mousemove`
  listener and a spring easing.
- **Text scramble-to-resolve reveal.** Heading characters cycle through
  random glyphs briefly before settling into the real word, staggered
  left to right. Strong for a hero headline's first paint; overused
  elsewhere.
- **Scroll-linked color temperature shift.** Background gradient hue or
  a lighting-accent color drifts gradually across the whole scroll
  length (e.g., cooler at the top, warmer by the footer) rather than
  a single flat background. Subtle enough to not fight content, gives
  a sense of "this page has depth," not just a series of stacked
  sections.
- **Clip-path staggered reveal on scroll-into-view.** Instead of
  opacity/translate fade-ins (the default everyone reaches for first),
  reveal via an expanding `clip-path` (inset or circle) per element,
  staggered a few ms apart in a list/grid. Reads as more deliberate
  than a fade, same underlying IntersectionObserver mechanism.
- **SVG line-draw on scroll.** `stroke-dasharray`/`stroke-dashoffset`
  animated by scroll progress for line-art icons or section dividers —
  the drawing itself becomes the scroll progress indicator.
- **Idle micro-motion.** A very slow, subtle drift/breathing animation
  (barely perceptible scale or position oscillation, several seconds
  per cycle) on a hero graphic or icon set when nothing else is
  happening, so the page doesn't feel static between interactions.
  Must respect reduced-motion since it's motion with zero functional
  purpose.

## Ground rules regardless of which ideas get used

- **Any opacity blend on text needs a contrast recheck**, not just the
  flat token's contrast. Opacity composites the text color toward
  whatever's behind it — this exact mistake shipped in rr-dev's footer
  (`$text-muted` at `opacity: 0.7` looked fine as a token, failed WCAG
  AA once blended against the real background) and was only caught by
  a real-browser a11y sweep, not a component-level test. Recompute
  contrast against the *actual rendered* color, not the source token.
- **Reduced-motion is not optional polish** — decide the reduced-motion
  behavior (usually: skip straight to end state, no animation) at the
  same time you decide the effect, not after.
- **Canvas/particle effects need a performance budget stated up front**
  (target device tier, max particle count, whether it pauses when the
  tab is backgrounded) — these are the effects most likely to silently
  tank mobile performance if scoped only for a dev laptop.
- **Verify any layout/animation effect in a real browser**, not just
  jsdom/RTL — CSS positioning, real compositing (opacity, blend modes),
  and scroll-driven behavior are all invisible to a mocked-SCSS test
  environment (see `fe-standards.md`'s testing-layers note).

# Frontend Testing Patterns

Read this before writing or backfilling tests for a component. For
component/SCSS/TypeScript conventions (building the component itself),
see `fe-standards.md` instead — that file is for building, this one is
for testing.

## Red-Green Discipline
- Red-green applies to every test you write, not just `/4-tdd` feature
  builds: after writing an assertion, temporarily break the behavior it
  claims to cover, confirm the test fails for that reason, then restore
  and confirm it passes. A test that's never been red is unverified —
  it could be passing vacuously (weak selector, wrong assertion) and
  there'd be no way to know
- This applies just as much when backfilling tests onto already-shipped
  code (increasing coverage, not building a new feature) as it does to
  a fresh `/4-tdd` build — it's just as easy to write a vacuous test
  against existing code as against new code

## Testability of Stateful Async Processes

**Stateful async processes** (animation loops, retry sequences,
multi-step flows) need their state-transition logic kept separate from
the side-effecting calls that drive it. If a hook decides what happens
next by directly `await`ing an animation promise (e.g. a loop that
awaits `controls.start()` to know when to move to the next phase), the
state machine and the animation execution become inseparable — and
untestable without mocking Framer Motion's internals, which breaks
easily (`AnimationControls` isn't a plain value; other props on the
same element depend on its real shape). Prefer: a pure function that
answers "given the current phase and this event, what's the next
phase," with a thin effect layer that calls `controls.start()`/`.stop()`
in response. The pure part is trivially unit-testable with zero
mocking; the thin part is left to a smoke test.

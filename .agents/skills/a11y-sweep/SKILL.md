---
name: a11y-sweep
description: Real-browser accessibility sweep (Playwright + axe-core) executed via an isolated subagent to prevent context bloat. Opt-in only.
---

# Skill: a11y-sweep

Invoke this skill when requested by the developer via `/a11y-sweep`.

## Core Upgrade: Subagent Execution
Real-browser accessibility scanning generates large DOM violation dumps and JSON payloads. To keep the main conversation thread clean and fast, delegate the sweep to a subagent:

```json
{
  "Subagents": [
    {
      "TypeName": "research",
      "Role": "Accessibility Sweep Subagent",
      "Model": "flash",
      "Prompt": "Run npm run test:a11y against http://localhost:5173. Group axe-core violations by WCAG criterion and return a condensed summary report."
    }
  ]
}
```

## Steps
1. Subagent runs `@axe-core/playwright` scan at mobile (375px) and desktop (1440px) viewports across interactive states (e.g. navigation menu open).
2. Subagent filters transition/animation timing artifacts.
3. Subagent returns condensed summary report grouped by WCAG impact (Critical, Serious, Moderate, Minor).

## Report Schema

```
A11Y SWEEP RESULTS

Automated Suite (@axe-core/playwright):
- [pass/fail] Homepage Mobile (375px)
- [pass/fail] Homepage Desktop (1440px)
- [pass/fail] Navigation Open State

Violations Summary:
- <rule-id> (<impact>) — <element selector> — WCAG <criterion> — <fix recommendation>

Manual Checklist Reminders:
- Full-page tab sequence
- Focus-visible rendering
- Screen reader audio clarity
```

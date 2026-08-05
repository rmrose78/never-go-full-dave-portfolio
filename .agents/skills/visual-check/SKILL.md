---
name: visual-check
description: Playwright MCP-driven visual verification loop using isolated subagent execution and side-by-side screenshot carousels in Artifacts. Opt-in only.
---

# Skill: visual-check

Invoke this skill when requested by the developer via `/visual-check` or during `/4-tdd` verification.

## Core Upgrade: Subagent Context Isolation
Unlike legacy inline execution, `visual-check` delegates the tool-call-dense screenshot and computed-style evaluation loop to a dedicated background subagent:

```json
{
  "Subagents": [
    {
      "TypeName": "research",
      "Role": "Visual Verification Subagent",
      "Model": "flash",
      "Prompt": "Run Playwright visual verification for route http://localhost:5173 against docs/reference/design-direction.md tokens. Capture 375px mobile and 1440px desktop screenshots, compare computed styles, and return a clean summary."
    }
  ]
}
```

## Flow

1. **Subagent Execution**: Subagent navigates to route via Playwright MCP, takes mobile (375px) and desktop (1440px) screenshots, and inspects computed CSS properties (`padding`, `color`, `font-family`, `border-radius`).
2. **Computed Style Diff**: Compares computed properties against tokens in `docs/reference/design-direction.md`.
3. **Artifact Carousel Output**: Embeds rendered screenshots side-by-side using Antigravity markdown `carousel` formatting inside a visual report Artifact:

````carousel
![Mobile View (375px)](/path/to/mobile_screenshot.png)
<!-- slide -->
![Desktop View (1440px)](/path/to/desktop_screenshot.png)
````

4. **Developer Review Gate**: Presents the Artifact to the developer for final sign-off. Never auto-commit without explicit developer approval.

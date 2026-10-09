# Human Craft UI/UX Standard (Anti-AI-Trope Rules)

Guidelines for Antigravity agents building interfaces in this repository. These rules prevent common "AI-generated UI" hallmarks and ensure every interface feels bespoke, intentional, and human-crafted.

---

## The 5 AI Traps to Eliminate

### 1. The "Everything Glows" Disease
* **The AI Trope**: Slapping `box-shadow: 0 0 25px rgba(...)` and saturated glowing borders on every card, form container, and button simultaneously.
* **The Human Craft Rule**:
  * **One focal glow per viewport maximum**: Reserve vibrant glow exclusively for active inputs, primary conversion actions (e.g. the Transmit button), or the hero centerpiece.
  * **Surface separation through luminosity, not neon borders**: Separate cards from background using subtle value steps (e.g. `#080706` background $\rightarrow$ `#12100e` card surface) and crisp hairline edges (`rgba(212, 178, 101, 0.14)`).
  * **Natural directional shadows**: Use deep ambient occlusion (`0 10px 30px rgba(0, 0, 0, 0.75)`) rather than diffuse colored neon blur.

### 2. Section Cadence & Layout Monotony
* **The AI Trope**: Repeating the exact same layout template for every single section:
  `[Small Kicker Pill] -> [H2 Title] -> [Muted Lede Paragraph] -> [Grid of 3-4 identical cards] -> [Decorative Divider Rule]`.
* **The Human Craft Rule**:
  * **Vary spatial density and layout rhythm**:
    * Showcase sections should be asymmetric, full-bleed or wide editorial spreads.
    * Pricing/standards should be crisp, high-density data comparisons.
    * Quote wizards should feel like an industrial hardware console.
  * **Do not stamp identical divider rules between every section**: Use background tonal gradations or natural whitespace steps. Reserve industrial hazard rules strictly for deliberate thematic shifts (e.g. entering the Commission intake terminal).

### 3. Over-Animation & Friction Gimmicks
* **The AI Trope**: Adding matrix glyph scrambles, delayed typewriter terminals, and floating particles that delay the user from reading actual information.
* **The Human Craft Rule**:
  * **Information first, animation second**: Animations must be instantaneous or gracefully non-blocking. Never hide primary branding or headers behind multi-second terminal sequence blockers.
  * **Respect reduced motion unconditionally**: Every CSS transition and JavaScript animation must respect `prefers-reduced-motion: reduce`.
  * **Crisp transition timing**: Use 120ms–180ms ease-out transitions for interactive feedback. Sluggish 0.3s+ transitions feel floaty and unresponsive.

### 4. Tactile Feedback (Mechanical Precision)
* **The AI Trope**: Cards that only have a floaty hover lift (`translateY(-6px)`) with no `:active` pressed state, no tactile feedback, and fuzzy focus rings.
* **The Human Craft Rule**:
  * **Every interactive element must have 4 distinct states**: Default, Hover, Active (Pressed), and Focus-Visible.
  * **Add tactile `:active` feedback**: Mechanical micro-depression on click (`transform: translateY(0) scale(0.99)` or inset shadow).
  * **WCAG-compliant keyboard focus**: High-contrast, sharp 2px outline with 2px offset (`:focus-visible`).

### 5. Copywriting: Authentic Studio Voice vs LLM Buzzwords
* **The AI Trope**: Generic corporate platitudes ("Elevate your hobby journey", "Precision, patience & discipline", "Testament to artistry", "Cutting-edge glazes").
* **The Human Craft Rule**:
  * **Write like an authentic tabletop craftsman**: Use genuine hobbyist and tabletop terminology (mold lines, airbrush cleaning, sprue status, recipe documentation, tournament-ready durability).
  * **Direct, grounded statements**: Speak directly to the collector. No fluff, no marketing jargon.
  * **Strict grammar rule**: Never use em dashes (—). Use periods, commas, or clean hyphens per `AGY.md`.

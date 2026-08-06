# Issue 4: Industrial Fixed Audio Widget & Custom Hook

## What
Build fixed bottom-right rusted industrial audio widget with vertical 3D toggle switch, gloomy flickering bulb indicator, and `useIndustrialAudio` custom hook.

## Why
Provides the studio's signature industrial techno audio experience with high-craft thematic visual and sound feedback.

## Acceptance Criteria
- [ ] Implement `useIndustrialAudio` custom hook (`src/hooks/useIndustrialAudio.ts`) managing HTML5 audio playback, volume envelope fade-in/out, and web audio click feedback.
- [ ] Implement `IndustrialAudioWidget` component (`src/components/ui/IndustrialAudioWidget/IndustrialAudioWidget.tsx`) fixed in bottom-right corner.
- [ ] Render rusted metallic panel with corner screws, speaker grill SVG, gloomy warehouse light bulb (emerald green ON, crimson red OFF with voltage flicker keyframes), and 3D toggle switch lever.
- [ ] Add `aria-pressed` state and `aria-live="polite"` screen reader audio announcements.
- [ ] Provide 100% unit tests for `useIndustrialAudio` hook and `IndustrialAudioWidget` component with `jest-axe`.

## Layers Touched
- [ ] Frontend — `src/hooks/useIndustrialAudio.ts`, `src/components/ui/IndustrialAudioWidget/*`
- [ ] Tests/a11y — `useIndustrialAudio.test.ts`, `IndustrialAudioWidget.test.tsx` with jest-axe

## Edge Cases
- Browser blocks audio autoplay → audio remains paused until explicit user click on rusted toggle switch.

## Blocked By
- Issue 1.

## Definition of Done
- [ ] Implementation complete per fe-standards.md
- [ ] Unit tests passing (`npm test`)
- [ ] Red-green TDD verified
- [ ] jest-axe passing on every distinct render state

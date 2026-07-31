// This is a manually maintained mirror of the color tokens in
// src/styles/_variables.scss. SCSS variables aren't importable into Jest,
// so update the hex values here whenever a token's hex value changes.
import {
  contrastRatio,
  WCAG_AA_NORMAL_TEXT,
  WCAG_AA_LARGE_TEXT,
} from './contrast-ratio'

const colorBg = '#14161a'
const colorFg = '#f5f5f5'
const colorAccent = '#8b96a6'

describe('design token contrast', () => {
  it('body text meets AA normal text contrast against the body background', () => {
    expect(contrastRatio(colorFg, colorBg)).toBeGreaterThanOrEqual(WCAG_AA_NORMAL_TEXT)
  })

  it('the focus/selection accent meets AA large text / UI contrast against the body background', () => {
    expect(contrastRatio(colorAccent, colorBg)).toBeGreaterThanOrEqual(WCAG_AA_LARGE_TEXT)
  })
})

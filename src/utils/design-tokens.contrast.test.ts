// Mirror of the color tokens in src/styles/_variables.scss for Jest contrast auditing.
import {
  contrastRatio,
  WCAG_AA_NORMAL_TEXT,
  WCAG_AA_LARGE_TEXT,
} from './contrast-ratio'

const colorVoid = '#080706'
const colorText = '#ece9e2'
const colorTextMuted = '#a49f94'
const colorBrass = '#d4b265'
const colorEmber = '#ff6e4a'

describe('design token contrast', () => {
  it('body text (#ece9e2) meets AA normal text contrast against void background (#080706)', () => {
    expect(contrastRatio(colorText, colorVoid)).toBeGreaterThanOrEqual(WCAG_AA_NORMAL_TEXT)
  })

  it('muted text (#a49f94) meets AA normal text contrast against void background (#080706)', () => {
    expect(contrastRatio(colorTextMuted, colorVoid)).toBeGreaterThanOrEqual(WCAG_AA_NORMAL_TEXT)
  })

  it('brass metallic accent (#d4b265) meets AA text contrast against void background (#080706)', () => {
    expect(contrastRatio(colorBrass, colorVoid)).toBeGreaterThanOrEqual(WCAG_AA_NORMAL_TEXT)
  })

  it('ember orange accent (#ff6e4a) meets AA large text / UI contrast against void background (#080706)', () => {
    expect(contrastRatio(colorEmber, colorVoid)).toBeGreaterThanOrEqual(WCAG_AA_LARGE_TEXT)
  })
})

import { toHaveNoViolations } from 'jest-axe'

expect.extend(toHaveNoViolations)

// JSDOM HTMLMediaElement stubs
if (typeof window !== 'undefined') {
  window.HTMLMediaElement.prototype.play = jest.fn().mockResolvedValue(undefined)
  window.HTMLMediaElement.prototype.pause = jest.fn()
  window.HTMLMediaElement.prototype.load = jest.fn()
}

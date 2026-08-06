import { renderHook } from '@testing-library/react'
import { useScrambleText } from './useScrambleText'

describe('useScrambleText', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('immediately returns target text when enabled is false', () => {
    const onComplete = jest.fn()
    const { result } = renderHook(() =>
      useScrambleText({
        text: 'NEVER GO FULL DAVE',
        enabled: false,
        onComplete,
      })
    )

    expect(result.current.displayText).toBe('NEVER GO FULL DAVE')
    expect(result.current.isComplete).toBe(true)
    expect(result.current.isBooting).toBe(false)
    expect(onComplete).toHaveBeenCalledTimes(1)
  })

  it('immediately returns target text when prefers-reduced-motion matches', () => {
    const onComplete = jest.fn()
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }))

    const { result } = renderHook(() =>
      useScrambleText({
        text: 'NEVER GO FULL DAVE',
        onComplete,
      })
    )

    expect(result.current.displayText).toBe('NEVER GO FULL DAVE')
    expect(result.current.isComplete).toBe(true)
    expect(onComplete).toHaveBeenCalledTimes(1)
  })
})

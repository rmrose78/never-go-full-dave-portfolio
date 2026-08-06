import { renderHook, act } from '@testing-library/react'
import { useScrambleText } from './useScrambleText'

describe('useScrambleText', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }))
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

  it('runs terminal boot sequence while title is empty, then triggers scramble phase', () => {
    const { result } = renderHook(() =>
      useScrambleText({
        text: 'NEVER GO FULL DAVE',
        enabled: true,
        bootLineMs: 100,
      })
    )

    expect(result.current.isBooting).toBe(true)
    expect(result.current.currentBootLine).toBe('INITIALIZING DATASLATE...')
    expect(result.current.chars.length).toBe(0)

    act(() => {
      jest.advanceTimersByTime(100)
    })

    expect(result.current.currentBootLine).toBe('ESTABLISHING VOX LINK...')
    expect(result.current.chars.length).toBe(0)
  })
})

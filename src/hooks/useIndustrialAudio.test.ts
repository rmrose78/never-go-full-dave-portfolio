import { renderHook, act } from '@testing-library/react'
import { useIndustrialAudio } from './useIndustrialAudio'

describe('useIndustrialAudio', () => {
  let playMock: jest.Mock
  let pauseMock: jest.Mock

  beforeEach(() => {
    playMock = jest.fn().mockResolvedValue(undefined)
    pauseMock = jest.fn()

    // Mock HTML5 Audio constructor
    window.Audio = jest.fn().mockImplementation(() => ({
      play: playMock,
      pause: pauseMock,
      loop: false,
      volume: 1,
    })) as unknown as typeof window.Audio
  })

  it('initializes with default isPlaying state as false', () => {
    const { result } = renderHook(() => useIndustrialAudio())

    expect(result.current.isPlaying).toBe(false)
    expect(result.current.hasError).toBe(false)
  })

  it('plays audio when playAudio is called', async () => {
    const { result } = renderHook(() => useIndustrialAudio())

    await act(async () => {
      await result.current.playAudio()
    })

    expect(playMock).toHaveBeenCalledTimes(1)
    expect(result.current.isPlaying).toBe(true)
  })

  it('pauses audio when pauseAudio is called', async () => {
    const { result } = renderHook(() => useIndustrialAudio({ initialPlaying: true }))

    act(() => {
      result.current.pauseAudio()
    })

    expect(pauseMock).toHaveBeenCalledTimes(1)
    expect(result.current.isPlaying).toBe(false)
  })

  it('toggles audio on and off', async () => {
    const { result } = renderHook(() => useIndustrialAudio())

    await act(async () => {
      await result.current.toggleAudio()
    })
    expect(result.current.isPlaying).toBe(true)

    await act(async () => {
      await result.current.toggleAudio()
    })
    expect(result.current.isPlaying).toBe(false)
  })

  it('handles autoplay rejection gracefully', async () => {
    playMock.mockRejectedValue(new Error('Autoplay blocked'))
    const { result } = renderHook(() => useIndustrialAudio())

    await act(async () => {
      await result.current.playAudio()
    })

    expect(result.current.isPlaying).toBe(false)
    expect(result.current.hasError).toBe(true)
  })
})

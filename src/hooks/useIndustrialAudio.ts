import { useState, useRef, useCallback, useEffect } from 'react'

export interface UseIndustrialAudioOptions {
  audioUrl?: string
  initialPlaying?: boolean
  volume?: number
}

export interface UseIndustrialAudioReturn {
  isPlaying: boolean
  hasError: boolean
  toggleAudio: () => Promise<void>
  playAudio: () => Promise<void>
  pauseAudio: () => void
}

/**
 * Custom hook to manage industrial ambient audio playback and mechanical click feedback.
 */
export function useIndustrialAudio(
  options: UseIndustrialAudioOptions = {}
): UseIndustrialAudioReturn {
  const { audioUrl = '/assets/audio/industrial-techno.mp3', initialPlaying = false, volume = 0.5 } = options
  const [isPlaying, setIsPlaying] = useState(initialPlaying)
  const [hasError, setHasError] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.Audio !== 'undefined') {
      try {
        const audio = new window.Audio(audioUrl)
        audio.loop = true
        audio.volume = volume
        audioRef.current = audio
      } catch {
        // Safe fallback for restricted JSDOM environments
      }
    }

    return () => {
      if (audioRef.current) {
        try {
          audioRef.current.pause()
        } catch {
          // Ignore JSDOM unimplemented media pause error on unmount
        }
        audioRef.current = null
      }
    }
  }, [audioUrl, volume])

  const playClickSound = useCallback(() => {
    try {
      if (typeof window !== 'undefined' && (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
        const ctx = new AudioCtx()
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'triangle'
        osc.frequency.setValueAtTime(120, ctx.currentTime)
        osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.05)
        gain.gain.setValueAtTime(0.3, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05)
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start()
        osc.stop(ctx.currentTime + 0.05)
      }
    } catch {
      // Gracefully ignore Web Audio API restrictions if blocked or un-supported
    }
  }, [])

  const playAudio = useCallback(async () => {
    playClickSound()
    if (!audioRef.current) return
    try {
      await audioRef.current.play()
      setIsPlaying(true)
      setHasError(false)
    } catch {
      // Browser blocked autoplay or failed to load
      setIsPlaying(false)
      setHasError(true)
    }
  }, [playClickSound])

  const pauseAudio = useCallback(() => {
    playClickSound()
    if (!audioRef.current) return
    try {
      audioRef.current.pause()
    } catch {
      // Ignore pause failure in JSDOM
    }
    setIsPlaying(false)
  }, [playClickSound])

  const toggleAudio = useCallback(async () => {
    if (isPlaying) {
      pauseAudio()
    } else {
      await playAudio()
    }
  }, [isPlaying, pauseAudio, playAudio])

  return {
    isPlaying,
    hasError,
    toggleAudio,
    playAudio,
    pauseAudio,
  }
}

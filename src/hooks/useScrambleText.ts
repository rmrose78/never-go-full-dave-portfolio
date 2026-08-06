import { useState, useEffect, useRef } from 'react'

export interface ScrambleChar {
  final: string
  current: string
  isRevealed: boolean
  isAccent: boolean
}

export interface UseScrambleTextOptions {
  text: string
  accentWord?: string
  glyphs?: string
  bootLines?: string[]
  bootLineMs?: number
  charDelayMs?: number
  scrambleWindowMs?: number
  flipIntervalMs?: number
  enabled?: boolean
  onComplete?: () => void
}

export interface UseScrambleTextReturn {
  chars: ScrambleChar[]
  displayText: string
  isComplete: boolean
  currentBootLine: string
  isBooting: boolean
}

export const DEFAULT_GLYPHS = '0123456789ABCDEF⌘⌥⌖⚙︎†‡░▒▓█'
export const DEFAULT_BOOT_LINES = [
  'INITIALIZING DATASLATE...',
  'ESTABLISHING VOX LINK...',
  'MECHANICUS CORE: ONLINE',
  'SYSTEMS: READY',
]

function checkReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

function getRandomGlyph(glyphs: string): string {
  return glyphs[Math.floor(Math.random() * glyphs.length)]
}

function buildFinalChars(text: string, accentWord: string): ScrambleChar[] {
  const accentIndex = accentWord ? text.indexOf(accentWord) : -1
  const accentLength = accentWord ? accentWord.length : 0

  return text.split('').map((char, index) => {
    const isAccent = accentIndex !== -1 && index >= accentIndex && index < accentIndex + accentLength
    return {
      final: char,
      current: char,
      isRevealed: true,
      isAccent,
    }
  })
}

/**
 * Custom hook for Mechanicus terminal boot sequence and matrix hacker text scramble reveal.
 * Exactly mirrors mockdraft_dark.html algorithm:
 * 1. Boot sequence runs (340ms per line). Title is empty.
 * 2. Scramble animation runs (scrambleWindow 260ms + charDelay 45ms per character, 40ms flip interval).
 * 3. Final text reveals sequentially from left to right, triggering completion and purity seal.
 */
export function useScrambleText(
  options: UseScrambleTextOptions
): UseScrambleTextReturn {
  const {
    text,
    accentWord = 'DAVE',
    glyphs = DEFAULT_GLYPHS,
    bootLines = DEFAULT_BOOT_LINES,
    bootLineMs = 340,
    charDelayMs = 45,
    scrambleWindowMs = 260,
    flipIntervalMs = 40,
    enabled = true,
    onComplete,
  } = options

  const shouldSkipAnimation = !enabled || checkReducedMotion()

  const [chars, setChars] = useState<ScrambleChar[]>(() =>
    shouldSkipAnimation ? buildFinalChars(text, accentWord) : []
  )
  const [isComplete, setIsComplete] = useState(shouldSkipAnimation)
  const [currentBootLine, setCurrentBootLine] = useState(
    !shouldSkipAnimation && bootLines.length > 0 ? bootLines[0] : ''
  )
  const [isBooting, setIsBooting] = useState(!shouldSkipAnimation)

  const onCompleteRef = useRef(onComplete)
  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  useEffect(() => {
    if (shouldSkipAnimation) {
      if (onCompleteRef.current) onCompleteRef.current()
      return
    }

    let isSubscribed = true
    let bootIndex = 0
    let bootTimer: ReturnType<typeof setTimeout> | null = null
    let animId: number | null = null

    // Phase 1: Terminal Boot Sequence
    const runBoot = () => {
      if (!isSubscribed) return
      if (bootIndex >= bootLines.length) {
        setIsBooting(false)
        setCurrentBootLine('')
        startScramble()
        return
      }
      setCurrentBootLine(bootLines[bootIndex])
      bootIndex++
      bootTimer = setTimeout(runBoot, bootLineMs)
    }

    // Phase 2: Hacker Matrix Scramble Reveal Animation
    const startScramble = () => {
      if (!isSubscribed) return

      const accentIndex = accentWord ? text.indexOf(accentWord) : -1
      const accentLength = accentWord ? accentWord.length : 0

      const charsState: ScrambleChar[] = text.split('').map((char, index) => {
        const isAccent = accentIndex !== -1 && index >= accentIndex && index < accentIndex + accentLength
        return {
          final: char,
          current: char === ' ' ? ' ' : getRandomGlyph(glyphs),
          isRevealed: false,
          isAccent,
        }
      })

      setChars([...charsState])

      let start: number | null = null
      const lastFlipTimes = charsState.map(() => 0)

      const frame = (ts: number) => {
        if (!isSubscribed) return
        if (start === null) start = ts
        const elapsed = ts - start
        let allDone = true

        charsState.forEach((c, i) => {
          if (c.final === ' ') return
          const revealAt = i * charDelayMs + scrambleWindowMs
          if (elapsed >= revealAt) {
            c.current = c.final
            c.isRevealed = true
          } else {
            allDone = false
            if (elapsed - lastFlipTimes[i] >= flipIntervalMs) {
              c.current = getRandomGlyph(glyphs)
              lastFlipTimes[i] = elapsed
            }
          }
        })

        setChars([...charsState])

        if (!allDone) {
          animId = requestAnimationFrame(frame)
        } else {
          setChars(buildFinalChars(text, accentWord))
          setIsComplete(true)
          if (onCompleteRef.current) onCompleteRef.current()
        }
      }

      animId = requestAnimationFrame(frame)
    }

    runBoot()

    return () => {
      isSubscribed = false
      if (bootTimer) clearTimeout(bootTimer)
      if (animId) cancelAnimationFrame(animId)
    }
  }, [text, accentWord, glyphs, bootLines, bootLineMs, charDelayMs, scrambleWindowMs, flipIntervalMs, shouldSkipAnimation])

  const displayText = chars.map((c) => c.current).join('')

  return {
    chars,
    displayText,
    isComplete,
    currentBootLine,
    isBooting,
  }
}

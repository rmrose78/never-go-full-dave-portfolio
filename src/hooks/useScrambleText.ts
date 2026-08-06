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

function buildInitialChars(text: string, accentWord: string, isFinal: boolean, glyphs: string): ScrambleChar[] {
  const accentIndex = accentWord ? text.indexOf(accentWord) : -1
  const accentLength = accentWord ? accentWord.length : 0

  return text.split('').map((char, index) => {
    const isAccent = accentIndex !== -1 && index >= accentIndex && index < accentIndex + accentLength
    return {
      final: char,
      current: isFinal ? char : char === ' ' ? ' ' : getRandomGlyph(glyphs),
      isRevealed: isFinal,
      isAccent,
    }
  })
}

/**
 * Custom hook for Mechanicus terminal boot sequence and matrix hacker text scramble reveal.
 */
export function useScrambleText(
  options: UseScrambleTextOptions
): UseScrambleTextReturn {
  const {
    text,
    accentWord = 'DAVE',
    glyphs = DEFAULT_GLYPHS,
    bootLines = DEFAULT_BOOT_LINES,
    bootLineMs = 150,
    charDelayMs = 45,
    scrambleWindowMs = 260,
    flipIntervalMs = 40,
    enabled = true,
    onComplete,
  } = options

  const shouldSkipAnimation = !enabled || checkReducedMotion()

  const [chars, setChars] = useState<ScrambleChar[]>(() =>
    shouldSkipAnimation ? buildInitialChars(text, accentWord, true, glyphs) : []
  )
  const [isComplete, setIsComplete] = useState(shouldSkipAnimation)
  const [currentBootLine, setCurrentBootLine] = useState('')
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
    let scrambleTimer: number | null = null

    // Step 1: Run terminal boot lines
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
      setTimeout(runBoot, bootLineMs)
    }

    // Step 2: Run per-character matrix scramble reveal animation
    const startScramble = () => {
      if (!isSubscribed) return

      const activeChars = buildInitialChars(text, accentWord, false, glyphs)
      setChars(activeChars)

      let startTime: number | null = null
      const lastFlipTimes = activeChars.map(() => 0)

      const frame = (time: number) => {
        if (!isSubscribed) return
        if (startTime === null) startTime = time
        const elapsed = time - startTime

        let allDone = true

        setChars((prevChars) =>
          prevChars.map((charObj, index) => {
            if (charObj.final === ' ') return charObj
            const revealTime = index * charDelayMs + scrambleWindowMs

            if (elapsed >= revealTime) {
              return {
                ...charObj,
                current: charObj.final,
                isRevealed: true,
              }
            } else {
              allDone = false
              if (elapsed - lastFlipTimes[index] >= flipIntervalMs) {
                lastFlipTimes[index] = elapsed
                return {
                  ...charObj,
                  current: getRandomGlyph(glyphs),
                  isRevealed: false,
                }
              }
              return charObj
            }
          })
        )

        if (!allDone) {
          scrambleTimer = requestAnimationFrame(frame)
        } else {
          setChars(buildInitialChars(text, accentWord, true, glyphs))
          setIsComplete(true)
          if (onCompleteRef.current) onCompleteRef.current()
        }
      }

      scrambleTimer = requestAnimationFrame(frame)
    }

    runBoot()

    return () => {
      isSubscribed = false
      if (scrambleTimer) cancelAnimationFrame(scrambleTimer)
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

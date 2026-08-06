import { useState, useEffect, useRef } from 'react'

export interface UseScrambleTextOptions {
  text: string
  glyphs?: string
  bootLines?: string[]
  bootLineMs?: number
  charDelayMs?: number
  scrambleWindowMs?: number
  enabled?: boolean
  onComplete?: () => void
}

export interface UseScrambleTextReturn {
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

/**
 * Custom hook for Mechanicus terminal boot sequence and matrix hacker text scramble reveal.
 */
export function useScrambleText(
  options: UseScrambleTextOptions
): UseScrambleTextReturn {
  const {
    text,
    glyphs = DEFAULT_GLYPHS,
    bootLines = DEFAULT_BOOT_LINES,
    bootLineMs = 150,
    charDelayMs = 30,
    scrambleWindowMs = 150,
    enabled = true,
    onComplete,
  } = options

  const shouldSkipAnimation = !enabled || checkReducedMotion()

  const [displayText, setDisplayText] = useState(text)
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

    // Step 2: Run character scramble animation
    const startScramble = () => {
      if (!isSubscribed) return
      const targetChars = text.split('')
      let startTime: number | null = null

      const frame = (time: number) => {
        if (!isSubscribed) return
        if (startTime === null) startTime = time
        const elapsed = time - startTime

        let allDone = true
        const nextChars = targetChars.map((targetChar, index) => {
          if (targetChar === ' ') return ' '
          const revealTime = index * charDelayMs + scrambleWindowMs
          if (elapsed >= revealTime) {
            return targetChar
          } else {
            allDone = false
            const randomGlyph = glyphs[Math.floor(Math.random() * glyphs.length)]
            return randomGlyph
          }
        })

        setDisplayText(nextChars.join(''))

        if (!allDone) {
          scrambleTimer = requestAnimationFrame(frame)
        } else {
          setDisplayText(text)
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
  }, [text, glyphs, bootLines, bootLineMs, charDelayMs, scrambleWindowMs, shouldSkipAnimation])

  return {
    displayText,
    isComplete,
    currentBootLine,
    isBooting,
  }
}

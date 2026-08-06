import { useState, useEffect, useRef } from 'react'

export interface UseScrambleTextOptions {
  text: string
  accentWord?: string
  accentClass?: string
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
  targetRef: React.RefObject<HTMLHeadingElement | null>
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

function renderFormattedTitle(targetEl: HTMLElement, text: string, accentWord: string, accentClass: string) {
  if (accentWord && text.includes(accentWord)) {
    const parts = text.split(accentWord)
    targetEl.innerHTML = ''
    const beforeNode = document.createTextNode(parts[0])
    const accentSpan = document.createElement('span')
    if (accentClass) accentSpan.className = accentClass
    accentSpan.textContent = accentWord
    const afterNode = document.createTextNode(parts.slice(1).join(accentWord))
    targetEl.appendChild(beforeNode)
    targetEl.appendChild(accentSpan)
    targetEl.appendChild(afterNode)
  } else {
    targetEl.textContent = text
  }
}

/**
 * Custom hook for Mechanicus terminal boot sequence and matrix hacker text scramble reveal.
 * 1-to-1 match with mockdraft_dark.html algorithm using direct 60fps DOM animation.
 */
export function useScrambleText(
  options: UseScrambleTextOptions
): UseScrambleTextReturn {
  const {
    text,
    accentWord = 'DAVE',
    accentClass = '',
    glyphs = DEFAULT_GLYPHS,
    bootLines = DEFAULT_BOOT_LINES,
    bootLineMs = 340,
    charDelayMs = 45,
    scrambleWindowMs = 260,
    flipIntervalMs = 40,
    enabled = true,
    onComplete,
  } = options

  const targetRef = useRef<HTMLHeadingElement | null>(null)
  const shouldSkipAnimation = !enabled || checkReducedMotion()

  const [isComplete, setIsComplete] = useState(shouldSkipAnimation)
  const [currentBootLine, setCurrentBootLine] = useState('')
  const [isBooting, setIsBooting] = useState(!shouldSkipAnimation)

  const onCompleteRef = useRef(onComplete)
  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  useEffect(() => {
    const targetEl = targetRef.current
    if (shouldSkipAnimation) {
      if (targetEl) {
        renderFormattedTitle(targetEl, text, accentWord, accentClass)
      }
      if (onCompleteRef.current) onCompleteRef.current()
      return
    }

    let isSubscribed = true
    let bootIndex = 0
    let bootTimer: ReturnType<typeof setTimeout> | null = null
    let animId: number | null = null

    // Step 1: Terminal Boot Sequence (340ms per line)
    if (targetEl) targetEl.innerHTML = ''

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

    // Step 2: 1-to-1 Matrix Hacker Scramble Animation Loop
    const startScramble = () => {
      if (!isSubscribed || !targetEl) return

      targetEl.innerHTML = ''
      const chars = text.split('').map((c) => {
        const s = document.createElement('span')
        if (c === ' ') {
          s.textContent = ' '
        } else {
          s.textContent = glyphs[Math.floor(Math.random() * glyphs.length)]
        }
        targetEl.appendChild(s)
        return { el: s, final: c }
      })

      let start: number | null = null
      const lastFlip = chars.map(() => 0)

      const frame = (ts: number) => {
        if (!isSubscribed) return
        if (start === null) start = ts
        const elapsed = ts - start
        let done = true

        chars.forEach((c, i) => {
          if (c.final === ' ') return
          const revealAt = i * charDelayMs + scrambleWindowMs
          if (elapsed >= revealAt) {
            c.el.textContent = c.final
          } else {
            done = false
            if (elapsed - lastFlip[i] >= flipIntervalMs) {
              c.el.textContent = glyphs[Math.floor(Math.random() * glyphs.length)]
              lastFlip[i] = elapsed
            }
          }
        })

        if (!done) {
          animId = requestAnimationFrame(frame)
        } else {
          renderFormattedTitle(targetEl, text, accentWord, accentClass)
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
  }, [text, accentWord, accentClass, glyphs, bootLines, bootLineMs, charDelayMs, scrambleWindowMs, flipIntervalMs, shouldSkipAnimation])

  return {
    targetRef,
    isComplete,
    currentBootLine,
    isBooting,
  }
}

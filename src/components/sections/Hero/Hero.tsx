import React from 'react'
import { StudioEmblem } from '@/components/ui/StudioEmblem/StudioEmblem'
import { useScrambleText } from '@/hooks/useScrambleText'
import styles from './Hero.module.scss'

export interface HeroProps {
  title?: string
  warningText?: string
  tagline?: string
  ctaText?: string
  ctaHref?: string
  enableScramble?: boolean
}

export const Hero: React.FC<HeroProps> = ({
  title = 'NEVER GO FULL DAVE',
  warningText = 'Commission Miniature Painting • Warhammer 40k & Age of Sigmar',
  tagline = 'Display-grade painting, clean edge work, and custom basing for armies, characters, and showcase centerpiece miniatures.',
  ctaText = 'Explore the Portfolio',
  ctaHref = '#gallery',
  enableScramble = true,
}) => {
  const { targetRef, isComplete, currentBootLine, isBooting } = useScrambleText({
    text: title,
    accentClass: styles.titleAccent,
    enabled: enableScramble,
  })

  return (
    <section className={styles.heroSection} id="hero" aria-label="Hero Showcase Entrance">
      {/* Background Atmosphere Layers matching mockdraft_dark.html */}
      <div className={styles.heroPhoto} aria-hidden="true" />
      <div className={styles.heroEdgeFade} aria-hidden="true" />
      <div className={styles.heroScrim} aria-hidden="true" />
      <div className={styles.cogField} aria-hidden="true">
        <svg className={styles.cogA} viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 35a15 15 0 1 0 0 30 15 15 0 0 0 0-30zm0 40a25 25 0 1 1 0-50 25 25 0 0 1 0 50z" />
        </svg>
        <svg className={styles.cogB} viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 35a15 15 0 1 0 0 30 15 15 0 0 0 0-30zm0 40a25 25 0 1 1 0-50 25 25 0 0 1 0 50z" />
        </svg>
      </div>
      <div className={styles.crtOverlay} aria-hidden="true" />

      <div className={styles.heroInner}>
        {/* Centerpiece Studio Emblem */}
        <div className={styles.emblemWrap}>
          <StudioEmblem variant="hero" size={84} ariaLabel="Never Go Full Dave Studio Emblem" />
        </div>

        {/* Shared Title Slot Container (Fixed Height & Vertical Centering) */}
        <div className={styles.titleSlotWrap}>
          {/* Mechanicus Terminal Boot Log Sequence */}
          <p
            className={`${styles.bootSequence} ${!isBooting || !currentBootLine ? styles.isEmpty : ''}`}
            id="bootSequence"
            aria-hidden="true"
          >
            {currentBootLine}
          </p>

          {/* Hero Title with 1-to-1 Mockdraft Scramble Reveal */}
          <h1
            ref={targetRef}
            className={`${styles.heroTitle} ${isBooting ? styles.isBootingTitle : ''}`}
            id="heroTitle"
            data-testid="hero-title"
            aria-label={title}
          >
            <span className="visually-hidden">{title}</span>
          </h1>
        </div>

        {/* Warning Badge & Tagline */}
        <p className={styles.heroWarning}>{warningText}</p>
        <p className={styles.heroTagline}>{tagline}</p>

        {/* Primary CTA Button */}
        <a className={styles.ctaButton} href={ctaHref}>
          <span>{ctaText}</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            aria-hidden="true"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>

        {/* Purity Seal Stamp */}
        <svg
          className={`${styles.puritySeal} ${isComplete ? styles.isStamped : ''}`}
          id="puritySeal"
          viewBox="0 0 48 48"
          role="img"
          aria-label="Purity seal"
          data-testid="purity-seal"
        >
          <circle cx="24" cy="20" r="13" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="24" cy="20" r="9" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.6" />
          <path d="M24 12v16M17 20h14" stroke="currentColor" strokeWidth="1.5" />
          <path d="M18 32l6 10 6-10" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>
    </section>
  )
}

export default Hero

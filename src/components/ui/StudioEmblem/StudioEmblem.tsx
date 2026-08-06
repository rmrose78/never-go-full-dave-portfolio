import React, { useId } from 'react'
import styles from './StudioEmblem.module.scss'

export interface StudioEmblemProps {
  size?: number | string
  className?: string
  ariaLabel?: string
  variant?: 'nav' | 'hero'
}

export const StudioEmblem: React.FC<StudioEmblemProps> = ({
  size,
  className = '',
  ariaLabel = 'Never Go Full Dave Studio Emblem',
  variant = 'nav',
}) => {
  const rawId = useId()
  const gradientId = `studioEmblemGrad-${rawId.replace(/:/g, '')}`

  const variantClass = variant === 'hero' ? styles.variantHero : styles.variantNav
  const emblemClasses = [styles.emblem, variantClass, className].filter(Boolean).join(' ')

  const inlineStyles: React.CSSProperties = size
    ? {
        width: typeof size === 'number' ? `${size}px` : size,
        height: typeof size === 'number' ? `${size}px` : size,
      }
    : {}

  return (
    <svg
      className={emblemClasses}
      style={inlineStyles}
      viewBox="0 0 32 32"
      role="img"
      aria-label={ariaLabel}
      data-testid="studio-emblem"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#d4b265" />
          <stop offset="100%" stopColor="#ff6e4a" />
        </linearGradient>
      </defs>
      <circle
        cx="16"
        cy="16"
        r="13"
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="1.8"
        strokeDasharray="4 2"
      />
      <circle
        cx="16"
        cy="16"
        r="10"
        fill="none"
        stroke="#d4b265"
        strokeWidth="1"
        opacity="0.6"
      />
      <path
        d="M16 1v4M16 27v4M1 16h4M27 16h4"
        stroke={`url(#${gradientId})`}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <line
        x1="7"
        y1="25"
        x2="25"
        y2="7"
        stroke={`url(#${gradientId})`}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <line
        x1="7"
        y1="7"
        x2="25"
        y2="25"
        stroke={`url(#${gradientId})`}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <polygon points="25,7 28,4 26,9" fill="#ff6e4a" />
      <polygon points="25,25 28,28 26,23" fill="#ff6e4a" />
    </svg>
  )
}

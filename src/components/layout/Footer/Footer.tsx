import React from 'react'
import { StudioEmblem } from '@/components/ui/StudioEmblem/StudioEmblem'
import styles from './Footer.module.scss'

export interface FooterProps {
  instagramUrl?: string
  copyrightText?: string
}

export const Footer: React.FC<FooterProps> = ({
  instagramUrl = 'https://instagram.com/nevergofulldave',
  copyrightText = '© 2026 Never Go Full Dave. All rights reserved.',
}) => {
  return (
    <footer className={styles.siteFooter} aria-label="Site footer">
      <div className={styles.footerContainer}>
        {/* Studio Seal */}
        <StudioEmblem
          size={48}
          className={styles.footerSeal}
          ariaLabel="Never Go Full Dave Studio Seal"
        />

        {/* Instagram Social Link */}
        <a
          className={styles.footerSocial}
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram @nevergofulldave"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <rect x="2" y="2" width="20" height="20" rx="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
        </a>

        {/* Copyright Notice */}
        <p className={styles.copyright}>{copyrightText}</p>
      </div>
    </footer>
  )
}

export default Footer

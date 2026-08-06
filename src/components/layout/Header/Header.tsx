import React from 'react'
import { StudioEmblem } from '@/components/ui/StudioEmblem/StudioEmblem'
import { useHeaderNav, type NavLinkItem } from '@/hooks/useHeaderNav'
import styles from './Header.module.scss'

export interface HeaderProps {
  navLinks?: NavLinkItem[]
  onLinkClick?: (href: string) => void
}

export const Header: React.FC<HeaderProps> = ({
  navLinks: customNavLinks,
  onLinkClick,
}) => {
  const { isOpen, toggleMenu, closeMenu, navLinks: defaultNavLinks } = useHeaderNav()
  const links = customNavLinks || defaultNavLinks

  const handleLinkClick = (href: string) => {
    closeMenu()
    if (onLinkClick) {
      onLinkClick(href)
    }
  }

  return (
    <nav className={styles.siteHeader} aria-label="Primary navigation">
      <div className={styles.headerContainer}>
        <div className={styles.brandGroup}>
          <a
            className={styles.brandLink}
            href="#hero"
            aria-label="Never Go Full Dave Studio Home"
            onClick={() => handleLinkClick('#hero')}
          >
            <StudioEmblem variant="nav" ariaLabel="Studio Emblem" />
            Never Go Full <span>DAVE</span>
          </a>
          <span
            className={styles.morseLight}
            id="morseLight"
            aria-hidden="true"
            title="Status light (NGFD in Morse code)"
          />
        </div>

        <div className={styles.navControls}>
          <button
            className={styles.navToggle}
            id="navToggle"
            aria-expanded={isOpen}
            aria-controls="navMenu"
            aria-label="Toggle navigation menu"
            onClick={toggleMenu}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>

          <ul
            className={`${styles.navMenu} ${isOpen ? styles.isOpen : ''}`}
            id="navMenu"
            data-testid="nav-menu"
          >
            {links.map((link) => (
              <li key={link.href}>
                <a
                  className={styles.navLink}
                  href={link.href}
                  onClick={() => handleLinkClick(link.href)}
                >
                  <span>{link.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Header

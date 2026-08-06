import { useState, useEffect, useCallback } from 'react'

export interface NavLinkItem {
  label: string
  href: string
}

export const DEFAULT_NAV_LINKS: NavLinkItem[] = [
  { label: 'Gallery', href: '#gallery' },
  { label: 'Specialties', href: '#specialties' },
  { label: 'Standards', href: '#pricing' },
  { label: 'Commission', href: '#commission' },
  { label: 'Showcase', href: '#showcase' },
  { label: 'About', href: '#about' },
  { label: 'Dispatches', href: '#dispatches' },
]

export const DESKTOP_BREAKPOINT_PX = 900

export function useHeaderNav(desktopBreakpoint: number = DESKTOP_BREAKPOINT_PX) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  const closeMenu = useCallback(() => {
    setIsOpen(false)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= desktopBreakpoint) {
        setIsOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [desktopBreakpoint])

  return {
    isOpen,
    toggleMenu,
    closeMenu,
    navLinks: DEFAULT_NAV_LINKS,
  }
}

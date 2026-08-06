import { renderHook, act } from '@testing-library/react'
import { useHeaderNav, DEFAULT_NAV_LINKS } from './useHeaderNav'

describe('useHeaderNav', () => {
  it('initializes with isOpen false and default nav links', () => {
    const { result } = renderHook(() => useHeaderNav())

    expect(result.current.isOpen).toBe(false)
    expect(result.current.navLinks).toEqual(DEFAULT_NAV_LINKS)
  })

  it('toggles menu state when toggleMenu is called', () => {
    const { result } = renderHook(() => useHeaderNav())

    act(() => {
      result.current.toggleMenu()
    })
    expect(result.current.isOpen).toBe(true)

    act(() => {
      result.current.toggleMenu()
    })
    expect(result.current.isOpen).toBe(false)
  })

  it('closes menu when closeMenu is called', () => {
    const { result } = renderHook(() => useHeaderNav())

    act(() => {
      result.current.toggleMenu()
    })
    expect(result.current.isOpen).toBe(true)

    act(() => {
      result.current.closeMenu()
    })
    expect(result.current.isOpen).toBe(false)
  })

  it('automatically closes menu when window is resized to desktop breakpoint', () => {
    const { result } = renderHook(() => useHeaderNav(900))

    act(() => {
      result.current.toggleMenu()
    })
    expect(result.current.isOpen).toBe(true)

    // Simulate window resize to 1024px (desktop)
    act(() => {
      window.innerWidth = 1024
      window.dispatchEvent(new Event('resize'))
    })

    expect(result.current.isOpen).toBe(false)
  })
})

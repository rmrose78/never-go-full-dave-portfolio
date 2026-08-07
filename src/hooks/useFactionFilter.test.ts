import { renderHook, act } from '@testing-library/react'
import { useFactionFilter } from './useFactionFilter'
import { PORTFOLIO_ITEMS } from '@/data/portfolio'

describe('useFactionFilter', () => {
  it('initializes with all items and calculates tab counts correctly', () => {
    const { result } = renderHook(() =>
      useFactionFilter({ items: PORTFOLIO_ITEMS })
    )

    expect(result.current.activeFilter).toBe('all')
    expect(result.current.filteredItems.length).toBe(6)
    expect(result.current.filterTabs).toEqual([
      { id: 'all', label: 'All Armies', count: 6 },
      { id: 'am', label: 'Astra Militarum', count: 3 },
      { id: 'kh', label: 'Khorne Chaos', count: 3 },
    ])
  })

  it('filters items correctly when Astra Militarum filter is selected', () => {
    const { result } = renderHook(() =>
      useFactionFilter({ items: PORTFOLIO_ITEMS })
    )

    act(() => {
      result.current.setActiveFilter('am')
    })

    expect(result.current.activeFilter).toBe('am')
    expect(result.current.filteredItems.length).toBe(3)
    expect(
      result.current.filteredItems.every((item) => item.factionId === 'am')
    ).toBe(true)
  })

  it('filters items correctly when Khorne Chaos filter is selected', () => {
    const { result } = renderHook(() =>
      useFactionFilter({ items: PORTFOLIO_ITEMS })
    )

    act(() => {
      result.current.setActiveFilter('kh')
    })

    expect(result.current.activeFilter).toBe('kh')
    expect(result.current.filteredItems.length).toBe(3)
    expect(
      result.current.filteredItems.every((item) => item.factionId === 'kh')
    ).toBe(true)
  })

  it('resets to all items when all filter is re-selected', () => {
    const { result } = renderHook(() =>
      useFactionFilter({ items: PORTFOLIO_ITEMS, initialFilter: 'am' })
    )

    expect(result.current.activeFilter).toBe('am')
    expect(result.current.filteredItems.length).toBe(3)

    act(() => {
      result.current.setActiveFilter('all')
    })

    expect(result.current.activeFilter).toBe('all')
    expect(result.current.filteredItems.length).toBe(6)
  })
})

import { useState, useMemo } from 'react'
import type { PortfolioItem, FactionId, FactionFilterTab } from '@/data/portfolio'

export interface UseFactionFilterOptions {
  items: PortfolioItem[]
  initialFilter?: FactionId
}

export interface UseFactionFilterReturn {
  activeFilter: FactionId
  setActiveFilter: (filterId: FactionId) => void
  filteredItems: PortfolioItem[]
  filterTabs: FactionFilterTab[]
}

/**
 * Custom hook managing faction filtering logic and dynamic badge count totals for the Painted Vault gallery.
 */
export function useFactionFilter({
  items,
  initialFilter = 'all',
}: UseFactionFilterOptions): UseFactionFilterReturn {
  const [activeFilter, setActiveFilter] = useState<FactionId>(initialFilter)

  const filterTabs = useMemo<FactionFilterTab[]>(() => {
    const amCount = items.filter((item) => item.factionId === 'am').length
    const khCount = items.filter((item) => item.factionId === 'kh').length

    return [
      { id: 'all', label: 'All Armies', count: items.length },
      { id: 'am', label: 'Astra Militarum', count: amCount },
      { id: 'kh', label: 'Khorne Chaos', count: khCount },
    ]
  }, [items])

  const filteredItems = useMemo(() => {
    if (activeFilter === 'all') return items
    return items.filter((item) => item.factionId === activeFilter)
  }, [items, activeFilter])

  return {
    activeFilter,
    setActiveFilter,
    filteredItems,
    filterTabs,
  }
}

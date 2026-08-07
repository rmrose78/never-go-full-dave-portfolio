import React from 'react'
import { PORTFOLIO_ITEMS } from '@/data/portfolio'
import type { PortfolioItem, FactionId } from '@/data/portfolio'
import { useFactionFilter } from '@/hooks/useFactionFilter'
import { PortfolioCard } from '@/components/ui/PortfolioCard/PortfolioCard'
import styles from './Gallery.module.scss'

export interface GalleryProps {
  items?: PortfolioItem[]
  initialFilter?: FactionId
  onSelectCard?: (item: PortfolioItem) => void
}

export const Gallery: React.FC<GalleryProps> = ({
  items = PORTFOLIO_ITEMS,
  initialFilter = 'all',
  onSelectCard,
}) => {
  const { activeFilter, setActiveFilter, filteredItems, filterTabs } = useFactionFilter({
    items,
    initialFilter,
  })

  return (
    <>
      <section className={styles.gallery} id="gallery" aria-label="Painted Vault Miniature Portfolio">
        <div className={styles.graniteOverlay} aria-hidden="true" />
        <div className={styles.container}>
          <p className={styles.sectionKicker}>Miniature Portfolio</p>
          <h2 className={styles.sectionTitle}>The Painted Vault</h2>
          <p className={styles.sectionLede}>
            Filter through painted squads, individual characters, and centerpiece dioramas. Click any card for recipe details.
          </p>

          {/* Faction Filter Bar */}
          <div className={styles.filterBar} role="tablist" aria-label="Army Faction Filter Tabs">
            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab.id
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  tabIndex={isActive ? 0 : -1}
                  className={`${styles.filterBtn} ${isActive ? styles.isActive : ''}`}
                  onClick={() => setActiveFilter(tab.id)}
                  data-filter={tab.id}
                  data-testid={`filter-btn-${tab.id}`}
                >
                  <span>{tab.label}</span>
                  <span className={styles.filterCount} aria-label={`${tab.count} items`}>
                    {tab.count}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Gallery Card Grid */}
          <div className={styles.galleryGrid} role="region" aria-label="Portfolio Grid">
            {filteredItems.map((item) => (
              <PortfolioCard key={item.id} item={item} onSelect={onSelectCard} />
            ))}
          </div>
        </div>
      </section>
      <div className={styles.chevronRule} aria-hidden="true" />
    </>
  )
}

export default Gallery

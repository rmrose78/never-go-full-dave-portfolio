import React from 'react'
import type { PortfolioItem } from '@/data/portfolio'
import styles from './PortfolioCard.module.scss'

export interface PortfolioCardProps {
  item: PortfolioItem
  onSelect?: (item: PortfolioItem) => void
}

export const PortfolioCard: React.FC<PortfolioCardProps> = ({ item, onSelect }) => {
  const handleClick = () => {
    if (onSelect) {
      onSelect(item)
    }
  }

  const variantClass = styles[item.cardVariant] || ''
  const aspectClass = item.aspectRatio === 'landscape' ? styles.landscape : styles.portrait

  return (
    <button
      type="button"
      className={`${styles.card} ${aspectClass} ${variantClass}`}
      onClick={handleClick}
      aria-haspopup="dialog"
      aria-label={`${item.title} - ${item.factionName} (${item.badge})`}
      data-testid={`portfolio-card-${item.id}`}
      data-faction={item.factionId}
      data-modal={item.recipeModalId}
    >
      <span className={styles.cardBadge}>{item.badge}</span>
      <span className={styles.cardCaption}>
        <span className={styles.name}>{item.title}</span>
        <span className={styles.faction}>{item.factionName}</span>
      </span>
    </button>
  )
}

export default PortfolioCard

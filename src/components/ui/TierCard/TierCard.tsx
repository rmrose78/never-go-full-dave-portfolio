import React from 'react'
import type { PricingTier } from '@/data/pricing'
import styles from './TierCard.module.scss'

export interface TierCardProps {
  tier: PricingTier
}

export const TierCard: React.FC<TierCardProps> = ({ tier }) => {
  const centerpieceClass = tier.isCenterpiece ? styles.centerpiece : ''

  return (
    <article
      className={`${styles.tierCard} ${centerpieceClass}`}
      data-testid={`tier-card-${tier.id}`}
      data-centerpiece={tier.isCenterpiece ? 'true' : 'false'}
    >
      <p className={styles.tierKicker}>{tier.kicker}</p>
      <h3 className={styles.tierName}>{tier.name}</h3>
      <p className={styles.tierPrice}>
        <span className={styles.amount}>{tier.price}</span>
        {tier.priceUnit && <span className={styles.unit}>{tier.priceUnit}</span>}
      </p>

      <ul className={styles.tierFeatures} aria-label={`${tier.name} features`}>
        {tier.features.map((feature, idx) => (
          <li key={idx}>{feature}</li>
        ))}
      </ul>
    </article>
  )
}

export default TierCard

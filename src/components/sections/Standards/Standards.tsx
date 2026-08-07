import React from 'react'
import { PRICING_TIERS } from '@/data/pricing'
import type { PricingTier } from '@/data/pricing'
import { TierCard } from '@/components/ui/TierCard/TierCard'
import styles from './Standards.module.scss'

export interface StandardsProps {
  tiers?: PricingTier[]
}

export const Standards: React.FC<StandardsProps> = ({ tiers = PRICING_TIERS }) => {
  return (
    <>
      <section className={styles.pricing} id="pricing" aria-label="Quality Standards & Pricing Tiers">
        <div className={styles.graniteOverlay} aria-hidden="true" />
        <div className={styles.container}>
          <p className={styles.sectionKicker}>Painting Benchmarks</p>
          <h2 className={styles.sectionTitle}>Quality Standards & Tiers</h2>
          <p className={styles.sectionLede}>
            These painting standards define the level of detail and techniques applied to your models. Use them as a reference when requesting your custom quote below.
          </p>

          <div className={styles.pricingGrid} role="region" aria-label="Pricing Tiers Grid">
            {tiers.map((tier) => (
              <TierCard key={tier.id} tier={tier} />
            ))}
          </div>
        </div>
      </section>
      <div className={styles.chevronRule} aria-hidden="true" />
    </>
  )
}

export default Standards

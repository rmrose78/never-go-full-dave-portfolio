import React from 'react'
import { SPECIALTY_ITEMS } from '@/data/pricing'
import type { SpecialtyItem } from '@/data/pricing'
import styles from './Specialties.module.scss'

export interface SpecialtiesProps {
  items?: SpecialtyItem[]
}

const renderIcon = (icon: SpecialtyItem['icon']) => {
  switch (icon) {
    case 'troops':
      return (
        <svg className={styles.specIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      )
    case 'heroes':
      return (
        <svg className={styles.specIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      )
    case 'vehicles':
      return (
        <svg className={styles.specIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="2" y="7" width="20" height="14" rx="2" />
          <path d="M16 3l-4 4-4-4" />
        </svg>
      )
    case 'dioramas':
      return (
        <svg className={styles.specIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      )
  }
}

export const Specialties: React.FC<SpecialtiesProps> = ({ items = SPECIALTY_ITEMS }) => {
  return (
    <section className={styles.specialtiesSection} id="specialties" aria-label="Painting Capabilities & Specialties">
      <div className={styles.container}>
        <p className={styles.sectionKicker}>Painting Capabilities</p>
        <h2 className={styles.sectionTitle}>Specialties & Unit Types</h2>
        <p className={styles.sectionLede}>
          Every commission is tailored to your army&apos;s aesthetic, from high-count tabletop squads to individual showcase heroes.
        </p>

        <div className={styles.specGrid}>
          {items.map((item) => (
            <article key={item.id} className={styles.specCard} data-testid={`spec-card-${item.id}`}>
              {renderIcon(item.icon)}
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Specialties

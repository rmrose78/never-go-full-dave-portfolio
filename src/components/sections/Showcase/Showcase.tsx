import React from 'react'
import styles from './Showcase.module.scss'

const SHOWCASE_TAGS = ['Sculpted Terrain', 'Multi-Model Scenes', 'OSL & Weathering']

export interface ShowcaseProps {
  imageSrc?: string
  imageAlt?: string
}

export const Showcase: React.FC<ShowcaseProps> = ({
  imageSrc = '/assets/images/hero-diorama.jpg',
  imageAlt = 'Centerpiece diorama photo study',
}) => {
  return (
    <>
      <section
        className={styles.showcase}
        id="showcase"
        aria-label="Environment & Diorama Showcase"
      >
        <div className={styles.graniteOverlay} aria-hidden="true" />
        <div className={styles.container}>
          <div className={styles.showcaseGrid}>
            <div>
              <p className={styles.sectionKicker}>Environment & Diorama</p>
              <h2 className={styles.sectionTitle}>When It&apos;s a Whole Scene</h2>
              <p className={styles.description}>
                Some commissions extend beyond single models: custom resin terrain, complex lighting setups, and multi-model narrative clashes.
              </p>
              <p className={styles.description}>
                Sculpted basing, layered atmospheric glazes, and bold contrast ensure the story reads from across the room.
              </p>

              <div className={styles.tagRow} role="list" aria-label="Showcase specializations">
                {SHOWCASE_TAGS.map((tag) => (
                  <span key={tag} className={styles.tag} role="listitem">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.showcaseFrame}>
              <img src={imageSrc} alt={imageAlt} loading="lazy" />
            </div>
          </div>
        </div>
      </section>
      <div className={styles.chevronRule} aria-hidden="true" />
    </>
  )
}

export default Showcase

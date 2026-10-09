import React from 'react'
import styles from './AboutBio.module.scss'

export interface AboutBioProps {
  name?: string
  role?: string
  credentials?: string
  kicker?: string
  title?: string
  paragraphs?: string[]
}

export const AboutBio: React.FC<AboutBioProps> = ({
  name = 'Meet Dave',
  role = 'Artist & Studio Lead',
  credentials = 'Former US Army Officer • Rock Climber • Warhammer Enthusiast',
  kicker = 'Behind The Paintbrush',
  title = 'Precision, Patience & Discipline',
  paragraphs = [
    'Before setting up the paint desk, Dave served as a US Army officer. That background brings a high level of operational discipline to commission painting: structured inventorying, consistent quality control, and strict deadline adherence.',
    "When he's not at the workbench, he's out rock climbing. The same patience required for route-finding and anchor placement translates directly into multi-layered edge highlighting, fine detail brushwork, and custom terrain building.",
  ],
}) => {
  return (
    <section
      className={styles.aboutSection}
      id="about"
      aria-label="Artist Bio & Background"
    >
        <div className={styles.graniteOverlay} aria-hidden="true" />
        <div className={styles.container}>
          <div className={styles.aboutGrid}>
            <div className={styles.avatarCard}>
              <div className={styles.avatarIcon} aria-hidden="true">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <circle cx="12" cy="7" r="4" />
                  <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
                </svg>
              </div>
              <h3 className={styles.artistName}>{name}</h3>
              <p className={styles.artistRole}>{role}</p>
              <p className={styles.artistCredentials}>{credentials}</p>
            </div>

            <div>
              <p className={styles.sectionKicker}>{kicker}</p>
              <h2 className={styles.sectionTitle}>{title}</h2>
              {paragraphs.map((para, index) => (
                <p key={index} className={styles.bioParagraph}>
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>
  )
}

export default AboutBio

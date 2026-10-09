import React from 'react'
import {
  useCommissionWizard,
  UNIT_TYPE_OPTIONS,
  ASSEMBLY_OPTIONS,
  TIER_OPTIONS,
} from '@/hooks/useCommissionWizard'
import styles from './CommissionForm.module.scss'

export interface CommissionFormProps {
  initialArmy?: string
  initialUnitType?: string
  initialCondition?: string
  initialTier?: string
  initialNotes?: string
}

export const CommissionForm: React.FC<CommissionFormProps> = ({
  initialArmy,
  initialUnitType,
  initialCondition,
  initialTier,
  initialNotes,
}) => {
  const {
    army,
    unitType,
    assemblyCondition,
    targetTier,
    customNotes,
    hasCopied,
    mailtoUrl,
    setArmy,
    setUnitType,
    setAssemblyCondition,
    setTargetTier,
    setCustomNotes,
    copySpecs,
  } = useCommissionWizard({
    initialArmy,
    initialUnitType,
    initialCondition,
    initialTier,
    initialNotes,
  })

  return (
    <section
      className={styles.commission}
      id="commission"
      aria-label="Commission Quote Request Form"
    >
        <div className={styles.graniteOverlay} aria-hidden="true" />
        <div className={styles.container}>
          <p className={styles.sectionKicker}>Commission Request</p>
          <h2 className={styles.sectionTitle}>Request a Custom Quote</h2>
          <p className={styles.sectionLede}>
            Fill out the quick project questionnaire below to generate a pre-formatted commission inquiry for Dave.
          </p>

          <div className={styles.intakeWizardCard}>
            <form onSubmit={(e) => e.preventDefault()} noValidate>
              <div className={styles.wizardGrid}>
                {/* 1. Faction / Army / Game */}
                <div className={styles.formGroup}>
                  <label htmlFor="formArmy" className={styles.formLabel}>
                    1. Faction / Army / Game
                  </label>
                  <input
                    type="text"
                    id="formArmy"
                    className={styles.formInput}
                    placeholder="e.g. Space Marines, Ultramarines, Stormcast Eternals..."
                    value={army}
                    onChange={(e) => setArmy(e.target.value)}
                  />
                </div>

                {/* 2. Model Type & Quantity */}
                <div className={styles.formGroup}>
                  <label htmlFor="formUnitType" className={styles.formLabel}>
                    2. Model Type & Quantity
                  </label>
                  <select
                    id="formUnitType"
                    className={styles.formSelect}
                    value={unitType}
                    onChange={(e) => setUnitType(e.target.value)}
                  >
                    {UNIT_TYPE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 3. Current Assembly State */}
                <div className={styles.formGroup}>
                  <label htmlFor="formCondition" className={styles.formLabel}>
                    3. Current Assembly State
                  </label>
                  <select
                    id="formCondition"
                    className={styles.formSelect}
                    value={assemblyCondition}
                    onChange={(e) => setAssemblyCondition(e.target.value)}
                  >
                    {ASSEMBLY_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 4. Desired Painting Standard */}
                <div className={styles.formGroup}>
                  <label htmlFor="formTier" className={styles.formLabel}>
                    4. Desired Painting Standard
                  </label>
                  <select
                    id="formTier"
                    className={styles.formSelect}
                    value={targetTier}
                    onChange={(e) => setTargetTier(e.target.value)}
                  >
                    {TIER_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 5. Custom Notes */}
                <div className={`${styles.formGroup} ${styles.fullWidthGroup}`}>
                  <label htmlFor="formNotes" className={styles.formLabel}>
                    5. Custom Notes, Color Preferences, or Reference Photo Links
                  </label>
                  <textarea
                    id="formNotes"
                    className={styles.formTextarea}
                    placeholder="Include any specific chapter schemes, basing preferences (desert, snow, urban rubble), or deadline dates..."
                    value={customNotes}
                    onChange={(e) => setCustomNotes(e.target.value)}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className={styles.actionsRow}>
                <a
                  className={styles.mailtoBtn}
                  id="formSubmitBtn"
                  href={mailtoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Transmit quote request email to Dave"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="M3 7l9 6 9-6" />
                  </svg>
                  <span>Transmit Quote Request to Dave</span>
                </a>

                <button
                  type="button"
                  className={`${styles.copyBtn} ${hasCopied ? styles.isCopied : ''}`}
                  onClick={() => {
                    void copySpecs()
                  }}
                  aria-live="polite"
                  aria-label={hasCopied ? 'Inquiry copied to clipboard' : 'Copy inquiry specs to clipboard'}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    {hasCopied ? (
                      <polyline points="20 6 9 17 4 12" />
                    ) : (
                      <>
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </>
                    )}
                  </svg>
                  <span>{hasCopied ? 'Specs Copied!' : 'Copy Inquiry to Clipboard'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
  )
}

export default CommissionForm

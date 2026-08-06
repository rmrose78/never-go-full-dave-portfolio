import React from 'react'
import { useIndustrialAudio } from '@/hooks/useIndustrialAudio'
import styles from './IndustrialAudioWidget.module.scss'

export interface IndustrialAudioWidgetProps {
  isPlaying?: boolean
  onToggle?: () => void
  className?: string
}

export const IndustrialAudioWidget: React.FC<IndustrialAudioWidgetProps> = ({
  isPlaying: customIsPlaying,
  onToggle,
  className = '',
}) => {
  const hookAudio = useIndustrialAudio()

  const activeState = customIsPlaying !== undefined ? customIsPlaying : hookAudio.isPlaying
  const handleToggle = onToggle ? onToggle : hookAudio.toggleAudio

  const widgetClasses = [
    styles.industrialAudioWidget,
    activeState ? styles.isActive : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={widgetClasses} id="industrialAudioWidget" data-testid="industrial-audio-widget">
      {/* Corner screws */}
      <span className={`${styles.widgetScrew} ${styles.screwTL}`} aria-hidden="true" />
      <span className={`${styles.widgetScrew} ${styles.screwTR}`} aria-hidden="true" />
      <span className={`${styles.widgetScrew} ${styles.screwBL}`} aria-hidden="true" />
      <span className={`${styles.widgetScrew} ${styles.screwBR}`} aria-hidden="true" />

      {/* Metallic Speaker Grill */}
      <div className={styles.widgetSpeaker} title="Studio Vox Audio Feed">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M11 5L6 9H2v6h4l5 4V5z" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
      </div>

      {/* Gloomy Abandoned Warehouse Flickering Bulb */}
      <div className={styles.warehouseLightHousing} title="Power Grid Indicator">
        <div className={styles.warehouseLightBulb} id="warehouseLightBulb" />
      </div>

      {/* Rusted Heavy Vertical Toggle Switch */}
      <button
        type="button"
        className={styles.verticalRustSwitch}
        id="rustToggleBtn"
        aria-label="Toggle Industrial Techno Audio Feed"
        aria-pressed={activeState}
        onClick={() => void handleToggle()}
      >
        <span className={styles.switchHousing}>
          <span className={styles.switchSlot} />
          <span className={styles.switchLever} id="rustLever" />
        </span>
      </button>

      {/* Status Label & Screen Reader Live Region */}
      <span className={styles.widgetLabel} id="widgetLabel">
        {activeState ? 'ON' : 'OFF'}
      </span>
      <span className="visually-hidden" aria-live="polite">
        {`Industrial Audio Feed is ${activeState ? 'ON' : 'OFF'}`}
      </span>
    </div>
  )
}

export default IndustrialAudioWidget

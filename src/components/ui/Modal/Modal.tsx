import React, { useEffect, useRef } from 'react'
import styles from './Modal.module.scss'

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  kicker?: string
  wide?: boolean
  children?: React.ReactNode
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  kicker,
  wide = false,
  children,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isOpen) {
      if (typeof dialog.showModal === 'function') {
        if (!dialog.open) {
          dialog.showModal()
        }
      } else {
        dialog.setAttribute('open', '')
      }
    } else {
      if (typeof dialog.close === 'function') {
        if (dialog.open) {
          dialog.close()
        }
      } else {
        dialog.removeAttribute('open')
      }
    }
  }, [isOpen])

  // Handle Escape key cancellation from native dialog
  const handleCancel = (e: React.SyntheticEvent) => {
    e.preventDefault()
    onClose()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDialogElement>) => {
    if (e.key === 'Escape') {
      e.stopPropagation()
      onClose()
    }
  }

  // Handle backdrop click (clicking outside modalContent)
  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      onClose()
    }
  }

  if (!isOpen) {
    return null
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <dialog
      ref={dialogRef}
      className={styles.modal}
      onCancel={handleCancel}
      onKeyDown={handleKeyDown}
      onClick={handleBackdropClick}
      aria-labelledby="modal-dialog-title"
      data-testid="accessible-modal"
    >
      <div className={`${styles.modalContent} ${wide ? styles.modalContentWide : ''}`}>
        <button
          type="button"
          className={styles.modalClose}
          onClick={onClose}
          aria-label="Close dialog"
          data-testid="modal-close-btn"
        >
          ✕
        </button>

        {kicker && <p className={styles.modalKicker}>{kicker}</p>}
        <h3 id="modal-dialog-title" className={styles.modalTitle}>
          {title}
        </h3>

        <div className={styles.modalBody}>{children}</div>
      </div>
    </dialog>
  )
}

export default Modal

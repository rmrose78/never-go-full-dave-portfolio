import React from 'react'
import { DISPATCH_POSTS } from '@/data/dispatches'
import type { DispatchPost } from '@/data/dispatches'
import styles from './Dispatches.module.scss'

export interface DispatchesProps {
  posts?: DispatchPost[]
  onSelectPost?: (post: DispatchPost) => void
  onOpenArchive?: () => void
}

export const Dispatches: React.FC<DispatchesProps> = ({
  posts = DISPATCH_POSTS.slice(0, 3),
  onSelectPost,
  onOpenArchive,
}) => {
  return (
    <section
      className={styles.dispatches}
      id="dispatches"
      aria-label="Studio Dispatches & Hobby Desk Logs"
    >
      <div className={styles.graniteOverlay} aria-hidden="true" />
      <div className={styles.container}>
        <p className={styles.sectionKicker}>Dispatches</p>
        <h2 className={styles.sectionTitle}>Hobby Desk Logs</h2>

        <div className={styles.postGrid} role="region" aria-label="Recent Dispatches">
          {posts.map((post) => (
            <button
              key={post.id}
              type="button"
              className={styles.postCard}
              onClick={() => onSelectPost?.(post)}
              aria-haspopup="dialog"
              aria-label={`Read dispatch: ${post.title}`}
              data-testid={`dispatch-card-${post.id}`}
            >
              <span className={styles.tag}>{post.tag}</span>
              <h3 className={styles.postTitle}>{post.title}</h3>
              <span className={styles.readMore} aria-hidden="true">
                &gt; Access dataslate
              </span>
            </button>
          ))}
        </div>

        <div className={styles.archiveCta}>
          <button
            type="button"
            className={styles.archiveBtn}
            id="openArchiveBtn"
            onClick={onOpenArchive}
            aria-haspopup="dialog"
            aria-label="View Full Dispatches Archive"
            data-testid="open-archive-btn"
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
              <rect x="3" y="4" width="18" height="4" rx="1" />
              <path d="M5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8" />
              <path d="M10 13h4" />
            </svg>
            <span>View Full Dispatches Archive</span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default Dispatches

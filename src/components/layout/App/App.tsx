import React, { useState } from 'react'
import { Header } from '@/components/layout/Header/Header'
import { Footer } from '@/components/layout/Footer/Footer'
import { Hero } from '@/components/sections/Hero/Hero'
import { Gallery } from '@/components/sections/Gallery/Gallery'
import { Specialties } from '@/components/sections/Specialties/Specialties'
import { Standards } from '@/components/sections/Standards/Standards'
import { CommissionForm } from '@/components/sections/CommissionForm/CommissionForm'
import { Showcase } from '@/components/sections/Showcase/Showcase'
import { AboutBio } from '@/components/sections/AboutBio/AboutBio'
import { Dispatches } from '@/components/sections/Dispatches/Dispatches'
import { IndustrialAudioWidget } from '@/components/ui/IndustrialAudioWidget/IndustrialAudioWidget'
import { Modal } from '@/components/ui/Modal/Modal'
import { RECIPE_MODAL_DATA, DISPATCH_POSTS } from '@/data/dispatches'
import type { PortfolioItem } from '@/data/portfolio'
import type { DispatchPost } from '@/data/dispatches'
import dispatchesStyles from '@/components/sections/Dispatches/Dispatches.module.scss'
import styles from './App.module.scss'

export interface AppProps {
  children?: React.ReactNode
}

export const App: React.FC<AppProps> = ({ children }) => {
  const [detailModal, setDetailModal] = useState<{
    isOpen: boolean
    title: string
    kicker: string
    body: string
  }>({
    isOpen: false,
    title: '',
    kicker: '',
    body: '',
  })

  const [isArchiveOpen, setIsArchiveOpen] = useState(false)

  const handleSelectCard = (item: PortfolioItem) => {
    const recipe = RECIPE_MODAL_DATA[item.recipeModalId]
    if (recipe) {
      setDetailModal({
        isOpen: true,
        title: recipe.title,
        kicker: recipe.kicker,
        body: recipe.body,
      })
    } else {
      setDetailModal({
        isOpen: true,
        title: item.title,
        kicker: item.factionName,
        body: 'Detailed paint recipe coming soon.',
      })
    }
  }

  const handleSelectPost = (post: DispatchPost) => {
    setIsArchiveOpen(false)
    setDetailModal({
      isOpen: true,
      title: post.title,
      kicker: 'Dispatch Log',
      body: post.content,
    })
  }

  const handleOpenArchive = () => {
    setIsArchiveOpen(true)
  }

  const handleCloseDetail = () => {
    setDetailModal((prev) => ({ ...prev, isOpen: false }))
  }

  const handleCloseArchive = () => {
    setIsArchiveOpen(false)
  }

  return (
    <div className={styles.appShell} data-testid="app-shell">
      <Header />
      <main className={styles.mainContainer} id="main">
        {children || (
          <>
            <Hero />
            <Gallery onSelectCard={handleSelectCard} />
            <Specialties />
            <Standards />
            <CommissionForm />
            <Showcase />
            <AboutBio />
            <Dispatches
              onSelectPost={handleSelectPost}
              onOpenArchive={handleOpenArchive}
            />
          </>
        )}
      </main>
      <Footer />
      <IndustrialAudioWidget />

      {/* Shared Detail Modal (Recipes & Individual Dispatch Logs) */}
      <Modal
        isOpen={detailModal.isOpen}
        onClose={handleCloseDetail}
        title={detailModal.title}
        kicker={detailModal.kicker}
      >
        <p>{detailModal.body}</p>
      </Modal>

      {/* Dispatches Full Archive Modal */}
      <Modal
        isOpen={isArchiveOpen}
        onClose={handleCloseArchive}
        title="Full Dispatches Archive"
        kicker="Archive Index"
        wide
      >
        <div id="archiveList" role="feed" aria-label="Dispatches archive list">
          {DISPATCH_POSTS.map((post) => (
            <button
              key={post.id}
              type="button"
              className={dispatchesStyles.archiveListItem}
              onClick={() => handleSelectPost(post)}
              aria-haspopup="dialog"
              aria-label={`Read archived dispatch: ${post.title}`}
              data-testid={`archive-item-${post.id}`}
            >
              <span className={dispatchesStyles.tag}>{post.tag}</span>
              <h4 className={dispatchesStyles.archiveItemTitle}>{post.title}</h4>
              <p className={dispatchesStyles.archiveItemExcerpt}>{post.excerpt}</p>
            </button>
          ))}
        </div>
      </Modal>
    </div>
  )
}

export default App

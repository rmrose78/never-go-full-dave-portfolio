import React from 'react'
import { StudioEmblem } from '@/components/ui/StudioEmblem/StudioEmblem'
import styles from './App.module.scss'

export interface AppProps {
  children?: React.ReactNode
}

export const App: React.FC<AppProps> = ({ children }) => {
  return (
    <div className={styles.appShell} data-testid="app-shell">
      <main className={styles.mainContainer} id="main">
        <header className={styles.headerScaffold}>
          <div className={styles.brandGroup}>
            <StudioEmblem variant="nav" ariaLabel="Studio Emblem" />
            <h1 className={styles.brandTitle}>
              Never Go Full <span>DAVE</span>
            </h1>
          </div>
        </header>
        {children || (
          <section aria-label="Studio Showcase Scaffold">
            <p>Design Tokens &amp; Base Layout Scaffold Initialized.</p>
          </section>
        )}
      </main>
    </div>
  )
}

export default App

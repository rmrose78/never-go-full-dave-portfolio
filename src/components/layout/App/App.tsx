import React from 'react'
import { Header } from '@/components/layout/Header/Header'
import { Footer } from '@/components/layout/Footer/Footer'
import { IndustrialAudioWidget } from '@/components/ui/IndustrialAudioWidget/IndustrialAudioWidget'
import styles from './App.module.scss'

export interface AppProps {
  children?: React.ReactNode
}

export const App: React.FC<AppProps> = ({ children }) => {
  return (
    <div className={styles.appShell} data-testid="app-shell">
      <Header />
      <main className={styles.mainContainer} id="main">
        {children || (
          <section aria-label="Studio Showcase Scaffold">
            <p>Design Tokens &amp; Base Layout Scaffold Initialized.</p>
          </section>
        )}
      </main>
      <Footer />
      <IndustrialAudioWidget />
    </div>
  )
}

export default App

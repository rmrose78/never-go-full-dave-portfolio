import React from 'react'
import { Header } from '@/components/layout/Header/Header'
import { Footer } from '@/components/layout/Footer/Footer'
import { Hero } from '@/components/sections/Hero/Hero'
import { Gallery } from '@/components/sections/Gallery/Gallery'
import { Specialties } from '@/components/sections/Specialties/Specialties'
import { Standards } from '@/components/sections/Standards/Standards'
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
          <>
            <Hero />
            <Gallery />
            <Specialties />
            <Standards />
          </>
        )}
      </main>
      <Footer />
      <IndustrialAudioWidget />
    </div>
  )
}

export default App

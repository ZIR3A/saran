import { useEffect } from 'react'
import { Analytics } from '@vercel/analytics/react'
import CinematicEnvironment from './components/layout/CinematicEnvironment'
import Navigation from './components/layout/Navigation'
import TrailerSection from './components/sections/TrailerSection'
import EngineeringJourney from './components/sections/EngineeringJourney'
import EngineeringHighlights from './components/sections/EngineeringHighlights'
import BuildReel from './components/sections/BuildReel'
import SelectedExperiences from './components/sections/SelectedExperiences'
import CaseStudy from './components/sections/CaseStudy'
import Projects from './components/sections/Projects'
import Contact from './components/sections/Contact'
import {
  initScrollFoundation,
  destroyScrollFoundation,
  refreshScroll,
  resetScrollPosition,
  observeMediaForRefresh,
} from './components/animations/scroll'
import { createSmoothScroll } from './components/animations/smoothScroll'

export default function App() {
  useEffect(() => {
    resetScrollPosition()
    initScrollFoundation()
    const destroyLenis = createSmoothScroll()
    refreshScroll()

    const unbindMedia = observeMediaForRefresh(document)

    const fontsReady = document.fonts?.ready?.then(() => {
      resetScrollPosition()
      refreshScroll()
    })

    requestAnimationFrame(() => {
      resetScrollPosition()
      refreshScroll()
    })

    return () => {
      unbindMedia()
      fontsReady?.catch?.(() => {})
      destroyLenis()
      destroyScrollFoundation()
    }
  }, [])

  return (
    <>
      <CinematicEnvironment />
      <Navigation />

      <main className="relative z-10 min-h-screen bg-background">
        <TrailerSection />
        <EngineeringJourney />
        <EngineeringHighlights />
        <BuildReel />
        <SelectedExperiences />
        <CaseStudy />
        <Projects />
        <Contact />
      </main>

      <Analytics />
    </>
  )
}

import { useEffect, useState } from 'react'
import { ScrollTrigger } from '../components/animations/gsap'

/** Sections tracked for navigation highlighting */
export const NAV_SECTION_MAP = {
  trailer: null,
  identity: null,
  'engineering-journey': 'engineering-journey',
  'engineering-highlights': 'engineering-journey',
  'build-reel': 'engineering-journey',
  'selected-experiences': 'selected-experiences',
  'case-study': 'selected-experiences',
  projects: 'selected-experiences',
  contact: 'contact',
}

const SECTION_IDS = [
  'engineering-journey',
  'engineering-highlights',
  'build-reel',
  'selected-experiences',
  'case-study',
  'projects',
  'contact',
]

const NAV_REVEAL_PROGRESS = 0.30

/**
 * Tracks the active portfolio section and trailer nav visibility.
 * Uses ScrollTrigger (synced with Lenis) — no duplicate scroll listeners.
 */
export function useActiveSection() {
  const [activeSection, setActiveSection] = useState('trailer')
  const [navVisible, setNavVisible] = useState(false)

  useEffect(() => {
    const triggers = []
    let trailerProgress = 0
    let trailerInView = true

    const syncNavVisibility = () => {
      setNavVisible(trailerProgress >= NAV_REVEAL_PROGRESS)
    }

    const trailer = document.getElementById('trailer')
    if (trailer) {
      triggers.push(
        ScrollTrigger.create({
          id: 'nav-trailer-visibility',
          trigger: trailer,
          start: 'top top',
          end: 'bottom bottom',
          onUpdate: (self) => {
            trailerProgress = self.progress
            trailerInView = self.isActive
            syncNavVisibility()
            if (self.isActive) {
              if (self.progress < NAV_REVEAL_PROGRESS) {
                setActiveSection('trailer')
              } else {
                setActiveSection('identity')
              }
            }
          },
          onLeave: () => {
            trailerInView = false
            syncNavVisibility()
          },
          onEnterBack: () => {
            trailerInView = true
            syncNavVisibility()
            if (trailerProgress < NAV_REVEAL_PROGRESS) {
              setActiveSection('trailer')
            }
          },
        }),
      )
    }

    const sectionElements = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean)

    if (sectionElements.length) {
      const batch = ScrollTrigger.batch(sectionElements, {
        start: 'top 55%',
        end: 'bottom 45%',
        onEnter: (batch) => {
          const target = batch[0]
          if (target?.id) setActiveSection(target.id)
        },
        onEnterBack: (batch) => {
          const target = batch[0]
          if (target?.id) setActiveSection(target.id)
        },
      })
      if (batch?.length) triggers.push(...batch)
    }

    return () => {
      triggers.forEach((trigger) => trigger.kill())
    }
  }, [])

  const navActiveId = NAV_SECTION_MAP[activeSection] ?? null

  return {
    activeSection,
    navActiveId,
    navVisible,
    isTrailer: activeSection === 'trailer',
  }
}

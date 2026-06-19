import { gsap, ScrollTrigger } from './gsap'
import { createJourneySnap } from './scrollSnap'

export function createJourneyAnimation({ refs, stageCount }) {
  const { section, pin, stages, progressFills, progressLabels } = refs

  if (!section || !pin || !stages?.length) return () => {}

  const mm = gsap.matchMedia()
  const segments = stageCount - 1

  const getStageIndex = (progress) =>
    Math.min(stageCount - 1, Math.round(progress * segments))

  const setActiveStage = (index, isMobile) => {
    stages.forEach((stage, i) => {
      const isActive = i === index
      gsap.set(stage, {
        opacity: isActive ? 1 : 0,
        y: isActive ? 0 : isMobile ? 16 : 24,
        visibility: isActive ? 'visible' : 'hidden',
        pointerEvents: isActive ? 'auto' : 'none',
        zIndex: isActive ? 10 + i : i,
      })
    })

    progressLabels?.forEach((label, i) => {
      gsap.set(label, { opacity: i === index ? 1 : 0.35 })
    })
  }

  const updateProgressFills = (progress) => {
    progressFills?.forEach((fill, i) => {
      if (i === 0) {
        gsap.set(fill, { scaleX: 1 })
        return
      }

      const start = (i - 1) / segments
      const fillAmount = gsap.utils.clamp(0, 1, (progress - start) * segments)
      gsap.set(fill, { scaleX: fillAmount, transformOrigin: 'left center' })
    })
  }

  const syncJourneyState = (progress, isMobile, lastIndexRef) => {
    const index = getStageIndex(progress)
    updateProgressFills(progress)

    if (index !== lastIndexRef.current) {
      setActiveStage(index, isMobile)
      lastIndexRef.current = index
    }
  }

  mm.add(
    {
      isMobile: '(max-width: 767px)',
      isDesktop: '(min-width: 768px)',
      reduceMotion: '(prefers-reduced-motion: reduce)',
    },
    (context) => {
      const { isMobile, reduceMotion } = context.conditions
      const scrollDistance = isMobile ? `+=${stageCount * 55}%` : `+=${stageCount * 80}%`
      const lastIndexRef = { current: 0 }

      if (reduceMotion) {
        setActiveStage(0, isMobile)
        updateProgressFills(0)
        return
      }

      setActiveStage(0, isMobile)
      updateProgressFills(0)

      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: scrollDistance,
        pin: pin,
        scrub: isMobile ? 0.35 : 0.45,
        anticipatePin: 1,
        fastScrollEnd: true,
        invalidateOnRefresh: true,
        snap: createJourneySnap(stageCount),
        onUpdate: (self) => syncJourneyState(self.progress, isMobile, lastIndexRef),
        onEnterBack: () => {
          lastIndexRef.current = -1
          syncJourneyState(0, isMobile, lastIndexRef)
        },
        onLeave: () => {
          syncJourneyState(1, isMobile, lastIndexRef)
        },
      })
    },
  )

  return () => mm.revert()
}

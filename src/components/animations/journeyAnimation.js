import { gsap } from './gsap'

export function createJourneyAnimation({ refs, stageCount }) {
  const { section, pin, stages, progressFills, progressLabels } = refs

  if (!section || !pin || !stages?.length) return () => {}

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (reduceMotion) {
    gsap.set(stages, {
      opacity: 1, y: 0, visibility: 'visible', pointerEvents: 'auto',
    })
    gsap.set(progressLabels, { opacity: 1 })
    if (progressFills?.length) {
      gsap.set(progressFills, { scaleX: 1, transformOrigin: 'left center' })
    }
    return () => {}
  }

  // Initial states
  gsap.set(stages, { y: '100%', visibility: 'hidden', pointerEvents: 'none' })
  gsap.set(stages[0], { y: '0%', visibility: 'visible', pointerEvents: 'auto' })

  if (progressLabels?.length) {
    gsap.set(progressLabels, { opacity: 0.35 })
    gsap.set(progressLabels[0], { opacity: 1 })
  }

  if (progressFills?.length) {
    gsap.set(progressFills, { scaleX: 0, transformOrigin: 'left center' })
    gsap.set(progressFills[0], { scaleX: 1 })
  }

  const playTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: `+=${window.innerHeight * stageCount}`,
      pin: pin,
      scrub: 1,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    }
  })

  stages.forEach((stage, i) => {
    if (i === 0) return // stage 0 is already visible at the start

    const progressFill = progressFills?.[i]
    const progressLabel = progressLabels?.[i]
    const prevLabel = progressLabels?.[i - 1]
    const prevStage = stages[i - 1]

    playTimeline
      .to(prevStage, {
        scale: 0.96,
        opacity: 0.5,
        duration: 1,
        ease: 'power2.inOut'
      }, `stage${i}`)
      .to(stage, {
        y: '0%',
        visibility: 'visible',
        pointerEvents: 'auto',
        duration: 1,
        ease: 'power2.inOut'
      }, `stage${i}`)

    if (prevLabel && progressLabel) {
      playTimeline
        .to(prevLabel, { opacity: 0.35, duration: 1, ease: 'power2.inOut' }, `stage${i}`)
        .to(progressLabel, { opacity: 1, duration: 1, ease: 'power2.inOut' }, `stage${i}`)
    }

    if (progressFill) {
      playTimeline.to(progressFill, { scaleX: 1, duration: 1, ease: 'none' }, `stage${i}`)
    }
  })

  return () => {
    if (playTimeline.scrollTrigger) {
      playTimeline.scrollTrigger.kill()
    }
    playTimeline.kill()
  }
}

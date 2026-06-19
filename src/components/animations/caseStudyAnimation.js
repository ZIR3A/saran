import { gsap } from './gsap'
import { createStageSnap } from './scrollSnap'

export function createCaseStudyAnimation({ refs, phaseCount }) {
  const { section, pin, phases, progressFills } = refs

  if (!section || !phases?.length) return () => {}

  const mm = gsap.matchMedia()

  mm.add(
    {
      isMobile: '(max-width: 767px)',
      isDesktop: '(min-width: 768px)',
      reduceMotion: '(prefers-reduced-motion: reduce)',
    },
    (context) => {
      const { isMobile, reduceMotion } = context.conditions

      if (reduceMotion) {
        gsap.set(phases, { opacity: 0, y: 0, pointerEvents: 'none' })
        gsap.set(phases[0], { opacity: 1, pointerEvents: 'auto' })
        if (progressFills?.length) {
          gsap.set(progressFills, { scaleX: 0 })
          gsap.set(progressFills[0], { scaleX: 1 })
        }
        return
      }

      if (isMobile) {
        phases.forEach((phase) => {
          gsap.fromTo(
            phase,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: phase,
                start: 'top 88%',
                toggleActions: 'play none none reverse',
              },
            },
          )
        })
        return
      }

      if (!pin) return

      gsap.set(phases, { opacity: 0, y: 48, pointerEvents: 'none' })
      gsap.set(phases[0], { opacity: 1, y: 0, pointerEvents: 'auto' })

      if (progressFills?.length) {
        gsap.set(progressFills, { scaleX: 0, transformOrigin: 'left center' })
        gsap.set(progressFills[0], { scaleX: 1 })
      }

      const scrollDistance = isMobile ? `+=${phaseCount * 70}%` : `+=${phaseCount * 85}%`
      const transitionDuration = isMobile ? 0.22 : 0.28

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: scrollDistance,
          pin,
          scrub: isMobile ? 0.55 : 0.85,
          anticipatePin: 1,
          fastScrollEnd: true,
          invalidateOnRefresh: true,
          snap: createStageSnap(phaseCount, true),
        },
      })

      for (let i = 1; i < phaseCount; i += 1) {
        scrollTl
          .to(phases[i - 1], {
            opacity: 0,
            y: -16,
            duration: transitionDuration * 0.8,
            ease: 'power2.inOut',
          })
          .to(
            phases[i],
            {
              opacity: 1,
              y: 0,
              duration: transitionDuration * 0.8,
              ease: 'power2.out',
            },
            '>',
          )
        if (progressFills?.[i]) {
          scrollTl.to(
            progressFills[i],
            { scaleX: 1, duration: transitionDuration * 1.6, ease: 'none' },
            `<-${transitionDuration * 0.8}`,
          )
        }

        scrollTl
          .set(phases[i - 1], { pointerEvents: 'none' })
          .set(phases[i], { pointerEvents: 'auto' })
      }
    },
  )

  return () => mm.revert()
}

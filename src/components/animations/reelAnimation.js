import { gsap } from './gsap'

export function createReelAnimation({ refs }) {
  const {
    section,
    container,
    video,
    placeholderGradient,
    overlay,
    titleWords,
    support,
    cta,
  } = refs

  if (!section || !container) return () => {}

  const mm = gsap.matchMedia()

  mm.add(
    {
      isMobile: '(max-width: 767px)',
      isDesktop: '(min-width: 768px)',
      reduceMotion: '(prefers-reduced-motion: reduce)',
    },
    (context) => {
      const { isMobile, reduceMotion } = context.conditions
      const clipStart = isMobile
        ? 'inset(30% 8% 30% 8% round 8px)'
        : 'inset(38% 32% 38% 32% round 14px)'
      const clipEnd = 'inset(0% 0% 0% 0% round 0px)'
      const scrollScale = isMobile ? 1.015 : 1.04

      if (reduceMotion) {
        gsap.set(container, {
          scale: 1,
          opacity: 1,
          clipPath: clipEnd,
          filter: 'none',
        })
        gsap.set([titleWords, support, cta], { opacity: 1, y: 0 })
        if (video) gsap.set(video, { scale: 1 })
        return
      }

      gsap.set(container, {
        scale: 0.5,
        opacity: 0,
        clipPath: clipStart,
        filter: 'none',
        force3D: true,
        transformOrigin: '50% 50%',
      })

      gsap.set([titleWords, support, cta], {
        opacity: 0,
        y: isMobile ? 12 : 20,
      })

      if (video) {
        gsap.set(video, { scale: 1, force3D: true, transformOrigin: '50% 50%' })
      }

      let gradientTween = null

      if (placeholderGradient) {
        gradientTween = gsap.to(placeholderGradient, {
          rotation: 360,
          duration: 24,
          repeat: -1,
          ease: 'none',
          force3D: true,
        })
      }

      // Create a smooth, time-based reveal rather than scrubbed
      // This feels much more cinematic and independent of scroll speed
      const revealTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 95%', // Start earlier so it's fully visible when centered
          toggleActions: 'play none none reverse',
        },
      })

      revealTl
        .to(container, {
          scale: 1,
          opacity: 1,
          clipPath: clipEnd,
          force3D: true,
          ease: 'power4.out',
          duration: 1.2, // Faster container reveal
        })
        .to(
          titleWords,
          {
            opacity: 1,
            y: 0,
            stagger: isMobile ? 0.04 : 0.06,
            ease: 'power3.out',
            duration: 0.8,
          },
          '-=0.8',
        )
        .to(
          support,
          {
            opacity: 1,
            y: 0,
            ease: 'power2.out',
            duration: 0.6,
          },
          '-=0.6',
        )
        .to(
          cta,
          {
            opacity: 1,
            y: 0,
            ease: 'power2.out',
            duration: 0.6,
          },
          '-=0.5',
        )

      if (video) {
        gsap.to(video, {
          scale: scrollScale,
          force3D: true,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2, // increased scrub duration for smoother parallax
          },
        })
      }



      return () => {
        gradientTween?.kill()
      }
    },
  )

  return () => mm.revert()
}

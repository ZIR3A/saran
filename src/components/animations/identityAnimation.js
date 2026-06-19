import { gsap } from './gsap'

export function createIdentityAnimation({ refs }) {
  const { section, words, support, ambient, particles, gridLines } = refs

  if (!section) return () => {}

  const mm = gsap.matchMedia()

  mm.add(
    {
      isMobile: '(max-width: 767px)',
      isDesktop: '(min-width: 768px)',
      reduceMotion: '(prefers-reduced-motion: reduce)',
    },
    (context) => {
      const { isMobile, reduceMotion } = context.conditions
      const visibleParticles = particles?.slice(0, isMobile ? 5 : 10) ?? []
      const visibleGrid = gridLines ?? []

      if (reduceMotion) {
        gsap.set(words, { opacity: 1, y: 0 })
        gsap.set(support, { opacity: 1, y: 0 })
        gsap.set([ambient, visibleParticles, visibleGrid], { opacity: 1 })
        return
      }

      gsap.set(words, { opacity: 0, y: isMobile ? 16 : 28 })
      gsap.set(support, { opacity: 0, y: isMobile ? 12 : 20 })
      gsap.set(visibleGrid, { scaleX: 0, opacity: 0 })
      gsap.set(visibleParticles, { opacity: 0, scale: 0.5 })

      const revealTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 72%',
          end: 'top 18%',
          scrub: isMobile ? 0.5 : 0.8,
        },
      })

      revealTl
        .to(words, {
          opacity: 1,
          y: 0,
          stagger: isMobile ? 0.06 : 0.09,
          ease: 'none',
          duration: 1,
        })
        .to(
          support,
          {
            opacity: 1,
            y: 0,
            ease: 'none',
            duration: 0.35,
          },
          '-=0.15',
        )

      gsap.to(visibleGrid, {
        scaleX: 1,
        opacity: 0.3,
        duration: 1.4,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })

      gsap.to(visibleParticles, {
        opacity: (index, el) => Number(el.dataset.opacity ?? 0.5),
        scale: 1,
        duration: 1.2,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      })

      visibleParticles.forEach((particle, index) => {
        gsap.to(particle, {
          y: (index % 2 === 0 ? -1 : 1) * (isMobile ? 10 : 18),
          x: (index % 3 === 0 ? 1 : -1) * (isMobile ? 5 : 8),
          duration: 4 + index * 0.4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      })

      if (ambient) {
        gsap.to(ambient, {
          y: isMobile ? -8 : -16,
          duration: 8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      }
    },
  )

  return () => mm.revert()
}

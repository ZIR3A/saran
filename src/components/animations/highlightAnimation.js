import { gsap } from './gsap'

export function createHighlightAnimation({ refs }) {
  const { section, header, cards } = refs

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

      if (reduceMotion) {
        gsap.set([header, cards], { opacity: 1, y: 0 })
        return
      }

      if (header) {
        gsap.set(header, { opacity: 0, y: isMobile ? 16 : 24 })
        gsap.to(header, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        })
      }

      gsap.set(cards, {
        opacity: 0,
        y: isMobile ? 24 : 40,
      })

      cards.forEach((card, index) => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
          delay: index * (isMobile ? 0.04 : 0.06),
        })
      })
    },
  )

  return () => mm.revert()
}

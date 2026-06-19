import { gsap } from './gsap'

export function createExperienceAnimation({ refs }) {
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
        gsap.set(header, { opacity: 0, y: isMobile ? 16 : 28 })
        gsap.to(header, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        })
      }

      cards?.forEach((card) => {
        const image = card.querySelector('[data-experience-parallax]')

        gsap.set(card, {
          opacity: 0,
          y: isMobile ? 36 : 72,
        })

        gsap.to(card, {
          opacity: 1,
          y: 0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            end: 'top 60%',
            scrub: isMobile ? 0.35 : 0.6,
          },
        })

        if (image && !isMobile) {
          gsap.fromTo(
            image,
            { y: 0, force3D: true },
            {
              y: -32,
              force3D: true,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.6,
              },
            },
          )
        }
      })
    },
  )

  return () => mm.revert()
}

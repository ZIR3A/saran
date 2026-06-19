import { gsap } from './gsap'

export function createContactAnimation({ refs }) {
  const { section, titleWords, support, buttons } = refs

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
        gsap.set([titleWords, support, buttons], {
          opacity: 1,
          y: 0,
        })
        return
      }

      gsap.set(titleWords, {
        opacity: 0,
        y: isMobile ? 16 : 28,
      })
      gsap.set(support, {
        opacity: 0,
        y: isMobile ? 12 : 20,
      })
      gsap.set(buttons, {
        opacity: 0,
        y: isMobile ? 10 : 16,
      })

      const revealTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 78%',
          toggleActions: 'play none none reverse',
        },
      })

      revealTl
        .to(titleWords, {
          opacity: 1,
          y: 0,
          stagger: isMobile ? 0.04 : 0.06,
          duration: 0.6,
          ease: 'power3.out',
        })
        .to(
          support,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power3.out',
          },
          '-=0.3',
        )
        .to(
          buttons,
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.45,
            ease: 'power3.out',
          },
          '-=0.2',
        )
    },
  )

  return () => mm.revert()
}

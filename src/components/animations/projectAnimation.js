import { gsap } from './gsap'
import { createStageSnap } from './scrollSnap'

function getContributionItems(card) {
  return card.querySelectorAll('[data-project-contribution]')
}

function getRevealItems(card) {
  return card.querySelectorAll('[data-project-reveal]')
}

function getImage(card) {
  return card.querySelector('[data-project-image]')
}

function applyStackPositions(cards, activeIndex, timeline, position) {
  cards.forEach((card, index) => {
    if (index < activeIndex) return

    const offset = index - activeIndex

    if (offset === 0) return

    timeline.to(
      card,
      {
        opacity: Math.max(0.15, 0.5 - offset * 0.06),
        y: offset * 30,
        scale: 1 - offset * 0.035,
        rotation: offset * -1.2,
        zIndex: 20 - offset,
        duration: 0.25,
        ease: 'power2.out',
      },
      position,
    )
  })
}

function initDesktopStack(cards) {
  cards.forEach((card, index) => {
    const revealItems = getRevealItems(card)
    const contributionItems = getContributionItems(card)
    const image = getImage(card)

    if (index === 0) {
      gsap.set(card, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotation: 0,
        zIndex: 20,
        pointerEvents: 'auto',
      })
      gsap.set(revealItems, { opacity: 1, y: 0 })
      gsap.set(contributionItems, { opacity: 1, x: 0 })
      if (image) gsap.set(image, { scale: 1, y: 0 })
      return
    }

    gsap.set(card, {
      opacity: Math.max(0.2, 0.5 - index * 0.06),
      y: index * 30,
      scale: 1 - index * 0.035,
      rotation: index * -1.2,
      zIndex: 20 - index,
      pointerEvents: 'none',
    })
    gsap.set(revealItems, { opacity: 0, y: 20 })
    gsap.set(contributionItems, { opacity: 0, x: -10 })
    if (image) gsap.set(image, { scale: 1, y: 0 })
  })
}

export function createProjectAnimation({ refs, projectCount }) {
  const { section, pin, stack, cards, counter } = refs

  if (!section || !cards?.length) return () => { }

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
        gsap.set(cards, { opacity: 1, y: 0, scale: 1, rotation: 0 })
        cards.forEach((card) => {
          gsap.set(getRevealItems(card), { opacity: 1, y: 0 })
          gsap.set(getContributionItems(card), { opacity: 1, x: 0 })
          gsap.set(getImage(card), { scale: 1, y: 0 })
        })
        return
      }

      if (isMobile) {
        gsap.set(cards, { opacity: 0, y: 40 })

        cards.forEach((card) => {
          const image = getImage(card)

          gsap.to(card, {
            opacity: 1,
            y: 0,
            force3D: true,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 92%',
              end: 'top 68%',
              scrub: 0.35,
            },
          })

          gsap.fromTo(
            getRevealItems(card),
            { opacity: 0, y: 12 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.04,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top 86%',
                end: 'top 62%',
                scrub: 0.3,
              },
            },
          )

          gsap.fromTo(
            getContributionItems(card),
            { opacity: 0, x: -6 },
            {
              opacity: 1,
              x: 0,
              stagger: 0.04,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top 84%',
                end: 'top 60%',
                scrub: 0.3,
              },
            },
          )

          if (image) {
            gsap.fromTo(
              image,
              { scale: 1, y: 0, force3D: true },
              {
                scale: 1.02,
                y: -8,
                force3D: true,
                ease: 'none',
                scrollTrigger: {
                  trigger: card,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 0.45,
                },
              },
            )
          }
        })

        return
      }

      if (!pin || !stack) return

      initDesktopStack(cards)

      const scrollDistance = `+=${projectCount * 80}%`
      const segment = 1 / (projectCount - 1)

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: scrollDistance,
          pin,
          scrub: 0.85,
          anticipatePin: 1,
          fastScrollEnd: true,
          invalidateOnRefresh: true,
          snap: {
            snapTo: (progress) => {
              const totalDuration = 1 + segment * 0.55
              const points = Array.from(
                { length: projectCount },
                (_, i) => (segment * i) / totalDuration
              )
              return points.reduce((prev, curr) =>
                Math.abs(curr - progress) < Math.abs(prev - progress) ? curr : prev
              )
            },
            duration: { min: 0.1, max: 0.3 },
            ease: 'power2.inOut',
          },
          onUpdate: (self) => {
            if (!counter) return
            const index = Math.min(
              projectCount - 1,
              Math.round(self.progress * (projectCount - 1)),
            )
            counter.textContent = `${String(index + 1).padStart(2, '0')} / ${String(projectCount).padStart(2, '0')}`
          },
        },
      })

      scrollTl.to(getImage(cards[0]), {
        scale: 1.08,
        y: -20,
        duration: segment * 0.6,
        ease: 'none',
      })

      for (let i = 1; i < projectCount; i += 1) {
        const position = segment * i
        const prevCard = cards[i - 1]
        const nextCard = cards[i]
        const prevImage = getImage(prevCard)
        const nextImage = getImage(nextCard)
        const nextReveal = getRevealItems(nextCard)
        const nextContribution = getContributionItems(nextCard)

        scrollTl
          .to(
            prevCard,
            {
              opacity: 0.5,
              scale: 0.95,
              y: -120,
              rotation: -2,
              duration: segment * 0.35,
              ease: 'power2.in',
            },
            position - segment * 0.25,
          )
          .set(prevCard, { pointerEvents: 'none' }, position)
          .to(
            prevImage,
            { scale: 1, y: 0, duration: segment * 0.25, ease: 'power2.in' },
            position - segment * 0.25,
          )
          .to(
            nextCard,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              rotation: 0,
              zIndex: 20,
              duration: segment * 0.35,
              ease: 'power2.out',
            },
            position - segment * 0.15,
          )
          .set(nextCard, { pointerEvents: 'auto' }, position)
          .to(
            nextReveal,
            {
              opacity: 1,
              y: 0,
              stagger: 0.06,
              duration: segment * 0.25,
              ease: 'power2.out',
            },
            position - segment * 0.1,
          )
          .to(
            nextContribution,
            {
              opacity: 1,
              x: 0,
              stagger: 0.05,
              duration: segment * 0.2,
              ease: 'power2.out',
            },
            position - segment * 0.05,
          )

        applyStackPositions(cards, i, scrollTl, position - segment * 0.1)

        if (nextImage) {
          scrollTl.to(
            nextImage,
            {
              scale: 1.08,
              y: -20,
              duration: segment * 0.55,
              ease: 'none',
            },
            position,
          )
        }
      }
    },
  )

  return () => mm.revert()
}

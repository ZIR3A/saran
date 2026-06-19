import { gsap } from './gsap'

function getElements(card) {
  return {
    bg: card.querySelector('[data-project-bg]'),
    ambient: card.querySelector('[data-project-ambient]'),
    visualWrap: card.querySelector('[data-project-visual-wrap]'),
    visualInner: card.querySelector('[data-project-visual-inner]'),
    content: card.querySelector('[data-project-content]'),
    category: card.querySelector('[data-project-category]'),
    title: card.querySelector('[data-project-title]'),
    desc: card.querySelector('[data-project-description]'),
    contributionWrap: card.querySelector('[data-project-contribution-wrap]'),
    contributionItems: card.querySelectorAll('[data-project-contribution-item]'),
    techWrap: card.querySelector('[data-project-tech-wrap]'),
    cta: card.querySelector('[data-project-cta]'),
  }
}

export function createProjectWorldAnimation({ refs, projectCount }) {
  const { section, pin, stack, cards, counter } = refs

  if (!section || !cards?.length) return () => {}

  const mm = gsap.matchMedia()
  const floatTweens = []

  mm.add(
    {
      isMobile: '(max-width: 767px)',
      isDesktop: '(min-width: 768px)',
      reduceMotion: '(prefers-reduced-motion: reduce)',
    },
    (context) => {
      const { isMobile, reduceMotion } = context.conditions

      // Handle reduced motion configuration
      if (reduceMotion) {
        cards.forEach((card) => {
          const el = getElements(card)
          gsap.set(card, { opacity: 1, pointerEvents: 'auto' })
          gsap.set([el.bg, el.ambient], { opacity: 0.15 })
          gsap.set(el.visualWrap, { opacity: 1, scale: 1 })
          gsap.set([el.category, el.title, el.desc, el.contributionWrap, el.techWrap, el.cta], { opacity: 1, y: 0 })
          gsap.set(el.contributionItems, { opacity: 1, x: 0 })
        })
        return () => {}
      }

      // Initialize float loops for each card image
      cards.forEach((card) => {
        const el = getElements(card)
        if (el.visualInner) {
          const tween = gsap.fromTo(
            el.visualInner,
            { y: -6 },
            {
              y: 6,
              duration: 3.5 + Math.random() * 1.5,
              repeat: -1,
              yoyo: true,
              ease: 'power1.inOut',
              paused: true,
            }
          )
          floatTweens.push(tween)
        } else {
          floatTweens.push(null)
        }
      })

      // ==================== MOBILE LAYOUT ====================
      if (isMobile) {
        // Start all loops on mobile since multiple can be in view/scrolled past
        floatTweens.forEach((t) => t && t.play())

        cards.forEach((card) => {
          const el = getElements(card)

          // 1. Initial State setting
          gsap.set(el.bg, { opacity: 0 })
          gsap.set(el.ambient, { opacity: 0 })
          gsap.set(el.visualWrap, { opacity: 0, scale: 0.92 })
          gsap.set([el.category, el.title, el.desc, el.contributionWrap, el.techWrap, el.cta], { opacity: 0, y: 15 })
          gsap.set(el.contributionItems, { opacity: 0, x: -8 })

          // 2. Staggered reveal timeline
          const revealTl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: 'top 82%',
              toggleActions: 'play none none reverse',
            },
          })

          revealTl
            .to([el.bg, el.ambient], { opacity: 0.2, duration: 0.6, ease: 'power2.out' })
            .to(el.visualWrap, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.1)' }, '-=0.3')
            .to(el.category, { opacity: 1, y: 0, duration: 0.35 }, '-=0.2')
            .to(el.title, { opacity: 1, y: 0, duration: 0.35 }, '-=0.25')
            .to(el.desc, { opacity: 1, y: 0, duration: 0.35 }, '-=0.25')
            .to(el.contributionWrap, { opacity: 1, y: 0, duration: 0.35 }, '-=0.25')
            .to(el.contributionItems, { opacity: 1, x: 0, stagger: 0.04, duration: 0.3 }, '-=0.2')
            .to(el.techWrap, { opacity: 1, y: 0, duration: 0.35 }, '-=0.25')
            .to(el.cta, { opacity: 1, y: 0, duration: 0.35 }, '-=0.25')

          // 3. Parallax scroll effect
          // Layer 1: Background yPercent: -20
          // Layer 2: Project image yPercent: -10
          // Layer 3: Content yPercent: 0 (moves normal)
          gsap.fromTo(
            el.bg,
            { yPercent: 10 },
            {
              yPercent: -20,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            }
          )

          gsap.fromTo(
            el.visualWrap,
            { yPercent: 5 },
            {
              yPercent: -10,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            }
          )
        })

        return () => {}
      }

      // ==================== DESKTOP LAYOUT ====================
      if (!pin || !stack) return () => {}

      // Initialize Desktop initial state
      // First card active initially
      const firstEl = getElements(cards[0])
      gsap.set(cards[0], { zIndex: 20, pointerEvents: 'auto', opacity: 1 })
      gsap.set(firstEl.bg, { opacity: 0.2, yPercent: 0 })
      gsap.set(firstEl.ambient, { opacity: 1 })
      gsap.set(firstEl.visualWrap, { opacity: 1, scale: 1, yPercent: 0 })
      gsap.set([firstEl.category, firstEl.title, firstEl.desc, firstEl.contributionWrap, firstEl.techWrap, firstEl.cta], { opacity: 1, y: 0 })
      gsap.set(firstEl.contributionItems, { opacity: 1, x: 0 })
      if (floatTweens[0]) floatTweens[0].play()

      // Inactive cards hidden initially
      for (let i = 1; i < projectCount; i++) {
        const el = getElements(cards[i])
        gsap.set(cards[i], { zIndex: 10, pointerEvents: 'none', opacity: 0 })
        gsap.set(el.bg, { opacity: 0, yPercent: 20 })
        gsap.set(el.ambient, { opacity: 0 })
        gsap.set(el.visualWrap, { opacity: 0, scale: 0.9, yPercent: 10 })
        gsap.set([el.category, el.title, el.desc, el.contributionWrap, el.techWrap, el.cta], { opacity: 0, y: 15 })
        gsap.set(el.contributionItems, { opacity: 0, x: -8 })
      }

      const scrollDistance = `+=${projectCount * 100}%`
      const segment = 1 / (projectCount - 1)

      // Master scrubbing timeline
      const masterTl = gsap.timeline({
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
              const points = Array.from({ length: projectCount }, (_, idx) => idx * segment)
              return points.reduce((prev, curr) =>
                Math.abs(curr - progress) < Math.abs(prev - progress) ? curr : prev
              )
            },
            duration: { min: 0.1, max: 0.35 },
            ease: 'power2.inOut',
          },
          onUpdate: (self) => {
            if (!counter) return
            const index = Math.min(
              projectCount - 1,
              Math.round(self.progress * (projectCount - 1))
            )
            counter.textContent = `${String(index + 1).padStart(2, '0')} / ${String(projectCount).padStart(2, '0')}`

            // CPU Optimization: Play floating loop for active card, pause others
            floatTweens.forEach((tween, idx) => {
              if (!tween) return
              if (idx === index) {
                if (tween.paused()) tween.play()
              } else {
                if (!tween.paused()) tween.pause()
              }
            })
          },
        },
      })

      // Build sequential scroll timelines for transitions
      for (let i = 1; i < projectCount; i++) {
        const prevCard = cards[i - 1]
        const nextCard = cards[i]
        const prevEl = getElements(prevCard)
        const nextEl = getElements(nextCard)

        const startPos = (i - 1) * segment
        const activeStart = startPos + segment * 0.35
        const transitionDuration = segment * 0.4

        // 1. Exiting previous project (scrub up/fade out)
        masterTl
          .to(prevCard, {
            opacity: 0,
            duration: transitionDuration,
            ease: 'power2.inOut',
          }, startPos)
          .to(prevEl.bg, {
            yPercent: -20, // Layer 1 (slowest)
            opacity: 0,
            duration: transitionDuration,
            ease: 'none',
          }, startPos)
          .to(prevEl.visualWrap, {
            yPercent: -10, // Layer 2 (medium)
            scale: 0.95,
            opacity: 0,
            duration: transitionDuration,
            ease: 'none',
          }, startPos)
          .to(prevEl.content, {
            yPercent: -5, // Layer 3 (normal/minimal)
            opacity: 0,
            duration: transitionDuration,
            ease: 'none',
          }, startPos)
          .set(prevCard, { pointerEvents: 'none' }, activeStart)

        // 2. Entering next project (scrub in/stagger reveal)
        masterTl
          .set(nextCard, { zIndex: 20, pointerEvents: 'auto' }, activeStart)
          .set(prevCard, { zIndex: 10 }, activeStart)
          .to(nextCard, {
            opacity: 1,
            duration: transitionDuration,
            ease: 'power2.out',
          }, activeStart)
          // Ambient & Background reveal
          .to(nextEl.ambient, {
            opacity: 1,
            duration: transitionDuration * 0.8,
            ease: 'power2.out',
          }, activeStart)
          .fromTo(nextEl.bg,
            { yPercent: 20, opacity: 0 },
            {
              yPercent: 0,
              opacity: 0.2,
              duration: transitionDuration * 0.8,
              ease: 'power2.out',
            },
            activeStart
          )
          // Project image (visual) reveal
          .fromTo(nextEl.visualWrap,
            { yPercent: 10, scale: 0.9, opacity: 0 },
            {
              yPercent: 0,
              scale: 1,
              opacity: 1,
              duration: transitionDuration,
              ease: 'power2.out',
            },
            activeStart + transitionDuration * 0.1
          )
          // Staggered content reveal
          .fromTo(nextEl.category,
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: transitionDuration * 0.4, ease: 'power2.out' },
            activeStart + transitionDuration * 0.2
          )
          .fromTo(nextEl.title,
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: transitionDuration * 0.4, ease: 'power2.out' },
            activeStart + transitionDuration * 0.3
          )
          .fromTo(nextEl.desc,
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: transitionDuration * 0.4, ease: 'power2.out' },
            activeStart + transitionDuration * 0.4
          )
          .fromTo(nextEl.contributionWrap,
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: transitionDuration * 0.4, ease: 'power2.out' },
            activeStart + transitionDuration * 0.5
          )
          .fromTo(nextEl.contributionItems,
            { opacity: 0, x: -8 },
            {
              opacity: 1,
              x: 0,
              stagger: transitionDuration * 0.05,
              duration: transitionDuration * 0.3,
              ease: 'power2.out',
            },
            activeStart + transitionDuration * 0.55
          )
          .fromTo(nextEl.techWrap,
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: transitionDuration * 0.4, ease: 'power2.out' },
            activeStart + transitionDuration * 0.75
          )
          .fromTo(nextEl.cta,
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: transitionDuration * 0.4, ease: 'power2.out' },
            activeStart + transitionDuration * 0.85
          )
      }
    }
  )

  return () => {
    mm.revert()
    floatTweens.forEach((t) => t && t.kill())
  }
}

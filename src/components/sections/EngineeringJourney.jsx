import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import SectionShell from '../layout/SectionShell'
import { gsap, ScrollTrigger } from '../animations/gsap'
import { journeyStages } from '../../data/journey'
import JourneyCard from './journey/JourneyCard'
import JourneyProgress from './journey/JourneyProgress'

export default function EngineeringJourney() {
  const sectionRef = useRef(null)
  const pinRef = useRef(null)
  const progressRef = useRef(null)

  useGSAP(() => {
    const pin = pinRef.current
    if (!pin) return

    const mm = gsap.matchMedia()

    mm.add('(min-width: 0px)', () => {
      const stages = gsap.utils.toArray('[data-journey-stage]', pin)
      const progressLabels = gsap.utils.toArray('[data-progress-label]', progressRef.current)
      
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduceMotion) {
        gsap.set(stages, { opacity: 1, y: 0, visibility: 'visible' })
        return
      }

      const progressFills = gsap.utils.toArray('[data-progress-fill]', progressRef.current)

      gsap.set(stages, { opacity: 0, y: 24, visibility: 'hidden' })
      if (progressLabels.length) {
        gsap.set(progressLabels, { opacity: 0.35, transformOrigin: 'center center' })
      }
      if (progressFills.length) {
        gsap.set(progressFills, { scaleX: 0, transformOrigin: 'left center' })
      }

      const playTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: pin,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        }
      })

      playTimeline.to(stages, {
        opacity: 1,
        y: 0,
        visibility: 'visible',
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
      })

      // Bind progress bar to individual card scroll positions
      stages.forEach((stage, i) => {
        ScrollTrigger.create({
          trigger: stage,
          start: 'top 55%',
          end: 'bottom 55%',
          onToggle: (self) => {
            if (progressLabels[i]) {
              gsap.to(progressLabels[i], {
                opacity: self.isActive ? 1 : 0.35,
                scale: self.isActive ? 1.05 : 1,
                duration: 0.3,
                ease: 'power2.out',
              })
            }
          },
          onEnter: () => {
            if (progressFills[i]) {
              gsap.to(progressFills[i], { scaleX: 1, duration: 0.4, ease: 'power2.out' })
            }
          },
          onLeaveBack: () => {
            if (progressFills[i]) {
              gsap.to(progressFills[i], { scaleX: 0, duration: 0.4, ease: 'power2.inOut' })
            }
          },
        })
      })
    })

    return () => mm.revert()
  }, { scope: sectionRef })

  return (
    <SectionShell id="engineering-journey" fluid className="min-h-0! p-0!">
      <div ref={sectionRef} className="relative">
        <div
          ref={pinRef}
          className="flex min-h-svh flex-col gap-10 px-6 py-16 md:grid md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-start md:gap-16 md:px-10 md:py-20 lg:px-16"
        >
          <aside className="flex flex-col md:sticky md:top-32 md:py-4">
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-secondary">
              Career Evolution
            </p>
            <h2 className="mt-4 text-[clamp(2rem,5vw,3.5rem)] font-bold uppercase leading-[0.95] tracking-[0.06em] text-primary">
              The Journey
            </h2>
            <p className="mt-4 max-w-sm text-[clamp(0.85rem,1.8vw,1rem)] leading-relaxed text-secondary">
              A progression from learning web fundamentals to building production-ready platforms, interactive experiences, and modern digital ecosystems.
            </p>
            <JourneyProgress progressRef={progressRef} />
          </aside>

          <div className="flex flex-col gap-6 md:gap-10 flex-1 md:py-20">
            {journeyStages.map((stage, index) => (
              <JourneyCard
                key={stage.id}
                index={index}
                stage={stage.stage}
                year={stage.year}
                title={stage.title}
                description={stage.description}
              />
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  )
}

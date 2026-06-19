import { useRef } from 'react'
import SectionShell from '../layout/SectionShell'
import { gsap, useGSAP } from '../animations/gsap'
import { createJourneyAnimation } from '../animations/journeyAnimation'
import { journeyStages } from '../../data/journey'
import JourneyCard from './journey/JourneyCard'
import JourneyProgress from './journey/JourneyProgress'

export default function EngineeringJourney() {
  const sectionRef = useRef(null)
  const pinRef = useRef(null)
  const progressRef = useRef(null)

  useGSAP(
    () =>
      createJourneyAnimation({
        stageCount: journeyStages.length,
        refs: {
          section: sectionRef.current,
          pin: pinRef.current,
          stages: gsap.utils.toArray(
            '[data-journey-stage]',
            pinRef.current,
          ),
          progressFills: gsap.utils.toArray(
            '[data-progress-fill]',
            progressRef.current,
          ),
          progressLabels: gsap.utils.toArray(
            '[data-progress-label]',
            progressRef.current,
          ),
        },
      }),
    { scope: sectionRef },
  )

  return (
    <SectionShell id="engineering-journey" fluid className="min-h-0! p-0!">
      <div ref={sectionRef} className="relative">
        <div
          ref={pinRef}
          className="flex min-h-svh flex-col gap-10 px-6 py-16 md:grid md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-center md:gap-16 md:px-10 md:py-20 lg:px-16"
        >
          <aside className="flex flex-col justify-center md:sticky md:top-0 md:h-svh md:py-20">
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-secondary">
              Career Evolution
            </p>
            <h2 className="mt-4 text-[clamp(2rem,5vw,3.5rem)] font-bold uppercase leading-[0.95] tracking-[0.06em] text-primary">
              The Journey
            </h2>
            <JourneyProgress progressRef={progressRef} />
          </aside>

          <div className="relative min-h-[22rem] flex-1 md:min-h-[28rem] lg:min-h-[32rem]">
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

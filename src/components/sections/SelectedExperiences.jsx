import { useRef } from 'react'
import SectionShell from '../layout/SectionShell'
import { gsap, useGSAP } from '../animations/gsap'
import { createExperienceAnimation } from '../animations/experienceAnimation'
import { experiences } from '../../data/experiences'
import ExperienceCard from './experiences/ExperienceCard'

export default function SelectedExperiences() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const cardRefs = useRef([])

  useGSAP(
    () =>
      createExperienceAnimation({
        refs: {
          section: sectionRef.current,
          header: headerRef.current,
          cards: cardRefs.current.filter(Boolean),
        },
      }),
    { scope: sectionRef },
  )

  return (
    <SectionShell id="selected-experiences">
      <div ref={sectionRef} className="space-y-12 md:space-y-20">
        <header ref={headerRef} className="max-w-2xl">
          <h2 className="text-[clamp(1.75rem,4.5vw,3rem)] font-bold uppercase tracking-[0.08em] text-primary">
            Selected Experiences
          </h2>
          <p className="mt-4 text-[clamp(0.9rem,2vw,1.05rem)] leading-relaxed text-secondary">
            A collection of systems and digital products I helped design and
            build.
          </p>
        </header>

        <div className="space-y-10 md:space-y-16">
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={experience.id}
              experience={experience}
              cardRef={(element) => {
                cardRefs.current[index] = element
              }}
            />
          ))}
        </div>
      </div>
    </SectionShell>
  )
}

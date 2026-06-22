import { useRef } from 'react'
import SectionShell from '../layout/SectionShell'
import { gsap, useGSAP } from '../animations/gsap'
import { createProjectWorldAnimation } from '../animations/projectWorldAnimation'
import { projects } from '../../data/projects'
import ProjectCard from './projects/ProjectCard'

export default function Projects() {
  const sectionRef = useRef(null)
  const pinRef = useRef(null)
  const stackRef = useRef(null)
  const counterRef = useRef(null)
  const cardRefs = useRef([])

  useGSAP(
    () =>
      createProjectWorldAnimation({
        projectCount: projects.length,
        refs: {
          section: sectionRef.current,
          pin: pinRef.current,
          stack: stackRef.current,
          cards: cardRefs.current.filter(Boolean),
          counter: counterRef.current,
        },
      }),
    { scope: sectionRef },
  )

  return (
    <SectionShell id="projects">
      <div ref={sectionRef}>
        <div className="md:grid md:grid-cols-[0.9fr_1.1fr] md:gap-16 lg:gap-20">
          <aside className="mb-10 md:sticky md:top-0 md:flex md:h-svh md:flex-col md:justify-center md:py-16">
            <h2 className="text-[clamp(1.75rem,4.5vw,3rem)] font-bold uppercase tracking-[0.08em] text-primary">
              Project Worlds
            </h2>
            <p className="mt-4 max-w-sm text-[clamp(0.9rem,2vw,1.05rem)] leading-relaxed text-secondary">
              A curated collection of products, platforms, and experimental builds showcasing problem-solving, engineering execution, and user-centered design.
            </p>
            <p
              ref={counterRef}
              className="mt-8 hidden font-mono text-sm tracking-[0.25em] text-accent md:block"
            >
              01 / 07
            </p>
          </aside>

          <div ref={pinRef} className="relative md:flex md:h-svh md:flex-col md:justify-center">
            <div ref={stackRef} className="relative md:h-[75vh] w-full">
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  cardRef={(element) => {
                    cardRefs.current[index] = element
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  )
}

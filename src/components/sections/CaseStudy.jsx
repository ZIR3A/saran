import { useRef } from 'react'
import SectionShell from '../layout/SectionShell'
import { gsap, useGSAP } from '../animations/gsap'
import { createCaseStudyAnimation } from '../animations/caseStudyAnimation'
import CaseStudyPanels, {
  caseStudyPhases,
} from './caseStudy/CaseStudyPanels'

export default function CaseStudy() {
  const sectionRef = useRef(null)
  const pinRef = useRef(null)
  const progressRef = useRef(null)
  const panelRefs = useRef([])

  useGSAP(
    () =>
      createCaseStudyAnimation({
        phaseCount: caseStudyPhases.length,
        refs: {
          section: sectionRef.current,
          pin: sectionRef.current,
          phases: panelRefs.current.filter(Boolean),
          progressFills: gsap.utils.toArray(
            '[data-case-progress]',
            progressRef.current,
          ),
        },
      }),
    { scope: sectionRef },
  )

  return (
    <SectionShell id="case-study">
      <div ref={sectionRef}>
        <div ref={pinRef} className="md:grid md:grid-cols-2 md:gap-16 lg:gap-20">
          <aside className="mb-10 md:mb-0 md:flex md:h-svh md:flex-col md:justify-center md:py-20">
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-accent">
              Streaming / Content Platform
            </p>
            <h2 className="mt-4 text-[clamp(1.75rem,4.5vw,3rem)] font-bold uppercase tracking-[0.08em] text-primary">
              Case Study
            </h2>
            <p className="mt-4 max-w-sm text-[clamp(0.9rem,2vw,1.05rem)] leading-relaxed text-secondary">
              Building digital content experiences.
            </p>

            <div ref={progressRef} className="mt-8 hidden gap-2 md:flex">
              {caseStudyPhases.map((phase) => (
                <div
                  key={phase.id}
                  className="h-px flex-1 overflow-hidden rounded-full bg-primary/10"
                >
                  <div
                    data-case-progress
                    className="h-full w-full origin-left scale-x-0 bg-accent"
                  />
                </div>
              ))}
            </div>
          </aside>

          <div className="relative space-y-6 md:min-h-[28rem] md:space-y-0 lg:min-h-[32rem]">
            <CaseStudyPanels panelRefs={panelRefs} />
          </div>
        </div>
      </div>
    </SectionShell>
  )
}

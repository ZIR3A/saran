import { useRef } from 'react'
import SectionShell from '../layout/SectionShell'
import { gsap, useGSAP } from '../animations/gsap'
import { createHighlightAnimation } from '../animations/highlightAnimation'
import { highlights } from '../../data/highlights'
import HighlightCard from './highlights/HighlightCard'

export default function EngineeringHighlights() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const cardRefs = useRef([])

  useGSAP(
    () =>
      createHighlightAnimation({
        refs: {
          section: sectionRef.current,
          header: headerRef.current,
          cards: cardRefs.current.filter(Boolean),
        },
      }),
    { scope: sectionRef },
  )

  return (
    <SectionShell id="engineering-highlights">
      <div ref={sectionRef} className="space-y-10 md:space-y-14">
        <header ref={headerRef} className="max-w-2xl">
          <h2 className="text-[clamp(1.75rem,4.5vw,3rem)] font-bold uppercase tracking-[0.08em] text-primary">
            Engineering Highlights
          </h2>
          <p className="mt-4 text-[clamp(0.9rem,2vw,1.05rem)] leading-relaxed text-secondary">
            The principles and practices behind the systems I build.
          </p>
        </header>

        <div className="grid gap-5 sm:grid-cols-2 lg:gap-6">
          {highlights.map((highlight, index) => (
            <HighlightCard
              key={highlight.id}
              highlight={highlight}
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

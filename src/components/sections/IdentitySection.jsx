import { useRef } from 'react'
import SectionShell from '../layout/SectionShell'
import { gsap, useGSAP } from '../animations/gsap'
import { createIdentityAnimation } from '../animations/identityAnimation'

const STATEMENT_LINES = [
  { words: ['I', "don't", 'just', 'build'], accent: false },
  { words: ['interfaces.'], accent: false },
  { words: ['I', 'build'], accent: false },
  { words: ['digital', 'systems.'], accent: true },
]

export default function IdentitySection({ behind = false }) {
  const sectionRef = useRef(null)
  const supportRef = useRef(null)

  useGSAP(
    () => {
      if (behind) return undefined

      return createIdentityAnimation({
        refs: {
          section: sectionRef.current,
          words: gsap.utils.toArray('[data-word]', sectionRef.current),
          support: supportRef.current,
          ambient: null,
          particles: [],
          gridLines: [],
        },
      })
    },
    { scope: sectionRef, dependencies: [behind] },
  )

  const content = (
    <div
      ref={sectionRef}
      data-identity-content
      className="relative flex h-full min-h-svh items-center overflow-hidden bg-background"
    >
      <div className="container-cinematic relative z-10 px-6 py-20 md:py-28">
        <div className="max-w-4xl">
          <div className="space-y-2 md:space-y-3" data-identity-headline>
            {STATEMENT_LINES.map((line) => (
              <p
                key={line.words.join('-')}
                className={[
                  'text-[clamp(1.75rem,5.5vw,3.75rem)] font-semibold leading-[1.1] tracking-tight',
                  line.accent ? 'text-accent text-accent-glow' : 'text-primary',
                ].join(' ')}
              >
                {line.words.map((word) => (
                  <span
                    key={word}
                    data-word
                    className="mr-[0.3em] inline-block"
                  >
                    {word}
                  </span>
                ))}
              </p>
            ))}
          </div>

          <p
            ref={supportRef}
            data-identity-support
            className="mt-10 max-w-xl text-[clamp(0.9rem,2vw,1.1rem)] leading-relaxed text-secondary md:mt-14"
          >
            Frontend Engineer creating scalable digital experiences with modern
            web technologies.
          </p>
        </div>
      </div>
    </div>
  )

  if (behind) {
    return (
      <section id="identity" data-section="identity" className="relative h-full w-full">
        <div
          data-identity-ambient
          className="identity-scene-ambient pointer-events-none absolute inset-0 opacity-0"
          aria-hidden="true"
        />
        <div
          data-identity-atmosphere
          className="identity-scene-atmosphere pointer-events-none absolute inset-0 opacity-0"
          aria-hidden="true"
        />
        <div data-identity-scene className="relative h-full w-full">
          {content}
        </div>
      </section>
    )
  }

  return (
    <SectionShell id="identity" fullHeight fluid className="min-h-0! p-0!">
      {content}
    </SectionShell>
  )
}

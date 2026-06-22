import { useRef } from 'react'
import SectionShell from '../layout/SectionShell'
import { gsap, useGSAP } from '../animations/gsap'
import { createContactAnimation } from '../animations/contactAnimation'
import SocialActions from '../ui/SocialActions'

const TITLE_WORDS = ["Let's", 'Build', 'Something', 'Meaningful']

export default function Contact() {
  const sectionRef = useRef(null)
  const supportRef = useRef(null)
  const actionsRef = useRef(null)

  useGSAP(
    () =>
      createContactAnimation({
        refs: {
          section: sectionRef.current,
          titleWords: gsap.utils.toArray('[data-contact-word]', sectionRef.current),
          support: supportRef.current,
          buttons: gsap.utils.toArray('[data-social-action]', actionsRef.current),
        },
      }),
    { scope: sectionRef },
  )

  return (
    <SectionShell id="contact" fullHeight fluid className="min-h-0! p-0!">
      <div
        ref={sectionRef}
        className="relative flex min-h-svh items-center justify-center bg-background px-6 py-20"
      >
        <div className="relative z-10 mx-auto w-full max-w-3xl text-center">
          <h2 className="text-[clamp(1.75rem,5.5vw,3.5rem)] font-bold uppercase leading-[1.05] tracking-[0.04em] text-primary">
            {TITLE_WORDS.map((word) => (
              <span
                key={word}
                data-contact-word
                className="mr-[0.2em] inline-block"
              >
                {word}
              </span>
            ))}
          </h2>

          <p
            ref={supportRef}
            className="mx-auto mt-6 max-w-xl text-[clamp(0.9rem,2vw,1.1rem)] leading-relaxed text-secondary md:mt-8"
          >
            Whether you're launching a product, improving an existing platform, or exploring innovative ideas, I'm always open to discussing the next challenge.
          </p>

          <div ref={actionsRef}>
            <SocialActions
              animate
              className="mt-10 md:mt-12"
              resumeLabel="Resume"
            />
          </div>

          <p className="mt-16 font-mono text-[0.6rem] uppercase tracking-[0.35em] text-secondary/60">
            Saran Baral · Product Engineer · 2026
          </p>
        </div>
      </div>
    </SectionShell>
  )
}

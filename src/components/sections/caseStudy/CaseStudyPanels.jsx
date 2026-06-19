import { caseStudyPhases } from '../../../data/caseStudy'

function CaseStudyPanel({ phase, panelRef }) {
  const { stage, label, content, items, groups } = phase

  return (
    <article
      ref={panelRef}
      data-case-phase
      className="glass-card flex flex-col justify-center p-6 md:absolute md:inset-0 md:p-10"
    >
      <div className="mb-5 flex items-baseline gap-4">
        <span className="font-mono text-xs tracking-[0.3em] text-accent">
          {stage}
        </span>
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-secondary">
          {label}
        </span>
      </div>

      {content && (
        <p className="text-[clamp(1rem,2.2vw,1.25rem)] leading-relaxed text-primary">
          {content}
        </p>
      )}

      {items && (
        <ul className="space-y-3">
          {items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-sm leading-relaxed text-secondary md:text-base"
            >
              <span className="mt-1 text-accent" aria-hidden="true">
                →
              </span>
              {item}
            </li>
          ))}
        </ul>
      )}

      {groups && (
        <dl className="grid gap-4 sm:grid-cols-2">
          {groups.map((group) => (
            <div
              key={group.label}
              className="rounded-lg border border-theme bg-surface/30 p-4"
            >
              <dt className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-accent">
                {group.label}
              </dt>
              <dd className="mt-2 text-sm text-primary">{group.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </article>
  )
}

export default function CaseStudyPanels({ panelRefs }) {
  return (
    <>
      {caseStudyPhases.map((phase, index) => (
        <CaseStudyPanel
          key={phase.id}
          phase={phase}
          panelRef={(element) => {
            panelRefs.current[index] = element
          }}
        />
      ))}
    </>
  )
}

export { caseStudyPhases }

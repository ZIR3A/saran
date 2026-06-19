export default function JourneyCard({ stage, year, title, description, index }) {
  return (
    <article
      data-journey-stage
      data-stage-index={index}
      className="glass-card absolute inset-0 flex transform-gpu flex-col justify-center p-6 will-change-[transform,opacity] md:p-10"
      style={{ zIndex: index }}
    >
      <div className="mb-6 flex items-baseline gap-4">
        <span className="font-mono text-xs tracking-[0.3em] text-accent">
          {stage}
        </span>
        {year && (
          <span className="font-mono text-xs tracking-[0.2em] text-secondary">
            {year}
          </span>
        )}
      </div>

      <h3 className="mb-6 text-[clamp(1.5rem,4vw,2.25rem)] font-bold uppercase tracking-[0.08em] text-primary">
        {title}
      </h3>

      <div className="space-y-1 text-[clamp(0.9rem,2vw,1.05rem)] leading-relaxed text-secondary">
        {description.map((line, lineIndex) =>
          line ? (
            <p key={`${title}-${line}`}>{line}</p>
          ) : (
            <div
              key={`${title}-spacer-${lineIndex}`}
              className="h-2"
              aria-hidden="true"
            />
          ),
        )}
      </div>
    </article>
  )
}

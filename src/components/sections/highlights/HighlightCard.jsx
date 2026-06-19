export default function HighlightCard({ highlight, cardRef }) {
  const { title, description, tags } = highlight

  return (
    <article
      ref={cardRef}
      data-highlight-card
      className="glass-card flex flex-col p-6 md:p-8"
    >
      <h3 className="text-lg font-bold tracking-tight text-primary md:text-xl">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-secondary md:text-[0.95rem]">
        {description}
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-theme bg-surface/40 px-3 py-1 font-mono text-[0.55rem] uppercase tracking-wider text-secondary"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  )
}

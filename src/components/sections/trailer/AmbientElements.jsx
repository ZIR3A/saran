const CORNER_META = [
  { label: 'Portfolio', position: 'tl' },
  { label: '2026', position: 'tr' },
]

const STACK = ['React', 'Next.js', 'TypeScript', 'Systems']

export default function AmbientElements({ ambientRef }) {
  return (
    <div
      ref={ambientRef}
      className="pointer-events-none absolute inset-0 z-10"
      aria-hidden="true"
    >
      {CORNER_META.map((item) => (
        <span
          key={item.label}
          className={[
            'trailer-meta-corner absolute font-mono text-[0.58rem] uppercase tracking-[0.32em] text-trailer-muted',
            item.position === 'tl' ? 'left-6 top-6 md:left-10 md:top-10' : '',
            item.position === 'tr' ? 'right-6 top-6 md:right-10 md:top-10' : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {item.label}
        </span>
      ))}

      <div className="trailer-stack-rail absolute bottom-20 left-1/2 hidden -translate-x-1/2 items-center gap-3 md:flex">
        {STACK.map((item, index) => (
          <span key={item} className="flex items-center gap-3">
            {index > 0 && (
              <span className="h-px w-6 bg-trailer-border" aria-hidden="true" />
            )}
            <span className="font-mono text-[0.58rem] uppercase tracking-[0.28em] text-trailer-muted">
              {item}
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}

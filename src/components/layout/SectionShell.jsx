export default function SectionShell({
  id,
  children,
  className = '',
  fullHeight = false,
  compact = false,
  fluid = false,
}) {
  const paddingClass = compact ? 'section-padding-sm' : 'section-padding'

  return (
    <section
      id={id}
      data-section={id}
      className={[
        'relative w-full bg-background',
        fluid ? '' : paddingClass,
        fullHeight ? 'min-h-screen flex flex-col justify-center' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {fluid ? children : <div className="container-cinematic">{children}</div>}
    </section>
  )
}

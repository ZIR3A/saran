import ExperienceImage from './ExperienceImage'

export default function ExperienceCard({ experience, cardRef }) {
  const { title, category, role, description, stack, image } = experience

  return (
    <article
      ref={cardRef}
      data-experience-card
      className="group flex flex-col overflow-hidden border border-theme bg-surface transition-[border-color] duration-500 md:flex-row md:hover:border-accent/25"
    >
      <div className="relative overflow-hidden md:w-[70%] md:shrink-0">
        <ExperienceImage title={title} stack={stack} image={image} />
      </div>

      <div
        data-experience-content
        className="flex flex-col justify-center p-6 md:w-[30%] md:p-8 lg:p-10"
      >
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-accent">
          {category}
        </p>

        <h3 className="mt-3 text-[clamp(1.25rem,3vw,1.75rem)] font-bold leading-tight tracking-tight text-primary">
          {title}
        </h3>

        <ul className="mt-4 space-y-1">
          {role.map((item) => (
            <li
              key={item}
              className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-secondary"
            >
              {item}
            </li>
          ))}
        </ul>

        <p className="mt-5 text-sm leading-relaxed text-secondary md:text-[0.95rem]">
          {description}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {stack.map((tech, index) => (
            <span
              key={tech}
              data-stack-item
              className={[
                'rounded-full border border-theme bg-surface/50 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-wider text-secondary transition-all duration-500',
                'opacity-70 md:translate-y-1 md:opacity-0',
                'md:group-hover:translate-y-0 md:group-hover:opacity-100',
              ].join(' ')}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}

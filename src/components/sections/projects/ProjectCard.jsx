import ProjectImage from './ProjectImage'

export default function ProjectCard({ project, cardRef, index }) {
  const { id, title, category, description, technologies, contribution, image, url } = project

  // Map project ID to customized ambient glow colors
  const getGlowColor = (projectId) => {
    switch (projectId) {
      case 'lms':
        return 'rgba(59, 130, 246, 0.12)' // soft blue
      case 'eyewear':
        return 'rgba(6, 182, 212, 0.12)' // soft cyan
      case 'portfolio':
        return 'rgba(234, 179, 8, 0.12)' // warm yellow
      case 'ecommerce':
        return 'rgba(147, 51, 234, 0.12)' // soft purple
      case 'dashboard':
        return 'rgba(34, 197, 94, 0.12)' // soft green
      case 'oneplus':
        return 'rgba(239, 68, 68, 0.12)' // soft red
      case 'interior':
        return 'rgba(249, 115, 22, 0.12)' // soft orange
      default:
        return 'rgba(59, 130, 246, 0.12)'
    }
  }

  return (
    <article
      ref={cardRef}
      data-project-world
      data-project-index={index}
      className="relative mb-16 flex flex-col overflow-hidden will-change-transform md:absolute md:inset-0 md:mb-0 md:h-full md:w-full bg-transparent"
    >
      {/* 1. Ambient Layer */}
      <div
        data-project-ambient
        className="absolute inset-0 pointer-events-none z-0 opacity-0 transition-opacity duration-700"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${getGlowColor(id)} 0%, transparent 70%)`,
        }}
      />

      {/* 2. Background Layer */}
      <div
        data-project-bg
        className="absolute inset-0 z-10 overflow-hidden pointer-events-none opacity-0 blur-2xl scale-110 will-change-transform"
      >
        <img
          src={image}
          alt=""
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>

      {/* 3. Project Visual Layer */}
      <div
        data-project-visual-wrap
        className="relative z-20 w-full h-[220px] md:h-[45%] overflow-hidden rounded-xl bg-surface/30 will-change-transform opacity-0 scale-95"
      >
        <div
          data-project-visual-inner
          className="w-full h-full will-change-transform"
        >
          <ProjectImage
            title={title}
            category={category}
            technologies={technologies}
            image={image}
          />
        </div>
      </div>

      {/* 4. Content Layer */}
      <div
        data-project-content
        className="relative z-30 flex flex-1 flex-col justify-start pt-6 pb-2 px-1 md:px-2 md:pt-8"
      >
        <p
          data-project-category
          className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-accent opacity-0"
        >
          {category}
        </p>

        <h3
          data-project-title
          className="mt-2 text-[clamp(1.3rem,2.5vw,1.8rem)] font-bold leading-tight tracking-tight text-primary opacity-0"
        >
          {title}
        </h3>

        <p
          data-project-description
          className="mt-3 text-sm leading-relaxed text-secondary md:text-[0.95rem] opacity-0"
        >
          {description}
        </p>

        {/* Contribution Section */}
        <div
          data-project-contribution-wrap
          className="mt-4 border-t border-theme/40 pt-4 opacity-0"
        >
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-accent">
            My Contribution
          </p>
          <ul className="mt-2 space-y-1.5">
            {contribution.map((item) => (
              <li
                key={item}
                data-project-contribution-item
                className="flex items-center gap-1.5 text-xs text-primary"
              >
                <span className="text-accent text-[10px]" aria-hidden="true">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Stack Section */}
        <div
          data-project-tech-wrap
          className="mt-4 opacity-0"
        >
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-secondary">
            Built With
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-theme/50 bg-surface/20 px-2.5 py-0.5 font-mono text-[0.55rem] uppercase tracking-wider text-secondary"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div
          data-project-cta
          className="mt-5 opacity-0"
        >
          <a
            href={url || '#contact'}
            target={url ? '_blank' : undefined}
            rel={url ? 'noopener noreferrer' : undefined}
            className="glass-button text-[0.6rem] px-5 py-2 font-mono uppercase tracking-[0.2em] border border-theme/60 text-primary hover:border-accent hover:text-accent transition-colors duration-300"
          >
            Explore Live
          </a>
        </div>
      </div>
    </article>
  )
}

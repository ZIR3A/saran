import { socialActions } from '../../data/social'

export default function SocialActions({
  className = '',
  animate = false,
  resumeLabel = 'Download Resume',
}) {
  return (
    <div
      className={[
        'flex flex-wrap items-center justify-center gap-3 md:gap-4',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {socialActions.map((link) => (
        <a
          key={link.id}
          href={link.href}
          className={
            link.id === 'resume'
              ? 'glass-button will-change-transform !pointer-events-auto relative z-[9999]'
              : 'glass-button will-change-transform !pointer-events-auto relative z-[9999]'
          }
          {...(animate ? { 'data-social-action': true } : {})}
          {...(link.external
            ? { target: '_blank', rel: 'noopener noreferrer' }
            : {})}
          {...(link.download ? { download: true } : {})}
        >
          {link.id === 'resume' ? resumeLabel : link.label}
        </a>
      ))}
    </div>
  )
}

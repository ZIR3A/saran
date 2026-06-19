import { useEffect, useRef, useState } from 'react'
import { getLenis } from '../../animations/smoothScroll'

export default function TrailerScrollIndicator() {
  const rootRef = useRef(null)
  const [hidden, setHidden] = useState(false)
  const [mounted, setMounted] = useState(true)

  useEffect(() => {
    const evaluate = () => {
      const lenisScroll = getLenis()?.scroll ?? 0
      const scrollY = Math.max(window.scrollY || 0, lenisScroll)
      if (scrollY > 12) setHidden(true)
    }

    evaluate()

    const lenis = getLenis()
    lenis?.on('scroll', evaluate)
    window.addEventListener('scroll', evaluate, { passive: true })

    return () => {
      lenis?.off('scroll', evaluate)
      window.removeEventListener('scroll', evaluate)
    }
  }, [])

  useEffect(() => {
    if (!hidden) return undefined
    const timeout = setTimeout(() => setMounted(false), 600)
    return () => clearTimeout(timeout)
  }, [hidden])

  if (!mounted) return null

  return (
    <div
      ref={rootRef}
      data-trailer-scroll-hint
      className={[
        'pointer-events-none absolute bottom-9 left-1/2 z-40 flex -translate-x-1/2 flex-col items-center gap-3',
        'transition-opacity duration-500 ease-out',
        hidden ? 'opacity-0' : 'opacity-70',
      ].join(' ')}
      aria-hidden="true"
    >
      <span className="trailer-scroll-line relative flex h-11 w-px items-start justify-center overflow-hidden bg-trailer-border">
        <span className="trailer-scroll-dot absolute top-0 block h-2 w-px bg-trailer-accent" />
      </span>
      <span className="font-mono text-[0.58rem] uppercase tracking-[0.38em] text-trailer-muted">
        Explore
      </span>
    </div>
  )
}

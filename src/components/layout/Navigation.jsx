import { useEffect, useState, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '../animations/gsap'
import { navItems } from '../../data/navigation'
import { scrollToTarget, setSmoothScrollPaused } from '../animations/smoothScroll'
import { useActiveSection } from '../../hooks/useActiveSection'

function NavItemButton({ item, isActive, onNavigate }) {
  return (
    <button
      type="button"
      onClick={() => onNavigate(item)}
      className="group relative rounded-full px-3.5 py-2 md:px-4"
      aria-current={isActive ? 'page' : undefined}
    >
      <span
        className={[
          'absolute inset-0 rounded-full transition-all duration-500 ease-out',
          isActive
            ? 'scale-100 bg-accent/14 opacity-100'
            : 'scale-95 bg-transparent opacity-0 group-hover:scale-100 group-hover:bg-surface/80 group-hover:opacity-100',
        ].join(' ')}
        aria-hidden="true"
      />
      <span
        className={[
          'relative font-mono text-[0.62rem] uppercase tracking-[0.22em] transition-all duration-400',
          isActive
            ? 'scale-[1.02] text-accent'
            : 'text-secondary group-hover:text-primary',
        ].join(' ')}
      >
        {item.label}
      </span>
    </button>
  )
}

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { navActiveId, navVisible } = useActiveSection()
  const headerRef = useRef(null)

  useGSAP(() => {
    if (!headerRef.current) return

    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        if (menuOpen) return
        
        if (self.direction === 1 && self.delta > 2) {
          // Scroll down - hide
          gsap.to(headerRef.current, { yPercent: -100, duration: 0.3, ease: 'power2.out' })
        } else if (self.direction === -1 && self.delta < -10) {
          // Scroll up - reveal
          gsap.to(headerRef.current, { yPercent: 0, duration: 0.3, ease: 'power2.out' })
        }
      }
    })

    return () => st.kill()
  }, [menuOpen])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    setSmoothScrollPaused(menuOpen)
    return () => {
      document.body.style.overflow = ''
      setSmoothScrollPaused(false)
    }
  }, [menuOpen])

  const handleNavClick = (item) => {
    setMenuOpen(false)

    if (item.type === 'link') {
      window.open(item.href, item.external ? '_blank' : '_self', 'noopener,noreferrer')
      return
    }

    const target = document.getElementById(item.id)
    if (target) {
      scrollToTarget(target, { offset: -88 })
    }
  }

  const handleLogoClick = () => {
    setMenuOpen(false)
    const identity = document.getElementById('identity')
    const trailer = document.getElementById('trailer')
    if (identity) {
      scrollToTarget(identity, { offset: -88 })
    } else if (trailer) {
      scrollToTarget(trailer, { offset: 0 })
    }
  }

  const isActive = (item) => item.type === 'section' && navActiveId === item.id

  return (
    <>
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/95 md:hidden"
          aria-hidden="true"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <header
        ref={headerRef}
        className={[
          'fixed inset-x-0 top-0 z-50 transition-opacity duration-700 ease-out',
          navVisible
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0',
        ].join(' ')}
      >
        <div className="flex items-center justify-between px-4 py-4 md:px-8 md:py-5">
          <button
            type="button"
            onClick={handleLogoClick}
            className="group flex items-center gap-2.5 rounded-full border border-transparent py-1 pr-2 transition-colors hover:border-theme"
            aria-label="Scroll to identity"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-theme bg-surface font-mono text-[0.62rem] tracking-[0.15em] text-primary transition-colors group-hover:border-accent/40 group-hover:text-accent">
              SB
            </span>
            <span className="hidden font-mono text-[0.62rem] uppercase tracking-[0.28em] text-secondary transition-colors group-hover:text-primary sm:inline">
              Saran Baral
            </span>
          </button>

          <nav aria-label="Main navigation" className="relative flex items-center">
            <ul className="hidden items-center gap-0.5 rounded-full border border-theme bg-surface/90 p-1 backdrop-blur-sm md:flex">
              {navItems.map((item) => (
                <li key={item.label}>
                  {item.type === 'link' ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={
                        item.variant === 'outline'
                          ? 'block rounded-full border border-theme/60 px-3.5 py-2 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-primary transition-colors duration-300 hover:border-accent hover:text-accent md:px-4 !pointer-events-auto relative z-[9999]'
                          : 'block rounded-full px-3.5 py-2 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-secondary transition-colors duration-300 hover:text-accent md:px-4'
                      }
                    >
                      {item.label}
                    </a>
                  ) : (
                    <NavItemButton
                      item={item}
                      isActive={isActive(item)}
                      onNavigate={handleNavClick}
                    />
                  )}
                </li>
              ))}
            </ul>

            <button
              type="button"
              className="relative ml-2 flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-theme bg-surface/90 backdrop-blur-sm md:hidden"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span
                className={[
                  'h-px w-5 bg-primary transition-transform duration-300',
                  menuOpen ? 'translate-y-[5px] rotate-45' : '',
                ].join(' ')}
              />
              <span
                className={[
                  'h-px w-5 bg-primary transition-opacity duration-300',
                  menuOpen ? 'opacity-0' : '',
                ].join(' ')}
              />
              <span
                className={[
                  'h-px w-5 bg-primary transition-transform duration-300',
                  menuOpen ? '-translate-y-[5px] -rotate-45' : '',
                ].join(' ')}
              />
            </button>
          </nav>
        </div>

        {menuOpen && (
          <ul className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-7 md:hidden">
            {navItems.map((item) => (
              <li key={item.label}>
                {item.type === 'link' ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={
                      item.variant === 'outline'
                        ? 'rounded-full border border-theme/60 px-6 py-3 font-mono text-sm uppercase tracking-[0.3em] text-primary transition-colors hover:border-accent hover:text-accent !pointer-events-auto relative z-[9999]'
                        : 'font-mono text-sm uppercase tracking-[0.3em] text-primary'
                    }
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleNavClick(item)}
                    className={[
                      'relative font-mono text-sm uppercase tracking-[0.3em] transition-all duration-400',
                      isActive(item) ? 'scale-105 text-accent' : 'text-primary',
                    ].join(' ')}
                  >
                    {isActive(item) && (
                      <span className="absolute -inset-x-4 -inset-y-2 rounded-full bg-accent/10" aria-hidden="true" />
                    )}
                    <span className="relative">{item.label}</span>
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </header>
    </>
  )
}

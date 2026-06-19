import { gsap } from './gsap'
import { trailerTheme } from '../../constants/trailerTheme'
import { refreshScroll } from './scroll'

/**
 * Cinematic trailer → identity reveal.
 *
 * The timeline is authored on a normalized 0 → 1 playhead that maps 1:1 to
 * scroll progress. Tweens are spread across the FULL range with gentle,
 * slightly-overlapping handoffs so nothing is crammed and there is no dead
 * scroll. Easing lives on the individual tweens (the scrub stays smooth) to
 * give an organic accelerate / settle feel.
 */
function setTrailerStartState(refs) {
  const {
    camera,
    trailerLayer,
    backgroundLight,
    typographyGroup,
    depthLayer,
    sharpLayer,
    nameText,
    subLines,
    ambient,
    lightGlow,
    bloom,
    grain,
    identityBehind,
    identityAmbient,
    identityAtmosphere,
    identityContent,
    identityHeadline,
    identityWords,
    identitySupport,
  } = refs

  if (camera) {
    gsap.set(camera, {
      scale: 1,
      z: 0,
      x: 0,
      y: 0,
      force3D: true,
      transformPerspective: 1400,
      transformOrigin: '50% 50%',
    })
  }

  gsap.set(trailerLayer, {
    opacity: 1,
    visibility: 'visible',
    pointerEvents: 'none',
    backgroundColor: trailerTheme.background,
  })

  if (backgroundLight) gsap.set(backgroundLight, { opacity: 1 })

  gsap.set(typographyGroup, {
    scale: 1,
    opacity: 1,
    x: 0,
    y: 0,
    force3D: true,
    transformOrigin: '50% 50%',
  })

  if (depthLayer) {
    gsap.set(depthLayer, {
      scale: 1,
      opacity: 0,
      force3D: true,
      transformOrigin: '50% 50%',
    })
  }

  gsap.set(sharpLayer, {
    scale: 1,
    opacity: 1,
    x: 0,
    y: 0,
    force3D: true,
    transformOrigin: '50% 50%',
  })

  gsap.set(nameText, { letterSpacing: '0.05em' })
  gsap.set(subLines, { opacity: 1, x: 0, y: 0 })
  if (ambient) gsap.set(ambient, { opacity: 1 })
  if (lightGlow) gsap.set(lightGlow, { opacity: 0.6, scale: 1 })
  if (bloom) gsap.set(bloom, { opacity: 0 })
  if (grain) gsap.set(grain, { opacity: 0 })

  if (identityBehind) gsap.set(identityBehind, { opacity: 1 })
  if (identityAmbient) gsap.set(identityAmbient, { opacity: 0 })
  if (identityAtmosphere) gsap.set(identityAtmosphere, { opacity: 0 })
  if (identityContent) gsap.set(identityContent, { opacity: 1 })
  if (identityHeadline) gsap.set(identityHeadline, { opacity: 0, y: 34 })
  if (identityWords) gsap.set(identityWords, { opacity: 0, y: 24 })
  if (identitySupport) gsap.set(identitySupport, { opacity: 0, y: 18 })
}

export function createTrailerPortalAnimation({ refs }) {
  if (!refs.section || !refs.trailerLayer || !refs.sharpLayer || !refs.nameText) {
    return () => {}
  }

  const mm = gsap.matchMedia()

  mm.add(
    {
      isMobile: '(max-width: 767px)',
      isDesktop: '(min-width: 768px)',
      reduceMotion: '(prefers-reduced-motion: reduce)',
    },
    (context) => {
      const { isMobile, reduceMotion } = context.conditions
      const sharpScale = isMobile ? 1.5 : 1.72
      const depthScale = isMobile ? 3.4 : 4.4
      const scrub = isMobile ? 0.6 : 1

      if (reduceMotion) {
        setTrailerStartState(refs)
        gsap.set([refs.transition, refs.trailerLayer], {
          opacity: 0,
          visibility: 'hidden',
        })
        gsap.set(refs.trailerLayer, { pointerEvents: 'none' })
        gsap.set([refs.identityWords, refs.identitySupport, refs.identityHeadline], {
          opacity: 1,
          y: 0,
        })
        return
      }

      setTrailerStartState(refs)

      const scrollTl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          id: 'trailer-portal',
          trigger: refs.section,
          start: 'top top',
          end: 'bottom bottom',
          scrub,
          fastScrollEnd: true,
          invalidateOnRefresh: true,
        },
      })

      scrollTl
        /* ---------- Act 1 · Camera glides forward (0 → 0.46) ---------- */
        .to(
          refs.sharpLayer,
          { scale: sharpScale, force3D: true, ease: 'power1.in', duration: 0.46 },
          0,
        )
        .to(
          refs.camera,
          {
            scale: isMobile ? 1.04 : 1.08,
            z: isMobile ? 26 : 48,
            force3D: true,
            ease: 'power1.in',
            duration: 0.46,
          },
          0,
        )
        .to(
          refs.nameText,
          { letterSpacing: '0.12em', ease: 'sine.inOut', duration: 0.46 },
          0,
        )
        .to(
          refs.depthLayer,
          {
            scale: depthScale,
            opacity: isMobile ? 0.04 : 0.05,
            force3D: true,
            ease: 'power1.in',
            duration: 0.42,
          },
          0,
        )
        .to(
          refs.lightGlow,
          {
            opacity: 0.95,
            scale: isMobile ? 1.08 : 1.16,
            ease: 'sine.inOut',
            duration: 0.4,
          },
          0,
        )

        /* ---------- Act 2 · Pass through type, room dissolves (0.34 → 0.66) ---------- */
        .to(
          refs.ambient,
          { opacity: 0, ease: 'power1.out', duration: 0.16 },
          0.3,
        )
        .to(
          refs.subLines,
          { opacity: 0, ease: 'power1.out', duration: 0.16 },
          0.32,
        )
        .to(
          refs.sharpLayer,
          { opacity: 0, ease: 'power1.inOut', duration: 0.2 },
          0.38,
        )
        .to(
          refs.depthLayer,
          { opacity: 0, ease: 'power1.out', duration: 0.16 },
          0.42,
        )
        .to(
          refs.lightGlow,
          { opacity: 0, ease: 'power1.out', duration: 0.18 },
          0.4,
        )
        .to(
          refs.bloom,
          { opacity: isMobile ? 0.14 : 0.2, ease: 'sine.inOut', duration: 0.14 },
          0.4,
        )
        .to(
          refs.bloom,
          { opacity: 0, ease: 'sine.inOut', duration: 0.18 },
          0.54,
        )

        /* ---------- Act 3 · Light fades to the dark world (0.46 → 0.78) ---------- */
        .to(
          refs.backgroundLight,
          { opacity: 0, ease: 'power1.inOut', duration: 0.26 },
          0.46,
        )
        .to(
          refs.trailerLayer,
          {
            backgroundColor: 'rgba(255,255,255,0)',
            ease: 'power1.inOut',
            duration: 0.26,
          },
          0.48,
        )
        .to(
          refs.identityAmbient,
          { opacity: 0.9, ease: 'power1.out', duration: 0.26 },
          0.5,
        )
        .to(
          refs.grain,
          { opacity: isMobile ? 0.025 : 0.04, ease: 'sine.inOut', duration: 0.2 },
          0.54,
        )
        .to(
          refs.trailerLayer,
          { opacity: 0, ease: 'power1.inOut', duration: 0.22 },
          0.6,
        )
        .to(
          refs.identityAtmosphere,
          { opacity: 1, ease: 'power1.out', duration: 0.26 },
          0.58,
        )

        /* ---------- Act 4 · Identity content settles in (0.6 → 1.0) ---------- */
        .to(
          refs.identityHeadline,
          { opacity: 1, y: 0, ease: 'power2.out', duration: 0.28 },
          0.62,
        )
        .to(
          refs.identityWords,
          {
            opacity: 1,
            y: 0,
            stagger: 0.03,
            ease: 'power2.out',
            duration: 0.26,
          },
          0.7,
        )
        .to(
          refs.identitySupport,
          { opacity: 1, y: 0, ease: 'power2.out', duration: 0.24 },
          0.84,
        )
        .to(
          refs.grain,
          { opacity: 0, ease: 'sine.inOut', duration: 0.16 },
          0.9,
        )
        .set(refs.trailerLayer, { visibility: 'hidden' }, 1)

      scrollTl.progress(0)
      refreshScroll()
    },
  )

  return () => mm.revert()
}

/** @deprecated Use createTrailerPortalAnimation */
export function createTrailerCamera(props) {
  return createTrailerPortalAnimation(props)
}

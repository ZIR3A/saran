import { useRef } from 'react'
import { gsap, useGSAP } from '../animations/gsap'
import { createTrailerPortalAnimation } from '../animations/trailerCamera'
import { resetScrollPosition } from '../animations/scroll'
import { trailerTheme } from '../../constants/trailerTheme'
import CameraTransition from '../ui/CameraTransition'
import CameraTypography from '../ui/CameraTypography'
import BackgroundLightLayer from './trailer/BackgroundLightLayer'
import CameraLayer from './trailer/CameraLayer'
import TrailerFrame from './trailer/TrailerFrame'
import AmbientElements from './trailer/AmbientElements'
import IdentitySection from './IdentitySection'
import TrailerScrollIndicator from './trailer/TrailerScrollIndicator'

const trailerCssVars = {
  '--trailer-bg': trailerTheme.background,
  '--trailer-bg-warm': trailerTheme.backgroundWarm,
  '--trailer-text-primary': trailerTheme.textPrimary,
  '--trailer-text-secondary': trailerTheme.textSecondary,
  '--trailer-text-muted': trailerTheme.textMuted,
  '--trailer-accent': trailerTheme.accent,
  '--trailer-accent-bright': trailerTheme.accentBright,
  '--trailer-accent-soft': trailerTheme.accentSoft,
  '--trailer-dark': trailerTheme.dark,
  '--trailer-exposure-mid': trailerTheme.exposureMid,
  '--trailer-border': trailerTheme.border,
  '--trailer-border-strong': trailerTheme.borderStrong,
}

export default function TrailerSection() {
  const sectionRef = useRef(null)
  const trailerLayerRef = useRef(null)
  const identityBehindRef = useRef(null)
  const backgroundLightRef = useRef(null)
  const cameraRef = useRef(null)
  const typographyRef = useRef(null)
  const sharpRef = useRef(null)
  const nameRef = useRef(null)
  const subLinesRef = useRef(null)
  const ambientRef = useRef(null)
  const lightGlowRef = useRef(null)
  const depthRef = useRef(null)
  const transitionRef = useRef(null)
  const bloomRef = useRef(null)
  const whiteFlashRef = useRef(null)
  const grayExposureRef = useRef(null)
  const grainRef = useRef(null)

  useGSAP(
    () => {
      resetScrollPosition()

      const behind = identityBehindRef.current

      return createTrailerPortalAnimation({
        refs: {
          section: sectionRef.current,
          trailerLayer: trailerLayerRef.current,
          backgroundLight: backgroundLightRef.current,
          camera: cameraRef.current,
          typographyGroup: typographyRef.current,
          depthLayer: depthRef.current,
          sharpLayer: sharpRef.current,
          nameText: nameRef.current,
          subLines: gsap.utils.toArray('[data-identity-line]', subLinesRef.current),
          ambient: ambientRef.current,
          lightGlow: lightGlowRef.current,
          transition: transitionRef.current,
          bloom: bloomRef.current,
          whiteFlash: whiteFlashRef.current,
          grayExposure: grayExposureRef.current,
          grain: grainRef.current,
          identityBehind: behind,
          identityAmbient: behind?.querySelector('[data-identity-ambient]'),
          identityAtmosphere: behind?.querySelector('[data-identity-atmosphere]'),
          identityContent: behind?.querySelector('[data-identity-content]'),
          identityHeadline: behind?.querySelector('[data-identity-headline]'),
          identityWords: gsap.utils.toArray('[data-word]', behind),
          identitySupport: behind?.querySelector('[data-identity-support]'),
        },
      })
    },
    { scope: sectionRef },
  )

  return (
    <div
      ref={sectionRef}
      id="trailer"
      data-section="trailer"
      className="relative h-[220vh] md:h-[320vh]"
      style={trailerCssVars}
    >
      <div className="sticky top-0 z-10 h-svh w-full overflow-hidden">
        <div
          ref={identityBehindRef}
          className="absolute inset-0 z-1"
          aria-hidden="true"
        >
          <IdentitySection behind />
        </div>

        <div
          ref={trailerLayerRef}
          data-trailer-layer
          className="relative z-10 flex h-svh w-full items-center justify-center overflow-hidden"
        >
          <BackgroundLightLayer layerRef={backgroundLightRef} />
          <TrailerFrame />

          <CameraLayer cameraRef={cameraRef}>
            <AmbientElements ambientRef={ambientRef} />
            <CameraTypography
              typographyRef={typographyRef}
              depthRef={depthRef}
              sharpRef={sharpRef}
              nameRef={nameRef}
              subLinesRef={subLinesRef}
              lightGlowRef={lightGlowRef}
            />
          </CameraLayer>

          <CameraTransition
            overlayRef={transitionRef}
            bloomRef={bloomRef}
            whiteFlashRef={whiteFlashRef}
            grayExposureRef={grayExposureRef}
            grainRef={grainRef}
          />
          <TrailerScrollIndicator />
        </div>
      </div>
    </div>
  )
}

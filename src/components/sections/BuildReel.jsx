import { useRef, useState, useEffect } from 'react'
import SectionShell from '../layout/SectionShell'
import { gsap, useGSAP } from '../animations/gsap'
import { createReelAnimation } from '../animations/reelAnimation'
import { refreshScroll } from '../animations/scroll'
import { scrollToTarget } from '../animations/smoothScroll'
import ReelPlaceholder from './reel/ReelPlaceholder'

const TITLE_WORDS = ['Digital', 'Products', 'In', 'Motion']
const VIDEO_SRC = '/videos/video.mp4'

export default function BuildReel() {
  const sectionRef = useRef(null)
  const containerRef = useRef(null)
  const videoRef = useRef(null)
  const gradientRef = useRef(null)
  const overlayRef = useRef(null)
  const supportRef = useRef(null)
  const ctaRef = useRef(null)

  const [videoMissing, setVideoMissing] = useState(false)
  const [videoReady, setVideoReady] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    const video = videoRef.current
    if (!section || !video || videoMissing) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!videoReady && video.preload === 'none') {
            video.preload = 'metadata'
            video.load()
          }
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: 0, rootMargin: '400px 0px' },
    )

    observer.observe(section)

    return () => observer.disconnect()
  }, [videoMissing, videoReady])

  useGSAP(
    () =>
      createReelAnimation({
        refs: {
          section: sectionRef.current,
          container: containerRef.current,
          video: videoMissing ? null : videoRef.current,
          placeholderGradient: videoMissing ? gradientRef.current : null,
          overlay: overlayRef.current,
          titleWords: gsap.utils.toArray('[data-reel-word]', sectionRef.current),
          support: supportRef.current,
          cta: ctaRef.current,
        },
      }),
    { scope: sectionRef, dependencies: [videoMissing] },
  )

  return (
    <SectionShell id="build-reel" fluid className="min-h-0! p-0!">
      <div
        ref={sectionRef}
        className="relative px-4 py-16 md:px-8 md:py-24 lg:py-28"
      >
        <div
          ref={containerRef}
          className="relative mx-auto w-full max-w-[90rem] overflow-hidden border border-theme bg-surface aspect-[4/3] max-h-[50vh] md:aspect-[21/9] md:max-h-none"
        >
          {!videoMissing ? (
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover"
              muted
              loop
              playsInline
              preload="none"
              disablePictureInPicture
              onError={() => setVideoMissing(true)}
              onLoadedData={(event) => {
                const media = event.currentTarget
                if (media.error) {
                  setVideoMissing(true)
                  return
                }
                setVideoReady(true)
                requestAnimationFrame(refreshScroll)
              }}
            >
              <source src={VIDEO_SRC} type="video/mp4" />
            </video>
          ) : (
            <ReelPlaceholder gradientRef={gradientRef} />
          )}

          <div
            ref={overlayRef}
            className="reel-overlay-gradient pointer-events-none absolute inset-0 opacity-60"
          />

          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 lg:p-12">
            <div className="max-w-2xl">
              <h2 className="text-[clamp(1.5rem,4.5vw,3rem)] font-bold leading-[1.05] tracking-tight text-primary">
                {TITLE_WORDS.map((word) => (
                  <span
                    key={word}
                    data-reel-word
                    className="mr-[0.25em] inline-block"
                  >
                    {word}
                  </span>
                ))}
              </h2>

              <p
                ref={supportRef}
                className="mt-4 max-w-lg text-[clamp(0.85rem,1.8vw,1.05rem)] leading-relaxed text-white md:mt-5"
              >
                A collection of digital products, interfaces, and interactive experiences crafted through design thinking, engineering precision, and attention to detail.
              </p>

              <a
                ref={ctaRef}
                href="#selected-experiences"
                onClick={(event) => {
                  event.preventDefault()
                  scrollToTarget('#selected-experiences', { offset: -80 })
                }}
                className="mt-6 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-accent transition-colors hover:text-primary md:mt-8"
              >
                Explore Selected Work
                <span aria-hidden="true" className="text-accent">
                  →
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  )
}

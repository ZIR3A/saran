import { useRef, useState } from 'react'
import { gsap, useGSAP } from '../../animations/gsap'

export default function ProjectImage({ title, category, technologies, image }) {
  const gradientRef = useRef(null)
  const [imageMissing, setImageMissing] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  useGSAP(
    () => {
      if (!gradientRef.current || !imageMissing) return undefined

      const tween = gsap.to(gradientRef.current, {
        rotation: 360,
        duration: 24,
        repeat: -1,
        ease: 'none',
        force3D: true,
      })

      return () => tween.kill()
    },
    { dependencies: [imageMissing] },
  )

  return (
    <div className="relative h-full w-full overflow-hidden">
      {!imageMissing ? (
        <>
          {!imageLoaded && (
            <div
              className="placeholder-gradient absolute inset-0"
              aria-hidden="true"
            />
          )}
          <img
            data-project-image
            src={image}
            alt=""
            width={1280}
            height={720}
            loading="lazy"
            decoding="async"
            className={[
              'absolute inset-0 h-full w-full object-cover transition-opacity duration-500',
              imageLoaded ? 'opacity-100' : 'opacity-0',
            ].join(' ')}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageMissing(true)}
          />
        </>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden px-6 text-center">
          <div
            ref={gradientRef}
            className="placeholder-gradient absolute left-1/2 top-1/2 h-[200%] w-[200%] -translate-x-1/2 -translate-y-1/2"
          />

          <div className="absolute inset-0 bg-background/80" />

          <div className="relative z-10 space-y-3">
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-accent">
              {category}
            </p>
            <p className="text-base font-semibold text-primary md:text-lg">
              {title}
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {technologies.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-theme px-3 py-1 font-mono text-[0.55rem] uppercase tracking-wider text-secondary"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

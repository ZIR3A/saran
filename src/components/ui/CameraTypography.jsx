export default function CameraTypography({
  typographyRef,
  depthRef,
  sharpRef,
  nameRef,
  subLinesRef,
  lightGlowRef,
}) {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6 md:px-10">
      <div
        ref={lightGlowRef}
        data-trailer-light
        className="trailer-light-glow pointer-events-none absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
      />

      <div
        ref={typographyRef}
        data-trailer-hero
        className="trailer-hero relative flex w-full max-w-4xl flex-col items-center justify-center text-center"
      >
        <div
          ref={depthRef}
          data-trailer-depth
          className="trailer-depth-field pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 transform-gpu"
          aria-hidden="true"
        />

        <div
          ref={sharpRef}
          data-trailer-sharp
          className="relative z-10 flex w-full flex-col items-center"
        >
          <p
            data-identity-line
            className="trailer-eyebrow mb-5 font-mono text-[0.62rem] uppercase tracking-[0.42em] text-trailer-muted md:mb-7"
          >
            Software Engineer building products beyond the interface.
          </p>

          <h1
            ref={nameRef}
            data-trailer-name
            className="trailer-display-name whitespace-nowrap font-semibold uppercase text-trailer-primary"
          >
            Saran Baral
          </h1>

          <div
            ref={subLinesRef}
            className="mt-6 flex w-full max-w-lg flex-col items-center gap-5 md:mt-8 md:gap-6"
          >
            <span
              data-identity-line
              className="trailer-role-divider block h-px w-12 bg-trailer-accent-soft"
              aria-hidden="true"
            />

            <p
              data-identity-line
              className="text-balance text-[clamp(0.95rem,2.1vw,1.12rem)] leading-[1.65] tracking-[0.01em] text-trailer-secondary"
            >
              Building production-ready web products, enterprise platforms, streaming experiences, and interactive applications with a focus on architecture, performance, and user experience.
            </p>

            <p
              data-identity-line
              className="font-mono text-[0.62rem] uppercase tracking-[0.34em] text-trailer-muted"
            >
              Open to full-time opportunities
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

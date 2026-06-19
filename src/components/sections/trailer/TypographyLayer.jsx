export default function TypographyLayer({
  typographyRef,
  nameRef,
  subLinesRef,
}) {
  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-6">
      <div
        ref={typographyRef}
        data-trailer-hero
        className="trailer-hero relative flex w-full max-w-5xl flex-col items-center justify-center text-center"
      >
        <h1
          ref={nameRef}
          data-trailer-name
          className="whitespace-nowrap text-[clamp(2.5rem,9vw,6rem)] font-bold uppercase leading-[0.95] tracking-[0.05em] text-primary"
        >
          Saran Baral
        </h1>

        <div
          ref={subLinesRef}
          className="mt-4 flex flex-col items-center gap-3 md:mt-6 md:gap-4"
        >
          <p
            data-identity-line
            className="font-mono text-[clamp(0.8rem,2.2vw,1.1rem)] uppercase tracking-[0.35em] text-accent"
          >
            Frontend Engineer
          </p>

          <p
            data-identity-line
            className="max-w-md text-[clamp(0.85rem,2vw,1.05rem)] tracking-[0.12em] text-secondary"
          >
            Building Digital Experiences
          </p>
        </div>
      </div>
    </div>
  )
}

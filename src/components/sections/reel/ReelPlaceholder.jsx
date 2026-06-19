export default function ReelPlaceholder({ gradientRef }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-deep">
      <div
        ref={gradientRef}
        className="placeholder-gradient absolute left-1/2 top-1/2 h-[200%] w-[200%] -translate-x-1/2 -translate-y-1/2"
      />

      <div className="absolute inset-0 bg-background/70" />

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.35em] text-accent">
          Build Reel
        </span>
        <p className="text-lg font-medium tracking-wide text-primary md:text-xl">
          Coming Soon
        </p>
      </div>
    </div>
  )
}

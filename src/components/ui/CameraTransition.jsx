export default function CameraTransition({
  overlayRef,
  bloomRef,
  whiteFlashRef,
  grayExposureRef,
  grainRef,
}) {
  return (
    <div
      ref={overlayRef}
      data-trailer-transition
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-50"
    >
      <div ref={bloomRef} data-trailer-bloom className="trailer-bloom absolute inset-0 opacity-0" />
      <div
        ref={whiteFlashRef}
        data-trailer-flash
        className="absolute inset-0 bg-trailer-bg opacity-0"
      />
      <div
        ref={grayExposureRef}
        data-trailer-exposure-mid
        className="absolute inset-0 bg-trailer-exposure-mid opacity-0"
      />
      <div
        ref={grainRef}
        data-trailer-grain
        className="trailer-film-grain absolute inset-0 opacity-0"
      />
    </div>
  )
}

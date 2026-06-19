export default function TrailerFrame() {
  return (
    <div
      data-trailer-frame
      className="pointer-events-none absolute inset-0 z-20"
      aria-hidden="true"
    >
      <span className="trailer-frame-corner trailer-frame-tl" />
      <span className="trailer-frame-corner trailer-frame-tr" />
      <span className="trailer-frame-corner trailer-frame-bl" />
      <span className="trailer-frame-corner trailer-frame-br" />
    </div>
  )
}

export default function BackgroundLightLayer({ layerRef }) {
  return (
    <div
      ref={layerRef}
      data-trailer-bg-light
      className="absolute inset-0 z-0 bg-trailer-bg"
      aria-hidden="true"
    >
      <div className="trailer-studio-gradient absolute inset-0" />
      <div className="trailer-studio-warmth absolute inset-0" />
      <div className="trailer-studio-vignette absolute inset-0" />
      <div className="trailer-studio-grain absolute inset-0" />
    </div>
  )
}

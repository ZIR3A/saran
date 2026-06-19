export default function CameraLayer({ cameraRef, children }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
      style={{ perspective: '1400px' }}
      aria-hidden="true"
    >
      <div
        ref={cameraRef}
        data-trailer-camera
        className="absolute inset-0 transform-gpu"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {children}
      </div>
    </div>
  )
}

export default function DoorwayPortal({ portalRef }) {
  return (
    <div
      ref={portalRef}
      data-trailer-portal
      className="trailer-doorway-portal pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0"
      aria-hidden="true"
    />
  )
}

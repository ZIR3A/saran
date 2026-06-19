import { theme } from '../../constants/theme'

export default function CinematicEnvironment() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
      style={{ backgroundColor: theme.colors.background }}
    />
  )
}

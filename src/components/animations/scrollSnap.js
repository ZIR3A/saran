/**
 * ScrollTrigger snap presets for storytelling sections only.
 * Not applied globally — normal sections scroll freely.
 */

export function createStageSnap(stageCount, enabled = true) {
  if (!enabled || stageCount <= 1) return false

  return {
    snapTo: 1 / (stageCount - 1),
    duration: { min: 0.08, max: 0.22 },
    delay: 0,
    ease: 'power2.inOut',
    inertia: false,
  }
}

/** Journey section — snap to nearest stage (0, 1/(n-1), …, 1) on all devices */
export function createJourneySnap(stageCount) {
  if (stageCount <= 1) return false

  const points = Array.from({ length: stageCount }, (_, i) => i / (stageCount - 1))

  return {
    snapTo: (progress) =>
      points.reduce((nearest, point) =>
        Math.abs(point - progress) < Math.abs(nearest - progress) ? point : nearest,
      ),
    duration: { min: 0.18, max: 0.42 },
    delay: 0.04,
    ease: 'power2.out',
    inertia: false,
    directional: false,
  }
}

export function createTrailerSnap({ isMobile, phase1End, phase2End, phase3End }) {
  const points = [0, phase1End, phase2End, phase3End, 1]

  if (isMobile) {
    return {
      snapTo: (progress) => {
        if (progress >= 0.72) return 1
        return points.reduce((nearest, point) =>
          Math.abs(point - progress) < Math.abs(nearest - progress) ? point : nearest,
        )
      },
      duration: { min: 0.1, max: 0.3 },
      delay: 0,
      ease: 'power1.inOut',
      inertia: false,
    }
  }

  return {
    snapTo: (progress) => {
      if (progress >= 0.9) return 1

      return points.reduce((nearest, point) =>
        Math.abs(point - progress) < Math.abs(nearest - progress) ? point : nearest,
      )
    },
    duration: { min: 0.12, max: 0.45 },
    delay: 0.04,
    ease: 'power1.inOut',
    inertia: false,
  }
}

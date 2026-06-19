import { journeyStages } from '../../../data/journey'

export default function JourneyProgress({ progressRef }) {
  return (
    <div ref={progressRef} className="mt-8 space-y-3">
      <div className="flex gap-2">
        {journeyStages.map((stage, index) => (
          <div
            key={stage.id}
            className="h-px flex-1 overflow-hidden rounded-full bg-primary/10"
          >
            <div
              data-progress-fill
              data-stage-index={index}
              className="h-full w-full origin-left scale-x-0 bg-accent will-change-transform"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-between font-mono text-[0.6rem] uppercase tracking-[0.2em] text-secondary">
        {journeyStages.map((stage, index) => (
          <span
            key={`label-${stage.id}`}
            data-progress-label
            data-stage-index={index}
            className="opacity-35"
          >
            {stage.stage}
          </span>
        ))}
      </div>
    </div>
  )
}

import { journeyStages } from '../../../data/journey'

export default function JourneyProgress({ progressRef }) {
  return (
    <div ref={progressRef} className="mt-8 flex gap-2">
      {journeyStages.map((stage, index) => (
        <div key={stage.id} className="flex flex-1 flex-col gap-3">
          <div className="h-px w-full overflow-hidden rounded-full bg-primary/10">
            <div
              data-progress-fill
              data-stage-index={index}
              className="h-full w-full origin-left scale-x-0 bg-accent will-change-transform"
            />
          </div>
          <span
            data-progress-label
            data-stage-index={index}
            className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-secondary opacity-35"
          >
            {stage.stage}
          </span>
        </div>
      ))}
    </div>
  )
}

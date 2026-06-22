export const caseStudyPhases = [
  {
    id: 'challenge',
    stage: '01',
    label: 'Challenge',
    content:
      'The client\'s original media platform suffered from high user drop-off due to slow content load times and disruptive layout shifts, directly impacting ad revenue.',
  },
  {
    id: 'approach',
    stage: '02',
    label: 'Approach',
    items: [
      'Component-driven modular design to speed up future feature deployments',
      'ISR-based content delivery for instant updates with zero server strain',
      'Performance-first rendering strategy targeting Core Web Vitals thresholds',
      'Responsive, layout-shift-free experience across all viewports',
    ],
  },
  {
    id: 'implementation',
    stage: '03',
    label: 'Implementation',
    groups: [
      { label: 'Frontend', value: 'React / Next.js' },
      { label: 'UI', value: 'Reusable components' },
      { label: 'Experience', value: 'Animations and interactions' },
      { label: 'Integration', value: 'Dynamic content and APIs' },
    ],
  },
  {
    id: 'result',
    stage: '04',
    label: 'Result',
    content:
      'Engineered a component-driven architecture using Next.js Incremental Static Regeneration (ISR), delivering instant content updates with zero server strain and eliminating layout shifts.',
  },
]

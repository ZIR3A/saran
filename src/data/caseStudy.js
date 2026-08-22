// src/data/caseStudy.js
// OWNERSHIP ANALYSIS: Managed exclusively by src/data/caseStudy.js per AGENTS.md rules.

export const CASE_STUDY = {
  title: "Building Software Beyond the Interface",

  subtitle:
    "A practical engineering journey across products, platforms, systems, and experiences",

  phases: [
    {
      id: "phase-01-foundation",
      stage: "01",
      label: "From Interfaces to Products",

      content:
        "My engineering journey began with understanding how interfaces, logic, and user interactions come together to create useful software. Over time, that foundation evolved beyond individual screens and components into complete digital products. I have worked across responsive web experiences, dashboards, e-commerce platforms, learning systems, streaming products, and business applications, with increasing focus on how frontend decisions connect with data, APIs, backend services, performance, and real user requirements."
    },

    {
      id: "phase-02-complex-systems",
      stage: "02",
      label: "Engineering Complex Systems",

      items: [
        "Built and contributed to production web applications where frontend architecture had to work alongside APIs, databases, authentication, business logic, and operational workflows.",

        "Worked on large-scale streaming and entertainment experiences across web and Smart TV environments, including media playback, content experiences, performance optimization, and supporting business platforms.",

        "Developed enterprise-oriented systems including administration portals, CRM workflows, dashboards, reporting interfaces, and operational tools where maintainability and reliable data flows are essential.",

        "Built product experiences across e-learning, e-commerce, interactive interfaces, and content-driven platforms, adapting architecture and UX decisions to different product requirements.",

        "Worked across both greenfield development and existing systems, balancing new implementation with refactoring, debugging, optimization, and incremental modernization."
      ]
    },

    {
      id: "phase-03-engineering-principles",
      stage: "03",
      label: "How I Approach Engineering",

      groups: [
        {
          label: "Product Thinking",
          value:
            "User Goals · Business Requirements · Practical Solutions"
        },

        {
          label: "Architecture",
          value:
            "Modular Systems · Reusable Components · Maintainable Code"
        },

        {
          label: "Performance",
          value:
            "Rendering Strategy · Asset Optimization · Runtime Performance"
        },

        {
          label: "Experience",
          value:
            "Responsive UI · Interaction Design · Accessibility · Usability"
        },

        {
          label: "Engineering Workflow",
          value:
            "Debugging · Refactoring · Testing · Deployment · Continuous Improvement"
        },

        {
          label: "Modern Development",
          value:
            "AI-Assisted Workflows · Automation · Rapid Prototyping · Emerging Technologies"
        }
      ]
    },

    {
      id: "phase-04-real-world-engineering",
      stage: "04",
      label: "Building for the Real World",

      content:
        "Real software engineering extends beyond writing features. It involves understanding existing systems, working within technical constraints, solving production problems, making trade-offs, and continuously improving what already exists. My experience has taken me from building interfaces to working across complete product ecosystems, where architecture, performance, usability, data, deployment, and long-term maintainability all have to work together. The goal is not simply to build software that works, but to build software that can evolve."
    }
  ]
};

export const caseStudyPhases = CASE_STUDY.phases;

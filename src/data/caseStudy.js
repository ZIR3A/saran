// src/data/caseStudy.js
// OWNERSHIP ANALYSIS: Managed exclusively by src/data/caseStudy.js per AGENTS.md rules.

export const CASE_STUDY = {
  title: "Enterprise OTT Ecosystem Refactor",
  subtitle: "Multi-Platform Streaming Engine & Core CRM Architecture",
  phases: [
    {
      id: "phase-01-challenge",
      stage: "01",
      label: "The Multi-Front Challenge",
      content: "The client's legacy infrastructure struggled with heavy architectural debt across two environments. First, the public OTT streaming platforms (Web & webOS Smart TV) suffered from high latency and unstable media player playback. Second, their internal administration networks—handling operations across critical Admin, Reseller, ERP, Billing, and Report sub-systems—stalled under rigid, class-based component architectures that couldn't reliably scale to support over 800,000 active global subscribers."
    },
    {
      id: "phase-02-approach",
      stage: "02",
      label: "Strategic Engineering Pillars",
      items: [
        "Migrating all legacy class-based CRM and administration panels to highly performant React functional components.",
        "Optimizing the core client-side streaming engine (webtv.nettv.com.np) to resolve buffering delays and memory leaks.",
        "Refactoring bloated style configurations into a unified theme using clean, custom SCSS variables under the latest Bootstrap framework.",
        "Deploying robust state abstractions to securely manage data pipelines across Admin, Reseller, ERP, and payment report portals."
      ]
    },
    {
      id: "phase-03-implementation",
      stage: "03",
      label: "Modern Technology Stack Integration",
      // Removed Motion Engine entirely and restructured into pure core engineering categories
      groups: [
        {
          label: "Core Architecture",
          value: "React 19.2 (Functional Lifecycle Migration), Vite 8, Micro-Frontend Portals"
        },
        {
          label: "Streaming Infrastructure",
          value: "Video.js Core Player Engine, HLS Streaming Optimization, webOS LG App SDK"
        },
        {
          label: "Design System",
          value: "Latest Bootstrap Core, Customized Local SCSS Theme Modules, Tailwind Utility Layouts"
        },
        {
          label: "Data Management",
          value: "Asynchronous Edge Caching, Optimized Real-time Reporting Query Modules"
        }
      ]
    },
    {
      id: "phase-04-result",
      stage: "04",
      label: "Quantified Architectural ROI",
      content: "The complete engineering overhaul delivered massive operational wins. Upgrading the entire billing and management network stabilized database communication for over 800,000 active accounts, cutting interface report generation time by 35%. Migrating the client player mechanics to an optimized Video.js framework on web and smart TV configurations successfully dropped playback buffer dropouts by 40% while maintaining exceptional UI runtime stability."
    }
  ]
};

export const caseStudyPhases = CASE_STUDY.phases;

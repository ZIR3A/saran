# AGENTS.md

# Future Porto — Project Intelligence Agent

## Mission

You are the dedicated AI engineer responsible for maintaining and evolving the Future Porto portfolio.

Your goal is to make the smallest, most accurate change possible while preserving the project's architecture, design language, animation system, and storytelling flow.

Always optimize for:

* Minimal token usage
* Minimal file reads
* Minimal code changes
* Maximum architectural consistency

---

# Core Rule

DO NOT scan the entire codebase by default.

DO NOT read ARCHITECTURE.md for every request.

Instead:

1. Determine feature ownership.
2. Identify the minimum required files.
3. Read only those files.
4. Perform the requested modification.
5. Leave unrelated files untouched.

---

# Architecture Loading Policy

ARCHITECTURE.md is the source of truth.

However, it should only be loaded when:

* Creating a completely new section
* Modifying project structure
* Refactoring architecture
* Ownership cannot be determined
* User explicitly requests architecture review

For normal feature work, use the ownership map below.

---

# Project Overview

Future Porto is a cinematic single-page portfolio built with:

* React 19
* Vite 8
* Tailwind CSS v4
* GSAP
* ScrollTrigger
* Lenis

Project philosophy:

* Content lives in data files
* Layout lives in layout components
* Motion lives in animation files
* Styling lives in theme files
* Sections own presentation
* Components remain reusable

Never mix responsibilities.

---

# Ownership Routing System

## Content Updates

Requests:

* rewrite text
* update descriptions
* add projects
* modify experiences
* edit highlights
* update journey content
* change contact information

Read only:

src/data/projects.js
src/data/experiences.js
src/data/highlights.js
src/data/journey.js
src/data/contact.js

Avoid:

components/
animations/
theme files

---

## Hero / Trailer

Requests:

* cinematic intro
* trailer improvements
* hero animation
* scroll zoom effects
* title updates
* opening sequence

Read only:

src/components/sections/TrailerSection.jsx

src/components/sections/trailer/*

src/components/ui/CameraTypography.jsx

src/components/ui/CameraTransition.jsx

src/components/animations/trailerCamera.js

Avoid reading unrelated sections.

---

## Engineering Journey

Requests:

* timeline updates
* career journey changes
* stage additions
* journey animations

Read only:

src/data/journey.js

src/components/sections/EngineeringJourney.jsx

src/components/sections/journey/*

src/components/animations/journeyAnimation.js

---

## Engineering Highlights

Requests:

* highlight cards
* engineering principles
* skills showcase
* values section

Read only:

src/data/highlights.js

src/components/sections/EngineeringHighlights.jsx

src/components/sections/highlights/*

src/components/animations/highlightAnimation.js

---

## Build Reel

Requests:

* Digital Experiences In Motion
* reel updates
* showcase video section
* motion reel

Read only:

src/components/sections/BuildReel.jsx

src/components/sections/reel/*

src/components/animations/reelAnimation.js

---

## Selected Experiences

Requests:

* experience cards
* experience content
* experience images
* experience layout

Read only:

src/data/experiences.js

src/components/sections/SelectedExperiences.jsx

src/components/sections/experiences/*

src/components/animations/experienceAnimation.js

Current experience categories:

1. Project & Web Application Experience
2. Streaming & Entertainment Platform
3. AI & Future Technology

---

## Case Study

Requests:

* case study updates
* challenge section
* implementation section
* process storytelling

Read only:

src/data/caseStudy.js

src/components/sections/CaseStudy.jsx

src/components/sections/caseStudy/*

src/components/animations/caseStudyAnimation.js

---

## Project World

Requests:

* projects section
* project cards
* project transitions
* project stack
* project storytelling

Read only:

src/data/projects.js

src/components/sections/Projects.jsx

src/components/sections/projects/*

src/components/animations/projectWorldAnimation.js

Avoid unrelated sections.

---

## Contact

Requests:

* contact section
* CTA updates
* social links
* footer communication

Read only:

src/data/contact.js

src/data/social.js

src/components/sections/Contact.jsx

src/components/sections/contact/*

src/components/animations/contactAnimation.js

---

## Navigation

Requests:

* menu changes
* navigation behavior
* active section tracking
* mobile menu

Read only:

src/components/layout/Navigation.jsx

src/hooks/useActiveSection.js

src/data/navigation.js

src/data/sections.js

---

## Theme & Visual Design

Requests:

* colors
* visual identity
* design system
* typography
* spacing
* glass effects

Read only:

src/constants/theme.js

src/constants/trailerTheme.js

src/constants/applyTheme.js

tailwind.config.js

src/index.css

Avoid component logic.

---

## Scroll & Animation System

Requests:

* GSAP changes
* Lenis changes
* scroll behavior
* transitions
* motion improvements

Read only:

src/components/animations/*

and the directly related section.

Do not inspect content files unless required.

---

# Mandatory Workflow

Before making any change:

Output:

OWNERSHIP ANALYSIS

Feature:
[requested feature]

Files Required:
[list]

Reason:
[why these files own the feature]

Then proceed with implementation.

---

# Modification Rules

Always:

* Preserve architecture
* Preserve component boundaries
* Preserve data ownership
* Preserve animation ownership
* Prefer incremental improvements
* Prefer reusable solutions

Never:

* Refactor unrelated files
* Rename folders
* Move architecture
* Rewrite working systems
* Change project structure

Unless explicitly requested.

---

# Portfolio Identity

Future Porto is not a standard developer portfolio.

It is a cinematic digital experience showcasing:

* Product Engineering
* Frontend Engineering
* Interactive Experiences
* Digital Systems
* Modern Web Architecture
* Creative Technology

When generating content:

Avoid generic developer language.

Prefer:

* Product-focused language
* Engineering language
* Systems thinking
* Experience-driven storytelling
* Professional tone

---

# Performance Mode

Assume architecture is already understood.

Avoid loading:

* ARCHITECTURE.md
* large project files
* unrelated sections

unless absolutely necessary.

Always choose the smallest context required to complete the task.

Goal:

Reduce token consumption.
Increase implementation accuracy.
Maintain architectural consistency.
Act as a senior engineer working inside an established codebase.

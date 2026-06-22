# Future Porto — Architecture & Project Documentation

> **Author:** Saran Baral  
> **Stack:** React 19 + Vite 8 + GSAP 3.15 + Lenis 1.3 + Tailwind CSS v4  
> **Type:** Single-page cinematic portfolio (no router, no backend, no CMS)

---

## 1. Tech Stack

| Layer | Technology | Role |
|-------|------------|------|
| UI Framework | React 19.2 | Component rendering |
| Build Tool | Vite 8 | Dev server + bundling |
| Language | JavaScript (JSX) | — |
| Styling | Tailwind CSS v4 | Utility-first CSS |
| Scroll Engine | Lenis 1.3 | Smooth scrolling |
| Animations | GSAP 3.15 + ScrollTrigger | Timeline-based motion |
| Linting | ESLint 10 | Code quality |

> **Note:** `framer-motion` is listed in `package.json` but not used anywhere. All motion is GSAP + Lenis.

---

## 2. Directory Structure

```
future-porto/
├── public/
│   ├── favicon.svg
│   ├── icons.svg
│   ├── resume/Saran Baral.pdf
│   ├── videos/          # Build reel video assets
│   └── images/
│       ├── selected-experiences/   # 3 experience images
│       └── projects/               # 7 project screenshots
│
├── src/
│   ├── main.jsx                    # Entry point
│   ├── App.jsx                     # Root component (section layout)
│   ├── index.css                   # Tailwind import + global styles
│   │
│   ├── constants/
│   │   ├── theme.js                # Color palette tokens
│   │   ├── applyTheme.js           # Injects CSS custom properties
│   │   └── trailerTheme.js         # Light/studio palette for hero
│   │
│   ├── data/
│   │   ├── navigation.js           # Nav menu items
│   │   ├── sections.js             # Section ID/label map
│   │   ├── social.js               # Social action buttons
│   │   ├── projects.js             # 7 project entries
│   │   ├── experiences.js          # 3 work experience entries
│   │   ├── highlights.js           # 4 engineering principles
│   │   ├── journey.js              # 4 career stages
│   │   ├── contact.js              # 4 contact links
│   │   └── caseStudy.js            # 4-phase case study data
│   │
│   ├── hooks/
│   │   └── useActiveSection.js     # Active section / nav visibility
│   │
│   └── components/
│       ├── layout/
│       │   ├── CinematicEnvironment.jsx   # Fixed dark background
│       │   ├── Navigation.jsx             # Sticky top nav
│       │   └── SectionShell.jsx           # Reusable <section> wrapper
│       │
│       ├── ui/
│       │   ├── SocialActions.jsx          # Link buttons (resume, github, etc.)
│       │   ├── CameraTypography.jsx       # Hero name/title text
│       │   └── CameraTransition.jsx       # Bloom/flash overlays
│       │
│       ├── animations/
│       │   ├── gsap.js                    # GSAP bootstrap + defaults
│       │   ├── scroll.js                  # ScrollTrigger foundation
│       │   ├── smoothScroll.js            # Lenis instance + bridge
│       │   ├── scrollSnap.js              # Snap scroll utilities
│       │   ├── trailerCamera.js           # Hero cinematic timeline
│       │   ├── identityAnimation.js       # Identity section reveal
│       │   ├── journeyAnimation.js        # Career stagger reveal via toggleActions
│       │   ├── highlightAnimation.js      # Highlight card fade-in
│       │   ├── experienceAnimation.js     # Experience parallax
│       │   ├── reelAnimation.js           # Build reel clip-path
│       │   ├── projectWorldAnimation.js   # Stacked card transitions
│       │   ├── projectAnimation.js        # (Legacy) alternate
│       │   ├── caseStudyAnimation.js      # Phase panel transitions
│       │   └── contactAnimation.js        # Word reveal
│       │
│       └── sections/
│           ├── TrailerSection.jsx             # Cinematic hero (220vh)
│           ├── IdentitySection.jsx            # "I architect digital systems"
│           ├── EngineeringJourney.jsx         # 4-stage timeline
│           ├── EngineeringHighlights.jsx      # 2x2 principle grid
│           ├── BuildReel.jsx                  # Video/placeholder reel
│           ├── SelectedExperiences.jsx        # 3 experience cards
│           ├── CaseStudy.jsx                  # 4-phase case study
│           ├── Projects.jsx                   # 7 project card world
│           └── Contact.jsx                    # CTA + social links
│           │
│           ├── trailer/           # 7 sub-components for hero
│           ├── identity/          # IdentityAmbient (placeholder)
│           ├── journey/           # JourneyCard, JourneyProgress
│           ├── highlights/        # HighlightCard
│           ├── experiences/       # ExperienceCard, ExperienceImage
│           ├── projects/          # ProjectCard, ProjectImage
│           ├── caseStudy/         # CaseStudyPanels
│           ├── reel/              # ReelPlaceholder
│           └── contact/           # ContactAmbient (placeholder)
│
├── index.html                     # Root HTML + OG meta + Google Fonts
├── vite.config.js                 # React + Tailwind v4 plugins
├── tailwind.config.js             # Custom theme colors
├── eslint.config.js               # Flat config ESLint
└── package.json
```

---

## 3. Section Flow (Scroll Order)

```
App.jsx
├── CinematicEnvironment     ← always-present fixed dark bg (z-0)
├── Navigation               ← fixed header (z-50, hidden initially)
└── <main>
    ├── TrailerSection          (220vh, camera timeline → transitions to Identity)
    ├── EngineeringJourney      (viewport-triggered staggered reveal, 4 stages)
    ├── EngineeringHighlights   (2×2 card grid, staggered reveal)
    ├── BuildReel               (video / animated placeholder)
    ├── SelectedExperiences     (3 cards, parallax reveal)
    ├── CaseStudy               (pinned timeline, 4 phases)
    ├── Projects                (pinned, stacked card transitions, 7 projects)
    └── Contact                 (centered CTA, word reveal)
```

All sections except the Trailer use a `<SectionShell>` wrapper that provides consistent padding, max-width container, and `id` for anchor scroll targeting.

---

## 4. Animation Architecture

All motion uses **GSAP + ScrollTrigger** with **Lenis** as the smooth-scroll provider.

### Key Files

| File | Responsibility |
|------|---------------|
| `animations/gsap.js` | Registers ScrollTrigger plugin, configures global defaults (`force3D: true`, default ease/duration), exports `prefersReducedMotion()` checker |
| `animations/smoothScroll.js` | Creates/destroys a Lenis instance, bridges Lenis → ScrollTrigger via `lenis.on('scroll', ScrollTrigger.update)`, exposes `scrollToTarget()` and `setSmoothScrollPaused()` |
| `animations/scroll.js` | Initializes ScrollTrigger global settings, sets Lenis as scroller proxy, wires image-load refresh via `observeMediaForRefresh()` |

### Three Scroll Patterns

| Pattern | Used In | Technique |
|---------|---------|-----------|
| **Scrubbed Pin + Snap** | CaseStudy, Projects | `ScrollTrigger` with `pin`, `scrub: 1`, and custom `snap` mapping 0→1 progress to card transitions |
| **Camera Timeline** | TrailerSection | 4-act GSAP timeline scrubbed across a tall spacer (220–320vh), orchestrates ~20 element transforms (scale, opacity, position) |
| **Toggle Reveal** | Journey, Highlights, Experiences, Contact, Reel | `ScrollTrigger` with `toggleActions: 'play none none reverse'`, elements stagger-in on viewport entry |

### Responsive Strategy

- Breakpoint: **768px** (checked via `gsap.matchMedia()`)
- Mobile: reduced Y offsets, faster scrub, disabled parallax, vertical layouts instead of horizontal
- All animation factories return a cleanup function that calls `mm.revert()`
- `prefersReducedMotion()` sets elements to final state immediately with no animation

---

## 5. Data Layer (Static Content)

All content is stored in `src/data/` as plain JS modules — no API, no CMS, no database.

| File | Exports | Items |
|------|---------|-------|
| `navigation.js` | `NAV_ITEMS` | 4 nav entries (Journey, Work, Contact, Resume) |
| `sections.js` | `SECTIONS` | 9 section IDs + labels |
| `social.js` | `SOCIAL_ACTIONS` | 4 buttons (resume, github, linkedin, email) |
| `projects.js` | `PROJECTS` | 7 projects (id, title, url, category, description, technologies[], contributions[], image) |
| `experiences.js` | `EXPERIENCES` | 3 experiences (title, category, roles[], description, stack[], image) |
| `highlights.js` | `HIGHLIGHTS` | 4 principles (title, description, tags[]) |
| `journey.js` | `JOURNEY_STAGES` | 4 stages (title, subtitle, period, descriptions[], highlights[]) |
| `contact.js` | `CONTACT_LINKS` | 4 links (email, linkedin, github, resume) |
| `caseStudy.js` | `CASE_STUDY` | 1 case study with 4 phases (title, subtitle, content[], image) |

---

## 6. Theming System

- **`constants/theme.js`** — 11 color tokens (background, surface, accent, text, border, etc.) + 2 effect tokens (glow, shadow)
- **`constants/applyTheme.js`** — `applyThemeVariables()` sets tokens as CSS custom properties on `:root`; called inline in `index.html` (before React mounts to avoid FOUC) and again in `main.jsx`
- **`constants/trailerTheme.js`** — Separate light/studio palette for the hero section, applied via inline style on the trailer container
- **`tailwind.config.js`** — Maps theme tokens to Tailwind classes (`bg-background`, `text-accent`, `border-theme`)
- **`index.css`** — Custom CSS tokens (`--font-sans`, `--font-mono`, `--spacing-section`, `--ease-cinematic`), glass morphism utilities, noise overlays

---

## 7. Navigation & Active Section Tracking

- **`Navigation.jsx`** — Fixed top bar, starts hidden via GSAP (`yPercent: -100`), reveals after ~30% of trailer is scrolled. Implements scroll-direction hide/show: hides on scroll down (`yPercent: -100`) and reveals on scroll up past a 10px delta threshold, using GSAP `power2.out` easing.
- **`hooks/useActiveSection.js`** — Uses `ScrollTrigger.create()` and `ScrollTrigger.batch()` to:
  - Detect nav visibility threshold (30% of trailer progress)
  - Track which section is centered in viewport
  - Map multiple section IDs to a single nav item (e.g., `engineering-journey`, `engineering-highlights`, `build-reel` → "Journey" nav item)
- Mobile: hamburger toggle → fullscreen overlay, pauses Lenis scrolling

---

## 8. Image & Video Handling

- **Lazy loading:** All images use `loading="lazy"` + `decoding="async"`
- **Placeholder fallback:** `ExperienceImage` / `ProjectImage` show an animated conic gradient while loading; on error, the gradient becomes a permanent animated placeholder with text
- **Video lazy-load:** BuildReel uses `IntersectionObserver` (400px rootMargin) + `preload="none"` to pause/play based on visibility
- **ScrollTrigger refresh:** `observeMediaForRefresh()` in `scroll.js` auto-refreshes ScrollTrigger bounds after images load

---

## 9. Component Conventions

- **`SectionShell`** — Reusable wrapper: `<section id={id} className="section-padding ...">` → inner `container-cinematic` div. Props: `id`, `fullHeight`, `fluid`, `className`
- **Animation files** live in `components/animations/` per-section, follow a factory pattern: `export function animateSection({ refs }) { ... return () => mm.revert() }`
- **Section components** call their animation inside a `useGSAP()` hook (from `@gsap/react`) with `scope: containerRef` and `dependencies: []`
- **Placeholders** exist as stub components (`IdentityAmbient`, `ContactAmbient` returning `null`) for future expansion

---

## 10. Complete Data Structures (All `.map()` Sources)

Every array that drives a `.map()` in the component tree, sorted by data file.

---

### 10.1 `navigation.js` → `navItems`

| Property | Type | Description |
|----------|------|-------------|
| `id` | `string` | Section ID to scroll to (only for `type: 'section'`) |
| `label` | `string` | Display label in nav bar |
| `type` | `'section' \| 'link'` | Internal scroll link or external URL |
| `href` | `string` | URL (only for `type: 'link'`) |
| `external` | `boolean` | Opens in new tab |
| `variant` | `'outline'` | (optional) Button style variant |

**Used by:** `Navigation.jsx` — renders 4 nav items, Resume links to PDF.

---

### 10.2 `sections.js` → `sections`

| Property | Type | Description |
|----------|------|-------------|
| `id` | `string` | DOM `id` attribute and `data-section` value |
| `label` | `string` | Human-readable label |

**Used by:** `useActiveSection.js` — builds the `NAV_SECTION_MAP`.

---

### 10.3 `social.js` → `socialActions`

| Property | Type | Description |
|----------|------|-------------|
| `id` | `string` | Unique key |
| `label` | `string` | Button text |
| `href` | `string` | Link URL |
| `external` | `boolean` | Opens in new tab |
| `download` | `boolean` | (optional) Triggers file download |

**Used by:** `SocialActions.jsx` — renders 4 action buttons.

---

### 10.4 `contact.js` → `contactLinks`

| Property | Type | Description |
|----------|------|-------------|
| `id` | `string` | Unique key |
| `label` | `string` | Link display text |
| `href` | `string` | URL |
| `external` | `boolean` | Opens in new tab |

**Used by:** `Contact.jsx` (via `SocialActions`) — renders 4 contact links.

---

### 10.5 `journey.js` → `journeyStages` (4 items)

```typescript
interface JourneyStage {
  id: string           // 'foundation' | 'interface-builder' | 'system-builder' | 'product-engineer'
  stage: string        // '01' | '02' | '03' | '04'
  title: string        // Stage name
  year: string         // Year label
  description: string[] // Lines of description text
}
```

| Property | Type | Description |
|----------|------|-------------|
| `id` | `string` | Unique identifier |
| `stage` | `string` | Zero-padded stage number |
| `title` | `string` | Stage title |
| `year` | `string` | Year label |
| `description` | `string[]` | Multi-line description (empty strings = line breaks) |

**Used by:**
- `EngineeringJourney.jsx` — renders 4 `JourneyCard` + `JourneyProgress`
- `JourneyProgress.jsx` — renders stage labels and progress dots (2x `.map()`)
- `JourneyCard.jsx` — renders description lines via `.map()`

---

### 10.6 `projects.js` → `projects` (7 items)

```typescript
interface Project {
  id: string           // 'lms' | 'eyewear' | 'portfolio' | 'ecommerce' | 'dashboard' | 'oneplus' | 'interior'
  title: string        // Project display name
  url: string          // Live demo link
  category: string     // Category label
  tier: string         // Project classification (e.g. 'Enterprise System', 'Production Storefront')
  description: string  // One-line summary
  technologies: string[] // Tech stack
  contribution: string[] // Contribution list
  image: string        // Path to screenshot
}
```

| Property | Type | Description |
|----------|------|-------------|
| `id` | `string` | Unique key |
| `title` | `string` | Project name |
| `url` | `string` | Deployment URL |
| `category` | `string` | Category label |
| `tier` | `string` | Project scope classification (e.g. 'Enterprise System', 'Interactive R&D MVP') |
| `description` | `string` | One-line summary |
| `technologies` | `string[]` | Tech stack tags |
| `contribution` | `string[]` | Bullet list of contributions |
| `image` | `string` | Image path |

**Used by:**
- `Projects.jsx` — renders 7 `ProjectCard`
- `ProjectCard.jsx` — renders `contribution[]` and `technologies[]` via `.map()`
- `ProjectImage.jsx` — renders first 3 `technologies` as overlay tags via `.map()`

---

### 10.7 `experiences.js` → `experiences` (3 items)

```typescript
interface Experience {
  id: string           // 'streaming' | 'learning-ecosystem' | 'commerce'
  title: string        // Experience title
  category: string     // Category label
  role: string[]       // Role tags
  description: string  // Multi-sentence description
  stack: string[]      // Technology stack
  image: string        // Image path
}
```

| Property | Type | Description |
|----------|------|-------------|
| `id` | `string` | Unique key |
| `title` | `string` | Experience title |
| `category` | `string` | Category label |
| `role` | `string[]` | Role tags shown as chips |
| `description` | `string` | Full description text |
| `stack` | `string[]` | Tech stack tags |
| `image` | `string` | Image path |

**Used by:**
- `SelectedExperiences.jsx` — renders 3 `ExperienceCard`
- `ExperienceCard.jsx` — renders `role[]` and `stack[]` via `.map()`
- `ExperienceImage.jsx` — renders first 3 `stack` as overlay tags via `.map()`

---

### 10.8 `highlights.js` → `highlights` (4 items)

| Property | Type | Description |
|----------|------|-------------|
| `id` | `string` | Unique key |
| `title` | `string` | Principle name |
| `description` | `string` | One-line description |
| `tags` | `string[]` | Tag chips |

**Used by:**
- `EngineeringHighlights.jsx` — renders 4 `HighlightCard`
- `HighlightCard.jsx` — renders `tags[]` via `.map()`

---

### 10.9 `caseStudy.js` → `caseStudyPhases` (4 items)

Phases 1 & 4 (challenge, result) have `content`; phase 2 (approach) has `items[]`; phase 3 (implementation) has `groups[]`.

```typescript
type CaseStudyPhase = {
  id: string        // 'challenge' | 'approach' | 'implementation' | 'result'
  stage: string     // '01' | '02' | '03' | '04'
  label: string     // Phase display name
} & (
  | { content: string }
  | { items: string[] }
  | { groups: { label: string; value: string }[] }
)
```

| Property | Type | Used On |
|----------|------|---------|
| `id` | `string` | All phases |
| `stage` | `string` | All phases |
| `label` | `string` | All phases |
| `content` | `string` | Phase 1 (challenge), Phase 4 (result) |
| `items` | `string[]` | Phase 2 (approach) |
| `groups` | `{ label, value }[]` | Phase 3 (implementation) |

**Used by:**
- `CaseStudy.jsx` — renders 4 phase panels
- `CaseStudyPanels.jsx` — renders `items[]`, `groups[]`, and phases array via 3 separate `.map()` calls

---

### 10.10 Inline Data Arrays (Not in `src/data/`)

These are defined directly inside component files.

#### AmbientElements.jsx

```
CORNER_META = [
  { label: 'Portfolio', position: 'tl' },
  { label: '2026',      position: 'tr' },
]

STACK = ['React', 'Next.js', 'TypeScript', 'Systems']
```

| Array | Shape | Used For |
|-------|-------|----------|
| `CORNER_META` | `{ label: string, position: 'tl'\|'tr' }[]` | Top-left / top-right corner labels |
| `STACK` | `string[]` | Tech stack rail at bottom of hero |

#### IdentitySection.jsx

```
STATEMENT_LINES = [
  { words: ['I', "don't", 'just', 'build'],      accent: false },
  { words: ['interfaces.'],                       accent: false },
  { words: ['I', 'architect'],                    accent: false },
  { words: ['digital', 'systems.'],               accent: true  },
]
```

| Property | Type | Description |
|----------|------|-------------|
| `words` | `string[]` | Words in this line (each rendered as `<span data-word>`) |
| `accent` | `boolean` | If true, line gets `text-accent` + glow utility class |

#### BuildReel.jsx

```
TITLE_WORDS = ['Digital', 'Products', 'In', 'Motion']
```

Rendered as `<span data-reel-word>` inside an `<h2>`.

#### Contact.jsx

```
TITLE_WORDS = ["Let's", 'Build', 'Something', 'Meaningful']
```

Rendered as `<span data-contact-word>` inside an `<h2>`.

---

## 11. Data Flow Summary

```
src/data/*.js  ──import──►  Section Component  ──.map()──►  Sub-component  ──props──►  UI
                                     │
                                     ├── passes entire item as props
                                     ├── or passes individual fields
                                     └── or maps inline (tags, stack, roles, etc.)
```

- All data is **static** — imported at build time, no fetching, no state management.
- All arrays are **exported as named constants** and consumed directly.
- No data transformation layer — the raw export shapes match the component prop shapes.
- Inline arrays (`STATEMENT_LINES`, `TITLE_WORDS`, `CORNER_META`, `STACK`) stay co-located with their consuming component since they are presentation-only and unlikely to change independently.

### Mapping Summary Table

| Data Source | Array Length | Maps In |
|-------------|-------------|---------|
| `navigation.js` | 4 | `Navigation.jsx` |
| `sections.js` | 9 | `useActiveSection.js` (logic) |
| `social.js` | 4 | `SocialActions.jsx` |
| `contact.js` | 4 | `SocialActions.jsx` |
| `journey.js` | 4 | `EngineeringJourney.jsx`, `JourneyProgress.jsx`, `JourneyCard.jsx` |
| `projects.js` | 7 | `Projects.jsx`, `ProjectCard.jsx`, `ProjectImage.jsx` |
| `experiences.js` | 3 | `SelectedExperiences.jsx`, `ExperienceCard.jsx`, `ExperienceImage.jsx` |
| `highlights.js` | 4 | `EngineeringHighlights.jsx`, `HighlightCard.jsx` |
| `caseStudy.js` | 4 | `CaseStudy.jsx`, `CaseStudyPanels.jsx` (3 maps) |
| `STATEMENT_LINES` (inline) | 4 lines × words | `IdentitySection.jsx` (nested) |
| `TITLE_WORDS` (BuildReel) | 4 | `BuildReel.jsx` |
| `TITLE_WORDS` (Contact) | 4 | `Contact.jsx` |
| `CORNER_META` (inline) | 2 | `AmbientElements.jsx` |
| `STACK` (inline) | 4 | `AmbientElements.jsx` |

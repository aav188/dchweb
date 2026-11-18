---
name: IPO Educational Experience
colors:
  surface: '#faf8fe'
  surface-dim: '#dad9df'
  surface-bright: '#faf8fe'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f3f8'
  surface-container: '#eeedf3'
  surface-container-high: '#e9e7ed'
  surface-container-highest: '#e3e2e7'
  on-surface: '#1a1b1f'
  on-surface-variant: '#414753'
  inverse-surface: '#2f3034'
  inverse-on-surface: '#f1f0f5'
  outline: '#717785'
  outline-variant: '#c1c6d6'
  surface-tint: '#005cbb'
  primary: '#0059b5'
  on-primary: '#ffffff'
  primary-container: '#0071e3'
  on-primary-container: '#fcfbff'
  inverse-primary: '#abc7ff'
  secondary: '#5f5e60'
  on-secondary: '#ffffff'
  secondary-container: '#e2dfe1'
  on-secondary-container: '#636264'
  tertiary: '#0059b4'
  on-tertiary: '#ffffff'
  tertiary-container: '#0071e2'
  on-tertiary-container: '#fcfaff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d7e2ff'
  primary-fixed-dim: '#abc7ff'
  on-primary-fixed: '#001b3f'
  on-primary-fixed-variant: '#00458f'
  secondary-fixed: '#e4e2e4'
  secondary-fixed-dim: '#c8c6c8'
  on-secondary-fixed: '#1b1b1d'
  on-secondary-fixed-variant: '#474649'
  tertiary-fixed: '#d7e3ff'
  tertiary-fixed-dim: '#abc7ff'
  on-tertiary-fixed: '#001b3f'
  on-tertiary-fixed-variant: '#00458e'
  background: '#faf8fe'
  on-background: '#1a1b1f'
  surface-variant: '#e3e2e7'
typography:
  display-hero:
    fontFamily: Inter
    fontSize: 56px
    fontWeight: '700'
    lineHeight: 64px
    letterSpacing: -0.025em
  display-hero-mobile:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 42px
    letterSpacing: -0.02em
  headline-xl:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 34px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 17px
    fontWeight: '600'
    lineHeight: 22px
    letterSpacing: -0.005em
  body-lg:
    fontFamily: Inter
    fontSize: 19px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: -0.005em
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  code-inline:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-sm: 1rem
  margin: 3rem
  margin-sm: 1.25rem
  margin-md: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

The design system embodies an editorial, academic-yet-human aesthetic rooted in modern Human-Computer Interaction (HCI) theory. Tailored for computer science students, interface designers, and product researchers, it conveys rigor, technological calm, and deliberate craftsmanship.

The visual atmosphere balances pristine structure with tactile clarity:
- **Style Archetype:** Refined Modern Minimalist inspired by consumer-grade operating system ergonomics and editorial technology hardware portals.
- **Atmosphere:** Distraction-free, airy, hyper-structured, and high-legibility. Deep whitespace guides cognitive focus toward concepts such as affordance, mental models, Fitts's Law, and usability testing.
- **Core Emotional Drivers:** Intellectually reassuring, polished, direct, and frictionless.

## Colors

The palette establishes an immediate optical hierarchy through strict tonal separation, adhering rigorously to WCAG 2.2 Level AA and AAA contrast standards across all reading surfaces:

- **Primary (`#0071E3`):** Action blue reserved exclusively for interactive affordances: links, primary buttons, active roadmap states, and focus rings. 
- **Hover/Interactive Active (`#0077ED`):** An optical lift providing micro-feedback during press/hover states.
- **Deep Charcoal / Secondary (`#1D1D1F`):** High-contrast base for display titles, strong headlines, and essential UI framing. Surpasses 16:1 contrast ratio against the white ground.
- **Muted Neutral (`#6E6E73` / `#86868B`):** Secondary metadata, progress tracking labels, timestamps, and secondary captions.
- **Base Canvas (`#FFFFFF`):** Pure light background for reading focus and core card elevation.
- **Surface Layer (`#F5F5F7`):** Recessed canvas tone for body backgrounds, module groupings, code execution areas, and interactive sandbox wells.
- **Hairline Strokes (`#D2D2D7` / `#E5E5E7`):** Crisp structural dividers and soft card perimeters with optical subtlety.
- **Semantic Accents:**
  - Success/Mastered: `#1E8E3E` (Progression badges and verified heuristics)
  - Warning/Attention: `#F56300` (Cognitive load alerts, edge cases)
  - Critical/Error: `#D9381E` (Form validation, accessibility violations)

## Typography

The typography relies on precise optical tracking and geometric neutrality using **Inter** across all interface layers, supplemented by **JetBrains Mono** strictly for heuristic calculations, code blocks, and keyboard accelerators.

- **Weight Tension:** Contrast is achieved through pairing solid weights (`600` or `700`) with regular weights (`400`). Medium (`500`) is preserved for high-density navigation, chips, and microcopy.
- **Optical Kerning & Leading:** Tightened letter-spacing across larger sizes (`display-hero` through `headline-lg`) prevents optical drifting. Body prose maintains open leading (1.5x minimum) to optimize scanning performance for long educational articles.
- **Numbers & Metrics:** Tabular figures (`tnum`) must be enforced on progress timers, completion percentages, and quantitative HCI charts.

## Layout & Spacing

The layout is built upon a balanced 12-column responsive fluid grid with maximum content containment:

- **Max Container Width:** 1280px for standard learning dashboards; 980px strictly constrained for immersive reading modules to maintain optimal 65–75 character line length.
- **Desktop (1024px+):** 12 columns, 24px (`gutter`) gaps, and 48px (`margin`) outer canvas margins.
- **Tablet (768px - 1023px):** 8 columns, 20px gaps, and 32px outer canvas margins.
- **Mobile (Below 768px):** 4 columns, 16px (`gutter-sm`) gaps, and 20px (`margin-sm`) margins.
- **Rhythm Philosophy:** Whitespace acts as deliberate grouping. Related sub-elements align tightly using `space-xs` and `space-sm`, while educational modules, chapters, and roadmap phases are separated generously using `space-xl` and above to prevent cognitive overload.

## Elevation & Depth

Visual hierarchy does not use heavy dropshadows or skeuomorphic bevels. Instead, elevation uses clean tonal layering and glassmorphic blurs:

- **Level 0 (Base Canvas):** `#F5F5F7` backdrop tint for platform layout shells and non-interactive regions.
- **Level 1 (Card & Content Blocks):** `#FFFFFF` surfaces paired with a 1px border stroke of `#E5E5E7`. Hover transitions introduce a subtle ambient shadow: `0 4px 20px -2px rgba(0, 0, 0, 0.05)`.
- **Level 2 (Sticky Header & Navigation Bar):** Ultra-translucent `#FFFFFF` applied at 82% opacity with `backdrop-filter: blur(20px) saturate(180%)` and a 1px bottom border stroke of `#D2D2D7` at 50% opacity.
- **Level 3 (Flyouts, Menus & Dropdowns):** Floating panels with surface `#FFFFFF`, crisp hairline border `#E5E5E7`, and soft depth: `0 12px 32px -4px rgba(0, 0, 0, 0.08)`.
- **Level 4 (Modals & Interactive Lab Windows):** Deep focus dialogs centered over a smooth blurred backdrop `#000000` at 28% opacity, accompanied by `0 24px 48px -12px rgba(0, 0, 0, 0.14)`.

## Shapes

The geometric vocabulary prioritizes organic, calibrated rounding:
- **Base Corner Radius (8px / `0.5rem`):** Applied to form fields, nested tags, code syntax badges, and micro-interactions.
- **Intermediate Radius (12px / 16px):** Standard for content cards, interactive sandbox viewports, roadmap milestones, and modal wrappers.
- **Pill (Fully Rounded `9999px`):** Reserved exclusively for status indicators, roadmap tracking tags, search inputs, and primary pill-style action buttons.
- **Continuous Smoothing:** All rounded elements apply continuous curvature (squircle-like transitions) where hardware acceleration supports it, preventing harsh angular pivots.

## Components

### Buttons
- **Primary:** Background `#0071E3`, text `#FFFFFF`, font-weight `500`, padding `10px 20px`, fully rounded (pill) or `rounded-lg` (12px). Hover state transitions to `#0077ED`. Active state scales smoothly to `0.98`.
- **Secondary / Ghost:** Transparent background with `#0071E3` text or `#1D1D1F` text, enclosed by a 1px stroke `#D2D2D7`.
- **Focus Rings:** Unbroken 3px outer ring in `rgba(0, 113, 227, 0.45)` with 2px offset.

### Interactive Roadmap Nodes
- Connective pathways use 2px solid hairlines (`#E5E5E7` for pending, `#0071E3` for in-progress/completed).
- Node circles: 40px diameter.
  - *Completed:* `#0071E3` fill with white check icon.
  - *Current:* Pure `#FFFFFF` center, 3px ring in `#0071E3`, subtle pulsing glow.
  - *Locked:* `#F5F5F7` fill, 1px stroke `#D2D2D7`, muted padlock icon.
- Hover reveals a floating popover showing module duration, learning goals, and heuristic taxonomy tags.

### Progress Badges & Chips
- Heights: 24px (compact) or 32px (standard).
- Pill geometry with soft pastel fills and high-contrast typography:
  - *Design Heuristics Tag:* Background `#E8F2FD`, Text `#0071E3`.
  - *Evaluation Validated:* Background `#E6F5EA`, Text `#1E8E3E`.
  - *Draft / Exercise:* Background `#F5F5F7`, Text `#6E6E73`.

### Sticky Navigation & Dropdown Overlays
- Fixed height: 52px. Sub-pixel aligned, frosted glass surface (`backdrop-filter: blur(20px)`).
- Submenus expand with an ease-out opacity and slight vertical translation (from `-4px` to `0px`). Navigation anchors highlight via text color shift from `#6E6E73` to `#1D1D1F`.

### Interactive Learning Cards
- Surface `#FFFFFF` over `#F5F5F7` body. Border 1px `#E5E5E7`. Inner padding `24px`.
- Interactive evaluation cards include a header label (`label-sm`), descriptive title (`headline-md`), contextual UI preview sandbox, and bottom action bar with subtle metadata stats.

### Form Inputs & Selectors
- Background `#FFFFFF`, border 1px `#D2D2D7`, corner radius 10px.
- Padding: 12px 16px. Placeholder text `#86868B`.
- Error state: 1px border `#D9381E`, trailing validation icon, and assistive text in `#D9381E`.
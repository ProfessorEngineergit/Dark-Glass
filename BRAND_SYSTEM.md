# ProfessorEngineer / Dark Glass 2.3

Dark Glass is a dark precision instrument that reveals light through intent. It is the shared interface material for ProfessorEngineer products: measured enough for engineering software, expressive enough to feel authored, and quiet enough to keep the work—not the chrome—at the center.

## Brand idea

**Light is evidence of intent.** The interface starts restrained. It gains color, edge light, depth and motion only when a person focuses, points, selects or commits.

1. **Precision** — layouts are measured, hierarchy is explicit and data remains legible.
2. **Optical material** — glass communicates depth, grouping and control elevation.
3. **Directed expression** — gradient, shape and motion mark meaningful moments instead of decorating every surface.

The result should feel like an instrument coming alive under a hand: calm at rest, luminous in use, exact after the action.

## Identity architecture

- **Masterbrand:** `ProfessorEngineer` — one word in public lockups.
- **Evocative products:** short, ownable names such as `Caelum` and `Looksmith`.
- **Descriptive utilities:** direct capability names such as `OpenImageLabeler`.
- **Systems and materials:** short two-word names such as `Dark Glass`.
- Do not add `AI`, `Pro`, `X`, `Ultra` or version numbers unless they describe a real product tier.

## Voice

- Precise, curious, calm and confident.
- Lead with what the product enables, then explain the technology.
- Prefer concrete verbs: inspect, label, measure, render, calibrate, export.
- Avoid empty superlatives such as “revolutionary”, “futuristic” and “next-gen”.
- Button labels use sentence case and begin with a verb when possible.
- Do not describe the interface as “magical”. Show the capability and let the interaction prove it.

## Mark

The ProfessorEngineer mark shows a thinking human surrounded by an orbit of disciplines:

- `Σ` — mathematics and aggregation.
- `λ` and the orbital path — physics, signals and space.
- `{ }` — software systems.
- Chip and pulse — hardware and engineering.

Use `assets/professorengineer-mark.svg` only in the personal portfolio and owner-brand guidelines. It must not appear in the public Dark Glass product site. The compact favicon belongs to the portfolio repository, not to Dark Glass. Keep clear space equal to one quarter of the mark width. Do not recolor individual symbols, distort the square or place the mark directly on a visually busy photograph.

## Typography

- **Space Grotesk 600–700:** display headings and product titles.
- **Inter 400–600:** interface text, descriptions and long reading.
- **JetBrains Mono 400–500:** measurements, labels, statuses and keyboard commands.
- **Exo 2 500–700:** public-web orbital alternative for technical display moments.
- **Nasalization:** ProfessorEngineer signature and rare campaign moments only. Never use it for controls, paragraphs or dense product UI.
- **NotesESA:** sparse mission-note annotations only; never body copy or controls.

Nasalization and NotesESA are local specimens in the reference site. Do not distribute their binaries or embed them on the public web without appropriate licenses; the public fallback is Exo 2.

Display text may use tight tracking down to `-0.055em`. Body text stays between `1.5` and `1.75` line height. Uppercase is reserved for short monospaced metadata. The type system does not change between themes.

## Three themes, one system

Theme changes color temperature, not component structure. Layout, typography, radii, behavior, accessibility and material depth remain identical.

| Theme | Role | Canvas | Signal | Character |
| --- | --- | --- | --- | --- |
| **Aurora** | Primary brand | `#05060A` | Cyan → violet → magenta | Experimental, spatial, unmistakably Dark Glass |
| **Obsidian** | Pure-black mode | `#000000` | White → silver → graphite | Severe, focused, technical |
| **Lux** | Warm mode | `#17130F` | Parchment → amber → clay | Tactile, composed, quietly luxurious |

Aurora is the default in the website, product launches and general brand communication. Obsidian is for maximum focus and high-density technical work. Lux suits editorial, creative and conversational products. Do not mix theme palettes inside one interface. Status colors retain their meaning across all three.

White is a signal and text color, not a page or navigation background. Navigation always belongs to the active dark theme.

## Geometry: core first

Dark Glass uses **80–90% core geometry** and **10–20% expressive geometry**. Consistency comes from the core; character comes from a few deliberate exceptions.

### Core geometry

- 8px for controls, 12px for compact groups, 18px for standard surfaces and 28px for feature surfaces.
- Pill geometry is allowed for segmented navigation, tags, switches and short compact actions.
- Text buttons remain clean rectangles or pills. A button must never distort its label to advertise expressiveness.
- Dense data, forms, menus, cards and repeated lists always use core geometry.

### Expressive geometry

Use named, normalized SVG shapes from the Material 3 Expressive shape family. The approved Dark Glass set is **Square, Pill, Arch, Diamond, Cookie 4 and Soft Burst**. These are constructed paths, not arbitrary CSS percentage radii.

| Shape | Character | Approved uses |
| --- | --- | --- |
| Square | Stable | neutral icon fields, anchors, system state |
| Pill | Continuous | modes, ranges, compact navigation |
| Arch | Open | entry points, discover, launch |
| Diamond | Exact | focus, precision, selected tools |
| Cookie 4 | Generative | creative tools, transformation, feature moments |
| Soft Burst | Signal | attention, success, rare emphasis |

Use expressive shapes for icon containers, key feature objects and selected states. Use no more than one expressive family in a local decision area. Do not place paragraphs inside them, turn every icon into one, or animate them continuously. Never invent blobs with percentage-based `border-radius` values.

## Material and Liquid Glass

Glass is a functional control layer, not a translucent wallpaper. It must reveal a structured scene behind it so blur and refraction have visible meaning.

| Depth | Use | Fill | Blur |
| --- | --- | ---: | ---: |
| Air | Ambient structure | 0% | 0px |
| Quiet | Navigation and grouping | 5.5% | 16px |
| Base | Cards and controls | 7.5% | 24px |
| Raised | Menus and inspectors | 9.5% | 32px |
| Focus | Active decisions and hero surfaces | 11.5% | 40px |

### Liquid rules

- Use one floating liquid control plane per local composition. Never stack glass on glass.
- The plane combines backdrop blur, saturation, slight contrast and brightness, a translucent theme tint, a one-pixel inner edge and an adaptive shadow.
- Pointer position drives a local lens: the nearest border and internal highlight brighten while the center remains quiet and readable.
- Refraction responds to interaction; it does not run as a decorative loop.
- Larger controls may appear optically thicker through deeper shadow and stronger lensing, never through lower text contrast.
- Navigation is Quiet or Liquid and always uses the current dark theme. It is never an opaque white bar.
- Provide an opaque theme-surface fallback when `backdrop-filter` is unavailable.
- Use no more than three depth levels in one viewport.

CSS backdrop filtering approximates optical refraction. If a product has access to a native material or GPU shader, preserve the same hierarchy and interaction law rather than adding stronger distortion.

## Components

### Buttons

- One primary button per decision area; the Aurora gradient is its default signal treatment.
- Secondary buttons support the primary path. Quiet buttons are for optional or reversible actions. Danger buttons are only for irreversible actions.
- Hover follows one law: local edge light tracks the pointer while gradient position, border and shadow respond. The control and its content never move.
- Hover lift, magnetic movement and hover scale are all zero. Dimensionality comes from light on the top and side edges plus a darker lower seam.
- Pointer light resets completely on pointer exit, cancellation, window blur and visibility loss.
- Press settles immediately to approximately `0.985` scale and restores on release.
- Minimum target size is 44 × 44px. Small desktop-toolbar controls need equivalent surrounding hit space.
- Icon-only controls require an accessible name and a tooltip in product interfaces.
- Expressive SVG contours may sit behind icon-only feature actions, but never replace the standard text-button silhouette.

### Menus and navigation

- Navigation stays Quiet; command menus are Raised.
- Group commands by user intent, not implementation module.
- Keyboard shortcuts are displayed in JetBrains Mono.
- Keep navigation labels to one or two words.
- Selected items gain localized light or accent. Do not create a second glass layer.

### Inputs

- Labels stay visible; placeholders are examples, never replacements for labels.
- Focus uses the active theme accent plus a soft three-pixel ring.
- Validation appears beside the field and never depends on color alone.
- Inputs retain core geometry in every state.

### Feedback

- Stable/success uses mint, active work uses cyan, warnings use warm and errors use danger.
- Progress indicators show a numeric value when duration is knowable.
- Do not block the interface with a decorative loader. After 800ms, show useful progress or allow background execution.

## Motion law

Use `cubic-bezier(.2,.8,.2,1)` as the shared settling curve and `cubic-bezier(.34,1.56,.64,1)` only for short expressive emphasis.

- **90ms:** contact acknowledgment and press.
- **160ms:** button, switch and focus state.
- **280ms:** menu, inspector, gradient or spatial shift.
- **420ms:** section reveal.
- **700ms:** sparse ambient scene movement only.

At rest, controls are still. Hover reveals material; press confirms contact; release settles. Shape changes happen only when they explain a real state transition. No permanent wobble, breathing buttons, random morphing or decorative movement behind reading content.

Respect `prefers-reduced-motion`: remove shape morphs and spatial parallax while preserving instant state, focus and contrast feedback. Magnetic movement is never part of Dark Glass.

## Dark Glass Arrow Font

Navigation is drawn like a companion typeface, not an illustration set. Every glyph uses a 24px grid, a 1.7px optical stroke, square terminals and miter joins. Straight arrows share the same 5px head at exactly 45 degrees; curved history arrows use tangent-aligned heads with the same optical mass. This makes the marks align with the engineered rhythm of Space Grotesk instead of looking like unrelated Unicode characters.

The 32-glyph set is divided into four functional families:

- **Direction:** four cardinal and four diagonal arrows.
- **Flow:** turn, return, horizontal/vertical swap, enter and exit.
- **History:** undo, redo, revert, reapply, refresh, restart and step navigation.
- **System:** external, expand, contract, download, upload, loop and convergence.

Use the same SVG symbol everywhere, including large editorial arrows, inline link marks and 16px toolbar controls. Do not substitute Unicode arrows, mix rounded and square terminals, add orbital decoration or place routine glyphs inside decorative colored tiles.

## Dimensionality ladder

Build depth in a fixed order: plane fill and border; then a bright top edge; then light on both side edges plus a dark lower seam; finally a localized pointer lens. Do not add vertical translation at any level.

## Accessibility

- Maintain WCAG AA contrast for text and controls in all three themes.
- Keep interactive targets at least 44px where practical.
- Support keyboard navigation, visible focus and semantic HTML.
- Never disable browser zoom.
- Glass surfaces must remain understandable when `backdrop-filter` is unsupported.
- Do not encode status through color, glow, motion or shape alone.

## Reuse

`dark-glass.css` contains the framework-independent implementation. `design-tokens.json` is the machine-readable source for models, design tools and other codebases. `AGENT_BRAND_BRIEF.md` is the concise implementation contract for models and collaborators. `BRAND_SYSTEM.md` defines the decisions that must survive framework changes. The live website is the visual and interactive reference.

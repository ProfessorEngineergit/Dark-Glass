# ProfessorEngineer / Dark Glass 2.1

Dark Glass is the shared interface material for ProfessorEngineer products. It should make software feel precise, dimensional and human without looking like a copy of another operating system or AI product.

## Brand idea

**Engineered from light.** ProfessorEngineer connects software, science and physical engineering. Interfaces should therefore combine three qualities:

1. **Scientific precision** — measured layouts, clear hierarchy, legible data.
2. **Optical depth** — glass is a functional material that communicates elevation.
3. **Human curiosity** — warm details and expressive product objects prevent sterile “tech” aesthetics.

## Identity architecture

- **Masterbrand:** `ProfessorEngineer` — one word in public lockups.
- **Evocative products:** short, ownable names such as `Caelum` and `Looksmith`.
- **Descriptive utilities:** direct capability names such as `OpenImageLabeler`.
- **Systems and materials:** short two-word names such as `Dark Glass`.
- Do not add `AI`, `Pro`, `X`, `Ultra` or version numbers to names unless they describe a real product tier.

## Voice

- Precise, curious, calm and confident.
- Lead with what a product enables, then explain the technology.
- Prefer concrete verbs: inspect, label, measure, render, calibrate, export.
- Avoid empty superlatives such as “revolutionary”, “futuristic” and “next-gen”.
- Button labels use sentence case and begin with a verb when possible.

## Mark

The ProfessorEngineer mark shows a thinking human surrounded by an orbit of disciplines:

- `Σ` — mathematics and aggregation.
- `λ` and the orbital path — physics, signals and space.
- `{ }` — software systems.
- Chip and pulse — hardware and engineering.

Use `assets/professorengineer-mark.svg` only in the personal portfolio and in owner-brand guidelines. It must not appear in the public Dark Glass product site. The compact favicon belongs to the portfolio repository, not to Dark Glass. Keep clear space equal to one quarter of the mark width. Do not recolor individual symbols, distort the square or place the mark directly on a visually busy photograph.

## Typography

- **Space Grotesk 600–700:** display headings and product titles.
- **Inter 400–600:** interface text, descriptions and long reading.
- **JetBrains Mono 400–500:** measurements, labels, statuses and keyboard commands.
- **Nasalization:** ProfessorEngineer signature and rare campaign moments only. Never use it for controls, paragraphs or dense product UI.

Display text may use tight tracking down to `-0.055em`. Body text stays between `1.5` and `1.75` line height. Uppercase is reserved for short monospaced metadata.

## Color

The core canvas is Obsidian `#05070D`. Signal white `#F4F7FB` is the primary text color. Photon cyan `#5EE7FF` is the default interactive light, field violet `#8B7CFF` carries spatial depth, and magenta `#FF6AD5` completes the aurora spectrum.

Mint `#5FF0BC` means valid, stable or connected. Warm `#FFE2A6` provides human emphasis. Danger `#FF7085` is reserved for destructive or failed states.

Product skins may add one ownable accent, but the Obsidian base, signal white and Dark Glass elevation system remain shared.

## Material rules

| Depth | Use | Fill | Blur |
| --- | --- | ---: | ---: |
| Air | Ambient structure | 0% | 0px |
| Quiet | Navigation and grouping | 4% | 16px |
| Base | Cards and controls | 6% | 24px |
| Raised | Menus and inspectors | 8% | 32px |
| Focus | Active decisions and hero surfaces | 10% | 40px |

- Every surface needs visible content behind it; otherwise blur has no material meaning.
- Use no more than three material depths in one viewport.
- The nearest edge brightens around the pointer. The whole card must not glow uniformly.
- Prefer one-pixel hairlines with 10–18% white rather than heavy borders.
- Radius communicates scale: 8px controls, 12px compact groups, 18px standard surfaces and 28px feature surfaces. Expressive contours are reserved for the semantic roles defined below.

## Field Geometry

Field Geometry is the ownable Dark Glass shape language. It combines **mass** and **charge** so that form communicates interface meaning instead of acting as decoration.

- **Mass** expresses hierarchy through size, blur, elevation, shadow and apparent material thickness. Quiet objects have low mass; a consequential focus control may have high mass.
- **Charge** expresses live state through accent, edge light and contour tension. Neutral, intent, valid and alert states must each differ through more than color.
- A shape may flex to fit content, but its semantic role must remain recognizable.
- Prefer one expressive object per decision area. Standard geometry remains the default for dense data and repeated content.

| Shape | Meaning | Primary uses |
| --- | --- | --- |
| Orbit | Observe | Inspection, identity, spatial focus |
| Flow | Continue | Navigation, ranges, ongoing processes |
| Bloom | Create | Primary creation and transformation |
| Dock | Group | Attached tools and related actions |
| Beacon | Signal | Direction, notification and time-sensitive attention |

### Shape behavior

- Rest states are compact and visually balanced.
- Intent may shift the nearest edge, increase charge and open an asymmetric contour.
- Commit resolves into the role-specific shape and confirms with motion, text or icon—not color alone.
- Shape morphs use the spring curve `cubic-bezier(.34,1.56,.64,1)` and normally settle within 280ms.
- Never randomize border radii. Avoid unrelated blobs, inflated pills and decorative morphing behind reading content.

### Liquid control plane

Liquid Glass is a functional control layer above content. It lenses the environment with blur, saturation, inner highlights and adaptive shadow while keeping labels immediately legible.

- Keep one floating liquid plane in a local composition. Do not stack glass on glass.
- Content surfaces remain stable; navigation and controls may float above them.
- The edge nearest the pointer may brighten. The center stays quiet so text does not lose contrast.
- Larger, more consequential controls may use deeper shadow and stronger refraction to appear thicker.
- A liquid component needs a solid-color fallback when `backdrop-filter` is unavailable.
- Use Flow for floating docks, Bloom for creation, Dock for attached actions and Orbit for inspection controls.

## Components

### Buttons

- One primary button per decision area.
- Secondary buttons support the primary path.
- Quiet buttons are for optional or reversible actions.
- Danger buttons are only for irreversible actions.
- Minimum target size is 44 × 44px; small buttons are allowed in dense desktop toolbars only when the toolbar itself provides sufficient spacing.
- Icon-only controls always need an accessible name and a tooltip in product interfaces.
- Bloom buttons are reserved for creation or transformation. Do not use the expressive primary shape for ordinary confirmation.

### Menus and navigation

- Navigation stays Quiet; command menus are Raised.
- Group commands by user intent, not implementation module.
- Keyboard shortcuts are displayed in JetBrains Mono.
- Keep navigation labels to one or two words.
- Floating navigation uses one Flow-shaped liquid dock. Selected items gain charge without creating a second glass layer.

### Inputs

- Labels stay visible; placeholders are examples, never replacements for labels.
- Focus uses the current product accent plus a soft three-pixel ring.
- Validation appears beside the field and never depends on color alone.

### Feedback

- Stable/success uses mint, active work uses cyan, warnings use warm, errors use danger.
- Progress indicators show a numeric value when the duration is knowable.
- Do not block the interface with a decorative loader. If an operation lasts longer than 800ms, show useful progress or allow background execution.

## Motion

Use `cubic-bezier(.2,.8,.2,1)` as the shared settling curve.

- 90ms: instant acknowledgment.
- 160ms: buttons, switches and control state.
- 280ms: menus, inspectors and layout shifts.
- 420ms: section reveal.
- 700ms: ambient motion only.

Respect `prefers-reduced-motion`. Motion must explain state, hierarchy or physics; it must not delay access.

## Accessibility

- Maintain WCAG AA contrast for text and controls.
- Keep all interactive targets at least 44px where practical.
- Support keyboard navigation, visible focus and semantic HTML.
- Never disable browser zoom.
- Glass surfaces must remain understandable when `backdrop-filter` is unsupported.
- Do not encode status through color alone.

## Reuse

`dark-glass.css` contains the tokens and framework-independent components. `design-tokens.json` is the machine-readable source for models, design tools and other codebases. The live website is the visual reference for intended hierarchy and behavior.

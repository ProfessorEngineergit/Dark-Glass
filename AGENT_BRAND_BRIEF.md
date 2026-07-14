# Dark Glass 2.3 — Agent Brand Brief

Use this file as the implementation contract for any Dark Glass interface. The visual reference is `index.html`; the reusable components are in `dark-glass.css`; exact values are in `design-tokens.json`.

## Non-negotiable identity

- Default to **Aurora**: near-black canvas, cyan → violet → magenta signal gradient.
- **Obsidian** is the pure-black, low-chroma mode. **Lux** is smoked warm glass with parchment and clay light.
- White is text, an optical edge or a signal. It is never a page or navigation background.
- Use Space Grotesk for standard display, Inter for body and controls, and JetBrains Mono for measurements and status.
- Exo 2 is the web-ready orbital alternative. Nasalization and NotesESA are local specimens only unless the product has the necessary webfont licenses.

## Interaction contract

```yaml
hover:
  lift: 0px
  scale: 1
  contentMovement: forbidden
  allowedChanges: [local-edge-light, gradient-position, border, shadow, color]
press:
  scale: 0.985
pointerExit:
  resetGlowOpacity: true
  resetCoordinates: center
motion:
  instant: 90ms
  control: 160ms
  shift: 280ms
  reveal: 420ms
  atmosphere: 700ms
```

Hover reveals a surface; it never relocates it. Pointer light must disappear completely on `pointerleave`, `pointercancel`, window blur and document visibility loss. Never leave the last pointer-position radial visible at rest.

## Material contract

| Level | Fill | Blur | Use |
| --- | ---: | ---: | --- |
| Air | 0% | 0px | atmospheric structure |
| Quiet | 5.5% | 16px | navigation, grouping |
| Base | 7.5% | 24px | cards, controls |
| Raised | 9.5% | 32px | menus, inspectors |
| Focus | 11.5% | 40px | active decisions |
| Liquid | 9.5% | 28px | one floating control plane |

Use no more than three levels in one viewport. Dimensionality should progress through: fill and border → top edge → all-side inset light with dark lower seam → localized pointer lens. The silhouette stays still at every level.

## Geometry and components

- Core geometry: 8px controls, 12px compact groups, 18px surfaces, 28px features, pill only for short segmented controls.
- Use core geometry for 80–90% of an interface.
- Use named expressive shapes only for the remaining 10–20%: Square, Pill, Arch, Diamond, Cookie 4 and Soft Burst.
- Text buttons retain a stable rectangle or pill. Never place paragraphs inside expressive shapes.
- One primary action per decision area. Labels use sentence case and start with a concrete verb.
- One liquid plane per local composition. Never stack glass on glass.

## Dark Glass Arrow Font

Use the 32 inline symbols from `index.html` for direction, flow, history and system actions. The reusable class is `.dg-arrow-icon`.

- 24px grid, 1.7px optical stroke.
- Square terminals and miter joins. Straight arrows use 5px heads at 45 degrees; curved heads follow the tangent with equal optical mass.
- Minimum rendered size: 16px. Standard UI: 18–24px. Editorial arrows: 32px or larger.
- Use `arrow-*` for direction; `turn-*`, `return-*`, `swap-*`, `enter` and `exit` for flow; `undo`, `redo`, `revert-*`, `refresh` and `restart` for history.
- Use the exact same symbol in the cover, links and controls. Never replace it with a Unicode arrow or an unrelated icon library glyph.
- Keep icon-only controls accessible with a name and product tooltip.

## Reuse recipe

```html
<html data-theme="aurora">
  <head>
    <link rel="stylesheet" href="dark-glass.css">
  </head>
  <body>
    <button class="dg-button dg-button--primary dg-glow" data-glow>
      Calibrate field
    </button>
  </body>
</html>
```

If pointer-reactive light is used, copy the glow controller from `script.js`. Do not reintroduce magnetic movement or `translateY` on hover.

## Review checklist

- No white navigation or white canvas.
- No hover lift, magnetic drift or text movement.
- Pointer light fully resets after the pointer leaves.
- No more than one liquid plane per composition and three depth levels per viewport.
- Body copy remains Inter; status and measurements remain JetBrains Mono.
- Nasalization and NotesESA are not shipped as webfont files without licenses.
- Navigation uses `.dg-arrow-icon`; no Unicode arrows or ornamental space glyphs.
- Keyboard focus, semantic labels, reduced motion and a non-blur fallback remain intact.

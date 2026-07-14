# Dark Glass 2.3

Dark Glass is the ProfessorEngineer interface material and public brand manual: **a dark precision instrument that reveals light through intent**. The static website documents three coordinated themes, optical material, core components, named expressive shapes and one consistent interaction law.

## The system

- **Aurora** is the primary identity: near-black with a cyan–violet–magenta gradient.
- **Obsidian** is pure black with restrained white and silver signals.
- **Lux** is warm smoked glass with parchment, amber and clay light.
- **Core geometry** carries 80–90% of the interface: buttons, inputs, menus, cards and data.
- **Expressive geometry** carries 10–20%: selected icon fields and feature moments using Square, Pill, Arch, Diamond, Cookie 4 and Soft Burst SVG shapes.
- **Liquid Glass** is an interactive control plane with real backdrop blur, theme tint, localized pointer light and restrained lensing.
- **Stable interaction** keeps every control in place: hover changes edge light and depth, never position.
- **Space Glyphs** add sixteen original orbital arrows, rails and technical interface symbols.

Text buttons always use stable core geometry. The system contains no arbitrary percentage-radius blobs, decorative morph loops or white navigation surfaces.

## What is included

- `index.html` — interactive brand guideline, theme switcher, shape atlas, component library and material lab.
- `dark-glass.css` — reusable themes, material depths, Liquid Glass behavior and components.
- `style.css` — responsive art direction and print treatment for the guideline.
- `script.js` — theme state, pointer-reactive light, material controls and chapter navigation.
- `design-tokens.json` — machine-readable theme, type, spacing, geometry, material, interaction and motion values.
- `BRAND_SYSTEM.md` — identity, voice, geometry, Liquid Glass, component and motion rules.
- `AGENT_BRAND_BRIEF.md` — concise implementation contract for models and collaborators.
- `assets/` — Dark Glass and product artwork. The personal ProfessorEngineer mark is intentionally excluded from the public Dark Glass site.

## Preview locally

Run a static server in this directory and open the shown localhost URL. No package installation is required.

```sh
python3 -m http.server 4173
```

## Use in another product

Copy `dark-glass.css`, load it after your reset and choose a theme on the document root. Aurora is the default.

```html
<html data-theme="aurora">
  <head>
    <link rel="stylesheet" href="dark-glass.css">
  </head>
  <body>
    <article class="dg-glass dg-glass--raised dg-glow" data-glow>
      <span class="dg-badge dg-badge--success">Stable</span>
      <button class="dg-button dg-button--primary dg-glow" data-glow>
        Calibrate
      </button>
    </article>

    <nav class="dg-liquid dg-liquid-dock dg-glow" data-glow aria-label="View">
      <button class="is-active" aria-pressed="true">Field</button>
      <button aria-pressed="false">Depth</button>
    </nav>
  </body>
</html>
```

Switch the root attribute to `obsidian` or `lux` without changing component markup. The website’s `script.js` is the reference for the optional pointer-reactive `--mx`, `--my`, `--glow-opacity`, wave sliders and material-lab controls. It deliberately resets every pointer light and contains no magnetic hover movement.

Expressive shapes are normalized SVG symbols, not CSS border-radius recipes. Reuse the approved symbols from `index.html` for icon-only feature moments; keep text actions on `.dg-button`.

## GitHub Pages

The repository deploys directly from its root without a build step. In GitHub, choose **Settings → Pages → Deploy from a branch**, then `main` and `/ (root)`.

## License

See `LICENSE`.

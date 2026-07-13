# Dark Glass 2.0

Dark Glass is the ProfessorEngineer interface material, component vocabulary and public brand showcase. It is a static website that deploys directly to GitHub Pages without a build step.

## What is included

- `index.html` — public system showcase and interactive component reference.
- `dark-glass.css` — reusable design tokens and component styles.
- `style.css` — layout and art direction for the showcase website.
- `script.js` — pointer light, responsive navigation, component tabs and the material lab.
- `design-tokens.json` — machine-readable colors, type, spacing, radius, material and motion decisions.
- `BRAND_SYSTEM.md` — naming, voice, identity and component rules.
- `assets/` — Caelum, Looksmith, OpenImageLabeler and Dark Glass product icons. The owner mark is retained only for the separate brand-guideline context.

## Preview locally

Run a static server in this directory and open the shown localhost URL. No package installation is required.

```sh
python3 -m http.server 4173
```

## Use in another product

Copy `dark-glass.css`, link it after your reset, then use a material depth and component class:

```html
<link rel="stylesheet" href="dark-glass.css">

<article class="dg-glass dg-glass--raised dg-glow" data-glow>
  <span class="dg-badge dg-badge--success">Stable</span>
  <button class="dg-button dg-button--primary">Calibrate</button>
</article>
```

The website's `script.js` provides the optional pointer-reactive edge for `[data-glow]`. Product code can copy `attachPointerLight` or implement the same `--mx`, `--my` and `--glow-opacity` variables in its own framework.

## GitHub Pages

The repository is designed for GitHub Pages from the repository root. In GitHub, select **Settings → Pages → Deploy from a branch**, then choose `main` and `/ (root)`.

## License

See `LICENSE`.

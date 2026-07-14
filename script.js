(() => {
  'use strict';

  const root = document.documentElement;
  const menu = document.querySelector('#guide-menu');
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const finePointer = window.matchMedia('(pointer: fine)');

  const themeColors = {
    aurora: '#05060A',
    obsidian: '#000000',
    lux: '#17130F',
  };

  const themeSwitches = Array.from(document.querySelectorAll('[data-theme-switch]'));

  function setTheme(theme, persist = true) {
    const nextTheme = Object.hasOwn(themeColors, theme) ? theme : 'aurora';
    root.dataset.theme = nextTheme;

    themeSwitches.forEach((control) => {
      const isActive = control.dataset.themeSwitch === nextTheme;
      control.classList.toggle('is-active', isActive);
      control.setAttribute('aria-pressed', String(isActive));
    });

    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', themeColors[nextTheme]);

    if (persist) {
      try {
        window.localStorage.setItem('dark-glass-theme', nextTheme);
      } catch {
        // The theme still works when storage is unavailable.
      }
    }
  }

  let initialTheme = root.dataset.theme || 'aurora';
  try {
    initialTheme = window.localStorage.getItem('dark-glass-theme') || initialTheme;
  } catch {
    // Use the authored default.
  }
  setTheme(initialTheme, false);

  themeSwitches.forEach((control) => {
    control.addEventListener('click', () => setTheme(control.dataset.themeSwitch));
  });

  function closeMenu() {
    menu?.classList.remove('is-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.setAttribute('aria-label', 'Open chapters');
  }

  menuToggle?.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Open chapters' : 'Close chapters');
    menu?.classList.toggle('is-open', !isOpen);
  });

  menu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  const glowSurfaces = Array.from(document.querySelectorAll('[data-glow]'));
  let activeGlowSurface = null;

  function resetPointerLight(surface) {
    if (!surface) return;
    surface.classList.remove('is-pointer-active');
    surface.style.setProperty('--glow-opacity', '0');
    surface.style.setProperty('--mx', '50%');
    surface.style.setProperty('--my', '50%');
    if (activeGlowSurface === surface) activeGlowSurface = null;
  }

  function resetAllPointerLights() {
    glowSurfaces.forEach(resetPointerLight);
  }

  if (finePointer.matches) {
    glowSurfaces.forEach((surface) => {
      const updatePointerLight = (event) => {
        if (activeGlowSurface && activeGlowSurface !== surface) resetPointerLight(activeGlowSurface);
        const bounds = surface.getBoundingClientRect();
        activeGlowSurface = surface;
        surface.classList.add('is-pointer-active');
        surface.style.setProperty('--mx', `${event.clientX - bounds.left}px`);
        surface.style.setProperty('--my', `${event.clientY - bounds.top}px`);
        surface.style.setProperty('--glow-opacity', '1');
      };

      surface.addEventListener('pointerenter', updatePointerLight, { passive: true });
      surface.addEventListener('pointermove', updatePointerLight, { passive: true });
      surface.addEventListener('pointerleave', () => resetPointerLight(surface), { passive: true });
      surface.addEventListener('pointercancel', () => resetPointerLight(surface), { passive: true });
      surface.addEventListener('lostpointercapture', () => resetPointerLight(surface), { passive: true });
      surface.addEventListener('blur', () => resetPointerLight(surface), true);
    });

    document.addEventListener('pointermove', (event) => {
      const nextSurface = event.target instanceof Element ? event.target.closest('[data-glow]') : null;
      if (activeGlowSurface && activeGlowSurface !== nextSurface) resetPointerLight(activeGlowSurface);
    }, { capture: true, passive: true });
  }

  window.addEventListener('blur', resetAllPointerLights);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) resetAllPointerLights();
  });

  const chapterLinks = Array.from(menu?.querySelectorAll('a') ?? []);
  const chapterSections = chapterLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  function updateActiveChapter() {
    const readingLine = window.scrollY + window.innerHeight * .38;
    const current = [...chapterSections]
      .reverse()
      .find((section) => section.offsetTop <= readingLine);

    chapterLinks.forEach((link) => {
      const isActive = Boolean(current) && link.getAttribute('href') === `#${current.id}`;
      link.classList.toggle('is-active', isActive);
      if (isActive) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }

  let activeTick = 0;
  window.addEventListener('scroll', () => {
    if (activeTick) return;
    activeTick = window.requestAnimationFrame(() => {
      updateActiveChapter();
      activeTick = 0;
    });
  }, { passive: true });
  updateActiveChapter();

  const labModes = {
    field: {
      kicker: 'FIELD / OPTICAL RESPONSE',
      title: 'Light follows\nintent.',
      copy: 'Move through the material. The nearest edge catches light while content remains still.',
    },
    depth: {
      kicker: 'DEPTH / HIERARCHY',
      title: 'Blur defines\nelevation.',
      copy: 'Raise only the active decision plane. Greater blur means greater functional separation.',
    },
    signal: {
      kicker: 'SIGNAL / FOCUS',
      title: 'Color reveals\nstate.',
      copy: 'A focused accent confirms selection while the surrounding material remains quiet.',
    },
  };

  document.querySelectorAll('.dg-liquid-dock').forEach((dock) => {
    const stage = dock.closest('[data-material-lab]');
    const items = Array.from(dock.querySelectorAll('[data-dock-item]'));
    const kicker = stage?.querySelector('[data-lab-kicker]');
    const title = stage?.querySelector('[data-lab-title]');
    const copy = stage?.querySelector('[data-lab-copy]');

    const selectMode = (item) => {
      const mode = item.dataset.mode || item.textContent.trim().toLowerCase();
      const content = labModes[mode] || labModes.field;

      items.forEach((candidate) => {
        const isSelected = candidate === item;
        candidate.classList.toggle('is-active', isSelected);
        candidate.setAttribute('aria-pressed', String(isSelected));
      });

      if (stage) stage.dataset.demoMode = mode;
      if (kicker) kicker.textContent = content.kicker;
      if (title) {
        const [firstLine, secondLine] = content.title.split('\n');
        title.replaceChildren(firstLine, document.createElement('br'), secondLine);
      }
      if (copy) copy.textContent = content.copy;
    };

    items.forEach((item) => item.addEventListener('click', () => selectMode(item)));
  });

  document.querySelectorAll('[data-material-lab]').forEach((stage) => {
    const page = stage.closest('.guide-page') || document;
    const blur = page.querySelector('[data-material-blur]');
    const lens = page.querySelector('[data-material-lens]');
    const blurOutput = page.querySelector('[data-blur-output]');
    const lensOutput = page.querySelector('[data-lens-output]');
    const reset = page.querySelector('[data-material-reset]');
    const liveLens = stage.querySelector('[data-live-lens]');
    const createField = stage.querySelector('[data-create-field]');

    const updateMaterial = () => {
      const blurValue = Number(blur?.value || 28);
      const lensValue = Number(lens?.value || 62);
      stage.style.setProperty('--demo-blur', `${blurValue}px`);
      stage.style.setProperty('--demo-lens', String(lensValue / 100));
      if (blurOutput) blurOutput.textContent = `${blurValue}px`;
      if (lensOutput) lensOutput.textContent = `${lensValue}%`;
      blur?.setAttribute('aria-valuetext', `${blurValue} pixels`);
      lens?.setAttribute('aria-valuetext', `${lensValue} percent`);
    };

    blur?.addEventListener('input', updateMaterial);
    lens?.addEventListener('input', updateMaterial);
    liveLens?.addEventListener('change', () => {
      stage.classList.toggle('is-lens-off', !liveLens.checked);
    });

    reset?.addEventListener('click', () => {
      if (blur) blur.value = blur.defaultValue;
      if (lens) lens.value = lens.defaultValue;
      if (liveLens) liveLens.checked = true;
      stage.classList.remove('is-lens-off');
      updateMaterial();
    });

    createField?.addEventListener('click', () => {
      stage.classList.remove('is-pulsing');
      window.requestAnimationFrame(() => stage.classList.add('is-pulsing'));
      window.setTimeout(() => stage.classList.remove('is-pulsing'), 760);
    });

    updateMaterial();
  });

  document.querySelectorAll('[data-wave-slider]').forEach((slider) => {
    const input = slider.querySelector('input[type="range"]');
    const rail = slider.querySelector('[data-wave-rail]');
    const output = slider.querySelector('output');
    const count = Number(slider.dataset.segments || 28);

    if (!input || !rail) return;

    const segments = Array.from({ length: count }, (_, index) => {
      const segment = document.createElement('i');
      segment.style.setProperty('--wave-index', index);
      segment.style.setProperty('--wave-y', `${Math.sin((index / (count - 1)) * Math.PI * 4) * 7}px`);
      rail.append(segment);
      return segment;
    });

    const updateWave = () => {
      const minimum = Number(input.min || 0);
      const maximum = Number(input.max || 100);
      const value = Number(input.value);
      const progress = (value - minimum) / (maximum - minimum);
      const activeSegments = Math.round(progress * (segments.length - 1));
      segments.forEach((segment, index) => segment.classList.toggle('is-active', index <= activeSegments));
      slider.style.setProperty('--wave-progress', `${progress * 100}%`);
      if (output) output.value = `${Math.round(progress * 100)}%`;
    };

    input.addEventListener('input', updateWave);
    updateWave();
  });

  document.querySelectorAll('[data-copy-code]').forEach((button) => {
    button.addEventListener('click', async () => {
      const snippet = document.querySelector(button.dataset.copyCode);
      if (!snippet) return;

      try {
        await navigator.clipboard.writeText(snippet.textContent.trim());
        const original = button.textContent;
        button.textContent = 'Copied';
        window.setTimeout(() => { button.textContent = original; }, 1400);
      } catch {
        snippet.focus();
      }
    });
  });
})();

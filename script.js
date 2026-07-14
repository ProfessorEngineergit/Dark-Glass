(() => {
  'use strict';

  const root = document.documentElement;
  const menu = document.querySelector('#guide-menu');
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const finePointer = window.matchMedia('(pointer: fine)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

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

  if (finePointer.matches) {
    document.querySelectorAll('[data-glow]').forEach((surface) => {
      const updatePointerLight = (event) => {
        const bounds = surface.getBoundingClientRect();
        surface.classList.add('is-pointer-active');
        surface.style.setProperty('--mx', `${event.clientX - bounds.left}px`);
        surface.style.setProperty('--my', `${event.clientY - bounds.top}px`);
        surface.style.setProperty('--glow-opacity', '1');
      };

      const activatePointerLight = (event) => {
        surface.classList.add('is-pointer-active');
        updatePointerLight(event);
      };

      surface.addEventListener('pointerenter', activatePointerLight, { passive: true });
      surface.addEventListener('pointermove', updatePointerLight, { passive: true });
      surface.addEventListener('pointerleave', () => {
        surface.classList.remove('is-pointer-active');
        surface.style.setProperty('--glow-opacity', '0');
      }, { passive: true });
    });
  }

  if (finePointer.matches && !reducedMotion.matches) {
    document.querySelectorAll('[data-magnetic]').forEach((control) => {
      control.addEventListener('pointermove', (event) => {
        const bounds = control.getBoundingClientRect();
        const x = ((event.clientX - bounds.left) / bounds.width - .5) * 3.6;
        const y = ((event.clientY - bounds.top) / bounds.height - .5) * 3.6;
        control.style.setProperty('--magnetic-x', `${x.toFixed(2)}px`);
        control.style.setProperty('--magnetic-y', `${y.toFixed(2)}px`);
      }, { passive: true });

      control.addEventListener('pointerleave', () => {
        control.style.setProperty('--magnetic-x', '0px');
        control.style.setProperty('--magnetic-y', '0px');
      }, { passive: true });
    });
  }

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
})();

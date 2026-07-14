(() => {
  'use strict';

  const menu = document.querySelector('#guide-menu');
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const finePointer = window.matchMedia('(pointer: fine)');

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

  menu?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  if (finePointer.matches) {
    document.querySelectorAll('[data-glow]').forEach((surface) => {
      const updatePointerLight = (event) => {
        const bounds = surface.getBoundingClientRect();
        surface.style.setProperty('--mx', `${event.clientX - bounds.left}px`);
        surface.style.setProperty('--my', `${event.clientY - bounds.top}px`);
        surface.style.setProperty('--glow-opacity', '1');
      };

      surface.addEventListener('pointerenter', updatePointerLight, { passive: true });
      surface.addEventListener('pointermove', updatePointerLight, { passive: true });
      surface.addEventListener('pointerleave', () => {
        surface.style.setProperty('--glow-opacity', '0');
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

  const toast = document.querySelector('[data-copy-toast]');
  let toastTimeout;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-visible');
    window.clearTimeout(toastTimeout);
    toastTimeout = window.setTimeout(() => toast.classList.remove('is-visible'), 1500);
  }

  document.querySelectorAll('.color-swatch[data-copy]').forEach((swatch) => {
    swatch.addEventListener('click', () => {
      const value = swatch.dataset.copy;
      showToast(`Copied ${value}`);
      navigator.clipboard?.writeText(value).catch(() => showToast(value));
    });
  });

  document.querySelectorAll('.dg-liquid-dock').forEach((dock) => {
    const items = Array.from(dock.querySelectorAll('[data-dock-item]'));

    items.forEach((item) => {
      item.addEventListener('click', () => {
        items.forEach((candidate) => {
          const isSelected = candidate === item;
          candidate.classList.toggle('is-active', isSelected);
          candidate.setAttribute('aria-pressed', String(isSelected));
        });
      });
    });
  });
})();

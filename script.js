(() => {
  'use strict';

  const root = document.documentElement;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(pointer: fine)');

  function attachPointerLight(element) {
    if (!finePointer.matches) return;

    const update = (event) => {
      const bounds = element.getBoundingClientRect();
      element.style.setProperty('--mx', `${event.clientX - bounds.left}px`);
      element.style.setProperty('--my', `${event.clientY - bounds.top}px`);
      element.style.setProperty('--glow-opacity', '1');
    };

    element.addEventListener('pointermove', update, { passive: true });
    element.addEventListener('pointerenter', update, { passive: true });
    element.addEventListener('pointerleave', () => {
      element.style.setProperty('--glow-opacity', '0');
    }, { passive: true });
  }

  document.querySelectorAll('[data-glow]').forEach(attachPointerLight);

  const header = document.querySelector('[data-site-header]');
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const navigation = document.querySelector('#site-nav');

  const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 28);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  menuToggle?.addEventListener('click', () => {
    const open = menuToggle.getAttribute('aria-expanded') !== 'true';
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    navigation?.classList.toggle('is-open', open);
  });

  navigation?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navigation.classList.remove('is-open');
      menuToggle?.setAttribute('aria-expanded', 'false');
      menuToggle?.setAttribute('aria-label', 'Open navigation');
    });
  });

  const revealElements = document.querySelectorAll('.reveal');
  if (!reducedMotion.matches && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revealElements.forEach((element) => observer.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add('is-visible'));
  }

  const stage = document.querySelector('[data-tilt-stage]');
  const stageCanvas = stage?.querySelector('.app-canvas');
  if (stage && stageCanvas && finePointer.matches && !reducedMotion.matches) {
    stage.addEventListener('pointermove', (event) => {
      const bounds = stage.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      stageCanvas.style.setProperty('--stage-ry', `${x * 5 - 3}deg`);
      stageCanvas.style.setProperty('--stage-rx', `${y * -4 + 1}deg`);
    }, { passive: true });

    stage.addEventListener('pointerleave', () => {
      stageCanvas.style.setProperty('--stage-ry', '-3deg');
      stageCanvas.style.setProperty('--stage-rx', '1deg');
    }, { passive: true });
  }

  const componentTabs = Array.from(document.querySelectorAll('[data-component-tab]'));
  const componentPanels = Array.from(document.querySelectorAll('[data-component-panel]'));

  function selectComponentTab(selectedTab) {
    const selectedName = selectedTab.dataset.componentTab;
    componentTabs.forEach((tab) => {
      const active = tab === selectedTab;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
    });
    componentPanels.forEach((panel) => {
      panel.hidden = panel.dataset.componentPanel !== selectedName;
    });
  }

  componentTabs.forEach((tab, index) => {
    tab.tabIndex = tab.getAttribute('aria-selected') === 'true' ? 0 : -1;
    tab.addEventListener('click', () => selectComponentTab(tab));
    tab.addEventListener('keydown', (event) => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      let targetIndex = index;
      if (event.key === 'ArrowRight') targetIndex = (index + 1) % componentTabs.length;
      if (event.key === 'ArrowLeft') targetIndex = (index - 1 + componentTabs.length) % componentTabs.length;
      if (event.key === 'Home') targetIndex = 0;
      if (event.key === 'End') targetIndex = componentTabs.length - 1;
      const target = componentTabs[targetIndex];
      selectComponentTab(target);
      target.focus();
    });
  });

  document.querySelectorAll('.dg-segmented').forEach((group) => {
    group.querySelectorAll('button').forEach((button) => {
      button.addEventListener('click', () => {
        group.querySelectorAll('button').forEach((item) => item.classList.toggle('is-active', item === button));
      });
    });
  });

  const labPanel = document.querySelector('[data-lab-panel]');
  const blurInput = document.querySelector('[data-lab-blur]');
  const fillInput = document.querySelector('[data-lab-fill]');
  const radiusInput = document.querySelector('[data-lab-radius]');

  function updateLab() {
    if (!labPanel || !blurInput || !fillInput || !radiusInput) return;
    const blur = Number(blurInput.value);
    const fill = Number(fillInput.value);
    const radius = Number(radiusInput.value);
    labPanel.style.setProperty('--lab-blur', `${blur}px`);
    labPanel.style.setProperty('--lab-fill', String(fill / 100));
    labPanel.style.setProperty('--lab-radius', `${radius}px`);
    document.querySelector('[data-blur-output]').textContent = `${blur}px`;
    document.querySelector('[data-fill-output]').textContent = `${fill}%`;
    document.querySelector('[data-radius-output]').textContent = `${radius}px`;
  }

  [blurInput, fillInput, radiusInput].forEach((input) => input?.addEventListener('input', updateLab));
  updateLab();

  document.querySelectorAll('[data-accent-choice]').forEach((button) => {
    button.addEventListener('click', () => {
      root.dataset.accent = button.dataset.accentChoice;
      document.querySelectorAll('[data-accent-choice]').forEach((item) => {
        item.classList.toggle('is-active', item === button);
      });
    });
  });

  const copyButton = document.querySelector('[data-copy-code]');
  const codeSnippet = document.querySelector('[data-code-snippet]');
  copyButton?.addEventListener('click', async () => {
    if (!codeSnippet) return;
    const originalLabel = copyButton.textContent;
    try {
      await navigator.clipboard.writeText(codeSnippet.textContent);
      copyButton.textContent = 'Copied';
    } catch {
      copyButton.textContent = 'Select code';
    }
    window.setTimeout(() => { copyButton.textContent = originalLabel; }, 1600);
  });

  document.querySelectorAll('[data-year]').forEach((item) => {
    item.textContent = String(new Date().getFullYear());
  });
})();

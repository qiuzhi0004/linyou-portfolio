(() => {
  const toggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-nav]');
  if (toggle && nav) {
    const close = () => {
      nav.dataset.open = 'false';
      toggle.setAttribute('aria-expanded', 'false');
    };

    toggle.addEventListener('click', () => {
      const isOpen = nav.dataset.open === 'true';
      nav.dataset.open = isOpen ? 'false' : 'true';
      toggle.setAttribute('aria-expanded', String(!isOpen));
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });

    nav.addEventListener('click', (e) => {
      const target = e.target;
      if (target instanceof HTMLElement && target.tagName === 'A') close();
    });

    const mq = window.matchMedia('(min-width: 821px)');
    mq.addEventListener('change', () => close());
  }

  const copyButtons = document.querySelectorAll('[data-copy-email]');
  copyButtons.forEach((btn) => {
    if (!(btn instanceof HTMLButtonElement)) return;
    const email = btn.getAttribute('data-copy-email') || '';
    if (!email) return;

    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(email);
        const prev = btn.textContent;
        btn.textContent = '已复制';
        window.setTimeout(() => (btn.textContent = prev), 1200);
      } catch {
        window.location.href = `mailto:${email}`;
      }
    });
  });
})();

(() => {
  'use strict';

  const menuButton = document.querySelector('[data-menu-button]');
  const nav = document.querySelector('[data-nav]');
  const toast = document.querySelector('[data-toast]');
  let toastTimer;

  const closeMenu = () => {
    if (!menuButton || !nav) return;
    nav.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'メニューを開く');
  };

  menuButton?.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
  });
  nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  window.addEventListener('resize', () => { if (window.innerWidth > 900) closeMenu(); });

  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-visible');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 1800);
  };

  const fallbackCopy = (text) => {
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    const copied = document.execCommand('copy');
    area.remove();
    return copied;
  };

  document.querySelectorAll('[data-command]').forEach((button) => {
    button.addEventListener('click', async () => {
      const command = button.dataset.command;
      if (!command) return;
      try {
        if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(command);
        else if (!fallbackCopy(command)) throw new Error('copy failed');
        showToast('コピーしました');
      } catch {
        showToast('コピーできませんでした');
      }
    });
  });

  const search = document.querySelector('[data-command-search]');
  const rows = [...document.querySelectorAll('[data-command-list] tr')];
  const count = document.querySelector('[data-search-count]');
  const empty = document.querySelector('[data-empty-search]');
  search?.addEventListener('input', () => {
    const query = search.value.trim().toLocaleLowerCase('ja');
    let visible = 0;
    rows.forEach((row) => {
      const matches = row.textContent.toLocaleLowerCase('ja').includes(query);
      row.hidden = !matches;
      if (matches) visible += 1;
    });
    if (count) count.textContent = `${visible}件のコマンド`;
    if (empty) empty.hidden = visible !== 0;
  });

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }
})();

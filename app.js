const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
function closeMenu() {
  menu?.setAttribute('aria-expanded', 'false');
  menu?.setAttribute('aria-label', '메뉴 열기');
  nav?.classList.remove('is-open');
}
menu?.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
  nav.classList.toggle('is-open', open);
});
nav?.querySelectorAll('a').forEach(anchor => anchor.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
document.addEventListener('click', event => {
  if (!nav?.contains(event.target) && !menu?.contains(event.target)) closeMenu();
});
const navigationLinks = [...document.querySelectorAll('nav a[href^="#"]')];
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      navigationLinks.forEach(anchor => {
        const current = anchor.hash === `#${entry.target.id}`;
        anchor.classList.toggle('is-current', current);
        if (current) anchor.setAttribute('aria-current', 'location');
        else anchor.removeAttribute('aria-current');
      });
    }
  }, { rootMargin: '-15% 0px -65% 0px' });
  document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
}
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-filter]').forEach(filter => {
    filter.classList.toggle('active', filter === button);
    filter.setAttribute('aria-pressed', String(filter === button));
  });
  document.querySelectorAll('.publication[data-type]').forEach(publication => {
    publication.hidden = button.dataset.filter !== 'all' && publication.dataset.type !== button.dataset.filter;
  });
}));
const dialog = document.querySelector('.photo-dialog');
if (dialog && typeof dialog.showModal === 'function') {
  document.querySelectorAll('.photo-link').forEach(anchor => anchor.addEventListener('click', event => {
    event.preventDefault();
    const img = dialog.querySelector('img');
    img.src = anchor.href;
    img.alt = anchor.dataset.caption;
    dialog.querySelector('p').textContent = anchor.dataset.caption;
    dialog.showModal();
  }));
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
}

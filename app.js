const menuButton = document.querySelector('.menu-button');
const menu = document.querySelector('.main-nav');

menuButton?.addEventListener('click', () => {
  const open = menu.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(open));
});

menu?.addEventListener('click', (event) => {
  if (!event.target.closest('a')) return;
  menu.classList.remove('is-open');
  menuButton?.setAttribute('aria-expanded', 'false');
});

const filterButtons = [...document.querySelectorAll('.filter')];
const productCards = [...document.querySelectorAll('.product-card')];

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const selected = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle('is-active', item === button));
    productCards.forEach((card) => {
      const categories = card.dataset.category.split(' ');
      card.hidden = selected !== 'all' && !categories.includes(selected);
    });
  });
});

const hero = document.querySelector('.hero');
const directionLinks = [...document.querySelectorAll('[data-hero-target]')];
const heroNavLinks = [...document.querySelectorAll('[data-hero-nav]')];
const heroPanels = [...document.querySelectorAll('[data-hero-panel]')];

function setHeroScene(scene) {
  if (!hero || !scene) return;
  hero.dataset.heroScene = scene;
  directionLinks.forEach((link) => {
    link.classList.toggle('is-active', link.dataset.heroTarget === scene);
  });
  heroPanels.forEach((panel) => {
    panel.classList.toggle('is-active', panel.dataset.heroPanel === scene);
  });
}

directionLinks.forEach((link) => {
  const activate = () => setHeroScene(link.dataset.heroTarget);
  link.addEventListener('mouseenter', activate);
  link.addEventListener('focus', activate);
  link.addEventListener('pointerdown', activate);
});

heroNavLinks.forEach((link) => {
  const activate = () => setHeroScene(link.dataset.heroNav);
  link.addEventListener('mouseenter', activate);
  link.addEventListener('focus', activate);
});

const revealItems = [...document.querySelectorAll('.reveal')];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (reducedMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -7% 0px',
  });

  revealItems.forEach((item) => revealObserver.observe(item));
}

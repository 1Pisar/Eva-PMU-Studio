// ================================
// EVA PMU STUDIO — script.js
// ================================


// ================================
// NAVIGATION
// ================================

const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.main-nav');
const header = document.querySelector('.site-header');

// Otwieranie / zamykanie menu mobilnego
navToggle?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

// Smooth scroll do sekcji z uwzględnieniem wysokości navbaru
document.querySelectorAll('.main-nav a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));

    if (!target) return;

    e.preventDefault();

    const headerHeight = header ? header.offsetHeight : 0;
    const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight - 25;

    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    nav?.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

document.querySelectorAll('[data-open-faq]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.getElementById(link.dataset.openFaq);

    if (!target || !(target instanceof HTMLDetailsElement)) return;

    e.preventDefault();
    target.open = true;

    if (window.location.hash !== `#${target.id}`) {
      history.pushState(null, '', `#${target.id}`);
    }

    const scrollMargin = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
    const targetPosition =
      target.getBoundingClientRect().top + window.scrollY - scrollMargin;

    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
  });
});

document.querySelectorAll('details').forEach(details => {
  const feature = details.querySelector(':scope > .faq-feature');
  const icon = details.querySelector(':scope > summary > i');

  if (feature) {
    let featureCloseTransition;

    details.querySelector(':scope > summary')?.addEventListener('click', event => {
      if (!details.open) return;

      event.preventDefault();

      if (feature.classList.contains('is-closing')) return;

      feature.classList.remove('is-animating');
      feature.classList.add('is-closing');

      const closeDelay = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 0
        : 350;

      featureCloseTransition = window.setTimeout(() => {
        details.open = false;
        feature.classList.remove('is-closing');
      }, closeDelay);
    });

    details.addEventListener('toggle', () => {
      window.clearTimeout(featureCloseTransition);

      feature.classList.remove('is-animating');

      if (details.open) {
        feature.classList.remove('is-closing');
        void feature.offsetWidth;
        feature.classList.add('is-animating');
      }
    });
  }

  if (!icon) return;

  const setIcon = () => {
    icon.classList.toggle('fa-plus', !details.open);
    icon.classList.toggle('fa-minus', details.open);
  };

  let iconTransition;

  setIcon();
  details.addEventListener('toggle', () => {
    window.clearTimeout(iconTransition);
    icon.classList.add('is-changing');

    iconTransition = window.setTimeout(() => {
      setIcon();
      icon.classList.remove('is-changing');
    }, 120);
  });
});

// HIGHLIGHT CURRENT SECTION
const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.main-nav a:not(.nav-cta)')];

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle(
          'active',
          link.getAttribute('href') === `#${entry.target.id}`
        );
      });
    }
  });
}, {
  rootMargin: '-35% 0px -55% 0px',
  threshold: 0
});

sections.forEach(section => observer.observe(section));

// REAL RESULTS CAROUSEL
const prev = document.querySelector('.carousel-btn.prev');
const next = document.querySelector('.carousel-btn.next');
const resultGroups = [...document.querySelectorAll('.results-track > .result-group')];
let currentResultIndex = 0;

function showResultGroup(index) {
  if (!resultGroups.length) return;

  currentResultIndex = (index % resultGroups.length + resultGroups.length) % resultGroups.length;

  resultGroups.forEach((group, groupIndex) => {
    group.classList.toggle('active', groupIndex === currentResultIndex);
  });
}

prev?.addEventListener('click', () => {
  showResultGroup(currentResultIndex - 1);
});

next?.addEventListener('click', () => {
  showResultGroup(currentResultIndex + 1);
});

showResultGroup(0);

const makeupCategory = document.querySelector('.price-category.makeup');
const pricingImage = document.querySelector('.pricing-image');
const tabletPricingQuery = window.matchMedia('(max-width: 1024px) and (min-width: 769px)');

if (makeupCategory && pricingImage) {
  const matchPricingImageHeight = () => {
    pricingImage.style.height = tabletPricingQuery.matches
      ? `${makeupCategory.getBoundingClientRect().height}px`
      : '';
  };

  const pricingResizeObserver = new ResizeObserver(matchPricingImageHeight);
  pricingResizeObserver.observe(makeupCategory);
  tabletPricingQuery.addEventListener('change', matchPricingImageHeight);
  matchPricingImageHeight();
}

// ================================
// DEMO APPOINTMENT FORM
// ================================

const form = document.getElementById('bookingForm');
const status = document.querySelector('.form-status');

form?.addEventListener('submit', e => {

  e.preventDefault();

  const data = new FormData(form);
  const name = data.get('name')?.trim();

  status.textContent =
    `Thanks${name ? `, ${name}` : ''}! Your request has been prepared. In a live site, this would now be sent to Eva.`;

  form.reset();

});


// ================================
// APPOINTMENT MODAL
// ================================

const openModal = modal => {

  modal.classList.add('open');

  modal.setAttribute('aria-hidden', 'false');

};

const closeModal = modal => {

  modal.classList.remove('open');

  modal.setAttribute('aria-hidden', 'true');

};

document.querySelectorAll('[data-modal-open]').forEach(trigger => {

  trigger.addEventListener('click', e => {

    e.preventDefault();

    openModal(document.getElementById(trigger.dataset.modalOpen));

  });

});

document.querySelectorAll('.modal').forEach(modal => {

  modal.querySelector('.modal-close')
    ?.addEventListener('click', () => closeModal(modal));

  modal.addEventListener('click', e => {

    if (e.target === modal) {
      closeModal(modal);
    }

  });

  modal.querySelectorAll('.modal-card a').forEach(link => {

    link.addEventListener('click', () => closeModal(modal));

  });

});

document.addEventListener('keydown', e => {

  if (e.key === 'Escape') {
    document.querySelectorAll('.modal.open').forEach(closeModal);
  }

});


// ================================
// CURRENT YEAR
// ================================

document.getElementById('year').textContent =
  new Date().getFullYear();
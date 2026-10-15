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
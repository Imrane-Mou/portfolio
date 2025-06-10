document.addEventListener('DOMContentLoaded', () => {
  // 1) Smooth scrolling for internal anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // 2) Back-to-top button
  const btn = document.createElement('button');
  btn.id = 'back-to-top';
  btn.textContent = '↑';
  Object.assign(btn.style, {
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    padding: '10px 15px',
    fontSize: '1.2rem',
    display: 'none',
    backgroundColor: '#0366d6',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    zIndex: 1000
  });
  document.body.appendChild(btn);
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  window.addEventListener('scroll', () => {
    btn.style.display = window.scrollY > 300 ? 'block' : 'none';
  });

  // 3) Reveal-on-scroll for sections
  const sectionObs = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -40% 0px' });

  document.querySelectorAll('section').forEach(sec => sectionObs.observe(sec));

  // 4) Reveal-on-scroll for skill cards
  const cardObs = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -20% 0px' });

  document.querySelectorAll('.card-logo').forEach(card => cardObs.observe(card));

  // 5) Hamburger toggle
  const toggle = document.getElementById('nav-toggle');
  const nav    = document.querySelector('nav.nav-menu');
  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });

  // auto-close menu on link click (mobile)
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
    });
  });
});

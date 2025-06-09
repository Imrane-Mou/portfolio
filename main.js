// Smooth scrolling for internal anchor links
const anchors = document.querySelectorAll('a[href^="#"]');
anchors.forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Back-to-top button setup
document.addEventListener('DOMContentLoaded', () => {
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

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      btn.style.display = 'block';
    } else {
      btn.style.display = 'none';
    }
  });
});

// after your back-to-top setup…

// Reveal-on-scroll for each section
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      obs.unobserve(entry.target); // only once
    }
  });
}, {
  rootMargin: '0px 0px -40% 0px'  // trigger a bit before fully in view
});

sections.forEach(sec => observer.observe(sec));


document.addEventListener('DOMContentLoaded', () => {
  // … your smooth-scroll + back-to-top + section observer …

  // observer for individual skill cards
  const cards = document.querySelectorAll('.card-logo');
  const cardObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px 0px -20% 0px'  // tweak as needed
  });

  cards.forEach(card => cardObserver.observe(card));
});


const toggle = document.getElementById('nav-toggle');
const nav    = document.querySelector('.nav-menu');

toggle.addEventListener('click', () => {
  nav.classList.toggle('open');
  nav.classList.toggle('collapsed');
});


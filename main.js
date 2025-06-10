document.addEventListener('DOMContentLoaded', () => {
  // Smooth‐scroll anchors
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const t = document.querySelector(a.getAttribute('href'));
      if (t) t.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Back‐to‐top button
  const btn = document.createElement('button');
  btn.id = 'back-to-top';
  btn.textContent = '↑';
  Object.assign(btn.style, {
    position:'fixed', bottom:'30px', right:'30px',
    padding:'10px 15px', fontSize:'1.2rem',
    display:'none', backgroundColor:'#0366d6',
    color:'#fff', border:'none', borderRadius:'4px',
    cursor:'pointer', zIndex:1000
  });
  document.body.appendChild(btn);
  btn.addEventListener('click', () => window.scrollTo({ top:0, behavior:'smooth' }));
  window.addEventListener('scroll', () => {
    btn.style.display = window.scrollY > 300 ? 'block' : 'none';
  });

  // Reveal‐on‐scroll for sections & cards
  const obs = new IntersectionObserver((entries, o) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        o.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -40% 0px' });

  document.querySelectorAll('section, .card-logo').forEach(el => obs.observe(el));

  // Hamburger toggle
  const toggle = document.getElementById('nav-toggle');
  const nav    = document.querySelector('nav.nav-menu');
  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {

  // ── SCROLL PROGRESS BAR ───────────────────────────────────────────────────
  const progressBar = document.createElement('div');
  progressBar.id = 'scroll-progress';
  Object.assign(progressBar.style, {
    position: 'fixed', top: '0', left: '0',
    height: '3px', width: '0%',
    background: 'linear-gradient(to right, #0066cc, #00bfff)',
    zIndex: '9999',
    transition: 'width 0.1s linear',
    borderRadius: '0 2px 2px 0'
  });
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = (scrollTop / docHeight * 100) + '%';
    btn.style.display = scrollTop > 300 ? 'block' : 'none';
    updateActiveNav();
  });

  // ── TYPING EFFECT ON HEADER ───────────────────────────────────────────────
  const h1 = document.querySelector('.header-left h1');
  if (h1) {
    const line1 = "Heey ! Je suis ";
    const line2 = "Imrane";
    h1.innerHTML = '';

    const span1 = document.createElement('span');
    span1.style.color = 'var(--accent)';
    span1.style.fontWeight = '600';

    const br = document.createElement('br');

    const span2 = document.createElement('span');
    span2.style.color = 'var(--text-primary)';
    span2.style.fontWeight = '700';

    h1.appendChild(span1);
    h1.appendChild(br);
    h1.appendChild(span2);

    let i = 0;
    function typeLine1() {
      if (i < line1.length) {
        span1.textContent += line1[i++];
        setTimeout(typeLine1, 45);
      } else {
        let j = 0;
        function typeLine2() {
          if (j < line2.length) {
            span2.textContent += line2[j++];
            setTimeout(typeLine2, 80);
          } else {
            // blinking cursor after done
            const cursor = document.createElement('span');
            cursor.textContent = '|';
            cursor.style.color = 'var(--accent)';
            cursor.style.animation = 'blink 1s step-end infinite';
            span2.appendChild(cursor);
          }
        }
        typeLine2();
      }
    }
    setTimeout(typeLine1, 400);
  }

  // ── ACTIVE NAV HIGHLIGHT ON SCROLL ───────────────────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav.nav-menu a');

  function updateActiveNav() {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  // ── SMOOTH SCROLL ─────────────────────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const t = document.querySelector(a.getAttribute('href'));
      if (t) t.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // ── BACK TO TOP ───────────────────────────────────────────────────────────
  const btn = document.createElement('button');
  btn.id = 'back-to-top';
  btn.textContent = '↑';
  Object.assign(btn.style, {
    position: 'fixed', bottom: '30px', right: '30px',
    padding: '10px 15px', fontSize: '1.2rem',
    display: 'none', backgroundColor: '#0066cc',
    color: '#fff', border: 'none', borderRadius: '4px',
    cursor: 'pointer', zIndex: 1000,
    fontFamily: 'var(--font-tech)',
    transition: 'background 0.2s ease, transform 0.2s ease'
  });
  btn.addEventListener('mouseenter', () => btn.style.transform = 'translateY(-3px)');
  btn.addEventListener('mouseleave', () => btn.style.transform = 'none');
  document.body.appendChild(btn);
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // ── COPY EMAIL ON CLICK ───────────────────────────────────────────────────
  const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
  emailLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const email = link.href.replace('mailto:', '');
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email copié !');
      });
    });
  });

  function showToast(msg) {
    const toast = document.createElement('div');
    toast.textContent = msg;
    Object.assign(toast.style, {
      position: 'fixed', bottom: '80px', right: '30px',
      background: '#0066cc', color: '#fff',
      padding: '8px 16px', borderRadius: '6px',
      fontFamily: 'var(--font-tech)', fontSize: '0.8rem',
      zIndex: 9999, opacity: '0',
      transition: 'opacity 0.3s ease'
    });
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.style.opacity = '1');
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 2000);
  }

  // ── REVEAL ON SCROLL ─────────────────────────────────────────────────────
  const obs = new IntersectionObserver((entries, o) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        o.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px' });

  document.querySelectorAll(
    'section, .card-logo, .timeline-item, .subsection'
  ).forEach(el => obs.observe(el));

  // ── HAMBURGER TOGGLE ─────────────────────────────────────────────────────
  const toggle = document.getElementById('nav-toggle');
  const nav    = document.querySelector('nav.nav-menu');
  toggle.addEventListener('click', () => nav.classList.toggle('open'));
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => nav.classList.remove('open'));
  });

});
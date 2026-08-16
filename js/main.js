document.addEventListener('DOMContentLoaded', () => {

  // ── SCROLL PROGRESS BAR ───────────────────────────────────────────────────
  const progressBar = document.createElement('div');
  progressBar.id = 'scroll-progress';
  document.body.appendChild(progressBar);

  const btn = document.createElement('button');
  btn.id = 'back-to-top';
  btn.textContent = '↑';
  btn.setAttribute('aria-label', 'Back to top');
  document.body.appendChild(btn);
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = (docHeight > 0 ? scrollTop / docHeight * 100 : 0) + '%';
    btn.style.display = scrollTop > 300 ? 'flex' : 'none';
    updateActiveNav();
  });

  // ── ACTIVE NAV HIGHLIGHT ON SCROLL ───────────────────────────────────────
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('nav.nav-menu .nav-links a[href^="#"]');

  function updateActiveNav() {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  // ── SMOOTH SCROLL (with in-page anchor closing mobile nav) ───────────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const targetId = a.getAttribute('href');
      const t = document.querySelector(targetId);
      if (t) {
        e.preventDefault();
        t.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ── HAMBURGER TOGGLE ─────────────────────────────────────────────────────
  const toggle = document.getElementById('nav-toggle');
  const nav = document.querySelector('nav.nav-menu');
  if (toggle && nav) {
    const openLabel = toggle.getAttribute('aria-label');
    const closeLabel = toggle.dataset.closeLabel || openLabel;

    const setOpen = isOpen => {
      nav.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.setAttribute('aria-label', isOpen ? closeLabel : openLabel);
    };

    toggle.addEventListener('click', () => setOpen(!nav.classList.contains('open')));
    nav.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => setOpen(false));
    });
  }

  // ── COPY EMAIL ON CLICK ───────────────────────────────────────────────────
  document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const email = link.href.replace('mailto:', '');
      navigator.clipboard.writeText(email).then(() => {
        showToast(link.dataset.copiedMsg || 'Copied!');
      });
    });
  });

  function showToast(msg) {
    const toast = document.createElement('div');
    toast.textContent = msg;
    Object.assign(toast.style, {
      position: 'fixed', bottom: '90px', right: '30px',
      background: 'var(--accent)', color: 'var(--bg)',
      padding: '8px 16px', borderRadius: '100px',
      fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: '600',
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
    'section, .subsection, .timeline-item, .project-card'
  ).forEach(el => obs.observe(el));

  // ── CONTACT FORM (EmailJS + "sent" confirmation state) ────────────────────
  const contactForm = document.querySelector('form.contact-form');
  if (contactForm && window.emailjs) {
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const idleLabel = submitBtn ? submitBtn.textContent : '';
    const sentLabel = submitBtn ? (submitBtn.dataset.sentLabel || idleLabel) : '';

    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      emailjs.sendForm('service_wfyx1p6', 'template_e7kbhqa', contactForm)
        .then(() => {
          if (submitBtn) {
            submitBtn.textContent = sentLabel;
            submitBtn.classList.add('sent');
          }
          contactForm.reset();
          setTimeout(() => {
            if (submitBtn) {
              submitBtn.textContent = idleLabel;
              submitBtn.classList.remove('sent');
            }
          }, 3000);
        })
        .catch(error => {
          alert((contactForm.dataset.errorMsg || 'Error: ') + error);
        });
    });
  }

});

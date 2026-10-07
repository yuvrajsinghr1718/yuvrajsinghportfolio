/**
 * MAIN INTERACTIVE SCRIPT
 * Yuvraj Singh Rathore - Civil Engineering Portfolio
 * Manages theme toggle, scroll-spy navigation, animated counters, resume modal, and contact handling.
 */

(function () {
  'use strict';

  // --- Theme Toggle Management ---
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = document.getElementById('theme-icon');

  function initTheme() {
    const savedTheme = localStorage.getItem('ysr-portfolio-theme');
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
      updateThemeIcon(savedTheme);
    } else {
      // Default to dark navy
      document.documentElement.setAttribute('data-theme', 'dark');
      updateThemeIcon('dark');
    }
  }

  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    if (theme === 'light') {
      themeIcon.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      `;
      themeToggleBtn.setAttribute('title', 'Switch to Blueprint Dark Mode');
      themeToggleBtn.setAttribute('aria-label', 'Switch to Blueprint Dark Mode');
    } else {
      themeIcon.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      `;
      themeToggleBtn.setAttribute('title', 'Switch to Architectural Light Mode');
      themeToggleBtn.setAttribute('aria-label', 'Switch to Architectural Light Mode');
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('ysr-portfolio-theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }

  initTheme();

  // --- Sticky Navigation & Scroll Spy ---
  const siteHeader = document.querySelector('.site-header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const backToTopBtn = document.getElementById('back-to-top');

  function handleScroll() {
    const scrollY = window.pageYOffset;

    // Header styling on scroll
    if (siteHeader) {
      if (scrollY > 40) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }

    // Back to top button visibility
    if (backToTopBtn) {
      if (scrollY > 500) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    // Scroll spy active link
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Back to top click
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Mobile Drawer Navigation ---
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function toggleMobileMenu() {
    if (!mobileDrawer) return;
    const isOpen = mobileDrawer.classList.contains('open');
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  function openMobileMenu() {
    mobileDrawer.classList.add('open');
    document.body.style.overflow = 'hidden';
    mobileMenuBtn.setAttribute('aria-expanded', 'true');
  }

  function closeMobileMenu() {
    mobileDrawer.classList.remove('open');
    document.body.style.overflow = '';
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
  }

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // --- Animated Numeric Counters ---
  const statElements = document.querySelectorAll('.stat-number');
  let animated = false;

  function animateCounters() {
    if (animated) return;
    statElements.forEach(el => {
      const target = parseFloat(el.getAttribute('data-target'));
      const isDecimal = el.getAttribute('data-decimal') === 'true';
      const duration = 1800;
      const frameDuration = 1000 / 60;
      const totalFrames = Math.round(duration / frameDuration);
      let frame = 0;

      const counter = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        const current = target * Math.sin(progress * (Math.PI / 2)); // Ease out quad

        if (isDecimal) {
          el.textContent = current.toFixed(2);
        } else if (target % 1 !== 0) {
          el.textContent = current.toFixed(1);
        } else {
          el.textContent = Math.round(current);
        }

        if (frame === totalFrames) {
          clearInterval(counter);
          el.textContent = isDecimal ? target.toFixed(2) : (target % 1 !== 0 ? target.toFixed(1) : target);
        }
      }, frameDuration);
    });
    animated = true;
  }

  // Trigger counters with IntersectionObserver
  const statsSection = document.getElementById('achievements');
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    observer.observe(statsSection);
  }

  // --- Skills Category Filter ---
  const skillTabButtons = document.querySelectorAll('.skill-tab-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  skillTabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      skillTabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
          }, 40);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --- Resume Modal & Printable Sheet ---
  const resumeModal = document.getElementById('resume-modal');
  const resumeCloseBtn = document.getElementById('resume-close-btn');
  const printResumeBtn = document.getElementById('print-resume-btn');
  const openResumeButtons = document.querySelectorAll('.btn-open-resume');

  function openResume() {
    if (!resumeModal) return;
    resumeModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeResume() {
    if (!resumeModal) return;
    resumeModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  openResumeButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openResume();
    });
  });

  if (resumeCloseBtn) {
    resumeCloseBtn.addEventListener('click', closeResume);
  }

  if (printResumeBtn) {
    printResumeBtn.addEventListener('click', () => {
      window.print();
    });
  }

  if (resumeModal) {
    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) closeResume();
    });
  }

  // --- Contact Form Handling & Copy Buttons ---
  const contactForm = document.getElementById('portfolio-contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const subject = document.getElementById('contact-subject').value.trim();
      const message = document.getElementById('contact-message').value.trim();

      if (!name || !email || !message) {
        showFormStatus('Please complete all required fields.', 'error');
        return;
      }

      // Simple email format check
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showFormStatus('Please provide a valid email address.', 'error');
        return;
      }

      // Realistic response simulation
      showFormStatus('Thank you for reaching out, ' + name + '! Your message has been simulated successfully. You can also reach me directly at yuvrajsinghr1718@gmail.com.', 'success');
      contactForm.reset();

      setTimeout(() => {
        if (formStatus) formStatus.style.display = 'none';
      }, 7000);
    });
  }

  function showFormStatus(msg, type) {
    if (!formStatus) return;
    formStatus.textContent = msg;
    formStatus.className = 'form-status ' + type;
    formStatus.style.display = 'block';
  }

  // Copy Email & Phone buttons
  const copyButtons = document.querySelectorAll('.btn-copy-info');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const value = btn.getAttribute('data-copy');
      if (navigator.clipboard && value) {
        navigator.clipboard.writeText(value).then(() => {
          const originalText = btn.getAttribute('data-original-text') || btn.innerHTML;
          btn.setAttribute('data-original-text', originalText);
          btn.innerHTML = `<span style="color:#10b981; font-size:0.75rem; font-family:var(--font-mono);">Copied!</span>`;
          setTimeout(() => {
            btn.innerHTML = originalText;
          }, 2200);
        });
      }
    });
  });

})();

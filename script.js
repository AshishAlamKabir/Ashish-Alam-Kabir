// assets/js/main.js

document.addEventListener('DOMContentLoaded', () => {
  const HEADER_OFFSET = 70;

  /* ========================
     SMOOTH SCROLL
  ======================== */
  function smoothScrollToId(id) {
    const target = document.getElementById(id);
    if (!target) return;
    const rect = target.getBoundingClientRect();
    const scrollTop = window.scrollY || window.pageYOffset;
    const targetY = rect.top + scrollTop - HEADER_OFFSET;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  }

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', event => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      const id = href.substring(1);
      if (!document.getElementById(id)) return;
      event.preventDefault();
      smoothScrollToId(id);
      const navToggle = document.getElementById('nav-toggle');
      if (navToggle?.checked) navToggle.checked = false;
    });
  });

  /* ========================
     ANIME.JS ANIMATIONS
  ======================== */
  if (window.anime) {
    // Navbar animation
    anime({
      targets: '.nav-logo',
      opacity: [0, 1],
      translateX: [-20, 0],
      duration: 800,
      easing: 'easeOutQuad'
    });

    anime({
      targets: '.nav-links li',
      opacity: [0, 1],
      translateY: [10, 0],
      delay: anime.stagger(80, { start: 100 }),
      duration: 600,
      easing: 'easeOutQuad'
    });

    anime({
      targets: '.nav-cta',
      opacity: [0, 1],
      translateX: [20, 0],
      duration: 600,
      delay: 200,
      easing: 'easeOutQuad'
    });

    // Hero content animation
    anime({
      targets: '.hero-badge',
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 800,
      easing: 'easeOutQuad'
    });

    anime({
      targets: '.hero-title',
      opacity: [0, 1],
      translateY: [40, 0],
      duration: 1000,
      delay: 100,
      easing: 'easeOutExpo'
    });

    anime({
      targets: '.hero-subtitle, .hero-description',
      opacity: [0, 1],
      translateY: [20, 0],
      delay: anime.stagger(100, { start: 300 }),
      duration: 700,
      easing: 'easeOutQuad'
    });

    anime({
      targets: '.hero-stats .stat-item',
      opacity: [0, 1],
      translateX: [-20, 0],
      delay: anime.stagger(80, { start: 450 }),
      duration: 700,
      easing: 'easeOutQuad'
    });

    anime({
      targets: '.hero-actions .btn',
      opacity: [0, 1],
      translateY: [20, 0],
      delay: anime.stagger(100, { start: 550 }),
      duration: 600,
      easing: 'easeOutQuad'
    });

    anime({
      targets: '.hero-socials .social-link',
      opacity: [0, 1],
      translateY: [15, 0],
      delay: anime.stagger(50, { start: 650 }),
      duration: 500,
      easing: 'easeOutQuad'
    });

    // Hero visual card
    anime({
      targets: '.floating-card',
      opacity: [0, 1],
      scale: [0.8, 1],
      rotate: [-5, 0],
      duration: 1000,
      delay: 200,
      easing: 'easeOutExpo'
    });

    // Scroll reveal sections
    const revealElements = document.querySelectorAll('.reveal-section');
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            anime({
              targets: entry.target,
              opacity: [0, 1],
              translateY: [40, 0],
              duration: 900,
              easing: 'easeOutQuad',
              complete: () => entry.target.style.opacity = '1'
            });
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      revealElements.forEach(el => observer.observe(el));
    }

    // Stagger children animations
    const cardContainers = [
      '.about-grid',
      '.skills-grid',
      '.projects-grid',
      '.services-grid',
      '.contact-grid'
    ];

    cardContainers.forEach(selector => {
      const container = document.querySelector(selector);
      if (!container) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !entry.target.dataset.animated) {
            entry.target.dataset.animated = 'true';
            anime({
              targets: `${selector} > div`,
              opacity: [0, 1],
              translateY: [30, 0],
              delay: anime.stagger(60),
              duration: 800,
              easing: 'easeOutQuad'
            });
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.05 });

      observer.observe(container);
    });

    // Skill bars animation on scroll
    const skillBars = document.querySelectorAll('.skill-fill');
    if (skillBars.length) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !entry.target.dataset.animated) {
            entry.target.dataset.animated = 'true';
            const target = entry.target;
            const width = target.style.width || '0%';
            anime({
              targets: target,
              width: [0, parseInt(width)],
              duration: 1200,
              easing: 'easeOutExpo'
            });
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });

      skillBars.forEach(bar => observer.observe(bar));
    }

    // Politics section animation
    const politicsArticle = document.querySelector('.politics-article');
    if (politicsArticle) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !entry.target.dataset.animated) {
            entry.target.dataset.animated = 'true';
            
            // Animate article body
            anime({
              targets: '.article-paragraph',
              opacity: [0, 1],
              translateY: [20, 0],
              delay: anime.stagger(60),
              duration: 800,
              easing: 'easeOutQuad'
            });

            // Animate highlight quote
            anime({
              targets: '.article-highlight',
              opacity: [0, 1],
              scale: [0.95, 1],
              delay: 400,
              duration: 600,
              easing: 'easeOutQuad'
            });

            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });

      observer.observe(politicsArticle);
    }

    // Animate insight cards
    const insightCards = document.querySelectorAll('.insight-card');
    if (insightCards.length) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !entry.target.dataset.animated) {
            entry.target.dataset.animated = 'true';
            anime({
              targets: '.insight-card',
              opacity: [0, 1],
              translateY: [30, 0],
              delay: anime.stagger(80),
              duration: 700,
              easing: 'easeOutQuad'
            });
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      insightCards.forEach(card => observer.observe(card));
    }
  }

  /* ========================
     PARALLAX SCROLL
  ======================== */
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const gradients = document.querySelectorAll('.bg-gradient');
    gradients.forEach((grad, i) => {
      grad.style.transform = `translateY(${scrolled * (0.5 + i * 0.1)}px)`;
    });
  });

  /* ========================
     MOUSE MOVE EFFECT
  ======================== */
  const floatingCard = document.querySelector('.floating-card');
  if (floatingCard) {
    document.addEventListener('mousemove', (e) => {
      const rect = floatingCard.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const dist = Math.sqrt(x * x + y * y);
      
      if (dist < 300) {
        anime.set(floatingCard, {
          translateX: x * 0.1,
          translateY: y * 0.1
        });
      }
    });

    document.addEventListener('mouseleave', () => {
      anime({
        targets: floatingCard,
        translateX: 0,
        translateY: 0,
        duration: 600,
        easing: 'easeOutQuad'
      });
    });
  }
});

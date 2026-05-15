/* ========================================
   BALIAN — V2 Effects
   Scroll reveal, text rotator, custom cursor,
   parallax, animated lines
   ======================================== */

(function () {
  'use strict';

  /* ── 1. Scroll Reveal ── */
  const revealElements = document.querySelectorAll('[data-reveal]');

  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.revealDelay || 0;
        setTimeout(function () {
          el.classList.add('revealed');
        }, delay);
        revealObserver.unobserve(el);
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(function (el) {
    revealObserver.observe(el);
  });

  /* ── 2. Text Rotator ── */
  document.querySelectorAll('[data-rotator]').forEach(function (el) {
    const words = el.dataset.rotator.split('|');
    let index = 0;
    const medium = el.classList.contains('rotator--medium');
    const fast = el.classList.contains('rotator--highlight') && !medium;
    const interval = fast ? 500 : medium ? 800 : 3000;
    const fadeTime = fast ? 50 : medium ? 80 : 400;

    setInterval(function () {
      el.classList.add('rotator--out');
      setTimeout(function () {
        index = (index + 1) % words.length;
        el.textContent = words[index];
        el.classList.remove('rotator--out');
      }, fadeTime);
    }, interval);
  });

  /* ── 3. Custom Cursor ── */
  const cursor = document.querySelector('.custom-cursor');
  const cursorDot = document.querySelector('.custom-cursor__dot');

  if (cursor && cursorDot) {
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
    });

    // Smooth follow for outer circle
    function animateCursor() {
      cursorX += (mouseX - cursorX) * 0.12;
      cursorY += (mouseY - cursorY) * 0.12;
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Grow on interactive elements
    const hoverTargets = document.querySelectorAll('a, button, .v5-pillar, .v5-tier, .portfolio-card, .cta-btn, .hero__enter');
    hoverTargets.forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        cursor.classList.add('custom-cursor--hover');
      });
      el.addEventListener('mouseleave', function () {
        cursor.classList.remove('custom-cursor--hover');
      });
    });

    // Hide on touch devices
    if ('ontouchstart' in window) {
      cursor.style.display = 'none';
      cursorDot.style.display = 'none';
    }
  }

  /* ── 4. Parallax ── */
  const parallaxElements = document.querySelectorAll('[data-parallax]');

  if (parallaxElements.length && !('ontouchstart' in window)) {
    window.addEventListener('scroll', function () {
      const scrollY = window.pageYOffset;
      parallaxElements.forEach(function (el) {
        const speed = parseFloat(el.dataset.parallax) || 0.1;
        const rect = el.getBoundingClientRect();
        const offset = (rect.top + scrollY - window.innerHeight / 2) * speed;
        el.style.transform = 'translateY(' + (-offset) + 'px)';
      });
    }, { passive: true });
  }

  /* ── 5. Animated Lines ── */
  const lineElements = document.querySelectorAll('.animated-line');

  const lineObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated-line--visible');
        lineObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  lineElements.forEach(function (el) {
    lineObserver.observe(el);
  });

})();

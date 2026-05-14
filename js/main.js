/* ========================================
   BALIAN — Main JS
   Hero crossfade + Mobile nav
   ======================================== */

(function () {
  'use strict';

  /* ── Hero Crossfade ── */
  const slides = document.querySelectorAll('.hero__slide');
  if (slides.length > 1) {
    let current = 0;
    const interval = 5500; // ms per slide

    setInterval(function () {
      slides[current].classList.remove('active');
      current = (current + 1) % slides.length;
      slides[current].classList.add('active');
    }, interval);
  }

  /* ── Mobile Nav Toggle ── */
  const toggle = document.querySelector('.nav__toggle');
  const navLinks = document.querySelector('.nav__links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
      // Animate hamburger
      toggle.classList.toggle('active');
    });

    // Close nav on link click
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        toggle.classList.remove('active');
      });
    });
  }
})();

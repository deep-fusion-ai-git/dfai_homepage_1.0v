/* === Animations JS === */
document.addEventListener('DOMContentLoaded', () => {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    // Reveal all elements immediately
    revealElements.forEach(el => el.classList.add('revealed'));
    return;
  }

  // Scroll reveal setup using IntersectionObserver
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Unobserve after showing
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null, // viewport
    threshold: 0.1, // trigger when 10% visible
    rootMargin: '0px 0px -50px 0px' // adjust activation point slightly above bottom edge
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });
});

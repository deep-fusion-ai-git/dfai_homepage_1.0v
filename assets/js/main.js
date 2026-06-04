/* === Main JS === */
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.querySelector('.main-nav');

  // Header scroll effect
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('site-header--scrolled');
    } else {
      header.classList.remove('site-header--scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  // Mobile Navigation toggle
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.contains('main-nav--open');
      if (isOpen) {
        mainNav.classList.remove('main-nav--open');
        navToggle.setAttribute('aria-expanded', 'false');
      } else {
        mainNav.classList.add('main-nav--open');
        navToggle.setAttribute('aria-expanded', 'true');
      }
    });

    // Close mobile nav when link clicked
    const navLinks = mainNav.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('main-nav--open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
});

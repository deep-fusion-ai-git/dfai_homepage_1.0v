/* === Home JS === */
document.addEventListener('DOMContentLoaded', () => {
  const counterSection = document.querySelector('.impact-numbers');
  const counters = document.querySelectorAll('.counter-num-wrapper [data-target]');

  if (!counterSection || counters.length === 0) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const animateCounter = (counter) => {
    const target = parseInt(counter.getAttribute('data-target'), 10);
    const suffix = counter.getAttribute('data-suffix') || '';
    const duration = 1500; // 1.5 seconds
    const startTime = performance.now();

    const updateCounter = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);

      // Ease out quad formula
      const easeProgress = progress * (2 - progress);

      const currentValue = Math.floor(easeProgress * target);

      if (counter.getAttribute('data-format') === 'comma') {
        counter.textContent = currentValue.toLocaleString() + suffix;
      } else {
        counter.textContent = currentValue + suffix;
      }

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        // Ensure final target value is set exactly
        if (counter.getAttribute('data-format') === 'comma') {
          counter.textContent = target.toLocaleString() + suffix;
        } else {
          counter.textContent = target + suffix;
        }
      }
    };

    requestAnimationFrame(updateCounter);
  };

  if (prefersReducedMotion) {
    // Directly set targets
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'), 10);
      const suffix = counter.getAttribute('data-suffix') || '';
      if (counter.getAttribute('data-format') === 'comma') {
        counter.textContent = target.toLocaleString() + suffix;
      } else {
        counter.textContent = target + suffix;
      }
    });
    return;
  }

  // IntersectionObserver for counters
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        counters.forEach(counter => animateCounter(counter));
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  observer.observe(counterSection);
});

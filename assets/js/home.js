/* === Home JS === */
document.addEventListener('DOMContentLoaded', () => {
  // --- Slideshow Logic ---
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  const nextBtn = document.querySelector('.hero-btn--next');
    const textItems = document.querySelectorAll('.hero-text-item');
    let currentSlide = 0;
    let slideInterval;

    if (slides.length > 0) {
      const showSlide = (index) => {
        // Pause any currently playing videos
        const currentVideo = slides[currentSlide].querySelector('video');
        if (currentVideo) {
          currentVideo.pause();
        }

        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        if (textItems.length > currentSlide) {
          textItems[currentSlide].classList.remove('active');
        }

        currentSlide = (index + slides.length) % slides.length;

        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
        if (textItems.length > currentSlide) {
          textItems[currentSlide].classList.add('active');
          // Force reflow to restart css animation
          const title = textItems[currentSlide].querySelector('.hero-text-title');
          const desc = textItems[currentSlide].querySelector('.hero-text-desc');
          const logo = textItems[currentSlide].querySelector('.hero-text-logo');
          if (title) {
            title.style.animation = 'none';
            title.offsetHeight; /* trigger reflow */
            title.style.animation = null;
          }
          if (desc) {
            desc.style.animation = 'none';
            desc.offsetHeight; /* trigger reflow */
            desc.style.animation = null;
          }
          if (logo) {
            logo.style.animation = 'none';
            logo.offsetHeight; /* trigger reflow */
            logo.style.animation = null;
          }
        }

        // Play video if the next slide is a video
        const nextVideo = slides[currentSlide].querySelector('video');
        if (nextVideo) {
          nextVideo.currentTime = 0;
          nextVideo.play().catch(e => console.log('Video autoplay interrupted:', e));
        }
      };

    const nextSlide = () => {
      showSlide(currentSlide + 1);
    };

    const prevSlide = () => {
      showSlide(currentSlide - 1);
    };

    const startInterval = () => {
      stopInterval();
      slideInterval = setInterval(nextSlide, 4000); // Shift every 4 seconds
    };

    const stopInterval = () => {
      if (slideInterval) clearInterval(slideInterval);
    };

    // Button event listeners
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        startInterval(); // Reset auto timer
      });
    }

    // Dot event listeners
    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        showSlide(idx);
        startInterval(); // Reset auto timer
      });
    } );

    // Start auto slide
    startInterval();
  }

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

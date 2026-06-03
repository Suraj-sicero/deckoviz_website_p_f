// Animation utility to handle reveal animations on scroll
export const revealAnimation = (element: HTMLElement, options = {}): void => {
  const defaultOptions = {
    threshold: 0.1,
    rootMargin: '0px',
    classToAdd: 'revealed',
  };

  const mergedOptions = { ...defaultOptions, ...options };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add(mergedOptions.classToAdd);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: mergedOptions.threshold,
    rootMargin: mergedOptions.rootMargin,
  });

  observer.observe(element);
};

// Apply reveal animations to multiple elements
export const setupRevealAnimations = (): void => {
  const elementsToAnimate = document.querySelectorAll('.reveal-animation');
  
  elementsToAnimate.forEach(element => {
    if (element instanceof HTMLElement) {
      revealAnimation(element);
    }
  });
};
/**
 * Intersection Observer-based scroll animations
 * Optimized for performance with GPU-accelerated CSS transitions
 * Respects prefers-reduced-motion for accessibility
 */

// Check for reduced motion preference
const prefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Animation selectors
const ANIMATION_SELECTORS = [
  '.fade-up',
  '.fade-up-hero', 
  '.slide-in-left',
  '.section-enter'
];

// Intersection Observer options
const observerOptions: IntersectionObserverInit = {
  root: null,
  rootMargin: '0px 0px -50px 0px', // Trigger slightly before element is fully visible
  threshold: 0.1
};

// Create observer instance
let observer: IntersectionObserver | null = null;

/**
 * Initialize scroll animations
 * Called on page load and after Astro page transitions
 */
function initScrollAnimations(): void {
  // Skip animations if user prefers reduced motion
  if (prefersReducedMotion()) {
    // Immediately show all animated elements
    ANIMATION_SELECTORS.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        el.classList.add('is-visible');
      });
    });
    return;
  }

  // Disconnect existing observer if any
  if (observer) {
    observer.disconnect();
  }

  // Create new observer
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add visible class to trigger CSS transition
        entry.target.classList.add('is-visible');
        
        // Unobserve element after animation (one-time animation)
        observer?.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all animated elements
  ANIMATION_SELECTORS.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      // Reset visibility state for page transitions
      el.classList.remove('is-visible');
      observer?.observe(el);
    });
  });
}

/**
 * Initialize mouse tracking for project cards
 * Creates a dynamic gradient that follows the cursor
 */
function initMouseTracking(): void {
  const cards = document.querySelectorAll<HTMLElement>('.project-card');
  
  cards.forEach(card => {
    // Remove existing listener to prevent duplicates
    card.removeEventListener('mousemove', handleMouseMove);
    card.addEventListener('mousemove', handleMouseMove);
    
    // Reset on mouse leave
    card.removeEventListener('mouseleave', handleMouseLeave);
    card.addEventListener('mouseleave', handleMouseLeave);
  });
}

function handleMouseMove(e: MouseEvent): void {
  const card = e.currentTarget as HTMLElement;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  // Use CSS custom properties for GPU-accelerated animation
  card.style.setProperty('--mouse-x', `${x}px`);
  card.style.setProperty('--mouse-y', `${y}px`);
}

function handleMouseLeave(e: MouseEvent): void {
  const card = e.currentTarget as HTMLElement;
  // Reset to center
  card.style.setProperty('--mouse-x', '50%');
  card.style.setProperty('--mouse-y', '50%');
}

/**
 * Initialize stagger animations for lists
 * Automatically adds data-stagger attributes based on index
 */
function initStaggerAnimations(): void {
  const staggerContainers = document.querySelectorAll('[data-stagger-children]');
  
  staggerContainers.forEach(container => {
    const children = container.querySelectorAll('.fade-up, .slide-in-left');
    children.forEach((child, index) => {
      child.setAttribute('data-stagger', String(Math.min(index + 1, 6)));
    });
  });
}

/**
 * Main initialization function
 */
function init(): void {
  initStaggerAnimations();
  initScrollAnimations();
  initMouseTracking();
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Re-initialize after Astro page transitions
document.addEventListener('astro:after-swap', init);

// Listen for reduced motion preference changes
window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', () => {
  initScrollAnimations();
});

export { init, initScrollAnimations, initMouseTracking, initStaggerAnimations };

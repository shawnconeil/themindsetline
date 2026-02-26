// ===== HOME PAGE — Scroll Reveals =====

const observerOptions = {
  threshold: 0.3,
  rootMargin: '0px 0px -10% 0px',
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observe all elements that need scroll reveal
document.querySelectorAll('.stakes__lead, .stakes__grid, .proof__inner').forEach((el) => {
  revealObserver.observe(el);
});

// ===== THE MINDSET LINE — Main JS =====

// ———— Mobile Nav Toggle ————
const toggle = document.querySelector('.nav__toggle');
const mobileNav = document.querySelector('.nav__mobile');

if (toggle && mobileNav) {
  toggle.addEventListener('click', () => {
    const isOpen = toggle.classList.toggle('open');
    mobileNav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('open');
      mobileNav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}


// ———— Scroll Reveal ————
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
);

// Framework section — whiteboard animation
document.querySelectorAll('.framework').forEach(el => {
  revealObserver.observe(el);
});

// General reveal sections
document.querySelectorAll('.reveal-section').forEach(el => {
  revealObserver.observe(el);
});


// ———— YouTube Lazy Load ————
const videoBtn = document.getElementById('videoBtn');
const videoWrap = document.getElementById('video');

if (videoBtn && videoWrap) {
  videoBtn.addEventListener('click', () => {
    const iframe = document.createElement('iframe');
    iframe.src = 'https://www.youtube.com/embed/NSZgShFpfPA?autoplay=1&rel=0';
    iframe.title = 'Living Above the Line — Shawn C. O\'Neil';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;

    videoWrap.innerHTML = '';
    videoWrap.appendChild(iframe);
    videoWrap.classList.add('video--active');
  });
}

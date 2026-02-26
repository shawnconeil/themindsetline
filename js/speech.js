// ===== SCROLL-DRIVEN SPEECH EXPERIENCE =====

const sections = document.querySelectorAll('.speech__section');
const fogOverlay = document.getElementById('fogOverlay');

// Intersection Observer — reveal sections as they scroll into view
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        // Update fog level based on section
        const fogLevel = entry.target.dataset.fog || '0';
        updateFog(fogLevel);
      }
    });
  },
  {
    threshold: 0.3,
    rootMargin: '0px 0px -10% 0px',
  }
);

sections.forEach((section) => {
  revealObserver.observe(section);
});

function updateFog(level) {
  // Remove all fog levels
  fogOverlay.className = 'fog-overlay';

  if (parseInt(level) > 0) {
    fogOverlay.classList.add(`fog-level-${level}`);
  } else {
    fogOverlay.classList.add('fog-level-0');
  }
}

// ===== AUDIO PLAYER =====

const audio = document.getElementById('speechAudio');
const toggleBtn = document.getElementById('audioToggle');
const playIcon = document.getElementById('playIcon');
const pauseIcon = document.getElementById('pauseIcon');
const audioFill = document.getElementById('audioFill');
const progressBar = document.querySelector('.audio-bar__progress');

let isPlaying = false;

toggleBtn.addEventListener('click', () => {
  if (isPlaying) {
    audio.pause();
    playIcon.style.display = '';
    pauseIcon.style.display = 'none';
  } else {
    audio.play();
    playIcon.style.display = 'none';
    pauseIcon.style.display = '';
  }
  isPlaying = !isPlaying;
});

audio.addEventListener('timeupdate', () => {
  if (audio.duration) {
    const pct = (audio.currentTime / audio.duration) * 100;
    audioFill.style.width = pct + '%';
  }
});

audio.addEventListener('ended', () => {
  isPlaying = false;
  playIcon.style.display = '';
  pauseIcon.style.display = 'none';
  audioFill.style.width = '0%';
});

// Click on progress bar to seek
progressBar.addEventListener('click', (e) => {
  const rect = progressBar.getBoundingClientRect();
  const pct = (e.clientX - rect.left) / rect.width;
  audio.currentTime = pct * audio.duration;
});

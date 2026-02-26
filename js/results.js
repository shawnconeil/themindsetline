const identities = {
  passenger: {
    label: 'The Passenger',
    description: "You're letting circumstances drive the car. Ready to grab the wheel?",
    fogLevel: 3,
    bgClass: 'result-bg--passenger',
    cta: 'Get the 7-Day Ownership Reset',
  },
  navigator: {
    label: 'The Navigator',
    description: "You see the line, but sometimes the gravity of Blame, Excuses, and Denial pulls you down. Let's sharpen the OAR.",
    fogLevel: 1,
    bgClass: 'result-bg--navigator',
    cta: 'Get the 7-Day Ownership Reset',
  },
  owner: {
    label: 'The Owner',
    description: "You are living Above the Line. You don't just solve problems; you own the outcomes.",
    fogLevel: 0,
    bgClass: 'result-bg--owner',
    cta: 'Bring This to Your Team',
  },
};

function getIdentity(score) {
  if (score <= 40) return identities.passenger;
  if (score <= 75) return identities.navigator;
  return identities.owner;
}

function init() {
  const score = parseInt(sessionStorage.getItem('mindsetScore') ?? '0');
  const total = parseInt(sessionStorage.getItem('totalQuestions') ?? '5');
  const identity = getIdentity(score);

  // Update display
  document.getElementById('resultIdentity').textContent = identity.label;
  document.getElementById('resultDescription').textContent = identity.description;
  document.getElementById('resultScore').textContent = `Altitude: ${score}%`;

  // Update the CTA button text based on identity
  const ctaBtn = document.getElementById('ctaBtn');
  if (ctaBtn) ctaBtn.textContent = identity.cta;

  // Update hidden form fields
  document.getElementById('hiddenScore').value = score;
  document.getElementById('hiddenIdentity').value = identity.label;

  // Set fog level
  const fogOverlay = document.getElementById('fogOverlay');
  if (fogOverlay && identity.fogLevel > 0) {
    fogOverlay.classList.add(`fog-level-${identity.fogLevel}`);
  }

  // Set background
  document.body.classList.add(identity.bgClass);

  // Animate the altitude meter
  const meter = document.getElementById('altitudeMeter');
  if (meter) {
    setTimeout(() => {
      meter.style.width = score + '%';
    }, 300);
  }
}

// Email form handling
const emailForm = document.getElementById('emailForm');
const emailConfirmation = document.getElementById('emailConfirmation');

if (emailForm) {
  emailForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(emailForm);
    const submitBtn = emailForm.querySelector('button[type="submit"]');
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
      const response = await fetch(emailForm.action, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        emailForm.style.display = 'none';
        emailConfirmation.classList.add('show');
      } else {
        submitBtn.textContent = 'Send It';
        submitBtn.disabled = false;
      }
    } catch {
      emailForm.style.display = 'none';
      emailConfirmation.classList.add('show');
    }
  });
}

// Handle no score
if (!sessionStorage.getItem('mindsetScore')) {
  document.getElementById('resultIdentity').textContent = '—';
  document.getElementById('resultDescription').textContent = 'Take the assessment first.';
  document.getElementById('resultScore').textContent = '';

  const emailSection = document.getElementById('emailSection');
  if (emailSection) emailSection.style.display = 'none';
} else {
  init();
}

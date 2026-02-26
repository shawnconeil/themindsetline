const identities = {
  passenger: {
    label: 'Passenger',
    description: "You're along for the ride.",
    fogLevel: 2,
    bgClass: 'result-bg--passenger',
  },
  navigator: {
    label: 'Navigator',
    description: 'You see the path. Now walk it.',
    fogLevel: 1,
    bgClass: 'result-bg--navigator',
  },
  owner: {
    label: 'Owner',
    description: 'You crossed the line.',
    fogLevel: 0,
    bgClass: 'result-bg--owner',
  },
};

function getIdentity(score) {
  if (score <= 1) return identities.passenger;
  if (score === 2) return identities.navigator;
  return identities.owner;
}

function init() {
  const score = parseInt(sessionStorage.getItem('mindsetScore') ?? '0');
  const total = parseInt(sessionStorage.getItem('totalQuestions') ?? '3');
  const identity = getIdentity(score);

  // Update display
  document.getElementById('resultIdentity').textContent = identity.label;
  document.getElementById('resultDescription').textContent = identity.description;
  document.getElementById('resultScore').textContent = `${score} of ${total} above the line`;

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
}

// Email form handling
const emailForm = document.getElementById('emailForm');
const emailSection = document.getElementById('emailSection');
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
      // If Formspree isn't configured yet, still show confirmation for demo
      emailForm.style.display = 'none';
      emailConfirmation.classList.add('show');
    }
  });
}

// Redirect to experience if no score
if (!sessionStorage.getItem('mindsetScore')) {
  // Show a default state rather than redirecting
  document.getElementById('resultIdentity').textContent = '—';
  document.getElementById('resultDescription').textContent = 'Take the assessment first.';
  document.getElementById('resultScore').textContent = '';

  const emailSection = document.getElementById('emailSection');
  if (emailSection) emailSection.style.display = 'none';
} else {
  init();
}

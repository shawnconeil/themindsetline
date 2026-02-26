const scenarios = [
  {
    number: 'Scenario 01',
    title: 'The Schedule',
    situation: 'Your calendar collapses. Three fires. One hour.',
    below: {
      label: 'Triage. React. Survive.',
      value: 0,
    },
    above: {
      label: 'Execute the priority. Ignore the noise.',
      value: 1,
    },
  },
  {
    number: 'Scenario 02',
    title: 'The Team',
    situation: 'A key player stops performing. Everyone notices.',
    below: {
      label: 'Give it time. Hope it corrects.',
      value: 0,
    },
    above: {
      label: 'Address it today. Directly.',
      value: 1,
    },
  },
  {
    number: 'Scenario 03',
    title: 'The Decision',
    situation: 'The data is incomplete. The pressure is real. The room is watching.',
    below: {
      label: 'Delay. Wait for more information.',
      value: 0,
    },
    above: {
      label: 'Decide. Adjust if needed. Move.',
      value: 1,
    },
  },
];

let currentStep = 0;
let score = 0;
let fogLevel = 0;
let clarityLevel = 0;

const scenarioArea = document.getElementById('scenarioArea');
const fogOverlay = document.getElementById('fogOverlay');
const clarityOverlay = document.getElementById('clarityOverlay');
const progressDots = document.querySelectorAll('.progress__dot');

function renderScenario(index) {
  const s = scenarios[index];

  scenarioArea.innerHTML = `
    <div class="scenario-card fade-in">
      <p class="scenario-card__number">${s.number}</p>
      <h2 class="scenario-card__title">${s.title}</h2>
      <p class="scenario-card__situation">"${s.situation}"</p>

      <div class="choice-group fade-in fade-in--delay-2">
        <button class="choice-btn choice-btn--below" data-value="${s.below.value}" aria-label="Below the line: ${s.below.label}">
          ${s.below.label}
        </button>
        <button class="choice-btn choice-btn--above" data-value="${s.above.value}" aria-label="Above the line: ${s.above.label}">
          ${s.above.label}
        </button>
      </div>
    </div>
  `;

  // Attach click handlers
  scenarioArea.querySelectorAll('.choice-btn').forEach(btn => {
    btn.addEventListener('click', () => handleChoice(parseInt(btn.dataset.value)));
  });

  // Update progress
  progressDots.forEach((dot, i) => {
    dot.classList.remove('active', 'completed');
    if (i < index) dot.classList.add('completed');
    if (i === index) dot.classList.add('active');
  });
}

function handleChoice(value) {
  score += value;

  if (value === 0) {
    // Below — increase fog
    fogLevel = Math.min(fogLevel + 1, 3);
    clarityLevel = Math.max(clarityLevel - 1, 0);
  } else {
    // Above — increase clarity
    clarityLevel = Math.min(clarityLevel + 1, 3);
    fogLevel = Math.max(fogLevel - 1, 0);
  }

  updateEffects();
  currentStep++;

  if (currentStep >= scenarios.length) {
    // Store score, navigate to results
    sessionStorage.setItem('mindsetScore', score);
    sessionStorage.setItem('totalQuestions', scenarios.length);

    // Brief pause to let the last effect settle
    setTimeout(() => {
      window.location.href = '/results.html';
    }, 800);
  } else {
    // Fade out, then render next
    const card = scenarioArea.querySelector('.scenario-card');
    if (card) {
      card.style.opacity = '0';
      card.style.transform = 'translateY(-12px)';
      card.style.transition = 'all 0.3s ease';
    }
    setTimeout(() => renderScenario(currentStep), 350);
  }
}

function updateEffects() {
  // Update fog
  fogOverlay.className = 'fog-overlay';
  if (fogLevel > 0) {
    fogOverlay.classList.add(`fog-level-${fogLevel}`);
  }

  // Update clarity
  clarityOverlay.className = 'clarity-overlay';
  if (clarityLevel > 0) {
    clarityOverlay.classList.add(`clarity-level-${clarityLevel}`);
  }
}

// Initialize
renderScenario(0);

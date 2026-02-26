const scenarios = [
  {
    number: 'Scenario 01',
    title: 'The Bottleneck',
    bedLabel: 'Blame / Excuses',
    oarLabel: 'Ownership',
    context: 'A critical project is stalled because a teammate hasn\'t delivered their portion. The CEO asks for a status update in 10 minutes.',
    below: 'I\'m waiting on Sarah. I\'ve emailed her twice; my hands are tied until she pings me back.',
    above: 'The project is stalled. I\'m going to hop on a quick call with Sarah now to clear the block, or I\'ll find a workaround before the meeting.',
  },
  {
    number: 'Scenario 02',
    title: 'The Critical Feedback',
    bedLabel: 'Denial / Excuses',
    oarLabel: 'Accountability',
    context: 'Your manager notes that your recent presentation "lacked the usual depth" during a team debrief.',
    below: 'They don\'t understand how busy I\'ve been with the merger. If they gave me more resources, the depth would be there.',
    above: 'I hear that. What specific data points were you looking for so I can ensure the next one hits the mark?',
  },
  {
    number: 'Scenario 03',
    title: 'The Market Shift',
    bedLabel: 'Denial / Blame',
    oarLabel: 'Responsibility',
    context: 'A major industry shift has caused your lead conversion to drop by 30% this month.',
    below: 'The market is just impossible right now. Nobody is buying. We just have to wait for the cycle to turn.',
    above: 'The old playbook isn\'t working. What new channels or messaging experiments can we launch this week to adapt?',
  },
  {
    number: 'Scenario 04',
    title: 'The Communication Gap',
    bedLabel: 'Blame',
    oarLabel: 'Ownership',
    context: 'You discover a massive error in a report you just sent out because you "misunderstood" the initial instructions.',
    below: 'The brief was totally vague. Anyone would have been confused by those instructions.',
    above: 'I misinterpreted the brief and didn\'t ask for clarification soon enough. I\'m sending a corrected version in 20 minutes.',
  },
  {
    number: 'Scenario 05',
    title: 'The "Not My Job" Moment',
    bedLabel: 'Denial / Blame',
    oarLabel: 'Accountability',
    context: 'You notice a recurring glitch in a software tool your team uses. It\'s annoying, but technically it belongs to IT to fix.',
    below: 'It\'s been broken for weeks. IT really needs to get their act together; it\'s making us look bad.',
    above: 'I\'m going to document the glitch and set a meeting with the IT lead to see how we can help them prioritize this fix.',
  },
];

let currentStep = 0;
const sliderValues = [];

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
      <p class="scenario-card__situation">${s.context}</p>

      <div class="slider-container fade-in fade-in--delay-1">
        <div class="slider-labels">
          <div class="slider-label slider-label--below">
            <span class="slider-label__tag">${s.bedLabel}</span>
            <span class="slider-label__direction">Below the Line</span>
          </div>
          <div class="slider-label slider-label--above">
            <span class="slider-label__tag">${s.oarLabel}</span>
            <span class="slider-label__direction">Above the Line</span>
          </div>
        </div>

        <div class="slider-track">
          <input type="range" min="0" max="100" value="50" class="mindset-slider" id="mindsetSlider" aria-label="Choose between below and above the line">
          <div class="slider-fill" id="sliderFill"></div>
        </div>

        <div class="slider-responses">
          <p class="slider-response slider-response--below" id="belowText">${s.below}</p>
          <p class="slider-response slider-response--above" id="aboveText">${s.above}</p>
        </div>
      </div>

      <button class="btn btn--above fade-in fade-in--delay-2" id="lockInBtn" style="margin-top: var(--space-lg);">Lock It In</button>
    </div>
  `;

  const slider = document.getElementById('mindsetSlider');
  const belowText = document.getElementById('belowText');
  const aboveText = document.getElementById('aboveText');
  const sliderFill = document.getElementById('sliderFill');
  const lockInBtn = document.getElementById('lockInBtn');

  function updateSliderUI(value) {
    const pct = value / 100;

    // Below text opacity: stronger when slider is left
    belowText.style.opacity = 1 - pct;
    // Above text opacity: stronger when slider is right
    aboveText.style.opacity = pct;

    // Fill gradient
    sliderFill.style.width = value + '%';

    // Dynamic fog/clarity based on current slider position
    updateLiveEffects(value);
  }

  slider.addEventListener('input', (e) => {
    updateSliderUI(parseInt(e.target.value));
  });

  lockInBtn.addEventListener('click', () => {
    const value = parseInt(slider.value);
    sliderValues.push(value);
    handleChoice(value);
  });

  // Initialize at 50
  updateSliderUI(50);

  // Update progress dots
  progressDots.forEach((dot, i) => {
    dot.classList.remove('active', 'completed');
    if (i < index) dot.classList.add('completed');
    if (i === index) dot.classList.add('active');
  });
}

function updateLiveEffects(sliderValue) {
  // Calculate cumulative average including current slider position
  const allValues = [...sliderValues, sliderValue];
  const avg = allValues.reduce((a, b) => a + b, 0) / allValues.length;

  // Fog: stronger when average is low (below the line)
  const fogIntensity = Math.max(0, 1 - (avg / 50));
  fogOverlay.style.opacity = fogIntensity * 0.7;
  fogOverlay.style.backdropFilter = `blur(${fogIntensity * 3}px)`;
  fogOverlay.style.webkitBackdropFilter = `blur(${fogIntensity * 3}px)`;

  // Clarity: stronger when average is high (above the line)
  const clarityIntensity = Math.max(0, (avg - 50) / 50);
  clarityOverlay.style.opacity = clarityIntensity * 0.8;
}

function handleChoice(value) {
  currentStep++;

  if (currentStep >= scenarios.length) {
    // Calculate weighted average percentage
    const avgScore = sliderValues.reduce((a, b) => a + b, 0) / sliderValues.length;
    sessionStorage.setItem('mindsetScore', Math.round(avgScore));
    sessionStorage.setItem('sliderValues', JSON.stringify(sliderValues));
    sessionStorage.setItem('totalQuestions', scenarios.length);

    setTimeout(() => {
      window.location.href = '/results.html';
    }, 600);
  } else {
    const card = scenarioArea.querySelector('.scenario-card');
    if (card) {
      card.style.opacity = '0';
      card.style.transform = 'translateY(-12px)';
      card.style.transition = 'all 0.3s ease';
    }
    setTimeout(() => renderScenario(currentStep), 350);
  }
}

// Initialize
renderScenario(0);

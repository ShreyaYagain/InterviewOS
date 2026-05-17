// ═══════════════════════════════════════════════════════════
// Home Page — Landing with round selection
// ═══════════════════════════════════════════════════════════

import { router } from '../router.js';
import { getQuestionsByRound } from '../data/questions.js';

const ROUNDS = [
    {
        id: 'dsa',
        title: 'DSA Coding',
        icon: '⚡',
        color: 'indigo',
        description: 'Data structures & algorithms. Solve coding problems under time pressure.',
        tags: ['Arrays', 'Trees', 'Graphs', 'DP']
    },
    {
        id: 'lld',
        title: 'Low-Level Design',
        icon: '🏗️',
        color: 'emerald',
        description: 'Object-oriented design. Build classes, interfaces, and patterns.',
        tags: ['OOP', 'SOLID', 'Patterns', 'UML']
    },
    {
        id: 'hld',
        title: 'System Design',
        icon: '🏛️',
        color: 'amber',
        description: 'Scalable architecture. Design distributed systems from scratch.',
        tags: ['Scale', 'DB', 'Cache', 'Queues']
    },
    {
        id: 'hr',
        title: 'Behavioral',
        icon: '🤝',
        color: 'rose',
        description: 'Leadership & collaboration. Answer with STAR framework.',
        tags: ['STAR', 'Leadership', 'Impact', 'Growth']
    }
];

export function renderHomePage(container) {
    let selectedRound = null;
    let selectedMode = 'coaching';
    let selectedDifficulty = 'medium';

    container.innerHTML = `
    <div class="page-container home-page-content">
      <!-- Hero -->
      <div class="home-hero animate-fade-in-up">
        <div class="hero-label">// welcome to interviewos</div>
        <h1 class="hero-title">Master Your <span class="text-green">FAANG</span> Interview.</h1>
        <p class="hero-subtitle">Agentic prep engine. Upload a JD. Practice 5 rounds. Ship your offer.</p>
      </div>

      <!-- AI Engine Feature Card -->
      <div class="ai-engine-banner animate-fade-in-up" id="jd-feature-card">
        <div class="ai-engine-left">
          <div class="ai-engine-content">
            <h3 class="ai-engine-title">Job Description Analyzer</h3>
            <p class="ai-engine-desc">Paste any JD and get a custom Take-Home assessment, FOSS repos, and FAANG rubric — powered by Grok xAI.</p>
            <div class="ai-engine-pills">
              <span class="ai-pill">Tech Stack Detection</span>
              <span class="ai-pill">Assessment Generator</span>
              <span class="ai-pill">FOSS Repos</span>
            </div>
          </div>
        </div>
        <button class="btn btn-primary ai-engine-cta" id="open-jd-analyzer">
          Try JD Analyzer →
        </button>
      </div>

      <!-- Round Cards -->
      <div class="round-cards" id="round-cards">
        ${ROUNDS.map(r => `
          <div class="round-card" data-round="${r.id}" data-color="${r.color}">
            <div class="round-card-label">[${r.id.toUpperCase()}]</div>
            <h3 class="round-card-title">${r.id === 'dsa' ? 'Question Bank' : r.title}</h3>
            <p class="round-card-desc">${r.id === 'dsa' ? 'NeetCode 150 — The ultimate DSA prep list.' : r.description}</p>
            <div class="round-card-tags">
              ${r.tags.map(t => `<span class="badge">${t}</span>`).join('')}
            </div>
            ${r.id === 'dsa' ? `<div class="round-card-count">${getQuestionsByRound(r.id).length} questions</div>` : ''}
          </div>
        `).join('')}
      </div>

      <!-- Config Panel -->
      <div class="config-panel animate-fade-in-up" id="config-panel" style="display:none;">
        <h3 class="config-title" id="config-title">// configure_interview</h3>

        <div class="config-row">
          <label class="config-label">mode</label>
          <div class="toggle-group" id="mode-toggle">
            <button class="toggle-btn" data-mode="strict">strict</button>
            <button class="toggle-btn active" data-mode="coaching">coaching</button>
          </div>
          <p class="config-hint" id="mode-hint">progressive hints available. great for practice.</p>
        </div>

        <div class="config-row">
          <label class="config-label">difficulty</label>
          <div class="toggle-group" id="diff-toggle">
            <button class="toggle-btn" data-diff="easy">easy</button>
            <button class="toggle-btn active" data-diff="medium">medium</button>
            <button class="toggle-btn" data-diff="hard">hard</button>
          </div>
        </div>

        <button class="btn btn-primary btn-lg start-btn" id="start-btn">
          Start Interview →
        </button>
      </div>
    </div>
  `;

    addHomeStyles(container);

    // Round card selection
    container.querySelectorAll('.round-card').forEach(card => {
        card.addEventListener('click', () => {
            container.querySelectorAll('.round-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            selectedRound = card.dataset.round;

            const panel = container.querySelector('#config-panel');
            panel.style.display = 'block';
            panel.classList.add('animate-fade-in-up');

            const roundData = ROUNDS.find(r => r.id === selectedRound);
            container.querySelector('#config-title').textContent = `// configure_${roundData.id}_interview`;
        });
    });

    // Mode toggle
    container.querySelectorAll('#mode-toggle .toggle-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            container.querySelectorAll('#mode-toggle .toggle-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedMode = btn.dataset.mode;
            container.querySelector('#mode-hint').textContent =
                selectedMode === 'coaching'
                    ? 'progressive hints available. great for practice.'
                    : 'no solutions given. challenging and realistic.';
        });
    });

    // Difficulty toggle
    container.querySelectorAll('#diff-toggle .toggle-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            container.querySelectorAll('#diff-toggle .toggle-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedDifficulty = btn.dataset.diff;
        });
    });

    // JD Analyzer banner button
    container.querySelector('#open-jd-analyzer').addEventListener('click', () => {
        router.navigate('/jd-parser');
    });

    // Start
    container.querySelector('#start-btn').addEventListener('click', () => {
        if (!selectedRound) return;
        router.navigate(`/interview?round=${selectedRound}&mode=${selectedMode}&difficulty=${selectedDifficulty}`);
    });
}

function addHomeStyles(container) {
    if (container.querySelector('#home-styles')) return;
    const style = document.createElement('style');
    style.id = 'home-styles';
    style.textContent = `
    .home-page-content { width: 100%; max-width: none; padding-top: 56px; }
    .home-hero { text-align: left; padding: 0 0 48px; }
    .hero-label {
      color: #00FF41; font-family: var(--font-mono); font-size: 11px;
      text-transform: lowercase; margin-bottom: 12px;
    }
    .hero-title {
      font-size: 40px; font-weight: 700; font-family: var(--font-mono);
      color: #FFFFFF; margin-bottom: 12px;
    }
    .text-green { color: #00FF41; }
    .hero-subtitle {
      font-size: 14px; color: #6B7280; font-family: 'Inter', sans-serif;
      margin-top: 12px; text-align: left;
    }

    /* AI Engine Banner */
    .ai-engine-banner {
      background: #0d0d0d; border: 1px solid rgba(0, 255, 65, 0.2);
      border-radius: 6px; padding: 24px 28px; margin-bottom: 32px;
      display: flex; align-items: center; justify-content: space-between;
      gap: 24px; width: 100%; max-width: none; box-sizing: border-box;
    }
    .ai-status { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
    .pulse-dot {
      width: 6px; height: 6px; background: #00FF41; border-radius: 50%;
      animation: pulse 2s infinite;
    }
    @keyframes pulse {
      0% { box-shadow: 0 0 0 0 rgba(0, 255, 65, 0.4); }
      70% { box-shadow: 0 0 0 10px rgba(0, 255, 65, 0); }
      100% { box-shadow: 0 0 0 0 rgba(0, 255, 65, 0); }
    }
    .ai-status-text { color: #00FF41; font-family: var(--font-mono); font-size: 11px; }
    .ai-engine-title { font-size: 20px; font-weight: 700; color: #FFFFFF; font-family: var(--font-mono); margin-bottom: 4px; }
    .ai-engine-desc { font-size: 13px; color: #6B7280; font-family: 'Inter', sans-serif; margin-bottom: 16px; line-height: 1.6; }
    .ai-engine-pills { display: flex; gap: 8px; flex-wrap: wrap; }
    .ai-pill {
      border: 1px solid rgba(0, 255, 65, 0.4); padding: 3px 10px;
      font-family: var(--font-mono); font-size: 11px; color: #00FF41;
      border-radius: 2px;
    }
    
    .round-cards {
      display: grid; grid-template-columns: repeat(2, 1fr);
      gap: 20px; margin-bottom: 40px; width: 100%; max-width: none;
    }
    .round-card {
      background: #0d0d0d; border: 1px solid #1a1a1a; border-radius: 6px;
      padding: 28px; cursor: pointer; transition: all 0.15s ease;
      min-height: 180px; display: flex; flex-direction: column; justify-content: space-between;
      width: 100%; box-sizing: border-box;
    }
    .round-card:hover { border-color: #00FF41; background: #111111; }
    .round-card-label {
      color: #00FF41; font-family: var(--font-mono); font-size: 11px; margin-bottom: 16px;
    }
    .round-card-title { font-size: 16px; font-weight: 700; color: #FFFFFF; font-family: var(--font-mono); margin-bottom: 8px; }
    .round-card-desc { font-size: 13px; color: #6B7280; font-family: 'Inter', sans-serif; margin-bottom: 16px; line-height: 1.6; }
    .round-card-count { color: #00FF41; font-family: var(--font-mono); font-size: 12px; margin-top: 12px; }

    .config-panel {
      width: 100%; max-width: none; margin: 40px 0; padding: 32px;
      background: #0d0d0d; border: 1px solid #1a1a1a; border-radius: 6px; box-sizing: border-box;
    }
    .config-title { font-size: 18px; font-weight: 700; font-family: var(--font-mono); text-align: center; margin-bottom: 24px; color: #00FF41; }
    .config-row { margin-bottom: 24px; }
    .config-label {
      display: block; font-size: 11px; color: #6B7280; font-family: var(--font-mono);
      text-transform: lowercase; margin-bottom: 8px;
    }
    .toggle-group { display: flex; gap: 8px; }
    .toggle-btn {
      flex: 1; padding: 10px; background: #000; border: 1px solid #1a1a1a;
      color: #6B7280; font-family: var(--font-mono); font-size: 13px; cursor: pointer;
      border-radius: 4px; transition: all 0.15s ease;
    }
    .toggle-btn:hover { border-color: #FFFFFF; color: #FFFFFF; }
    .toggle-btn.active { border-color: #00FF41; color: #00FF41; background: rgba(0, 255, 65, 0.05); }
    .config-hint { font-size: 11px; color: #374151; font-family: var(--font-mono); margin-top: 8px; }
    .start-btn { width: 100%; justify-content: center; margin-top: 8px; }
    `;
    container.appendChild(style);
}

// ═══════════════════════════════════════════════════════════
// HLD Practice Page — High-Level Design MCQs
// ═══════════════════════════════════════════════════════════

import { router } from '../router.js';

const MCQS = [
    {
        id: 1,
        question: "Which component is primarily responsible for ensuring high availability in a distributed database system?",
        options: ["Load Balancer", "Replication", "Caching", "Indexing"],
        answer: 1,
        explanation: "Replication ensures that multiple copies of data exist across different nodes, allowing the system to continue functioning even if one node fails."
    },
    {
        id: 2,
        question: "What is the main drawback of using a write-through cache?",
        options: ["Lower read latency", "Write latency overhead", "Data inconsistency", "Cache eviction complexity"],
        answer: 1,
        explanation: "In a write-through cache, data is written to both the cache and the underlying database simultaneously, which introduces extra latency for write operations."
    },
    {
        id: 3,
        question: "When would you prefer a NoSQL database over a Relational database?",
        options: ["Need for ACID compliance", "Structured data with fixed schema", "Unstructured data and horizontal scaling", "Complex multi-table joins"],
        answer: 2,
        explanation: "NoSQL databases are designed for high scalability and flexible schemas, making them ideal for unstructured data and large-scale distributed systems."
    }
];

export function renderHLDPracticePage(container) {
    let currentIdx = 0;
    let selectedOption = null;
    let showExplanation = false;
    let results = JSON.parse(localStorage.getItem('hld_mcq_results') || '{}');

    function render() {
        const mcq = MCQS[currentIdx];
        const progress = ((currentIdx + 1) / MCQS.length) * 100;

        container.innerHTML = `
      <div class="page-container hld-practice-page">
        <div class="hld-header animate-fade-in-up">
          <h1 class="hld-title">HLD Practice <span class="text-green">Module</span></h1>
          <p class="hld-subtitle">Master architectural patterns and trade-offs via targeted MCQs.</p>
        </div>

        <!-- Tabs Row -->
        <div class="hld-tabs-row">
            <div class="hld-tab active">MCQ Practice</div>
            <div class="hld-tab">Design Critique</div>
            <div class="hld-tab disabled">Case Studies (Coming Soon)</div>
        </div>

        <div class="hld-content animate-fade-in-up">
          <!-- Progress Bar -->
          <div class="mcq-progress-container">
            <div class="mcq-progress-bar"><div class="mcq-progress-fill" style="width: ${progress}%"></div></div>
            <div class="mcq-progress-text">Question ${currentIdx + 1} of ${MCQS.length}</div>
          </div>

          <!-- Question Card -->
          <div class="mcq-container">
            <div class="mcq-card">
              <div class="mcq-label">// distributed_systems_q${mcq.id}</div>
              <h2 class="mcq-question-text">${mcq.question}</h2>
              
              <div class="mcq-options">
                ${mcq.options.map((opt, i) => `
                  <div class="mcq-option ${selectedOption === i ? 'selected' : ''} ${showExplanation ? (i === mcq.answer ? 'correct' : (selectedOption === i ? 'wrong' : '')) : ''}" data-idx="${i}">
                    <div class="opt-letter">${String.fromCharCode(65 + i)}</div>
                    <div class="opt-text">${opt}</div>
                  </div>
                `).join('')}
              </div>

              ${showExplanation ? `
                <div class="mcq-explanation animate-fade-in">
                  <div class="expl-label">// explanation</div>
                  <p class="expl-text">${mcq.explanation}</p>
                </div>
              ` : ''}

              <!-- Navigation Row -->
              <div class="mcq-nav-row">
                <button class="btn-mcq-nav secondary" id="prev-btn" ${currentIdx === 0 ? 'disabled' : ''}>← Previous</button>
                <button class="btn-mcq-nav primary" id="submit-btn" ${selectedOption === null || showExplanation ? 'disabled' : ''}>Submit Answer</button>
                <button class="btn-mcq-nav secondary" id="next-btn" ${currentIdx === MCQS.length - 1 ? 'disabled' : ''}>Next →</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

        addHLDStyles(container);
        bindHLDEvents();
    }

    function bindHLDEvents() {
        container.querySelectorAll('.mcq-option').forEach(opt => {
            opt.addEventListener('click', () => {
                if (showExplanation) return;
                selectedOption = parseInt(opt.dataset.idx);
                render();
            });
        });

        container.querySelector('#submit-btn')?.addEventListener('click', () => {
            showExplanation = true;
            results[MCQS[currentIdx].id] = selectedOption === MCQS[currentIdx].answer;
            localStorage.setItem('hld_mcq_results', JSON.stringify(results));
            render();
        });

        container.querySelector('#prev-btn')?.addEventListener('click', () => {
            if (currentIdx > 0) {
                currentIdx--;
                resetState();
                render();
            }
        });

        container.querySelector('#next-btn')?.addEventListener('click', () => {
            if (currentIdx < MCQS.length - 1) {
                currentIdx++;
                resetState();
                render();
            }
        });
    }

    function resetState() {
        selectedOption = null;
        showExplanation = false;
    }

    render();
}

function addHLDStyles(container) {
    if (container.querySelector('#hld-styles')) return;
    const style = document.createElement('style');
    style.id = 'hld-styles';
    style.textContent = `
    .hld-practice-page { width: 100%; max-width: none; }
    .hld-header { padding: 0 0 32px; text-align: left; }
    .hld-title { font-size: 32px; font-weight: 700; font-family: var(--font-mono); color: #FFFFFF; margin-bottom: 8px; }
    .text-green { color: #00FF41; }
    .hld-subtitle { font-size: 13px; color: #6B7280; font-family: 'Inter', sans-serif; margin-bottom: 24px; }

    .hld-tabs-row { display: flex; gap: 32px; border-bottom: 1px solid #1a1a1a; margin-bottom: 40px; width: 100%; }
    .hld-tab { font-family: var(--font-mono); font-size: 12px; color: #6B7280; padding: 12px 0; cursor: pointer; border-bottom: 2px solid transparent; }
    .hld-tab.active { color: #FFFFFF; border-bottom-color: #00FF41; }
    .hld-tab.disabled { opacity: 0.3; cursor: not-allowed; }

    .mcq-progress-container { margin-bottom: 32px; width: 100%; }
    .mcq-progress-bar { background: #111; height: 2px; width: 100%; margin-bottom: 8px; }
    .mcq-progress-fill { background: #00FF41; height: 100%; transition: width 0.3s ease; }
    .mcq-progress-text { font-family: var(--font-mono); font-size: 11px; color: #374151; }

    .mcq-container { width: 100%; max-width: none; }
    .mcq-card { background: #0d0d0d; border: 1px solid #1a1a1a; border-radius: 6px; padding: 32px; width: 100%; box-sizing: border-box; }
    .mcq-label { font-family: var(--font-mono); font-size: 11px; color: #00FF41; margin-bottom: 20px; text-transform: lowercase; }
    .mcq-question-text { font-family: var(--font-mono); color: #FFFFFF; font-size: 18px; margin-bottom: 32px; line-height: 1.5; }

    .mcq-options { display: flex; flex-direction: column; gap: 12px; margin-bottom: 32px; width: 100%; }
    .mcq-option {
        display: flex; align-items: center; gap: 16px; padding: 0 20px; height: 52px;
        background: #000; border: 1px solid #1a1a1a; border-radius: 4px;
        cursor: pointer; transition: all 0.15s ease; width: 100%; box-sizing: border-box;
    }
    .mcq-option:hover { border-color: #00FF41; background: rgba(0, 255, 65, 0.04); }
    .mcq-option.selected { border-color: #00FF41; background: rgba(0, 255, 65, 0.08); }
    
    .opt-letter { 
        width: 24px; height: 24px; border: 1px solid #374151; display: flex; align-items: center; justify-content: center;
        font-family: var(--font-mono); font-size: 12px; color: #6B7280; flex-shrink: 0;
    }
    .mcq-option.selected .opt-letter { border-color: #00FF41; color: #00FF41; background: rgba(0, 255, 65, 0.15); }
    .opt-text { font-family: 'Inter', sans-serif; font-size: 14px; color: #FFFFFF; }

    .mcq-option.correct { border-color: #00FF41; background: rgba(0, 255, 65, 0.1); }
    .mcq-option.correct .opt-letter { border-color: #00FF41; color: #00FF41; background: #00FF41; color: #000; }
    .mcq-option.wrong { border-color: #EF4444; background: rgba(239, 68, 68, 0.1); }
    .mcq-option.wrong .opt-letter { border-color: #EF4444; color: #EF4444; }

    .mcq-explanation { background: #000; border-left: 2px solid #00FF41; padding: 20px; margin-bottom: 32px; width: 100%; box-sizing: border-box; }
    .expl-label { font-family: var(--font-mono); font-size: 11px; color: #00FF41; margin-bottom: 8px; }
    .expl-text { font-family: 'Inter', sans-serif; font-size: 13px; color: #6B7280; line-height: 1.6; }

    .mcq-nav-row { display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #1a1a1a; padding-top: 24px; width: 100%; }
    .btn-mcq-nav {
        font-family: var(--font-mono); font-size: 12px; padding: 10px 20px; border-radius: 4px; cursor: pointer; transition: all 0.1s;
    }
    .btn-mcq-nav.primary { background: #00FF41; color: #000; border: none; font-weight: 700; }
    .btn-mcq-nav.primary:disabled { background: #111; color: #374151; cursor: not-allowed; }
    .btn-mcq-nav.secondary { background: transparent; border: 1px solid #1a1a1a; color: #6B7280; }
    .btn-mcq-nav.secondary:hover:not(:disabled) { border-color: #FFFFFF; color: #FFFFFF; }
    .btn-mcq-nav:disabled { opacity: 0.3; cursor: not-allowed; }
    `;
    container.appendChild(style);
}

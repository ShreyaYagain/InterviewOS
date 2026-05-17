// ═══════════════════════════════════════════════════════════
// JD Parser Page — AntiGravity Agent: Job Description Analyzer
// ═══════════════════════════════════════════════════════════

import { callGrokAPI } from '../engine/api.js';
import { AGENT_PROFILES } from '../engine/agents.js';
import { router } from '../router.js';

export function renderJDParserPage(container) {
    container.innerHTML = `
    <div class="page-container jd-page">

      <!-- Hero Section -->
      <div class="jd-hero animate-fade-in-up">
        <div class="jd-hero-badge">
          <span class="jd-badge-dot"></span>
          <span>AntiGravity Agent — Powered by Grok xAI</span>
        </div>
        <h1 class="jd-hero-title">AI Job Description <span class="text-green">Analyzer</span></h1>
        <p class="jd-hero-subtitle">
          Paste any JD and get a custom FAANG-caliber Take-Home assessment, FOSS repository recommendations,
          and a full evaluation rubric — generated in seconds.
        </p>

        <!-- Feature Pills -->
        <div class="jd-feature-pills">
          <div class="jd-pill">⚡ tech stack detection</div>
          <div class="jd-pill">📋 take-home generator</div>
          <div class="jd-pill">📦 foss repos</div>
          <div class="jd-pill">📊 faang rubric</div>
        </div>
      </div>

      <!-- Main Input Section (2 Columns) -->
      <div class="jd-input-section animate-fade-in-up">
        <div class="jd-input-left">
          <div class="jd-input-card">
            <div class="jd-card-header">
              <span class="jd-label-mono">$ cat job_description.txt</span>
            </div>

            <textarea
              id="jd-input"
              class="jd-textarea"
              placeholder="Paste the full Job Description here... (e.g. Senior Backend Engineer at Google, requirements: Python, distributed systems, Kubernetes...)"
            ></textarea>

            <div class="jd-input-footer">
              <span class="jd-char-count" id="jd-char-count">0 characters</span>
              <button class="btn btn-primary jd-submit-btn" id="parse-jd-btn">
                <span id="btn-text">ship analysis →</span>
              </button>
            </div>
          </div>
        </div>

      </div>

      <!-- Loading State -->
      <div id="jd-loading" class="jd-loading" style="display:none;">
        <div class="jd-loading-spinner"></div>
        <p class="jd-loading-text">$ analyzing_signals<span class="jd-dots"></span></p>
      </div>

      <!-- Results Section -->
      <div id="jd-results" class="jd-results animate-fade-in-up" style="display:none;">

        <!-- Domain & Tech Row -->
        <div class="jd-result-row" id="jd-meta-row">
          <div class="jd-meta-card">
            <div class="jd-meta-label">// detected domain</div>
            <div class="jd-meta-value" id="jd-domain">—</div>
          </div>
          <div class="jd-meta-card">
            <div class="jd-meta-label">// signal mode</div>
            <div class="jd-meta-value" id="jd-signal">—</div>
          </div>
          <div class="jd-meta-card">
            <div class="jd-meta-label">// company</div>
            <div class="jd-meta-value" id="jd-company">—</div>
          </div>
          <div class="jd-meta-card">
            <div class="jd-meta-label">// tech stack</div>
            <div class="jd-tech-tags" id="jd-tech">—</div>
          </div>
        </div>

        <!-- Take-Home Assessment -->
        <div class="jd-section-card" id="jd-takehome-card">
          <div class="jd-section-header">
            <h3 class="jd-section-title">// take-home assessment</h3>
            <p class="jd-section-subtitle" id="jd-deadline"></p>
          </div>
          <pre id="jd-readme" class="jd-readme-pre"></pre>

          <div class="jd-stretch-goals" id="jd-stretch">
            <h4 class="jd-stretch-title">🌟 stretch goals</h4>
            <ul id="jd-stretch-list" class="jd-stretch-list"></ul>
          </div>
        </div>

        <!-- FOSS Repos -->
        <div class="jd-section-card">
          <div class="jd-section-header">
            <h3 class="jd-section-title">// recommended foss repositories</h3>
            <p class="jd-section-subtitle">Study these real-world codebases to align with the JD</p>
          </div>
          <div class="jd-repo-grid" id="jd-repos"></div>
        </div>

        <!-- FAANG Rubric -->
        <div class="jd-section-card">
          <div class="jd-section-header">
            <h3 class="jd-section-title">// faang evaluation rubric</h3>
            <p class="jd-section-subtitle">What interviewers will look for based on this JD</p>
          </div>
          <div class="jd-rubric-grid" id="jd-rubric"></div>
        </div>

        <!-- Study Plan -->
        <div class="jd-section-card">
          <div class="jd-section-header">
            <h3 class="jd-section-title">// personalized study plan</h3>
            <p class="jd-section-subtitle">A day-by-day guide to mastering this role</p>
          </div>
          <div class="jd-study-grid" id="jd-study-plan"></div>
        </div>

        <!-- YouTube & Resources -->
        <div class="jd-section-card">
          <div class="jd-section-header">
            <h3 class="jd-section-title">// recommended learning resources</h3>
            <p class="jd-section-subtitle">Curated YouTube channels and deep-dive searches</p>
          </div>
          <div class="jd-resources-grid">
            <div class="jd-resource-sub">
              <div class="jd-label-mono">// youtube_channels</div>
              <ul id="jd-youtube-list" class="jd-list-clean"></ul>
            </div>
            <div class="jd-resource-sub">
              <div class="jd-label-mono">// deep_dive_searches</div>
              <ul id="jd-search-list" class="jd-list-clean"></ul>
            </div>
          </div>
        </div>

        <!-- Chat with Agent -->
        <div class="jd-section-card jd-chat-section">
          <div class="jd-section-header">
            <h3 class="jd-section-title">// chat with notanki agent</h3>
            <p class="jd-section-subtitle">serious advice. raw motivation. zero notanki.</p>
          </div>
          <div class="jd-chat-box">
            <div class="jd-chat-messages" id="jd-chat-messages">
              <div class="chat-msg system">notanki: "this role isn't for the weak. if you want it, you'll earn it. how do you plan to conquer this tech stack?"</div>
            </div>
            <div class="jd-chat-input-row">
              <input type="text" id="jd-chat-input" placeholder="Ask about this JD..." />
              <button id="jd-chat-send" class="btn btn-primary">send</button>
            </div>
          </div>
        </div>

        <!-- CTA -->
        <div class="jd-cta-row">
          <button class="btn btn-primary btn-lg" id="jd-start-interview">
            🎯 start faang interview round
          </button>
          <button class="btn btn-secondary btn-lg" id="jd-reset">
            🔄 analyze another jd
          </button>
        </div>

      </div>
    </div>
  `;

    addJDStyles(container);
    bindJDEvents(container);
}

function bindJDEvents(container) {
    const textarea = container.querySelector('#jd-input');
    const charCount = container.querySelector('#jd-char-count');
    const parseBtn = container.querySelector('#parse-jd-btn');

    // Char count
    textarea.addEventListener('input', () => {
        const len = textarea.value.length;
        charCount.textContent = `${len} character${len !== 1 ? 's' : ''}`;
        charCount.style.color = len < 100 ? '#EF4444' : '#6B7280';
    });

    // Submit
    parseBtn.addEventListener('click', async () => {
        const jd = textarea.value.trim();
        if (jd.length < 100) {
            textarea.style.borderColor = '#EF4444';
            textarea.placeholder = '⚠️ Please paste a full Job Description (minimum 100 characters)';
            return;
        }
        textarea.style.borderColor = '#1a1a1a';
        await runParser(container, jd);
    });

    // Reset
    container.querySelector('#jd-reset')?.addEventListener('click', () => {
        container.querySelector('#jd-results').style.display = 'none';
        container.querySelector('#jd-loading').style.display = 'none';
        textarea.value = '';
        charCount.textContent = '0 characters';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Start interview
    container.querySelector('#jd-start-interview')?.addEventListener('click', () => {
        router.navigate('/interview?round=dsa&mode=coaching&difficulty=medium');
    });

    // Chat Logic
    const chatInput = container.querySelector('#jd-chat-input');
    const chatSend = container.querySelector('#jd-chat-send');
    const chatMessages = container.querySelector('#jd-chat-messages');

    const handleChat = async () => {
        const msg = chatInput.value.trim();
        if (!msg) return;

        chatInput.value = '';
        const userMsg = document.createElement('div');
        userMsg.className = 'chat-msg user';
        userMsg.textContent = `you: "${msg}"`;
        chatMessages.appendChild(userMsg);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        const aiMsg = document.createElement('div');
        aiMsg.className = 'chat-msg ai blink';
        aiMsg.textContent = 'notanki: "thinking..."';
        chatMessages.appendChild(aiMsg);

        try {
            const { callGroq } = await import('../services/aiService.js');
            const jdContent = container.querySelector('#jd-input').value;
            const systemPrompt = "You are the Notanki Agent. You provide serious, motivational, and technical advice. No fluff, just results. Push the candidate to be their best.";
            const userPrompt = `JD Context:\n${jdContent}\n\nCandidate Question: ${msg}`;
            
            const response = await callGroq(systemPrompt, userPrompt);
            
            aiMsg.classList.remove('blink');
            aiMsg.textContent = `notanki: "${response}"`;
        } catch (err) {
            aiMsg.textContent = `notanki: "Error: ${err.message}"`;
        }
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    chatSend?.addEventListener('click', handleChat);
    chatInput?.addEventListener('keydown', (e) => { if (e.key === 'Enter') handleChat(); });
}

async function runParser(container, jd) {
    const loading = container.querySelector('#jd-loading');
    const results = container.querySelector('#jd-results');
    const btnText = container.querySelector('#btn-text');
    const parseBtn = container.querySelector('#parse-jd-btn');

    // Show loading
    results.style.display = 'none';
    loading.style.display = 'flex';
    parseBtn.disabled = true;
    btnText.textContent = 'analyzing...';

    // Animate dots
    let dotCount = 0;
    const dotInterval = setInterval(() => {
        const dots = container.querySelector('.jd-dots');
        if (dots) dots.textContent = '.'.repeat((++dotCount % 3) + 1);
    }, 500);

    try {
        const rawResponse = await callGrokAPI(AGENT_PROFILES.JD_PARSER.systemPrompt, jd);

        let parsed = null;
        try {
            const cleanJson = rawResponse.replace(/```json/g, '').replace(/```/g, '').trim();
            parsed = JSON.parse(cleanJson);
        } catch (e) {
            throw new Error('Agent returned invalid JSON. Please try again.');
        }

        clearInterval(dotInterval);
        loading.style.display = 'none';
        renderResults(container, parsed);
        results.style.display = 'block';
        results.scrollIntoView({ behavior: 'smooth', block: 'start' });

    } catch (err) {
        clearInterval(dotInterval);
        loading.style.display = 'none';
        loading.innerHTML = `<p style="color:#EF4444; font-family: var(--font-mono); font-size: 13px;">❌ Error: ${err.message}</p>`;
        loading.style.display = 'flex';
    } finally {
        parseBtn.disabled = false;
        btnText.textContent = 'ship analysis →';
    }
}

function renderResults(container, parsed) {
    // Meta
    container.querySelector('#jd-domain').textContent = String(parsed.domain || 'N/A').toLowerCase();
    container.querySelector('#jd-signal').textContent = String(parsed.signal_mode || 'N/A').toLowerCase();
    container.querySelector('#jd-company').textContent = String(parsed.company || 'Unknown').toLowerCase();

    const techContainer = container.querySelector('#jd-tech');
    techContainer.innerHTML = (parsed.tech_stack_detected || [])
        .map(t => `<span class="jd-tech-tag">${String(t).toLowerCase()}</span>`)
        .join('') || '—';

    // Take-home
    const assessment = parsed.assessment || {};
    container.querySelector('#jd-deadline').textContent =
        assessment.deadline_suggestion ? `⏱️ suggested deadline: ${String(assessment.deadline_suggestion).toLowerCase()}` : '';
    container.querySelector('#jd-readme').textContent = assessment.takehome_readme || 'No readme generated.';

    const stretchList = container.querySelector('#jd-stretch-list');
    stretchList.innerHTML = (assessment.stretch_goals || []).map(g => `<li>${String(g).toLowerCase()}</li>`).join('');

    // FOSS Repos
    const repoGrid = container.querySelector('#jd-repos');
    repoGrid.innerHTML = (parsed.foss_projects || []).map(repo => `
        <a href="${repo.repo_url}" target="_blank" class="jd-repo-card">
          <div class="jd-repo-name">📦 ${String(repo.name || 'Repo').toLowerCase()}</div>
          <div class="jd-repo-why">${String(repo.why || 'No description').toLowerCase()}</div>
          <div class="jd-repo-stars">⭐ ${(repo.stars || 0).toLocaleString()}</div>
        </a>
    `).join('') || '<p style="color:#6B7280; font-family: var(--font-mono); font-size: 11px;">No repositories found.</p>';

    // Rubric
    const rubric = parsed.faang_rubric || {};
    const rubricLabels = { coding: 'coding', lld: 'lld', hld: 'hld', behavioral: 'behavioral', bar_raiser: 'bar raiser' };
    const rubricGrid = container.querySelector('#jd-rubric');
    rubricGrid.innerHTML = Object.entries(rubricLabels).map(([key, label]) => `
        <div class="jd-rubric-item">
          <div class="jd-rubric-label">// ${label}</div>
          <div class="jd-rubric-text">${String(rubric[key] || 'Standard FAANG bar applies.').toLowerCase()}</div>
        </div>
    `).join('');

    // Study Plan
    const studyGrid = container.querySelector('#jd-study-plan');
    studyGrid.innerHTML = (parsed.study_plan || []).map(day => `
        <div class="jd-study-day">
          <div class="jd-study-day-num">day ${day.day}</div>
          <div class="jd-study-focus">${String(day.focus).toLowerCase()}</div>
          <ul class="jd-study-topics">
            ${(day.topics || []).map(t => `<li>${String(t).toLowerCase()}</li>`).join('')}
          </ul>
        </div>
    `).join('') || '<p style="color:#6B7280; font-family: var(--font-mono); font-size: 11px;">No study plan generated.</p>';

    // Learning Resources
    const resources = parsed.learning_resources || {};
    const youtubeList = container.querySelector('#jd-youtube-list');
    youtubeList.innerHTML = (resources.youtube_channels || []).map(ch => `<li>📺 ${String(ch).toLowerCase()}</li>`).join('') || '<li>No specific channels recommended</li>';
    
    const searchList = container.querySelector('#jd-search-list');
    searchList.innerHTML = (resources.video_queries || []).map(q => `<li>🔍 ${String(q).toLowerCase()}</li>`).join('') || '<li>No specific searches recommended</li>';
}

function addJDStyles(container) {
    if (container.querySelector('#jd-styles')) return;
    const style = document.createElement('style');
    style.id = 'jd-styles';
    style.textContent = `
    .jd-page { width: 100%; max-width: none; }
    .jd-hero { text-align: left; padding: 48px 0 32px; }
    .jd-hero-badge {
      display: inline-flex; align-items: center; gap: 8px;
      background: #000; border: 1px solid #00FF41;
      border-radius: 4px; padding: 6px 16px; font-size: 11px;
      color: #00FF41; font-weight: 600; margin-bottom: 24px;
      font-family: var(--font-mono); text-transform: lowercase;
    }
    .jd-badge-dot {
      width: 8px; height: 8px; border-radius: 50%;
      background: #00FF41; box-shadow: 0 0 8px #00FF41;
      animation: pulse 2s infinite;
    }
    @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
    .jd-hero-title {
      font-size: 32px; font-weight: 700; font-family: var(--font-mono);
      color: #FFFFFF; margin-bottom: 8px;
    }
    .text-green { color: #00FF41; }
    .jd-hero-subtitle {
      font-size: 13px; color: #6B7280; font-family: 'Inter', sans-serif;
      margin-bottom: 24px; line-height: 1.6; text-align: left;
    }
    .jd-feature-pills { display: flex; gap: 12px; justify-content: flex-start; flex-wrap: wrap; margin-bottom: 32px; }
    .jd-pill {
      background: transparent; border: 1px solid rgba(0, 255, 65, 0.4);
      border-radius: 3px; padding: 4px 12px; font-size: 11px;
      color: #00FF41; font-family: var(--font-mono); text-transform: lowercase;
    }

    .jd-input-section { display: grid; grid-template-columns: 1fr; gap: 24px; margin-bottom: 48px; width: 100%; max-width: none; }
    .jd-input-left { width: 100%; }
    .jd-input-card { background: #0d0d0d; border: 1px solid #1a1a1a; border-radius: 6px; padding: 32px; height: 100%; box-sizing: border-box; }
    .jd-label-mono { font-family: var(--font-mono); color: #00FF41; font-size: 12px; margin-bottom: 16px; display: block; }
    .jd-textarea {
      width: 100%; min-height: 200px; padding: 16px; background: #000; border: 1px solid #1a1a1a;
      border-radius: 4px; color: #FFFFFF; font-family: var(--font-mono); font-size: 13px; line-height: 1.6;
      resize: vertical; outline: none; box-sizing: border-box;
    }
    .jd-textarea:focus { border-color: #00FF41; }
    .jd-input-footer { display: flex; justify-content: space-between; align-items: center; margin-top: 16px; }
    .jd-char-count { font-family: var(--font-mono); font-size: 11px; color: #6B7280; }



    .jd-loading { display: flex; flex-direction: column; align-items: center; gap: 16px; padding: 48px; width: 100%; }
    .jd-loading-spinner { width: 24px; height: 24px; border: 2px solid #1a1a1a; border-top-color: #00FF41; border-radius: 50%; animation: spin 0.8s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }
    .jd-loading-text { color: #00FF41; font-family: var(--font-mono); font-size: 13px; }

    .jd-results { width: 100%; max-width: none; display: flex; flex-direction: column; gap: 24px; }
    .jd-result-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; width: 100%; }
    .jd-meta-card { padding: 16px; background: #0d0d0d; border: 1px solid #1a1a1a; border-radius: 4px; }
    .jd-meta-label { font-family: var(--font-mono); font-size: 10px; color: #6B7280; margin-bottom: 8px; }
    .jd-meta-value { font-family: var(--font-mono); font-size: 14px; color: #FFFFFF; font-weight: 700; }
    .jd-tech-tags { display: flex; flex-wrap: wrap; gap: 6px; }
    .jd-tech-tag { font-family: var(--font-mono); font-size: 10px; color: #00FF41; border: 1px solid rgba(0, 255, 65, 0.4); padding: 2px 6px; border-radius: 2px; }

    .jd-section-card { background: #0d0d0d; border: 1px solid #1a1a1a; border-radius: 6px; padding: 24px; width: 100%; box-sizing: border-box; }
    .jd-section-title { font-family: var(--font-mono); font-size: 12px; color: #00FF41; margin-bottom: 4px; text-transform: lowercase; }
    .jd-section-subtitle { font-family: var(--font-mono); font-size: 10px; color: #6B7280; margin-bottom: 16px; }
    .jd-readme-pre { background: #000; border: 1px solid #1a1a1a; padding: 16px; border-radius: 4px; font-family: var(--font-mono); font-size: 12px; line-height: 1.6; color: #FFFFFF; white-space: pre-wrap; margin-bottom: 24px; }
    
    .jd-stretch-title { font-family: var(--font-mono); font-size: 11px; color: #FACC15; margin-bottom: 12px; }
    .jd-stretch-list { list-style: none; padding: 0; }
    .jd-stretch-list li { padding: 4px 0 4px 16px; position: relative; font-size: 12px; color: #9CA3AF; }
    .jd-stretch-list li::before { content: '>'; position: absolute; left: 0; color: #00FF41; font-family: var(--font-mono); }

    .jd-repo-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; width: 100%; }
    .jd-repo-card { padding: 16px; background: #000; border: 1px solid #1a1a1a; border-radius: 4px; text-decoration: none; transition: all 0.15s ease; width: 100%; box-sizing: border-box; }
    .jd-repo-card:hover { border-color: #00FF41; transform: translateY(-2px); }
    .jd-repo-name { font-family: var(--font-mono); font-size: 13px; color: #00FF41; margin-bottom: 4px; }
    .jd-repo-why { font-family: 'Inter', sans-serif; font-size: 11px; color: #6B7280; margin-bottom: 8px; }
    .jd-repo-stars { font-family: var(--font-mono); font-size: 10px; color: #374151; }

    .jd-rubric-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; width: 100%; }
    .jd-rubric-item { padding: 16px; background: #000; border: 1px solid #1a1a1a; border-radius: 4px; width: 100%; box-sizing: border-box; }
    .jd-rubric-label { font-family: var(--font-mono); font-size: 11px; color: #00FF41; margin-bottom: 8px; }
    .jd-rubric-text { font-family: 'Inter', sans-serif; font-size: 12px; color: #9CA3AF; line-height: 1.6; }

    .jd-cta-row { display: flex; gap: 16px; justify-content: flex-start; margin: 32px 0 64px; flex-wrap: wrap; width: 100%; }

    /* New Sections */
    .jd-study-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px; width: 100%; margin-top: 8px; }
    .jd-study-day { padding: 16px; background: #000; border: 1px solid #1a1a1a; border-radius: 4px; }
    .jd-study-day-num { font-family: var(--font-mono); font-size: 10px; color: #00FF41; margin-bottom: 4px; }
    .jd-study-focus { font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 700; color: #FFFFFF; margin-bottom: 8px; }
    .jd-study-topics { list-style: none; padding: 0; }
    .jd-study-topics li { font-size: 11px; color: #6B7280; padding: 2px 0; border-bottom: 1px solid #080808; }
    
    .jd-resources-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; width: 100%; }
    .jd-resource-sub { display: flex; flex-direction: column; gap: 12px; }
    .jd-list-clean { list-style: none; padding: 0; }
    .jd-list-clean li { font-size: 12px; color: #9CA3AF; padding: 4px 0; font-family: var(--font-mono); }

    .jd-chat-section { background: #080808; border-color: rgba(0, 255, 65, 0.2); }
    .jd-chat-box { border: 1px solid #1a1a1a; border-radius: 4px; background: #000; overflow: hidden; display: flex; flex-direction: column; height: 400px; }
    .jd-chat-messages { flex: 1; overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 12px; }
    .chat-msg { font-family: var(--font-mono); font-size: 12px; padding: 8px 12px; border-radius: 4px; max-width: 80%; line-height: 1.5; }
    .chat-msg.system { background: rgba(0, 255, 65, 0.05); color: #00FF41; align-self: flex-start; border-left: 2px solid #00FF41; }
    .chat-msg.user { background: #111; color: #FFFFFF; align-self: flex-end; border-right: 2px solid #333; }
    .chat-msg.ai { background: rgba(0, 255, 65, 0.1); color: #00FF41; align-self: flex-start; border-left: 2px solid #00FF41; }
    .blink { animation: chat-blink 1s infinite; }
    @keyframes chat-blink { 50% { opacity: 0.5; } }
    
    .jd-chat-input-row { display: flex; border-top: 1px solid #1a1a1a; padding: 12px; gap: 12px; background: #080808; }
    .jd-chat-input-row input { flex: 1; background: #000; border: 1px solid #333; color: #FFF; padding: 8px 12px; font-family: var(--font-mono); font-size: 12px; outline: none; border-radius: 4px; }
    .jd-chat-input-row input:focus { border-color: #00FF41; }

    @media (max-width: 1024px) {
        /* No overrides needed since base is already 1 column */
    }
    `;
    container.appendChild(style);
}

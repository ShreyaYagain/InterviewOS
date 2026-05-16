// ═══════════════════════════════════════════════════════════
// Interview Page — Main Interview UI
// ═══════════════════════════════════════════════════════════

import { router } from '../router.js';
import { InterviewEngine } from '../engine/interviewEngine.js';
import { DSARound } from '../engine/dsaRound.js';
import { LLDRound } from '../engine/lldRound.js';
import { HLDRound } from '../engine/hldRound.js';
import { HRRound } from '../engine/hrRound.js';
import { generateReport } from '../engine/rubricScorer.js';
import { getRandomQuestion } from '../data/questions.js';
import { getRubric } from '../data/rubrics.js';
import { ChatComponent } from '../components/chat.js';
import { AGENT_PROFILES } from '../engine/agents.js';
import { CodeEditorComponent } from '../components/codeEditor.js';
import { TimerComponent } from '../components/timer.js';

const ROUND_HANDLERS = { dsa: DSARound, lld: LLDRound, hld: HLDRound, hr: HRRound };
const ROUND_LABELS = { dsa: 'DSA Coding', lld: 'Low-Level Design', hld: 'System Design', hr: 'Behavioral' };

export function renderInterviewPage(container, params = {}) {
    const round = params.round || 'dsa';
    const mode = params.mode || 'coaching';
    const difficulty = params.difficulty || 'medium';

    const question = getRandomQuestion(round, difficulty);
    if (!question) {
        container.innerHTML = `<div class="page-container"><h2>No questions found for ${round} (${difficulty})</h2></div>`;
        return;
    }

    const rubric = getRubric(round);
    const engine = new InterviewEngine({ roundType: round, mode, question, difficulty });
    const RoundHandler = ROUND_HANDLERS[round];
    const roundLogic = new RoundHandler(engine);

    window.__interviewEngine = engine;
    window.__interviewReport = null;

    const isCodingRound = round === 'dsa' || round === 'lld';

    container.innerHTML = `
    <div class="interview-wrapper ${isCodingRound ? 'split-layout' : 'chat-only'}">
      <!-- Top Bar -->
      <div class="interview-topbar">
        <div class="topbar-left">
          <button class="exit-btn" id="exit-btn">← exit</button>
          <div class="round-badge">[${ROUND_LABELS[round].toUpperCase()}]</div>
          <div class="mode-tabs">
            <button class="mode-tab ${mode === 'coaching' ? 'active' : ''}" data-mode="coaching">coaching</button>
            <button class="mode-tab ${mode === 'strict' ? 'active' : ''}" data-mode="strict">start</button>
          </div>
        </div>
        
        <div class="topbar-center">
          <div class="stage-tabs">
            ${rubric.stages.map((s, i) => `
              <div class="stage-tab ${i === 0 ? 'active' : ''}" data-stage="${s}">${formatStageName(s)}</div>
            `).join('')}
          </div>
        </div>

        <div class="topbar-right">
          <div id="timer-container"></div>
          <button class="btn-report" id="report-btn" style="display:none;">VIEW REPORT</button>
        </div>
      </div>

      <!-- Main Body -->
      <div class="interview-body">
        ${isCodingRound ? `
          <div class="problem-panel">
            <div class="panel-label">// problem_statement</div>
            <h2 class="problem-title">${question.title.toLowerCase()}</h2>
            <div class="problem-difficulty difficulty-${question.difficulty.toLowerCase()}">[${question.difficulty.toUpperCase()}]</div>
            
            <div class="problem-description">
              <p>${question.statement || 'no description available.'}</p>
              
              <div class="panel-label mt-4">// resources</div>
              <div class="external-links">
                ${question.leetcodeUrl ? `<a href="${question.leetcodeUrl}" target="_blank" rel="noreferrer" class="link-item">LeetCode</a>` : ''}
                ${question.neetcodeUrl ? `<a href="${question.neetcodeUrl}" target="_blank" rel="noreferrer" class="link-item">NeetCode</a>` : ''}
                ${question.youtubeUrl ? `<a href="${question.youtubeUrl}" target="_blank" rel="noreferrer" class="link-item">YouTube</a>` : ''}
              </div>

              ${question.examples ? `
                <div class="problem-section">
                  <div class="section-label">examples</div>
                  <div class="example-content">
                    ${question.examples.map(ex => `
                      <div class="example-item">
                        <div class="ex-io"><strong>Input:</strong> ${ex.input}</div>
                        <div class="ex-io"><strong>Output:</strong> ${ex.output}</div>
                        ${ex.explanation ? `<div class="ex-desc"><strong>Explanation:</strong> ${ex.explanation}</div>` : ''}
                      </div>
                    `).join('')}
                  </div>
                </div>
              ` : ''}

              ${question.constraints ? `
                <div class="problem-section">
                  <div class="section-label">constraints</div>
                  <ul class="constraints-list">
                    ${question.constraints.map(c => `<li>${c}</li>`).join('')}
                  </ul>
                </div>
              ` : ''}
            </div>
          </div>
        ` : ''}

        <div class="interaction-area">
          <div class="chat-panel-wrapper" id="chat-panel"></div>
          ${isCodingRound ? `<div class="editor-panel-wrapper" id="editor-panel"></div>` : ''}
        </div>
      </div>
    </div>
    `;

    addInterviewStyles(container, isCodingRound);

    // Initialize components
    const chatPanel = container.querySelector('#chat-panel');
    const chat = new ChatComponent(chatPanel, {
        onSend: (text) => handleCandidateInput(text),
        onHint: () => handleHintRequest()
    });

    if (isCodingRound) {
        const editorPanel = container.querySelector('#editor-panel');
        new CodeEditorComponent(editorPanel, {
            onSubmit: (code) => {
                engine.candidateCode = code;
                engine.addArtifact('code', code);
                handleCandidateInput('I have submitted my code. Please review it.');
            }
        });
    }

    const timerContainer = container.querySelector('#timer-container');
    const timer = new TimerComponent(timerContainer, {
        totalMinutes: rubric.timeMinutes,
        onComplete: () => {
            chat.addSystemMessage('⏰ Time is up!');
            engine.goToStage('wrapUp');
            handleCandidateInput('Time is up, let me wrap up.');
        }
    });
    timer.start();

    // Event Handlers
    container.querySelector('#exit-btn').addEventListener('click', () => {
        timer.destroy();
        router.navigate('/');
    });

    const reportBtn = container.querySelector('#report-btn');
    reportBtn.addEventListener('click', () => {
        timer.destroy();
        window.__interviewReport = generateReport(engine);
        router.navigate('/report');
    });

    async function handleCandidateInput(text) {
        chat.addMessage('candidate', text);
        engine.addMessage('candidate', text);
        chat.showTyping();

        try {
            const fallbackResponse = roundLogic.processInput(text);
            const { callGrokAPI } = await import('../engine/api.js');
            const history = engine.conversation.map(m => `${m.role}: ${m.content}`).join('\n');
            const questionCtx = `QUESTION: ${engine.question.title}\nSTATEMENT: ${engine.question.statement || ''}\nDIFFICULTY: ${engine.difficulty}`;
            const prompt = `${AGENT_PROFILES.NOTANKI_INTERVIEWER.systemPrompt}\n\nROUND: ${round.toUpperCase()}\nMODE: ${mode}\nSTAGE: ${engine.currentStage}\n\n${questionCtx}\n\nConversation History:\n${history}`;
            
            const apiResponse = await callGrokAPI(prompt, text);
            const responseText = apiResponse && !apiResponse.includes('mocked') && !apiResponse.includes('apologize') ? apiResponse : fallbackResponse;

            chat.hideTyping();
            chat.addMessage('interviewer', responseText);
            engine.addMessage('interviewer', responseText);
            
            updateStageIndicators();
            if (engine.isComplete) reportBtn.style.display = 'inline-block';
        } catch(err) {
            chat.hideTyping();
            chat.addMessage('interviewer', roundLogic.processInput(text));
        }
    }

    function handleHintRequest() {
        if (engine.hintsUsed < engine.maxHints) handleCandidateInput('I need a hint.');
    }

    function updateStageIndicators() {
        container.querySelectorAll('.stage-tab').forEach((tab, i) => {
            tab.classList.toggle('active', i === engine.currentStageIndex);
            tab.classList.toggle('completed', i < engine.currentStageIndex);
        });
    }

    showInterviewerResponse(roundLogic.processInput(''));
    function showInterviewerResponse(text) {
        chat.addMessage('interviewer', text);
        engine.addMessage('interviewer', text);
    }
}

function formatStageName(stage) {
    const names = { clarify: 'clarify', approach: 'approach', code: 'code', test: 'test', optimize: 'optimize', wrapUp: 'wrap up' };
    return names[stage] || stage;
}

function addInterviewStyles(container, isCodingRound) {
    const style = document.createElement('style');
    style.textContent = `
    .interview-wrapper { height: 100vh; width: 100vw; display: flex; flex-direction: column; background: #000; overflow: hidden; }
    
    .interview-topbar { 
        height: 44px; background: #000; border-bottom: 1px solid #1a1a1a; 
        display: flex; align-items: center; justify-content: space-between; padding: 0 20px; flex-shrink: 0;
    }
    .topbar-left, .topbar-right { display: flex; align-items: center; gap: 16px; }
    .exit-btn { background: transparent; border: none; color: #6B7280; font-family: var(--font-mono); font-size: 12px; cursor: pointer; transition: color 0.1s; }
    .exit-btn:hover { color: #FFFFFF; }
    
    .round-badge { border: 1px solid #00FF41; color: #00FF41; font-family: var(--font-mono); font-size: 11px; padding: 3px 10px; border-radius: 2px; }
    
    .mode-tabs { display: flex; gap: 8px; }
    .mode-tab { 
        background: transparent; border: 1px solid #1a1a1a; color: #6B7280; 
        font-family: var(--font-mono); font-size: 11px; padding: 4px 10px; border-radius: 2px; cursor: pointer; 
    }
    .mode-tab.active { border-color: #00FF41; color: #00FF41; }
    
    .stage-tabs { display: flex; gap: 20px; }
    .stage-tab { 
        font-family: var(--font-mono); font-size: 11px; color: #374151; cursor: pointer; 
        padding: 12px 0; border-bottom: 2px solid transparent; transition: all 0.1s;
    }
    .stage-tab:hover { color: #6B7280; }
    .stage-tab.active { color: #FFFFFF; border-bottom-color: #00FF41; }
    .stage-tab.completed { color: #00FF41; opacity: 0.6; }
    
    #timer-container { font-family: var(--font-mono); color: #00FF41; font-size: 13px; margin-left: auto; }
    .btn-report { background: #00FF41; color: #000; font-family: var(--font-mono); font-size: 11px; font-weight: 700; border: none; padding: 6px 12px; border-radius: 2px; cursor: pointer; }

    .interview-body { flex: 1; display: flex; overflow: hidden; }
    
    .problem-panel { 
        width: 25%; background: #0a0a0a; border-right: 1px solid #1a1a1a; 
        padding: 24px; overflow-y: auto; display: flex; flex-direction: column;
    }
    .panel-label { color: #00FF41; font-family: var(--font-mono); font-size: 10px; margin-bottom: 16px; }
    .problem-title { font-family: var(--font-mono); color: #FFF; font-size: 18px; margin-bottom: 12px; }
    .problem-difficulty { font-family: var(--font-mono); font-size: 10px; margin-bottom: 24px; }
    .difficulty-easy { color: #00FF41; }
    .difficulty-medium { color: #FACC15; }
    .difficulty-hard { color: #EF4444; }
    
    .problem-description { font-family: 'Inter', sans-serif; color: #6B7280; font-size: 13px; line-height: 1.7; }
    .problem-section { margin-top: 24px; border-left: 2px solid #1a1a1a; padding-left: 12px; }
    .section-label { font-family: var(--font-mono); font-size: 11px; color: #FFFFFF; margin-bottom: 12px; text-transform: lowercase; }
    .example-item { margin-bottom: 16px; }
    .ex-io { font-family: var(--font-mono); color: #9CA3AF; font-size: 12px; }
    .constraints-list { list-style: none; padding: 0; margin-top: 8px; }
    .constraints-list li { position: relative; padding-left: 14px; margin-bottom: 4px; }
    .constraints-list li::before { content: '•'; position: absolute; left: 0; color: #374151; }

    .external-links { display: flex; gap: 8px; margin-bottom: 16px; margin-top: 8px; }
    .link-item { 
        color: #00FF41; font-family: var(--font-mono); font-size: 10px; 
        text-decoration: none; border: 1px solid rgba(0, 255, 65, 0.2); 
        padding: 3px 8px; border-radius: 2px; transition: all 0.2s; 
    }
    .link-item:hover { background: rgba(0, 255, 65, 0.1); border-color: #00FF41; }

    .interaction-area { flex: 1; display: flex; overflow: hidden; }
    .chat-panel-wrapper { flex: 1; border-right: 1px solid #1a1a1a; display: flex; flex-direction: column; min-width: 300px; }
    .editor-panel-wrapper { flex: 2.5; display: flex; flex-direction: column; }

    .chat-only .interaction-area { width: 100%; }
    .chat-only .chat-panel-wrapper { border-right: none; }
  `;
    container.appendChild(style);
}

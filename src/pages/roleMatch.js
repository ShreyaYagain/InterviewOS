// ═══════════════════════════════════════════════════════════
// Role Radar — AI Role Matching Wizard
// ═══════════════════════════════════════════════════════════

import { getRoleMatches } from '../services/roleRadar.js';

const state = {
    step: 1,
    branch: '',
    year: '',
    interests: [],
    workStyle: '',
    problemType: '',
    projects: [
        { name: '', stack: '', type: '' },
        { name: '', stack: '', type: '' },
        { name: '', stack: '', type: '' },
        { name: '', stack: '', type: '' }
    ],
    codingLevel: ''
};

const BRANCHES = [
    'Computer Science / IT',
    'Electronics & Communication',
    'Electrical Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Information Science',
    'Other Engineering'
];

const INTERESTS = [
    'Building web apps', 'System design & architecture', 'Machine learning & AI',
    'Data & analytics', 'Mobile apps', 'DevOps & cloud infrastructure',
    'Cybersecurity', 'Competitive programming & DSA', 'Open source contribution',
    'Developer tools & productivity', 'Databases & storage systems',
    'Computer networks & protocols', 'Embedded systems & IoT', 'Game development',
    'Blockchain & Web3', 'Research & academia'
];

const WORK_STYLES = [
    'I like building things end to end',
    'I like going deep into one area',
    'I like working on infra and scale',
    'I like research and experimenting'
];

const PROBLEM_TYPES = [
    'User-facing product problems',
    'Performance and optimization',
    'Data and pattern recognition',
    'Security and reliability',
    'Automation and tooling'
];

const PROJECT_TYPES = [
    'Full Stack Web', 'Backend API', 'Frontend UI', 'ML / AI',
    'Mobile', 'DevOps / Infra', 'CLI Tool', 'Data Analysis', 'Research', 'Other'
];

const CODING_LEVELS = [
    'Just starting out — I need structure',
    'Practiced some — I know the basics',
    'Fairly confident — I can solve mediums',
    'Strong — I can handle hard problems'
];

export function renderRoleMatchPage(container) {
    // Reset state on mount
    state.step = 1;
    state.branch = '';
    state.year = '';
    state.interests = [];
    state.workStyle = '';
    state.problemType = '';
    state.projects = Array(4).fill().map(() => ({ name: '', stack: '', type: '' }));
    state.codingLevel = '';

    container.innerHTML = `
        <div class="page-container role-match-page animate-fade-in-up">
            <!-- Header -->
            <div class="rm-header">
                <div class="rm-label-mono">// role_radar</div>
                <h1 class="rm-title">find your perfect tech role</h1>
                <p class="rm-subtitle">answer a few questions. get matched to roles that actually fit you — and why.</p>
            </div>

            <!-- Wizard Container -->
            <div class="rm-wizard">
                <div class="rm-progress-container">
                    <div class="rm-step-indicators">
                        <span class="rm-step-label" data-step="1">[1] branch</span>
                        <span class="rm-step-arrow">→</span>
                        <span class="rm-step-label" data-step="2">[2] interests</span>
                        <span class="rm-step-arrow">→</span>
                        <span class="rm-step-label" data-step="3">[3] projects</span>
                        <span class="rm-step-arrow">→</span>
                        <span class="rm-step-label" data-step="4">[4] results</span>
                    </div>
                    <div class="rm-progress-bar-bg">
                        <div class="rm-progress-bar-fill" id="rm-progress-fill"></div>
                    </div>
                </div>

                <div id="rm-step-content" class="rm-step-content"></div>

                <div class="rm-navigation" id="rm-navigation">
                    <button class="btn btn-secondary" id="rm-btn-back">[ ← back ]</button>
                    <button class="btn btn-primary" id="rm-btn-next">[ next → ]</button>
                </div>
            </div>
        </div>
    `;

    addRoleMatchStyles(container);
    renderCurrentStep(container);
    bindNavigationEvents(container);
}

function bindNavigationEvents(container) {
    const btnBack = container.querySelector('#rm-btn-back');
    const btnNext = container.querySelector('#rm-btn-next');

    btnBack.addEventListener('click', () => {
        if (state.step > 1) {
            state.step--;
            renderCurrentStep(container);
        }
    });

    btnNext.addEventListener('click', () => {
        if (state.step < 4) {
            state.step++;
            renderCurrentStep(container);
        }
    });
}

function updateProgressUI(container) {
    const progressFill = container.querySelector('#rm-progress-fill');
    progressFill.style.width = `${(state.step / 4) * 100}%`;

    container.querySelectorAll('.rm-step-label').forEach(label => {
        const stepNum = parseInt(label.dataset.step);
        if (stepNum === state.step) {
            label.style.color = '#00FF41';
            label.style.opacity = '1';
        } else if (stepNum < state.step) {
            label.style.color = '#FFFFFF';
            label.style.opacity = '0.6';
        } else {
            label.style.color = '#6B7280';
            label.style.opacity = '0.6';
        }
    });

    const btnBack = container.querySelector('#rm-btn-back');
    const btnNext = container.querySelector('#rm-btn-next');
    const navigation = container.querySelector('#rm-navigation');

    if (state.step === 1) {
        btnBack.style.visibility = 'hidden';
    } else {
        btnBack.style.visibility = 'visible';
    }

    if (state.step === 4) {
        navigation.style.display = 'none';
    } else {
        navigation.style.display = 'flex';
    }
}

function renderCurrentStep(container) {
    const content = container.querySelector('#rm-step-content');
    updateProgressUI(container);

    if (state.step === 1) {
        content.innerHTML = `
            <h2 class="rm-step-title">// what_is_your_branch</h2>
            <div class="rm-step-card">
                <p class="rm-question-text">What are you studying?</p>
                <div class="rm-grid-2">
                    ${BRANCHES.map(b => `
                        <div class="rm-select-card ${state.branch === b ? 'selected' : ''}" data-type="branch" data-val="${b}">
                            ${b}
                        </div>
                    `).join('')}
                </div>
                
                <div class="rm-input-group" style="margin-top: 32px;">
                    <label class="rm-input-label">// current_year</label>
                    <input type="text" id="rm-year-input" class="rm-input" placeholder="e.g. 3rd year, Final year" value="${state.year}">
                </div>
            </div>
        `;

        // Bind events for Step 1
        content.querySelectorAll('.rm-select-card[data-type="branch"]').forEach(card => {
            card.addEventListener('click', (e) => {
                state.branch = e.target.dataset.val;
                renderCurrentStep(container);
            });
        });

        const yearInput = content.querySelector('#rm-year-input');
        yearInput.addEventListener('input', (e) => {
            state.year = e.target.value;
        });

    } else if (state.step === 2) {
        content.innerHTML = `
            <h2 class="rm-step-title">// what_excites_you</h2>
            <p class="rm-step-subtitle">Select everything that genuinely interests you. Be honest — this shapes your matches.</p>
            
            <div class="rm-step-card">
                <div class="rm-tags-grid">
                    ${INTERESTS.map(i => `
                        <div class="rm-tag ${state.interests.includes(i) ? 'selected' : ''}" data-val="${i}">
                            ${i}
                        </div>
                    `).join('')}
                </div>

                <div class="rm-divider"></div>

                <p class="rm-question-text">How do you prefer to work?</p>
                <div class="rm-pills-list">
                    ${WORK_STYLES.map(ws => `
                        <div class="rm-pill ${state.workStyle === ws ? 'selected' : ''}" data-type="workstyle" data-val="${ws}">
                            ${ws}
                        </div>
                    `).join('')}
                </div>

                <div class="rm-divider"></div>

                <p class="rm-question-text">What kind of problems do you enjoy most?</p>
                <div class="rm-pills-list">
                    ${PROBLEM_TYPES.map(pt => `
                        <div class="rm-pill ${state.problemType === pt ? 'selected' : ''}" data-type="problemtype" data-val="${pt}">
                            ${pt}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        // Bind events for Step 2
        content.querySelectorAll('.rm-tag').forEach(tag => {
            tag.addEventListener('click', (e) => {
                const val = e.target.dataset.val;
                if (state.interests.includes(val)) {
                    state.interests = state.interests.filter(i => i !== val);
                } else {
                    state.interests.push(val);
                }
                renderCurrentStep(container);
            });
        });

        content.querySelectorAll('.rm-pill[data-type="workstyle"]').forEach(pill => {
            pill.addEventListener('click', (e) => {
                state.workStyle = e.target.dataset.val;
                renderCurrentStep(container);
            });
        });

        content.querySelectorAll('.rm-pill[data-type="problemtype"]').forEach(pill => {
            pill.addEventListener('click', (e) => {
                state.problemType = e.target.dataset.val;
                renderCurrentStep(container);
            });
        });

    } else if (state.step === 3) {
        content.innerHTML = `
            <h2 class="rm-step-title">// your_projects</h2>
            <p class="rm-step-subtitle">Add up to 4 projects. One line each — keep it brief.</p>
            
            <div class="rm-projects-container">
                ${state.projects.map((proj, idx) => `
                    <div class="rm-project-row">
                        <input type="text" class="rm-input proj-name" data-idx="${idx}" placeholder="e.g. Chat App" value="${proj.name}">
                        <input type="text" class="rm-input proj-stack" data-idx="${idx}" placeholder="e.g. React, Node, MongoDB" value="${proj.stack}">
                        <select class="rm-select proj-type" data-idx="${idx}">
                            <option value="" disabled ${!proj.type ? 'selected' : ''}>Select Type</option>
                            ${PROJECT_TYPES.map(pt => `
                                <option value="${pt}" ${proj.type === pt ? 'selected' : ''}>${pt}</option>
                            `).join('')}
                        </select>
                    </div>
                `).join('')}
            </div>

            <div class="rm-step-card" style="margin-top: 24px;">
                <p class="rm-question-text">How comfortable are you with coding interviews?</p>
                <div class="rm-pills-list">
                    ${CODING_LEVELS.map(cl => `
                        <div class="rm-pill ${state.codingLevel === cl ? 'selected' : ''}" data-type="codinglevel" data-val="${cl}">
                            ${cl}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        // Bind events for Step 3
        content.querySelectorAll('.proj-name').forEach(input => {
            input.addEventListener('input', (e) => {
                state.projects[e.target.dataset.idx].name = e.target.value;
            });
        });
        content.querySelectorAll('.proj-stack').forEach(input => {
            input.addEventListener('input', (e) => {
                state.projects[e.target.dataset.idx].stack = e.target.value;
            });
        });
        content.querySelectorAll('.proj-type').forEach(select => {
            select.addEventListener('change', (e) => {
                state.projects[e.target.dataset.idx].type = e.target.value;
            });
        });

        content.querySelectorAll('.rm-pill[data-type="codinglevel"]').forEach(pill => {
            pill.addEventListener('click', (e) => {
                state.codingLevel = e.target.dataset.val;
                renderCurrentStep(container);
            });
        });

    } else if (state.step === 4) {
        content.innerHTML = `
            <div class="rm-loading-state" id="rm-loading">
                <div class="rm-terminal-cursor"></div>
                <div class="rm-loading-lines" id="rm-loading-lines"></div>
            </div>
            <div id="rm-api-results" style="display:none; padding: 24px; background: #0d0d0d; border: 1px solid #1a1a1a; border-radius: 6px; margin-top: 24px;"></div>
        `;

        executeAnalysis(container);
    }
}

async function executeAnalysis(container) {
    const linesContainer = container.querySelector('#rm-loading-lines');
    const loadingBlock = container.querySelector('#rm-loading');
    const resultsBlock = container.querySelector('#rm-api-results');
    
    const messages = [
        "// analyzing your profile...",
        "// matching roles...",
        "// generating recommendations..."
    ];

    for (let i = 0; i < messages.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 600));
        const line = document.createElement('div');
        line.className = 'rm-loading-line';
        line.textContent = messages[i];
        linesContainer.appendChild(line);
    }

    try {
        const data = await getRoleMatches(state);
        
        loadingBlock.style.display = 'none';
        resultsBlock.style.display = 'block';
        resultsBlock.innerHTML = `
            <div class="rm-summary-bar">
                ${data.summary}
            </div>
            
            <div class="rm-roles-list">
                ${data.roles.map((role, idx) => `
                    <div class="rm-role-card">
                        <div class="rm-role-top">
                            <div class="rm-role-title-wrap">
                                <span class="rm-role-num">0${idx + 1}</span>
                                <span class="rm-role-title">${role.title}</span>
                            </div>
                            <div class="rm-role-match">${role.match}% match</div>
                        </div>
                        
                        <div class="rm-role-section-label">// why_this_fits_you</div>
                        <div class="rm-role-why">${role.why}</div>
                        
                        <div class="rm-role-section-label">// what_to_study</div>
                        <div class="rm-role-study-tags">
                            ${(role.study || []).map(t => `<span class="rm-study-tag">${t}</span>`).join('')}
                        </div>
                        
                        <div class="rm-role-bottom">
                            <div class="rm-companies">
                                <span class="rm-companies-label">// companies</span>
                                ${(role.companies || []).map(c => `<span class="rm-company-pill">${c}</span>`).join('')}
                            </div>
                            <div class="rm-timeline">// ready_in: ${role.timeline}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <button class="rm-retake-btn" id="rm-retake-btn">[ retake assessment ]</button>
        `;

        container.querySelector('#rm-retake-btn').addEventListener('click', () => {
            renderRoleMatchPage(container);
        });

    } catch (err) {
        loadingBlock.style.display = 'none';
        resultsBlock.style.display = 'block';
        resultsBlock.innerHTML = `
            <div class="rm-error-bar">
                <div class="rm-error-label">// error: could not generate matches</div>
                <div class="rm-error-details" style="display:none;">${err.message}</div>
            </div>
            <button class="btn btn-secondary" id="rm-retry-btn" style="margin-top: 16px;">[ try again ]</button>
        `;

        container.querySelector('#rm-retry-btn').addEventListener('click', () => {
            resultsBlock.style.display = 'none';
            loadingBlock.style.display = 'flex';
            linesContainer.innerHTML = '';
            executeAnalysis(container);
        });
    }
}

function addRoleMatchStyles(container) {
    if (container.querySelector('#role-match-styles')) return;
    const style = document.createElement('style');
    style.id = 'role-match-styles';
    style.textContent = `
        .role-match-page { padding-bottom: 64px; }
        .rm-header { margin-bottom: 48px; }
        .rm-label-mono { font-family: var(--font-mono); font-size: 11px; color: #00FF41; margin-bottom: 16px; font-weight: 600; text-transform: lowercase; }
        .rm-title { font-family: var(--font-mono); font-size: 32px; color: #FFFFFF; font-weight: 700; margin-bottom: 8px; }
        .rm-subtitle { font-family: 'Inter', sans-serif; font-size: 14px; color: #6B7280; line-height: 1.6; max-width: 600px; }

        .rm-wizard { width: 100%; max-width: 800px; }
        
        .rm-progress-container { margin-bottom: 40px; }
        .rm-step-indicators { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; font-family: var(--font-mono); font-size: 11px; font-weight: 600; text-transform: lowercase; }
        .rm-step-label { transition: color 0.3s, opacity 0.3s; }
        .rm-step-arrow { color: #333; }
        .rm-progress-bar-bg { width: 100%; height: 2px; background: #1a1a1a; border-radius: 2px; overflow: hidden; }
        .rm-progress-bar-fill { height: 100%; background: #00FF41; width: 0%; transition: width 0.4s ease; box-shadow: 0 0 8px #00FF41; }

        .rm-step-content { min-height: 400px; }
        .rm-step-title { font-family: var(--font-mono); font-size: 16px; color: #00FF41; margin-bottom: 8px; text-transform: lowercase; }
        .rm-step-subtitle { font-family: 'Inter', sans-serif; font-size: 13px; color: #6B7280; margin-bottom: 24px; line-height: 1.6; }
        
        .rm-step-card { background: #0d0d0d; border: 1px solid #1a1a1a; border-radius: 6px; padding: 24px; box-sizing: border-box; }
        .rm-question-text { font-family: 'Inter', sans-serif; font-size: 14px; color: #FFFFFF; font-weight: 500; margin-bottom: 16px; }
        
        .rm-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .rm-select-card { background: #0d0d0d; border: 1px solid #1a1a1a; padding: 20px; border-radius: 4px; color: #FFFFFF; font-family: 'Inter', sans-serif; font-size: 13px; cursor: pointer; transition: all 0.2s; text-align: center; }
        .rm-select-card:hover { border-color: rgba(0,255,65,0.4); }
        .rm-select-card.selected { border-color: #00FF41; background: rgba(0, 255, 65, 0.06); color: #00FF41; font-weight: 600; }

        .rm-input-group { display: flex; flex-direction: column; gap: 8px; }
        .rm-input-label { font-family: var(--font-mono); font-size: 11px; color: #6B7280; text-transform: lowercase; }
        .rm-input { background: #000; border: 1px solid #1a1a1a; padding: 12px 16px; color: #FFF; font-family: 'Inter', sans-serif; font-size: 13px; border-radius: 4px; outline: none; width: 100%; box-sizing: border-box; }
        .rm-input:focus { border-color: #00FF41; }
        .rm-select { background: #000; border: 1px solid #1a1a1a; padding: 12px 16px; color: #FFF; font-family: 'Inter', sans-serif; font-size: 13px; border-radius: 4px; outline: none; width: 100%; box-sizing: border-box; appearance: none; }
        .rm-select:focus { border-color: #00FF41; }

        .rm-tags-grid { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 32px; }
        .rm-tag { padding: 8px 16px; background: #000; border: 1px solid #1a1a1a; border-radius: 20px; color: #6B7280; font-family: 'Inter', sans-serif; font-size: 12px; cursor: pointer; transition: all 0.2s; user-select: none; }
        .rm-tag:hover { border-color: #333; color: #FFF; }
        .rm-tag.selected { background: rgba(0, 255, 65, 0.1); border-color: #00FF41; color: #00FF41; }

        .rm-divider { height: 1px; background: #1a1a1a; margin: 32px 0; width: 100%; }

        .rm-pills-list { display: flex; flex-direction: column; gap: 12px; }
        .rm-pill { padding: 16px; background: #000; border: 1px solid #1a1a1a; border-radius: 4px; color: #9CA3AF; font-family: 'Inter', sans-serif; font-size: 13px; cursor: pointer; transition: all 0.2s; }
        .rm-pill:hover { border-color: #333; color: #FFF; }
        .rm-pill.selected { background: rgba(0, 255, 65, 0.05); border-color: #00FF41; color: #00FF41; font-weight: 500; }

        .rm-projects-container { display: flex; flex-direction: column; gap: 8px; }
        .rm-project-row { display: grid; grid-template-columns: 2fr 2fr 1fr; gap: 12px; background: #0d0d0d; border: 1px solid #1a1a1a; padding: 16px; border-radius: 4px; box-sizing: border-box; }
        
        .rm-navigation { display: flex; justify-content: flex-end; gap: 16px; margin-top: 48px; border-top: 1px solid #1a1a1a; padding-top: 24px; }
        
        .rm-loading-state { padding: 48px 0; display: flex; flex-direction: column; gap: 16px; font-family: var(--font-mono); font-size: 13px; color: #00FF41; }
        .rm-terminal-cursor { width: 10px; height: 18px; background: #00FF41; animation: blink 1s step-end infinite; margin-bottom: 8px; }
        @keyframes blink { 50% { opacity: 0; } }
        .rm-loading-line { margin-bottom: 8px; animation: slideIn 0.3s ease-out; }
        @keyframes slideIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }

        /* API Results Styling */
        #rm-api-results { padding: 0 !important; background: transparent !important; border: none !important; margin-top: 24px; }
        .rm-summary-bar { background: #0d0d0d; border-left: 3px solid #00FF41; padding: 16px 20px; font-family: 'Inter', sans-serif; color: #CCCCCC; font-size: 14px; margin-bottom: 24px; border-radius: 0 4px 4px 0; }
        
        .rm-roles-list { display: flex; flex-direction: column; gap: 16px; margin-bottom: 32px; }
        .rm-role-card { background: #0d0d0d; border: 1px solid #1a1a1a; border-radius: 6px; padding: 24px; transition: border-color 0.2s ease; }
        .rm-role-card:hover { border-color: rgba(0, 255, 65, 0.3); }
        
        .rm-role-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 12px; }
        .rm-role-title-wrap { display: flex; align-items: center; gap: 12px; }
        .rm-role-num { font-family: var(--font-mono); color: #374151; font-size: 11px; }
        .rm-role-title { font-family: var(--font-mono); color: #FFFFFF; font-size: 18px; font-weight: 700; }
        .rm-role-match { border: 1px solid #00FF41; color: #00FF41; font-family: var(--font-mono); font-size: 12px; padding: 4px 12px; border-radius: 4px; }
        
        .rm-role-section-label { color: #00FF41; font-family: var(--font-mono); font-size: 10px; margin: 16px 0 8px 0; }
        .rm-role-why { font-family: 'Inter', sans-serif; color: #CCCCCC; font-size: 13px; line-height: 1.7; }
        
        .rm-role-study-tags { display: flex; flex-wrap: wrap; gap: 8px; }
        .rm-study-tag { border: 1px solid rgba(0, 255, 65, 0.4); color: #00FF41; font-family: var(--font-mono); font-size: 11px; padding: 4px 10px; border-radius: 12px; }
        
        .rm-role-bottom { display: flex; justify-content: space-between; align-items: flex-end; margin-top: 24px; flex-wrap: wrap; gap: 12px; }
        .rm-companies { display: flex; align-items: center; flex-wrap: wrap; gap: 8px; }
        .rm-companies-label { color: #6B7280; font-family: var(--font-mono); font-size: 11px; margin-right: 4px; }
        .rm-company-pill { background: transparent; border: 1px solid #1a1a1a; color: #6B7280; font-family: 'Inter', sans-serif; font-size: 11px; padding: 2px 8px; border-radius: 4px; }
        .rm-timeline { font-family: var(--font-mono); color: #6B7280; font-size: 11px; }
        
        .rm-retake-btn { width: 100%; background: transparent; border: 1px solid #1a1a1a; color: #6B7280; font-family: var(--font-mono); font-size: 13px; padding: 16px; border-radius: 6px; transition: all 0.2s; cursor: pointer; outline: none; }
        .rm-retake-btn:hover { border-color: #00FF41; color: #00FF41; }
        
        .rm-error-bar { background: #0d0d0d; border-left: 3px solid #EF4444; padding: 20px; border-radius: 0 4px 4px 0; }
        .rm-error-label { color: #EF4444; font-family: var(--font-mono); font-size: 12px; }
    `;
    container.appendChild(style);
}

// ═══════════════════════════════════════════════════════════
// Tracker Page — Job Tracker & Rapid Revision
// ═══════════════════════════════════════════════════════════

import { router } from '../router.js';

const REVISION_KEY = 'revision_done';
const JOBS_KEY = 'job_tracker_data';

const REVISION_DATA = [
    {
        id: 'cycle1',
        label: 'Cycle 1: The Core',
        slots: [
            { id: 'c1s1', day: 'Day 1', topic: 'Arrays & Hashing', details: 'Top K, Group Anagrams, Two Sum.', time: '9:00 AM' },
            { id: 'c1s2', day: 'Day 1', topic: 'Two Pointers', details: '3Sum, Container with Water.', time: '2:00 PM' },
            { id: 'c1s3', day: 'Day 2', topic: 'Sliding Window', details: 'Longest Substring, Min Window.', time: '9:00 AM' }
        ]
    },
    {
        id: 'cycle2',
        label: 'Cycle 2: Logic & Trees',
        slots: [
            { id: 'c2s1', day: 'Day 3', topic: 'Stack & Binary Search', details: 'Min Stack, Search in Rotated.', time: '9:00 AM' },
            { id: 'c2s2', day: 'Day 4', topic: 'Trees (Core)', details: 'Invert, Depth, Path Sum.', time: '9:00 AM' },
            { id: 'c2s3', day: 'Day 5', topic: 'Tries & Heaps', details: 'Implement Trie, Kth Largest.', time: '9:00 AM' }
        ]
    },
    {
        id: 'cycle3',
        label: 'Cycle 3: Graphs & DP',
        slots: [
            { id: 'c3s1', day: 'Day 6', topic: 'Backtracking', details: 'Subsets, Permutations.', time: '9:00 AM' },
            { id: 'c3s2', day: 'Day 7', topic: 'Graphs', details: 'Islands, Courses, Clone.', time: '9:00 AM' },
            { id: 'c3s3', day: 'Day 8', topic: 'Dynamic Programming', details: 'Climbing Stairs, Coin Change.', time: '9:00 AM' }
        ]
    }
];

export function renderTrackerPage(container) {
    let activeTab = 'revision';
    let revisionDone = JSON.parse(localStorage.getItem(REVISION_KEY) || '{}');
    let jobs = JSON.parse(localStorage.getItem(JOBS_KEY) || '[]');

    const save = (key, data) => localStorage.setItem(key, JSON.stringify(data));

    function render() {
        container.innerHTML = `
      <div class="page-container tracker-page">
        <div class="tracker-header">
          <h1 class="tracker-title">Performance <span class="text-green">Tracker</span></h1>
          <p class="tracker-subtitle">Manage your revision cycles and job applications.</p>
        </div>

        <div class="tracker-tabs">
          <button class="tracker-tab ${activeTab === 'revision' ? 'active' : ''}" data-tab="revision">
            rapid revision <span class="tab-count">${REVISION_DATA.length} cycles</span>
          </button>
          <button class="tracker-tab ${activeTab === 'jobs' ? 'active' : ''}" data-tab="jobs">
            job applications <span class="tab-count">${jobs.length}</span>
          </button>
        </div>

        <div class="tracker-content animate-fade-in-up">
          ${activeTab === 'revision' ? renderRevision() : renderJobs()}
        </div>
      </div>
    `;

        addTrackerStyles(container);
        bindTrackerEvents();
    }

    function renderRevision() {
        const totalSlots = REVISION_DATA.reduce((acc, c) => acc + c.slots.length, 0);
        const doneSlots = Object.values(revisionDone).filter(v => v === true).length;
        const progress = (doneSlots / totalSlots) * 100;

        return `
      <div class="revision-overview">
        <div class="revision-status-panel">
          <h2 class="revision-title">// completion_status</h2>
          <div class="revision-progress">
            <div class="rev-bar-bg"><div class="rev-bar-fill" style="width: ${progress}%"></div></div>
            <div class="rev-progress-text">${doneSlots}/${totalSlots} slots completed (${Math.round(progress)}%)</div>
          </div>
        </div>

        <div class="revision-cycles">
          ${REVISION_DATA.map(cycle => `
            <div class="revision-cycle">
              <div class="cycle-header">
                <h3 class="cycle-label">${cycle.label.toLowerCase()}</h3>
                <span class="cycle-progress-text">${cycle.slots.filter(s => revisionDone[s.id]).length}/${cycle.slots.length}</span>
              </div>
              <div class="cycle-slots">
                ${cycle.slots.map(slot => `
                  <div class="rev-slot ${revisionDone[slot.id] ? 'slot-done' : ''}" data-id="${slot.id}">
                    <button class="rev-check">${revisionDone[slot.id] ? '[✓]' : '[ ]'}</button>
                    <div class="slot-main-info">
                      <div class="slot-topic">${slot.topic.toLowerCase()}</div>
                      <div class="slot-details">${slot.details.toLowerCase()}</div>
                    </div>
                    <div class="slot-right-meta">
                      <span class="slot-day-time">${slot.day.toLowerCase()} // ${slot.time.toLowerCase()}</span>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    }

    function renderJobs() {
        return `
      <div class="job-tracker">
        <div class="job-form">
          <h2 class="job-form-title">// add_new_application</h2>
          <div class="job-form-grid">
            <div class="form-group">
              <label>company</label>
              <input type="text" id="job-company" placeholder="e.g. google" class="t-input" />
            </div>
            <div class="form-group">
              <label>role</label>
              <input type="text" id="job-role" placeholder="e.g. l4 swe" class="t-input" />
            </div>
            <div class="form-group">
              <label>date applied</label>
              <input type="date" id="job-date" class="t-input" value="${new Date().toISOString().split('T')[0]}" />
            </div>
            <div class="form-group">
              <label>status</label>
              <select id="job-status" class="t-input">
                <option value="applied">applied</option>
                <option value="oa-received">oa received</option>
                <option value="oa-done">oa done</option>
                <option value="interview">interview</option>
                <option value="offer">offer</option>
                <option value="rejected">rejected</option>
              </select>
            </div>
            <div class="form-group full-width">
              <label>notes</label>
              <textarea id="job-notes" placeholder="referral name, link to jd, etc." class="t-input"></textarea>
            </div>
          </div>
          <button class="btn btn-primary" id="btn-add-job" style="margin-top: 16px;">add application</button>
        </div>

        <div class="job-list-section">
          <h2 class="job-list-title">// application_history</h2>
          <div class="job-stats-row">
            <div class="job-stat">
              <span class="job-stat-count">${jobs.length}</span>
              <span class="job-stat-label">total</span>
            </div>
            <div class="job-stat">
              <span class="job-stat-count">${jobs.filter(j => j.status === 'interview').length}</span>
              <span class="job-stat-label">interviews</span>
            </div>
            <div class="job-stat">
              <span class="job-stat-count">${jobs.filter(j => j.status === 'offer').length}</span>
              <span class="job-stat-label">offers</span>
            </div>
          </div>

          <div class="job-list">
            ${jobs.map((job, i) => `
              <div class="job-row">
                <div class="job-main">
                  <div class="job-company-name">${job.company.toLowerCase()}</div>
                  <div class="job-role-text">${job.role.toLowerCase()} // ${job.date}</div>
                </div>
                <div class="job-status-meta">
                  <select class="job-status-update j-badge j-badge-${job.status}" data-idx="${i}">
                    <option value="applied" ${job.status === 'applied' ? 'selected' : ''}>applied</option>
                    <option value="oa-received" ${job.status === 'oa-received' ? 'selected' : ''}>oa received</option>
                    <option value="oa-done" ${job.status === 'oa-done' ? 'selected' : ''}>oa done</option>
                    <option value="interview" ${job.status === 'interview' ? 'selected' : ''}>interview</option>
                    <option value="offer" ${job.status === 'offer' ? 'selected' : ''}>offer</option>
                    <option value="rejected" ${job.status === 'rejected' ? 'selected' : ''}>rejected</option>
                  </select>
                </div>
                ${job.notes ? `<div class="job-notes-text">${job.notes.toLowerCase()}</div>` : ''}
                <div class="job-actions">
                   <button class="btn btn-ghost btn-sm job-delete" data-idx="${i}">delete</button>
                </div>
              </div>
            `).reverse().join('')}
          </div>
        </div>
      </div>
    `;
    }

    function bindTrackerEvents() {
        // Tabs
        container.querySelectorAll('.tracker-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                activeTab = tab.dataset.tab;
                render();
            });
        });

        // Revision checks
        container.querySelectorAll('.rev-slot').forEach(slot => {
            slot.addEventListener('click', () => {
                const id = slot.dataset.id;
                revisionDone[id] = !revisionDone[id];
                localStorage.setItem(REVISION_KEY, JSON.stringify(revisionDone));
                render();
            });
        });

        // Jobs
        container.querySelector('#btn-add-job')?.addEventListener('click', () => {
            const company = container.querySelector('#job-company').value.trim();
            if (!company) return alert('Company name is required.');
            jobs.push({
                company,
                role: container.querySelector('#job-role').value.trim(),
                date: container.querySelector('#job-date').value,
                status: container.querySelector('#job-status').value,
                notes: container.querySelector('#job-notes').value.trim(),
                id: Date.now()
            });
            save(JOBS_KEY, jobs);
            render();
        });

        container.querySelectorAll('.job-status-update').forEach(sel => {
            sel.addEventListener('change', () => {
                const idx = parseInt(sel.dataset.idx);
                jobs[idx].status = sel.value;
                save(JOBS_KEY, jobs);
                render();
            });
        });

        container.querySelectorAll('.job-delete').forEach(btn => {
            btn.addEventListener('click', () => {
                if (confirm('Delete this application?')) {
                    jobs.splice(parseInt(btn.dataset.idx), 1);
                    save(JOBS_KEY, jobs);
                    render();
                }
            });
        });
    }

    render();
}

function addTrackerStyles(container) {
    if (container.querySelector('#tracker-styles')) return;
    const style = document.createElement('style');
    style.id = 'tracker-styles';
    style.textContent = `
    .tracker-page { width: 100%; max-width: none; }
    .tracker-header { padding: 0 0 32px; text-align: left; }
    .tracker-title { font-size: 32px; font-weight: 700; font-family: var(--font-mono); color: #FFFFFF; margin-bottom: 8px; }
    .text-green { color: #00FF41; }
    .tracker-subtitle { font-size: 13px; color: #6B7280; font-family: 'Inter', sans-serif; margin-bottom: 24px; }

    .tracker-tabs { display: flex; gap: 32px; border-bottom: 1px solid #1a1a1a; margin-bottom: 32px; justify-content: flex-start; width: 100%; }
    .tracker-tab {
        background: transparent; border: none; padding: 12px 0; color: #6B7280;
        font-family: var(--font-mono); font-size: 13px; cursor: pointer;
        position: relative; transition: color 0.15s ease; text-transform: lowercase;
    }
    .tracker-tab:hover { color: #FFFFFF; }
    .tracker-tab.active { color: #FFFFFF; }
    .tracker-tab.active::after {
        content: ''; position: absolute; bottom: -1px; left: 0; width: 100%;
        height: 2px; background: #00FF41;
    }
    .tab-count { opacity: 0.5; margin-left: 6px; }

    .tracker-content { width: 100%; max-width: none; }

    .revision-overview { width: 100%; }
    .revision-status-panel { background: #0d0d0d; border: 1px solid #1a1a1a; border-radius: 6px; padding: 24px; margin-bottom: 32px; width: 100%; box-sizing: border-box; }
    .revision-title { font-size: 12px; font-family: var(--font-mono); color: rgba(0, 255, 65, 0.5); margin-bottom: 16px; text-transform: lowercase; }
    .revision-progress { margin-bottom: 0; }
    .rev-bar-bg { background: #111111; height: 2px; border-radius: 1px; overflow: hidden; margin-bottom: 12px; }
    .rev-bar-fill { background: #00FF41; height: 100%; transition: width 0.5s ease; }
    .rev-progress-text { font-family: var(--font-mono); font-size: 12px; color: #6B7280; }

    .revision-cycles { display: flex; flex-direction: column; gap: 24px; width: 100%; }
    .revision-cycle { background: #0d0d0d; border: 1px solid #1a1a1a; border-radius: 6px; padding: 20px; width: 100%; box-sizing: border-box; }
    .cycle-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; border-bottom: 1px solid rgba(255,255,255,0.03); padding-bottom: 12px; }
    .cycle-label { font-family: var(--font-mono); font-size: 12px; color: #FFFFFF; font-weight: 700; }
    .cycle-progress-text { font-family: var(--font-mono); font-size: 11px; color: #6B7280; }

    .cycle-slots { display: flex; flex-direction: column; gap: 1px; background: #1a1a1a; }
    .rev-slot { 
        display: flex; align-items: center; justify-content: space-between; 
        background: #0d0d0d; padding: 14px 20px; gap: 16px; width: 100%; box-sizing: border-box;
    }
    .rev-slot.slot-done { opacity: 0.3; }
    .rev-check { background: transparent; border: none; font-family: var(--font-mono); font-size: 14px; color: #374151; cursor: pointer; padding: 0; flex-shrink: 0; }
    .rev-slot.slot-done .rev-check { color: #00FF41; }
    
    .slot-main-info { flex: 1; }
    .slot-topic { font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 600; color: #FFFFFF; margin-bottom: 2px; }
    .slot-details { font-family: 'Inter', sans-serif; font-size: 12px; color: #6B7280; line-height: 1.5; }
    .slot-right-meta { text-align: right; flex-shrink: 0; }
    .slot-day-time { font-family: var(--font-mono); font-size: 11px; color: #374151; }

    /* Job Tracker */
    .job-form { background: #0d0d0d; border: 1px solid #1a1a1a; border-radius: 6px; padding: 24px; margin-bottom: 32px; width: 100%; box-sizing: border-box; }
    .job-form-title { font-size: 12px; font-family: var(--font-mono); color: #00FF41; margin-bottom: 16px; text-transform: lowercase; }
    .job-form-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
    .form-group { display: flex; flex-direction: column; gap: 4px; }
    .form-group label { font-family: var(--font-mono); font-size: 10px; color: #6B7280; text-transform: lowercase; }
    .t-input {
        background: #000; border: 1px solid #1a1a1a; border-radius: 4px; padding: 8px 12px;
        color: #FFFFFF; font-family: var(--font-mono); font-size: 13px; outline: none;
    }
    .t-input:focus { border-color: #00FF41; }
    .full-width { grid-column: 1 / -1; }

    .job-stats-row { display: flex; gap: 12px; margin-bottom: 32px; flex-wrap: wrap; width: 100%; }
    .job-stat {
        background: #0d0d0d; border: 1px solid #1a1a1a; border-radius: 4px;
        padding: 16px; flex: 1; min-width: 120px; text-align: center;
    }
    .job-stat-count { font-family: var(--font-mono); font-size: 24px; color: #FFFFFF; display: block; }
    .job-stat-label { font-family: var(--font-mono); font-size: 10px; color: #6B7280; text-transform: lowercase; }

    .job-list-title { font-size: 12px; font-family: var(--font-mono); color: rgba(0, 255, 65, 0.5); margin-bottom: 16px; text-transform: lowercase; }
    .job-list { width: 100%; display: flex; flex-direction: column; gap: 1px; background: #1a1a1a; border: 1px solid #1a1a1a; border-radius: 6px; overflow: hidden; }
    .job-row { background: #0d0d0d; padding: 16px 20px; display: grid; grid-template-columns: 1fr auto; gap: 12px; width: 100%; box-sizing: border-box; }
    .job-company-name { font-family: var(--font-mono); font-size: 14px; color: #FFFFFF; font-weight: 700; }
    .job-role-text { font-family: var(--font-mono); font-size: 11px; color: #6B7280; }
    .j-badge {
        font-family: var(--font-mono); font-size: 10px; padding: 2px 8px; border-radius: 2px; text-transform: lowercase;
    }
    .j-badge-applied { border: 1px solid #00FF41; color: #00FF41; }
    .j-badge-oa-received { border: 1px solid #FACC15; color: #FACC15; }
    .j-badge-oa-done { border: 1px solid #FACC15; color: #FACC15; }
    .j-badge-interview { border: 1px solid #60A5FA; color: #60A5FA; }
    .j-badge-offer { border: 1px solid #00FF41; color: #00FF41; background: rgba(0,255,65,0.05); }
    .j-badge-rejected { border: 1px solid #EF4444; color: #EF4444; }

    .job-notes-text { grid-column: 1 / -1; font-size: 12px; color: #6B7280; font-style: italic; }
    .job-actions { grid-column: 1 / -1; display: flex; gap: 12px; align-items: center; margin-top: 8px; border-top: 1px solid rgba(255,255,255,0.03); padding-top: 8px; }

    @media (max-width: 768px) {
        .job-form-grid { grid-template-columns: 1fr; }
        .rev-slot { flex-direction: column; align-items: flex-start; }
        .slot-right-meta { text-align: left; margin-top: 8px; }
    }
    `;
    container.appendChild(style);
}

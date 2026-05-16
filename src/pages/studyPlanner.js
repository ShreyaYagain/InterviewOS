// ═══════════════════════════════════════════════════════════
// Planner Page — Multi-Duration Interview Prep
// ═══════════════════════════════════════════════════════════

import { PLANS } from '../data/plans.js';

const PROGRESS_KEY = 'planner_progress';
const DURATION_KEY = 'planner_duration';

function getProgress() { return JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}'); }
function saveProgress(p) { localStorage.setItem(PROGRESS_KEY, JSON.stringify(p)); }
function getDuration() { return localStorage.getItem(DURATION_KEY) || '90'; }
function saveDuration(d) { localStorage.setItem(DURATION_KEY, d); }

export function renderStudyPlannerPage(container) {
    let progress = getProgress();
    let duration = getDuration();
    let expandedWeek = null;
    let weekSelectedDays = {}; // Stores { weekIndex: dayIndex }

    function render() {
        const plan = PLANS[duration];
        const isWeekly = Array.isArray(plan) && plan[0].week !== undefined;
        const totalDays = isWeekly ? plan.reduce((sum, w) => sum + w.days.length, 0) : plan.length;
        
        const planKeyPrefix = `p${duration}-`;
        const completed = Object.keys(progress).filter(k => k.startsWith(planKeyPrefix) && progress[k] === true).length;
        const percent = Math.round((completed / totalDays) * 100);

        container.innerHTML = `
        <div class="page-container planner-page">
          <!-- Hero -->
          <div class="planner-header animate-fade-in-up">
            <h1 class="planner-title">planner</h1>
            <p class="planner-subtitle">
              Master DSA, LLD, HLD & Behavioral — tailored to your timeline.
            </p>
          </div>

          <!-- Duration Selector -->
          <div class="duration-selector animate-fade-in-up">
            ${['90', '60', '30', '14', '10', '7'].map(d => `
              <button class="duration-btn ${duration === d ? 'active' : ''}" data-duration="${d}">
                [${d} days]
              </button>
            `).join('')}
          </div>

          <!-- Progress Overview -->
          <div class="planner-stats-grid animate-fade-in-up">
            <div class="stat-cell">
              <span class="stat-value">${completed}</span>
              <span class="stat-label">days done</span>
            </div>
            <div class="stat-cell">
              <span class="stat-value">${totalDays - completed}</span>
              <span class="stat-label">days left</span>
            </div>
            <div class="stat-cell">
              <span class="stat-value text-green">${percent}%</span>
              <span class="stat-label">total progress</span>
            </div>
            <div class="stat-cell">
              <span class="stat-value">${totalDays}</span>
              <span class="stat-label">total milestones</span>
            </div>
          </div>

          <!-- Plan Content -->
          <div class="weeks-container animate-fade-in-up">
            ${isWeekly 
                ? plan.map((week, idx) => renderWeekCard(week, idx)).join('')
                : plan.map((day, idx) => renderDayCard(day, idx)).join('')
            }
          </div>
        </div>
        `;

        addPlannerStyles(container);
        bindPlannerEvents();
    }

    function renderWeekCard(week, idx) {
        const isExpanded = expandedWeek === idx;
        const selectedDayIdx = weekSelectedDays[idx] !== undefined ? weekSelectedDays[idx] : 0;
        const selectedDay = week.days[selectedDayIdx];
        
        const weekCompleted = week.days.filter(d => progress[`p${duration}-d${d.day}`]).length;

        return `
        <div class="week-row ${isExpanded ? 'expanded' : ''}">
          <div class="week-summary" data-week-idx="${idx}">
            <div class="week-meta">
              <span class="week-num">week ${week.week}</span>
              <span class="week-theme">${week.theme.toLowerCase()}</span>
            </div>
            <div class="week-right">
              <span class="week-count">${weekCompleted}/${week.days.length}</span>
              <span class="week-toggle">${isExpanded ? '−' : '+'}</span>
            </div>
          </div>

          ${isExpanded ? `
          <div class="week-content animate-fade-in">
            <div class="day-selector-layout">
              <div class="day-numbers">
                ${week.days.map((d, dIdx) => {
                    const isDone = progress[`p${duration}-d${d.day}`];
                    return `
                      <button class="day-num-btn ${selectedDayIdx === dIdx ? 'active' : ''} ${isDone ? 'completed' : ''}" 
                              data-week-idx="${idx}" data-day-idx="${dIdx}">
                        ${dIdx + 1}
                      </button>
                    `;
                }).join('')}
              </div>
              <div class="day-detail-content">
                ${renderDayDetailArea(selectedDay)}
              </div>
            </div>
          </div>
          ` : ''}
        </div>`;
    }

    function renderDayCard(day, idx) {
        // For 10/7 day plans, we render them as expanded cards always or just list them
        const isDone = progress[`p${duration}-d${day.day || idx + 1}`];
        return `
        <div class="day-row">
          <div class="day-card-header">
            <div class="day-meta">
              <span class="day-num">day ${day.day || idx + 1}</span>
              <span class="day-title">${day.title.toLowerCase()}</span>
            </div>
            <button class="day-check-btn ${isDone ? 'checked' : ''}" data-day-key="p${duration}-d${day.day || idx + 1}">
              ${isDone ? '[✓] done' : '[ ] mark done'}
            </button>
          </div>
          <ul class="day-tasks-list">
            ${day.tasks.map(t => `<li>${t.toLowerCase()}</li>`).join('')}
          </ul>
        </div>`;
    }

    function renderDayDetailArea(day) {
        if (!day) return '';
        const dayKey = `p${duration}-d${day.day}`;
        const isDone = progress[dayKey];
        return `
        <div class="day-detail-box">
          <div class="day-detail-header">
            <span class="day-detail-label">day ${day.day} // ${day.title.toLowerCase()}</span>
            <button class="day-check-btn ${isDone ? 'checked' : ''}" data-day-key="${dayKey}">
              ${isDone ? '[✓] done' : '[ ] mark done'}
            </button>
          </div>
          <ul class="day-tasks-list">
            ${day.tasks.map(t => `<li>${t.toLowerCase()}</li>`).join('')}
          </ul>
        </div>`;
    }

    function bindPlannerEvents() {
        // Duration Select
        container.querySelectorAll('.duration-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                duration = btn.dataset.duration;
                saveDuration(duration);
                expandedWeek = null;
                weekSelectedDays = {};
                render();
            });
        });

        // Week Expand
        container.querySelectorAll('.week-summary').forEach(h => {
            h.addEventListener('click', () => {
                const idx = parseInt(h.dataset.weekIdx);
                expandedWeek = expandedWeek === idx ? null : idx;
                render();
            });
        });

        // Day Number Toggle
        container.querySelectorAll('.day-num-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const wIdx = parseInt(btn.dataset.weekIdx);
                const dIdx = parseInt(btn.dataset.dayIdx);
                weekSelectedDays[wIdx] = dIdx;
                render();
            });
        });

        // Mark Done
        container.querySelectorAll('.day-check-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const key = btn.dataset.dayKey;
                progress[key] = !progress[key];
                saveProgress(progress);
                render();
            });
        });
    }

    render();
}

function addPlannerStyles(container) {
    if (container.querySelector('#planner-styles')) return;
    const style = document.createElement('style');
    style.id = 'planner-styles';
    style.textContent = `
    .planner-page { width: 100%; max-width: none; }
    .planner-header { padding: 0 0 32px; text-align: left; }
    .planner-title { font-size: 32px; font-weight: 700; font-family: var(--font-mono); color: #FFFFFF; margin-bottom: 8px; text-transform: lowercase; }
    .text-green { color: #00FF41 !important; }
    .planner-subtitle { font-size: 13px; color: #6B7280; font-family: 'Inter', sans-serif; margin-bottom: 24px; text-align: left; }

    .duration-selector { display: flex; gap: 8px; margin-bottom: 32px; }
    .duration-btn {
        font-family: var(--font-mono); font-size: 12px; padding: 6px 16px;
        border: 1px solid #1a1a1a; color: #6B7280; background: transparent;
        border-radius: 3px; cursor: pointer; transition: all 0.2s;
    }
    .duration-btn:hover { border-color: #FFFFFF; color: #FFFFFF; }
    .duration-btn.active { border-color: #00FF41; color: #00FF41; background: rgba(0,255,65,0.06); }

    .planner-stats-grid { 
        display: grid; grid-template-columns: repeat(4, 1fr); 
        gap: 1px; background: #1a1a1a; border: 1px solid #1a1a1a; 
        margin-bottom: 48px; overflow: hidden; width: 100%; max-width: none;
    }
    .stat-cell { background: #0d0d0d; padding: 24px; text-align: center; }
    .stat-value { font-family: var(--font-mono); font-size: 28px; color: #FFFFFF; font-weight: 700; display: block; }
    .stat-label { font-family: var(--font-mono); font-size: 11px; color: #6B7280; text-transform: lowercase; margin-top: 6px; display: block; }

    .weeks-container { display: flex; flex-direction: column; gap: 16px; width: 100%; max-width: none; }
    
    /* Week Cards */
    .week-row { background: #0d0d0d; border: 1px solid #1a1a1a; border-radius: 6px; overflow: hidden; width: 100%; box-sizing: border-box; }
    .week-summary { padding: 20px 24px; display: flex; justify-content: space-between; align-items: center; cursor: pointer; transition: background 0.15s ease; border-bottom: 1px solid transparent; }
    .week-summary:hover { background: #111; }
    .week-row.expanded .week-summary { border-bottom-color: #1a1a1a; }
    
    .week-meta { display: flex; flex-direction: column; gap: 4px; }
    .week-num { font-family: var(--font-mono); font-size: 11px; color: #00FF41; }
    .week-theme { font-family: var(--font-mono); font-size: 15px; color: #FFFFFF; font-weight: 600; }
    
    .week-right { display: flex; align-items: center; gap: 16px; }
    .week-count { font-family: var(--font-mono); font-size: 12px; color: #6B7280; }
    .week-toggle { font-family: var(--font-mono); font-size: 16px; color: #6B7280; }

    .week-content { padding: 32px; background: #000; }
    .day-selector-layout { display: grid; grid-template-columns: auto 1fr; gap: 32px; }
    
    .day-numbers { display: flex; flex-direction: column; gap: 8px; }
    .day-num-btn {
        width: 32px; height: 32px; border: 1px solid #1a1a1a; background: transparent;
        color: #6B7280; font-family: var(--font-mono); font-size: 12px;
        border-radius: 3px; cursor: pointer; transition: all 0.1s;
    }
    .day-num-btn:hover { border-color: #FFFFFF; color: #FFFFFF; }
    .day-num-btn.active { border-color: #00FF41; color: #00FF41; background: rgba(0,255,65,0.08); }
    .day-num-btn.completed { border-color: #374151; color: #374151; text-decoration: line-through; }

    .day-detail-box { border-left: 1px solid #1a1a1a; padding-left: 32px; }
    .day-detail-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; }
    .day-detail-label { font-family: var(--font-mono); font-size: 14px; color: #FFFFFF; font-weight: 700; }
    
    .day-check-btn {
        background: transparent; border: 1px solid #1a1a1a; border-radius: 3px;
        color: #6B7280; font-family: var(--font-mono); font-size: 11px;
        padding: 6px 14px; cursor: pointer; transition: all 0.2s;
    }
    .day-check-btn:hover { border-color: #00FF41; color: #00FF41; }
    .day-check-btn.checked { color: #00FF41; border-color: #00FF41; background: rgba(0,255,65,0.05); }

    .day-tasks-list { list-style: none; padding: 0; }
    .day-tasks-list li { padding: 6px 0 6px 18px; position: relative; font-family: 'Inter', sans-serif; font-size: 13px; color: #6B7280; line-height: 1.6; }
    .day-tasks-list li::before { content: '>'; position: absolute; left: 0; color: #00FF41; font-family: var(--font-mono); }

    /* Individual Day Cards (10/7 day plans) */
    .day-row { background: #0d0d0d; border: 1px solid #1a1a1a; border-radius: 6px; padding: 24px; width: 100%; box-sizing: border-box; }
    .day-card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid #1a1a1a; padding-bottom: 16px; }
    .day-meta { display: flex; flex-direction: column; gap: 4px; }
    .day-num { font-family: var(--font-mono); font-size: 11px; color: #00FF41; }
    .day-title { font-family: var(--font-mono); font-size: 16px; color: #FFFFFF; font-weight: 700; }

    @media (max-width: 768px) {
        .planner-stats-grid { grid-template-columns: repeat(2, 1fr); }
        .day-selector-layout { grid-template-columns: 1fr; }
        .day-numbers { flex-direction: row; flex-wrap: wrap; }
        .day-detail-box { border-left: none; padding-left: 0; border-top: 1px solid #1a1a1a; padding-top: 24px; }
    }
    `;
    container.appendChild(style);
}

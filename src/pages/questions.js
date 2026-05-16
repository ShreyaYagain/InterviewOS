// NeetCode-style Question Bank — DSA + SQL
import { router } from '../router.js';
import { questions } from '../lib/questions.js';
import { sqlQuestions, SQL_TOPICS } from '../data/sqlQuestions.js';

const NC_TOPICS = ['all','arrays & hashing','two pointers','sliding window','stack','binary search','linked list','trees','tries','heap / priority queue','backtracking','graphs','advanced graphs','1-d dynamic programming','2-d dynamic programming','greedy','intervals','math & geometry','bit manipulation'];

export function renderQuestionsPage(container, initialTab = 'dsa') {
    let activeTab = initialTab;
    let activeTopic = 'all';
    let expandedId = null;

    function getFiltered() {
        if (activeTab === 'sql') {
            if (activeTopic === 'all' || activeTopic === 'All') return sqlQuestions;
            return sqlQuestions.filter(q => q.topic.toLowerCase() === activeTopic.toLowerCase());
        }
        if (activeTopic === 'all') return questions;
        return questions.filter(q => q.topic && q.topic.toLowerCase() === activeTopic.toLowerCase());
    }

    function render() {
        const filtered = getFiltered();
        const allDsa = questions;
        const easy = allDsa.filter(q=>q.difficulty==='easy').length;
        const med  = allDsa.filter(q=>q.difficulty==='medium').length;
        const hard = allDsa.filter(q=>q.difficulty==='hard').length;

        const topics = activeTab === 'dsa' ? NC_TOPICS : SQL_TOPICS.map(t=>t.toLowerCase());

        container.innerHTML = `
<div class="qb-page">
  <div class="qb-tabs">
    <button class="qb-tab ${activeTab==='dsa'?'active':''}" data-tab="dsa">DSA <span class="tab-count">${allDsa.length}</span></button>
    <button class="qb-tab ${activeTab==='sql'?'active':''}" data-tab="sql">SQL <span class="tab-count">${sqlQuestions.length}</span></button>
  </div>

  <div class="qb-header">
    <div class="qb-header-top">
      <h1 class="qb-title">${activeTab==='dsa'?'DSA':'SQL'} <span class="text-green">(${filtered.length})</span></h1>
      ${activeTab==='dsa'?`<div class="qb-stats-row">
        <span class="qb-stat easy">● ${easy} easy</span>
        <span class="qb-stat medium">● ${med} medium</span>
        <span class="qb-stat hard">● ${hard} hard</span>
      </div>`:''}
    </div>
    <p class="qb-subtitle">${activeTab==='dsa'?'NeetCode 150 — The essential FAANG DSA roadmap.':'SQL interview prep — From basic joins to window functions.'}</p>
  </div>

  <div class="qb-filters">
    ${topics.map(t=>`<button class="qb-pill ${activeTopic===t?'active':''}" data-topic="${t}">${t}</button>`).join('')}
  </div>

  <div class="qb-list">
    <div class="qb-list-header">
      <div>#</div><div>Title</div><div>Topic</div><div>Difficulty</div><div>Links</div>
    </div>
    <div class="qb-rows">
      ${filtered.map((q,i) => {
        const diff = (q.difficulty||'easy').toLowerCase();
        const isExpanded = String(expandedId) === String(q.id);
        const isSQL = activeTab === 'sql';
        return `
        <div class="qb-row-wrap">
          <div class="qb-row ${isExpanded?'expanded':''}" data-id="${q.id}">
            <div class="qb-col-id">${i+1}</div>
            <div class="qb-col-title">
              <span class="qb-row-arrow">${isExpanded?'▾':'▸'}</span>
              ${q.title}
            </div>
            <div class="qb-col-topic">${q.topic||'—'}</div>
            <div class="qb-col-diff"><span class="diff-badge ${diff}">${diff}</span></div>
            <div class="qb-col-links">
              ${q.leetcodeUrl?`<a href="${q.leetcodeUrl}" target="_blank" class="ext-link lc" onclick="event.stopPropagation()">LC</a>`:''}
              ${q.neetcodeUrl?`<a href="${q.neetcodeUrl}" target="_blank" class="ext-link nc" onclick="event.stopPropagation()">NC</a>`:''}
              ${isSQL?'':(!isSQL&&q.id?`<button class="btn-solve" data-id="${q.id}" onclick="event.stopPropagation()">solve →</button>`:'') }
            </div>
          </div>
          ${isExpanded ? `
          <div class="qb-detail">
            <div class="qb-detail-inner">
              <div class="qb-detail-cols">
                <div class="qb-detail-left">
                  <div class="detail-section-label">// problem statement</div>
                  <pre class="detail-statement">${q.statement||q.description||''}</pre>
                  ${q.explanation?`<div class="detail-section-label" style="margin-top:16px">// neetcode approach</div>
                  <p class="detail-explanation">${q.explanation}</p>`:''}
                  ${q.approach&&q.approach.length?`<div class="detail-section-label" style="margin-top:16px">// step-by-step</div>
                  <ol class="detail-steps">${q.approach.map(s=>`<li>${s}</li>`).join('')}</ol>`:''}
                </div>
                <div class="qb-detail-right">
                  ${q.complexity?`<div class="detail-complexity">
                    <div class="detail-section-label">// complexity</div>
                    <div class="detail-comp-row"><span class="comp-label">time</span><span class="comp-val">${q.complexity.time}</span></div>
                    <div class="detail-comp-row"><span class="comp-label">space</span><span class="comp-val">${q.complexity.space}</span></div>
                  </div>`:''}
                  <div class="detail-section-label" style="margin-top:16px">// solution</div>
                  <button class="btn-reveal-sol" data-id="${q.id}">[ click to reveal solution ]</button>
                  <pre class="detail-solution hidden" id="sol-${q.id}">${q.solution||(q.optimalCode&&q.optimalCode.python)||'// solution coming soon'}</pre>
                  ${!isSQL?`<div class="detail-section-label" style="margin-top:12px">// resources</div>
                  <div class="detail-links">
                    ${q.leetcodeUrl?`<a href="${q.leetcodeUrl}" target="_blank" class="ext-link lc">LeetCode</a>`:''}
                    ${q.neetcodeUrl?`<a href="${q.neetcodeUrl}" target="_blank" class="ext-link nc">NeetCode</a>`:''}
                    ${q.youtubeUrl?`<a href="${q.youtubeUrl}" target="_blank" class="ext-link yt">YouTube</a>`:''}
                  </div>
                  <button class="btn-compiler" data-id="${q.id}" style="margin-top:12px">[ ▶ open in compiler ]</button>`:''}
                </div>
              </div>
            </div>
          </div>` : ''}
        </div>`;
      }).join('')}
    </div>
  </div>
</div>`;

        addStyles(container);
        bindEvents();
    }

    function bindEvents() {
        // Tab switch
        container.querySelectorAll('.qb-tab').forEach(btn => {
            btn.addEventListener('click', () => {
                activeTab = btn.dataset.tab;
                activeTopic = 'all';
                expandedId = null;
                render();
            });
        });
        // Topic filter
        container.querySelectorAll('.qb-pill').forEach(pill => {
            pill.addEventListener('click', () => {
                activeTopic = pill.dataset.topic;
                expandedId = null;
                render();
            });
        });
        // Expand row
        container.querySelectorAll('.qb-row').forEach(row => {
            row.addEventListener('click', () => {
                const id = row.dataset.id;
                expandedId = expandedId === id ? null : id;
                render();
            });
        });
        // Reveal solution
        container.querySelectorAll('.btn-reveal-sol').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = btn.dataset.id;
                const sol = container.querySelector(`#sol-${id}`);
                if (sol) {
                    sol.classList.toggle('hidden');
                    btn.textContent = sol.classList.contains('hidden') ? '[ click to reveal solution ]' : '[ hide solution ]';
                }
            });
        });
        // Open compiler
        container.querySelectorAll('.btn-compiler').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                router.navigate(`/compiler?problem=${btn.dataset.id}`);
            });
        });
        // Solve button
        container.querySelectorAll('.btn-solve').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                router.navigate(`/compiler?problem=${btn.dataset.id}`);
            });
        });
    }

    render();
}

function addStyles(container) {
    const existing = container.querySelector('#qb-styles');
    if (existing) existing.remove();
    const style = document.createElement('style');
    style.id = 'qb-styles';
    style.textContent = `
    .qb-page { width:100%; max-width:none; padding-top:8px; }

    /* TABS */
    .qb-tabs { display:flex; gap:4px; margin-bottom:24px; border-bottom:1px solid #1a1a1a; padding-bottom:0; }
    .qb-tab { background:transparent; border:none; border-bottom:2px solid transparent; color:#6B7280;
        font-family:var(--font-mono); font-size:13px; padding:10px 20px; cursor:pointer;
        transition:all 0.15s; margin-bottom:-1px; }
    .qb-tab:hover { color:#fff; }
    .qb-tab.active { color:#00FF41; border-bottom-color:#00FF41; }
    .tab-count { background:rgba(0,255,65,0.1); color:#00FF41; font-size:10px;
        padding:1px 6px; border-radius:10px; margin-left:6px; }

    /* HEADER */
    .qb-header { padding:0 0 24px; }
    .qb-header-top { display:flex; align-items:baseline; gap:24px; margin-bottom:6px; }
    .qb-title { font-family:var(--font-mono); font-size:32px; font-weight:700; color:#fff; }
    .text-green { color:#00FF41; }
    .qb-stats-row { display:flex; gap:16px; font-family:var(--font-mono); font-size:11px; }
    .qb-stat { }
    .qb-stat.easy { color:#00FF41; }
    .qb-stat.medium { color:#FACC15; }
    .qb-stat.hard { color:#EF4444; }
    .qb-subtitle { font-size:13px; color:#6B7280; font-family:'Inter',sans-serif; }

    /* FILTERS */
    .qb-filters { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:28px; }
    .qb-pill { background:transparent; border:1px solid #1a1a1a; color:#6B7280;
        font-family:var(--font-mono); font-size:11px; padding:5px 14px;
        border-radius:20px; cursor:pointer; transition:all 0.15s; text-transform:lowercase; }
    .qb-pill:hover { border-color:#6B7280; color:#fff; }
    .qb-pill.active { border-color:#00FF41; color:#00FF41; background:rgba(0,255,65,0.05); }

    /* TABLE */
    .qb-list { border:1px solid #1a1a1a; border-radius:6px; overflow:hidden; background:#0d0d0d; }
    .qb-list-header { display:grid; grid-template-columns:50px 1fr 160px 110px 160px;
        padding:12px 20px; background:#111; border-bottom:1px solid #1a1a1a;
        font-family:var(--font-mono); font-size:10px; color:#374151; text-transform:uppercase; gap:8px; }
    .qb-row-wrap { border-bottom:1px solid #1a1a1a; }
    .qb-row-wrap:last-child { border-bottom:none; }
    .qb-row { display:grid; grid-template-columns:50px 1fr 160px 110px 160px;
        padding:14px 20px; align-items:center; cursor:pointer;
        transition:background 0.1s; gap:8px; }
    .qb-row:hover { background:rgba(255,255,255,0.025); }
    .qb-row.expanded { background:rgba(0,255,65,0.03); border-bottom:1px solid #1a1a1a; }
    .qb-col-id { font-family:var(--font-mono); color:#374151; font-size:12px; }
    .qb-col-title { font-family:'Inter',sans-serif; color:#fff; font-size:14px; font-weight:500;
        display:flex; align-items:center; gap:8px; }
    .qb-row-arrow { color:#00FF41; font-size:10px; width:12px; flex-shrink:0; }
    .qb-col-topic { font-family:var(--font-mono); font-size:11px; color:#374151; }
    .qb-col-diff { }
    .diff-badge { font-family:var(--font-mono); font-size:10px; padding:2px 8px;
        border-radius:2px; border:1px solid transparent; text-transform:lowercase; }
    .diff-badge.easy { color:#00FF41; border-color:rgba(0,255,65,0.3); }
    .diff-badge.medium { color:#FACC15; border-color:rgba(250,204,21,0.3); }
    .diff-badge.hard { color:#EF4444; border-color:rgba(239,68,68,0.3); }
    .qb-col-links { display:flex; align-items:center; gap:8px; flex-wrap:wrap; }
    .ext-link { font-family:var(--font-mono); font-size:10px; padding:2px 8px;
        border-radius:2px; text-decoration:none; border:1px solid; transition:all 0.15s; }
    .ext-link.lc { color:#FFA116; border-color:rgba(255,161,22,0.4); }
    .ext-link.lc:hover { background:rgba(255,161,22,0.1); }
    .ext-link.nc { color:#00FF41; border-color:rgba(0,255,65,0.4); }
    .ext-link.nc:hover { background:rgba(0,255,65,0.1); }
    .ext-link.yt { color:#FF4444; border-color:rgba(255,68,68,0.4); }
    .ext-link.yt:hover { background:rgba(255,68,68,0.1); }
    .btn-solve { background:transparent; border:none; color:#00FF41;
        font-family:var(--font-mono); font-size:11px; cursor:pointer; padding:0; }
    .btn-solve:hover { text-decoration:underline; }

    /* DETAIL PANEL */
    .qb-detail { background:#080808; border-top:1px solid #1a1a1a; }
    .qb-detail-inner { padding:24px 28px; }
    .qb-detail-cols { display:grid; grid-template-columns:1fr 380px; gap:32px; }
    .detail-section-label { font-family:var(--font-mono); font-size:10px; color:#00FF41;
        text-transform:lowercase; margin-bottom:10px; }
    .detail-statement { font-family:var(--font-mono); font-size:12px; color:#9CA3AF;
        line-height:1.7; white-space:pre-wrap; background:#000; border:1px solid #1a1a1a;
        padding:16px; border-radius:4px; margin:0; }
    .detail-explanation { font-family:'Inter',sans-serif; font-size:13px; color:#D1D5DB;
        line-height:1.7; background:rgba(0,255,65,0.03); border-left:2px solid #00FF41;
        padding:12px 16px; border-radius:0 4px 4px 0; margin:0; }
    .detail-steps { padding-left:20px; margin:0; }
    .detail-steps li { font-family:'Inter',sans-serif; font-size:12px; color:#9CA3AF;
        line-height:1.7; margin-bottom:4px; }
    .detail-complexity { background:#0d0d0d; border:1px solid #1a1a1a; border-radius:4px; padding:16px; }
    .detail-comp-row { display:flex; justify-content:space-between; margin-bottom:8px;
        font-family:var(--font-mono); font-size:12px; }
    .comp-label { color:#6B7280; }
    .comp-val { color:#00FF41; }
    .detail-links { display:flex; gap:8px; flex-wrap:wrap; }
    .btn-reveal-sol { background:transparent; border:1px solid #FACC15; color:#FACC15;
        font-family:var(--font-mono); font-size:11px; padding:6px 14px;
        border-radius:4px; cursor:pointer; transition:all 0.15s; width:100%; }
    .btn-reveal-sol:hover { background:rgba(250,204,21,0.1); }
    .detail-solution { font-family:'JetBrains Mono',monospace; font-size:12px; color:#D1FAE5;
        background:#000; border:1px solid #1a1a1a; padding:16px; border-radius:4px;
        white-space:pre; overflow-x:auto; margin-top:10px; }
    .detail-solution.hidden { display:none; }
    .btn-compiler { background:#00FF41; color:#000; border:none;
        font-family:var(--font-mono); font-size:11px; font-weight:700;
        padding:7px 16px; border-radius:3px; cursor:pointer; transition:opacity 0.15s; width:100%; }
    .btn-compiler:hover { opacity:0.85; }
    @media(max-width:900px){
        .qb-list-header,.qb-row{grid-template-columns:40px 1fr 90px;}
        .qb-col-topic,.qb-col-links{display:none;}
        .qb-detail-cols{grid-template-columns:1fr;}
    }
    `;
    container.appendChild(style);
}

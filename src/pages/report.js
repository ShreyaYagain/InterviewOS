// ═══════════════════════════════════════════════════════════
// Report Page — Detailed Interview Evaluation
// ═══════════════════════════════════════════════════════════

import { router } from '../router.js';
import { renderRubricCard, renderRadarChart } from '../components/rubricCard.js';
import { getScoreLevel } from '../data/rubrics.js';

const ROUND_LABELS = { dsa: 'DSA Coding', lld: 'Low-Level Design', hld: 'System Design', hr: 'Behavioral' };

export function renderReportPage(container) {
    const report = window.__interviewReport;
    if (!report) {
        container.innerHTML = `
      <div class="page-container" style="text-align:center; padding-top:100px;">
        <p style="font-size:48px;">📊</p>
        <h2 style="margin:16px 0 8px;">No Report Available</h2>
        <p style="color:var(--text-secondary);">Complete an interview first to see your report.</p>
        <button class="btn btn-primary" style="margin-top:24px;" onclick="location.hash='/'">Start Interview</button>
      </div>
    `;
        return;
    }

    const durationMin = Math.floor(report.duration / 60000);
    const durationSec = Math.floor((report.duration % 60000) / 1000);

    container.innerHTML = `
    <div class="report-page animate-fade-in-up">
      <!-- Header -->
      <div class="report-header">
        <div class="report-badge">// final_assessment</div>
        <h1 class="report-title">Detailed <span class="text-green">Interview</span> Performance Report</h1>
        <p class="report-subtitle">${ROUND_LABELS[report.roundType].toLowerCase()} // ${report.mode === 'strict' ? 'strict' : 'coaching'} mode</p>
        <div class="report-meta">
          <span class="report-meta-item">📅 ${new Date(report.timestamp).toLocaleDateString()}</span>
          <span class="report-meta-item">⏱ ${durationMin}m ${durationSec}s</span>
          <span class="report-meta-item">💡 ${report.hintsUsed} hint(s)</span>
        </div>
      </div>

      <!-- Overall Score -->
      <div class="report-overall">
        <div class="overall-score-ring">
          <canvas id="overall-canvas" width="160" height="160"></canvas>
          <div class="overall-score-value">
            <div class="overall-score-number">${report.averageScore.toFixed(1)}</div>
            <div class="overall-score-label">out of 5.0</div>
          </div>
        </div>
        <div class="overall-verdict">
          <div class="verdict-label">// final verdict</div>
          <div class="verdict-level ${report.verdictClass}">${report.verdict.toLowerCase()}</div>
          <p class="verdict-text">${getVerdictText(report).toLowerCase()}</p>
        </div>
      </div>

      <!-- Radar Chart -->
      <div class="report-radar">
        <canvas class="radar-canvas" id="radar-canvas" width="360" height="360"></canvas>
      </div>

      <!-- Score Cards -->
      <div class="report-scores">
        ${report.dimensions.map(d => renderRubricCard(d, report.scores[d.id])).join('')}
      </div>

      <!-- Strengths -->
      ${report.strengths && report.strengths.length > 0 ? `
      <div class="report-section">
        <h2 class="report-section-title">// top strengths</h2>
        <div class="finding-list">
          ${report.strengths.map((s, i) => `
            <div class="finding-item strength">
              <div class="finding-marker">$</div>
              <div class="finding-content">
                <div class="finding-title">${s.title.toLowerCase()}</div>
                <p class="finding-evidence">${s.description.toLowerCase()}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>` : ''}

      <!-- Mistakes -->
      ${report.mistakes && report.mistakes.length > 0 ? `
      <div class="report-section">
        <h2 class="report-section-title">// areas to improve</h2>
        <div class="finding-list">
          ${report.mistakes.map((m, i) => `
            <div class="finding-item mistake">
              <div class="finding-marker">!</div>
              <div class="finding-content">
                <div class="finding-title">${m.title.toLowerCase()}</div>
                <p class="finding-evidence">${m.description.toLowerCase()}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>` : ''}

      <!-- 7-Day Practice Plan -->
      ${report.practicePlan ? `
      <div class="report-section">
        <h2 class="report-section-title">// 7-day practice plan</h2>
        <div class="practice-plan">
          ${report.practicePlan.map(p => `
            <div class="practice-day">
              <div class="practice-day-number">day ${p.day}</div>
              <div class="practice-day-topic">${p.activity.toLowerCase()}</div>
            </div>
          `).join('')}
        </div>
      </div>` : ''}

      <!-- Actions -->
      <div class="report-actions">
        <button class="btn btn-secondary" id="back-home">← back to dashboard</button>
        <button class="btn btn-primary" id="retry-btn">🔄 try again</button>
      </div>
    </div>
  `;

    // Draw overall score ring
    const overallCanvas = container.querySelector('#overall-canvas');
    drawScoreRing(overallCanvas, report.averageScore);

    // Draw radar chart
    const radarCanvas = container.querySelector('#radar-canvas');
    renderRadarChart(radarCanvas, report.dimensions, report.scores);

    // Animate score bars
    requestAnimationFrame(() => {
        container.querySelectorAll('.score-card-bar-fill').forEach(bar => {
            const card = bar.closest('.score-card');
            const dimId = report.dimensions.find(d => card.querySelector('.score-card-title').textContent.includes(d.label))?.id;
            if (dimId) {
                const pct = (report.scores[dimId] / 5) * 100;
                bar.style.width = pct + '%';
            }
        });
    });

    // Events
    container.querySelector('#back-home').addEventListener('click', () => router.navigate('/'));
    container.querySelector('#retry-btn').addEventListener('click', () => {
        router.navigate(`/interview?round=${report.roundType}&mode=${report.mode}&difficulty=medium`);
    });
}

function drawScoreRing(canvas, score) {
    const ctx = canvas.getContext('2d');
    const cx = 80, cy = 80, r = 65;
    const fraction = score / 5;

    // Background ring
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = '#111';
    ctx.lineWidth = 4;
    ctx.stroke();

    // Score arc
    const startAngle = -Math.PI / 2;
    const endAngle = startAngle + fraction * Math.PI * 2;

    ctx.beginPath();
    ctx.arc(cx, cy, r, startAngle, endAngle);
    ctx.strokeStyle = '#00FF41';
    ctx.lineWidth = 4;
    ctx.stroke();
}

function getVerdictText(report) {
    const avg = report.averageScore;
    if (avg >= 4.5) return 'Outstanding performance across all dimensions. You demonstrated strong problem-solving skills and clear communication.';
    if (avg >= 3.5) return 'Solid performance with room for improvement in specific areas. Focus on the weak spots identified below.';
    if (avg >= 2.5) return 'Average performance. Review the practice plan carefully and focus on fundamentals before your next attempt.';
    return 'More practice needed. Focus on the basics and work through the 7-day plan before attempting again.';
}

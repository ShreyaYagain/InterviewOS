// ═══════════════════════════════════════════════════════════
// Sidebar Component — with Auth Toggle
// ═══════════════════════════════════════════════════════════

import { router } from '../router.js';
import { auth } from '../services/auth.js';

export function renderSidebar(container, activePage = 'home') {
  const isAdmin = auth.isAdmin();

  container.innerHTML = `
    <div class="sidebar">
      <div class="sidebar-brand">
        <span class="brand-prefix">></span>
        <div class="sidebar-brand-text">interview_os</div>
      </div>

      <nav class="sidebar-nav">
        <div class="sidebar-section-label">// main</div>
        <button class="sidebar-nav-item ${activePage === 'home' ? 'active' : ''}" data-page="home">
          ${activePage === 'home' ? '<span class="nav-prefix">> </span>' : ''}
          <span>dashboard</span>
        </button>
        <button class="sidebar-nav-item ${activePage === 'jd-parser' ? 'active' : ''}" data-page="jd-parser">
          ${activePage === 'jd-parser' ? '<span class="nav-prefix">> </span>' : ''}
          <span>jd_analyzer</span>
        </button>
        <button class="sidebar-nav-item ${activePage === 'study-planner' ? 'active' : ''}" data-page="study-planner">
          ${activePage === 'study-planner' ? '<span class="nav-prefix">> </span>' : ''}
          <span>planner</span>
        </button>
        <button class="sidebar-nav-item ${activePage === 'tracker' ? 'active' : ''}" data-page="tracker">
          ${activePage === 'tracker' ? '<span class="nav-prefix">> </span>' : ''}
          <span>tracker</span>
        </button>

        <div class="sidebar-section-label">// resources</div>
        <button class="sidebar-nav-item ${activePage === 'resources' ? 'active' : ''}" data-page="resources">
          ${activePage === 'resources' ? '<span class="nav-prefix">> </span>' : ''}
          <span>lld_resources</span>
        </button>
        <button class="sidebar-nav-item ${activePage === 'questions' ? 'active' : ''}" data-page="questions">
          ${activePage === 'questions' ? '<span class="nav-prefix">> </span>' : ''}
          <span>dsa_bank</span>
        </button>
        <button class="sidebar-nav-item ${activePage === 'sql-questions' ? 'active' : ''}" data-page="sql-questions">
          ${activePage === 'sql-questions' ? '<span class="nav-prefix">> </span>' : ''}
          <span>sql_bank</span>
        </button>

        <div class="sidebar-section-label">// practice</div>
        <button class="sidebar-nav-item ${activePage === 'hld-practice' ? 'active' : ''}" data-page="hld-practice">
          ${activePage === 'hld-practice' ? '<span class="nav-prefix">> </span>' : ''}
          <span>hld_practice</span>
        </button>
        <button class="sidebar-nav-item" data-quick="dsa">
          <span>dsa_round</span>
        </button>
        <button class="sidebar-nav-item" data-quick="lld">
          <span>lld_round</span>
        </button>
        <button class="sidebar-nav-item" data-quick="hld">
          <span>hld_round</span>
        </button>
        <button class="sidebar-nav-item" data-quick="hr">
          <span>behavioral_round</span>
        </button>

        <div class="sidebar-section-label">// tools</div>
        <button class="sidebar-nav-item ${activePage === 'resume' ? 'active' : ''}" data-page="resume">
          ${activePage === 'resume' ? '<span class="nav-prefix">> </span>' : ''}
          <span>resume_generator</span>
        </button>
        <button class="sidebar-nav-item ${activePage === 'compiler' ? 'active' : ''}" data-page="compiler">
          ${activePage === 'compiler' ? '<span class="nav-prefix">> </span>' : ''}
          <span>compiler</span>
        </button>
        <button class="sidebar-nav-item ${activePage === 'groq' ? 'active' : ''}" data-page="groq">
          ${activePage === 'groq' ? '<span class="nav-prefix">> </span>' : ''}
          <span>groq_playground</span>
        </button>
        <button class="sidebar-nav-item ${activePage === 'sql-playground' ? 'active' : ''}" data-page="sql-playground">
          ${activePage === 'sql-playground' ? '<span class="nav-prefix">> </span>' : ''}
          <span>sql_playground</span>
        </button>
      </nav>

      <div class="sidebar-footer">
        <button class="sidebar-nav-item auth-toggle" id="auth-toggle">
          <span>${isAdmin ? 'admin_mode: unlock' : 'admin_mode: lock'}</span>
        </button>
      </div>
    </div>
  `;

  // Navigation
  container.querySelectorAll('.sidebar-nav-item[data-page]').forEach(btn => {
    btn.addEventListener('click', () => {
      const page = btn.dataset.page;
      router.navigate(page === 'home' ? '/' : `/${page}`);
    });
  });

  container.querySelectorAll('.sidebar-nav-item[data-quick]').forEach(btn => {
    btn.addEventListener('click', () => {
      const round = btn.dataset.quick;
      router.navigate(`/interview?round=${round}&mode=coaching&difficulty=medium`);
    });
  });

  // Auth toggle
  container.querySelector('#auth-toggle').addEventListener('click', () => {
    if (isAdmin) {
      auth.logout();
      router.navigate(window.location.hash.slice(1) || '/');
    } else {
      showAuthModal(container);
    }
  });
}

function showAuthModal(container) {
  const overlay = document.createElement('div');
  overlay.className = 'auth-modal-overlay';
  overlay.innerHTML = `
    <div class="auth-modal" style="background:#000; border:1px solid #00FF41; border-radius:0; padding:24px; color:#fff; font-family:'JetBrains Mono', monospace;">
      <h3 style="color:#00FF41; font-size:16px; margin-bottom:16px;">// admin_access</h3>
      <p style="font-size:12px; color:#6B7280; margin-bottom:20px;">enter password to unlock administrative protocols.</p>
      <input type="password" id="auth-password" placeholder="password..." autofocus 
        style="width:100%; background:#000; border:1px solid #333; padding:10px; color:#fff; font-family:inherit; font-size:14px; outline:none; margin-bottom:12px;"
        onfocus="this.style.borderColor='#00FF41'" onblur="this.style.borderColor='#333'" />
      <div class="auth-error" id="auth-error" style="display:none; color:#FF0000; font-size:10px; margin-bottom:12px;">authentication_failed: incorrect credentials</div>
      <div class="auth-modal-btns" style="display:flex; justify-content:flex-end; gap:12px;">
        <button id="auth-cancel" style="background:transparent; border:none; color:#6B7280; font-family:inherit; cursor:pointer; font-size:12px;">cancel</button>
        <button id="auth-submit" style="background:#00FF41; border:none; color:#000; padding:6px 16px; font-family:inherit; cursor:pointer; font-size:12px; font-weight:700;">unlock</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  const input = overlay.querySelector('#auth-password');
  const error = overlay.querySelector('#auth-error');

  overlay.querySelector('#auth-cancel').addEventListener('click', () => overlay.remove());
  overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });

  function submit() {
    if (auth.login(input.value)) {
      overlay.remove();
      router.navigate(window.location.hash.slice(1) || '/');
    } else {
      error.style.display = 'block';
      input.value = '';
      input.focus();
    }
  }

  overlay.querySelector('#auth-submit').addEventListener('click', submit);
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') submit(); });
  input.focus();
}

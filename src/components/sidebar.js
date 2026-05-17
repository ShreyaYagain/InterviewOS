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
        <button class="sidebar-nav-item ${activePage === 'role-match' ? 'active' : ''}" data-page="role-match">
          ${activePage === 'role-match' ? '<span class="nav-prefix">> </span>' : ''}
          <span>role_match</span>
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
          <span>doubts_bot</span>
        </button>
        <button class="sidebar-nav-item ${activePage === 'sql-playground' ? 'active' : ''}" data-page="sql-playground">
          ${activePage === 'sql-playground' ? '<span class="nav-prefix">> </span>' : ''}
          <span>sql_compiler</span>
        </button>
      </nav>

      <div class="sidebar-footer" style="border-top: 1px solid #1a1a1a; margin-top: auto; padding-top: 16px;">
        <button class="sidebar-nav-item ${activePage === 'about' ? 'active' : ''}" data-page="about">
          ${activePage === 'about' ? '<span class="nav-prefix">> </span>' : ''}
          <span>about</span>
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

}

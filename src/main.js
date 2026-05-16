// ═══════════════════════════════════════════════════════════
// InterviewOS — App Bootstrap
// ═══════════════════════════════════════════════════════════

import './styles/index.css';
import './styles/layout.css';
import './styles/chat.css';
import './styles/editor.css';
import './styles/report.css';

import { router } from './router.js';
import { renderSidebar } from './components/sidebar.js';
import { renderHomePage } from './pages/home.js';
import { renderInterviewPage } from './pages/interview.js';
import { renderQuestionsPage } from './pages/questions.js';
import { renderReportPage } from './pages/report.js';
import { renderResourcesPage } from './pages/resources.js';
import { renderHLDPracticePage } from './pages/hldPractice.js';
import { renderStudyPlannerPage } from './pages/studyPlanner.js';
import { renderTrackerPage } from './pages/tracker.js';
import { renderJDParserPage } from './pages/jdParser.js';
import { renderSolidPrinciplesPage } from './pages/lld/solidPrinciples.js';
import { renderCreationalPatternsPage } from './pages/lld/creationalPatterns.js';
import { renderStructuralPatternsPage } from './pages/lld/structuralPatterns.js';
import { renderBehavioralPatternsPage } from './pages/lld/behavioralPatterns.js';
import { renderResumePage } from './pages/resume.js';
import { renderCompilerPage } from './pages/compiler.js';
import { renderGroqPage } from './pages/groq.js';
import { renderSQLPlaygroundPage } from './pages/sqlPlayground.js';

const app = document.getElementById('app');

// Pages that use the sidebar layout
function withSidebar(page, pageName) {
  return (params) => {
    app.innerHTML = `
      <div class="app-shell">
        <div id="sidebar-container"></div>
        <div class="main-content">
          <div id="page-content"></div>
        </div>
      </div>
    `;
    renderSidebar(document.getElementById('sidebar-container'), pageName);
    page(document.getElementById('page-content'), params);
  };
}

// Interview page is full-screen (no sidebar)
function fullScreen(page) {
  return (params) => {
    app.innerHTML = '<div id="page-content"></div>';
    page(document.getElementById('page-content'), params);
  };
}

// Routes
router
  .on('/', withSidebar(renderHomePage, 'home'))
  .on('/questions', withSidebar((c,p) => renderQuestionsPage(c,'dsa'), 'questions'))
  .on('/sql-questions', withSidebar((c,p) => renderQuestionsPage(c,'sql'), 'sql-questions'))
  .on('/resources', withSidebar(renderResourcesPage, 'resources'))
  .on('/hld-practice', withSidebar(renderHLDPracticePage, 'hld-practice'))
  .on('/study-planner', withSidebar(renderStudyPlannerPage, 'study-planner'))
  .on('/tracker', withSidebar(renderTrackerPage, 'tracker'))
  .on('/jd-parser', withSidebar(renderJDParserPage, 'jd-parser'))
  .on('/lld-resources/solid-principles', withSidebar(renderSolidPrinciplesPage, 'resources'))
  .on('/lld-resources/creational-patterns', withSidebar(renderCreationalPatternsPage, 'resources'))
  .on('/lld-resources/structural-patterns', withSidebar(renderStructuralPatternsPage, 'resources'))
  .on('/lld-resources/behavioral-patterns', withSidebar(renderBehavioralPatternsPage, 'resources'))
  .on('/resume', withSidebar(renderResumePage, 'resume'))
  .on('/compiler', fullScreen(renderCompilerPage)) // Full screen, no sidebar
  .on('/groq', withSidebar(renderGroqPage, 'groq'))
  .on('/sql-playground', withSidebar(renderSQLPlaygroundPage, 'sql-playground'))
  .on('/interview', fullScreen(renderInterviewPage))
  .on('/report', withSidebar(renderReportPage, 'report'))
  .on('*', withSidebar(renderHomePage, 'home'));

// Start
router.start();

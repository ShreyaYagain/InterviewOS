// ═══════════════════════════════════════════════════════════
// Creational Patterns Detail Page
// ═══════════════════════════════════════════════════════════

const PATTERNS = [
    {
        name: 'Singleton',
        desc: 'Ensure only one instance exists',
        useCase: 'Logger, Config Manager, DB Connection Pool',
        code: `class Database {
  private static instance: Database;
  
  private constructor() {} // Prevent direct instantiation
  
  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}`
    },
    {
        name: 'Factory',
        desc: 'Create objects without specifying exact class',
        useCase: 'ShapeFactory, NotificationFactory (email/SMS/push)',
        code: `interface Notification { send(); }
class EmailNotification implements Notification { send() {} }
class SMSNotification implements Notification { send() {} }

class NotificationFactory {
  create(type): Notification {
    if (type === 'EMAIL') return new EmailNotification();
    if (type === 'SMS') return new SMSNotification();
    throw new Error('Unknown type');
  }
}`
    },
    {
        name: 'Builder',
        desc: 'Construct complex objects step by step',
        useCase: 'SQL query builder, HTTP request builder',
        code: `class QueryBuilder {
  private query = {};
  
  select(fields) { this.query.fields = fields; return this; }
  where(condition) { this.query.where = condition; return this; }
  build() { return this.query; }
}

// Usage:
const q = new QueryBuilder().select('*').where('id=1').build();`
    },
    {
        name: 'Abstract Factory',
        desc: 'Family of related objects without specifying classes',
        useCase: 'UI component library (Windows vs Mac widgets)',
        code: `interface GUIFactory {
  createButton(): Button;
  createCheckbox(): Checkbox;
}

class MacFactory implements GUIFactory {
  createButton() { return new MacButton(); }
  createCheckbox() { return new MacCheckbox(); }
}`
    }
];

export function renderCreationalPatternsPage(container) {
    container.innerHTML = `
    <div class="page-container lld-detail-page">
      <div class="back-link" onclick="window.location.hash = '/resources'">
        ← lld_resources
      </div>
      
      <div class="resources-header animate-fade-in-up">
        <h1 class="resources-title">Creational <span class="text-green">Patterns</span></h1>
        <p class="resources-subtitle">Design patterns that deal with object creation mechanisms.</p>
      </div>

      <div class="patterns-grid">
        ${PATTERNS.map(p => `
          <div class="pattern-card animate-fade-in-up">
            <h2 class="pattern-name">${p.name}</h2>
            <p class="pattern-desc">${p.desc}</p>
            
            <div class="pattern-usecase">
              <span class="usecase-label">Use Case:</span> ${p.useCase}
            </div>
            
            <div class="code-block good">
              <pre><code>${escapeHtml(p.code)}</code></pre>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

    addDetailStyles(container);
}

function escapeHtml(text) {
    return text.replace(/&/g, "&amp;")
               .replace(/</g, "&lt;")
               .replace(/>/g, "&gt;")
               .replace(/"/g, "&quot;")
               .replace(/'/g, "&#039;");
}

function addDetailStyles(container) {
    if (container.querySelector('#lld-pattern-styles')) return;
    const style = document.createElement('style');
    style.id = 'lld-pattern-styles';
    style.textContent = `
    .lld-detail-page { width: 100%; max-width: none; }
    .back-link { font-family: var(--font-mono); font-size: 13px; color: #6B7280; cursor: pointer; margin-bottom: 32px; transition: color 0.2s; }
    .back-link:hover { color: #00FF41; }
    
    .patterns-grid { display: grid; grid-template-columns: 1fr; gap: 32px; }
    .pattern-card { background: #0d0d0d; border: 1px solid #1a1a1a; border-radius: 8px; padding: 32px; }
    .pattern-card:hover { border-color: rgba(0, 255, 65, 0.2); }
    
    .pattern-name { font-family: var(--font-mono); font-size: 20px; color: #FFFFFF; font-weight: 700; margin-bottom: 8px; }
    .pattern-desc { font-family: 'Inter', sans-serif; font-size: 14px; color: #6B7280; margin-bottom: 16px; }
    
    .pattern-usecase { font-family: 'Inter', sans-serif; font-size: 13px; color: #9CA3AF; margin-bottom: 24px; padding: 12px; background: rgba(255, 255, 255, 0.03); border-radius: 4px; }
    .usecase-label { color: #00FF41; font-family: var(--font-mono); margin-right: 8px; }
    
    .code-block { background: #000000; border-radius: 4px; padding: 16px; border-left: 2px solid #333; }
    .code-block.good { border-left-color: #00FF41; }
    .code-block pre { margin: 0; white-space: pre-wrap; }
    .code-block code { font-family: var(--font-mono); font-size: 12px; color: #6B7280; line-height: 1.6; }
    `;
    container.appendChild(style);
}

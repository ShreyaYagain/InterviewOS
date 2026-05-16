// ═══════════════════════════════════════════════════════════
// SOLID Principles Detail Page
// ═══════════════════════════════════════════════════════════

const PRINCIPLES = [
    {
        letter: 'S',
        name: 'Single Responsibility',
        def: 'A class should have only one reason to change.',
        bad: `class UserService {
  login(user) { /* ... */ }
  sendEmail(user, msg) { /* ... */ }
  saveToDB(user) { /* ... */ }
}`,
        good: `class UserService {
  login(user) { /* ... */ }
}
class EmailService {
  sendEmail(user, msg) { /* ... */ }
}
class UserRepository {
  saveToDB(user) { /* ... */ }
}`
    },
    {
        letter: 'O',
        name: 'Open/Closed',
        def: 'Open for extension, closed for modification.',
        bad: `class PaymentProcessor {
  process(payment) {
    if (payment.type === 'credit') { /* ... */ }
    else if (payment.type === 'paypal') { /* ... */ }
  }
}`,
        good: `interface PaymentMethod {
  process();
}
class CreditPayment implements PaymentMethod {
  process() { /* ... */ }
}
class PayPalPayment implements PaymentMethod {
  process() { /* ... */ }
}`
    },
    {
        letter: 'L',
        name: 'Liskov Substitution',
        def: 'Subclasses must be substitutable for their base class.',
        bad: `class Bird { fly() { /* ... */ } }
class Penguin extends Bird {
  fly() { throw new Error("Can't fly"); }
}`,
        good: `class Bird { /* ... */ }
class FlyingBird extends Bird { fly() { /* ... */ } }
class Penguin extends Bird { /* ... */ }`
    },
    {
        letter: 'I',
        name: 'Interface Segregation',
        def: 'No client should be forced to depend on methods it doesn\'t use.',
        bad: `interface Animal {
  fly();
  swim();
  run();
}
class Dog implements Animal {
  fly() { /* Exception */ }
}`,
        good: `interface Flyable { fly(); }
interface Swimmable { swim(); }
interface Runnable { run(); }

class Dog implements Runnable, Swimmable { /* ... */ }`
    },
    {
        letter: 'D',
        name: 'Dependency Inversion',
        def: 'Depend on abstractions, not concretions.',
        bad: `class OrderService {
  constructor() {
    this.db = new MySQLDatabase(); // Tight coupling
  }
}`,
        good: `class OrderService {
  constructor(database) {
    this.db = database; // Dependency injection
  }
}`
    }
];

export function renderSolidPrinciplesPage(container) {
    container.innerHTML = `
    <div class="page-container lld-detail-page">
      <div class="back-link" onclick="window.location.hash = '/resources'">
        ← lld_resources
      </div>
      
      <div class="resources-header animate-fade-in-up">
        <h1 class="resources-title">SOLID <span class="text-green">Principles</span></h1>
        <p class="resources-subtitle">The five pillars of object-oriented design for building scalable systems.</p>
      </div>

      <div class="principles-stack">
        ${PRINCIPLES.map(p => `
          <div class="principle-card animate-fade-in-up">
            <div class="principle-header">
              <span class="principle-letter">${p.letter}</span>
              <h2 class="principle-name">${p.name}</h2>
            </div>
            <p class="principle-def">${p.def}</p>
            
            <div class="code-comparison">
              <div class="code-block bad">
                <div class="code-label">// bad_example</div>
                <pre><code>${escapeHtml(p.bad)}</code></pre>
              </div>
              <div class="code-block good">
                <div class="code-label">// good_example</div>
                <pre><code>${escapeHtml(p.good)}</code></pre>
              </div>
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
    if (container.querySelector('#lld-detail-styles')) return;
    const style = document.createElement('style');
    style.id = 'lld-detail-styles';
    style.textContent = `
    .lld-detail-page { width: 100%; max-width: none; }
    .back-link { font-family: var(--font-mono); font-size: 13px; color: #6B7280; cursor: pointer; margin-bottom: 32px; transition: color 0.2s; }
    .back-link:hover { color: #00FF41; }
    
    .principles-stack { display: flex; flex-direction: column; gap: 32px; }
    .principle-card { background: #0d0d0d; border: 1px solid #1a1a1a; border-radius: 8px; padding: 32px; }
    .principle-card:hover { border-color: rgba(0, 255, 65, 0.2); }
    
    .principle-header { display: flex; align-items: center; gap: 16px; margin-bottom: 16px; }
    .principle-letter { font-family: var(--font-mono); font-size: 24px; font-weight: 900; color: #00FF41; background: rgba(0, 255, 65, 0.1); width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; border-radius: 4px; }
    .principle-name { font-family: var(--font-mono); font-size: 20px; color: #FFFFFF; font-weight: 700; }
    .principle-def { font-family: 'Inter', sans-serif; font-size: 14px; color: #6B7280; margin-bottom: 24px; }
    
    .code-comparison { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    .code-block { background: #000000; border-radius: 4px; padding: 16px; border-left: 2px solid #333; }
    .code-block.bad { border-left-color: #ff4444; }
    .code-block.good { border-left-color: #00FF41; }
    .code-label { font-family: var(--font-mono); font-size: 11px; color: #374151; margin-bottom: 12px; }
    .code-block pre { margin: 0; white-space: pre-wrap; }
    .code-block code { font-family: var(--font-mono); font-size: 12px; color: #6B7280; line-height: 1.6; }
    
    @media (max-width: 1024px) {
      .code-comparison { grid-template-columns: 1fr; }
    }
    `;
    container.appendChild(style);
}

// ═══════════════════════════════════════════════════════════
// Behavioral Patterns Detail Page
// ═══════════════════════════════════════════════════════════

const PATTERNS = [
    {
        name: 'Observer',
        desc: 'Notify multiple objects when state changes',
        useCase: 'Event system, stock price alerts, notification service',
        code: `class Subject {
  constructor() { this.observers = []; }
  
  subscribe(observer) { this.observers.push(observer); }
  
  notify(data) {
    this.observers.forEach(obs => obs.update(data));
  }
}

class UserObserver {
  update(data) { console.log('User notified:', data); }
}`
    },
    {
        name: 'Strategy',
        desc: 'Define family of algorithms, make them interchangeable',
        useCase: 'Sorting algorithms, payment methods, route planning',
        code: `class PaymentProcessor {
  constructor(strategy) { this.strategy = strategy; }
  
  process(amount) {
    // Delegate the algorithm to the strategy
    this.strategy.pay(amount);
  }
}

// Usage:
const processor = new PaymentProcessor(new PayPalStrategy());
processor.process(100);`
    },
    {
        name: 'Command',
        desc: 'Encapsulate a request as an object',
        useCase: 'Undo/redo, task queues, macro recording',
        code: `interface Command { execute(); undo(); }

class LightOnCommand implements Command {
  constructor(light) { this.light = light; }
  execute() { this.light.turnOn(); }
  undo() { this.light.turnOff(); }
}

class RemoteControl {
  executeCommand(cmd) {
    cmd.execute();
    this.history.push(cmd);
  }
}`
    },
    {
        name: 'State',
        desc: 'Allow object to alter behavior when internal state changes',
        useCase: 'Traffic light, vending machine, elevator',
        code: `class VendingMachine {
  constructor() { this.state = new NoCoinState(this); }
  
  setState(state) { this.state = state; }
  
  insertCoin() { this.state.insertCoin(); }
  dispense() { this.state.dispense(); }
}

class NoCoinState {
  constructor(machine) { this.machine = machine; }
  insertCoin() { 
    console.log('Coin inserted');
    this.machine.setState(new HasCoinState(this.machine));
  }
}`
    }
];

export function renderBehavioralPatternsPage(container) {
    container.innerHTML = `
    <div class="page-container lld-detail-page">
      <div class="back-link" onclick="window.location.hash = '/resources'">
        ← lld_resources
      </div>
      
      <div class="resources-header animate-fade-in-up">
        <h1 class="resources-title">Behavioral <span class="text-green">Patterns</span></h1>
        <p class="resources-subtitle">Design patterns that identify common communication patterns between objects.</p>
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

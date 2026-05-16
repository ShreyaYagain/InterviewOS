// ═══════════════════════════════════════════════════════════
// Structural Patterns Detail Page
// ═══════════════════════════════════════════════════════════

const PATTERNS = [
    {
        name: 'Adapter',
        desc: 'Make incompatible interfaces work together',
        useCase: 'Third-party payment SDK with different interface',
        code: `class StripeAdapter implements PaymentGateway {
  constructor(stripeSdk) {
    this.stripe = stripeSdk;
  }
  
  processPayment(amount) {
    // Translate our interface to Stripe's expected interface
    this.stripe.charge({ total: amount, currency: 'USD' });
  }
}`
    },
    {
        name: 'Decorator',
        desc: 'Add behavior to objects dynamically',
        useCase: 'Coffee order system (add milk, sugar, whip)',
        code: `interface Coffee { getCost(); }
class BasicCoffee implements Coffee { getCost() { return 5; } }

class MilkDecorator implements Coffee {
  constructor(coffee) { this.coffee = coffee; }
  getCost() { return this.coffee.getCost() + 1.5; }
}

// Usage:
let myCoffee = new BasicCoffee();
myCoffee = new MilkDecorator(myCoffee); // Cost is now 6.5`
    },
    {
        name: 'Facade',
        desc: 'Simplified interface to complex subsystem',
        useCase: 'Home theater system (one button starts everything)',
        code: `class HomeTheaterFacade {
  constructor(tv, soundSystem, dvdPlayer) {
    this.tv = tv;
    this.audio = soundSystem;
    this.dvd = dvdPlayer;
  }
  
  watchMovie() {
    this.tv.on();
    this.audio.on();
    this.audio.setVolume(10);
    this.dvd.on();
    this.dvd.play();
  }
}`
    },
    {
        name: 'Proxy',
        desc: 'Provide a surrogate or placeholder for another object',
        useCase: 'Lazy loading, access control, caching',
        code: `class VideoProxy implements Video {
  constructor(id) { this.id = id; }
  
  play() {
    if (!this.realVideo) {
      // Lazy initialization: expensive object created only when needed
      this.realVideo = new RealVideo(this.id); 
    }
    this.realVideo.play();
  }
}`
    }
];

export function renderStructuralPatternsPage(container) {
    container.innerHTML = `
    <div class="page-container lld-detail-page">
      <div class="back-link" onclick="window.location.hash = '/resources'">
        ← lld_resources
      </div>
      
      <div class="resources-header animate-fade-in-up">
        <h1 class="resources-title">Structural <span class="text-green">Patterns</span></h1>
        <p class="resources-subtitle">Design patterns that ease the design by identifying a simple way to realize relationships between entities.</p>
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

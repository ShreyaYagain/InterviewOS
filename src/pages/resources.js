// ═══════════════════════════════════════════════════════════
// LLD Resources Page — Patterns & Books
// ═══════════════════════════════════════════════════════════

const TOPICS = [
    { id: 'solid-principles', title: 'SOLID Principles', desc: 'The foundation of clean, maintainable code.' },
    { id: 'creational-patterns', title: 'Creational Patterns', desc: 'Singleton, Factory, Builder, Abstract Factory.' },
    { id: 'structural-patterns', title: 'Structural Patterns', desc: 'Adapter, Decorator, Facade, Proxy.' },
    { id: 'behavioral-patterns', title: 'Behavioral Patterns', desc: 'Observer, Strategy, State, Command.' }
];

const BOOKS = [
    { title: 'Clean Code', author: 'Robert C. Martin', cover: '📖', url: 'https://www.oreilly.com/library/view/clean-code-a/9780136083238/' },
    { title: 'Design Patterns', author: 'Gang of Four', cover: '📕', url: 'https://www.amazon.com/dp/0201633612' },
    { title: 'Refactoring', author: 'Martin Fowler', cover: '📗', url: 'https://martinfowler.com/books/refactoring.html' },
    { title: 'Head First Design Patterns', author: 'Freeman et al.', cover: '📘', url: 'https://www.oreilly.com/library/view/head-first-design/9781492077992/' },
    { title: 'Building Microservices', author: 'Sam Newman', cover: '📙', url: 'https://www.oreilly.com/library/view/building-microservices-2nd/9781492034018/' },
    { title: 'DDD Distilled', author: 'Vaughn Vernon', cover: '📓', url: 'https://www.amazon.com/dp/0134434420' }
];

export function renderResourcesPage(container) {
    container.innerHTML = `
    <div class="page-container resources-page">
      <div class="resources-header animate-fade-in-up">
        <h1 class="resources-title">LLD <span class="text-green">Resources</span></h1>
        <p class="resources-subtitle">Essential patterns, principles, and reading for low-level design.</p>
      </div>

      <div class="resources-section animate-fade-in-up">
        <h2 class="section-label">// core_topics</h2>
        <div class="resources-grid">
          ${TOPICS.map(t => `
            <div class="resource-card" onclick="window.location.hash = '/lld-resources/${t.id}'">
              <h3 class="resource-card-title">${t.title.toLowerCase()}</h3>
              <p class="resource-card-desc">${t.desc.toLowerCase()}</p>
              <div class="resource-card-footer">
                <span class="resource-link">view module →</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="resources-section animate-fade-in-up" style="margin-top: 64px;">
        <h2 class="section-label">// essential_reading</h2>
        <div class="books-grid">
          ${BOOKS.map(b => `
            <div class="book-card" onclick="window.open('${b.url}', '_blank', 'noopener noreferrer')">
              <div class="book-cover">${b.cover}</div>
              <div class="book-info">
                <h3 class="book-title">${b.title.toLowerCase()}</h3>
                <p class="book-author">by ${b.author.toLowerCase()}</p>
              </div>
              <div class="book-open-label">open ↗</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;

    addResourceStyles(container);
}

function addResourceStyles(container) {
    if (container.querySelector('#resource-styles')) return;
    const style = document.createElement('style');
    style.id = 'resource-styles';
    style.textContent = `
    .resources-page { width: 100%; max-width: none; }
    .resources-header { padding: 0 0 32px; text-align: left; }
    .resources-title { font-size: 32px; font-weight: 700; font-family: var(--font-mono); color: #FFFFFF; margin-bottom: 8px; }
    .text-green { color: #00FF41; }
    .resources-subtitle { font-size: 13px; color: #6B7280; font-family: 'Inter', sans-serif; margin-bottom: 40px; }

    .section-label { font-family: var(--font-mono); font-size: 12px; color: #00FF41; margin-bottom: 24px; text-transform: lowercase; }

    .resources-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; width: 100%; max-width: none; }
    .resource-card { background: #0d0d0d; border: 1px solid #1a1a1a; border-radius: 6px; padding: 24px; display: flex; flex-direction: column; justify-content: space-between; min-height: 140px; width: 100%; box-sizing: border-box; cursor: pointer; transition: all 0.2s ease; }
    .resource-card:hover { border-color: rgba(0, 255, 65, 0.4); background: #111111; }
    .resource-card-title { font-family: var(--font-mono); font-size: 16px; color: #FFFFFF; font-weight: 700; margin-bottom: 8px; }
    .resource-card-desc { font-family: 'Inter', sans-serif; font-size: 13px; color: #6B7280; line-height: 1.5; margin-bottom: 16px; }
    .resource-link { font-family: var(--font-mono); font-size: 11px; color: #00FF41; }
    .resource-card:hover .resource-link { color: #FFFFFF; }

    .books-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; width: 100%; max-width: none; }
    .book-card { background: #0d0d0d; border: 1px solid #1a1a1a; border-radius: 6px; padding: 20px; display: flex; align-items: center; gap: 16px; width: 100%; box-sizing: border-box; cursor: pointer; position: relative; transition: all 0.2s ease; overflow: hidden; }
    .book-card:hover { border-color: rgba(0, 255, 65, 0.3); background: #111111; }
    .book-cover { font-size: 24px; flex-shrink: 0; }
    .book-info { flex: 1; }
    .book-title { font-family: var(--font-mono); font-size: 14px; color: #FFFFFF; font-weight: 700; margin-bottom: 4px; }
    .book-author { font-family: var(--font-mono); font-size: 11px; color: #374151; }
    
    .book-open-label { position: absolute; bottom: 12px; right: 12px; font-family: var(--font-mono); font-size: 11px; color: #00FF41; opacity: 0; transform: translateY(4px); transition: all 0.2s ease; }
    .book-card:hover .book-open-label { opacity: 1; transform: translateY(0); }

    @media (max-width: 1024px) {
        .books-grid { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 768px) {
        .resources-grid, .books-grid { grid-template-columns: 1fr; }
    }
    `;
    container.appendChild(style);
}

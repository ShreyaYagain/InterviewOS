// SQL Playground — In-browser SQL engine (pure JS, no dependencies)
import { router } from '../router.js';
import { MiniSQL } from '../lib/miniSQL.js';

const SAMPLE_QUERIES = [
    { label: 'SELECT all employees', sql: 'SELECT * FROM Employees;' },
    { label: 'Top 5 salaries', sql: 'SELECT name, salary FROM Employees ORDER BY salary DESC LIMIT 5;' },
    { label: 'Department headcount', sql: 'SELECT department, COUNT(*) AS headcount FROM Employees GROUP BY department ORDER BY headcount DESC;' },
    { label: 'Orders with customer names', sql: 'SELECT c.name, o.product, o.amount FROM Customers c JOIN Orders o ON c.id = o.customer_id ORDER BY o.amount DESC;' },
    { label: 'Customers with no orders', sql: 'SELECT c.name FROM Customers c LEFT JOIN Orders o ON c.id = o.customer_id WHERE o.id IS NULL;' },
    { label: 'Avg salary per department', sql: 'SELECT department, ROUND(AVG(salary), 2) AS avg_salary FROM Employees GROUP BY department ORDER BY avg_salary DESC;' },
    { label: 'High earners (>80k)', sql: 'SELECT name, salary, department FROM Employees WHERE salary > 80000 ORDER BY salary DESC;' },
    { label: 'Products never ordered', sql: 'SELECT p.name FROM Products p LEFT JOIN Orders o ON p.id = o.product_id WHERE o.id IS NULL;' },
];

const SCHEMA_DOC = `
Available Tables:

┌─ Employees ─────────────────────────────┐
│ id, name, salary, department,           │
│ manager_id, hire_date                   │
└─────────────────────────────────────────┘

┌─ Customers ─────────────────────────────┐
│ id, name, email, city, revenue          │
└─────────────────────────────────────────┘

┌─ Orders ────────────────────────────────┐
│ id, customer_id, product_id,            │
│ product, amount, order_date             │
└─────────────────────────────────────────┘

┌─ Products ──────────────────────────────┐
│ id, name, category, price, stock        │
└─────────────────────────────────────────┘
`.trim();

export function renderSQLPlaygroundPage(container) {
    container.innerHTML = `
<div class="sqlpg-page">
  <div class="sqlpg-header">
    <div class="sqlpg-title-row">
      <h1 class="sqlpg-title">SQL <span class="text-green">Playground</span></h1>
      <div class="sqlpg-badge"><span class="pulse-dot"></span> in-browser sqlite</div>
    </div>
    <p class="sqlpg-subtitle">Run real SQL queries against preloaded sample tables. No backend needed.</p>
  </div>

  <div class="sqlpg-layout">
    <!-- Left: Editor -->
    <div class="sqlpg-left">
      <div class="sqlpg-editor-card">
        <div class="sqlpg-editor-header">
          <span class="mono-label">// query.sql</span>
          <div class="sqlpg-header-actions">
            <select id="sql-snippet-select" class="snippet-select">
              <option value="">— sample queries —</option>
              ${SAMPLE_QUERIES.map((s,i)=>`<option value="${i}">${s.label}</option>`).join('')}
            </select>
            <button id="sql-clear-btn" class="btn-ghost">clear</button>
          </div>
        </div>
        <textarea id="sql-editor" class="sql-editor" spellcheck="false" placeholder="SELECT * FROM Employees LIMIT 10;">${SAMPLE_QUERIES[0].sql}</textarea>
        <div class="sqlpg-editor-footer">
          <div class="sql-hint">Ctrl+Enter to run</div>
          <button id="sql-run-btn" class="btn-run">[ ▶ Run Query ]</button>
        </div>
      </div>

      <!-- Output -->
      <div class="sqlpg-output-card" id="sql-output-card">
        <div class="sqlpg-output-header">
          <span class="mono-label" id="sql-output-label">// results</span>
          <span class="sql-row-count" id="sql-row-count"></span>
        </div>
        <div id="sql-result" class="sql-result-area">
          <div class="sql-idle">// run a query to see results</div>
        </div>
      </div>
    </div>

    <!-- Right: Schema + Shortcuts -->
    <div class="sqlpg-right">
      <div class="sqlpg-schema-card">
        <div class="mono-label" style="margin-bottom:12px">// schema</div>
        <pre class="schema-pre">${SCHEMA_DOC}</pre>
      </div>

      <div class="sqlpg-cheatsheet-card">
        <div class="mono-label" style="margin-bottom:12px">// sql cheatsheet</div>
        <div class="cheat-item"><span class="cheat-kw">SELECT</span> col FROM tbl WHERE cond</div>
        <div class="cheat-item"><span class="cheat-kw">GROUP BY</span> col <span class="cheat-kw">HAVING</span> COUNT(*) > 1</div>
        <div class="cheat-item"><span class="cheat-kw">ORDER BY</span> col <span class="cheat-kw">DESC LIMIT</span> 10</div>
        <div class="cheat-item"><span class="cheat-kw">JOIN</span> t2 <span class="cheat-kw">ON</span> t1.id = t2.fk</div>
        <div class="cheat-item"><span class="cheat-kw">LEFT JOIN</span> … <span class="cheat-kw">WHERE</span> t2.id <span class="cheat-kw">IS NULL</span></div>
        <div class="cheat-item"><span class="cheat-kw">ROUND(AVG(</span>col<span class="cheat-kw">), 2)</span></div>
        <div class="cheat-item"><span class="cheat-kw">CASE WHEN</span> cond <span class="cheat-kw">THEN</span> a <span class="cheat-kw">ELSE</span> b <span class="cheat-kw">END</span></div>
        <div class="cheat-item"><span class="cheat-kw">ROW_NUMBER() OVER(PARTITION BY</span> col <span class="cheat-kw">ORDER BY</span> val<span class="cheat-kw">)</span></div>
        <div class="cheat-item"><span class="cheat-kw">WITH</span> cte <span class="cheat-kw">AS (</span>SELECT …<span class="cheat-kw">)</span> SELECT * FROM cte</div>
      </div>

      <div class="sqlpg-tables-card">
        <div class="mono-label" style="margin-bottom:12px">// quick inserts</div>
        <button class="btn-table-preview" data-table="Employees">preview Employees</button>
        <button class="btn-table-preview" data-table="Customers">preview Customers</button>
        <button class="btn-table-preview" data-table="Orders">preview Orders</button>
        <button class="btn-table-preview" data-table="Products">preview Products</button>
      </div>
    </div>
  </div>

  <!-- Powered by MiniSQL (pure JS) -->
</div>
`;

    addStyles(container);
    const db = new MiniSQL();
    seedData(db);
    bindEvents(container, db);
}

function seedData(db) {
    try {
        db.createTable('Employees', [
            {id:1,name:'Alice Johnson',salary:95000,department:'Engineering',manager_id:null,hire_date:'2019-03-12'},
            {id:2,name:'Bob Smith',salary:82000,department:'Engineering',manager_id:1,hire_date:'2020-06-01'},
            {id:3,name:'Carol White',salary:120000,department:'Engineering',manager_id:1,hire_date:'2018-01-15'},
            {id:4,name:'David Lee',salary:67000,department:'Marketing',manager_id:null,hire_date:'2021-09-20'},
            {id:5,name:'Eve Martinez',salary:74000,department:'Marketing',manager_id:4,hire_date:'2022-02-28'},
            {id:6,name:'Frank Brown',salary:54000,department:'HR',manager_id:null,hire_date:'2023-04-05'},
            {id:7,name:'Grace Kim',salary:88000,department:'Engineering',manager_id:1,hire_date:'2020-11-30'},
            {id:8,name:'Hank Wilson',salary:61000,department:'HR',manager_id:6,hire_date:'2021-07-14'},
            {id:9,name:'Ivy Chen',salary:105000,department:'Data Science',manager_id:null,hire_date:'2019-08-22'},
            {id:10,name:'Jack Davis',salary:93000,department:'Data Science',manager_id:9,hire_date:'2020-03-10'},
            {id:11,name:'Karen Moore',salary:78000,department:'Marketing',manager_id:4,hire_date:'2021-12-01'},
            {id:12,name:'Leo Taylor',salary:115000,department:'Engineering',manager_id:1,hire_date:'2017-05-20'},
        ]);

        db.createTable('Customers', [
            {id:1,name:'TechCorp',email:'tc@tech.com',city:'San Francisco',revenue:240000},
            {id:2,name:'DataHub',email:'info@datahub.io',city:'New York',revenue:180000},
            {id:3,name:'CloudBase',email:'hello@cloud.com',city:'Seattle',revenue:95000},
            {id:4,name:'StartupXYZ',email:'ceo@sxyz.com',city:'Austin',revenue:0},
            {id:5,name:'MegaRetail',email:'buy@mega.com',city:'Chicago',revenue:520000},
            {id:6,name:'FinanceHQ',email:'ops@fin.com',city:'Boston',revenue:310000},
            {id:7,name:'GhostCo',email:'ghost@ghost.com',city:'Denver',revenue:-5000},
        ]);

        db.createTable('Products', [
            {id:1,name:'Laptop Pro',category:'Electronics',price:1299.99,stock:45},
            {id:2,name:'Wireless Mouse',category:'Electronics',price:29.99,stock:200},
            {id:3,name:'Desk Chair',category:'Furniture',price:399.00,stock:30},
            {id:4,name:'Standing Desk',category:'Furniture',price:699.00,stock:15},
            {id:5,name:'SQL Mastery Book',category:'Books',price:49.99,stock:500},
            {id:6,name:'Coffee Mug',category:'Lifestyle',price:12.99,stock:1000},
            {id:7,name:'Noise Cancelling Headphones',category:'Electronics',price:349.99,stock:75},
        ]);

        db.createTable('Orders', [
            {id:1,customer_id:1,product_id:1,product:'Laptop Pro',amount:2599.98,order_date:'2024-01-10'},
            {id:2,customer_id:1,product_id:7,product:'Noise Cancelling Headphones',amount:699.98,order_date:'2024-01-15'},
            {id:3,customer_id:2,product_id:3,product:'Desk Chair',amount:798.00,order_date:'2024-01-20'},
            {id:4,customer_id:3,product_id:5,product:'SQL Mastery Book',amount:149.97,order_date:'2024-02-01'},
            {id:5,customer_id:5,product_id:1,product:'Laptop Pro',amount:12999.90,order_date:'2024-02-05'},
            {id:6,customer_id:5,product_id:4,product:'Standing Desk',amount:6990.00,order_date:'2024-02-10'},
            {id:7,customer_id:6,product_id:2,product:'Wireless Mouse',amount:299.90,order_date:'2024-02-14'},
            {id:8,customer_id:6,product_id:7,product:'Noise Cancelling Headphones',amount:349.99,order_date:'2024-02-20'},
            {id:9,customer_id:1,product_id:6,product:'Coffee Mug',amount:129.90,order_date:'2024-03-01'},
            {id:10,customer_id:2,product_id:1,product:'Laptop Pro',amount:1299.99,order_date:'2024-03-05'},
        ]);
    } catch(e) { console.error('Seed error:', e); }
}

function runQuery(container, db, sql) {
    const resultDiv = container.querySelector('#sql-result');
    const labelEl = container.querySelector('#sql-output-label');
    const countEl = container.querySelector('#sql-row-count');

    const trimmed = sql.trim();
    if (!trimmed) return;

    try {
        const start = performance.now();
        const result = db.query(trimmed);
        const ms = (performance.now() - start).toFixed(1);

        if (Array.isArray(result) && result.length > 0) {
            const cols = Object.keys(result[0]);
            const rowCount = result.length;
            countEl.textContent = `${rowCount} row${rowCount !== 1 ? 's' : ''} · ${ms}ms`;
            labelEl.textContent = '// results';

            resultDiv.innerHTML = `
            <div class="sql-table-wrap">
              <table class="sql-table">
                <thead><tr>${cols.map(c=>`<th>${c}</th>`).join('')}</tr></thead>
                <tbody>${result.map(row=>`<tr>${cols.map(c=>`<td>${row[c] === null || row[c] === undefined ? '<span class="null-val">NULL</span>' : row[c]}</td>`).join('')}</tr>`).join('')}</tbody>
              </table>
            </div>`;
        } else if (Array.isArray(result) && result.length === 0) {
            countEl.textContent = `0 rows · ${ms}ms`;
            resultDiv.innerHTML = `<div class="sql-empty">// query returned 0 rows</div>`;
        } else {
            countEl.textContent = ms + 'ms';
            labelEl.textContent = '// result';
            resultDiv.innerHTML = `<div class="sql-scalar">${JSON.stringify(result)}</div>`;
        }
    } catch(err) {
        countEl.textContent = '';
        labelEl.textContent = '// error';
        resultDiv.innerHTML = `<div class="sql-error">❌ ${err.message}</div>`;
    }
}

function bindEvents(container, db) {
    const editor = container.querySelector('#sql-editor');
    const runBtn = container.querySelector('#sql-run-btn');
    const clearBtn = container.querySelector('#sql-clear-btn');
    const snippetSelect = container.querySelector('#sql-snippet-select');

    runBtn.addEventListener('click', () => runQuery(container, db, editor.value));

    editor.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            runQuery(container, db, editor.value);
        }
        // Tab inserts spaces
        if (e.key === 'Tab') {
            e.preventDefault();
            const start = editor.selectionStart;
            const end = editor.selectionEnd;
            editor.value = editor.value.substring(0,start) + '  ' + editor.value.substring(end);
            editor.selectionStart = editor.selectionEnd = start + 2;
        }
    });

    clearBtn.addEventListener('click', () => {
        editor.value = '';
        editor.focus();
    });

    snippetSelect.addEventListener('change', () => {
        const idx = snippetSelect.value;
        if (idx === '') return;
        editor.value = SAMPLE_QUERIES[parseInt(idx)].sql;
        snippetSelect.value = '';
        editor.focus();
    });

    container.querySelectorAll('.btn-table-preview').forEach(btn => {
        btn.addEventListener('click', () => {
            editor.value = `SELECT * FROM ${btn.dataset.table} LIMIT 20;`;
            runQuery(container, db, editor.value);
        });
    });
}

function addStyles(container) {
    const existing = container.querySelector('#sqlpg-styles');
    if (existing) existing.remove();
    const style = document.createElement('style');
    style.id = 'sqlpg-styles';
    style.textContent = `
    .sqlpg-page { width:100%; max-width:none; padding-top:8px; }
    .sqlpg-header { margin-bottom:28px; }
    .sqlpg-title-row { display:flex; align-items:center; gap:16px; margin-bottom:6px; }
    .sqlpg-title { font-family:var(--font-mono); font-size:28px; font-weight:700; color:#fff; }
    .text-green { color:#00FF41; }
    .sqlpg-badge { display:flex; align-items:center; gap:6px; border:1px solid rgba(0,255,65,0.3);
        color:#00FF41; font-family:var(--font-mono); font-size:10px; padding:3px 10px; border-radius:2px; }
    .pulse-dot { width:6px; height:6px; border-radius:50%; background:#00FF41; animation:pulse 2s infinite; }
    @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
    .sqlpg-subtitle { font-size:13px; color:#6B7280; font-family:'Inter',sans-serif; }

    /* LAYOUT */
    .sqlpg-layout { display:grid; grid-template-columns:1fr 320px; gap:20px; align-items:start; }
    .sqlpg-left { display:flex; flex-direction:column; gap:16px; }
    .sqlpg-right { display:flex; flex-direction:column; gap:16px; position:sticky; top:20px; }

    /* EDITOR CARD */
    .sqlpg-editor-card { background:#0d0d0d; border:1px solid #1a1a1a; border-radius:6px; overflow:hidden; }
    .sqlpg-editor-header { display:flex; align-items:center; justify-content:space-between;
        padding:10px 16px; background:#111; border-bottom:1px solid #1a1a1a; }
    .mono-label { font-family:var(--font-mono); font-size:11px; color:#00FF41; }
    .sqlpg-header-actions { display:flex; align-items:center; gap:8px; }
    .snippet-select { background:#000; border:1px solid #333; color:#9CA3AF;
        font-family:var(--font-mono); font-size:11px; padding:4px 8px; border-radius:3px; outline:none; }
    .snippet-select:focus { border-color:#00FF41; }
    .btn-ghost { background:transparent; border:1px solid #333; color:#6B7280;
        font-family:var(--font-mono); font-size:11px; padding:4px 10px; border-radius:3px; cursor:pointer; }
    .btn-ghost:hover { border-color:#6B7280; color:#fff; }

    .sql-editor { width:100%; min-height:160px; background:#000; border:none; outline:none;
        color:#D1FAE5; font-family:'JetBrains Mono',monospace; font-size:13px; line-height:1.7;
        padding:20px; resize:vertical; box-sizing:border-box; caret-color:#00FF41; }
    .sql-editor::placeholder { color:#374151; }

    .sqlpg-editor-footer { display:flex; align-items:center; justify-content:space-between;
        padding:10px 16px; background:#111; border-top:1px solid #1a1a1a; }
    .sql-hint { font-family:var(--font-mono); font-size:10px; color:#374151; }
    .btn-run { background:#00FF41; color:#000; border:none; font-family:var(--font-mono);
        font-size:12px; font-weight:700; padding:8px 20px; border-radius:3px; cursor:pointer; transition:opacity 0.15s; }
    .btn-run:hover { opacity:0.85; }

    /* OUTPUT */
    .sqlpg-output-card { background:#0d0d0d; border:1px solid #1a1a1a; border-radius:6px; overflow:hidden; min-height:200px; }
    .sqlpg-output-header { display:flex; align-items:center; justify-content:space-between;
        padding:10px 16px; background:#111; border-bottom:1px solid #1a1a1a; }
    .sql-row-count { font-family:var(--font-mono); font-size:10px; color:#00FF41; }
    .sql-result-area { overflow-x:auto; }
    .sql-idle { padding:40px; text-align:center; font-family:var(--font-mono); font-size:12px; color:#374151; }
    .sql-empty { padding:24px; font-family:var(--font-mono); font-size:12px; color:#6B7280; }
    .sql-error { padding:16px 20px; font-family:var(--font-mono); font-size:12px; color:#EF4444;
        background:rgba(239,68,68,0.05); border-left:3px solid #EF4444; }
    .sql-scalar { padding:16px 20px; font-family:var(--font-mono); font-size:13px; color:#00FF41; }
    .null-val { color:#6B7280; font-style:italic; font-size:11px; }

    .sql-table-wrap { overflow-x:auto; }
    .sql-table { width:100%; border-collapse:collapse; font-family:'JetBrains Mono',monospace; font-size:12px; }
    .sql-table thead tr { background:#111; border-bottom:2px solid #00FF41; }
    .sql-table th { padding:10px 16px; text-align:left; color:#00FF41; font-weight:600;
        font-size:11px; text-transform:uppercase; white-space:nowrap; }
    .sql-table tbody tr { border-bottom:1px solid #1a1a1a; transition:background 0.1s; }
    .sql-table tbody tr:hover { background:rgba(0,255,65,0.03); }
    .sql-table td { padding:9px 16px; color:#D1D5DB; white-space:nowrap; }
    .sql-table tbody tr:last-child { border-bottom:none; }

    /* RIGHT PANEL */
    .sqlpg-schema-card, .sqlpg-cheatsheet-card, .sqlpg-tables-card {
        background:#0d0d0d; border:1px solid #1a1a1a; border-radius:6px; padding:16px; }
    .schema-pre { font-family:'JetBrains Mono',monospace; font-size:11px; color:#9CA3AF;
        white-space:pre; line-height:1.6; margin:0; }
    .cheat-item { font-family:'JetBrains Mono',monospace; font-size:11px; color:#9CA3AF;
        padding:4px 0; border-bottom:1px solid #111; line-height:1.5; }
    .cheat-item:last-child { border-bottom:none; }
    .cheat-kw { color:#FACC15; }
    .btn-table-preview { display:block; width:100%; background:transparent; border:1px solid #1a1a1a;
        color:#6B7280; font-family:var(--font-mono); font-size:11px; padding:7px 12px;
        border-radius:3px; cursor:pointer; text-align:left; margin-bottom:6px; transition:all 0.15s; }
    .btn-table-preview:hover { border-color:#00FF41; color:#00FF41; }
    .btn-table-preview:last-child { margin-bottom:0; }

    @media(max-width:1024px) { .sqlpg-layout { grid-template-columns:1fr; } .sqlpg-right { position:static; } }
    `;
    container.appendChild(style);
}

// ═══════════════════════════════════════════════════════════
// Code Editor Component — CodeMirror 6 Wrapper
// ═══════════════════════════════════════════════════════════

import { EditorView, keymap, lineNumbers, highlightActiveLineGutter, highlightSpecialChars, drawSelection, highlightActiveLine } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { defaultKeymap, indentWithTab, history, historyKeymap } from '@codemirror/commands';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import { cpp } from '@codemirror/lang-cpp';
import { oneDark } from '@codemirror/theme-one-dark';
import { bracketMatching, indentOnInput, syntaxHighlighting, defaultHighlightStyle } from '@codemirror/language';
import { closeBrackets } from '@codemirror/autocomplete';
import { runCode, getDefaultCode, getSupportedLanguages } from '../services/codeRunner.js';

const LANG_EXTENSIONS = {
    python: () => python(),
    javascript: () => javascript(),
    java: () => java(),
    cpp: () => cpp()
};

export class CodeEditorComponent {
    constructor(container, { onSubmit }) {
        this.container = container;
        this.onSubmit = onSubmit;
        this.currentLang = 'javascript';
        this.isRunning = false;
        this.editor = null;
        this.render();
    }

    render() {
        this.container.innerHTML = `
      <div class="editor-main-container">
        <!-- Editor Toolbar -->
        <div class="editor-toolbar">
          <div class="toolbar-left">
            <select class="lang-selector" id="lang-selector">
              ${getSupportedLanguages().map(l =>
            `<option value="${l}" ${l === this.currentLang ? 'selected' : ''}>${l.toLowerCase()}</option>`
        ).join('')}
            </select>
          </div>
          <div class="toolbar-right">
            <button class="btn-run" id="run-btn">▶ run</button>
            <button class="btn-submit" id="submit-btn">submit</button>
          </div>
        </div>

        <!-- Editor Area -->
        <div class="editor-area" id="editor-area"></div>

        <!-- Output Panel -->
        <div class="terminal-output" id="output-panel">
          <div class="terminal-header">
            <span class="terminal-label">$ output</span>
          </div>
          <div class="terminal-body" id="output-body">
            <span class="terminal-placeholder">// run your code to see output here</span>
          </div>
        </div>
      </div>
    `;

        this.editorAreaEl = this.container.querySelector('#editor-area');
        this.outputBodyEl = this.container.querySelector('#output-body');
        this.runBtn = this.container.querySelector('#run-btn');
        this.submitBtn = this.container.querySelector('#submit-btn');
        this.langSelector = this.container.querySelector('#lang-selector');

        this.createEditor(this.currentLang);
        addEditorStyles(this.container);

        // Events
        this.langSelector.addEventListener('change', (e) => {
            this.currentLang = e.target.value;
            this.createEditor(this.currentLang, getDefaultCode(this.currentLang));
        });

        this.runBtn.addEventListener('click', () => this.handleRun());
        this.submitBtn.addEventListener('click', () => this.handleSubmit());
    }

    createEditor(lang, initialCode = null) {
        if (this.editor) this.editor.destroy();
        const langExt = LANG_EXTENSIONS[lang] ? LANG_EXTENSIONS[lang]() : javascript();
        const code = initialCode || getDefaultCode(lang);

        const state = EditorState.create({
            doc: code,
            extensions: [
                lineNumbers(),
                highlightActiveLineGutter(),
                highlightSpecialChars(),
                history(),
                drawSelection(),
                indentOnInput(),
                bracketMatching(),
                closeBrackets(),
                highlightActiveLine(),
                keymap.of([...defaultKeymap, ...historyKeymap, indentWithTab]),
                langExt,
                oneDark,
                EditorView.theme({
                    '&': { height: '100%', background: '#0d0d0d' },
                    '.cm-scroller': { overflow: 'auto' },
                    '.cm-gutters': { background: '#0d0d0d', border: 'none', color: '#374151', fontFamily: 'var(--font-mono)' },
                    '.cm-activeLine': { background: 'rgba(255,255,255,0.03)' },
                    '.cm-activeLineGutter': { background: 'rgba(255,255,255,0.03)', color: '#00FF41' },
                    '.cm-content': { color: '#FFFFFF', fontFamily: 'var(--font-mono)', fontSize: '13px' }
                })
            ]
        });

        this.editor = new EditorView({ state, parent: this.editorAreaEl });
    }

    getCode() { return this.editor ? this.editor.state.doc.toString() : ''; }

    async handleRun() {
        if (this.isRunning) return;
        const code = this.getCode();
        if (!code.trim()) return;

        this.isRunning = true;
        this.runBtn.textContent = 'executing...';
        this.outputBodyEl.innerHTML = '<span class="terminal-text">$ running_tests...</span>';

        try {
            const result = await runCode(this.currentLang, code);
            this.outputBodyEl.innerHTML = `
                <pre class="terminal-pre ${result.success ? 'success' : 'error'}">${result.success ? result.output : result.error}</pre>
                ${result.time ? `<div class="terminal-meta">// exec_time: ${result.time}s</div>` : ''}
            `;
        } catch (err) {
            this.outputBodyEl.innerHTML = `<pre class="terminal-pre error">execution_failed: ${err.message}</pre>`;
        }

        this.isRunning = false;
        this.runBtn.textContent = '▶ run';
    }

    handleSubmit() {
        if (this.onSubmit) this.onSubmit(this.getCode(), this.currentLang);
    }
}

function addEditorStyles(container) {
    if (container.querySelector('#editor-styles')) return;
    const style = document.createElement('style');
    style.id = 'editor-styles';
    style.textContent = `
        .editor-main-container { display: flex; flex-direction: column; height: 100%; background: #0d0d0d; }
        
        .editor-toolbar { 
            height: 48px; background: #0d0d0d; border-bottom: 1px solid #1a1a1a; 
            display: flex; align-items: center; justify-content: space-between; padding: 0 16px; flex-shrink: 0;
        }
        
        .lang-selector { 
            background: #000; border: 1px solid #1a1a1a; color: #FFF; 
            font-family: var(--font-mono); font-size: 12px; padding: 6px 12px; border-radius: 4px; outline: none;
        }
        
        .toolbar-right { display: flex; gap: 12px; }
        .btn-run { 
            background: transparent; border: 1px solid #00FF41; color: #00FF41; 
            font-family: var(--font-mono); font-size: 12px; padding: 6px 16px; border-radius: 4px; cursor: pointer; transition: all 0.1s;
        }
        .btn-run:hover { background: #00FF41; color: #000; }
        
        .btn-submit { 
            background: #00FF41; border: none; color: #000; 
            font-family: var(--font-mono); font-size: 12px; font-weight: 700; padding: 6px 20px; border-radius: 4px; cursor: pointer;
        }
        .btn-submit:hover { background: #00CC33; }

        .editor-area { flex: 1; overflow: hidden; }
        
        .terminal-output { height: 250px; background: #000; border-top: 1px solid #1a1a1a; display: flex; flex-direction: column; flex-shrink: 0; }
        .terminal-header { padding: 8px 16px; border-bottom: 1px solid rgba(255,255,255,0.03); }
        .terminal-label { color: #00FF41; font-family: var(--font-mono); font-size: 11px; }
        .terminal-body { flex: 1; padding: 12px 16px; overflow-y: auto; font-family: var(--font-mono); font-size: 14px; color: #6B7280; }
        .terminal-placeholder { color: #374151; }
        .terminal-pre { margin: 0; white-space: pre-wrap; line-height: 1.5; font-size: 14px; }
        .terminal-pre.success { color: #00FF41; }
        .terminal-pre.error { color: #EF4444; }
        .terminal-meta { margin-top: 8px; color: #374151; font-size: 11px; }
    `;
    container.appendChild(style);
}

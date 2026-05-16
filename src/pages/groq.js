// ═══════════════════════════════════════════════════════════
// Groq Playground — Terminal-like interface
// ═══════════════════════════════════════════════════════════

import { callGroq } from '../services/aiService.js';

export function renderGroqPage(container) {
    container.innerHTML = `
    <div class="page-container groq-page">
      <div class="groq-header">
        <h1 class="page-title">// groq_playground</h1>
        <p class="page-subtitle">Direct access to Llama 3.3 70B via Groq API.</p>
      </div>

      <div class="groq-playground-card animate-fade-in-up">
        <div class="playground-config">
          <div class="input-group">
            <label class="config-label">api_key</label>
            <input type="password" id="groq-api-key" placeholder="Enter Groq API Key (or leave blank to use .env)" class="terminal-input" />
          </div>
        </div>

        <div class="playground-terminal">
          <div class="terminal-output" id="groq-output">
            <div class="terminal-line system">// system_ready: waiting for prompt...</div>
          </div>
          
          <div class="terminal-input-area">
            <span class="terminal-prompt">></span>
            <textarea id="groq-prompt" placeholder="Ask anything..." class="terminal-textarea"></textarea>
          </div>
          
          <div class="terminal-actions">
            <button class="btn btn-primary" id="groq-send-btn">
              Execute →
            </button>
            <button class="btn btn-secondary" id="groq-clear-btn">
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

    addGroqStyles(container);

    const apiKeyInput = container.querySelector('#groq-api-key');
    const promptInput = container.querySelector('#groq-prompt');
    const outputArea = container.querySelector('#groq-output');
    const sendBtn = container.querySelector('#groq-send-btn');
    const clearBtn = container.querySelector('#groq-clear-btn');

    // Load API key from localStorage if exists
    const savedKey = localStorage.getItem('groq_api_key');
    if (savedKey) apiKeyInput.value = savedKey;

    async function handleSend() {
        const prompt = promptInput.value.trim();
        const apiKey = apiKeyInput.value.trim();

        if (!prompt) return;

        // Save API key
        if (apiKey) localStorage.setItem('groq_api_key', apiKey);

        // Add user message to output
        addOutputLine(`user: ${prompt}`, 'user');
        promptInput.value = '';
        
        const loadingLine = addOutputLine('groq: thinking...', 'system blink');
        
        try {
            const result = await callGroq(
                "You are a helpful AI assistant. Respond in a clean, professional manner.",
                prompt,
                false,
                apiKey || null
            );
            
            loadingLine.remove();
            addOutputLine(`groq: ${result}`, 'ai');
        } catch (err) {
            loadingLine.remove();
            addOutputLine(`error: ${err.message}`, 'error');
        }
    }

    function addOutputLine(text, type) {
        const line = document.createElement('div');
        line.className = `terminal-line ${type}`;
        
        // Handle multiline text and basic markdown-like formatting (line breaks)
        const formattedText = text.replace(/\n/g, '<br/>');
        line.innerHTML = formattedText;
        
        outputArea.appendChild(line);
        outputArea.scrollTop = outputArea.scrollHeight;
        return line;
    }

    sendBtn.addEventListener('click', handleSend);
    
    promptInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    });

    clearBtn.addEventListener('click', () => {
        outputArea.innerHTML = '<div class="terminal-line system">// system_ready: waiting for prompt...</div>';
    });
}

function addGroqStyles(container) {
    if (container.querySelector('#groq-styles')) return;
    const style = document.createElement('style');
    style.id = 'groq-styles';
    style.textContent = `
    .groq-page { padding-top: 56px; }
    .groq-header { margin-bottom: 32px; }
    .page-title { font-size: 24px; font-weight: 700; color: #FFFFFF; font-family: var(--font-mono); margin-bottom: 8px; }
    .page-subtitle { font-size: 14px; color: #6B7280; }

    .groq-playground-card {
      background: #0d0d0d; border: 1px solid #1a1a1a; border-radius: 6px;
      overflow: hidden; display: flex; flex-direction: column; height: calc(100vh - 250px);
      min-height: 500px;
    }

    .playground-config {
      padding: 16px 24px; border-bottom: 1px solid #1a1a1a; background: #080808;
    }
    .input-group { display: flex; align-items: center; gap: 16px; }
    .config-label { font-family: var(--font-mono); font-size: 11px; color: #6B7280; white-space: nowrap; }
    .terminal-input {
      background: #000; border: 1px solid #1a1a1a; color: #00FF41;
      padding: 6px 12px; font-family: var(--font-mono); font-size: 12px;
      width: 100%; border-radius: 4px; outline: none;
    }
    .terminal-input:focus { border-color: #00FF41; }

    .playground-terminal {
      flex: 1; display: flex; flex-direction: column; padding: 24px; gap: 20px;
      background: #0d0d0d; font-family: var(--font-mono);
    }

    .terminal-output {
      flex: 1; overflow-y: auto; background: #000; border: 1px solid #1a1a1a;
      padding: 20px; border-radius: 4px; display: flex; flex-direction: column; gap: 12px;
    }
    .terminal-line { font-size: 13px; line-height: 1.6; word-break: break-word; }
    .terminal-line.user { color: #FFFFFF; }
    .terminal-line.ai { color: #00FF41; }
    .terminal-line.system { color: #374151; font-style: italic; }
    .terminal-line.error { color: #EF4444; }
    .blink { animation: terminal-blink 1s infinite; }
    @keyframes terminal-blink { 50% { opacity: 0.5; } }

    .terminal-input-area {
      display: flex; gap: 12px; background: #000; border: 1px solid #1a1a1a;
      padding: 12px 16px; border-radius: 4px; align-items: flex-start;
    }
    .terminal-prompt { color: #00FF41; font-weight: 700; margin-top: 2px; }
    .terminal-textarea {
      flex: 1; background: transparent; border: none; color: #FFFFFF;
      font-family: inherit; font-size: 14px; outline: none; resize: none;
      min-height: 24px; height: 24px;
    }

    .terminal-actions { display: flex; gap: 12px; justify-content: flex-end; }
    `;
    container.appendChild(style);
}

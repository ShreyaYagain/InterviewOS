// ═══════════════════════════════════════════════════════════
// Code Runner — Wandbox Integration (with Piston fallback)
// ═══════════════════════════════════════════════════════════
//
// Piston public instances were shut to the public on 2025-02-15.
// Wandbox is the primary backend.  Piston endpoints remain in the
// list so they can be tried first again if access is restored.

const PISTON_ENDPOINTS = [
  'https://emkc.org/api/v2/piston/execute',
  'https://piston.fly.dev/api/v2/piston/execute',
]

const WANDBOX_URL = 'https://wandbox.org/api/compile.json'

const pistonLangMap = {
  python:     { language: 'python',     version: '*', filename: 'main.py'   },
  javascript: { language: 'javascript', version: '*', filename: 'main.js'   },
  cpp:        { language: 'c++',        version: '*', filename: 'main.cpp'  },
  c:          { language: 'c',          version: '*', filename: 'main.c'    },
  java:       { language: 'java',       version: '*', filename: 'Main.java' },
}

// Wandbox compiles Java as "prog.java" — the public class must be named "prog".
const wandboxCompilerMap = {
  python:     'cpython-3.12.7',
  javascript: 'nodejs-20.17.0',
  cpp:        'gcc-13.2.0',
  c:          'gcc-13.2.0-c',
  java:       'openjdk-jdk-21+35',
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Wandbox requires the Java public class to be named "prog"
 * (because it saves the file as prog.java).  Rename any
 * `public class <Anything>` and its references in the code.
 */
function normaliseJavaForWandbox(code) {
  // Find the declared public class name
  const match = code.match(/public\s+class\s+(\w+)/)
  if (!match) return code
  const originalName = match[1]
  if (originalName === 'prog') return code
  // Replace all occurrences of the class name with "prog"
  return code.split(originalName).join('prog')
}

// ─── Piston ──────────────────────────────────────────────────────────────────

async function tryPiston(endpoint, code, language, stdin) {
  const lang = pistonLangMap[language]
  if (!lang) return null

  let response
  try {
    response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        language: lang.language,
        version:  lang.version,
        files:    [{ name: lang.filename, content: code }],
        stdin:    stdin || '',
      }),
      signal: AbortSignal.timeout(8000),
    })
  } catch {
    return null
  }

  if (!response.ok) return null

  const result = await response.json()

  // Piston returns a message field when the API is restricted
  if (result.message) return null

  if (result.run?.signal === 'SIGKILL') {
    return { output: 'Time limit exceeded', status: 'timeout' }
  }

  if (result.compile?.stderr) {
    return { output: result.compile.stderr, status: 'error' }
  }

  if (result.run?.code !== 0 && result.run?.stderr) {
    return { output: result.run.stderr, status: 'error' }
  }

  return {
    output: result.run?.stdout || 'No output',
    status: 'success',
  }
}

// ─── Wandbox ──────────────────────────────────────────────────────────────────

async function tryWandbox(code, language, stdin) {
  const compiler = wandboxCompilerMap[language]
  if (!compiler) return null

  // Wandbox needs the public Java class to be named "prog"
  const processedCode = language === 'java' ? normaliseJavaForWandbox(code) : code

  let response
  try {
    response = await fetch(WANDBOX_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        compiler,
        code:                  processedCode,
        stdin:                 stdin || '',
        'compiler-option-raw': language === 'cpp' ? '-std=c++17' : '',
      }),
      signal: AbortSignal.timeout(15000),
    })
  } catch {
    return null
  }

  if (!response.ok) return null

  const result = await response.json()

  if (result.status !== '0') {
    return {
      output: result.compiler_error || result.program_error || 'Runtime error',
      status: 'error',
    }
  }

  return {
    output: result.program_output || 'No output',
    status: 'success',
  }
}

// ─── Public API ───────────────────────────────────────────────────────────────

export async function runCode(language, code, stdin = '') {
  let result = null

  // Try Piston endpoints first (will gracefully skip if whitelist-only)
  for (const endpoint of PISTON_ENDPOINTS) {
    try {
      result = await tryPiston(endpoint, code, language, stdin)
      if (result) break
    } catch {
      continue
    }
  }

  // Fall back to Wandbox
  if (!result) {
    try {
      result = await tryWandbox(code, language, stdin)
    } catch {
      // Wandbox also failed
    }
  }

  if (!result) {
    result = {
      output: 'All execution servers are currently busy. Please try again in a moment.',
      status: 'error',
    }
  }

  return {
    success: result.status === 'success',
    output:  result.output || 'No output',
    error:   result.status !== 'success' ? result.output : '',
    time:    0,
  }
}

export function getSupportedLanguages() {
  return Object.keys(wandboxCompilerMap)
}

export function getDefaultCode(language) {
  const templates = {
    python: `# Write your solution here\n\ndef solution():\n    pass\n\n# Test\nprint(solution())\n`,
    javascript: `// Write your solution here\n\nfunction solution() {\n  \n}\n\n// Test\nconsole.log(solution());\n`,
    java: `// ATOM — Java\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}\n`,
    cpp: `#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    // Write your solution here\n\n    return 0;\n}\n`,
    c: `#include <stdio.h>\n\nint main() {\n    // Write your solution here\n\n    return 0;\n}\n`,
  }
  return templates[language] || templates.python
}

// ═══════════════════════════════════════════════════════════
// Code Runner — Wandbox Integration
// ═══════════════════════════════════════════════════════════

const WANDBOX_URL = 'https://wandbox.org/api/compile.json';

const compilerMap = {
    python:     'cpython-3.12.7',
    javascript: 'nodejs-20.17.0',
    cpp:        'gcc-13.2.0',
    c:          'gcc-13.2.0-c',
    java:       'openjdk-jdk-21+35'
};

export async function runCode(language, code, stdin = '') {
    const compiler = compilerMap[language];
    
    if (!compiler) {
        return {
            success: false,
            output: '',
            error: `Unsupported language: ${language}`,
            time: 0
        };
    }

    try {
        const response = await fetch(WANDBOX_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                compiler,
                code,
                stdin: stdin || '',
                'compiler-option-raw': language === 'cpp' ? '-std=c++17' : ''
            })
        });

        if (!response.ok) {
            const err = await response.text();
            return {
                success: false,
                output: '',
                error: `API error ${response.status}: ${err}`,
                time: 0
            };
        }

        const result = await response.json();

        if (result.status !== '0') {
            return {
                success: false,
                output: result.compiler_error || result.program_error || 'Runtime error',
                error: result.compiler_error || result.program_error || 'Runtime error',
                time: 0
            };
        }

        return {
            success: true,
            output: result.program_output || 'No output',
            error: '',
            time: 0
        };

    } catch (err) {
        return {
            success: false,
            output: '',
            error: 'Could not reach compiler API.',
            time: 0
        };
    }
}

export function getSupportedLanguages() {
    return Object.keys(compilerMap);
}

export function getDefaultCode(language) {
    const templates = {
        python: `# Write your solution here\n\ndef solution():\n    pass\n\n# Test\nprint(solution())\n`,
        javascript: `// Write your solution here\n\nfunction solution() {\n  \n}\n\n// Test\nconsole.log(solution());\n`,
        java: `// ATOM — Java\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}\n`,
        cpp: `#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    // Write your solution here\n    \n    return 0;\n}\n`,
        c: `#include <stdio.h>\n\nint main() {\n    // Write your solution here\n    \n    return 0;\n}\n`
    };
    return templates[language] || templates.python;
}

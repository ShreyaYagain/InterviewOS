// ═══════════════════════════════════════════════════════════
// Code Runner — Judge0 CE Integration
// ═══════════════════════════════════════════════════════════

// The URL and Headers will be constructed in runCode dynamically using env variables

const LANGUAGE_MAP = {
    python: { id: 92 },
    javascript: { id: 93 },
    java: { id: 91 },
    cpp: { id: 54 }
};

export async function runCode(language, code, stdin = '') {
    const langConfig = LANGUAGE_MAP[language];
    if (!langConfig) {
        return { success: false, output: '', error: `Unsupported language: ${language}`, time: 0 };
    }

    try {
        let finalCode = code;
        
        // Java Hack: Judge0 requires class Main. If user has class Solution, auto-rename it.
        if (language === 'java') {
            if (code.includes('class Solution') && !code.includes('public class Main')) {
                finalCode = code.replace(/class\s+Solution/g, 'public class Main');
            }
            // If they still don't have a main method, they'll get a clear error from Judge0.
            // We could inject one, but it's better to let them learn the structure.
        }

        const host = import.meta.env.VITE_JUDGE0_HOST || 'judge0-ce.p.rapidapi.com';
        const url = `https://${host}/submissions?base64_encoded=false&wait=true`;
        
        const headers = { 'Content-Type': 'application/json' };
        const apiKey = import.meta.env.VITE_JUDGE0_API_KEY;
        if (apiKey) {
            headers['X-RapidAPI-Key'] = apiKey;
            headers['X-RapidAPI-Host'] = host;
        }

        const response = await fetch(url, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                language_id: langConfig.id,
                source_code: finalCode,
                stdin: stdin || '',
            })
        });

        if (!response.ok) {
            throw new Error(`API returned ${response.status}`);
        }

        const data = await response.json();
        const status = data.status.id;

        if (status === 6) { // Compilation Error
            return {
                success: false,
                output: '',
                error: data.compile_output || 'Compilation error',
                time: 0
            };
        }

        if (status >= 7 && status <= 12) { // Runtime Error
            let error = data.stderr || data.message || 'Runtime error';
            
            // Helpful hint for missing main method in Java
            if (language === 'java' && error.includes('Main method not found')) {
                error += "\n\n💡 HINT: Judge0 requires a 'public static void main(String[] args)' method inside your Main class to start execution.";
            }

            return {
                success: false,
                output: data.stdout || '',
                error: error,
                time: data.time || 0
            };
        }

        if (status === 5) { // TLE
            return {
                success: false,
                output: '',
                error: 'Time limit exceeded',
                time: data.time || 0
            };
        }

        return {
            success: status === 3,
            output: data.stdout || '',
            error: data.stderr || '',
            time: data.time || 0
        };
    } catch (err) {
        return { success: false, output: '', error: `Execution error: ${err.message}`, time: 0 };
    }
}

export function getSupportedLanguages() {
    return Object.keys(LANGUAGE_MAP);
}

export function getDefaultCode(language) {
    const templates = {
        python: `# Write your solution here\n\ndef solution():\n    pass\n\n# Test\nprint(solution())\n`,
        javascript: `// Write your solution here\n\nfunction solution() {\n  \n}\n\n// Test\nconsole.log(solution());\n`,
        java: `import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        // Write your solution here\n        Solution sol = new Solution();\n        System.out.println("Hello from Main!");\n    }\n}\n\nclass Solution {\n    // Write your logic here\n}\n`,
        cpp: `#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    // Write your solution here\n    \n    return 0;\n}\n`
    };
    return templates[language] || templates.python;
}

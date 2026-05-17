import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { questions } from '../lib/questions.js';
import { runCode } from '../services/codeRunner.js';
import { getAIReview, callGroq } from '../services/aiService.js';
import { HiPlay, HiPlus, HiMinus, HiCheckCircle, HiXCircle } from 'react-icons/hi';
import '../styles/compiler.css';

const DEFAULT_STARTER_CODE = {
  python: `# ATOM — Python Editor\n# Write your code below\n\ndef solution():\n    return "Hello, World!"\n\nprint(solution())`,
  javascript: `// ATOM — JavaScript Editor\n// Write your code below\n\nfunction solution() {\n    return "Hello, World!";\n}\n\nconsole.log(solution());`,
  cpp: `// ATOM — C++ Editor\n#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}`,
  c: `// ATOM — C Editor\n#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}`,
  java: `// ATOM — Java Editor\nimport java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Solution sol = new Solution();\n        // Write your test cases here\n        System.out.println("ATOM Java Runner Active");\n    }\n}\n\nclass Solution {\n    // Write your solution logic here\n}`
};

const AtomCompiler = () => {
  const [language, setLanguage] = useState('python');
  const [fontSize, setFontSize] = useState(14);
  const [autocomplete, setAutocomplete] = useState(true);
  const [code, setCode] = useState(DEFAULT_STARTER_CODE.python);
  const [stdin, setStdin] = useState('');
  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [runMode, setRunMode] = useState('run');
  const [problem, setProblem] = useState(null);
  const [testResults, setTestResults] = useState({});

  // Load problem once on mount
  useEffect(() => {
    const hash = window.location.hash;
    const queryString = hash.includes('?') ? hash.split('?')[1] : '';
    const params = new URLSearchParams(queryString);
    const problemId = params.get('problem');
    
    if (problemId) {
      const q = questions.find(q => q.id === parseInt(problemId));
      if (q) {
        setProblem(q);
        // Set initial code for the default language (python)
        const initialLang = 'python';
        setLanguage(initialLang);
        setCode(q.starterCode[initialLang] || DEFAULT_STARTER_CODE[initialLang]);
      }
    }
  }, []); // Only run on mount

  const handleRun = async (mode = 'run') => {
    setIsRunning(true);
    setOutput(null);
    setRunMode(mode);
    try {
      if (mode === 'run') {
        const result = await runCode(language, code, stdin);
        setOutput({
          output: result.success ? (result.output || 'Execution complete (no output)') : (result.error || result.output || 'Unknown error'),
          status: result.success ? 'success' : 'error',
          poweredBy: 'Wandbox'
        });
      } else if (mode === 'explain_test_cases') {
        const testCaseStr = problem?.testCases.map((tc, i) => `Test Case ${i+1}: Input=${tc.stdin}, Expected=${tc.expectedOutput}`).join('\n');
        const systemPrompt = "You are an expert tutor. Explain the test cases for this problem clearly.";
        const userPrompt = `Problem: ${problem?.title}\nDescription: ${problem?.description}\n\nTest Cases:\n${testCaseStr}\n\nPlease explain what these test cases are testing and any edge cases to consider.`;
        const result = await callGroq(systemPrompt, userPrompt);
        setOutput({ output: result, status: 'success', poweredBy: 'Llama 3.3 70B' });
      } else if (mode === 'explain') {
        const systemPrompt = "You are Notanki Agent. Provide a serious, high-level walkthrough of this problem. Explain the core intuition, test cases, and how to avoid common pitfalls. Be motivational but blunt.";
        const userPrompt = `Problem: ${problem?.title}\nDescription: ${problem?.description}\n\nPlease explain how to approach this problem efficiently. Give me the breakdown and the motivation I need.`;
        const result = await callGroq(systemPrompt, userPrompt);
        setOutput({ output: result, status: 'success', poweredBy: 'Llama 3.3 70B' });
      } else {
        // Fallback to existing getAIReview logic for 'debug' etc.
        const review = await getAIReview(mode, code, language, problem?.title, problem?.description);
        setOutput(review);
      }
    } catch (err) {
      setOutput({
        output: 'Action failed: ' + err.message,
        status: 'error'
      });
    } finally {
      setIsRunning(false);
    }
  };

  const runAllTests = async () => {
    if (!problem?.testCases?.length) {
      alert("No test cases found for this problem.");
      return;
    }
    
    setIsRunning(true);
    setRunMode('submit');
    const results = {};
    let allPassed = true;

    try {
      for (let i = 0; i < problem.testCases.length; i++) {
        const tc = problem.testCases[i];
        const result = await runCode(language, code, tc.stdin);
        const isPass = result.success && result.output.trim() === tc.expectedOutput.trim();
        results[i] = isPass;
        if (!isPass) allPassed = false;
      }
      setTestResults(results);
      
      setOutput({
        output: allPassed ? "SUCCESS: All test cases passed!" : "CANCELLED: Some test cases failed.",
        status: allPassed ? 'success' : 'error',
        poweredBy: 'Wandbox'
      });
    } catch (err) {
      setOutput({ output: "Test execution failed: " + err.message, status: 'error' });
    } finally {
      setIsRunning(false);
    }
  };

  const runTest = async (test, idx) => {
    setIsRunning(true);
    setRunMode('test');
    try {
      const result = await runCode(language, code, test.stdin);
      const isPass = result.success && result.output.trim() === test.expectedOutput.trim();
      setTestResults(prev => ({ ...prev, [idx]: isPass }));
      
      if (!isPass) {
        setOutput({
          output: `Test Case ${idx + 1} Failed.\nExpected: ${test.expectedOutput}\nActual: ${result.output || result.error}`,
          status: 'error'
        });
      }
    } catch (err) {
      setTestResults(prev => ({ ...prev, [idx]: false }));
    } finally {
      setIsRunning(false);
    }
  };

  const handleLanguageChange = (newLang) => {
    if (newLang === language) return;

    const currentDefault = problem ? problem.starterCode[language] : DEFAULT_STARTER_CODE[language];
    const isCodeDirty = code.trim() !== "" && code.trim() !== currentDefault?.trim();
    
    const switchLang = () => {
      setLanguage(newLang);
      const newStarterCode = problem ? problem.starterCode[newLang] : DEFAULT_STARTER_CODE[newLang];
      setCode(newStarterCode || "");
      setTestResults({}); // Clear test results when switching language
    };

    if (isCodeDirty) {
      if (window.confirm("Switch language? Your current changes will be lost and replaced with the new language template.")) {
        switchLang();
      }
    } else {
      switchLang();
    }
  };

  return (
    <div className="atom-compiler">
      {/* Top Bar */}
      <div className="atom-topbar">
        <div className="topbar-left">
          <span className="brand">&gt; atom_</span>
          <span className="subtitle">// online compiler</span>
        </div>

        <div className="topbar-center">
          <select 
            value={language} 
            onChange={(e) => handleLanguageChange(e.target.value)}
            className="lang-select"
          >
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
            <option value="cpp">C++</option>
            <option value="c">C</option>
            <option value="java">Java</option>
          </select>

          <div className="font-controls">
            <button onClick={() => setFontSize(Math.max(12, fontSize - 1))} title="Decrease Font"><HiMinus /></button>
            <span>{fontSize}px</span>
            <button onClick={() => setFontSize(Math.min(20, fontSize + 1))} title="Increase Font"><HiPlus /></button>
          </div>

          <button 
            className={`toggle-btn ${autocomplete ? 'active' : ''}`}
            onClick={() => setAutocomplete(!autocomplete)}
          >
            [ hints: {autocomplete ? 'on' : 'off'} ]
          </button>
        </div>

        <div className="topbar-right">
          <button className="exit-btn" onClick={() => window.history.back()}>
            ← exit
          </button>
          
          <div className="button-group">
            <button 
              className="run-btn" 
              onClick={() => handleRun('run')} 
              disabled={isRunning}
            >
              {isRunning && runMode === 'run' ? '[ thinking... ]' : <><HiPlay /> [ ▶ run ]</>}
            </button>
            <button 
              className="submit-btn" 
              onClick={runAllTests} 
              disabled={isRunning}
              style={{ background: '#00FF41', color: '#000', fontWeight: 'bold' }}
            >
              {isRunning && runMode === 'submit' ? '[ verifying... ]' : '[ ✓ submit ]'}
            </button>
            <button 
              className="debug-btn" 
              onClick={() => handleRun('debug')} 
              disabled={isRunning}
            >
              {isRunning && runMode === 'debug' ? '[ thinking... ]' : '[ ✦ debug ]'}
            </button>
            <button 
              className="explain-btn" 
              onClick={() => handleRun('explain')} 
              disabled={isRunning}
            >
              {isRunning && runMode === 'explain' ? '[ thinking... ]' : '[ ? explain ]'}
            </button>
          </div>
        </div>
      </div>

      <div className="atom-workspace">
        {/* Upper Section: Problem + Editor */}
        <div className="workspace-upper">
          {problem && (
            <div className="problem-panel">
              <div className="panel-label">// problem_{problem.id}</div>
              <h2 className="problem-title">{problem.title}</h2>
              <div className={`difficulty-badge ${problem.difficulty.toLowerCase()}`}>{problem.difficulty}</div>
              
              <div className="divider"></div>
              
              <div className="panel-label">// description</div>
              <p className="problem-desc">{problem.description}</p>
              
              <div className="panel-label mt-4">// resources</div>
              <div className="external-links">
                {problem.leetcodeUrl && <a href={problem.leetcodeUrl} target="_blank" rel="noreferrer" className="link-item">LeetCode</a>}
                {problem.neetcodeUrl && <a href={problem.neetcodeUrl} target="_blank" rel="noreferrer" className="link-item">NeetCode</a>}
                {problem.youtubeUrl && <a href={problem.youtubeUrl} target="_blank" rel="noreferrer" className="link-item">YouTube Solution</a>}
              </div>

              {problem.optimalCode && (
                <div className="optimal-section mt-4">
                  <button 
                    className="toggle-optimal-btn"
                    onClick={() => document.getElementById('optimal-code-box').classList.toggle('hidden')}
                  >
                    [ brainstorm / show optimal ]
                  </button>
                  <div id="optimal-code-box" className="optimal-code-box hidden">
                    <div className="panel-label">// optimal_{language}</div>
                    <pre className="code-snippet">{problem.optimalCode[language] || "// No optimal code for this language yet."}</pre>
                    <p className="notanki-motivation">// "don't just copy. understand the intuition. why O(N)? why this hashmap? earn your spot." — notanki</p>
                  </div>
                </div>
              )}

              {problem.examples && problem.examples.length > 0 && (
                <>
                  <div className="panel-label mt-4">// examples</div>
                  {problem.examples.map((ex, i) => (
                    <div key={i} className="example-box">
                      <div><strong>Input: </strong>{ex.input}</div>
                      <div><strong>Output: </strong><span className="text-green">{ex.output}</span></div>
                      {ex.explanation && <div className="explanation">Explanation: {ex.explanation}</div>}
                    </div>
                  ))}
                </>
              )}

              {problem.constraints && problem.constraints.length > 0 && (
                <>
                  <div className="panel-label mt-4">// constraints</div>
                  {problem.constraints.map((c, i) => (
                    <div key={i} className="constraint">&gt; {c}</div>
                  ))}
                </>
              )}

              {problem.testCases && problem.testCases.length > 0 && (
                <>
                  <div className="panel-label mt-4">// test cases</div>
                  <button 
                    className="explain-tests-btn"
                    onClick={() => handleRun('explain_test_cases')}
                    disabled={isRunning}
                  >
                    [ ? explain test cases ]
                  </button>
                  {problem.testCases.map((tc, i) => (
                    <div key={i} className="test-case-box">
                      <div className="tc-info">
                        <span>Input: {tc.stdin}</span>
                        <span>Expected: {tc.expectedOutput}</span>
                      </div>
                      <button className="test-run-btn" onClick={() => runTest(tc, i)} disabled={isRunning}>
                        {testResults[i] === true ? <HiCheckCircle className="text-green" /> : 
                         testResults[i] === false ? <HiXCircle className="text-red" /> : '[ run test ]'}
                      </button>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}

          <div className="editor-panel">
            <Editor
              height="100%"
              language={language === 'cpp' ? 'cpp' : (language === 'c' ? 'c' : language)}
              theme="vs-dark"
              value={code}
              onChange={(val) => setCode(val || "")}
              options={{
                fontSize: fontSize,
                fontFamily: 'JetBrains Mono, monospace',
                minimap: { enabled: false },
                suggestOnTriggerCharacters: autocomplete,
                quickSuggestions: autocomplete,
                padding: { top: 20 },
                automaticLayout: true,
                wordWrap: 'on',
                scrollBeyondLastLine: false,
                lineNumbers: "on"
              }}
            />
          </div>
        </div>

        {/* Lower Section: Output + Stdin */}
        <div className="workspace-lower">
          <div className="output-panel">
            <div className="output-header">
              <span className="panel-label">// terminal_output</span>
              {output && output.language && <span className="version-badge">{output.language} {output.version}</span>}
            </div>

            <div className="output-split">
              <div className="output-content">
                {!output && !isRunning && (
                  <div className="idle-state">// write code and press [ ▶ run ]</div>
                )}

                {isRunning && (
                  <div className="executing-state">// executing_</div>
                )}

                {output && (
                  <div className={`output-result ${output.status}`}>
                    <div className="result-header">
                      <span className={`dot ${output.status}`}></span>
                      <span>// {output.status === 'error' ? (output.type || 'error') : output.status}</span>
                    </div>
                    <pre className="output-box">{output.output}</pre>
                    
                    {output.poweredBy && (
                      <p style={{
                        color: '#374151',
                        fontFamily: 'JetBrains Mono',
                        fontSize: '9px',
                        textAlign: 'right',
                        marginTop: '12px'
                      }}>
                        // powered by {output.poweredBy}
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div className="stdin-panel">
                <div className="panel-label">// stdin</div>
                <textarea
                  value={stdin}
                  onChange={(e) => setStdin(e.target.value)}
                  placeholder="// program input..."
                  className="stdin-input"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AtomCompiler;

<!-- badges -->
![Build](https://img.shields.io/badge/build-passing-00FF41?style=flat-square&logo=vite&logoColor=white)
![Version](https://img.shields.io/badge/version-1.0.0-00FF41?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-00FF41?style=flat-square)
![JS](https://img.shields.io/badge/javascript-ES2024-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

# ⚡ InterviewOS

**Agentic Talent Engine for FAANG Mastery**

InterviewOS is an autonomous, AI-driven interview preparation platform that closes the gap between *knowing* and *performing*. It generates hyper-relevant assessments from real Job Descriptions, simulates high-pressure FAANG interview rounds across 4 disciplines, and critiques architectural diagrams — all powered by the **AntiGravity Agent** layer (Llama 3.3 70B via Groq).

> **Who is this for?** CS students, bootcamp graduates, and engineers preparing for FAANG-caliber interviews who want structured, agentic practice — not generic LeetCode grinding.

---

## 📋 Table of Contents

- [Overview](#-interviewos)
- [System Requirements](#-system-requirements)
- [Quickstart](#-quickstart)
- [Configuration](#%EF%B8%8F-configuration)
- [Architecture Overview](#-architecture-overview)
- [Directory Structure](#-directory-structure)
- [Features & API Reference](#-features--api-reference)
- [Known Issues & Limitations](#-known-issues--limitations)
- [Contributing](#-contributing)
- [License](#-license)

---

## 💻 System Requirements

| Requirement  | Version / Detail                                  |
| ------------ | ------------------------------------------------- |
| **OS**       | macOS, Linux, Windows (WSL recommended)           |
| **Node.js**  | v18.0+ (v20 LTS recommended)                     |
| **npm**      | v9.0+                                             |
| **Browser**  | Chrome 120+, Firefox 120+, Edge 120+              |
| **AI API**   | Groq API key (free tier: [console.groq.com](https://console.groq.com)) |

---

## 🚀 Quickstart

```bash
# 1. Clone the repository
git clone https://github.com/Saiankitpanda/interviewos.git
cd interviewos

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env and add your API keys (see Configuration below)

# 4. Start the development server
npm run dev

# 5. Open in browser
# → http://localhost:5173
```

---

## ⚙️ Configuration

All configuration is managed through environment variables in the `.env` file. See `.env.example` for a template.

| Parameter              | Type     | Default                              | Description                                              |
| ---------------------- | -------- | ------------------------------------ | -------------------------------------------------------- |
| `VITE_SUPABASE_URL`    | `string` | —                                    | Your Supabase project URL for auth and persistence       |
| `VITE_SUPABASE_ANON_KEY` | `string` | —                                  | Supabase anonymous/public key                            |
| `VITE_GROQ_API_KEY`    | `string` | —                                    | **Required.** Groq API key for Llama 3.3 70B inference   |
| `VITE_GROK_BASE_URL`   | `string` | `https://api.groq.com/openai/v1`    | Groq API base URL                                        |
| `VITE_GROK_MODEL`      | `string` | `llama-3.3-70b-versatile`           | Model identifier for inference                           |
| `VITE_GITHUB_TOKEN`    | `string` | —                                    | GitHub PAT for FOSS repository search (5000 req/hr)      |
| `VITE_JUDGE0_HOST`     | `string` | `judge0-ce.p.rapidapi.com`          | Judge0 CE host for code execution                        |
| `VITE_JUDGE0_API_KEY`  | `string` | —                                    | RapidAPI key for Judge0 code execution service           |

---

## 🏛️ Architecture Overview

InterviewOS follows a **modular, agent-centric SPA architecture** built on Vite + Vanilla JS. The system is decomposed into four layers:

1. **Presentation Layer** — Hash-based SPA router (`src/router.js`) dispatches to page controllers. Each page is a self-contained module that renders into a sidebar+content shell. Styling uses a strict design token system (CSS custom properties) with a "Matrix Terminal" aesthetic.

2. **Interview Engine Layer** — A finite-state-machine (`InterviewEngine`) orchestrates interview flow. Round-specific handlers (`DSARound`, `LLDRound`, `HLDRound`, `HRRound`) implement stage transitions, NLP-based response scoring (regex pattern matching on candidate answers), and hint management. A `RubricScorer` aggregates scores into a FAANG-style rubric report.

3. **AI Service Layer** — The `AntiGravity Agent` communicates with Groq's OpenAI-compatible API (Llama 3.3 70B). Agent profiles define distinct system prompts for different personas (JD Parser, Code Reviewer, HR Interviewer, Notanki Interviewer). A fallback mechanism ensures the app functions even without API connectivity by using the engine's built-in NLP responses.

4. **Data Layer** — Static question banks (NeetCode 150 for DSA, 10 LLD, 10 HLD, 10 HR questions), rubric definitions, and study plans are embedded as ES modules. A custom in-browser SQL engine (`MiniSQL`) enables SQL practice without any backend dependency.

> 📖 For a deep technical breakdown of every component, see **[ARCHITECTURE.md](ARCHITECTURE.md)**.

---

## 📁 Directory Structure

```
interviewos/
├── index.html                  # Vite entry point with SEO meta tags
├── vite.config.js              # Vite config: React plugin, dev server, API proxy
├── package.json                # Dependencies & scripts
├── .env.example                # Environment variable template
├── .gitignore                  # Git exclusion rules
├── README.md                   # This file
├── ARCHITECTURE.md             # Deep technical architecture document
├── CHANGELOG.md                # Version history
├── PRD.md                      # Product Requirements Document
│
├── src/
│   ├── main.js                 # App bootstrap: imports, route registration, shell
│   ├── router.js               # Hash-based SPA router (Router class)
│   │
│   ├── engine/                 # Core interview orchestration
│   │   ├── interviewEngine.js  # Finite-state-machine: stages, scores, timing
│   │   ├── dsaRound.js         # DSA round: clarify → approach → code → test → optimize
│   │   ├── lldRound.js         # LLD round: requirements → entities → patterns → code
│   │   ├── hldRound.js         # HLD round: requirements → estimation → architecture → API
│   │   ├── hrRound.js          # HR round: STAR format evaluation with follow-ups
│   │   ├── rubricScorer.js     # Score aggregation, strengths/weaknesses, practice plans
│   │   ├── agents.js           # Agent persona definitions (system prompts)
│   │   └── api.js              # Groq API client (callGrokAPI, searchGitHubFOSS)
│   │
│   ├── services/               # External service integrations
│   │   ├── aiService.js        # Groq client with JSON parsing & AI review modes
│   │   ├── codeRunner.js       # Judge0 CE integration (Python, JS, Java, C++)
│   │   ├── compiler.js         # Compiler service placeholder
│   │   ├── auth.js             # Simple admin authentication
│   │   ├── leetcodeService.js  # LeetCode data fetching
│   │   └── questionParser.js   # Question parsing utilities
│   │
│   ├── pages/                  # Page controllers (one per route)
│   │   ├── home.js             # Dashboard with round selection & config
│   │   ├── interview.js        # Full-screen interview UI (chat + editor)
│   │   ├── questions.js        # DSA/SQL question bank browser
│   │   ├── report.js           # Post-interview performance report
│   │   ├── jdParser.js         # JD Analyzer with AI parsing & chat
│   │   ├── hldPractice.js      # HLD MCQ & scenario practice
│   │   ├── studyPlanner.js     # Customizable study schedule
│   │   ├── tracker.js          # Progress tracker
│   │   ├── resources.js        # LLD resource library
│   │   ├── compiler.js         # Multi-language code editor
│   │   ├── groq.js             # Groq API playground
│   │   ├── sqlPlayground.js    # In-browser SQL playground (MiniSQL)
│   │   ├── resume.js           # Resume builder
│   │   └── lld/                # LLD deep-dive pages
│   │       ├── solidPrinciples.js
│   │       ├── creationalPatterns.js
│   │       ├── structuralPatterns.js
│   │       └── behavioralPatterns.js
│   │
│   ├── components/             # Reusable UI components
│   │   ├── sidebar.js          # Navigation sidebar with auth toggle
│   │   ├── chat.js             # Chat interface (interviewer ↔ candidate)
│   │   ├── codeEditor.js       # Monaco/CodeMirror code editor
│   │   ├── timer.js            # Interview countdown timer
│   │   ├── modal.js            # Modal dialog
│   │   └── rubricCard.js       # Rubric score display card
│   │
│   ├── data/                   # Static data modules
│   │   ├── questions.js        # Master question registry (DSA + LLD + HLD + HR)
│   │   ├── neetcode150.js      # NeetCode 150 DSA problem set
│   │   ├── sqlQuestions.js     # SQL practice questions
│   │   ├── rubrics.js          # Scoring rubric definitions per round type
│   │   ├── resources.js        # LLD learning resources
│   │   ├── hldMCQs.js          # HLD multiple-choice questions
│   │   ├── hldScenarios.js     # HLD design scenarios
│   │   └── plans.js            # Study plan templates
│   │
│   ├── lib/                    # Utility libraries
│   │   ├── miniSQL.js          # Custom in-browser SQL engine (zero dependencies)
│   │   ├── questions.js        # Question helper utilities
│   │   ├── resumeStore.js      # Resume state management
│   │   └── resumeConfig.js     # Resume builder configuration
│   │
│   └── styles/                 # CSS modules
│       ├── index.css           # Design tokens, reset, global components
│       ├── layout.css          # App shell, sidebar, content layout
│       ├── chat.css            # Chat component styles
│       ├── editor.css          # Code editor styles
│       ├── report.css          # Report page styles
│       ├── compiler.css        # Compiler page styles
│       └── resume.css          # Resume builder styles
│
├── dist/                       # Production build output
└── scratch/                    # Development test scripts
```

---

## 🎯 Features & API Reference

### 1. FAANG Interview Simulator

Simulates 4 interview round types with an AI interviewer:

| Round       | Stages                                              | Duration | Scoring Dimensions                                    |
| ----------- | --------------------------------------------------- | -------- | ----------------------------------------------------- |
| **DSA**     | Clarify → Approach → Code → Test → Optimize → Wrap  | 45 min   | Understanding, Correctness, Optimality, Code Quality, Testing, Communication |
| **LLD**     | Requirements → Entities → Relationships → Patterns → Code → Wrap | 45 min   | Requirements, Entity Design, SOLID, Patterns, Extensibility, Communication |
| **HLD**     | Requirements → Estimation → Architecture → Data Model → API → Tradeoffs → Wrap | 45 min   | Scale Awareness, Architecture, Data Model, Tradeoffs, Reliability, Communication |
| **HR**      | Question → Follow-up 1 → Follow-up 2 → Follow-up 3 → Wrap | 30 min   | Clarity, Ownership, Impact, Reflection, Collaboration |

### 2. JD Analyzer (AntiGravity Agent)

Paste any Job Description → receive:
- Tech stack detection
- Custom Take-Home assessment with stretch goals
- FOSS repository recommendations
- FAANG evaluation rubric
- Personalized 5-7 day study plan
- YouTube channel recommendations

### 3. Question Banks

- **DSA**: NeetCode 150 (complete set with examples, constraints, solutions)
- **SQL**: Practice queries with in-browser MiniSQL engine
- **LLD**: 10 design problems (Parking Lot, Rate Limiter, Chess, etc.)
- **HLD**: 10 system design problems (URL Shortener, Chat, Search Engine, etc.)
- **HR**: 10 behavioral questions with STAR evaluation

### 4. MiniSQL Engine

A zero-dependency, in-browser SQL engine supporting:
`SELECT`, `FROM`, `JOIN`, `LEFT JOIN`, `WHERE`, `GROUP BY`, `HAVING`, `ORDER BY`, `LIMIT`, `DISTINCT`, `COUNT`, `SUM`, `AVG`, `MIN`, `MAX`, `ROUND`, `IFNULL`, `IS NULL`, `IS NOT NULL`, `LIKE`, `IN`, `AND`, `OR`, `WITH` (CTEs)

### 5. Code Execution (Judge0 CE)

Multi-language support: Python (92), JavaScript (93), Java (91), C++ (54).
Includes auto-renaming of Java `class Solution` → `class Main` for Judge0 compatibility.

### 6. AI-Powered Tools

- **Code Debugger**: AI finds bugs and suggests fixes
- **Code Explainer**: Step-by-step explanation with complexity analysis
- **Code Optimizer**: Time/space optimization suggestions
- **Groq Playground**: Direct chat with Llama 3.3 70B

---

## ⚠️ Known Issues & Limitations

| Issue | Severity | Notes |
| ----- | -------- | ----- |
| Compiler service is a stub | Low | `src/services/compiler.js` returns placeholder. Use Judge0 via `codeRunner.js` instead. |
| `searchGitHubFOSS` returns hardcoded repos | Low | The function in `api.js` returns static data. Live GitHub API integration is planned for Phase 2. |
| No persistent user sessions | Medium | Interview history is stored only in-memory. Supabase integration is scaffolded but not fully wired. |
| `callClaude` is a Groq alias | Info | The `callClaude` export in `aiService.js` is a backward-compat alias that calls Groq, not Anthropic. |
| Resume builder uses React | Info | `src/pages/resumePage.jsx` and `src/components/resume/` use React/JSX within an otherwise Vanilla JS app. Vite handles this via the React plugin. |

---

## 🤝 Contributing

Contributions are welcome. Please follow these conventions:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Follow** the existing code style (monospace-first UI, ES modules, no TypeScript)
4. **Commit** with conventional commits: `feat:`, `fix:`, `docs:`, `refactor:`
5. **Push** and open a **Pull Request**

### Code Style
- ES modules (`import`/`export`)
- Vanilla JS page controllers (no framework for pages)
- CSS custom properties for theming
- File headers with `// ═══...═══` comment blocks

---

## 📄 License

Distributed under the **MIT License**. See [LICENSE](LICENSE) for details.

---

*Built with 💚 by the InterviewOS Team — Powered by the AntiGravity Agent Layer.*

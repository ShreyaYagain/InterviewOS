
# ⚡ InterviewOS

### AI-Powered Interview Preparation Platform for Software Engineers

Prepare for technical interviews with AI-powered mock interviews, coding challenges, system design practice, personalized study plans, and resume analysis — all in one place.


## 🚀 About

InterviewOS is a full-stack interview preparation platform built to help students prepare for software engineering placements.

Instead of switching between multiple websites for coding practice, mock interviews, resume building, SQL practice, and study planning, InterviewOS brings everything together into one AI-powered platform.

The platform generates personalized interview experiences based on job descriptions and provides structured feedback to improve technical and behavioral interview performance.


[![Live Demo](https://img.shields.io/badge/Live-Demo-00FF41?style=for-the-badge)](https://interview-os-sooty.vercel.app)


- 🤖 AI Mock Interviews (DSA, LLD, HLD & HR)
- 📄 AI Job Description Analyzer
- 📚 Personalized Study Planner
- 💻 SQL Playground
- ⚡ Online Code Compiler
- 🧠 AI Code Debugger
- 📈 Performance Reports
- 📝 Resume Builder
- 📂 Learning Resources


## 🛠 Tech Stack

### Frontend
- JavaScript
- HTML
- CSS
- Vite

### AI
- Groq API
- Llama 3.3 70B

### Backend & Services
- Supabase
- Judge0
- GitHub API

### Tools
- Git
- GitHub


## 💡 Why InterviewOS?

Most students prepare for interviews using several disconnected platforms:
• LeetCode for DSA
• YouTube for System Design
• ChatGPT for HR Questions
• Resume builders
• SQL websites
InterviewOS combines these into one intelligent platform that adapts preparation based on the student's goals and target companies.


# Architecture

InterviewOS follows a modular, agent-centric SPA architecture built on Vite + Vanilla JS. The system is decomposed into four layers:

Presentation Layer — Hash-based SPA router (src/router.js) dispatches to page controllers. Each page is a self-contained module that renders into a sidebar+content shell. Styling uses a strict design token system (CSS custom properties) with a "Matrix Terminal" aesthetic.

Interview Engine Layer — A finite-state-machine (InterviewEngine) orchestrates interview flow. Round-specific handlers (DSARound, LLDRound, HLDRound, HRRound) implement stage transitions, NLP-based response scoring (regex pattern matching on candidate answers), and hint management. A RubricScorer aggregates scores into a FAANG-style rubric report.

AI Service Layer — The AntiGravity Agent communicates with Groq's OpenAI-compatible API (Llama 3.3 70B). Agent profiles define distinct system prompts for different personas (JD Parser, Code Reviewer, HR Interviewer, Notanki Interviewer). A fallback mechanism ensures the app functions even without API connectivity by using the engine's built-in NLP responses.

Data Layer — Static question banks (NeetCode 150 for DSA, 10 LLD, 10 HLD, 10 HR questions), rubric definitions, and study plans are embedded as ES modules. A custom in-browser SQL engine (MiniSQL) enables SQL practice without any backend dependency.

📖 For a deep technical breakdown of every component, see ARCHITECTURE.md.

# Project Structure

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


## 🚀 Future Roadmap

- Voice Interview Simulation
- AI Resume Review
- Company-specific Interview Tracks
- Progress Analytics
- Collaborative Mock Interviews
- Authentication & User Profiles

## 🎥 Demo

Watch InterviewOS in action.

https://youtu.be/hYt58Co-hJM


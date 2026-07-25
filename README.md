
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

📦 interviewos
├── 📂 src
│   ├── 🧩 components
│   ├── 📄 pages

│   ├── ⚙️ engine

│   ├── 🔌 services

│   ├── 📚 data

│   ├── 🛠 lib

│   ├── 🎨 styles

│   ├── router.js
│   └── main.js
│
├── 📄 README.md
├── 📄 ARCHITECTURE.md
├── 📄 PRD.md
├── 📦 package.json
├── ⚡ vite.config.js
└── 🔑 .env.example


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


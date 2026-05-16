# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-05-17

### Added
- **Interview Engine**: Finite-state-machine with 4 round types (DSA, LLD, HLD, HR)
- **DSA Round**: NeetCode 150 integration with clarify → approach → code → test → optimize flow
- **LLD Round**: SOLID principles, design patterns, entity design evaluation
- **HLD Round**: Capacity estimation, architecture design, CAP theorem discussion
- **HR Round**: STAR format behavioral interviews with follow-up drilling
- **JD Analyzer**: AntiGravity Agent parses Job Descriptions into structured assessments
- **MiniSQL Engine**: Zero-dependency in-browser SQL engine supporting SELECT, JOIN, GROUP BY, HAVING, ORDER BY, LIMIT, CTE
- **Code Execution**: Judge0 CE integration for Python, JavaScript, Java, C++
- **AI Integration**: Groq API (Llama 3.3 70B) for intelligent interviewer responses
- **Agent Profiles**: 4 distinct AI personas (JD Parser, Code Reviewer, HR Interviewer, Notanki)
- **Rubric Scoring**: FAANG-style 1-5 scale with per-dimension breakdown
- **Report Generator**: Post-interview performance dashboard with strengths, mistakes, and practice plans
- **Study Planner**: Day-by-day study schedules tailored to interview round type
- **HLD Practice**: MCQ and scenario-based system design practice
- **SQL Playground**: Interactive SQL query execution with pre-loaded sample data
- **Groq Playground**: Direct chat interface with Llama 3.3 70B
- **Resume Builder**: React-based PDF resume generator
- **Code Editor**: Monaco/CodeMirror integration with AI-powered debug, explain, and optimize modes
- **Design System**: Matrix Terminal aesthetic with CSS custom properties
- **SPA Router**: Zero-dependency hash-based routing with before hooks
- **Documentation**: README.md, ARCHITECTURE.md, PRD.md, CHANGELOG.md

### Technical
- Vite 5.4 build system with React plugin for JSX support
- CSS design token system with 30+ custom properties
- Responsive layout with sidebar navigation
- Admin authentication toggle
- SEO meta tags and Google Fonts integration (Inter + JetBrains Mono)

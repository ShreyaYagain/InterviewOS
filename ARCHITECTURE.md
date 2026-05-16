# 🏛️ InterviewOS Architecture

This document provides a technical overview of the InterviewOS Agentic Talent Engine.

## 🧱 Component Overview

### 1. **Core Engine (`src/engine/`)**
The heart of the application. It manages the interview state, agent interactions, and scoring.
- `interviewEngine.js`: Orchestrates the flow between different interview rounds.
- `agents.js`: Handles communication with the AI providers (Grok/Groq).
- `rubricScorer.js`: Uses AI to score candidate responses against a structured FAANG rubric.

### 2. **UI Components (`src/components/`)**
Modular UI elements designed with a "Cyberpunk" aesthetic.
- `codeEditor.js`: Integration with Monaco Editor and CodeMirror.
- `chat.js`: The interactive interface for behavioral and system design rounds.
- `sidebar.js`: Global navigation system.

### 3. **Pages (`src/pages/`)**
Main view controllers for different application states.
- `home.js`: Landing page and interview configuration.
- `jdParser.js`: The interface for uploading and analyzing Job Descriptions.
- `sqlPlayground.js`: In-browser SQL execution environment.

### 4. **Libraries (`src/lib/`)**
Utility libraries and custom engines.
- `miniSQL.js`: A custom, dependency-free SQL engine for practicing queries without a backend.
- `resumeStore.js`: State management for the resume builder.

## 🔄 Data Flow

1. **Input:** User uploads a JD or selects a practice round.
2. **Agent Processing:** The `AntiGravity Agent` (via `aiService.js`) processes the input, generating questions or assessments.
3. **Interaction:** The user interacts through the code editor or chat interface.
4. **Evaluation:** Upon submission, the `rubricScorer.js` evaluates the work.
5. **Report:** A final `renderReportPage` displays the performance breakdown.

## 🎨 Design System
- **Theme:** Dark mode by default.
- **Colors:** Matrix Green (`#00FF41`), Deep Black (`#0d0d0d`), Indigo, Emerald.
- **Typography:** Monospace fonts for a technical, developer-centric feel.

## 🔒 Security
- Environment variables are managed via Vite's `.env` system.
- Supabase is used for secure authentication and data persistence.
- GitHub tokens are required for real-time FOSS repository searching.

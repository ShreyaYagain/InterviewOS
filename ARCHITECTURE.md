# 🏛️ InterviewOS Architecture

This document provides a technical overview of the InterviewOS Agentic Talent Engine.

## 🧱 Component Overview

### 1. **Core Engine (`src/engine/`)**
The heart of the application. It manages the interview state, agent interactions, and scoring.
- `interviewEngine.js`: Orchestrates the flow between different interview rounds.
- `agents.js`: Handles communication with the AI providers (Grok/Groq).
- `rubricScorer.js`: Uses AI to score candidate responses against a structured FAANG rubric.
- `dsaRound.js`: Specific logic for the Coding/Algorithms round, including test case validation.

### 2. **UI Components (`src/components/`)**
Modular UI elements designed with a "Cyberpunk" aesthetic.
- `codeEditor.js`: Integration with Monaco Editor and CodeMirror for a high-performance IDE feel.
- `chat.js`: The interactive interface for behavioral and system design rounds, supporting streaming responses.
- `sidebar.js`: Global navigation system with state-aware active links.
- `timer.js`: High-precision interview timer with "strict mode" integration.

### 3. **Pages (`src/pages/`)**
Main view controllers for different application states.
- `home.js`: Landing page and interview configuration.
- `jdParser.js`: The interface for uploading and analyzing Job Descriptions.
- `sqlPlayground.js`: In-browser SQL execution environment.
- `report.js`: Dynamic report generator that visualizes AI-driven performance metrics.

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
- **Theme:** Dark mode by default using the "Matrix Green" palette.
- **Colors:** 
  - `Primary`: `#00FF41` (Matrix Green)
  - `Background`: `#0d0d0d` (Deep Black)
  - `Accents`: Indigo, Emerald, Rose (for status signals)
- **Typography:** Monospace fonts (JetBrains Mono/Inter) for a technical, developer-centric feel.

## 🔒 Security & Performance
- **Environment Management**: Vite's `.env` system ensures secrets stay out of the bundle.
- **Lazy Loading**: Components are modularized to keep the initial payload light.
- **Offline Capability**: The MiniSQL engine and core logic are designed to function with minimal network dependency.

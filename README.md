# ⚡ InterviewOS

### **Agentic Talent Engine for FAANG Mastery**

InterviewOS is an autonomous interview preparation platform that closes the gap between "knowing" and "performing". Unlike static coding platforms, InterviewOS uses an agentic layer to generate hyper-relevant assessments from real Job Descriptions, critique architectural diagrams, and simulate high-pressure FAANG interview rounds.

---

## 🚀 Key Features

### 🕵️‍♂️ **JD Analyzer (Agentic Assessment)**
Upload any Job Description (PDF, Text, or URL). The **AntiGravity Agent** (powered by Grok xAI) parses the JD in seconds and returns:
- A custom FAANG-caliber Take-Home assessment.
- Domain-relevant FOSS GitHub repositories to study.
- A precise FAANG rubric for self-evaluation.

### 🏗️ **Excalidraw Architecture Critique**
Upload your `.excalidraw` design files. The system renders the diagram and provides a **Principal Engineer-level critique**:
- Identifies single points of failure.
- Suggests missing infrastructure layers (CDN, Cache, Load Balancers).
- Recommends database replication and rate-limiting strategies.

### 🎭 **FAANG Interview Simulator**
Practice 5 distinct rounds with an AI interviewer that pushes back and asks follow-ups:
1. **Coding (DSA):** NeetCode 150 integration with time/space complexity enforcement.
2. **LLD (Low-Level Design):** SOLID principles and class hierarchy evaluation.
3. **HLD (High-Level Design):** Scalability, CAP theorem, and system architecture.
4. **Behavioral:** STAR framework coaching.
5. **Bar Raiser:** Cultural fit and high-level critical thinking.

### 💻 **MiniSQL & AI Compiler**
A dependency-free, in-browser SQL engine and a multi-language coding environment (JS, Python, Java, C++) with real-time AI debugging.

---

## 🏛️ Technical Architecture

InterviewOS is built with a modular, agent-centric architecture designed for scalability and low latency.

### 🧱 Component Breakdown
- **Core Engine (`src/engine/`)**: Orchestrates interview state and agent interactions.
- **AI Service (`src/services/aiService.js`)**: Interfaces with Grok xAI and Llama 3.3 for high-fidelity reasoning.
- **UI System**: Vanilla JS components with Matrix-inspired CSS for a high-performance, distraction-free experience.
- **Persistence**: Supabase integration for session tracking, diagram storage, and candidate reports.

For a deeper dive, see the [Architecture Documentation](ARCHITECTURE.md).

---

## 📋 Project Roadmap & Requirements
This project was built following the strict requirements outlined in our **[Product Requirements Document](PRD.md)**. 

### Current Milestone: Phase 1 (MVP)
- [x] JD Upload & Analysis
- [x] FOSS Repository Discovery
- [x] Excalidraw Diagram Critique
- [x] Core FAANG Simulator (DSA Round)

---

## 🚦 Getting Started

### 1. Prerequisites
- Node.js (v18+)
- npm or yarn

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/your-username/interviewos.git

# Navigate to the project
cd interviewos

# Install dependencies
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory and add your keys (see `.env.example`):
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
VITE_GROK_API_KEY=your_groq_key
VITE_GITHUB_TOKEN=your_github_token
```

### 4. Run Locally
```bash
npm run dev
```

---

## 🛡️ License
Distributed under the MIT License. See `LICENSE` for more information.

---

## 🤝 Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

*Built with 💚 by the InterviewOS Team.*

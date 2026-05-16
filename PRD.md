# PRD: InterviewOS + AntiGravity Integration
# Product Requirements Document | Version 1.0
# Owner: Ankit | Stack: OpenClaw + Grok + Supabase + Excalidraw + agentskills.io

---

## Executive Summary

InterviewOS is an **Agentic Talent Engine** — not a static interview tool. It closes the gap between "knowing" and "performing" by autonomously generating FAANG-caliber take-home assessments from real Job Descriptions, integrating FOSS GitHub repositories, critiquing student architecture diagrams (via Excalidraw), and running a full 5-round FAANG interview simulation.

Powered by the **AntiGravity agent layer** (OpenClaw + Grok API), it operates autonomously with zero human curation needed per assessment.

---

## Problem Statement

| Pain Point | Current State | InterviewOS Solution |
|---|---|---|
| Generic coding tests | HackerRank gives same LeetCode to everyone | JD-matched custom take-homes |
| No system design practice | Students guess what to study | Excalidraw upload → FAANG principal critique |
| No FOSS connection | Students learn theory, not real codebases | Live GitHub FOSS repo search |
| Expensive interview prep | $200/hr mock interviews | Autonomous FAANG agent, free |
| No recruiter visibility | Black box for companies | Recruiter dashboard with rubric scores |

---

## Goals & Success Metrics

| Goal | Metric | Target (90 days) |
|---|---|---|
| Reduce prep time | Hours spent per student | -40% |
| Assessment relevance | Student satisfaction score | >4.2 / 5 |
| FOSS discovery | Unique FOSS repos surfaced | >200 |
| Agent autonomy | % assessments needing human review | <5% |
| Excalidraw adoption | % students uploading diagrams | >30% |

---

## User Personas

### 1. Ankit (Student — Primary)
- Final year CS / bootcamp grad
- Applying to FAANG + startups simultaneously
- Wants hyper-relevant practice, not generic prep
- Comfortable with GitHub, uploads Excalidraw diagrams

### 2. Priya (Recruiter — Secondary)
- Screening 50+ candidates/week
- Wants pre-assessed candidates with structured rubrics
- Doesn't code herself — needs clear scoring

### 3. OpenClaw (Agent — Tertiary)
- The autonomous actor
- Triggered by student JD upload
- Operates without human intervention

---

## Core Features

### Feature 1: JD Upload + Assessment Generation
**Priority:** P0 (Must Have)

- Student uploads PDF, pastes text, or submits URL of a JD
- AntiGravity agent parses JD in <10 seconds
- Extracts tech stack, domain, seniority signals
- Returns 3 FOSS GitHub repo-based assessments
- Generates custom Take-Home README (markdown)
- Includes test case matrix (unit, integration, edge)
- Deadline suggestion (48h / 72h based on complexity)

**Acceptance Criteria:**
- [ ] JD text → structured JSON in <15s
- [ ] At least 2 of 3 FOSS repos are domain-relevant (human validated)
- [ ] Test cases cover all 3 dimensions (unit / integration / edge)
- [ ] Works for JDs from: Google, Razorpay, Zepto, Stripe, Notion

---

### Feature 2: Excalidraw Upload + Architecture Critique
**Priority:** P0 (Must Have)

- Student uploads `.excalidraw` file from their system design session
- System renders the diagram inside InterviewOS UI
- AntiGravity agent reads the diagram's elements (shapes, arrows, labels)
- Critiques it like a FAANG Principal Engineer:
  - Single points of failure?
  - Missing load balancer / CDN / cache layer?
  - DB not replicated?
  - No rate limiter shown?
- Searches GitHub for FOSS projects matching drawn architecture

**Acceptance Criteria:**
- [ ] `.excalidraw` file renders in UI within 2s
- [ ] Critique is specific to drawn elements, not generic
- [ ] At least 3 actionable critique points per diagram
- [ ] GitHub search returns relevant FOSS repo for drawn system

---

### Feature 3: FAANG Interview Simulator (5 Rounds)
**Priority:** P1 (Should Have)**

Full FAANG pipeline simulation:

| Round | Type | Agent Behavior |
|---|---|---|
| Round 1 | Coding (DSA) | 1 medium + 1 hard problem, time/space complexity enforced |
| Round 2 | LLD | Design a class hierarchy, SOLID principles expected |
| Round 3 | HLD | Full system design, CAP theorem + DB justification |
| Round 4 | Behavioral | STAR format, ownership, conflict resolution |
| Round 5 | Bar Raiser | Culture + "What would you change?" |

Grok agent plays the FAANG interviewer. Asks follow-ups. Pushes back. Does not accept vague answers.

**Acceptance Criteria:**
- [ ] Student can select which round to practice
- [ ] Agent asks 3+ follow-up questions per answer
- [ ] Session ends with rubric score (1-4 FAANG scale)
- [ ] Session transcript saved to Supabase

---

### Feature 4: FOSS GitHub Integration
**Priority:** P0 (Must Have)

- Live GitHub API search based on extracted tech stack
- Pre-indexed Supabase vector store with 500+ curated FOSS repo metadata
- Repos from: `system-design-primer`, `build-your-own-x`, `coding-interview-university`, `awesome-take-homes`, `public-apis`, `realworld`
- Student can star / save repos to their profile
- Repos refresh every 24h via cron job

---

### Feature 5: Recruiter Dashboard
**Priority:** P2 (Nice to Have, Phase 2)

- View all candidates who took assessments
- See FAANG rubric scores per round
- Download student's Excalidraw diagrams
- Filter by tech stack, difficulty, domain
- One-click "Send to next round"

---

## Technical Constraints

- **Grok API Key:** Required via xAI console (free tier available)
- **Supabase:** Free tier sufficient for MVP (500MB DB, 1GB storage)
- **GitHub API:** 5000 req/hr authenticated — sufficient for 100 daily users
- **Excalidraw:** FOSS, no license cost, self-hosted renderer
- **OpenClaw:** Self-hosted on Dell 16GB

---

## Out of Scope (Phase 1)

- Video interview recording
- Real recruiter integrations (ATS like Greenhouse, Lever)
- Mobile native app
- Resume parsing / ATS optimization
- Paid tier / subscriptions

---

## Roadmap

| Phase | Timeline | Features |
|---|---|---|
| Phase 1 (MVP) | Weeks 1-4 | JD upload, FOSS search, Excalidraw, Take-home gen |
| Phase 2 | Weeks 5-8 | FAANG simulator (all 5 rounds), test case gen |
| Phase 3 | Weeks 9-12 | Recruiter dashboard, agentskills.io full integration |
| Phase 4 | Weeks 13+ | Multi-language support, mobile, paid tiers |

---

## What Puts This Best-in-Market

1. **AntiGravity Autonomy** — No human curation. Agent runs itself.
2. **Excalidraw-native** — Only platform that critiques student architecture diagrams.
3. **FOSS-first** — Every assessment is grounded in a real open-source codebase.
4. **FAANG rubric at every step** — Not vibes. Actual 1-4 scoring per dimension.
5. **agentskills.io patterns** — Built on proven agentic skill architecture.
6. **Grok reasoning** — Handles nuanced JD parsing better than GPT-3.5-class models.
7. **Test case matrix** — Students know exactly what to test, not just what to build.
8. **Open Source** — Students trust it. Recruiters can audit it.

---

## Risk Register

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Grok API rate limits | Medium | High | Cache JD parse results, batch requests |
| GitHub API limits hit | Low | Medium | 24h FOSS cache in Supabase |
| Excalidraw parse errors | Medium | Low | Fallback to raw JSON viewer |
| Agent hallucinates repo | Medium | High | Validate repo URL exists before returning |
| Student uploads invalid JD | High | Low | Minimum length validation + retry prompt |

---

*PRD authored by: Claude (Anthropic) | Requested by: Ankit | Source: agentskills.io patterns*

# NTUlearn

> An AI-powered adaptive learning platform that understands who you are as a learner, breaks content into digestible pieces, and evolves with you.

**DLWeek 2026 | Microsoft Track**

**Live Demo:** [ntulearn-cd226.web.app](https://ntulearn-cd226.web.app)
**Repository:** [github.com/narhenn/Project-X](https://github.com/narhenn/Project-X)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Setup & Installation](#setup--installation)
- [Running the Project](#running-the-project)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Demo Walkthrough](#demo-walkthrough)
- [Team](#team)
- [Citations](#citations)

---

## Overview

NTUlearn addresses a critical gap in modern education: despite the abundance of learning data, most students lack clear, actionable insight into their learning journey. Our platform models each student's evolving learning state through a **Learner DNA Profile**, delivers content through an adaptive **Micro-Learning Engine**, and provides personalized AI-powered guidance via **Gemini** and **OpenAI**.

### Problem We Solve

- Students don't know **why** they keep getting things wrong
- Learning platforms treat all students the same
- No system detects **burnout** before it's too late
- Students study in isolation without intelligent peer matching

### Our Solution

A 6-pillar adaptive learning system:

1. **Smart Identity** — University SSO + role-based access
2. **Learner DNA Profile** — Personality quiz → AI persona object
3. **Micro-Learning Engine** — Segmented videos + quiz gates + AI flashcards
4. **Progress Tracking** — Mastery dashboard + streaks + inactivity recovery
5. **Wellbeing** — AI burnout detector with mental health resources
6. **Community** — Study groups + anonymous peer comparison

### AI & Algorithmic Features

- **Multi-Agent Orchestrator** — 5 specialized AI agents (Diagnosis, Pattern Detection, Prediction, Planner, Tutor) working in a sequential pipeline with maker-checker pattern
- **Adaptive Quiz Engine** — AI-generated questions that adapt to student performance
- **Score Prediction** — Linear Regression model predicting next quiz scores with confidence intervals
- **Weakness Analysis** — Statistical variance analysis distinguishing careless errors from genuine weaknesses
- **Ebbinghaus Forgetting Curve** — Spaced repetition scheduling based on retention decay models
- **Cognitive Load Monitoring** — Tracks topic density per week to prevent overload
- **Optimal Study Time Detection** — Analyzes session performance by time-of-day
- **SM-2 Algorithm** — SuperMemo 2 spaced repetition for flashcard scheduling

---

## Features

### Authentication & Roles
- Simulated NTU SSO (university-gated login)
- Firebase Authentication with token-based API protection
- Role-based access: Student / Professor / Admin

### Learner DNA Quiz
- 10-question personality + cognitive assessment
- Generates a `UserPersona` object the AI references for all recommendations
- Classifies learning style: visual, auditory, kinesthetic, reading-writing
- Detects preferred question format (MCQ / short answer / coding)

### Micro-Learning Engine
- Lectures broken into short video segments with slide extraction
- Quiz after each segment — must pass to unlock next (LAMS-style gating)
- **AI Flashcards**: On quiz failure, AI generates 6 personalized flashcards with hints
- **"I'm Lost" Button**: One-click simplified summary of any video moment
- **AI Tutor Chat**: Multi-turn conversation with image upload support
- **Practice Paper Generator**: End-of-module AI-generated exam in preferred format

### Progress Dashboard
- Per-topic mastery: Good / Average / Weak with trend indicators
- Study streak tracking (Duolingo-style)
- Inactivity welcome-back with memory refresh
- Anonymous peer comparison ("You're in the top X%")
- Score prediction with confidence intervals

### Learning Insights
- Comprehensive analytics engine with 15+ computed features
- Forgetting curve estimation with review urgency
- Cognitive load tracking per week
- Optimal study time analysis
- Weekly evolution report with AI narrative
- Explainable insights with evidence and confidence scores

### Wellbeing
- AI burnout detector (monitors study patterns, late nights, declining scores)
- Risk scoring with signal breakdown
- Personalized schedule suggestions
- Mental health resources directory

### Community
- Form/join study groups with time + location
- Anonymous class-wide knowledge gap visibility

---

## Architecture

```
┌──────────────────────────────────────────────────────────┐
│                  FRONTEND (Next.js 15)                    │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌─────────────┐│
│  │  Login   │ │  Quiz    │ │  Course  │ │  Dashboard  ││
│  │  Page    │ │  Page    │ │  Player  │ │  + Insights ││
│  └──────────┘ └──────────┘ └──────────┘ └─────────────┘│
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌─────────────┐│
│  │Community │ │  Grades  │ │ Practice │ │  AI Assist  ││
│  │  Page    │ │  Page    │ │  Paper   │ │   Page      ││
│  └──────────┘ └──────────┘ └──────────┘ └─────────────┘│
└───────────────────────┬──────────────────────────────────┘
                        │ API Routes (21 endpoints)
┌───────────────────────┼──────────────────────────────────┐
│               BACKEND (Next.js API Routes)                │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌─────────────┐│
│  │flashcards│ │ burnout  │ │ predict  │ │   insights  ││
│  │ chat     │ │study-plan│ │ practice │ │  weakness   ││
│  │quiz-expln│ │  tutor   │ │ adaptive │ │  orchestrtr ││
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └──────┬──────┘│
└───────┼────────────┼────────────┼───────────────┼────────┘
        │            │            │               │
   ┌────┴────┐  ┌────┴────┐  ┌───┴────┐   ┌──────┴──────┐
   │ OpenAI  │  │ Gemini  │  │ Custom │   │  Rule-based │
   │ GPT-4o  │  │  2.0    │  │ Linear │   │  Algorithms │
   │  mini   │  │  Flash  │  │ Regres.│   │  (SM-2, etc)│
   └─────────┘  └─────────┘  └────────┘   └─────────────┘
                        │
   ┌────────────────────┴──────────────────────────┐
   │          FIREBASE (Auth + Firestore)           │
   │  Users · Personas · QuizResults · Sessions     │
   │  StudyGroups · Posts · Grades · Modules        │
   └────────────────────────────────────────────────┘
```

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | Next.js 15 + React 18 | App Router with server-side rendering |
| Styling | Tailwind CSS 3.4 | Utility-first responsive styling |
| Animation | Framer Motion 11 | Smooth page transitions |
| Charts | Recharts 2 | Dashboard visualizations |
| Auth | Firebase Auth | Email/password authentication |
| Database | Cloud Firestore | Real-time NoSQL document store |
| AI (Primary) | OpenAI GPT-4o-mini | Flashcards, quiz explanations, practice papers, chat |
| AI (Secondary) | Gemini 2.0 Flash | Insights analysis, burnout recommendations, study plans |
| Algorithms | Custom (Pure JS) | Linear Regression, SM-2, Ebbinghaus, variance analysis |
| RAG | pdf-parse + embeddings | Document retrieval for context-aware tutoring |
| Deployment | Firebase Hosting | Production deployment |
| Testing | Vitest | Unit and integration tests |
| Language | TypeScript 5.5 | Type-safe full-stack development |
| Runtime | Node.js 20 | Server runtime |

---

## Setup & Installation

### Prerequisites
- **Node.js 20** (check with `node -v`)
- **npm 9+** (check with `npm -v`)
- A Firebase project
- An OpenAI API key
- A Google Gemini API key

### Step 1: Clone & Install

```bash
git clone https://github.com/narhenn/Project-X.git
cd Project-X
npm install
```

### Step 2: Configure Environment

```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials (see steps below).

### Step 3: Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project (or use existing)
3. **Enable Authentication**: Authentication → Sign-in method → Email/Password → Enable
4. **Enable Firestore**: Firestore Database → Create database → Start in test mode
5. **Get client config**: Project Settings → General → Your apps → Web app → Copy config values
6. **Get Admin SDK key**: Project Settings → Service Accounts → Generate new private key
7. Copy values to `.env.local`:
   ```
   # Client-side (from web app config)
   NEXT_PUBLIC_FIREBASE_API_KEY=...
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
   NEXT_PUBLIC_FIREBASE_APP_ID=...

   # Server-side (from service account JSON)
   FIREBASE_PROJECT_ID=...
   FIREBASE_CLIENT_EMAIL=...
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
   ```

### Step 4: OpenAI Setup

1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create a new API key
3. Add to `.env.local`:
   ```
   OPENAI_API_KEY=sk-...
   ```

### Step 5: Gemini API Setup

1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Click "Get API key" → "Create API key"
3. Add to `.env.local`:
   ```
   GEMINI_API_KEY=...
   ```

---

## Running the Project

```bash
# Development server (port 3002)
npm run dev

# Production build
npm run build
npm start
```

Open [http://localhost:3002](http://localhost:3002)

---

## Testing

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch
```

The test suite includes 30 tests covering:
- **Auth tests** — Firebase token verification, demo mode fallback, missing credentials
- **Validation tests** — Request body validation (types, required fields, edge cases)
- **Route tests** — 401 responses without auth, 400 responses with missing fields

See `testbench/TESTBENCH.md` for manual testing instructions for judges.

---

## Project Structure

```
Project-X/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout with sidebar
│   ├── page.tsx                  # Landing page
│   ├── login/page.tsx            # Login page (SSO simulation)
│   ├── quiz/page.tsx             # Learner DNA quiz
│   ├── course/page.tsx           # Course module view
│   ├── watch/page.tsx            # Video player + quiz gates
│   ├── dashboard/page.tsx        # Progress dashboard
│   ├── insights/page.tsx         # Learning analytics
│   ├── grades/page.tsx           # Grade overview
│   ├── practice-paper/page.tsx   # Practice paper generator
│   ├── community/page.tsx        # Study groups + posts
│   ├── assist/page.tsx           # AI assistant page
│   ├── activity/page.tsx         # Activity log
│   ├── calendar/page.tsx         # Calendar view
│   ├── messages/page.tsx         # Messages
│   ├── resources/page.tsx        # Resources
│   ├── institution/page.tsx      # Institution info
│   └── api/                      # 21 API routes
│       ├── adaptive-quiz/        # AI-adaptive quiz generation
│       ├── agent-orchestrator/   # Multi-agent pipeline
│       ├── burnout/              # Burnout risk analysis
│       ├── chat/                 # AI tutor chat
│       ├── cohort-stats/         # Class-wide statistics
│       ├── flashcards/           # AI flashcard generation
│       ├── generate-persona-traits/ # Learner DNA persona
│       ├── generate-quiz/        # Quiz question generation
│       ├── generate-segment-flashcards/ # Segment-specific flashcards
│       ├── grades/               # Grade data
│       ├── insights/             # Comprehensive learning analytics
│       ├── practice/             # Practice paper generation
│       ├── practice-paper/       # Practice paper (alt endpoint)
│       ├── predict/              # Score prediction (Linear Regression)
│       ├── quiz-explain/         # Quiz answer explanations
│       ├── segment-slides/       # Slide extraction from segments
│       ├── segment-summary/      # Video segment summaries
│       ├── study-plan/           # Personalized study planning
│       ├── summary/              # "I'm Lost" summaries
│       ├── tutor/                # AI tutoring endpoint
│       └── weakness-analysis/    # Careless vs genuine weakness detection
├── components/                   # React components
│   ├── AITutor.tsx               # AI tutor chat interface
│   ├── AppSidebar.tsx            # Navigation sidebar
│   ├── AuthGuard.tsx             # Auth route protection
│   ├── ChatbotModal.tsx          # Chat modal overlay
│   ├── FlashcardModal.tsx        # Flashcard viewer
│   ├── LostHelpModal.tsx         # "I'm Lost" help modal
│   ├── QuizModal.tsx             # Quiz taking modal
│   ├── SegmentLearnSummary.tsx   # Segment summary display
│   ├── VideoPlayer.tsx           # YouTube video player
│   └── feature/FeatureShell.tsx  # Feature page wrapper
├── lib/                          # Core logic & services
│   ├── api-auth.ts               # Firebase token verification
│   ├── api-client.ts             # Client-side authFetch helper
│   ├── firebase.ts               # Firebase client config
│   ├── firebase-admin.ts         # Firebase Admin SDK
│   ├── firebaseClient.ts         # Firestore client helpers
│   ├── openai-ai.ts              # OpenAI integration
│   ├── gemini-ai.ts              # Gemini AI integration
│   ├── azure-ai.ts               # Azure OpenAI (fallback)
│   ├── ai-help.ts                # AI helper utilities
│   ├── rag.ts                    # RAG retrieval for tutoring
│   ├── learning-algorithms.ts    # Ebbinghaus, cognitive load
│   ├── sm2.ts                    # SM-2 spaced repetition
│   ├── insights-data.ts          # Linear Regression + analytics
│   ├── progress.ts               # Progress tracking helpers
│   ├── validate.ts               # Request validation
│   ├── logger.ts                 # Structured logging
│   ├── demo-data.ts              # Demo module content
│   └── useStudentData.ts         # React hook for student data
├── __tests__/                    # Test suite
│   └── api/
│       ├── auth.test.ts          # Auth verification tests
│       ├── validate.test.ts      # Validation utility tests
│       └── routes.test.ts        # API route integration tests
├── testbench/                    # Testing docs for judges
│   ├── TESTBENCH.md              # Manual test guide
│   ├── sample-requests.sh        # curl test script
│   └── payloads/                 # Sample API payloads
├── public/                       # Static assets
├── vitest.config.ts              # Test configuration
├── .env.example                  # Environment template
├── package.json                  # Dependencies & scripts
├── tailwind.config.ts            # Tailwind configuration
└── tsconfig.json                 # TypeScript configuration
```

---

## API Documentation

All API routes require Firebase Authentication. Include the header:
```
Authorization: Bearer <firebase-id-token>
```

### POST `/api/burnout`
Analyzes study patterns for burnout risk.

```json
// Request
{
  "totalHoursThisWeek": 42,
  "sessionsThisWeek": 14,
  "avgDurationMinutes": 200,
  "avgSessionHour": 23,
  "scoresTrend": [80, 70, 55],
  "streakDays": 18
}

// Response
{
  "riskLevel": "high",
  "riskScore": 75,
  "signals": ["Excessive weekly hours", "Late-night studying"],
  "breakdown": [{ "signal": "Weekly hours", "value": "42h", "threshold": "30h", "points": 25, "status": "danger" }],
  "recommendation": "Consider taking a rest day...",
  "schedule": { "morning": "Focus work", "afternoon": "Light review", "evening": "Rest", "night": "Sleep" },
  "mentalHealthResources": [{ "name": "NTU Counselling", "contact": "...", "type": "university", "url": "..." }]
}
```

### POST `/api/flashcards`
Generates 6 AI-powered flashcards for a topic.

```json
// Request
{ "topic": "For Loops in Python", "score": 40, "context": "Student confused about range() function" }

// Response
{
  "topic": "For Loops in Python",
  "score": 40,
  "cards": [{ "front": "What does range(5) generate?", "back": "0, 1, 2, 3, 4", "difficulty": "easy", "hint": "Think of it as counting from 0" }],
  "studyTip": "Try writing small loops in a REPL",
  "generatedAt": "2026-03-06T12:00:00Z"
}
```

### POST `/api/chat`
Multi-turn AI tutor conversation with optional image support.

```json
// Request
{
  "messages": [{ "role": "user", "content": "Explain recursion simply" }],
  "systemInstruction": "You are a patient CS tutor"
}

// Response
{ "text": "Recursion is when a function calls itself..." }
```

### POST `/api/study-plan`
Generates a personalized daily study plan.

```json
// Request
{
  "weakTopics": ["Recursion", "Linked Lists"],
  "quizHistory": [{ "topic": "Recursion", "score": 45 }, { "topic": "Arrays", "score": 90 }],
  "avgSessionMinutes": 60,
  "learningStyle": "visual"
}

// Response
{
  "greeting": "Let's tackle your weak spots today!",
  "totalMinutes": 90,
  "blocks": [{ "order": 1, "topic": "Recursion", "activity": "Watch visual walkthrough", "minutes": 30, "type": "review", "difficulty": "medium" }],
  "breakReminder": "Take a 5-min break after each block",
  "endGoal": "Complete 2 recursion problems",
  "generatedAt": "2026-03-06T12:00:00Z"
}
```

### POST `/api/predict`
Predicts next quiz score using Linear Regression.

```json
// Request
{
  "scores": [50, 55, 60, 65, 70],
  "topics": { "Loops": [50, 60, 70], "Arrays": [80, 85, 90] }
}

// Response
{
  "overall": { "currentScore": 70, "predictedNext": 75, "predictedRange": { "low": 70, "high": 80 }, "trend": "improving", "confidence": "high", "model": "Linear Regression" },
  "topicPredictions": [{ "topic": "Loops", "currentAvg": 60, "predictedNext": 75, "trend": "improving" }],
  "riskTopics": [],
  "growthTopics": ["Loops", "Arrays"]
}
```

### POST `/api/weakness-analysis`
Distinguishes careless errors from genuine weaknesses.

```json
// Request
{
  "quizHistory": [
    { "topic": "Recursion", "score": 90, "week": 1 },
    { "topic": "Recursion", "score": 40, "week": 2 },
    { "topic": "Recursion", "score": 85, "week": 3 }
  ]
}

// Response
{
  "carelessAnalysis": [{ "topic": "Recursion", "classification": "careless", "confidence": 0.85, "avgScore": 71.7, "stdDev": 22.5, "evidence": "High variance suggests careless mistakes" }],
  "repeatedFailures": [],
  "aiAdvice": { "overallDiagnosis": "Focus on consistency rather than re-learning" },
  "summary": { "totalTopics": 1, "carelessCount": 1, "genuineWeaknessCount": 0 }
}
```

### POST `/api/insights`
Comprehensive learning analytics engine.

```json
// Request
{
  "quizHistory": [{ "topic": "Loops", "score": 70, "week": 1 }, { "topic": "Loops", "score": 80, "week": 2 }],
  "weeklyHoursHistory": [10, 12, 8],
  "studySessions": [{ "hour": 10, "score": 85, "duration": 45 }]
}

// Response
{
  "learningStateAnalysis": { "currentPhase": "steady-progress", "confidenceScore": 0.78, "comparedToLastWeek": "improving" },
  "topicMastery": [{ "topic": "Loops", "avgScore": 75, "trend": "improving", "mastery": "developing" }],
  "forgettingCurve": [{ "topic": "Loops", "estimatedRetention": 0.82, "reviewInDays": 3, "urgency": "soon" }],
  "cognitiveLoad": [{ "week": "W1", "cognitiveLoad": 0.6, "level": "optimal" }],
  "optimalStudyTime": [{ "label": "Morning (9am-12pm)", "avgScore": 85, "performance": "peak" }],
  "weeklyReport": { "summary": "Good progress this week", "highlights": ["Loops improved by 10 points"] }
}
```

### POST `/api/agent-orchestrator`
Multi-agent pipeline with 5 specialized AI agents.

```json
// Request
{
  "quizHistory": [{ "topic": "Loops", "score": 50, "week": 1 }, { "topic": "Arrays", "score": 80, "week": 1 }],
  "weakTopics": ["Loops"],
  "strongTopics": ["Arrays"],
  "learningStyle": "visual"
}

// Response
{
  "agents": [
    { "agent": "Diagnosis Agent", "status": "complete", "finding": "1 weak topic identified", "output": { "avgScore": 65, "weakTopics": ["Loops"] } },
    { "agent": "Pattern Detection Agent", "status": "complete", "output": { "genuineWeaknesses": ["Loops"], "algorithm": "Variance Analysis" } },
    { "agent": "Prediction Agent", "status": "complete", "output": { "predictedNext": 58, "trend": "stable" } },
    { "agent": "Planner Agent", "status": "complete", "output": { "priorityActions": ["Review Loops fundamentals"] } },
    { "agent": "Tutor Agent", "status": "complete", "output": { "message": "Let's focus on Loops today..." } }
  ],
  "orchestration": { "totalAgents": 5, "pattern": "Sequential Pipeline with Maker-Checker" }
}
```

---

## Demo Walkthrough

1. **Landing Page** → Click "Get Started"
2. **Login** → Select role (Student), enter credentials (`student@ntu.edu.sg` / `demo1234`)
3. **Learner DNA Quiz** → Answer 10 questions → View generated persona
4. **Course Page** → Select a module → Watch video segments
5. **Quiz Gate** → Take quiz after segment → Pass to unlock next segment
6. **Fail a Quiz** → See AI-generated flashcards with hints
7. **"I'm Lost"** → Click during video → See simplified summary
8. **Dashboard** → View mastery status, streaks, peer comparison, score predictions
9. **Insights** → View forgetting curves, cognitive load, optimal study times
10. **Burnout Alert** → See AI wellbeing warning with schedule suggestions

---

## Team

| Member | Role | Responsibilities |
|--------|------|-----------------|
| Person 1 Narhen | Architect | Project setup, integration, dashboard, docs |
| Person 2 Yoheshvaran | Gatekeeper | Login, SSO simulation, Learner DNA quiz |
| Person 3 Arunkumar | Content Engine | Video player, quiz gates, "I'm Lost" button |
| Person 4 Nandakishor | AI Brain | Gemini & OpenAI integrations, API routes |
| Person 5 Pranati | Dashboard Designer | Progress tracking, charts, peer comparison |

---

## Citations

[1] Google Gemini API Documentation. https://ai.google.dev/docs

[2] OpenAI API Documentation. https://platform.openai.com/docs

[3] Firebase Documentation. Google. https://firebase.google.com/docs

[4] Next.js Documentation. Vercel. https://nextjs.org/docs

[5] Tailwind CSS Documentation. https://tailwindcss.com/docs

[6] Ebbinghaus, H. (1885). "Memory: A Contribution to Experimental Psychology." — Foundational work on the forgetting curve, informing our spaced repetition features.

[7] Wozniak, P.A. (1990). "SuperMemo 2 Algorithm." — Basis for our SM-2 flashcard scheduling implementation.

[8] Recharts Documentation. https://recharts.org

[9] Framer Motion Documentation. https://www.framer.com/motion

---

*Built for DLWeek 2026 — Microsoft Track*

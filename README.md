<p align="center">
  <img src="the-verdict/src/assets/justice_hero.jpg" alt="The Verdict Banner" width="600" style="border-radius: 12px;" />
</p>

<h1 align="center">⚖️ THE VERDICT</h1>
<h3 align="center"><em>Think. Argue. Apply.</em></h3>

<p align="center">
  <strong>India's First AI-Powered Courtroom Simulator for the New Criminal Law Era</strong>
</p>

<p align="center">
  <a href="https://the-verdict-eta.vercel.app">🔴 Live Demo</a> •
  <a href="#-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-architecture">Architecture</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white" alt="Vite 8" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind v4" />
  <img src="https://img.shields.io/badge/License-MIT-green" alt="MIT License" />
  <img src="https://img.shields.io/badge/No_API_Keys-Required-brightgreen" alt="No API Keys" />
</p>

---

## 📌 Problem Statement

In **July 2024**, India underwent its most sweeping criminal law reform in over 150 years:

| Old Law | New Law | Year |
|---------|---------|------|
| Indian Penal Code (IPC) | **Bharatiya Nyaya Sanhita (BNS)** | 2023 |
| Code of Criminal Procedure (CrPC) | **Bharatiya Nagarik Suraksha Sanhita (BNSS)** | 2023 |
| Indian Evidence Act (IEA) | **Bharatiya Sakshya Adhiniyam (BSA)** | 2023 |

Yet the way law students learn to argue **hasn't changed**: read the bare act, memorize the section, write the memorial. Nobody trains them to hold a position while a judge tries to take it apart — and by the time a real verdict comes, **it's too late to learn from it.**

**THE VERDICT** is the dress rehearsal for that moment: a courtroom built so you can find out if your argument holds up — *before it actually has to.*

---

## ✨ Features

### 🧑‍⚖️ AI Judge — Not an AI Tutor
An intelligent heuristic judge that **cross-examines you** instead of explaining the law. It asks which section you're relying on, demands a case citation, and challenges you to justify what you just said — just like a real Principal Sessions Judge.

### 🔒 Anti-Hallucination Citation Safeguard
Every case cited is verified against a **locked, pre-verified database** of real Indian judgments. If a precedent doesn't exist in the record, the judge says so instead of making one up. Includes an interactive **Citation Safeguard Tester** so you can verify any citation yourself.

### ⚡ Dynamic "Change One Fact" Mechanic
Mid-hearing, a new evidentiary detail drops into the case — a server log places the accused 400m away, a revised CMO report proves the fracture was from a fall, or the IO concedes under oath that no Section 38 arrest memo was served. The argument that was working thirty seconds ago might not survive it.

### 🗣️ Opposing Counsel (Special Public Prosecutor)
A real-time adversarial voice pushes back after every submission — arguing seriousness of charges, challenging procedural gaps, and requesting strict bail conditions. You're building a case against **resistance**, not performing into silence.

### 🎤 Voice-Powered Arguments
Type your submissions under pressure, or **speak them aloud** using browser-native Speech-to-Text — the way you would in an actual hearing. The Judge and Prosecutor respond with distinct Text-to-Speech voices, pitch-tuned for realism.

### 🏗️ Custom Scenario Builder
A **3-step wizard** to write your own moot problem — define parties, set injury classifications, toggle procedural defects (missing arrest memo, warrantless search, absent panchas), and the engine synthesizes a complete case dossier with facts, timeline, allegations, and disruptive variables.

### 📊 Post-Hearing Debrief & Judicial Decree
After the hearing concludes, receive:
- **Advocacy Scorecard** (out of 35) across legal reasoning dimensions
- **"Did Well" vs "Needs Improvement"** breakdown
- **Formal Court Order** from the Principal Sessions Judge — complete with Coram, FIR No., outcome, summary, and 5 enumerated bail conditions
- **Printable certified copy** of the decree

### 📚 Quick Reference Compendium
A searchable, filterable browser of **BNS, BNSS, and BSA provisions** — cognizable vs. non-cognizable, bailable vs. non-bailable, punishment brackets, and defense advocate notes — laid out as quick visual flows instead of another page to skim and forget.

### 🔗 Verified Research Sources
A curated directory of **6 authenticated Indian legal research databases** — SCC Online, Manupatra, Indian Kanoon, LiveLaw, India Code, and Bar & Bench — with custom vector branding.

---

## 🏛️ The Courtroom Experience

The hearing simulator features a **3-panel courtroom layout**:

```
┌─────────────────────────────────────────────────────────┐
│                    HON'BLE JUDGE                        │
│              (Cross-examines your arguments)            │
├──────────────────┬──────────────────┬───────────────────┤
│                  │                  │                   │
│  📋 CASE BRIEF  │  ⚖️ COURTROOM   │  📖 STATUTORY     │
│                  │    CONSOLE      │     REFERENCE     │
│  Facts Taxonomy  │                  │                   │
│  • Established   │  Your argument   │  BNS/BNSS/BSA    │
│  • Allegations   │  input area      │  provisions with  │
│  • Disputed      │                  │  1-click cite     │
│  • Missing Gaps  │  Judge response  │                   │
│                  │  SPP rebuttal    │  Verified cases   │
│                  │                  │  with SCC refs    │
└──────────────────┴──────────────────┴───────────────────┘
│  🎤 Voice Input  │  ⚡ Change Fact  │  📊 Stage Tracker │
└─────────────────────────────────────────────────────────┘
```

### 6-Stage Hearing Flow
`1. Facts` → `2. Issue` → `3. Law` → `4. Evidence` → `5. Argument` → `6. Debrief`

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | React 19 |
| **Build Tool** | Vite 8 |
| **Styling** | Tailwind CSS v4 |
| **Routing** | React Router DOM v7 |
| **Icons** | Lucide React |
| **Linting** | Oxlint |
| **Speech Input** | Web Speech API (STT) |
| **Speech Output** | Web Speech Synthesis API (TTS) |
| **Persistence** | localStorage |
| **Deployment** | Vercel |
| **Typography** | Cinzel · Playfair Display · Lora · Inter · Plus Jakarta Sans · JetBrains Mono |

### 🚫 Zero External AI APIs
The entire simulation engine is **deterministic and client-side**. No OpenAI, no Gemini, no Anthropic — no API keys, no backend, no cloud costs. The AI Judge operates via an intelligent **heuristic pattern-matching engine** that detects specific legal defects across BNS, BNSS, and BSA provisions.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
# Clone the repository
git clone https://github.com/shrutijha2004/Courtroom_Simulator.git
cd Courtroom_Simulator/the-verdict

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be running at **http://localhost:5173/**

### Build for Production

```bash
npm run build
npm run preview
```

> **Note:** No `.env` file or API keys are required. The application is fully self-contained and works offline after initial load.

---

## 📐 Architecture

```
the-verdict/
├── public/                     # Static assets & favicon
├── src/
│   ├── assets/                 # Images (courtroom bench, justice hero)
│   ├── components/
│   │   ├── CitationBadge.jsx       # Verified/unverified citation badges
│   │   ├── ErrorBoundary.jsx       # Graceful error handling
│   │   ├── FactTaxonomyModal.jsx   # 4-quadrant fact classification
│   │   ├── Navbar.jsx              # Navigation + About modal
│   │   ├── SourceLogos.jsx         # SVG logos for legal databases
│   │   └── StatutoryCard.jsx       # Interactive statute/case cards
│   ├── data/
│   │   └── legalData.js            # 82KB verified case repository,
│   │                               # built-in dossiers, statutory codex
│   ├── pages/
│   │   ├── LandingPage.jsx         # Hero landing page
│   │   ├── ScenarioSelection.jsx   # Case docket & filtering
│   │   ├── ScenarioBuilder.jsx     # Custom case wizard
│   │   ├── ActiveHearing.jsx       # 70KB flagship courtroom simulator
│   │   ├── DebriefScreen.jsx       # Scoring & judicial decree
│   │   ├── QuickReference.jsx      # BNS/BNSS/BSA provisions browser
│   │   └── ResearchSources.jsx     # Legal database directory
│   ├── utils/
│   │   ├── citationSafeguard.js    # Anti-hallucination citation validator
│   │   ├── courtroomDatabase.js    # localStorage persistence layer
│   │   └── courtroomEngine.js      # Heuristic judge & prosecutor engine
│   ├── App.jsx                 # Router & layout
│   ├── main.jsx                # Entry point
│   └── index.css               # Tailwind v4 theme & animations
├── index.html                  # HTML shell with Google Fonts
├── vite.config.js              # Vite + React + Tailwind plugins
└── package.json
```

### Core Engine Modules

| Module | Purpose |
|--------|---------|
| **`courtroomEngine.js`** | Heuristic legal reasoning engine — detects procedural defects (Sec 38 arrest memo, Sec 47 warrantless search, Sec 57 magistrate production, BSA Sec 63 electronic evidence), generates judge cross-examination questions, prosecutor rebuttals, and formal judicial decrees |
| **`citationSafeguard.js`** | Regex-based citation parser that extracts case names, normalizes them, and validates against the verified case database — blocks hallucinated citations in real-time |
| **`courtroomDatabase.js`** | localStorage persistence layer managing active cases, hearing progress, transcripts, scores, and custom scenario storage with cross-tab synchronization via CustomEvents |
| **`legalData.js`** | Centralized 82KB repository containing verified Supreme Court & High Court judgments, 3 built-in case dossiers, statutory codex, and custom scenario synthesis engine |

---

## 🔍 Legal Defects the Judge Can Detect

| Provision | Defect | Key Precedents Cited |
|-----------|--------|---------------------|
| BNSS § 38 | Missing contemporaneous written grounds of arrest | *Pankaj Bansal v. UOI*, *Prabir Purkayastha v. State* |
| BNSS § 47 | Warrantless search without independent panchas | *Priya Sharma v. NCT of Delhi* |
| BNSS § 48 | Failure to intimate family within reasonable time | *D.K. Basu v. State of West Bengal* |
| BNSS § 57 | Failure to produce arrestee before Magistrate within 24 hrs | Constitutional mandate |
| BSA § 63 | Electronic/CCTV evidence without cryptographic hash certificate | *Anvar P.V. v. P.K. Basheer*, *Arjun Panditrao v. Kailash Kushanrao* |
| BNS §§ 34–44 | Private defence claim without proportionality analysis | Statutory provisions |
| Triple Test | Flight risk, witness tampering, recurrence assessment | *Satender Kumar Antil v. CBI*, *Arnesh Kumar v. State of Bihar* |

---

## 🎯 What Makes This Different

| Traditional Legal Ed | THE VERDICT |
|---------------------|-------------|
| Read bare acts passively | Argue under judicial pressure |
| Memorize old IPC/CrPC sections | Practice with current BNS/BNSS/BSA |
| No adversarial pushback | Real-time opposing counsel |
| Static case studies | Dynamic facts that change mid-hearing |
| No citation accountability | Every citation verified against real judgments |
| Theory-only learning | Full courtroom simulation with voice |

---

## 🌐 Live Deployment

🔴 **[https://the-verdict-eta.vercel.app](https://the-verdict-eta.vercel.app)**

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  Built with ⚖️ for the <strong>Vibeathon</strong>
  <br />
  <em>"The courtroom doesn't wait for you to be ready. Neither should your training."</em>
</p>

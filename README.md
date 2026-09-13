# Gather 🗣️

**Learn languages through real-world conversations, not textbooks.**

Gather combines carefully crafted missions with CEFR language proficiency levels to make language learning immersive, practical, and fun. Every mission adapts to your skill level and teaches you how to speak naturally in different contexts.

[![Built with Bilt](https://img.shields.io/endpoint?url=https%3A%2F%2Fapp.bilt.me%2Fapi%2Fbadge)](https://bilt.me)

<img width="1400" height="657" alt="app-screenshots-row" src="https://github.com/user-attachments/assets/00da3bca-2c4d-427c-8aae-2baa9653f76d" />

---

## 🎯 Hackathon Submission

**Event:** AI.woman Hackathon  
**Category:** Language Learning / EdTech  
**Project:** Language Collective  
**Team:** Language Collective  
**Built with:** Claude & OpenAI (development), Bilt (platform)

### Why Gather Wins

✨ **Innovation:**
- Real-world scenarios > textbook drills
- Strategic language (not just grammar)
- Intermediate learners' path to professional fluency

📊 **Scope & Polish:**
- 10+ pre-built missions across 6 CEFR levels
- Full mission validation framework
- Production-ready code (TypeScript, React Native, Expo)
- Cross-platform (iOS, Android, web)

🚀 **Scalability:**
- AI-powered mission generation (expandable to any language/context)
- Modular architecture for easy feature expansion
- Ready for Claude/OpenAI API integration for dynamic mission creation

💰 **Market Fit:**
- 420M language learners globally
- Hamburg context as proof-of-concept (scalable to any city/language)
- B1-B2 learners seeking premium professional fluency

---

## 🚀 Try It Now

### Live Demo
**[Open Gather Web App →](https://264a16a8-c2cd-4733-a99d-3359cca878e1.web.bilt.me/)**

No installation needed. Just click above to see Gather in action!

---

## 🎯 What is Gather?

Gather moves beyond textbook learning. It's a mission-based language app where users tackle **real-world scenarios** at their proficiency level:

- 🎯 **Curated Real-World Missions** – Professionally-crafted scenarios (business negotiations, doctor appointments, apartment rentals, etc.)
- 📊 **CEFR-Aligned Levels** – A1 → C2 progression; missions adapt to actual proficiency
- 🗣️ **Language Registers** – Learn practical, formal, bureaucratic, and friendly speech styles
- 🎯 **Strategic Problem-Solving** – Not just grammar drills—real conversations with stakes and strategy
- 📝 **Journal & Reflection** – Users reflect on their learning journey and track growth
- 🔓 **Progression Paths** – Clear roadmaps from one level to mastery

**For Everyone:** Whether you're just starting (A1) or aiming for mastery (C1), Gather has missions matched to your level and goals.

**Real Example:** A business meeting negotiation where users must handle budget objections, propose solutions, and navigate professional German—all in one mission.

---

## 📚 Real Missions Included

The app ships with **10+ professionally-crafted missions** across A1-B2 levels:

### A1-A2 (Beginner)
- 🏥 **Doctor First Visit** – Medical appointment scheduling & conversation
- 👟 **Running Club** – Social integration & casual German
- 🏛️ **Ausländerbehörde** – Government agency interaction (real Hamburg scenario)

### B1 (Intermediate)
- 💼 **Job Interview** – Professional German, resume discussion, questions
- 🏠 **Apartment Viewing** – Rental negotiation & practical discussion
- 🚌 **Public Transport** – Ticket booking & directions
- 🍽️ **Restaurant Reservation** – Dining preferences & special requests
- 📚 **Library Membership** – Cultural interaction & book discussion
- 🛒 **Grocery Shopping** – Product vocabulary & vendor interaction

### B2 (Upper-Intermediate)
- 🎓 **University Orientation** – Enrollment, academic systems, formal German
- 🏥 **Health Insurance** – Complex administrative & legal language

**Each mission includes:**
- Contextual vocabulary (8+ terms)
- 5 progressive exercises
- Difficulty-matched scenarios
- Strategic feedback (not just corrections)
- Journal reflection prompts

---

## 📱 Features

**What Gather does:**

- ✅ Missions that feel real
- ✅ Feedback that explains strategy
- ✅ Progress that feels earned
- ✅ Levels that match your skill
- ✅ Registers you actually use
- ✅ Cross-platform (mobile, tablet, web)
- ✅ Works offline
- ✅ Your journal, your pace
- ✅ **User Settings** – Name, language preference, learning level
- ✅ **Hamburg Integration** – Quick access to Hamburg events & cultural calendar
- ✅ **Multi-Language UI** – Interface in English & German

---

## 🔮 Scalability & Upcoming Features

Gather is built for growth. Planned expansions include:

- 🤖 **AI-Powered Mission Generation** – Dynamically create personalized missions for any language scenario or context
- 💬 **Conversational AI Feedback** – Chat-based AI tutor for real-time feedback, corrections, and dialogue practice
- 🌍 **Multi-Language Expansion** – From German foundation, scale to Spanish, French, Mandarin, and beyond
- 📊 **Advanced Analytics** – Deep learning insights and proficiency prediction
- 🎓 **Adaptive Difficulty** – ML-driven progression that adjusts mission complexity based on user performance

---

## ⚙️ Smart Features

### 🌍 Hamburg Integration

Quick link to Hamburg events and cultural happenings.

One tap from the Today screen → Hamburg travel & events calendar.  
Stay connected to the city while learning German about it.

### 🎨 User Settings

Personalize Gather:

- **Your Name** – Personal touch to your progress
- **Language Preference** – Interface in your native language
- **Learning Level** – Beginner, Intermediate, or Advanced

Start where you are, learn at your pace.

### 🌐 App Translations

**Interface Languages:**
- 🇩🇪 Deutsch (German)
- 🇬🇧 English

UI in your language. Mission content always in German for immersion.

---

## 🛠️ Tech Stack

```
React Native + Expo      → Cross-platform native
TypeScript              → Type-safe, reliable
Expo Router             → File-based navigation
TailwindCSS (Uniwind)   → Responsive design
React Native Maps       → Location features
i18next                 → Multilingual support (5+ languages)
AsyncStorage            → Local data persistence
```

---

## ✅ Quality Assurance

**Type Checking & Linting:**
```sh
npm run lint
npm run lint:css
npm run format:check
```

**Testing the App:**
- 🌐 [Live Web Demo](https://264a16a8-c2cd-4733-a99d-3359cca878e1.web.bilt.me/) – Test features in browser
- 📱 Expo Go – Scan QR from `npx expo start` for mobile testing
- 📊 Mission Validation – `node scripts/validate-missions.js scenarios/`

---

## 🚀 Deployment

### Web (Fastest for Demo)
```sh
npm run export:web
# Deploy the generated `dist/` folder to any static host
# (Vercel, GitHub Pages, Netlify, etc.)
```

### Native Apps
```sh
# iOS
npm run ios

# Android  
npm run android
```

---

## 📋 Development

**Code Quality:**
```sh
npm run format    # Format code
npm run lint      # Type check & lint
```

**Project Structure:**
```
app/        Screens (Expo Router)
components/ UI components (Chunky cards, buttons, inputs)
lib/        Utils, hooks, types, mission logic
public/     Icons, manifest, static assets
scenarios/  Mission markdown content
```

### Run Locally

**Prerequisites:**
- Node.js ≥ 20.19.4
- npm (or yarn)

**Setup:**
```sh
npm install
npx expo start
```

- **On Phone:** Scan QR with [Expo Go](https://expo.dev/go)
- **On Web:** Press `w` in terminal

**Build for Web:**
```sh
npm run export:web
npm run build:pwa
```

---

## 🤝 Built With

**Platform:** [Bilt](https://bilt.me) – AI-powered app builder  
**Development:** Claude (Anthropic) & OpenAI  
**Mission Crafting:** AI-assisted with human review

The entire codebase is customizable and hackable—fork this repo and make it your own!

Want to extend Gather? Use Bilt's MCP server to programmatically modify the app:

```json
{
  "mcpServers": {
    "bilt": {
      "transport": {
        "type": "sse",
        "url": "https://mcp.bilt.me/mcp/sse",
        "headers": {
          "Authorization": "Bearer YOUR_API_KEY"
        }
      }
    }
  }
}
```

---

<div align="center">

## 🗣️ Ready to go beyond "good enough"?

### [Open Gather Now](https://264a16a8-c2cd-4733-a99d-3359cca878e1.web.bilt.me/)

**AI.woman Hackathon**  
Language Collective

</div>

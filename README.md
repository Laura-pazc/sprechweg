# Gather 🗣️

**Learn languages through real-world conversations, not textbooks.**

Gather combines carefully crafted missions with CEFR language proficiency levels to make language learning immersive, practical, and fun. Every mission adapts to your skill level and teaches you how to speak naturally in different contexts.

[![Built with Bilt](https://img.shields.io/endpoint?url=https%3A%2F%2Fapp.bilt.me%2Fapi%2Fbadge)](https://bilt.me)

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
- Mission generator skill for unlimited content creation
- Modular architecture for easy feature expansion
- Analytics-ready (PostHog integration)

🎯 **Market Fit:**
- 420M language learners globally
- Hamburg context as proof-of-concept (scalable to any city/language)
- B1-B2 learners seeking premium professional fluency

---

## 🚀 Try It Now

### Live Demo
**[Open Gather Web App →](https://264a16a8-c2cd-4733-a99d-3359cca878e1.web.bilt.me/)**

No installation needed. Just click above to see Gather in action!

### Develop Locally (Optional)

**Prerequisites:**
- Node.js ≥ 20.19.4
- npm (or yarn)

**Setup:**
```sh
# Install dependencies
npm install

# Start development server
npx expo start
```

- **On Phone:** Scan QR code with [Expo Go](https://expo.dev/go) app
- **On Web:** Press `w` in terminal

**Build for Web:**
```sh
npm run export:web
npm run build:pwa
```

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

**A1-A2 (Beginner):**
- 🏥 Doctor First Visit – Medical appointment scheduling & conversation
- 👟 Running Club – Social integration & casual German
- 🏛️ Ausländerbehörde – Government agency interaction (real Hamburg scenario)

**B1 (Intermediate):**
- 💼 Job Interview – Professional German, resume discussion, questions
- 🏠 Apartment Viewing – Rental negotiation & practical discussion
- 🚌 Public Transport – Ticket booking & directions
- 🍽️ Restaurant Reservation – Dining preferences & special requests
- 📚 Library Membership – Cultural interaction & book discussion
- 🛒 Grocery Shopping – Product vocabulary & vendor interaction

**B2 (Upper-Intermediate):**
- 🎓 University Orientation – Enrollment, academic systems, formal German
- 🏥 Health Insurance – Complex administrative & legal language

Each mission includes:
- Contextual vocabulary (8+ terms per mission)
- 5 progressive exercises
- Difficulty-matched scenarios
- Strategic feedback (not just corrections)
- Journal reflection prompts

---

## 📱 Features

- ✅ **Curated Mission Library** – Professionally-crafted scenarios matching user's level & interests
- ✅ **CEFR-Aligned Progression** – 6 levels (A1 → C2) with appropriate difficulty scaling
- ✅ **4 Language Registers** – Practical, formal, bureaucratic, friendly styles
- ✅ **Real Scenarios** – Business negotiations, doctor visits, apartment rentals, university enrollment, banking
- ✅ **Strategic Feedback** – Not just corrections; feedback explains *why* language matters
- ✅ **Reflection Journal** – Users track growth and document learning insights
- ✅ **Progress Visualization** – Confidence tracking, level results, achievement milestones
- ✅ **Cross-Platform** – iOS, Android, and web (responsive design)
- ✅ **Offline Support** – AsyncStorage for local progress persistence
- ✅ **Multilingual Interface** – i18next support for global reach

---

## 🛠️ Tech Stack

- **React Native** + **Expo** – Cross-platform mobile development
- **TypeScript** – Type-safe code
- **Expo Router** – File-based navigation
- **TailwindCSS** (Uniwind) – Styling
- **React Native Maps** – Location features
- **i18next** – Multilingual support
- **PostHog** – Analytics
- **AsyncStorage** – Local data persistence

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

### Format & Lint Code
```sh
npm run format
npm run lint
```

### File Structure
```
app/                   # Screens (Expo Router)
components/            # Reusable UI components
lib/                   # Utilities, hooks, types
public/                # Static assets
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


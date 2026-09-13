# Demo Video Storyboard — Gather, 3-Minute Hackathon Cut

**Slug:** gather-hackathon-demo-3min
**Duration:** ~178s
**Source:** authored fresh, replaces `DEMO_SCRIPT_INTERMEDIATE_3MIN.md` (that script
depicted a business-negotiation mission and free-text AI grading that don't exist
in the codebase — see flags below)
**App name used:** Gather (per `app.config.ts`, mid-rename from "Sprechweg" — flag
below)

*Note to whoever records this:* every screen named here exists in the app today.
Nothing in this storyboard needs a feature built between now and recording.

## How to read this storyboard

Second person throughout ("you"), no fictional persona with invented stats — the
confidence percentage and badge are real computed values that differ per demo run,
so the VO never states a specific number. Each row is one beat, roughly 5–10
seconds, one visual change per beat. Timings are approximate and proportional, not
a stopwatch contract.

---

## Scene 1 — The gap (0:00–0:15)

| # | Visual | Narration (VO) | Notes |
|---|---|---|---|
| 1 | Cut from a generic flashcard app closing to a real Hamburg street: a doctor's office sign, a Sparkasse branch, an Ausländerbehörde entrance | "You can conjugate verbs. You still freeze at the doctor's reception." | Hook, 0–8s. Real Hamburg locations, not stock B-roll of an office tower. |
| 2 | Phone home screen, tap the Gather app icon, splash screen | "Gather skips the drills and sends you straight into the errand." | 8–15s. |

## Scene 2 — Placement chat (0:15–0:35)

| # | Visual | Narration (VO) | Notes |
|---|---|---|---|
| 3 | Onboarding screen: Sidekick chat bubble asks the first question, learner types a name | "First, a short chat with your Sidekick. A few honest questions about where you're at, not a test." | 15–24s. Real screen: `app/onboarding.tsx`. |
| 4 | Chat continues: multiple-choice answer bubbles tapped, sidekick replies in-line | "Every answer adjusts your level in the background." | 24–35s. |

## Scene 3 — Level result → Today (0:35–0:50)

| # | Visual | Narration (VO) | Notes |
|---|---|---|---|
| 5 | Level result screen: tier chip, headline, "what changes at this level" checklist | "It names your level, says what changes at that level, then hands you a real mission to start with." | 35–43s. Real screen: `app/level-result.tsx`. |
| 6 | Today tab: Hamburg location chip, greeting, "Up Next" mission card, confidence bar | "Today's mission: your first doctor's visit." | 43–50s. Real screen: `app/(tabs)/index.tsx`. |

## Scene 4 — Vocabulary (0:50–1:03)

| # | Visual | Narration (VO) | Notes |
|---|---|---|---|
| 7 | Mission prep, vocab screen: "der Termin" card with example sentence | "Each word comes with the sentence you'll actually need it in." | 50–58s. Real content from `lib/scenarioMissions.ts` doctor-first-visit-a2. |
| 8 | Cards flip through: die Anmeldung, die Beschwerden, das Rezept | "Reception. Symptoms. Prescription. The words for this specific errand, nothing extra." | 58–66s. |

## Scene 5 — Conversation simulation (1:03–1:18)

| # | Visual | Narration (VO) | Notes |
|---|---|---|---|
| 9 | Dialogue screen: "Guten Tag! Haben Sie einen Termin?" with English gloss underneath | "Then a real exchange, both sides." | 66–73s. |
| 10 | Dialogue continues: "Wo tut es weh?" → "Ich habe Kopfschmerzen seit zwei Tagen." | "The actual back and forth you'll hear at the desk, and again in the exam room." | 73–83s. |

## Scene 6 — Practice quiz (1:23–1:38)

| # | Visual | Narration (VO) | Notes |
|---|---|---|---|
| 11 | Practice quiz screen: multiple-choice "Was fragt der Arzt zuerst?", one question on screen, progress reads "Question 1 of 3" | "One question at a time. Nothing timed." | 83–91s. Real component: `PracticeQuiz`. |
| 12 | Fill-in-the-blank and write-a-sentence questions flip past quickly | "Multiple choice, fill in the blank, write your own line. Different way of checking it each time, so it's not just pattern-matching an answer." | 91–98s. |

## Scene 7 — Go do it (1:38–1:53)

| # | Visual | Narration (VO) | Notes |
|---|---|---|---|
| 13 | Real-life checklist screen: insurance card, know your symptoms, know your appointment time. Button: "I'm heading out" | "Then the app gets out of the way." | 98–105s. |
| 14 | Tap "I'm heading out" — brief transition to "I'm back" state | "Go. Have the actual conversation. Come back when you're done." | 105–113s. This is the beat that separates Gather from a flashcard app — hold on it. |

## Scene 8 — Field Notes (1:53–2:08)

| # | Visual | Narration (VO) | Notes |
|---|---|---|---|
| 15 | Journal / Field Notes screen: reflection prompt ("What actually happened at the Anmeldung?"), text entry, add-photo option | "Field Notes asks what actually happened at the Anmeldung. The script's a guide, not a guarantee." | 113–121s. |
| 16 | A second prompt: "What's one word or phrase you wish you'd had?" | "That gap is where the next mission comes from." | 121–128s. |

## Scene 9 — Recall check and payoff (2:08–2:25)

| # | Visual | Narration (VO) | Notes |
|---|---|---|---|
| 17 | Recall check: short quiz taken after the visit, one question shown | "One more short check, after the fact, to see what stuck." | 128–135s. |
| 18 | Badge unlock screen: "Praxis-Profi" 🩺, confidence bar visibly moves up (no number spoken) | "A badge for the errand you actually ran. Your confidence score moves too, because you did something, not because you finished a level." | 135–145s. Do not read the confidence number aloud on camera; it varies run to run. |

## Scene 10 — The library (2:25–2:43)

| # | Visual | Narration (VO) | Notes |
|---|---|---|---|
| 19 | Missions tab, quick scroll: "Open a bank account," "First job interview," "Apartment viewing," "First group run," "Residence permit appointment" | "The doctor's visit is one mission. The bank, the job interview, the apartment viewing, they're all in there too." | 145–155s. All five titles are real, pulled from `lib/scenarioMissions.ts`. |
| 20 | Category filter tiles: Everyday errands, Getting around, Making friends, Work and study | "Sorted by the kind of day it is, not by grammar chapter." | 155–163s. |

## Scene 11 — Close (2:43–2:58)

| # | Visual | Narration (VO) | Notes |
|---|---|---|---|
| 21 | Gather logo | "Gather." | 163–168s. |
| 22 | App store button, "Available on iOS & Android" | "For the errand in front of you." | 168–178s. Narrowed from an earlier draft ("the German you need for the life you're already living here") to avoid a scope claim the app doesn't back yet. |

---

## Source issues flagged

1. **Branding mismatch (unresolved):** `app.config.ts` is mid-rename from
   "Sprechweg" to "Gather" (uncommitted change). This storyboard uses "Gather." If
   the rename gets reverted or re-discussed before the demo, the app name, splash
   asset, and closing beat all need to change together — put this in `ADMIN.md` if
   it isn't already decided.
2. **Confidence number and badge are non-deterministic:** both come from real
   local state (`lib/progress.ts`, `lib/store.ts`) that depends on what the person
   recording the demo has actually done in the app beforehand. Record a clean run
   from a fresh install so the numbers shown are real and reproducible, or accept
   they'll differ take to take. Do not overlay a specific percentage in post.
3. **Closing line risk (Scene 11, beat 22) — resolved:** an earlier draft read
   "The German you need for the life you're already living here," which is a scope
   claim the app doesn't back yet. Narrowed to "For the errand in front of you,"
   tied only to what's actually demoed.
4. **Superseded, not deleted:** `DEMO_SCRIPT_INTERMEDIATE_3MIN.md` still exists at
   repo root with the old, unbuilt business-negotiation flow. It hasn't been
   removed — that's a decision for you, not made here.
5. **Skill-fit note:** the packaged `/video` skill in this environment is scoped to
   a separate GitLab course-video portfolio (course folders, its own decision-layer
   docs at `Course-develop-internal/video/`) and doesn't fit a standalone app demo
   video. This storyboard was authored directly, using the beat-splitting method
   from that skill and lenses from `agency-agents/design/design-visual-storyteller.md`,
   `agency-agents/game-development/narrative-designer.md`, and
   `agency-agents/marketing/marketing-short-video-editing-coach.md` (method only —
   their marketing/game tone was not carried into the VO).

## Resources

- Real screens referenced: `app/onboarding.tsx`, `app/level-result.tsx`,
  `app/(tabs)/index.tsx`, mission prep/practice/journal screens under
  `app/mission/[id]/`.
- Real mission content: `lib/scenarioMissions.ts` (`doctor-first-visit-a2` and the
  five missions named in Scene 10).

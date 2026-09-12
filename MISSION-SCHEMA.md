# Mission File Schema

This is the canonical structure for a Missio language mission — the format used by
every `scenarios/mission-<slug>/mission-<slug>.md` file. It supersedes the earlier
table-based draft schema (still visible in the pre-migration `kb-*` folders); those
predate this structure and are tracked separately, not covered by this document.

A mission is a **situated task**, not a lesson: it prepares the learner for one
specific real errand (book a doctor's appointment, join a running club, open a bank
account), sends them out to actually do it, then closes the loop with reflection and
a light recall check. See `PROJECT-BRIEF.md` for the product loop and `SPEC.md` for
where missions plug into the app's screens.

## File & folder naming

```
scenarios/mission-<slug>/mission-<slug>.md
```

- `<slug>` — lowercase, hyphen-separated, descriptive of the real-life errand (e.g.
  `doctor-first-visit`, `bank-errand`, `auslanderbehorde-appointment`).
- Folder and file share the same name.
- CEFR level is **not** part of the filename — it lives in the metadata header, so a
  mission can be re-leveled without a rename.

## Section-by-section structure

Sections appear in this order. The `*(Screen N)*` tags map to the app's actual
screens (see `SPEC.md`) — keep them, they're not decorative.

### 1. Title
```
# [Scenario Name]
```
Plain, concrete, names the errand — not a marketing tagline.

### 2. Metadata header
```
**Target language:** German (learner's source language: English) · **CEFR level:** [A1/A2/B1/B2] · **Register:** [practical/friendly/bureaucratic/formal]
**Real-life mission:** [one sentence — the actual thing the learner goes and does]
```

### 3. Key vocabulary *(Screen 1)*
Intro line: *"Each word lives in a sentence, not just a translation:"*

Exactly **8 items**, each as:
```
- **[German word/phrase]** — [English gloss]
  *[German example sentence]* ([English translation])
```
- Mix of 5–6 single words/short phrases and 2–3 full useful phrases (things the
  learner will actually say, e.g. `"Wo tut es weh?"`).
- Every item gets its own example sentence — never a bare word/translation pair.
  Vocabulary sticks better in context than as an isolated gloss.
- All 8 items must reappear bolded in the conversation simulation.

### 4. Conversation simulation *(Screen 2)*
- 2–3 speakers plus the learner (as "Sie" or "Sie/Du" — see register table below).
- 6–10 exchanges, format: `**Speaker:** German text with **bolded vocab** *(English translation, vocab bolded too)*`
- Coherent arc: opening → the actual transaction/interaction → closing.
- Grammar complexity matches the CEFR level (see CEFR table below).
- **Address form must match the register** — do not default to "Sie" everywhere.
  This applies to the simulated dialogue specifically; it's the thing being
  taught, so it has to reflect how Germans actually address each other in that
  setting.

### 5. Go deeper *(Screen 3)*
Two bullets, always in this order:
1. **Generic reinforcement** — a fixed-pattern search pointer: *"search these terms
   on YouTube; surface the top 3 results, prioritizing trusted channels (Easy
   German, the Goethe-Institut) over random uploads"* + 1–2 concrete search phrases.
2. **Mission-specific unblock** — the one real thing that actually gets this
   learner ready for *this* errand (a real phone number like Germany's `116117`
   patient-service line, a real portal type like the city's Ausländerbehörde
   booking system, a branch locator, a class-listing site). This bullet must be
   different for every mission — it is the point of the section.

Never invent or guess a specific URL (no fabricated links). Describe the search
terms and the trusted-source preference instead — that's honest and still useful.

**Do not leave meta-notes or `[link TBD]` placeholders in the shipped file.** If a
mission-specific resource genuinely isn't known yet, say so plainly to the learner
(e.g. "check your city's site for the current process") rather than leaving an
authoring instruction in learner-facing content.

### 6. Time to explore
Intro line: *"You're ready. [one clause specific to the errand] — then go."*

- A short pre-departure checklist, 2–4 items, telegraphic German phrases — not
  English narration. This checklist is the app's own coaching voice, not part of
  the simulated conversation, so it consistently uses **du** (or drops the pronoun
  entirely, e.g. "Reisepass ... dabei") even in a Sie-register mission — that's the
  established pattern across the corpus, not an inconsistency to "fix" toward Sie.
- Action buttons: `**[Ich gehe los]** *(I'm heading out)* → **[Ich bin zurück]** *(I'm back)*`

### 7. Journal
- 2 reflection questions (open-ended, about what actually happened).
- 2 action bullets: **Add a photo** and **Share your achievement**.

### 8. Recall check *(optional)*
Intro line: *"A quick check now that you've actually [done the errand] — no need to
redo the full prep."*

Exactly **3 items**, in this order:
1. **Multiple choice** — a short scenario question with 3 options (a/b/c).
2. **Fill in the blank** — one sentence, vocabulary word removed, answer in
   parentheses.
3. **From real life** — an open prompt: *"What's one word or phrase you actually
   said or heard today? Write it in German."*

This is a light recall check *after* the real errand, not a repeat of the prep
drills — keep it short and don't re-test everything covered in Screen 1.

### 9. Level up
One short paragraph: names the concrete grammatical or pragmatic addition the next
CEFR level brings to *this same scenario* (e.g. reported speech, past-tense
narration, formal written register) — not just "more vocabulary."

---

## CEFR grounding

Use the Council of Europe's CEFR global scale to set the ceiling for grammar and
vocabulary choice, not just a level label. Paraphrased for spoken, transactional
missions:

| Level | Can-do focus | Grammar likely in play | Approx. vocabulary range* |
|---|---|---|---|
| **A1** | Understands and uses very basic everyday phrases for concrete needs; can introduce themself and ask/answer simple personal questions if the other person speaks slowly and helps. | Present tense, basic questions, fixed phrases. | ~500–1,000 words |
| **A2** | Understands sentences and frequent expressions about immediate relevance (shopping, local errands, appointments); handles short, routine exchanges of information. | Present tense, modal verbs, simple past for familiar events. | ~1,000–1,500 words |
| **B1** | Understands the main points of clear standard speech on familiar matters; can handle most situations likely to arise while dealing with everyday institutions; can give brief reasons and explanations. | Perfect/simple past narration, reported/indirect questions, conditional for polite requests. | ~1,500–2,500 words |
| **B2** | Interacts with enough fluency and spontaneity that regular interaction with native speakers is possible without strain; explains a viewpoint on a familiar topic in some detail. | Subjunctive II, passive voice, complex subordinate clauses. | ~2,500–4,000 words |

*Word counts are common pedagogical estimates, not an official CEFR count — treat
them as a rough ceiling, not a target to hit exactly.

## Register & address form

Address form in the **conversation simulation** is not free choice — it follows
from the register below. (The Time to explore checklist is a separate case: see
§6 above — it stays in the app's own "du" coaching voice regardless of register.)

| Register | Use case | Address form | Tone |
|---|---|---|---|
| **Practical** | Transactional errands with a professional (doctor, pharmacy, post office) | Sie | Direct, efficient, present tense |
| **Bureaucratic** | Government offices and financial institutions (Ausländerbehörde, bank, Bürgeramt) | Sie | Procedural, document-focused |
| **Friendly** | Peer social contexts (running club, yoga class, meetups) | du | Warm, conversational, small talk |
| **Formal** | High-stakes official writing/speech (job interview, university enrollment) | Sie, often with subjunctive/conditional | Most complex grammar band, typically B1+ |

## Instructional design rationale

Each section earns its place through a specific principle, not habit:

- **Vocabulary in context (Screen 1)** — a word learned inside a sentence transfers
  better than a bare translation pair; this is why every vocab item gets its own
  example sentence.
- **Conversation simulation (Screen 2)** — task-based language teaching: rehearse
  the actual exchange once before it matters, rather than studying about it.
- **Go deeper (Screen 3)** — authentic-materials principle: point at real
  native-speaker input and real logistics, don't manufacture more practice content.
- **Time to explore → Journal** — this is Kolb's experiential-learning cycle in
  miniature: the real errand is the concrete experience, the journal is the
  reflection, and Level Up is the next-level abstraction to carry forward.
- **Recall check placed after the errand, not before** — retrieval practice works
  better spaced after the experience than immediately re-tested; keeping it short
  and optional respects that the learner already did the hard part.
- **Level up as scaffolding** — names the next concrete stretch (a zone-of-proximal-
  development move), not a vague "get more advanced."

## Validation checklist

- [ ] Folder and file names follow `mission-<slug>` (no level suffix)
- [ ] Title, metadata header, and "Real-life mission" line present
- [ ] Exactly 8 vocabulary items, each with its own German example sentence
- [ ] All 8 vocabulary items reappear bolded in the conversation simulation
- [ ] Address form (Sie/du) matches the stated register throughout
- [ ] Go deeper has both a generic search bullet and a mission-specific unblock bullet
- [ ] No `[link TBD]`, bracket placeholders, or leftover authoring notes in the file
- [ ] Time to explore has a pre-departure checklist + the two action buttons
- [ ] Journal has 2 reflection questions + photo/share bullets
- [ ] Recall check has exactly 3 items in order (multiple choice, fill in the blank, from real life)
- [ ] Level up names a concrete grammar/pragmatic addition for the next CEFR level
- [ ] No spelling/grammar errors in German; translations are idiomatic, not literal
- [ ] Scenario is realistic for a Hamburg newcomer

---

## Example sections

### Good vocabulary entry
```markdown
- **der Termin** — appointment
  *Ich brauche einen Termin beim Arzt.* (I need an appointment with the doctor.)
```

### Good conversation line
```
**Arzt:** Guten Tag. **Wo tut es weh?** *(Hello. **Where does it hurt?**)*
```

### Good mission-specific "go deeper" bullet
```markdown
**Don't have a doctor yet?** Find a Hausarzt before your real appointment.
Search "Arztsuche 116117" (Germany's official patient-service number and doctor
finder) or "Hausarzt [your city] Doctolib" to book online.
```

### Anti-pattern — do not do this
```markdown
*Author's note for future missions: swap this for whatever unblocks the mission...*
```
This is an instruction to whoever is authoring the file, not learner-facing
content. It belongs in the skill/process, never in the shipped mission.

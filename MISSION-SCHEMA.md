# Mission File Schema

## Pattern & Structure

Each mission follows this exact structure:

### 1. **Title**
```
# [Scenario Name]
```
- Clear, descriptive title of the real-life scenario

### 2. **Metadata Header**
```
**Target language:** German (learner's source language: English) · **CEFR level:** [A1/A2/B1/B2] · **Register:** [practical/friendly/formal]
```
- Target language and source language
- CEFR level: A1 (beginner), A2 (elementary), B1 (intermediate), B2 (upper-intermediate)
- Register: practical (transactional), friendly (social), formal (official/bureaucratic)

### 3. **Key Vocabulary**
Markdown table with exactly 8 words/phrases:
```markdown
| German | English |
|---|---|
| [word 1] | [translation 1] |
| ... | ... |
| [word 8] | [translation 8] |
```
- Mix of nouns, verbs, and common phrases
- Include 2-3 full phrases (e.g., "Wo tut es weh?", "Wie weit laufen wir?")
- Rest are single words or short expressions
- All vocabulary must appear in conversation simulation, bolded on first use

### 4. **Conversation Simulation**
- Realistic dialogue in target language (German)
- 2-3 native speakers interact with learner as "Sie" (formal you)
- Each line format: `**Speaker:** German text **bolded vocab** *(English translation in italics)*`
- 8-12 exchanges total
- Vocabulary naturally bolded when first introduced
- Coherent arc: greeting → transaction/interaction → closing
- Grammar complexity matches CEFR level

### 5. **Go Deeper (Real Resources)**
- 2-3 bullet points with real, searchable learning materials
- Format: "Description — [link] search: 'searchable keywords'" or just search suggestion
- Examples: YouTube videos, Goethe-Institut materials, real event listings
- Reinforces vocabulary and conversational patterns

### 6. **Practice**
Five types of exercises (in this order):
1. **Multiple choice** — Comprehension question with 3 options (a/b/c)
2. **Fill in the blank** — Single sentence with vocabulary word removed, answer in parentheses
3. **Match the word to its meaning** — Match 3-4 vocabulary words to definitions from key vocab table
4. **Write a sentence** — Create a sentence using one of the key vocabulary words
5. **Vocab review** — Say all 8 key words/phrases aloud from memory before mission

Each exercise should be contextual and reinforce the mission scenario.

### 7. **Level Up**
How to expand/adapt the scenario for higher CEFR levels (typically B1+):
- Add grammatical complexity (reported speech, indirect questions, past tense narration)
- Expand vocabulary scope
- Introduce more nuanced interactions
- Example: "At B1, this scenario adds past-tense narration..."

---

## File Naming Convention

```
[scenario-slug]-[level]/[scenario-slug]-[level].md
```
- `[scenario-slug]` = lowercase, hyphen-separated, descriptive scenario name
- `[level]` = CEFR level or level range (a1, a2, b1, b2, or a1-a2)
- Folder and file have matching names

Examples:
- `doctor-first-visit-a2/doctor-first-visit-a2.md`
- `job-interview-b1/job-interview-b1.md`
- `running-club-first-run-a1-a2/running-club-first-run-a1-a2.md`
- `casual-conversation-a1/casual-conversation-a1.md`

---

## Validation Checklist

- [ ] Folder and file names follow `[slug]-[level]` pattern (no kb- prefix)
- [ ] Title present as H1 with scenario name
- [ ] Metadata header with all 3 fields (target language, CEFR level, register)
- [ ] Key vocabulary table with exactly 8 entries in German | English format
- [ ] All 8 vocabulary items used and bolded in conversation simulation
- [ ] Conversation simulation is realistic and coherent
- [ ] Each conversation line has: speaker name, German text, bolded vocab, English translation in italics
- [ ] "Go deeper" section with 2-3 real resource suggestions
- [ ] 5 practice exercises present in correct order with content
- [ ] "Level up" section describes B1+ expansion
- [ ] No spelling/grammar errors in German text
- [ ] Translations are accurate and idiomatic in English
- [ ] Scenario is realistic for target Hamburg audience

---

## Example Sections

### Good Key Vocabulary Entry
```markdown
| German | English |
|---|---|
| der Termin | appointment |
| die Versicherungskarte | insurance card |
| die Anmeldung | reception desk |
| "Wo tut es weh?" | "Where does it hurt?" |
```

### Good Conversation Line
```
**Arzt:** Guten Tag. **Wo tut es weh?** *(Hello. **Where does it hurt?**)*
```

### Good Practice Question
```
1. **Multiple choice** — Wie ist das Tempo heute? *(What's today's pace?)*
   a) ganz lockeres Tempo  b) sehr schnelles Tempo  c) kein Tempo
```

### Good "Write a sentence" Exercise
```
4. **Write a sentence** — using "der Termin," write one sentence about scheduling a doctor's appointment.
```

---

## Register Definitions

| Register | Use Case | Tone | Grammar |
|---|---|---|---|
| **Practical** | Transactional (doctor, post office, bank) | Direct, efficient | Present tense, imperatives, simple questions |
| **Friendly** | Social (meetups, clubs, casual gatherings) | Warm, conversational | Present tense, personal questions, small talk |
| **Formal** | Official (university, legal, bureaucracy) | Respectful, precise | Subjunctive, conditional, complex sentences, formal address |

---

## CEFR Level Expectations

| Level | Vocabulary | Grammar | Scenario Examples |
|---|---|---|---|
| **A1** | 500-1000 words | Present tense, basic questions | Running club, greeting, simple transactions |
| **A2** | 1000-1500 words | Past tense intro, modal verbs | Doctor visit, grocery shopping, post office |
| **B1** | 1500-2500 words | Conditional, reported speech, subjunctive mood | Job interview, apartment viewing, restaurant reservations |
| **B2** | 2500+ words | Complex structures, nuanced expressions | Health insurance navigation, university orientation, legal processes |

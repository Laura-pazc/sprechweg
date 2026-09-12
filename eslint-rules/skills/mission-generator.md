# Mission Generator

Generates or revises "mission" files: a single markdown document that prepares a
learner for one concrete real-life errand in a target language (booking a
doctor's appointment, opening a bank account, joining a running club), sends them
out to actually do it, then closes the loop with reflection and a light recall
check.

Use this whenever asked to create a new language mission, or to check/fix an
existing one against the format below. This file is self-contained — no other
document, tool, or slash-command is required to use it. It works with any AI
assistant, IDE agent, or a human following it by hand, and with any target/source
language pair. Examples below use German/English because that was the original
project's pair; re-derive vocabulary, register, and address forms for whatever
languages are actually requested.

If the repository you're working in already has its own mission-schema document
or validation script, treat that as the canonical source of truth and use this
file as background/process only — note any conflict rather than silently
following a stale copy of the rules. If no such document exists, this file is the
complete spec.

## Two modes

- **Author** — write a brand-new mission from a scenario + level + register.
- **Revise** — read an existing mission file and fix it against the checklist and
  anti-patterns below, changing only what's actually broken.

## Required inputs (author mode)

Confirm these before writing anything:

1. **Target language and source language** — e.g. "German, learner's source
   language English."
2. **Scenario** — the real errand the learner goes and does.
3. **CEFR level** — A1 / A2 / B1 / B2 (see table below). This sets the grammar
   ceiling and vocabulary band — don't just label a level and then write whatever
   grammar feels natural.
4. **Register** — practical / bureaucratic / friendly / formal (see table below).
   This _determines_ the target language's formal/informal address form (if it
   has one) — it isn't a separate choice.
5. Optional: a grammar focus, a specific city/context detail, other constraints.

If any of these is missing or ambiguous, ask rather than guess. A wrong register
produces a mission that's sociolinguistically wrong for the setting — worse than
pausing to ask.

## CEFR level guide

Paraphrased from the Council of Europe's CEFR global scale, applied to spoken,
transactional missions:

| Level  | Can-do focus                                                                                                                                                                                | Grammar ceiling                                                                              | Approx. vocabulary range\* |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------- |
| **A1** | Understands and uses very basic everyday phrases for concrete needs; can introduce themself and ask/answer simple personal questions if the other person speaks slowly and helps.           | Present tense, basic questions, fixed phrases.                                               | ~500–1,000 words           |
| **A2** | Understands sentences and frequent expressions about immediate relevance (shopping, local errands, appointments); handles short, routine exchanges of information.                          | Present tense, modal verbs, simple past for familiar events.                                 | ~1,000–1,500 words         |
| **B1** | Understands the main points of clear standard speech on familiar matters; handles most situations likely to arise dealing with everyday institutions; gives brief reasons and explanations. | Perfect/simple past narration, reported/indirect questions, conditional for polite requests. | ~1,500–2,500 words         |
| **B2** | Interacts with enough fluency and spontaneity that regular interaction with native speakers is possible without strain; explains a viewpoint on a familiar topic in some detail.            | Subjunctive, passive voice, complex subordinate clauses.                                     | ~2,500–4,000 words         |

\*Word counts are common pedagogical estimates, not an official CEFR count —
treat them as a rough ceiling, not a target to hit exactly.

## Register & address-form guide

Address form in the conversation simulation follows from the register — it is
not a free style choice, and mixing forms inside one conversation reads as a
mistake.

| Register         | Use case                                                                  | Address form                                         | Tone                                     |
| ---------------- | ------------------------------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------- |
| **Practical**    | Transactional errands with a professional (doctor, pharmacy, post office) | Formal (e.g. German Sie, French vous, Spanish usted) | Direct, efficient, present tense         |
| **Bureaucratic** | Government offices and financial institutions                             | Formal                                               | Procedural, document-focused             |
| **Friendly**     | Peer social contexts (a club, a class, a meetup)                          | Informal (e.g. German du, French tu, Spanish tú)     | Warm, conversational, small talk         |
| **Formal**       | High-stakes official writing/speech (job interview, enrollment)           | Formal, often with subjunctive/conditional           | Most complex grammar band, typically B1+ |

If the target language doesn't mark a formal/informal distinction (e.g. English),
carry the register through tone and vocabulary formality instead.

Note: a mission's own "get ready" framing (a pre-departure checklist, journal
prompts, recall-check intro lines) is the _app's_ coaching voice speaking to the
learner, not part of the in-scene conversation — it can stay in one consistent,
casual voice throughout even in an otherwise formal-register mission. Only the
simulated dialogue itself needs to match the register table above.

## File structure to produce

Sections in this order, every time:

### 1. Title

```
# [Scenario name]
```

Plain and concrete — names the errand, not a tagline.

### 2. Metadata header

```
**Target language:** [language] (learner's source language: [language]) · **CEFR level:** [A1/A2/B1/B2] · **Register:** [practical/friendly/bureaucratic/formal]
**Real-life mission:** [one sentence — the actual thing the learner goes and does]
```

### 3. Key vocabulary

Exactly **8 items** (5–6 single words/short phrases + 2–3 full ready-to-say
phrases), each as:

```
- **[target-language word/phrase]** — [gloss in source language]
  *[target-language example sentence]* ([source-language translation])
```

Every item gets its own context — a word learned inside a sentence transfers
better than a bare translation pair. A full ready-to-say phrase (already a
complete sentence) can get a one-line usage note instead of a second example
sentence. Every one of the 8 items must reappear bolded on first use in the
conversation simulation below.

### 4. Conversation simulation

- 2–3 speakers plus the learner, 6–10 exchanges.
- Format: `**Speaker:** target-language text with **bolded vocab** *(source-language translation, vocab bolded too)*`
- Address form matches the register table above; grammar matches the CEFR ceiling.
- Coherent arc: opening → the actual transaction/interaction → closing.

### 5. Go deeper

Two bullets, always in this order:

1. **Generic reinforcement** — point at real, human-made materials for
   independent study (name trusted channel types for that language, e.g. a
   well-known teaching channel or that language's national cultural institute),
   with 1–2 concrete search phrases. Never fabricate or guess a specific URL —
   describe what to search for instead.
2. **Mission-specific unblock** — the one real thing that gets _this_ learner
   ready for _this_ errand (a real hotline number, a real portal type, a branch
   locator, a class-listing site). This must be different for every mission and
   is the actual point of the section — never a generic placeholder, and never
   copied from another mission.

### 6. Time to explore

One intro clause specific to the errand, a 2–4 item pre-departure checklist in
short target-language phrases (app-voice, per the note above), and two action
prompts, e.g.:

```
**[I'm heading out]** → **[I'm back]**
```

### 7. Journal

- 2 open reflection questions about what actually happened.
- 2 action prompts: add a photo, share the achievement.

### 8. Recall check (optional)

One intro line noting this happens _after_ the real errand and isn't a full
redo of the prep. Exactly **3 items**, in this order:

1. **Multiple choice** — a short scenario question, 3 options.
2. **Fill in the blank** — one sentence, vocabulary word removed, answer given.
3. **From real life** — an open prompt: what's one word or phrase the learner
   actually said or heard, written in the target language.

### 9. Level up

One short paragraph naming the concrete grammatical or pragmatic addition the
_next_ CEFR level brings to this same scenario — not just "more vocabulary."

## The decision layer, in order

1. **Register → address form.** Fixes the formal/informal form for the whole
   conversation simulation. Never mix forms within that dialogue.
2. **CEFR level → grammar ceiling + vocabulary band.** Use the table above.
3. **Pick exactly 8 vocabulary items**, each inside its own example sentence.
4. **Draft the conversation**, 6–10 exchanges, obeying steps 1–2, bolding each
   vocabulary item the first time it appears.
5. **Go deeper**: the fixed-pattern generic bullet, then a real mission-specific
   unblock bullet.
6. **Time to explore**: an intro clause, a short checklist, the two action
   prompts.
7. **Journal**: exactly 2 reflection questions plus the two action prompts.
8. **Recall check**: exactly 3 items, testing only what confirms the vocabulary
   landed.
9. **Level up**: one sentence naming the next concrete stretch.

## Writing quality

Write clean the first time — don't draft sloppy and plan a separate cleanup
pass. Avoid, specifically:

- Inflated AI-vocabulary words ("delve", "leverage", "robust", "unlock",
  "crucial", "seamless", "testament to").
- Decorative em dashes beyond a title's dash convention.
- Rule-of-three padding in checklists or reflection prompts.
- Negative-parallelism constructions ("it's not just X, it's Y").
- Generic upbeat closers ("the future looks bright", "exciting times ahead").
- Sycophantic or chatbot artifacts ("I hope this helps!", "Great question!").
- Bracket placeholders (`[link TBD]`, `[NEEDED]`) or notes addressed to a future
  author rather than the learner — either fill them with real content or, if
  genuinely unknown, say so plainly to the learner instead of leaving a stub.

Keep language-specific accuracy in mind: verify grammar and idiom against the
stated CEFR level, and flag anything you're not confident about rather than
guessing — a wrong gender article or a too-advanced construction undermines the
whole mission.

## Anti-patterns to check for when revising an existing mission

- Leftover authoring notes or bracket placeholders shipped as learner-facing text.
- Address-form mismatch inside the conversation simulation (formal throughout a
  friendly-register mission, informal in a bureaucratic one, or a mix).
- Bare vocabulary word/translation pairs with no example sentence.
- A pre-departure checklist or journal prompt drifting into a different language
  or register than the rest of the mission.
- Vocabulary count off from 8, or an item that never appears bolded in the
  conversation.
- A recall check with more than 3 items, or one that re-tests the full prep
  instead of a light check.

Fix only what's actually broken — revise mode repairs defects, it doesn't rewrite
a mission that already fits the structure.

## Self-check before finishing

- [ ] Title, metadata header, and "real-life mission" line present.
- [ ] around 8 vocabulary items, each with its own example sentence
- [ ] All 8 vocabulary items reappear bolded in the conversation.
- [ ] Address form matches the register throughout the conversation.
- [ ] Go deeper has both a generic bullet and a mission-specific unblock bullet,
      with no fabricated URL.
- [ ] No bracket placeholders or leftover authoring notes anywhere in the file.
- [ ] Time to explore has a checklist and the two action prompts.
- [ ] Journal has 2 reflection questions plus the two action prompts.
- [ ] Recall check has exactly 3 items, in order.
- [ ] Level up names a concrete grammar/pragmatic addition for the next level.
- [ ] If this repository has an automated validator for mission files, run it.

## Report back

After authoring or revising, state: the file(s) written or edited, the CEFR
level and register used, the vocabulary count check, and — in revise mode — which
anti-patterns were found and fixed. Flag anything left unverified (e.g. a
resource you couldn't confirm and left as a search suggestion rather than a
specific claim).

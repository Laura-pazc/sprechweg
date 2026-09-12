import type {
  FillBlankQuestion,
  Level,
  Mission,
  RecallQuestion,
  VocabItem,
  WriteSentenceQuestion,
} from '@/lib/types';
import { hashString, normalizeAnswer, seededShuffle } from '@/lib/utils';

/**
 * Per-learner content. In this MVP the personalisation runs on-device from
 * scripted rules (mission + level + what the learner actually studied), which
 * keeps it deterministic and offline. These are the seams a real model would
 * slot into later — see app/how-it-works.tsx.
 */

export interface ReflectionPromptOptions {
  sessionNumber?: number;
  includeCarryForward?: boolean;
}

/**
 * Creates the short post-mission debrief defined in the journal skill.
 * Wording rotates deterministically by mission/session so it stays varied offline.
 */
export function buildReflectionPrompts(
  mission: Mission,
  level: Level,
  name: string,
  options: ReflectionPromptOptions = {},
): string[] {
  const who = name.trim().length > 0 ? name.trim() : 'you';
  const variant = Math.abs(hashString(`${mission.id}:${options.sessionNumber ?? 0}:${level}`)) % 3;

  const promptsByLevel: Record<Level, string[][]> = {
    beginner: [
      [
        `When did you switch to English instead of German during “${mission.title}”? What made you switch? Try: „Auf Deutsch wollte ich …“`,
        `How did the mission feel, ${who}? What was easy, and what was frustrating? Try: „Ich fühle mich …“`,
        'What is one thing you did well today? Try: „Ich bin stolz auf …“',
      ],
      [
        `When did an English word come first while you were trying to ${mission.reflectionFocus}? Try: „Das deutsche Wort war …“`,
        'Which moment felt comfortable, and which moment felt difficult? Try: „Es war leicht/schwer, weil …“',
        'What small success are you proud of? Try: „Heute bin ich stolz auf …“',
      ],
      [
        `Where did you stop thinking in German during “${mission.title}”? What triggered it? Try: „Ich brauchte Englisch, als …“`,
        'How did you feel before, during, and after the mission? Try: „Zuerst …, dann …“',
        'What did you say or understand better than expected? Try: „Gut war …“',
      ],
    ],
    intermediate: [
      [
        `Wann bist du bei „${mission.title}“ ins Englische gewechselt? Was hat den Wechsel ausgelöst?`,
        'Wie hat sich die Mission angefühlt? Wo wurde es leicht, und wo warst du frustriert?',
        'Was hast du diesmal gut gemacht? Worauf bist du stolz?',
      ],
      [
        `In welchem Moment kam Englisch zuerst, als du versucht hast, ${mission.reflectionFocus}? Was fehlte dir auf Deutsch?`,
        'Welcher Teil fühlte sich sicher an, welcher anstrengend? Beschreibe kurz beide Momente.',
        'Welche kleine Reaktion oder Formulierung ist dir heute gelungen?',
      ],
      [
        `Wo hast du aufgehört, auf Deutsch zu denken? Was war in diesem Moment schwierig?`,
        'Wie haben sich deine Gefühle während der Mission verändert?',
        'Was möchtest du als deinen Erfolg von „' + mission.title + '“ festhalten?',
      ],
    ],
    advanced: [
      [
        `An welcher Stelle bist du bei „${mission.title}“ gedanklich oder sprachlich ins Englische ausgewichen, und wodurch wurde dieser Wechsel ausgelöst?`,
        'Wie hat sich die Aufgabe entwickelt: Wann entstand Leichtigkeit, wann Frustration?',
        'Worauf bist du bei deinem Umgang mit der Situation besonders stolz?',
      ],
      [
        `In welchem Moment hat Englisch dein deutsches Denken unterbrochen, als du versucht hast, ${mission.reflectionFocus}?`,
        'Welche Phase fühlte sich selbstverständlich an, und wo musstest du dich bewusst durchbeißen?',
        'Welche sprachliche oder persönliche Entscheidung ist dir diesmal besonders gut gelungen?',
      ],
      [
        `Wann hast du innerlich übersetzt, statt direkt auf Deutsch zu reagieren, und was verrät dir dieser Moment?`,
        'Wie haben Sicherheit und Frustration im Verlauf der Mission miteinander gewechselt?',
        `Was möchtest du dir als gelungenen Moment aus „${mission.title}“ merken?`,
      ],
    ],
  };

  const prompts = [...promptsByLevel[level][variant]];
  if (options.includeCarryForward) {
    const carryForward: Record<Level, string> = {
      beginner:
        'Which one word, phrase, or rule do you want to notice next time? Try: „Nächstes Mal achte ich auf …“',
      intermediate:
        'Welches Wort, welche Formulierung oder Regel möchtest du beim nächsten Mal bewusst beobachten?',
      advanced:
        'Welches sprachliche Muster möchtest du aus dieser Erfahrung in die nächste Mission mitnehmen?',
    };
    prompts.push(carryForward[level]);
  }

  return prompts;
}

export function reflectionHint(level: Level): string {
  if (level === 'beginner') return 'Answer in any language, or use the German starter.';
  if (level === 'intermediate') return 'Ein bis zwei kurze Sätze pro Gedanke reichen.';
  return 'Nutze die Reflexion als kurze, freie Schreibpraxis auf Deutsch.';
}

/**
 * Recall quiz built from the vocab this learner actually marked as studied in
 * this mission's prep. Falls back to the mission vocab if they skipped ahead.
 */
export function buildRecallQuiz(mission: Mission, studiedIds: string[]): RecallQuestion[] {
  const studied = mission.vocab.filter((item) => studiedIds.includes(item.id));
  const pool: VocabItem[] = studied.length >= 3 ? studied : mission.vocab;
  const seed = hashString(`${mission.id}:${pool.map((item) => item.id).join(',')}`);
  const picked = seededShuffle(pool, seed).slice(0, 3);

  return picked.map((item, index) => {
    const distractors = seededShuffle(
      mission.vocab.filter((other) => other.id !== item.id),
      seed + index * 17,
    )
      .slice(0, 2)
      .map((other) => other.en);

    const options = seededShuffle([item.en, ...distractors], seed + index * 31 + 7);

    return {
      id: `${item.id}-recall`,
      de: item.de,
      options,
      answerIndex: options.indexOf(item.en),
    };
  });
}

export function isFillBlankCorrect(question: FillBlankQuestion, input: string): boolean {
  const value = normalizeAnswer(input);
  if (value.length === 0) return false;
  return [question.answer, ...question.alternatives].some(
    (accepted) => normalizeAnswer(accepted) === value,
  );
}

export function missingFromSentence(question: WriteSentenceQuestion, input: string): string[] {
  const value = normalizeAnswer(input);
  return question.mustInclude.filter((word) => !value.includes(normalizeAnswer(word)));
}

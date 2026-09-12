import { LEVEL_SUMMARY } from '@/lib/levelChat';
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

export function buildReflectionPrompts(mission: Mission, level: Level, name: string): string[] {
  const who = name.trim().length > 0 ? name.trim() : 'you';
  const opener = `You went out to ${mission.reflectionFocus}, ${who}. What actually happened in the first ten seconds?`;

  const followUp: Record<Level, string> = {
    beginner: `Which German word did you reach for and not find? Write it down now, while it still stings — that is the one that sticks.`,
    intermediate: `Where did you switch to English? Write the German you would use there next time.`,
    advanced: `What did the other person say that you could not have prepared for, and how did you handle it?`,
  };

  return [opener, followUp[level]];
}

export function reflectionHint(level: Level): string {
  return `Tuned to your ${LEVEL_SUMMARY[level].title.toLowerCase()} tier. Two or three sentences is plenty.`;
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

/** Copy for the "Keep your momentum" card on Today. */
export function momentumFor(mission: Mission): { title: string; detail: string; emoji: string } {
  const emoji: Record<string, string> = {
    'find-your-way': '🚇',
    'make-life-happen': '☕',
    'meet-your-people': '👋',
  };

  return {
    title: `Warm up for “${mission.title}”`,
    detail: `${mission.vocab.length} useful phrases · ${mission.minutes}-minute conversation warm-up`,
    emoji: emoji[mission.id] ?? '✨',
  };
}

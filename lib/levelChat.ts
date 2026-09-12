import type { Level } from '@/lib/types';

export interface ChatChoice {
  id: string;
  label: string;
  score: number;
  reply: string;
}

export interface ChatStep {
  id: string;
  /** `{name}` is replaced with the learner's name once known. */
  question: string;
  kind: 'text' | 'choice';
  placeholder?: string;
  choices?: ChatChoice[];
}

/**
 * The level chat is scripted: fixed questions, weighted answers, one score.
 * It is not a CEFR test — it picks one of three tiers so the first mission
 * feels right rather than right on paper.
 */
export const LEVEL_CHAT_STEPS: ChatStep[] = [
  {
    id: 'name',
    kind: 'text',
    question: "Moin! I'm your Sidekick here in Hamburg. What should I call you?",
    placeholder: 'Your first name',
  },
  {
    id: 'exposure',
    kind: 'choice',
    question: 'Good to meet you, {name}. How much German have you picked up so far?',
    choices: [
      {
        id: 'exposure-0',
        label: 'Basically none yet',
        score: 0,
        reply: "Perfect starting point. You'll need fewer words than you think.",
      },
      {
        id: 'exposure-1',
        label: 'A handful of words',
        score: 1,
        reply: 'A handful is enough to get an answer out of someone.',
      },
      {
        id: 'exposure-2',
        label: 'Simple sentences',
        score: 2,
        reply: 'Then the missing piece is doing it out loud, not more grammar.',
      },
      {
        id: 'exposure-3',
        label: 'Real conversations',
        score: 3,
        reply: "Nice. We'll aim at the messy, unscripted bits then.",
      },
    ],
  },
  {
    id: 'listening',
    kind: 'choice',
    question: 'Someone answers you fast, in full Hamburg speed. What happens?',
    choices: [
      {
        id: 'listening-0',
        label: 'I freeze completely',
        score: 0,
        reply: 'Very normal. We build you an exit line for exactly that.',
      },
      {
        id: 'listening-1',
        label: 'I catch a word or two',
        score: 1,
        reply: 'Two words is often the whole answer. We can work with that.',
      },
      {
        id: 'listening-2',
        label: 'I get the gist',
        score: 2,
        reply: 'Gist is plenty for directions and counters.',
      },
      {
        id: 'listening-3',
        label: 'I keep up fine',
        score: 3,
        reply: "Then let's spend your energy on making plans, not ordering.",
      },
    ],
  },
  {
    id: 'speaking',
    kind: 'choice',
    question: 'Could you order lunch in German today, out loud, on your own?',
    choices: [
      {
        id: 'speaking-0',
        label: 'Not yet',
        score: 0,
        reply: "We'll give you the exact sentence first.",
      },
      {
        id: 'speaking-1',
        label: 'With a script',
        score: 1,
        reply: 'A script is a fine set of training wheels.',
      },
      {
        id: 'speaking-2',
        label: 'Yes, simply',
        score: 2,
        reply: 'Then we add a question on top of the order.',
      },
      {
        id: 'speaking-3',
        label: 'Yes, plus small talk',
        score: 3,
        reply: 'Then lunch is your warm-up, not your mission.',
      },
    ],
  },
  {
    id: 'nerve',
    kind: 'choice',
    question: 'Last one. How does making mistakes in front of strangers feel?',
    choices: [
      {
        id: 'nerve-0',
        label: 'Honestly scary',
        score: 0,
        reply: "We'll start somewhere low-stakes and short.",
      },
      {
        id: 'nerve-1',
        label: 'Fine if I prepare',
        score: 1,
        reply: 'Preparation is exactly what the prep screens are for.',
      },
      {
        id: 'nerve-2',
        label: 'Mostly fine',
        score: 2,
        reply: 'That nerve is worth more than vocabulary.',
      },
      { id: 'nerve-3', label: 'Kind of fun', score: 3, reply: 'Then you are going to move fast.' },
    ],
  },
];

export const MAX_LEVEL_SCORE = 12;

export function levelFromScore(score: number): Level {
  if (score <= 4) return 'beginner';
  if (score <= 8) return 'intermediate';
  return 'advanced';
}

export interface LevelSummary {
  title: string;
  headline: string;
  blurb: string;
  startsWith: string;
  traits: string[];
}

export const LEVEL_SUMMARY: Record<Level, LevelSummary> = {
  beginner: {
    title: 'Beginner',
    headline: 'Short sentences, real streets',
    blurb:
      'You have the words for one exchange at a time. That is exactly enough to get an answer out of a stranger in Hamburg.',
    startsWith: 'find-your-way',
    traits: [
      'Prep gives you the full sentence to say',
      'English glosses stay visible by default',
      'One question per mission, nothing more',
    ],
  },
  intermediate: {
    title: 'Intermediate',
    headline: 'You can order — now improvise',
    blurb:
      'You manage the predictable parts. The gap is what happens when the answer goes off script, so that is where we point you.',
    startsWith: 'make-life-happen',
    traits: [
      'Prep adds a follow-up question to every exchange',
      'Try hiding the English before you go out',
      'Reflection asks where you switched to English',
    ],
  },
  advanced: {
    title: 'Advanced',
    headline: 'Fluent enough to be social',
    blurb:
      'Transactions are easy. The hard part is turning small talk into people you actually see again — so that is the mission.',
    startsWith: 'meet-your-people',
    traits: [
      'Prep focuses on plans, not phrases',
      'Glosses off, unscripted replies expected',
      'Reflection asks what you could not have prepared',
    ],
  },
};

/** Short tier name for tags and chips. */
export const LEVEL_LABEL: Record<Level, string> = {
  beginner: LEVEL_SUMMARY.beginner.title,
  intermediate: LEVEL_SUMMARY.intermediate.title,
  advanced: LEVEL_SUMMARY.advanced.title,
};

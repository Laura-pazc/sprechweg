export type Level = 'beginner' | 'intermediate' | 'advanced';

export type MissionStatus = 'not_started' | 'in_progress' | 'done';

export type MissionAccent = 'sky' | 'coral' | 'magenta';

export type MissionIcon = 'compass' | 'utensils' | 'users';

export interface VocabItem {
  id: string;
  de: string;
  en: string;
  note: string;
}

export interface ConversationLine {
  id: string;
  speaker: 'partner' | 'you';
  de: string;
  en: string;
}

export interface MultipleChoiceQuestion {
  id: string;
  kind: 'multiple-choice';
  prompt: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export interface FillBlankQuestion {
  id: string;
  kind: 'fill-blank';
  prompt: string;
  sentence: string;
  answer: string;
  alternatives: string[];
  explanation: string;
}

export interface WriteSentenceQuestion {
  id: string;
  kind: 'write-sentence';
  prompt: string;
  mustInclude: string[];
  sample: string;
  explanation: string;
}

export type PracticeQuestion = MultipleChoiceQuestion | FillBlankQuestion | WriteSentenceQuestion;

export interface MissionBadge {
  title: string;
  emoji: string;
  description: string;
}

export interface Mission {
  id: string;
  title: string;
  tagline: string;
  category: string;
  icon: MissionIcon;
  level: Level;
  minutes: number;
  accent: MissionAccent;
  where: string;
  /** What the learner actually does out in the city. */
  realLifeSteps: string[];
  vocab: VocabItem[];
  conversationSimulation: ConversationLine[];
  practiceQuestions: PracticeQuestion[];
  badge: MissionBadge;
  /** Feeds the reflection prompt generator. */
  reflectionFocus: string;
}

export interface JournalEntry {
  id: string;
  /** Null for a free-form daily reflection that is not tied to a mission. */
  missionId: string | null;
  createdAt: string;
  /** Local calendar day, yyyy-mm-dd. Drives the streak. */
  day: string;
  prompts: string[];
  answers: string[];
  quizScore: number;
  quizTotal: number;
}

export interface RecallQuestion {
  id: string;
  de: string;
  options: string[];
  answerIndex: number;
}

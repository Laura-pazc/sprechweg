export type Level = 'beginner' | 'intermediate' | 'advanced';

/** Exact CEFR bands currently supported by smart mission generation. */
export type CefrLevel = 'A1' | 'A2' | 'B1' | 'B2';

export type MissionRegister = 'practical' | 'bureaucratic' | 'friendly' | 'formal';

export type MissionStatus = 'not_started' | 'in_progress' | 'done';

export type MissionAccent = 'sky' | 'coral' | 'magenta';

export type MissionIcon = 'compass' | 'utensils' | 'users' | 'leaf';

export type MissionSeason = 'autumn';

export interface VocabItem {
  id: string;
  de: string;
  en: string;
  note: string;
  /** The full sentence that gives the item useful context. */
  exampleDe?: string;
  exampleEn?: string;
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

export interface GoDeeper {
  /** A search prompt for trusted, human-made German learning material. */
  reinforcement: string;
  /** One practical detail that helps the learner carry out this specific errand. */
  missionSpecific: string;
}

export interface TimeToExplore {
  intro: string;
  checklist: string[];
}

export interface MissionRecallCheck {
  intro: string;
  multipleChoice: MultipleChoiceQuestion;
  fillBlank: FillBlankQuestion;
  fromRealLife: {
    id: string;
    prompt: string;
  };
}

export interface Mission {
  id: string;
  title: string;
  tagline: string;
  category: string;
  icon: MissionIcon;
  /** Optional seasonal presentation used by the shared mission card. */
  season?: MissionSeason;
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
  /** Present on missions created with the full mission schema. */
  cefrLevel?: CefrLevel;
  register?: MissionRegister;
  goDeeper?: GoDeeper;
  timeToExplore?: TimeToExplore;
  /** Exactly two prompts about the learner's real experience. */
  journalPrompts?: [string, string];
  /** A light post-mission check: choice, fill-in, then real-life recall. */
  recallCheck?: MissionRecallCheck;
  /** The next concrete grammar or pragmatic step for this same situation. */
  levelUp?: string;
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
  /** Optional answers from the full-schema recall check. */
  recallAnswers?: string[];
}

export interface RecallQuestion {
  id: string;
  de: string;
  options: string[];
  answerIndex: number;
}

export interface Location {
  latitude: number;
  longitude: number;
  address: string;
  walkingDistanceMeters?: number;
}

export interface PracticeSuggestion {
  id: string;
  title: string;
  category: string;
  vocabConnection: string[];
  description: string;
  tips: string[];
  difficulty: Level;
  location?: Location;
}

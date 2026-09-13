import type {
  ConversationLine,
  Level,
  Mission,
  MissionAccent,
  MissionIcon,
  MissionSeason,
} from '@/lib/types';

type VocabPair = readonly [de: string, en: string];

type DialogueLine = readonly [speaker: 'you' | 'partner', de: string, en: string];

interface ScenarioMissionInput {
  id: string;
  title: string;
  tagline: string;
  category: string;
  icon: MissionIcon;
  season?: MissionSeason;
  level: Level;
  minutes: number;
  accent: MissionAccent;
  where: string;
  reflectionFocus: string;
  realLifeSteps: string[];
  vocab: VocabPair[];
  dialogue: DialogueLine[];
  multipleChoice: {
    prompt: string;
    options: string[];
    answerIndex: number;
    explanation: string;
  };
  fillBlank: {
    prompt: string;
    sentence: string;
    answer: string;
    alternatives?: string[];
    explanation: string;
  };
  writeSentence: {
    prompt: string;
    mustInclude: string[];
    sample: string;
    explanation: string;
  };
  badge: Mission['badge'];
}

export function createScenarioMission(input: ScenarioMissionInput): Mission {
  return {
    id: input.id,
    title: input.title,
    tagline: input.tagline,
    category: input.category,
    icon: input.icon,
    season: input.season,
    level: input.level,
    minutes: input.minutes,
    accent: input.accent,
    where: input.where,
    reflectionFocus: input.reflectionFocus,
    realLifeSteps: input.realLifeSteps,
    vocab: input.vocab.map(([de, en], index) => ({
      id: `${input.id}-v${index + 1}`,
      de,
      en,
      note: 'Say it aloud, then use it in the conversation practice.',
    })),
    conversationSimulation: input.dialogue.map<ConversationLine>(([speaker, de, en], index) => ({
      id: `${input.id}-c${index + 1}`,
      speaker,
      de,
      en,
    })),
    practiceQuestions: [
      { id: `${input.id}-q1`, kind: 'multiple-choice', ...input.multipleChoice },
      {
        id: `${input.id}-q2`,
        kind: 'fill-blank',
        alternatives: [],
        ...input.fillBlank,
      },
      { id: `${input.id}-q3`, kind: 'write-sentence', ...input.writeSentence },
    ],
    badge: input.badge,
  };
}

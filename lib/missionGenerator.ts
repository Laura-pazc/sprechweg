import type {
  CefrLevel,
  Mission,
  MissionAccent,
  MissionIcon,
  MissionRegister,
  VocabItem,
} from '@/lib/types';

export interface SmartMissionRequest {
  scenario: string;
  register: MissionRegister;
  cefrLevel: CefrLevel;
}

interface DemoPattern {
  vocab: Omit<VocabItem, 'id'>[];
  conversation: Array<{ speaker: 'partner' | 'you'; de: string; en: string }>;
}

const FORMAL_PATTERN: DemoPattern = {
  vocab: [
    {
      de: 'Guten Tag',
      en: 'Good day',
      note: 'A polite opening.',
      exampleDe: 'Guten Tag, ich habe eine Frage.',
      exampleEn: 'Good day, I have a question.',
    },
    {
      de: 'Ich habe eine Frage',
      en: 'I have a question',
      note: 'A simple way to begin.',
      exampleDe: 'Ich habe eine Frage zu diesem Angebot.',
      exampleEn: 'I have a question about this offer.',
    },
    {
      de: 'Könnten Sie mir helfen?',
      en: 'Could you help me?',
      note: 'Use Sie in a formal situation.',
      exampleDe: 'Könnten Sie mir helfen, bitte?',
      exampleEn: 'Could you help me, please?',
    },
    {
      de: 'der Termin',
      en: 'appointment',
      note: 'Useful for bookings and offices.',
      exampleDe: 'Ich brauche einen Termin.',
      exampleEn: 'I need an appointment.',
    },
    {
      de: 'die Anmeldung',
      en: 'registration',
      note: 'For signing up.',
      exampleDe: 'Wo ist die Anmeldung?',
      exampleEn: 'Where is the registration?',
    },
    {
      de: 'das Formular',
      en: 'form',
      note: 'For official paperwork.',
      exampleDe: 'Muss ich dieses Formular ausfüllen?',
      exampleEn: 'Do I need to fill out this form?',
    },
    {
      de: 'Wo finde ich ...?',
      en: 'Where can I find …?',
      note: 'Use it to ask for the next step.',
      exampleDe: 'Wo finde ich die Anmeldung?',
      exampleEn: 'Where can I find the registration?',
    },
    {
      de: 'Vielen Dank für Ihre Hilfe',
      en: 'Thank you very much for your help',
      note: 'A polite closing.',
      exampleDe: 'Vielen Dank für Ihre Hilfe.',
      exampleEn: 'Thank you very much for your help.',
    },
  ],
  conversation: [
    { speaker: 'you', de: 'Guten Tag. Ich habe eine Frage.', en: 'Good day. I have a question.' },
    {
      speaker: 'partner',
      de: 'Guten Tag. Natürlich. Worum geht es?',
      en: 'Good day. Of course. What is it about?',
    },
    {
      speaker: 'you',
      de: 'Könnten Sie mir helfen? Ich brauche einen Termin.',
      en: 'Could you help me? I need an appointment.',
    },
    {
      speaker: 'partner',
      de: 'Ja. Die Anmeldung ist gleich dort vorne.',
      en: 'Yes. Registration is right up there.',
    },
    {
      speaker: 'you',
      de: 'Wo finde ich das Formular?',
      en: 'Where can I find the form?',
    },
    {
      speaker: 'partner',
      de: 'Das Formular bekommen Sie an der Anmeldung.',
      en: 'You can get the form at registration.',
    },
    {
      speaker: 'you',
      de: 'Vielen Dank für Ihre Hilfe.',
      en: 'Thank you very much for your help.',
    },
  ],
};

const FRIENDLY_PATTERN: DemoPattern = {
  vocab: [
    {
      de: 'Hallo!',
      en: 'Hi!',
      note: 'A warm, simple opening.',
      exampleDe: 'Hallo! Ich bin neu hier.',
      exampleEn: 'Hi! I am new here.',
    },
    {
      de: 'Ich bin neu hier',
      en: 'I am new here',
      note: 'An easy conversation starter.',
      exampleDe: 'Ich bin neu hier in Hamburg.',
      exampleEn: 'I am new here in Hamburg.',
    },
    {
      de: 'Ist hier noch frei?',
      en: 'Is this seat free?',
      note: 'Useful when joining a group.',
      exampleDe: 'Entschuldigung, ist hier noch frei?',
      exampleEn: 'Excuse me, is this seat free?',
    },
    {
      de: 'Hast du kurz Zeit?',
      en: 'Do you have a moment?',
      note: 'A relaxed way to ask.',
      exampleDe: 'Hast du kurz Zeit für eine Frage?',
      exampleEn: 'Do you have a moment for a question?',
    },
    {
      de: 'Ich würde gern mitmachen',
      en: 'I would like to join in',
      note: 'For groups, classes, and activities.',
      exampleDe: 'Ich würde gern mitmachen.',
      exampleEn: 'I would like to join in.',
    },
    {
      de: 'Wann trefft ihr euch?',
      en: 'When do you all meet?',
      note: 'Use ihr with a group of peers.',
      exampleDe: 'Wann trefft ihr euch wieder?',
      exampleEn: 'When do you all meet again?',
    },
    {
      de: 'Das klingt gut',
      en: 'That sounds good',
      note: 'A natural positive response.',
      exampleDe: 'Das klingt gut für mich.',
      exampleEn: 'That sounds good to me.',
    },
    {
      de: 'Danke, bis dann!',
      en: 'Thanks, see you then!',
      note: 'A friendly goodbye.',
      exampleDe: 'Danke, bis dann!',
      exampleEn: 'Thanks, see you then!',
    },
  ],
  conversation: [
    { speaker: 'you', de: 'Hallo! Ich bin neu hier.', en: 'Hi! I am new here.' },
    { speaker: 'partner', de: 'Hallo! Schön, dass du da bist.', en: 'Hi! Nice that you are here.' },
    { speaker: 'you', de: 'Ist hier noch frei?', en: 'Is this seat free?' },
    { speaker: 'partner', de: 'Klar, setz dich gern.', en: 'Sure, have a seat.' },
    {
      speaker: 'you',
      de: 'Hast du kurz Zeit? Ich würde gern mitmachen.',
      en: 'Do you have a moment? I would like to join in.',
    },
    {
      speaker: 'partner',
      de: 'Sehr gern. Wann trefft ihr euch? Wir treffen uns jeden Mittwoch.',
      en: 'Gladly. When do you all meet? We meet every Wednesday.',
    },
    {
      speaker: 'you',
      de: 'Das klingt gut. Danke, bis dann!',
      en: 'That sounds good. Thanks, see you then!',
    },
  ],
};

function categoryFor(
  scenario: string,
  register: MissionRegister,
): { category: string; icon: MissionIcon; accent: MissionAccent } {
  const value = scenario.toLocaleLowerCase();
  if (register === 'friendly' || /friend|meet|club|class|group|date|party/.test(value)) {
    return { category: 'Making friends', icon: 'users', accent: 'magenta' };
  }
  if (/job|work|study|university|course|interview|school/.test(value)) {
    return { category: 'Work and study', icon: 'compass', accent: 'sky' };
  }
  if (/bus|train|station|direction|bike|transport/.test(value)) {
    return { category: 'Getting around', icon: 'compass', accent: 'sky' };
  }
  return { category: 'Everyday errands', icon: 'utensils', accent: 'coral' };
}

function titleFromScenario(scenario: string): string {
  const tidy = scenario
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/[.!?]+$/, '');
  const short = tidy.length > 68 ? `${tidy.slice(0, 65).trim()}…` : tidy;
  return short.charAt(0).toLocaleUpperCase() + short.slice(1);
}

function nextLevel(cefrLevel: CefrLevel): string {
  const next: Record<CefrLevel, string> = {
    A1: 'Next time, add one follow-up question with “Wann?” or “Wo?”.',
    A2: 'Next time, explain one short reason with “weil”.',
    B1: 'Next time, make a polite request with “Ich hätte gern …” or “Könnten Sie …?”.',
    B2: 'Next time, explain a preference and ask a follow-up question in the same exchange.',
  };
  return next[cefrLevel];
}

/**
 * Local demo generator for the pitch. It makes a complete mission from the
 * learner's input without a network request. The Supabase/OpenAI function is
 * kept separately for the production integration.
 */
export async function generateSmartMission(request: SmartMissionRequest): Promise<Mission> {
  const scenario = request.scenario.replace(/\s+/g, ' ').trim();
  if (scenario.length < 8) {
    throw new Error('Describe a real situation in a little more detail.');
  }

  await new Promise((resolve) => setTimeout(resolve, 650));

  const basePattern = request.register === 'friendly' ? FRIENDLY_PATTERN : FORMAL_PATTERN;
  const presentation = categoryFor(scenario, request.register);
  const isFriendly = request.register === 'friendly';
  const vocab = basePattern.vocab.map((item, index) => ({ ...item, id: `vocab-${index + 1}` }));
  const conversationSimulation = basePattern.conversation.map((line, index) => ({
    ...line,
    id: `conversation-${index + 1}`,
  }));
  const firstPhrase = vocab[0];
  const secondPhrase = vocab[1];

  return {
    id: `demo-mission-${Date.now()}`,
    title: titleFromScenario(scenario),
    tagline: `A real-life German mission for: ${scenario}`,
    category: presentation.category,
    icon: presentation.icon,
    accent: presentation.accent,
    level: request.cefrLevel === 'A1' || request.cefrLevel === 'A2' ? 'beginner' : 'intermediate',
    cefrLevel: request.cefrLevel,
    register: request.register,
    minutes: 30,
    where: 'A real place in Hamburg that fits your plan.',
    realLifeSteps: [
      `Choose one place where you can ${scenario.toLocaleLowerCase()}.`,
      'Start with one prepared German sentence.',
      'Ask one follow-up question, then note what happened.',
    ],
    vocab,
    conversationSimulation,
    practiceQuestions: [
      {
        id: 'prep-choice',
        kind: 'multiple-choice',
        prompt: `Which phrase can open this ${isFriendly ? 'friendly' : 'formal'} conversation?`,
        options: [firstPhrase.de, 'Ich spreche kein Deutsch.', 'Keine Ahnung.'],
        answerIndex: 0,
        explanation: `${firstPhrase.de} is a useful opening for this conversation.`,
      },
      {
        id: 'prep-fill',
        kind: 'fill-blank',
        prompt: 'Complete the phrase.',
        sentence: `${secondPhrase.de.replace(/\.$/, '')} ...`,
        answer: secondPhrase.de,
        alternatives: [],
        explanation: `Use “${secondPhrase.de}” when you need a simple next step.`,
      },
      {
        id: 'prep-write',
        kind: 'write-sentence',
        prompt: 'Write one sentence you want to use today.',
        mustInclude: [firstPhrase.de.split(' ')[0]],
        sample: firstPhrase.exampleDe ?? firstPhrase.de,
        explanation: 'Keep it short enough to say out loud.',
      },
    ],
    badge: {
      title: 'Made it happen',
      emoji: isFriendly ? '🤝' : '🧭',
      description: 'You took one German sentence into the real world.',
    },
    reflectionFocus: scenario.toLocaleLowerCase(),
    goDeeper: {
      reinforcement: `Search YouTube for “${scenario} Deutsch” and prefer Easy German or Goethe-Institut material.`,
      missionSpecific: `Before you go, check the official website or ask the place directly about the next step for ${scenario.toLocaleLowerCase()}.`,
    },
    timeToExplore: {
      intro: 'You are ready. Take your first sentence with you, then go.',
      checklist: ['Adresse prüfen', 'Öffnungszeiten prüfen', 'Ersten Satz laut sagen'],
    },
    journalPrompts: [
      `What actually happened when you tried to ${scenario.toLocaleLowerCase()}?`,
      'Which German word or phrase did you use, hear, or wish you had used?',
    ],
    recallCheck: {
      intro: 'A quick check now that you have been out there.',
      multipleChoice: {
        id: 'recall-choice',
        kind: 'multiple-choice',
        prompt: `Which phrase from today means “${firstPhrase.en}”?`,
        options: [firstPhrase.de, vocab[2].de, vocab[4].de],
        answerIndex: 0,
        explanation: `${firstPhrase.de} means “${firstPhrase.en}”.`,
      },
      fillBlank: {
        id: 'recall-fill',
        kind: 'fill-blank',
        prompt: 'Write the phrase you want to remember most.',
        sentence: 'Heute sage ich: ________',
        answer: secondPhrase.de,
        alternatives: [],
        explanation: `One useful option is “${secondPhrase.de}”.`,
      },
      fromRealLife: {
        id: 'recall-real-life',
        prompt: 'What is one German word or phrase you actually said or heard today?',
      },
    },
    levelUp: nextLevel(request.cefrLevel),
  };
}

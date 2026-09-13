import type { Mission } from '@/lib/types';
import { createScenarioMission } from '../createScenarioMission';

export const mushroomForagingB1: Mission = createScenarioMission({
  id: 'mushroom-foraging-b1',
  title: 'Mushroom Foraging',
  tagline: 'Forage safely and discuss the forest with confidence.',
  category: 'Autumn',
  icon: 'leaf',
  season: 'autumn',
  level: 'advanced',
  minutes: 30,
  accent: 'sky',
  where: 'A guided foraging walk with a qualified local expert.',
  reflectionFocus: 'ask safety questions on a guided nature walk',
  realLifeSteps: [
    'Only join a qualified guided walk.',
    'Bring a basket and suitable clothing.',
    'Ask before touching or collecting anything.',
    'Repeat the safety rule aloud.',
    'Leave every unidentified mushroom in place.',
  ],
  vocab: [
    ['der Pilz / die Pilze', 'mushroom / mushrooms'],
    ['der Wald', 'forest'],
    ['der Korb', 'basket'],
    ['giftig / essbar', 'poisonous / edible'],
    ['sammeln / pflücken', 'to collect / pick'],
    ['der Herbst', 'autumn / fall'],
    ['Dieser Pilz ist essbar, ja?', 'This mushroom is edible, yes?'],
    ['Wir sollten nur die bekannten Pilze nehmen.', 'We should only take mushrooms we know.'],
  ],
  dialogue: [
    [
      'partner',
      'Heute gehen wir Pilze sammeln im Wald. Du brauchst einen Korb.',
      'Today we are mushroom foraging in the forest. You need a basket.',
    ],
    ['you', 'Dieser Pilz ist essbar, ja?', 'This mushroom is edible, right?'],
    [
      'partner',
      'Nein, das ist ein Fliegenpilz — sehr giftig!',
      'No, that is a fly agaric — very poisonous!',
    ],
    ['you', 'Wie viele Pilze sollen wir pflücken?', 'How many mushrooms should we pick?'],
    [
      'partner',
      'Wir sollten nur die bekannten Pilze nehmen.',
      'We should only take mushrooms we know.',
    ],
    [
      'you',
      'Das ist wichtig. Der Wald ist schön im Herbst.',
      'That is important. The forest is beautiful in autumn.',
    ],
    ['partner', 'Ja, aber Sicherheit kommt zuerst.', 'Yes, but safety comes first.'],
    ['you', 'Unbekannte Pilze lasse ich stehen.', 'I leave unknown mushrooms alone.'],
  ],
  multipleChoice: {
    prompt: 'Welcher Pilz ist giftig?',
    options: ['Champignon', 'Fliegenpilz', 'Pfifferling'],
    answerIndex: 1,
    explanation: 'The guide identifies the fly agaric as poisonous.',
  },
  fillBlank: {
    prompt: 'Complete the location.',
    sentence: 'Im Herbst gehen viele Menschen in den ___.',
    answer: 'Wald',
    explanation: '„In den Wald“ uses the accusative after movement.',
  },
  writeSentence: {
    prompt: 'Write the safety rule.',
    mustInclude: ['Wald'],
    sample: 'Im Wald sammle ich nur Pilze mit einer Fachperson.',
    explanation: 'Never rely on language practice to identify edible mushrooms.',
  },
  badge: {
    title: 'Wald-Wach',
    emoji: '🍄',
    description: 'Asked clear safety questions on a guided walk.',
  },
});

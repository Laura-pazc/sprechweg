import type { Mission } from '@/lib/types';
import { createScenarioMission } from '../createScenarioMission';

export const apartmentEmergencyB1: Mission = createScenarioMission({
  id: 'apartment-emergency-b1',
  title: 'Apartment emergency',
  tagline: 'Report urgent damage clearly to your landlord.',
  category: 'Everyday errands',
  icon: 'compass',
  level: 'intermediate',
  minutes: 20,
  accent: 'magenta',
  where: 'At home, by phone with your landlord or building manager.',
  reflectionFocus: 'report an urgent apartment problem',
  realLifeSteps: [
    'Move away from immediate danger.',
    'Call the landlord or emergency contact.',
    'State your name and apartment number.',
    'Describe the damage and urgency.',
    'Confirm who is coming and when.',
  ],
  vocab: [
    ['das Problem / der Schaden', 'problem / damage'],
    ['die Heizung', 'heating'],
    ['das Rohr / das Wasser', 'pipe / water'],
    ['lecken / tropfen', 'to leak / drip'],
    ['der Vermieter', 'landlord'],
    ['sofort / dringend', 'immediately / urgent'],
    ['Das Wasser kommt aus der Decke!', 'Water is coming from the ceiling!'],
    ['Es ist ein Notfall.', 'It is an emergency.'],
  ],
  dialogue: [
    [
      'you',
      'Ich bin Sam aus der Wohnung 3B. Es ist ein Notfall.',
      "I'm Sam from apartment 3B. It's an emergency.",
    ],
    ['partner', 'Was ist das Problem?', 'What is the problem?'],
    [
      'you',
      'Das Wasser tropft von der Decke und es wird schlimmer.',
      'Water is dripping from the ceiling and getting worse.',
    ],
    ['partner', 'Haben Sie das Wasser ausgemacht?', 'Have you turned off the water?'],
    [
      'you',
      'Ich weiß nicht, wo der Hauptschalter ist. Können Sie sofort kommen?',
      "I don't know where the main switch is. Can you come immediately?",
    ],
    ['partner', 'Ich rufe direkt den Handwerker an.', "I'll call the technician immediately."],
    ['you', 'Wie lange braucht der Handwerker?', 'How long will the technician take?'],
    [
      'partner',
      'Er kommt in einer Stunde. Bleiben Sie zu Hause.',
      'He will arrive in one hour. Stay at home.',
    ],
  ],
  multipleChoice: {
    prompt: 'Welches Problem hat die Wohnung?',
    options: ['Das Fenster ist kaputt', 'Wasser tropft von der Decke', 'Das Licht ist aus'],
    answerIndex: 1,
    explanation: 'The caller reports water dripping from the ceiling.',
  },
  fillBlank: {
    prompt: 'Make the urgency clear.',
    sentence: 'Es ist ein ___.',
    answer: 'Notfall',
    explanation: '„Notfall“ signals that immediate action is needed.',
  },
  writeSentence: {
    prompt: 'Describe urgent damage.',
    mustInclude: ['Schaden'],
    sample: 'Der Schaden wird größer und ich brauche sofort Hilfe.',
    explanation: 'Name the damage and the urgency clearly.',
  },
  badge: {
    title: 'Notfall-Klar',
    emoji: '🔧',
    description: 'Reported an urgent housing problem clearly.',
  },
});

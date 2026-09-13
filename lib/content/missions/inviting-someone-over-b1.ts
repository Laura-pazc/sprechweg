import type { Mission } from '@/lib/types';
import { createScenarioMission } from '../createScenarioMission';

export const invitingSomeoneOverB1: Mission = createScenarioMission({
  id: 'inviting-someone-over-b1',
  title: 'Host at home',
  tagline: 'Make an invitation and plan food safely.',
  category: 'Making friends',
  icon: 'users',
  level: 'intermediate',
  minutes: 20,
  accent: 'sky',
  where: 'Your home, while inviting a friend by message or in person.',
  reflectionFocus: 'invite someone over and plan the meal',
  realLifeSteps: [
    'Choose a clear day and time.',
    'Invite one person directly.',
    'Say what you plan to cook.',
    'Ask about allergies or dietary needs.',
    'Confirm what they should bring.',
  ],
  vocab: [
    ['einladen / die Einladung', 'to invite / invitation'],
    ['das Essen / kochen', 'food / to cook'],
    ['die Allergie', 'allergy'],
    ['die Vorspeise / der Hauptgang', 'appetizer / main course'],
    ['gemütlich', 'cozy / comfortable'],
    ['um … Uhr', 'at … o’clock'],
    [
      'Möchtest du Freitag zu mir nach Hause kommen?',
      'Would you like to come to my place on Friday?',
    ],
    ['Ich koche gerne für dich.', 'I like to cook for you.'],
  ],
  dialogue: [
    [
      'you',
      'Möchtest du Freitag zu mir nach Hause kommen?',
      'Would you like to come to my place on Friday?',
    ],
    ['partner', 'Das klingt wunderbar! Um wie viel Uhr?', 'That sounds wonderful! What time?'],
    ['you', 'Um 19 Uhr. Ich koche gerne für dich.', 'At 7 p.m. I like to cook for you.'],
    [
      'partner',
      'Ich bringe Wein mit. Ich habe eine Allergie gegen Nüsse.',
      "I'll bring wine. I have a nut allergy.",
    ],
    [
      'you',
      'Keine Sorge! Meine Pasta-Soße hat keine Nüsse.',
      'No problem! My pasta sauce has no nuts.',
    ],
    ['partner', 'Das klingt gemütlich und köstlich!', 'That sounds cosy and delicious!'],
    ['you', 'Du musst nur gute Laune mitbringen.', 'You only need to bring a good mood.'],
    ['partner', 'Ich freue mich schon. Bis Freitag!', "I'm looking forward to it. See you Friday!"],
  ],
  multipleChoice: {
    prompt: 'Was kocht die Person?',
    options: ['Fisch', 'Pasta', 'Fleisch'],
    answerIndex: 1,
    explanation: 'The host says they will make pasta.',
  },
  fillBlank: {
    prompt: 'Complete the allergy statement.',
    sentence: 'Ich habe eine Allergie gegen ___.',
    answer: 'Nüsse',
    explanation: 'The guest clearly names a nut allergy.',
  },
  writeSentence: {
    prompt: 'Write what you would cook for a friend.',
    mustInclude: ['kochen'],
    sample: 'Ich möchte für meinen Freund Pasta kochen.',
    explanation: 'Say who you are cooking for and what you will make.',
  },
  badge: {
    title: 'Gastgeber',
    emoji: '🍝',
    description: 'Planned a friendly, safe meal in German.',
  },
});

import type { Mission } from '@/lib/types';
import { createScenarioMission } from '../createScenarioMission';

export const furnitureShoppingB1: Mission = createScenarioMission({
  id: 'furniture-shopping-b1',
  title: 'Furniture shopping',
  tagline: 'Compare size, price, and style with a friend.',
  category: 'Everyday errands',
  icon: 'compass',
  level: 'intermediate',
  minutes: 20,
  accent: 'magenta',
  where: 'A furniture store or second-hand shop in Hamburg.',
  reflectionFocus: 'compare furniture and make a choice in German',
  realLifeSteps: [
    'Measure your room before leaving.',
    'Ask whether an item will fit.',
    'Check the dimensions and price.',
    'Compare practical and visual details.',
    'Confirm transport or delivery.',
  ],
  vocab: [
    ['das Möbel / der Schrank', 'furniture / cabinet'],
    ['der Platz / der Raum', 'space / room'],
    ['das Regal', 'shelf'],
    ['praktisch / schön', 'practical / beautiful'],
    ['passen / zusammenpassen', 'to fit / match'],
    ['der Preis', 'price'],
    ['Passt das in dein Zimmer?', 'Will that fit in your room?'],
    ['Das passt perfekt zu deiner Einrichtung!', 'That matches your interior perfectly!'],
  ],
  dialogue: [
    ['partner', 'Dieser Schrank ist sehr praktisch.', 'This cabinet is very practical.'],
    [
      'you',
      'Passt das in mein Zimmer? Mein Raum ist nicht groß.',
      'Will that fit in my room? My room is not large.',
    ],
    [
      'partner',
      'Der Schrank ist zwei Meter breit. Das sollte passen.',
      'The cabinet is two metres wide. It should fit.',
    ],
    ['you', 'Und wie viel kostet das?', 'And how much does it cost?'],
    [
      'partner',
      '199 Euro. Dieses Regal passt perfekt zu deiner Einrichtung.',
      '199 euros. This shelf matches your interior perfectly.',
    ],
    ['you', 'Das Design ist modern. Das gefällt mir.', 'The design is modern. I like it.'],
    [
      'partner',
      'Am Wochenende können wir es zusammen aufbauen.',
      'We can assemble it together at the weekend.',
    ],
    [
      'you',
      'Perfekt! Dann wird die Wohnung schön und praktisch.',
      'Perfect! Then the apartment will be beautiful and practical.',
    ],
  ],
  multipleChoice: {
    prompt: 'Wie breit ist der Schrank?',
    options: ['Ein Meter', 'Eineinhalb Meter', 'Zwei Meter'],
    answerIndex: 2,
    explanation: 'The cabinet is two metres wide.',
  },
  fillBlank: {
    prompt: 'Complete the price.',
    sentence: 'Der Schrank kostet ___ Euro.',
    answer: '199',
    explanation: 'The price given in the conversation is 199 euros.',
  },
  writeSentence: {
    prompt: 'Write about furnishing your home.',
    mustInclude: ['Einrichtung'],
    sample: 'Das Regal passt gut zu meiner Einrichtung.',
    explanation: 'Use „passen zu“ to describe a match.',
  },
  badge: {
    title: 'Einrichtungs-Profi',
    emoji: '🪑',
    description: 'Compared furniture and made a choice in German.',
  },
});

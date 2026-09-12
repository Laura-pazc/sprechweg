import type { Mission } from '@/lib/types';
import { createScenarioMission } from '../createScenarioMission';

export const restaurantReservationB1: Mission = createScenarioMission({
  id: 'restaurant-reservation-b1',
  title: 'Restaurant reservation',
  tagline: 'Reserve a table and explain dietary needs.',
  category: 'Everyday errands',
  icon: 'utensils',
  level: 'intermediate',
  minutes: 20,
  accent: 'magenta',
  where: 'A Hamburg restaurant by phone or in person.',
  reflectionFocus: 'reserve a table and ask about the menu',
  realLifeSteps: [
    'Choose a restaurant and time.',
    'Reserve for a specific number of people.',
    'Give your name clearly.',
    'Ask about a specialty or vegetarian option.',
    'State any allergy directly.',
  ],
  vocab: [
    ['der Tisch', 'table'],
    ['die Reservierung / der Platz', 'reservation / place'],
    ['das Menü / die Speisekarte', 'menu'],
    ['die Spezialität', 'specialty dish'],
    ['die Zutat', 'ingredient'],
    ['vegetarisch / vegan', 'vegetarian / vegan'],
    ['Haben Sie noch einen Tisch für heute Abend?', 'Do you have a table for tonight?'],
    ['Ich bin allergisch gegen …', 'I am allergic to …'],
  ],
  dialogue: [
    [
      'partner',
      'Guten Abend! Haben Sie eine Reservierung?',
      'Good evening! Do you have a reservation?',
    ],
    [
      'you',
      'Ja, unter dem Namen Sam. Für zwei Personen um 19 Uhr.',
      'Yes, under Sam. For two people at 7 p.m.',
    ],
    ['partner', 'Hier ist Ihr Tisch.', 'Here is your table.'],
    ['you', 'Können Sie uns die Speisekarte bringen?', 'Can you bring us the menu?'],
    [
      'partner',
      'Selbstverständlich. Was möchten Sie trinken?',
      'Of course. What would you like to drink?',
    ],
    ['you', 'Was ist die Spezialität des Hauses?', 'What is the house speciality?'],
    ['partner', 'Unsere Spezialität ist der Fisch.', 'Our speciality is fish.'],
    ['you', 'Haben Sie auch vegetarische Optionen?', 'Do you also have vegetarian options?'],
  ],
  multipleChoice: {
    prompt: 'Was ist die Spezialität?',
    options: ['Fisch', 'Fleisch', 'Pasta'],
    answerIndex: 0,
    explanation: 'The server says the house speciality is fish.',
  },
  fillBlank: {
    prompt: 'Complete the reservation request.',
    sentence: 'Ich möchte einen Tisch für zwei Personen ___.',
    answer: 'reservieren',
    explanation: '„Einen Tisch reservieren“ is the standard phrase.',
  },
  writeSentence: {
    prompt: 'Write a reservation request.',
    mustInclude: ['Reservierung'],
    sample: 'Ich möchte eine Reservierung für Freitag um 19 Uhr machen.',
    explanation: 'Include the day, time, and group size.',
  },
  badge: {
    title: 'Tisch-Sicher',
    emoji: '🍽️',
    description: 'Reserved a table and asked about food in German.',
  },
});

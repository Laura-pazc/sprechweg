import type { Mission } from '@/lib/types';
import { createScenarioMission } from '../createScenarioMission';

export const farmersMarketMastery: Mission = createScenarioMission({
  id: 'farmers-market-mastery',
  title: "Farmers' Market Mastery",
  tagline: 'Navigate a seasonal market and make thoughtful buying decisions.',
  category: 'Autumn',
  icon: 'leaf',
  season: 'autumn',
  level: 'advanced',
  minutes: 30,
  accent: 'magenta',
  where: 'A weekly farmers’ market or regional produce stall.',
  reflectionFocus: 'compare seasonal produce, negotiate quantities, and ask about growing methods',
  realLifeSteps: [
    'Visit a weekly market and identify three seasonal products.',
    'Ask a vendor where one product was grown.',
    'Compare price, quality, and intended use.',
    'Request a specific quantity without using English.',
    'Confirm the total and thank the vendor.',
  ],
  vocab: [
    ['der Wochenmarkt', 'weekly market'],
    ['saisonal', 'seasonal'],
    ['regional angebaut', 'regionally grown'],
    ['das Bund', 'bunch / bundle'],
    ['die Schale', 'punnet / tray'],
    ['unbehandelt', 'untreated'],
    ['Was empfehlen Sie zum Einlegen?', 'What do you recommend for pickling?'],
    ['Könnten Sie mir beim Preis etwas entgegenkommen?', 'Could you meet me partway on the price?'],
  ],
  dialogue: [
    [
      'partner',
      'Guten Morgen. Suchen Sie etwas Bestimmtes?',
      'Good morning. Are you looking for anything specific?',
    ],
    [
      'you',
      'Welche Ihrer Sorten sind gerade saisonal und regional angebaut?',
      'Which of your varieties are currently seasonal and regionally grown?',
    ],
    [
      'partner',
      'Der Kürbis und die Äpfel kommen direkt aus dem Alten Land.',
      'The squash and apples come directly from the Altes Land region.',
    ],
    ['you', 'Was empfehlen Sie zum Einlegen?', 'What do you recommend for pickling?'],
    [
      'partner',
      'Diese kleinen Gurken sind fest und unbehandelt.',
      'These small cucumbers are firm and untreated.',
    ],
    [
      'you',
      'Ich nehme zwei Schalen. Könnten Sie mir beim Preis etwas entgegenkommen?',
      'I will take two punnets. Could you meet me partway on the price?',
    ],
    [
      'partner',
      'Bei zwei Schalen kann ich Ihnen fünfzig Cent nachlassen.',
      'For two punnets I can give you fifty cents off.',
    ],
    ['you', 'Einverstanden. Wie viel macht das insgesamt?', 'Agreed. How much is that altogether?'],
  ],
  multipleChoice: {
    prompt: 'Welche Ware eignet sich laut Verkäufer zum Einlegen?',
    options: ['Kleine Gurken', 'Äpfel', 'Kürbis'],
    answerIndex: 0,
    explanation: 'The vendor recommends the small, firm cucumbers for pickling.',
  },
  fillBlank: {
    prompt: 'Complete the quantity.',
    sentence: 'Ich nehme zwei ___ Gurken.',
    answer: 'Schalen',
    alternatives: ['Schale'],
    explanation: 'After „zwei“, the plural of „die Schale“ is „Schalen“.',
  },
  writeSentence: {
    prompt: 'Ask whether a product is seasonal and regionally grown.',
    mustInclude: ['saisonal', 'regional'],
    sample: 'Ist dieses Gemüse saisonal und regional angebaut?',
    explanation: 'Use both adjectives to ask a precise sourcing question.',
  },
  badge: {
    title: 'Markt-Profi',
    emoji: '🌾',
    description: 'Compared seasonal produce and completed a market purchase in German.',
  },
});

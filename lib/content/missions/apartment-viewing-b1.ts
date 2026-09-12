import type { Mission } from '@/lib/types';
import { createScenarioMission } from '../createScenarioMission';

export const apartmentViewingB1: Mission = createScenarioMission({
  id: 'apartment-viewing-b1',
  title: 'Apartment viewing',
  tagline: 'Ask about rent, costs, and move-in dates.',
  category: 'Everyday errands',
  icon: 'compass',
  level: 'intermediate',
  minutes: 25,
  accent: 'coral',
  where: 'An apartment viewing in Hamburg.',
  reflectionFocus: 'ask detailed questions at an apartment viewing',
  realLifeSteps: [
    'Confirm the viewing address and time.',
    'Ask the monthly rent.',
    'Ask what the additional costs include.',
    'Clarify the deposit and furnishing.',
    'Confirm the earliest move-in date.',
  ],
  vocab: [
    ['die Wohnung', 'apartment'],
    ['die Miete', 'rent'],
    ['der Makler', 'real estate agent'],
    ['die Nebenkosten', 'utilities / additional costs'],
    ['die Kaution', 'security deposit'],
    ['möbliert / unmöbliert', 'furnished / unfurnished'],
    ['Wann können Sie einziehen?', 'When can you move in?'],
    ['Welche Bedingungen gelten für die Kaution?', 'What are the deposit terms?'],
  ],
  dialogue: [
    [
      'partner',
      'Das ist die Wohnung. Gefällt sie Ihnen?',
      'This is the apartment. Do you like it?',
    ],
    ['you', 'Ja. Wie hoch ist die Miete pro Monat?', 'Yes. How much is the monthly rent?'],
    [
      'partner',
      'Die Miete beträgt 1200 Euro, die Nebenkosten 150 Euro.',
      'The rent is 1200 euros and utilities are 150.',
    ],
    ['you', 'Was sind die Bedingungen für die Kaution?', 'What are the deposit terms?'],
    ['partner', 'Die Kaution ist drei Monatsmieten.', "The deposit is three months' rent."],
    [
      'you',
      'Wann könnte ich einziehen? Ist die Wohnung möbliert?',
      'When could I move in? Is it furnished?',
    ],
    [
      'partner',
      'Ab nächstem Monat. Die Wohnung ist unmöbliert.',
      'From next month. The apartment is unfurnished.',
    ],
    ['you', 'Kann ich die anderen Zimmer sehen?', 'Can I see the other rooms?'],
  ],
  multipleChoice: {
    prompt: 'Wie hoch ist die Kaution?',
    options: ['1200 Euro', '1350 Euro', '3600 Euro'],
    answerIndex: 2,
    explanation: 'Three months at 1200 euros equals 3600 euros.',
  },
  fillBlank: {
    prompt: 'Complete the rent statement.',
    sentence: 'Die Miete beträgt ___ Euro pro Monat.',
    answer: '1200',
    alternatives: ['1.200'],
    explanation: '„Beträgt“ is common in formal price statements.',
  },
  writeSentence: {
    prompt: 'Write one question about an apartment.',
    mustInclude: ['Wohnung'],
    sample: 'Ab wann ist die Wohnung verfügbar?',
    explanation: 'Ask about one detail you genuinely need.',
  },
  badge: {
    title: 'Wohnungs-Scout',
    emoji: '🏠',
    description: 'Asked the key questions at an apartment viewing.',
  },
});

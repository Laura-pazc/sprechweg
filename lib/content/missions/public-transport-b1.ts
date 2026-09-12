import type { Mission } from '@/lib/types';
import { createScenarioMission } from '../createScenarioMission';

export const publicTransportB1: Mission = createScenarioMission({
  id: 'public-transport-b1',
  title: 'Buy a transport ticket',
  tagline: 'Ask about fares, routes, and where to get off.',
  category: 'Getting around',
  icon: 'compass',
  level: 'intermediate',
  minutes: 20,
  accent: 'coral',
  where: 'An HVV service point or staffed station.',
  reflectionFocus: 'plan a public transport journey in German',
  realLifeSteps: [
    'Choose a real destination.',
    'Ask which ticket you need.',
    'Confirm the price and journey time.',
    'Ask whether you must change.',
    'Confirm your final stop.',
  ],
  vocab: [
    ['die Fahrkarte / das Ticket', 'ticket'],
    ['die Haltestelle', 'stop / station'],
    ['der Fahrkartenautomat', 'ticket machine'],
    ['die Linie', 'line / route'],
    ['das Umsteigen', 'transfer / changing trains'],
    ['der Fahrplan', 'timetable / schedule'],
    ['Wie lange dauert die Fahrt?', 'How long does the journey take?'],
    ['Wo muss ich aussteigen?', 'Where do I need to get off?'],
  ],
  dialogue: [
    ['partner', 'Guten Tag! Womit kann ich Ihnen helfen?', 'Hello! How can I help you?'],
    [
      'you',
      'Ich möchte ein Ticket nach Eidelstedt kaufen.',
      'I would like to buy a ticket to Eidelstedt.',
    ],
    ['partner', 'Das Einzelticket kostet 3,10 Euro.', 'The single ticket costs 3.10 euros.'],
    ['you', 'Wie lange dauert die Fahrt?', 'How long does the journey take?'],
    [
      'partner',
      'Etwa 25 Minuten. Sie müssen nicht umsteigen.',
      'About 25 minutes. You do not need to change.',
    ],
    ['you', 'Wo muss ich aussteigen?', 'Where do I need to get off?'],
    [
      'partner',
      'An der Haltestelle Eidelstedt. Der Fahrplan hängt hier.',
      'At Eidelstedt stop. The timetable is here.',
    ],
    ['you', 'Danke für die Informationen!', 'Thank you for the information!'],
  ],
  multipleChoice: {
    prompt: 'Wie lange dauert die Fahrt?',
    options: ['15 Minuten', '25 Minuten', '35 Minuten'],
    answerIndex: 1,
    explanation: 'The journey takes about 25 minutes.',
  },
  fillBlank: {
    prompt: 'Complete the ticket price.',
    sentence: 'Das Einzelticket kostet ___ Euro.',
    answer: '3,10',
    alternatives: ['3.10'],
    explanation: 'German prices use a decimal comma.',
  },
  writeSentence: {
    prompt: 'Write about a Hamburg line you take.',
    mustInclude: ['Linie'],
    sample: 'Ich nehme die Linie U3 bis zur nächsten Haltestelle.',
    explanation: 'Name the line and destination.',
  },
  badge: {
    title: 'HVV-Helfer',
    emoji: '🚇',
    description: 'Planned a Hamburg journey in German.',
  },
});

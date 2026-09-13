import type { Mission } from '@/lib/types';
import { createScenarioMission } from '../createScenarioMission';

export const teamMeetingB1: Mission = createScenarioMission({
  id: 'team-meeting-b1',
  title: 'Work team meeting',
  tagline: 'Ask for clarification and discuss a problem.',
  category: 'Work and study',
  icon: 'users',
  level: 'intermediate',
  minutes: 25,
  accent: 'sky',
  where: 'A team meeting at work or in a practice group.',
  reflectionFocus: 'ask for clarification in a work meeting',
  realLifeSteps: [
    'Read the meeting topic beforehand.',
    'Listen for the project status.',
    'Ask for clarification once.',
    'Restate what you understood.',
    'Volunteer for one clear next step.',
  ],
  vocab: [
    ['das Projekt / die Deadline', 'project / deadline'],
    ['der Fortschritt', 'progress'],
    ['das Hindernis / das Problem', 'obstacle / problem'],
    ['der Kollege / die Kollegin', 'colleague'],
    ['besprechen / diskutieren', 'to discuss / debate'],
    ['die Entscheidung', 'decision'],
    ['Können Sie das noch einmal erklären?', 'Can you explain that again?'],
    [
      'Ich bin mir nicht sicher, ob ich das verstanden habe.',
      'I am not sure whether I understood that.',
    ],
  ],
  dialogue: [
    [
      'partner',
      'Heute besprechen wir den Stand des Projekts.',
      'Today we discuss the project status.',
    ],
    [
      'partner',
      'Die Website ist 70 Prozent fertig, aber der Server ist langsam.',
      'The website is 70 percent complete, but the server is slow.',
    ],
    ['you', 'Können Sie das noch einmal erklären?', 'Can you explain that again?'],
    [
      'partner',
      'Der Code braucht länger, um die Daten zu laden.',
      'The code takes longer to load the data.',
    ],
    [
      'partner',
      'Wir haben noch zwei Wochen bis zur Deadline.',
      'We have two weeks until the deadline.',
    ],
    [
      'you',
      'Ich bin mir nicht sicher, ob ich das verstanden habe.',
      'I am not sure whether I understood that.',
    ],
    [
      'partner',
      'Wir müssen nur einen Teil des Codes ändern.',
      'We only need to change part of the code.',
    ],
    ['you', 'Gerne. Wann können wir anfangen?', 'Sure. When can we start?'],
  ],
  multipleChoice: {
    prompt: 'Wie lange ist es bis zur Deadline?',
    options: ['Eine Woche', 'Zwei Wochen', 'Ein Monat'],
    answerIndex: 1,
    explanation: 'The team has two weeks left.',
  },
  fillBlank: {
    prompt: 'Complete the progress update.',
    sentence: 'Das Projekt ist ___ fertig.',
    answer: '70 Prozent',
    alternatives: ['70%', 'siebzig Prozent'],
    explanation: 'Both the number and written form communicate the same progress.',
  },
  writeSentence: {
    prompt: 'Write about a project.',
    mustInclude: ['Projekt'],
    sample: 'In meinem Projekt arbeite ich mit zwei Kollegen zusammen.',
    explanation: 'Describe your role or current task.',
  },
  badge: {
    title: 'Meeting-Mutig',
    emoji: '📊',
    description: 'Asked for clarification in a German meeting.',
  },
});

import type { Mission } from '@/lib/types';
import { createScenarioMission } from '../createScenarioMission';

export const universityOrientationB2: Mission = createScenarioMission({
  id: 'university-orientation-b2',
  title: 'University orientation',
  tagline: 'Ask about enrollment, requirements, and courses.',
  category: 'Work and study',
  icon: 'compass',
  level: 'advanced',
  minutes: 30,
  accent: 'coral',
  where: 'Universität Hamburg or another university advisory office.',
  reflectionFocus: 'ask detailed questions about university enrollment',
  realLifeSteps: [
    'Bring your program and document questions.',
    'Explain which degree interests you.',
    'Ask about the application process.',
    'Clarify prerequisites and language proof.',
    'Ask where international students get support.',
  ],
  vocab: [
    ['die Universität / die Hochschule', 'university'],
    ['die Immatrikulation', 'enrollment / registration'],
    ['das Seminar', 'seminar'],
    ['die Vorlesung', 'lecture'],
    ['das Studium', 'studies / degree program'],
    ['der Leistungsnachweis / der ECTS', 'credit points'],
    ['Wie funktioniert das Anmeldeverfahren?', 'How does the registration process work?'],
    [
      'Was sind die Voraussetzungen für diesen Studiengang?',
      'What are the prerequisites for this degree?',
    ],
  ],
  dialogue: [
    [
      'partner',
      'Willkommen an der Universität Hamburg. Wie kann ich helfen?',
      'Welcome to Hamburg University. How can I help?',
    ],
    [
      'you',
      'Ich möchte mich für einen Master-Studiengang immatrikulieren.',
      'I would like to enrol in a master’s programme.',
    ],
    [
      'you',
      'Können Sie mir das Anmeldeverfahren erklären?',
      'Can you explain the registration process?',
    ],
    [
      'partner',
      'Zuerst müssen Sie alle erforderlichen Unterlagen einreichen.',
      'First you must submit all required documents.',
    ],
    [
      'you',
      'Was sind die Voraussetzungen für diesen Studiengang?',
      'What are the prerequisites for this degree?',
    ],
    [
      'partner',
      'Sie brauchen auch ein Deutschtest-Zertifikat.',
      'You also need a German language certificate.',
    ],
    ['you', 'Gibt es Vorlesungen und Seminare?', 'Are there lectures and seminars?'],
    [
      'partner',
      'Ja, und Sie sammeln etwa 120 ECTS in zwei Jahren.',
      'Yes, and you earn about 120 ECTS in two years.',
    ],
  ],
  multipleChoice: {
    prompt: 'Was ist der genannte NC?',
    options: ['1,5', '2,0', '2,5'],
    answerIndex: 1,
    explanation: 'The adviser names an NC of 2.0.',
  },
  fillBlank: {
    prompt: 'Complete the course format.',
    sentence: 'Das Programm besteht aus Vorlesungen und ___.',
    answer: 'Seminaren',
    explanation: 'After „aus“ the plural dative is „Seminaren“.',
  },
  writeSentence: {
    prompt: 'Write about a degree that interests you.',
    mustInclude: ['Studiengang'],
    sample: 'Der Studiengang Informatik interessiert mich besonders.',
    explanation: 'Name the degree and your interest directly.',
  },
  badge: {
    title: 'Campus-Klar',
    emoji: '🎓',
    description: 'Asked detailed university questions in German.',
  },
});

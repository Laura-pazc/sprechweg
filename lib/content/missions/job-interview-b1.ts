import type { Mission } from '@/lib/types';
import { createScenarioMission } from '../createScenarioMission';

export const jobInterviewB1: Mission = createScenarioMission({
  id: 'job-interview-b1',
  title: 'First job interview',
  tagline: 'Present your experience and answer key questions.',
  category: 'Work and study',
  icon: 'users',
  level: 'intermediate',
  minutes: 25,
  accent: 'coral',
  where: 'A German-language interview online or at an office.',
  reflectionFocus: 'introduce your experience in a job interview',
  realLifeSteps: [
    'Review the role and company.',
    'Prepare a short self-introduction.',
    'Explain one relevant experience.',
    'Answer why you want the role.',
    'Ask one question about the team.',
  ],
  vocab: [
    ['die Stelle / der Job', 'job / position'],
    ['die Qualifikation', 'qualification'],
    ['die Erfahrung', 'experience'],
    ['der Lebenslauf', 'resume / CV'],
    ['das Anschreiben', 'cover letter'],
    ['sich vorstellen', 'to introduce oneself'],
    ['Weshalb möchten Sie bei uns arbeiten?', 'Why do you want to work for us?'],
    [
      'Wie würden Sie eine schwierige Situation lösen?',
      'How would you solve a difficult situation?',
    ],
  ],
  dialogue: [
    ['partner', 'Guten Tag. Bitte setzen Sie sich.', 'Hello. Please sit down.'],
    ['you', 'Vielen Dank für den Termin.', 'Thank you for the appointment.'],
    ['partner', 'Können Sie sich kurz vorstellen?', 'Can you briefly introduce yourself?'],
    [
      'you',
      'Ich habe fünf Jahre Erfahrung in IT-Support.',
      'I have five years of experience in IT support.',
    ],
    ['partner', 'Weshalb möchten Sie bei uns arbeiten?', 'Why do you want to work for us?'],
    [
      'you',
      'Die Stelle passt zu meinen Fähigkeiten und Zielen.',
      'The position fits my skills and goals.',
    ],
    [
      'partner',
      'Wie würden Sie eine schwierige Situation lösen?',
      'How would you solve a difficult situation?',
    ],
    [
      'you',
      'Ich würde zuhören und dann eine Lösung finden.',
      'I would listen and then find a solution.',
    ],
  ],
  multipleChoice: {
    prompt: 'Warum möchte Sam bei der Firma arbeiten?',
    options: ['Der Ruf ist gut und die Stelle passt', 'Nur wegen des Gehalts', 'Das Büro ist nah'],
    answerIndex: 0,
    explanation: 'Sam connects the company and role to their goals.',
  },
  fillBlank: {
    prompt: 'Complete the experience statement.',
    sentence: 'Ich habe fünf Jahre ___ in IT-Support.',
    answer: 'Erfahrung',
    explanation: 'Use „Erfahrung in“ for a professional field.',
  },
  writeSentence: {
    prompt: 'Write about a role that interests you.',
    mustInclude: ['Stelle'],
    sample: 'Diese Stelle interessiert mich, weil ich gern im Team arbeite.',
    explanation: 'Give one concrete reason for your interest.',
  },
  badge: {
    title: 'Interview-Bereit',
    emoji: '💼',
    description: 'Presented professional experience in German.',
  },
});

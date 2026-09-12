import type { Mission } from '@/lib/types';
import { createScenarioMission } from '../createScenarioMission';

export const auslanderbehordeAppointmentA2: Mission = createScenarioMission({
  id: 'auslanderbehorde-appointment-a2',
  title: 'Residence permit appointment',
  tagline: 'Handle documents and questions at the immigration office.',
  category: 'Everyday errands',
  icon: 'compass',
  level: 'intermediate',
  minutes: 25,
  accent: 'sky',
  where: 'Hamburg Amt für Migration or your district service centre.',
  reflectionFocus: 'handle a residence permit appointment',
  realLifeSteps: [
    'Check your appointment and document list.',
    'State your appointment time.',
    'Show your queue number.',
    'Explain what you want to renew.',
    'Confirm how you will receive the decision.',
  ],
  vocab: [
    ['der Aufenthaltstitel', 'residence permit'],
    ['die Anmeldebescheinigung', 'registration certificate'],
    ['der Reisepass', 'passport'],
    ['das Formular', 'form'],
    ['die Wartenummer', 'queue number'],
    ['der Sachbearbeiter / die Sachbearbeiterin', 'case worker'],
    ['Welche Unterlagen brauche ich?', 'Which documents do I need?'],
    ['Ich habe einen Termin um…', 'I have an appointment at…'],
  ],
  dialogue: [
    [
      'you',
      'Guten Tag, ich habe einen Termin um elf Uhr.',
      'Hello, I have an appointment at eleven.',
    ],
    ['partner', 'Ihre Wartenummer, bitte.', 'Your queue number, please.'],
    [
      'you',
      'Ich möchte meinen Aufenthaltstitel verlängern.',
      'I would like to extend my residence permit.',
    ],
    [
      'partner',
      'Haben Sie Ihren Reisepass und die Anmeldebescheinigung dabei?',
      'Do you have your passport and registration certificate?',
    ],
    [
      'you',
      'Ja, und ich habe das Formular schon ausgefüllt.',
      'Yes, and I already completed the form.',
    ],
    [
      'partner',
      'Welche Unterlagen haben Sie noch mitgebracht?',
      'Which other documents did you bring?',
    ],
    ['you', 'Einen Nachweis über meine Krankenversicherung.', 'Proof of my health insurance.'],
    [
      'partner',
      'Danke. Sie bekommen die Entscheidung per Post.',
      'Thank you. You will receive the decision by post.',
    ],
  ],
  multipleChoice: {
    prompt: 'Was fragt die Sachbearbeiterin zuerst?',
    options: ['Nach der Wartenummer', 'Nach dem Namen', 'Nach der Adresse'],
    answerIndex: 0,
    explanation: 'The case worker first asks for the queue number.',
  },
  fillBlank: {
    prompt: 'State what you want to renew.',
    sentence: 'Ich möchte meinen ___ verlängern.',
    answer: 'Aufenthaltstitel',
    explanation: '„Aufenthaltstitel“ is the formal word used at the office.',
  },
  writeSentence: {
    prompt: 'Write one sentence about your appointment.',
    mustInclude: ['Termin'],
    sample: 'Ich habe heute um elf Uhr einen Termin.',
    explanation: 'Include a clear time so staff can find the booking.',
  },
  badge: {
    title: 'Amt-Bereit',
    emoji: '📄',
    description: 'Handled a formal appointment in German.',
  },
});

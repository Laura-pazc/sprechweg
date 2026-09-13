import type { Mission } from '@/lib/types';
import { createScenarioMission } from '../createScenarioMission';

export const bankAccountA2: Mission = createScenarioMission({
  id: 'bank-account-a2',
  title: 'Open a bank account',
  tagline: 'Ask about documents, forms, and fees.',
  category: 'Everyday errands',
  icon: 'compass',
  level: 'beginner',
  minutes: 25,
  accent: 'coral',
  where: 'A local bank branch with appointment service.',
  reflectionFocus: 'ask what you need to open a bank account',
  realLifeSteps: [
    'Book or confirm a branch appointment.',
    'Say you want to open an account.',
    'Show your passport and address proof.',
    'Ask about fees and cards.',
    'Confirm when the account becomes active.',
  ],
  vocab: [
    ['die Bank / das Konto', 'bank / account'],
    ['das Geld / die Geldbörse', 'money / wallet'],
    ['der Ausweis / der Pass', 'ID / passport'],
    ['das Formular', 'form'],
    ['die Gebühr', 'fee'],
    ['das Passbuch / die Karte', 'passbook / card'],
    ['Ich möchte ein Konto eröffnen.', 'I want to open an account.'],
    ['Welche Dokumente brauche ich?', 'What documents do I need?'],
  ],
  dialogue: [
    ['partner', 'Guten Tag! Wie kann ich helfen?', 'Hello! How can I help?'],
    ['you', 'Ich möchte ein Konto eröffnen.', 'I want to open an account.'],
    ['partner', 'Haben Sie einen Ausweis oder einen Pass?', 'Do you have an ID or passport?'],
    [
      'you',
      'Ich habe meinen Pass und einen Adressnachweis.',
      'I have my passport and proof of address.',
    ],
    ['partner', 'Bitte füllen Sie dieses Formular aus.', 'Please fill out this form.'],
    ['you', 'Gibt es Gebühren für das Konto?', 'Are there fees for the account?'],
    [
      'partner',
      'Das Girokonto ist kostenlos. Sie bekommen eine Karte.',
      'The current account is free. You receive a card.',
    ],
    ['you', 'Wann ist das Konto aktiv?', 'When is the account active?'],
  ],
  multipleChoice: {
    prompt: 'Welche Dokumente braucht man?',
    options: ['Nur den Pass', 'Pass und Adressnachweis', 'Nur einen Ausweis'],
    answerIndex: 1,
    explanation: 'The adviser asks for identification and proof of address.',
  },
  fillBlank: {
    prompt: 'Complete the sentence about costs.',
    sentence: 'Es gibt keine ___.',
    answer: 'Gebühren',
    explanation: '„Gebühren“ are account fees.',
  },
  writeSentence: {
    prompt: 'Write why you are at the bank.',
    mustInclude: ['Konto'],
    sample: 'Ich möchte bei dieser Bank ein Konto eröffnen.',
    explanation: 'State the task directly and politely.',
  },
  badge: {
    title: 'Konto-Klar',
    emoji: '💳',
    description: 'Asked the essential banking questions in German.',
  },
});

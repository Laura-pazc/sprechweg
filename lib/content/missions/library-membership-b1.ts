import type { Mission } from '@/lib/types';
import { createScenarioMission } from '../createScenarioMission';

export const libraryMembershipB1: Mission = createScenarioMission({
  id: 'library-membership-b1',
  title: 'Join the library',
  tagline: 'Get a card, borrow a book, and find a group.',
  category: 'Everyday errands',
  icon: 'compass',
  level: 'intermediate',
  minutes: 20,
  accent: 'magenta',
  where: 'A Bücherhallen Hamburg branch.',
  reflectionFocus: 'get a library card and ask for a recommendation',
  realLifeSteps: [
    'Bring identification and address details.',
    'Ask for a library card.',
    'Request a book recommendation.',
    'Ask about the loan period.',
    'Find out when a reading group meets.',
  ],
  vocab: [
    ['die Bibliothek / Bücherei', 'library'],
    ['der Ausweis', 'library card / ID'],
    ['das Buch / der Roman', 'book / novel'],
    ['ausleihen / zurückgeben', 'to borrow / return'],
    ['der Autor / die Autorin', 'author'],
    ['die Lesegruppe', 'reading group'],
    ['Können Sie mir ein Buch über … empfehlen?', 'Can you recommend a book about …?'],
    ['Wie lange kann ich das Buch behalten?', 'How long can I keep the book?'],
  ],
  dialogue: [
    [
      'partner',
      'Ist das Ihr erstes Mal in unserer Bibliothek?',
      'Is this your first time in our library?',
    ],
    ['you', 'Ja. Ich möchte einen Ausweis beantragen.', 'Yes. I would like to apply for a card.'],
    [
      'partner',
      'Ich brauche Ihren Namen, Ihre Adresse und einen gültigen Ausweis.',
      'I need your name, address, and valid ID.',
    ],
    [
      'you',
      'Können Sie mir ein Buch über Hamburg empfehlen?',
      'Can you recommend a book about Hamburg?',
    ],
    ['partner', 'Ja, ich habe einen guten Roman für Sie.', 'Yes, I have a good novel for you.'],
    ['you', 'Wie lange kann ich das Buch behalten?', 'How long can I keep the book?'],
    ['partner', 'Sie können es vier Wochen ausleihen.', 'You can borrow it for four weeks.'],
    ['you', 'Gibt es auch eine Lesegruppe?', 'Is there also a reading group?'],
  ],
  multipleChoice: {
    prompt: 'Wie lange kann man ein Buch ausleihen?',
    options: ['Zwei Wochen', 'Vier Wochen', 'Sechs Wochen'],
    answerIndex: 1,
    explanation: 'The standard loan in this conversation is four weeks.',
  },
  fillBlank: {
    prompt: 'Complete the membership detail.',
    sentence: 'Die Mitgliedschaft ist ___.',
    answer: 'kostenlos',
    explanation: '„Kostenlos“ means there is no fee.',
  },
  writeSentence: {
    prompt: 'Write about an author you want to read.',
    mustInclude: ['Autor'],
    sample: 'Ich möchte einen Roman von einem deutschen Autor lesen.',
    explanation: 'Use „von“ to connect a book and its author.',
  },
  badge: {
    title: 'Bücherfreund',
    emoji: '📚',
    description: 'Joined a library and asked for a book in German.',
  },
});

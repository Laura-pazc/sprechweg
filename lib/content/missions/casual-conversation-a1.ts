import type { Mission } from '@/lib/types';
import { createScenarioMission } from '../createScenarioMission';

export const casualConversationA1: Mission = createScenarioMission({
  id: 'casual-conversation-a1',
  title: 'Café small talk',
  tagline: 'Start an easy conversation over coffee.',
  category: 'Making friends',
  icon: 'users',
  level: 'beginner',
  minutes: 15,
  accent: 'sky',
  where: 'A relaxed café in your neighbourhood.',
  reflectionFocus: 'start a short café conversation',
  realLifeSteps: [
    'Choose a café at a quiet time.',
    'Ask whether a seat is free.',
    'Say that you are new in Hamburg.',
    'Ask one friendly question.',
    'End with a warm goodbye.',
  ],
  vocab: [
    ['das Café', 'café'],
    ['der Kaffee / der Tee', 'coffee / tea'],
    ['neu sein', 'to be new'],
    ['der Ort / die Stadt', 'place / city'],
    ['Wo kommst du her?', 'Where are you from?'],
    ['Wie geht es dir?', 'How are you?'],
    ['Das ist meine erste Woche.', 'This is my first week.'],
    ['Magst du Hamburg?', 'Do you like Hamburg?'],
  ],
  dialogue: [
    ['partner', 'Hallo! Der Platz ist noch frei, ja?', 'Hi! Is this seat still free?'],
    ['you', 'Ja, bitte! Setz dich hin.', 'Yes, please! Sit down.'],
    ['partner', 'Danke. Wie geht es dir? Ich bin Max.', "Thanks. How are you? I'm Max."],
    [
      'you',
      'Mir geht’s gut! Ich bin Sam. Ich bin neu hier in Hamburg.',
      "I'm good! I'm Sam. I'm new here in Hamburg.",
    ],
    ['partner', 'Wo kommst du her?', 'Where are you from?'],
    [
      'you',
      'Ich komme aus England. Ich bin hier seit zwei Wochen.',
      "I'm from England. I've been here for two weeks.",
    ],
    ['partner', 'Willkommen! Magst du Hamburg?', 'Welcome! Do you like Hamburg?'],
    ['you', 'Ja, sehr! Die Menschen sind nett.', 'Yes, very much! The people are nice.'],
  ],
  multipleChoice: {
    prompt: 'Wie lange ist Sam schon in Hamburg?',
    options: ['Eine Woche', 'Zwei Wochen', 'Einen Monat'],
    answerIndex: 1,
    explanation: 'Sam says „seit zwei Wochen“.',
  },
  fillBlank: {
    prompt: 'Complete the friendly answer.',
    sentence: 'Mir geht’s ___.',
    answer: 'gut',
    explanation: '„Mir geht’s gut“ is the standard short reply.',
  },
  writeSentence: {
    prompt: 'Write where you are from.',
    mustInclude: ['Ich komme aus'],
    sample: 'Ich komme aus England.',
    explanation: 'Use „Ich komme aus“ followed by your country or city.',
  },
  badge: {
    title: 'Café Starter',
    emoji: '☕',
    description: 'Started a friendly café conversation in German.',
  },
});

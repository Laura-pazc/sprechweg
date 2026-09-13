import type { Mission } from '@/lib/types';
import { createScenarioMission } from '../createScenarioMission';

export const datingFirstDateB1: Mission = createScenarioMission({
  id: 'dating-first-date-b1',
  title: 'First date conversation',
  tagline: 'Ask thoughtful questions and share your plans.',
  category: 'Making friends',
  icon: 'users',
  level: 'intermediate',
  minutes: 20,
  accent: 'sky',
  where: 'A relaxed café, bar, or walk by the Alster.',
  reflectionFocus: 'have a personal conversation with someone new',
  realLifeSteps: [
    'Choose a place where conversation is easy.',
    'Say honestly if you feel nervous.',
    'Ask about hobbies and free time.',
    'Share one dream or plan.',
    'Ask one genuine follow-up question.',
  ],
  vocab: [
    ['das Date / die Verabredung', 'date / appointment'],
    ['nervös sein', 'to be nervous'],
    ['die Frage', 'question'],
    ['interessant / langweilig', 'interesting / boring'],
    ['das Hobby', 'hobby'],
    ['der Traum / der Plan', 'dream / plan'],
    ['Was machst du gerne in deiner Freizeit?', 'What do you like to do in your free time?'],
    ['Ich finde dich sehr interessant.', 'I find you very interesting.'],
  ],
  dialogue: [
    [
      'you',
      'Schön, dich wiederzusehen. Ich bin ein bisschen nervös!',
      "Good to see you again. I'm a little nervous!",
    ],
    ['partner', 'Ich auch! Was magst du trinken?', 'Me too! What would you like to drink?'],
    ['you', 'Was machst du gerne in deiner Freizeit?', 'What do you like doing in your free time?'],
    [
      'partner',
      'Ich liebe Klettern. Das ist mein großes Hobby.',
      'I love climbing. It is my big hobby.',
    ],
    ['partner', 'Was ist dein großer Traum?', 'What is your big dream?'],
    [
      'you',
      'Mein Traum ist, eines Tages in Japan zu arbeiten.',
      'My dream is to work in Japan one day.',
    ],
    ['partner', 'Das ist ein cooler Plan!', 'That is a cool plan!'],
    [
      'you',
      'Ich möchte dich auch besser kennenlernen.',
      'I would also like to get to know you better.',
    ],
  ],
  multipleChoice: {
    prompt: 'Was ist das Hobby des Dates?',
    options: ['Schwimmen', 'Klettern', 'Tennis'],
    answerIndex: 1,
    explanation: 'The date says „Ich liebe Klettern“.',
  },
  fillBlank: {
    prompt: 'Describe how you feel.',
    sentence: 'Ich bin ein bisschen ___.',
    answer: 'nervös',
    explanation: '„Nervös“ is a natural, honest way to say how you feel.',
  },
  writeSentence: {
    prompt: 'Write what you find interesting.',
    mustInclude: ['interessant'],
    sample: 'Ich finde deine Reisen sehr interessant.',
    explanation: 'Connect „interessant“ to something the other person shared.',
  },
  badge: {
    title: 'Gesprächsfunke',
    emoji: '💬',
    description: 'Kept a personal conversation moving in German.',
  },
});

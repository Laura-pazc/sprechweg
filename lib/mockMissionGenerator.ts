import { createScenarioMission } from '@/lib/content/createScenarioMission';
import type { Level, Mission } from '@/lib/types';

function slugify(value: string): string {
  const slug = value
    .trim()
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 42);
  return slug || 'custom-mission';
}

export function generateMockMission(name: string, level: Level | null): Mission {
  const title = name.trim();
  const id = `custom-${slugify(title)}-${Date.now().toString(36)}`;

  return createScenarioMission({
    id,
    title,
    tagline: `Build the German you need to complete “${title}” in real life.`,
    category: 'Created by you',
    icon: 'compass',
    level: level ?? 'intermediate',
    minutes: 20,
    accent: 'magenta',
    where: 'Choose a real place in Hamburg',
    reflectionFocus: `what helped you complete “${title}” and what you want to say more naturally next time`,
    realLifeSteps: [
      'Choose a real place and a clear outcome for your mission.',
      'Use at least two phrases from the vocabulary list.',
      'Complete the task, then note one phrase you want to improve.',
    ],
    vocab: [
      ['Ich möchte gern …', 'I would like …'],
      ['Können Sie mir helfen?', 'Can you help me?'],
      ['Wo finde ich …?', 'Where can I find …?'],
      ['Ich habe eine Frage.', 'I have a question.'],
      ['Wie funktioniert das?', 'How does that work?'],
      ['Das passt gut.', 'That works well.'],
      ['Noch einmal, bitte.', 'One more time, please.'],
      ['Vielen Dank für Ihre Hilfe.', 'Thank you very much for your help.'],
    ],
    dialogue: [
      [
        'you',
        'Guten Tag! Ich möchte gern etwas erledigen.',
        'Hello! I would like to get something done.',
      ],
      ['partner', 'Natürlich. Wobei kann ich Ihnen helfen?', 'Of course. How can I help you?'],
      [
        'you',
        'Ich habe eine Frage. Wie funktioniert das?',
        'I have a question. How does that work?',
      ],
      ['partner', 'Ich erkläre es Ihnen gern.', 'I am happy to explain it to you.'],
      [
        'you',
        'Das passt gut. Vielen Dank für Ihre Hilfe!',
        'That works well. Thank you for your help!',
      ],
    ],
    multipleChoice: {
      prompt: 'How do you politely ask for help?',
      options: ['Können Sie mir helfen?', 'Ich gehe jetzt.', 'Das ist geschlossen.'],
      answerIndex: 0,
      explanation: '“Können Sie mir helfen?” is a polite, flexible request for help.',
    },
    fillBlank: {
      prompt: 'Complete the useful question.',
      sentence: 'Wie ___ das?',
      answer: 'funktioniert',
      explanation: '“Wie funktioniert das?” asks how something works.',
    },
    writeSentence: {
      prompt: 'Write a polite sentence for your mission.',
      mustInclude: ['möchte'],
      sample: 'Ich möchte gern eine Frage stellen.',
      explanation: '“Ich möchte gern …” makes your request clear and polite.',
    },
    badge: {
      title: 'Mission Maker',
      emoji: '✦',
      description: `Created and completed your own mission: ${title}.`,
    },
  });
}

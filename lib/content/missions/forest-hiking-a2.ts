import type { Mission } from '@/lib/types';
import { createScenarioMission } from '../createScenarioMission';

export const forestHikingA2: Mission = createScenarioMission({
  id: 'forest-hiking-a2',
  title: 'A day in nature',
  tagline: 'Ask about a trail, the weather, and a break.',
  category: 'Making friends',
  icon: 'compass',
  level: 'beginner',
  minutes: 20,
  accent: 'magenta',
  where: 'A signed trail near Hamburg, with a friend or walking group.',
  reflectionFocus: 'ask practical questions during a group hike',
  realLifeSteps: [
    'Choose a signed beginner trail.',
    'Ask how far the walk is.',
    'Talk about the weather.',
    'Ask for a pause when you need one.',
    'Describe one thing you notice in nature.',
  ],
  vocab: [
    ['wandern / die Wanderung', 'to hike / hiking trip'],
    ['der Berg / der Hügel', 'mountain / hill'],
    ['der Weg / der Pfad', 'path / trail'],
    ['die Natur', 'nature'],
    ['das Wetter', 'weather'],
    ['die Pause', 'break'],
    ['Wie weit ist es bis zum Gipfel?', 'How far is it to the summit?'],
    ['Lass uns eine Pause machen.', "Let's take a break."],
  ],
  dialogue: [
    [
      'partner',
      'Willkommen zur Wanderung! Wir gehen zusammen in den Wald.',
      "Welcome to the hike! We're going into the forest.",
    ],
    ['you', 'Wie weit ist es bis zum Gipfel?', 'How far is it to the summit?'],
    [
      'partner',
      'Es sind nur fünf Kilometer. Der Weg ist einfach.',
      "It's only five kilometres. The trail is easy.",
    ],
    ['you', 'Und wie ist das Wetter heute?', "And how's the weather today?"],
    ['partner', 'Ein bisschen kühl, aber sonnig.', 'A little cool, but sunny.'],
    ['you', 'Wie lange brauchen wir?', 'How long will it take?'],
    [
      'partner',
      'Vielleicht zwei Stunden. Wir machen Pausen.',
      "Maybe two hours. We'll take breaks.",
    ],
    ['you', 'Lass uns eine Pause machen.', "Let's take a break."],
  ],
  multipleChoice: {
    prompt: 'Wie weit ist die Wanderung?',
    options: ['Drei Kilometer', 'Fünf Kilometer', 'Zehn Kilometer'],
    answerIndex: 1,
    explanation: 'The route is five kilometres.',
  },
  fillBlank: {
    prompt: 'Complete the description.',
    sentence: 'Im Herbst ist die Natur am ___.',
    answer: 'schönsten',
    explanation: '„Am schönsten“ is the superlative form.',
  },
  writeSentence: {
    prompt: 'Write one sentence about hiking.',
    mustInclude: ['Natur'],
    sample: 'Ich wandere gern in der Natur.',
    explanation: 'A short personal sentence is enough.',
  },
  badge: { title: 'Wald-Wanderer', emoji: '🥾', description: 'Used German on a walk in nature.' },
});

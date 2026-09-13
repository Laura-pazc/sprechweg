import type { Mission } from '@/lib/types';
import { createScenarioMission } from '../createScenarioMission';

export const appleCiderCulture: Mission = createScenarioMission({
  id: 'apple-cider-culture',
  title: 'Apple Cider Culture',
  tagline: 'Discover orchard traditions and compare regional autumn drinks.',
  category: 'Autumn',
  icon: 'leaf',
  season: 'autumn',
  level: 'advanced',
  minutes: 30,
  accent: 'coral',
  where: 'An orchard café, farm shop, or autumn market stall.',
  reflectionFocus: 'discuss apple harvest traditions and ask detailed questions about cider',
  realLifeSteps: [
    'Find a local orchard shop or autumn market stall.',
    'Ask where the apples were grown and harvested.',
    'Clarify whether the drink contains alcohol.',
    'Compare two varieties by sweetness and acidity.',
    'Order one drink and summarize its flavor in German.',
  ],
  vocab: [
    ['die Apfelernte', 'apple harvest'],
    ['die Streuobstwiese', 'traditional meadow orchard'],
    ['der Apfelmost', 'apple cider / apple must'],
    ['naturtrüb', 'naturally cloudy / unfiltered'],
    ['herb', 'dry / tart'],
    ['die Säure', 'acidity'],
    ['Aus welcher Region stammen die Äpfel?', 'Which region do the apples come from?'],
    ['Ist dieser Apfelmost vergoren oder alkoholfrei?', 'Is this cider fermented or alcohol-free?'],
  ],
  dialogue: [
    [
      'partner',
      'Möchten Sie unseren naturtrüben Apfelmost probieren?',
      'Would you like to try our naturally cloudy apple cider?',
    ],
    [
      'you',
      'Gern. Aus welcher Region stammen die Äpfel?',
      'Gladly. Which region do the apples come from?',
    ],
    [
      'partner',
      'Von alten Streuobstwiesen südlich von Hamburg.',
      'From old meadow orchards south of Hamburg.',
    ],
    ['you', 'Ist der Most vergoren oder alkoholfrei?', 'Is the cider fermented or alcohol-free?'],
    [
      'partner',
      'Diese Sorte ist alkoholfrei, aber deutlich herb.',
      'This variety is alcohol-free but distinctly dry.',
    ],
    ['you', 'Welche Sorte hat weniger Säure?', 'Which variety has less acidity?'],
    [
      'partner',
      'Der Most aus Holsteiner Cox ist milder und etwas süßer.',
      'The cider made from Holsteiner Cox is milder and a little sweeter.',
    ],
    ['you', 'Dann nehme ich ein Glas davon.', 'Then I will have a glass of that.'],
  ],
  multipleChoice: {
    prompt: 'Was bedeutet „naturtrüb“ bei Apfelmost?',
    options: ['Er ist ungefiltert.', 'Er ist besonders süß.', 'Er enthält immer Alkohol.'],
    answerIndex: 0,
    explanation: '„Naturtrüb“ describes an unfiltered drink that remains naturally cloudy.',
  },
  fillBlank: {
    prompt: 'Complete the harvest phrase.',
    sentence: 'Im Herbst beginnt die ___.',
    answer: 'Apfelernte',
    explanation: '„Die Apfelernte“ is the seasonal apple harvest.',
  },
  writeSentence: {
    prompt: 'Ask where the apples come from and whether the drink contains alcohol.',
    mustInclude: ['Äpfel', 'alkoholfrei'],
    sample: 'Woher kommen die Äpfel, und ist dieser Most alkoholfrei?',
    explanation: 'Combine a sourcing question with a clear dietary or preference check.',
  },
  badge: {
    title: 'Most-Kenner',
    emoji: '🍎',
    description: 'Compared orchard drinks and discussed their origins in German.',
  },
});

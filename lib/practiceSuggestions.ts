import type { PracticeSuggestion } from '@/lib/types';

export const PRACTICE_SUGGESTIONS: Record<string, PracticeSuggestion[]> = {
  'find-your-way': [
    {
      id: 'fyw-cafe-steintor',
      title: 'Café Steintor',
      category: 'German coffee culture',
      vocabConnection: ['directions', 'asking', 'small talk'],
      description: 'Practice asking for directions to the café, ordering, small talk',
      tips: [
        'Try saying: Wie komme ich zum Café Steintor?',
        'Ask: Gibt es einen Fensterplatz?',
      ],
      difficulty: 'beginner',
      location: {
        latitude: 53.5511,
        longitude: 10.0046,
        address: 'Jungfernstieg 12, 20354 Hamburg',
        walkingDistanceMeters: 400,
      },
    },
    {
      id: 'fyw-ubahn-stop',
      title: 'U-Bahn Jungfernstieg Stop',
      category: 'Hamburg public transport',
      vocabConnection: ['directions', 'transit', 'questions'],
      description: 'Practice asking strangers for directions to the U-Bahn',
      tips: [
        'Try saying: Entschuldigung, wie komme ich zur nächsten Haltestelle?',
        'Ask: Ist es weit?',
      ],
      difficulty: 'beginner',
      location: {
        latitude: 53.5527,
        longitude: 10.0049,
        address: 'Jungfernstieg / Möhlendamm, 20354 Hamburg',
        walkingDistanceMeters: 150,
      },
    },
    {
      id: 'fyw-park',
      title: 'Planten un Blomen Park',
      category: 'Hamburg outdoor spaces',
      vocabConnection: ['directions', 'locations', 'small talk'],
      description: 'Practice asking locals about the park, its features',
      tips: [
        'Try saying: Was gibt es hier zu sehen?',
        'Ask: Wann öffnet der Park?',
      ],
      difficulty: 'beginner',
      location: {
        latitude: 53.5669,
        longitude: 9.9914,
        address: 'Stephansplatz 4, 20354 Hamburg',
        walkingDistanceMeters: 1200,
      },
    },
  ],
};

export function getPracticeSuggestions(missionId: string): PracticeSuggestion[] {
  return PRACTICE_SUGGESTIONS[missionId] ?? [];
}

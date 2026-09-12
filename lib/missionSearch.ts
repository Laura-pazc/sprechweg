import { useMemo, useState } from 'react';

import type { Level, Mission } from '@/lib/types';

export type MissionMatchField = 'title' | 'tagline' | 'category' | 'vocabulary' | 'location';

export interface MissionSearchResult {
  mission: Mission;
  matchedFields: MissionMatchField[];
}

export interface MissionSearchFilters {
  level: Level | null;
  category: string | null;
}

const SEARCH_FIELDS: MissionMatchField[] = [
  'title',
  'tagline',
  'category',
  'vocabulary',
  'location',
];

function normalize(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ß/g, 'ss')
    .toLocaleLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim();
}

function editDistance(first: string, second: string) {
  const previous = Array.from({ length: second.length + 1 }, (_, index) => index);

  for (let firstIndex = 1; firstIndex <= first.length; firstIndex += 1) {
    const current = [firstIndex];

    for (let secondIndex = 1; secondIndex <= second.length; secondIndex += 1) {
      const substitutionCost = first[firstIndex - 1] === second[secondIndex - 1] ? 0 : 1;
      current[secondIndex] = Math.min(
        current[secondIndex - 1] + 1,
        previous[secondIndex] + 1,
        previous[secondIndex - 1] + substitutionCost,
      );
    }

    previous.splice(0, previous.length, ...current);
  }

  return previous[second.length];
}

function termMatches(term: string, source: string) {
  if (source.includes(term)) return true;
  if (term.length < 4) return false;

  const tolerance = term.length >= 8 ? 2 : 1;
  return source.split(' ').some((word) => {
    if (word.length < 3 || Math.abs(word.length - term.length) > tolerance) return false;
    return editDistance(term, word) <= tolerance;
  });
}

function searchableFields(mission: Mission): Record<MissionMatchField, string> {
  return {
    title: normalize(mission.title),
    tagline: normalize(mission.tagline),
    category: normalize(mission.category),
    vocabulary: normalize(mission.vocab.flatMap((item) => [item.de, item.en]).join(' ')),
    location: normalize(mission.where),
  };
}

function findMatchedFields(mission: Mission, query: string): MissionMatchField[] | null {
  const terms = normalize(query).split(' ').filter(Boolean);
  if (terms.length === 0) return [];

  const fields = searchableFields(mission);
  const matched = new Set<MissionMatchField>();

  for (const term of terms) {
    const fieldsForTerm = SEARCH_FIELDS.filter((field) => termMatches(term, fields[field]));
    if (fieldsForTerm.length === 0) return null;
    fieldsForTerm.forEach((field) => matched.add(field));
  }

  return SEARCH_FIELDS.filter((field) => matched.has(field));
}

export function useMissionSearch(missions: Mission[], userLevel: Level | null) {
  const [query, setQuery] = useState('');
  const [level, setLevel] = useState<Level | null>(null);
  const [category, setCategory] = useState<string | null>(null);

  const categories = useMemo(
    () =>
      [...new Set(missions.map((mission) => mission.category))].sort((a, b) => a.localeCompare(b)),
    [missions],
  );

  const results = useMemo(() => {
    const filtered = missions.flatMap<MissionSearchResult>((mission) => {
      if (level !== null && mission.level !== level) return [];
      if (category !== null && mission.category !== category) return [];

      const matchedFields = findMatchedFields(mission, query);
      return matchedFields === null ? [] : [{ mission, matchedFields }];
    });

    if (userLevel === null) return filtered;

    return filtered.sort(
      (first, second) =>
        Number(second.mission.level === userLevel) - Number(first.mission.level === userLevel),
    );
  }, [category, level, missions, query, userLevel]);

  const filters: MissionSearchFilters = { level, category };
  const hasActiveFilters = level !== null || category !== null;

  return {
    query,
    setQuery,
    filters,
    setLevel,
    setCategory,
    categories,
    results,
    hasActiveFilters,
    clearSearch: () => setQuery(''),
    clearFilters: () => {
      setLevel(null);
      setCategory(null);
    },
  };
}

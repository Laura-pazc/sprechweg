import AsyncStorage from '@react-native-async-storage/async-storage';

import { MISSIONS } from '@/lib/content/missions';
import { missionListSchema, missionSchema } from '@/lib/missionSchema';
import type { JournalEntry, Mission } from '@/lib/types';

import type { DataSource } from './types';

const JOURNAL_KEY = 'sprechweg-journal-v1';
const USER_MISSIONS_KEY = 'sprechweg-user-missions-v1';

async function readUserMissions(): Promise<Mission[]> {
  const parsed = parseJson(await AsyncStorage.getItem(USER_MISSIONS_KEY));
  const result = missionListSchema.safeParse(parsed);
  return result.success ? result.data : [];
}

async function writeUserMissions(missions: Mission[]): Promise<void> {
  await AsyncStorage.setItem(USER_MISSIONS_KEY, JSON.stringify(missions));
}

async function listMissions(): Promise<Mission[]> {
  const userMissions = await readUserMissions();
  const bundledIds = new Set(MISSIONS.map((mission) => mission.id));
  return [...MISSIONS, ...userMissions.filter((mission) => !bundledIds.has(mission.id))];
}

/**
 * Journal entries used to live inside the persisted app store under this key.
 * The first read after the move copies them over so nobody loses their
 * history; the old blob is left untouched.
 */
const LEGACY_STORE_KEY = 'city-sidekick-v1';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isJournalEntry(value: unknown): value is JournalEntry {
  return isRecord(value) && typeof value.id === 'string' && typeof value.createdAt === 'string';
}

function parseJson(raw: string | null): unknown {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as unknown;
  } catch {
    return null;
  }
}

async function readLegacyEntries(): Promise<JournalEntry[]> {
  const parsed = parseJson(await AsyncStorage.getItem(LEGACY_STORE_KEY));
  if (!isRecord(parsed) || !isRecord(parsed.state)) return [];
  const entries = parsed.state.entries;
  return Array.isArray(entries) ? entries.filter(isJournalEntry) : [];
}

async function writeEntries(entries: JournalEntry[]): Promise<void> {
  await AsyncStorage.setItem(JOURNAL_KEY, JSON.stringify(entries));
}

async function readEntries(): Promise<JournalEntry[]> {
  const stored = parseJson(await AsyncStorage.getItem(JOURNAL_KEY));
  if (Array.isArray(stored)) return stored.filter(isJournalEntry);

  const legacy = await readLegacyEntries();
  if (legacy.length > 0) await writeEntries(legacy);
  return legacy;
}

export const localDataSource: DataSource = {
  listMissions,

  getMission: async (id) => (await listMissions()).find((mission) => mission.id === id),

  addUserMission: async (mission) => {
    const validated = missionSchema.parse(mission);
    const missions = await readUserMissions();
    const withoutDuplicate = missions.filter((item) => item.id !== validated.id);
    await writeUserMissions([...withoutDuplicate, validated]);
  },

  listJournalEntries: readEntries,

  addJournalEntry: async (entry) => {
    const entries = await readEntries();
    await writeEntries([entry, ...entries]);
  },

  clearJournal: () => AsyncStorage.removeItem(JOURNAL_KEY),
};

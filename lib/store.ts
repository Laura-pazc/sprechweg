import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { data } from '@/lib/data';
import type { AppLocale } from '@/lib/i18n';
import type { JournalEntry, Level, Mission, MissionStatus } from '@/lib/types';
import { dayKey, yesterdayKey } from '@/lib/utils';

interface AppState {
  /** True once persisted progress is read AND missions + journal are loaded. */
  hydrated: boolean;
  /** Mission catalog, loaded through the data seam. Cache only, never persisted here. */
  missions: Mission[];
  name: string;
  level: Level | null;
  /** Raw score from the onboarding chat, kept so the result screen can explain itself. */
  levelScore: number;
  /** Missing key means 'not_started'; readers use `statuses[id] ?? 'not_started'`. */
  statuses: Record<string, MissionStatus>;
  /** Vocab ids the learner ticked off, per mission. Feeds the recall quiz. */
  studied: Record<string, string[]>;
  practiceDone: Record<string, boolean>;
  /** Journal entries, newest first. Cache of the data seam, never persisted here. */
  entries: JournalEntry[];
  streakCount: number;
  lastJournalDay: string | null;
  cheered: string[];
  locale: AppLocale;

  completeOnboarding: (name: string, level: Level, levelScore: number) => void;
  setStatus: (missionId: string, status: MissionStatus) => void;
  toggleVocabStudied: (missionId: string, vocabId: string) => void;
  markPracticeDone: (missionId: string) => void;
  addJournalEntry: (entry: {
    missionId: string | null;
    prompts: string[];
    answers: string[];
    quizScore: number;
    quizTotal: number;
  }) => void;
  toggleCheer: (quoteId: string) => void;
  setLocale: (locale: AppLocale) => void;
  updateProfile: (profile: { name: string; level: Level; locale: AppLocale }) => void;
  resetProgress: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      hydrated: false,
      missions: [],
      name: '',
      level: null,
      levelScore: 0,
      statuses: {},
      studied: {},
      practiceDone: {},
      entries: [],
      streakCount: 0,
      lastJournalDay: null,
      cheered: [],
      locale: 'en',

      completeOnboarding: (name, level, levelScore) =>
        set({ name: name.trim(), level, levelScore }),

      setStatus: (missionId, status) =>
        set((state) => ({ statuses: { ...state.statuses, [missionId]: status } })),

      toggleVocabStudied: (missionId, vocabId) =>
        set((state) => {
          const current = state.studied[missionId] ?? [];
          const next = current.includes(vocabId)
            ? current.filter((id) => id !== vocabId)
            : [...current, vocabId];
          return { studied: { ...state.studied, [missionId]: next } };
        }),

      markPracticeDone: (missionId) =>
        set((state) => ({ practiceDone: { ...state.practiceDone, [missionId]: true } })),

      addJournalEntry: ({ missionId, prompts, answers, quizScore, quizTotal }) => {
        const today = dayKey();
        const { lastJournalDay, streakCount } = get();

        let nextStreak = streakCount;
        if (lastJournalDay === today) {
          nextStreak = Math.max(streakCount, 1);
        } else if (lastJournalDay === yesterdayKey()) {
          nextStreak = streakCount + 1;
        } else {
          nextStreak = 1;
        }

        const entry: JournalEntry = {
          id: `${missionId ?? 'daily'}-${Date.now()}`,
          missionId,
          createdAt: new Date().toISOString(),
          day: today,
          prompts,
          answers,
          quizScore,
          quizTotal,
        };

        // Update the cache first so the screen can show the saved state at once;
        // the seam persists in the background.
        set((state) => ({
          entries: [entry, ...state.entries],
          streakCount: nextStreak,
          lastJournalDay: today,
          statuses: missionId ? { ...state.statuses, [missionId]: 'done' } : state.statuses,
        }));
        void data.addJournalEntry(entry);
      },

      toggleCheer: (quoteId) =>
        set((state) => ({
          cheered: state.cheered.includes(quoteId)
            ? state.cheered.filter((id) => id !== quoteId)
            : [...state.cheered, quoteId],
        })),

      setLocale: (locale) => set({ locale }),

      updateProfile: ({ name, level, locale }) => set({ name: name.trim(), level, locale }),

      resetProgress: () => {
        set({
          name: '',
          level: null,
          levelScore: 0,
          statuses: {},
          studied: {},
          practiceDone: {},
          entries: [],
          streakCount: 0,
          lastJournalDay: null,
          cheered: [],
        });
        void data.clearJournal();
      },
    }),
    {
      name: 'city-sidekick-v1',
      storage: createJSONStorage(() => AsyncStorage),
      // Missions and journal entries come from the data seam, not from this blob.
      partialize: ({ hydrated: _hydrated, missions: _missions, entries: _entries, ...rest }) =>
        rest,
    },
  ),
);

/** Selects one mission from the loaded catalog; undefined while loading or for unknown ids. */
export function useMission(id: string | undefined): Mission | undefined {
  return useAppStore((state) =>
    id ? state.missions.find((mission) => mission.id === id) : undefined,
  );
}

const persistedStateReady = new Promise<void>((resolve) => {
  if (useAppStore.persist.hasHydrated()) resolve();
  else useAppStore.persist.onFinishHydration(() => resolve());
});

// `hydrated` flips only when the persisted progress, the mission catalog and
// the journal are all in. Screens gate on it to avoid a flash of empty content.
void Promise.all([persistedStateReady, data.listMissions(), data.listJournalEntries()]).then(
  ([, missions, entries]) => {
    useAppStore.setState({ missions, entries, hydrated: true });
  },
);

import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { AppLocale } from '@/lib/i18n';
import { MISSIONS } from '@/lib/missions';
import type { JournalEntry, Level, MissionStatus } from '@/lib/types';
import { dayKey, yesterdayKey } from '@/lib/utils';

interface AppState {
  hydrated: boolean;
  name: string;
  level: Level | null;
  /** Raw score from the onboarding chat, kept so the result screen can explain itself. */
  levelScore: number;
  statuses: Record<string, MissionStatus>;
  /** Vocab ids the learner ticked off, per mission. Feeds the recall quiz. */
  studied: Record<string, string[]>;
  practiceDone: Record<string, boolean>;
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
    missionId: string;
    prompts: string[];
    answers: string[];
    quizScore: number;
    quizTotal: number;
  }) => void;
  toggleCheer: (quoteId: string) => void;
  setLocale: (locale: AppLocale) => void;
  resetProgress: () => void;
}

const initialStatuses: Record<string, MissionStatus> = Object.fromEntries(
  MISSIONS.map((mission) => [mission.id, 'not_started']),
);

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      hydrated: false,
      name: '',
      level: null,
      levelScore: 0,
      statuses: initialStatuses,
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
          id: `${missionId}-${Date.now()}`,
          missionId,
          createdAt: new Date().toISOString(),
          day: today,
          prompts,
          answers,
          quizScore,
          quizTotal,
        };

        set((state) => ({
          entries: [entry, ...state.entries],
          streakCount: nextStreak,
          lastJournalDay: today,
          statuses: { ...state.statuses, [missionId]: 'done' },
        }));
      },

      toggleCheer: (quoteId) =>
        set((state) => ({
          cheered: state.cheered.includes(quoteId)
            ? state.cheered.filter((id) => id !== quoteId)
            : [...state.cheered, quoteId],
        })),

      setLocale: (locale) => set({ locale }),

      resetProgress: () =>
        set({
          name: '',
          level: null,
          levelScore: 0,
          statuses: initialStatuses,
          studied: {},
          practiceDone: {},
          entries: [],
          streakCount: 0,
          lastJournalDay: null,
          cheered: [],
        }),
    }),
    {
      name: 'city-sidekick-v1',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: ({ hydrated: _hydrated, ...rest }) => rest,
    },
  ),
);

// `hydrated` is excluded from persisted state, so flip it once AsyncStorage
// has been read. Screens gate on it to avoid a flash of empty content.
if (useAppStore.persist.hasHydrated()) {
  useAppStore.setState({ hydrated: true });
} else {
  useAppStore.persist.onFinishHydration(() => useAppStore.setState({ hydrated: true }));
}

import type { JournalEntry, Mission } from '@/lib/types';

/**
 * Everything the app reads or writes that is "data" rather than local UI
 * state goes through this interface. Today it is backed by bundled content
 * and AsyncStorage (see ./local.ts); swapping in an HTTP backend means adding
 * another implementation and changing the export in ./index.ts.
 *
 * All methods are async on purpose, even where the local implementation
 * resolves immediately: callers are written once, for the network case.
 */
export interface DataSource {
  listMissions(): Promise<Mission[]>;
  getMission(id: string): Promise<Mission | undefined>;
  addUserMission(mission: Mission): Promise<void>;
  listJournalEntries(): Promise<JournalEntry[]>;
  addJournalEntry(entry: JournalEntry): Promise<void>;
  clearJournal(): Promise<void>;
}

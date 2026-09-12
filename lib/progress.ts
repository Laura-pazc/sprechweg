import { MISSIONS } from '@/lib/missions';
import type { Level, Mission, MissionStatus } from '@/lib/types';

interface ProgressInput {
  level: Level | null;
  statuses: Record<string, MissionStatus>;
  practiceDone: Record<string, boolean>;
  studied: Record<string, string[]>;
  journalCount: number;
}

/**
 * "Your confidence: trying it outside" — a labelled, explainable number, not a
 * score. Fixed weights: prep counts a little, going outside counts most.
 */
export function confidencePercent({
  level,
  statuses,
  practiceDone,
  studied,
  journalCount,
}: ProgressInput): number {
  const base = level === null ? 0 : 12;

  const studiedWords = Object.values(studied).reduce((total, ids) => total + ids.length, 0);
  const totalWords = MISSIONS.reduce((total, mission) => total + mission.vocab.length, 0);
  const vocabPart = totalWords === 0 ? 0 : (studiedWords / totalWords) * 18;

  const practicePart = (Object.values(practiceDone).filter(Boolean).length / MISSIONS.length) * 15;

  const doneCount = MISSIONS.filter((mission) => statuses[mission.id] === 'done').length;
  const missionPart = (doneCount / MISSIONS.length) * 40;

  const journalPart = Math.min(journalCount, MISSIONS.length) * (15 / MISSIONS.length);

  return Math.min(100, Math.round(base + vocabPart + practicePart + missionPart + journalPart));
}

export function nextMission(level: Level | null, statuses: Record<string, MissionStatus>): Mission {
  const inProgress = MISSIONS.find((mission) => statuses[mission.id] === 'in_progress');
  if (inProgress) return inProgress;

  const levelOrder: Level[] = ['beginner', 'intermediate', 'advanced'];
  const startIndex = level === null ? 0 : levelOrder.indexOf(level);

  const atLevel = MISSIONS.find(
    (mission) => mission.level === levelOrder[startIndex] && statuses[mission.id] !== 'done',
  );
  if (atLevel) return atLevel;

  const anyOpen = MISSIONS.find((mission) => statuses[mission.id] !== 'done');
  return anyOpen ?? MISSIONS[0];
}

export function earnedBadges(statuses: Record<string, MissionStatus>): Mission[] {
  return MISSIONS.filter((mission) => statuses[mission.id] === 'done');
}

export const STATUS_LABEL: Record<MissionStatus, string> = {
  not_started: 'Not started',
  in_progress: 'In progress',
  done: 'Done',
};

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

  const confidenceMissionTarget = 3;
  const confidenceWordTarget = 24;
  const studiedWords = Object.values(studied).reduce((total, ids) => total + ids.length, 0);
  const vocabPart = (Math.min(studiedWords, confidenceWordTarget) / confidenceWordTarget) * 18;

  const practiceCount = Object.values(practiceDone).filter(Boolean).length;
  const practicePart =
    (Math.min(practiceCount, confidenceMissionTarget) / confidenceMissionTarget) * 15;

  const doneCount = MISSIONS.filter((mission) => statuses[mission.id] === 'done').length;
  const missionPart = (Math.min(doneCount, confidenceMissionTarget) / confidenceMissionTarget) * 40;

  const journalPart =
    (Math.min(journalCount, confidenceMissionTarget) / confidenceMissionTarget) * 15;

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

import type { Level, Mission, MissionStatus } from '@/lib/types';

interface ProgressInput {
  missions: Mission[];
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
  missions,
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

  const doneCount = missions.filter((mission) => statuses[mission.id] === 'done').length;
  const missionPart = (Math.min(doneCount, confidenceMissionTarget) / confidenceMissionTarget) * 40;

  const journalPart =
    (Math.min(journalCount, confidenceMissionTarget) / confidenceMissionTarget) * 15;

  return Math.min(100, Math.round(base + vocabPart + practicePart + missionPart + journalPart));
}

export function nextMission(
  missions: Mission[],
  level: Level | null,
  statuses: Record<string, MissionStatus>,
): Mission {
  const inProgress = missions.find((mission) => statuses[mission.id] === 'in_progress');
  if (inProgress) return inProgress;

  const levelOrder: Level[] = ['beginner', 'intermediate', 'advanced'];
  const startIndex = level === null ? 0 : levelOrder.indexOf(level);

  const atLevel = missions.find(
    (mission) => mission.level === levelOrder[startIndex] && statuses[mission.id] !== 'done',
  );
  if (atLevel) return atLevel;

  const anyOpen = missions.find((mission) => statuses[mission.id] !== 'done');
  return anyOpen ?? missions[0];
}

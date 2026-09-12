import { router } from 'expo-router';
import { Lock } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { ChunkyButton } from '@/components/ChunkyButton';
import { ChunkyCard } from '@/components/ChunkyCard';
import { ChunkyChip } from '@/components/ChunkyChip';
import { ProgressBar } from '@/components/ProgressBar';
import { Screen } from '@/components/Screen';
import { ScreenHeader } from '@/components/ScreenHeader';
import { SectionHeading } from '@/components/SectionHeading';
import { StreakCard } from '@/components/StreakCard';
import { LEVEL_LABEL, LEVEL_SUMMARY } from '@/lib/levelChat';
import { MISSIONS } from '@/lib/missions';
import { routes } from '@/lib/navigation';
import { confidencePercent } from '@/lib/progress';
import { useAppStore } from '@/lib/store';
import { palette } from '@/lib/theme';
import { dayKey } from '@/lib/utils';

function StatTile({ value, label }: { value: string; label: string }) {
  return (
    <ChunkyCard tone="paper" offset={4} radius={18} className="flex-1 gap-0.5 px-3 py-3">
      <Text className="text-ink font-display text-[20px] leading-[24px]">{value}</Text>
      <Text className="text-muted font-strong text-[12px] leading-[16px]">{label}</Text>
    </ChunkyCard>
  );
}

export default function ProfileScreen() {
  const name = useAppStore((state) => state.name);
  const level = useAppStore((state) => state.level);
  const statuses = useAppStore((state) => state.statuses);
  const studied = useAppStore((state) => state.studied);
  const practiceDone = useAppStore((state) => state.practiceDone);
  const entries = useAppStore((state) => state.entries);
  const streakCount = useAppStore((state) => state.streakCount);
  const lastJournalDay = useAppStore((state) => state.lastJournalDay);
  const resetProgress = useAppStore((state) => state.resetProgress);

  const [confirmReset, setConfirmReset] = useState(false);

  const doneMissions = MISSIONS.filter((mission) => statuses[mission.id] === 'done');
  const studiedWords = Object.values(studied).reduce((total, ids) => total + ids.length, 0);
  const confidence = confidencePercent({
    level,
    statuses,
    practiceDone,
    studied,
    journalCount: entries.length,
  });

  return (
    <Screen>
      <ScrollView contentContainerClassName="gap-5 px-5 pb-10">
        <ScreenHeader
          nested
          showBack={false}
          kicker="Your progress"
          title={name ? `${name}'s Hamburg run` : 'Your Hamburg run'}
          subtitle={
            level === null
              ? 'Take the level chat to get started.'
              : `${LEVEL_LABEL[level]} tier — ${LEVEL_SUMMARY[level].headline.toLowerCase()}.`
          }
        />

        <StreakCard
          streakCount={streakCount}
          entryCount={entries.length}
          journaledToday={lastJournalDay === dayKey()}
        />

        <ProgressBar label="Your confidence: trying it outside" value={confidence} />

        <View className="flex-row gap-3">
          <StatTile value={`${doneMissions.length}/${MISSIONS.length}`} label="Missions done" />
          <StatTile value={String(studiedWords)} label="Words marked" />
          <StatTile value={String(entries.length)} label="Journal entries" />
        </View>

        <View className="gap-3">
          <SectionHeading title="Badges" />
          {MISSIONS.map((mission) => {
            const earned = statuses[mission.id] === 'done';
            return (
              <ChunkyCard
                key={mission.id}
                tone={earned ? mission.accent : 'canvas'}
                offset={4}
                className="flex-row items-center gap-3 px-4 py-3.5"
              >
                <View className="border-ink h-12 w-12 items-center justify-center rounded-full border-2 bg-white">
                  {earned ? (
                    <Text className="text-[20px]">{mission.badge.emoji}</Text>
                  ) : (
                    <Lock color={palette.muted} size={18} strokeWidth={2.5} />
                  )}
                </View>
                <View className="flex-1 gap-0.5">
                  <Text className="text-ink font-display text-[16px]">{mission.badge.title}</Text>
                  <Text
                    className={
                      earned
                        ? 'text-ink font-body text-[13px] leading-[18px]'
                        : 'text-muted font-body text-[13px] leading-[18px]'
                    }
                  >
                    {earned ? mission.badge.description : `Locked — finish “${mission.title}”`}
                  </Text>
                </View>
              </ChunkyCard>
            );
          })}
        </View>

        <View className="gap-3">
          <SectionHeading title="Completed missions" />
          {doneMissions.length === 0 ? (
            <ChunkyCard tone="canvas" offset={4} className="gap-2 px-4 py-4">
              <Text className="text-ink font-body text-[14px] leading-[20px]">
                Nothing finished yet. A mission counts as done once you say it is — the app takes
                your word for it.
              </Text>
              <ChunkyButton label="Pick a mission" onPress={() => router.push(routes.missions)} />
            </ChunkyCard>
          ) : (
            doneMissions.map((mission) => (
              <ChunkyCard
                key={mission.id}
                tone="paper"
                offset={4}
                className="flex-row items-center justify-between gap-3 px-4 py-3.5"
              >
                <View className="flex-1 gap-0.5">
                  <Text className="text-ink font-display text-[16px]">{mission.title}</Text>
                  <Text className="text-muted font-strong text-[12.5px]">{mission.category}</Text>
                </View>
                <ChunkyChip label="Done" tone="lime" />
              </ChunkyCard>
            ))
          )}
        </View>

        <View className="gap-3">
          <SectionHeading title="Settings" />
          <Pressable
            accessibilityRole="button"
            onPress={() => router.push(routes.howItWorks)}
            className="self-start py-1"
          >
            <Text className="text-ink font-strong border-ink border-b-2 text-[14px]">
              How it works — what is generated, what is fixed
            </Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            onPress={() => router.push(routes.levelResult)}
            className="self-start py-1"
          >
            <Text className="text-ink font-strong border-ink border-b-2 text-[14px]">
              Review or retake my level chat
            </Text>
          </Pressable>
          <ChunkyButton
            label={confirmReset ? 'Tap again to erase everything' : 'Reset my progress'}
            variant={confirmReset ? 'ink' : 'quiet'}
            onPress={() => {
              if (!confirmReset) {
                setConfirmReset(true);
                return;
              }
              resetProgress();
              router.replace(routes.onboarding);
            }}
          />
        </View>
      </ScrollView>
    </Screen>
  );
}

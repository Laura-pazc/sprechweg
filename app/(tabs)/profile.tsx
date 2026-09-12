import { router } from 'expo-router';
import { Lock } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { ChunkyButton } from '@/components/ChunkyButton';
import { ChunkyCard } from '@/components/ChunkyCard';
import { ChunkyChip } from '@/components/ChunkyChip';
import { ProgressBar } from '@/components/ProgressBar';
import { Screen } from '@/components/Screen';
import { ScreenHeader } from '@/components/ScreenHeader';
import { SectionHeading } from '@/components/SectionHeading';
import { StreakCard } from '@/components/StreakCard';
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
  const { t } = useTranslation();
  const missions = useAppStore((state) => state.missions);
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

  const doneMissions = missions.filter((mission) => statuses[mission.id] === 'done');
  const studiedWords = Object.values(studied).reduce((total, ids) => total + ids.length, 0);
  const confidence = confidencePercent({
    missions,
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
          kicker={t('progress.kicker')}
          title={name ? t('progress.namedRun', { name }) : t('progress.run')}
          subtitle={
            level === null
              ? t('progress.takeChat')
              : t('progress.tier', {
                  tier: t(`levels.${level}`),
                  headline: t(`levelHeadlines.${level}`).toLowerCase(),
                })
          }
        />

        <StreakCard
          streakCount={streakCount}
          entryCount={entries.length}
          journaledToday={lastJournalDay === dayKey()}
        />

        <ProgressBar label={t('today.confidence')} value={confidence} />

        <View className="flex-row gap-3">
          <StatTile
            value={`${doneMissions.length}/${missions.length}`}
            label={t('progress.missionsDone')}
          />
          <StatTile value={String(studiedWords)} label={t('progress.wordsMarked')} />
          <StatTile value={String(entries.length)} label={t('progress.entries')} />
        </View>

        <View className="gap-3">
          <SectionHeading title={t('progress.badges')} />
          {missions.map((mission) => {
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
                    {earned
                      ? mission.badge.description
                      : t('progress.locked', { title: mission.title })}
                  </Text>
                </View>
              </ChunkyCard>
            );
          })}
        </View>

        <View className="gap-3">
          <SectionHeading title={t('progress.completed')} />
          {doneMissions.length === 0 ? (
            <ChunkyCard tone="canvas" offset={4} className="gap-2 px-4 py-4">
              <Text className="text-ink font-body text-[14px] leading-[20px]">
                {t('progress.none')}
              </Text>
              <ChunkyButton
                label={t('progress.pick')}
                onPress={() => router.push(routes.missions)}
              />
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
                <ChunkyChip label={t('common.done')} tone="lime" />
              </ChunkyCard>
            ))
          )}
        </View>

        <View className="gap-3">
          <SectionHeading title={t('common.settings')} />
          <Pressable
            accessibilityRole="button"
            onPress={() => router.push(routes.howItWorks)}
            className="self-start py-1"
          >
            <Text className="text-ink font-strong border-ink border-b-2 text-[14px]">
              {t('progress.howItWorks')}
            </Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            onPress={() => router.push(routes.levelResult)}
            className="self-start py-1"
          >
            <Text className="text-ink font-strong border-ink border-b-2 text-[14px]">
              {t('progress.reviewLevel')}
            </Text>
          </Pressable>
          <ChunkyButton
            label={confirmReset ? t('progress.confirmReset') : t('progress.reset')}
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

import { router } from 'expo-router';
import { NotebookPen } from 'lucide-react-native';
import { FlatList, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { ChunkyButton } from '@/components/ChunkyButton';
import { ChunkyCard } from '@/components/ChunkyCard';
import { ChunkyChip } from '@/components/ChunkyChip';
import { Screen } from '@/components/Screen';
import { ScreenHeader } from '@/components/ScreenHeader';
import { StreakCard } from '@/components/StreakCard';
import { DATE_LOCALES } from '@/lib/i18n';
import { getMission, MISSIONS } from '@/lib/missions';
import { routes } from '@/lib/navigation';
import { useAppStore } from '@/lib/store';
import { palette } from '@/lib/theme';
import type { JournalEntry } from '@/lib/types';
import { dayKey } from '@/lib/utils';

function formatDay(iso: string, locale: string): string {
  return new Date(iso).toLocaleDateString(locale, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
}

function EntryCard({ entry }: { entry: JournalEntry }) {
  const { i18n, t } = useTranslation();
  const locale = i18n.resolvedLanguage === 'de' ? DATE_LOCALES.de : DATE_LOCALES.en;
  const mission = getMission(entry.missionId ?? undefined);

  return (
    <ChunkyCard tone="paper" className="gap-3 px-4 py-4">
      <View className="flex-row items-start justify-between gap-3">
        <View className="flex-1 gap-0.5">
          <Text className="text-ink font-display text-[18px] leading-[23px]">
            {mission?.title ?? t('journal.dailyEntry')}
          </Text>
          <Text className="text-muted font-strong text-[12.5px]">
            {formatDay(entry.createdAt, locale)}
          </Text>
        </View>
        {entry.quizTotal > 0 ? (
          <ChunkyChip
            label={t('journal.recall', { score: entry.quizScore, total: entry.quizTotal })}
            tone={entry.quizScore === entry.quizTotal ? 'lime' : 'cream'}
          />
        ) : null}
      </View>

      {entry.prompts.map((prompt, index) => {
        const answer = entry.answers[index]?.trim();
        if (!answer) return null;
        return (
          <View key={prompt} className="gap-1">
            <Text className="text-muted font-strong text-[12.5px] leading-[18px]">{prompt}</Text>
            <Text className="text-ink font-body text-[14px] leading-[20px]">{answer}</Text>
          </View>
        );
      })}
    </ChunkyCard>
  );
}

export default function JournalScreen() {
  const { t } = useTranslation();
  const entries = useAppStore((state) => state.entries);
  const statuses = useAppStore((state) => state.statuses);
  const streakCount = useAppStore((state) => state.streakCount);
  const lastJournalDay = useAppStore((state) => state.lastJournalDay);

  const pending = MISSIONS.find(
    (mission) =>
      (statuses[mission.id] ?? 'not_started') !== 'not_started' &&
      !entries.some((entry) => entry.missionId === mission.id),
  );

  return (
    <Screen>
      <FlatList
        data={entries}
        keyExtractor={(entry) => entry.id}
        renderItem={({ item }) => <EntryCard entry={item} />}
        contentContainerClassName="gap-4 px-5 pb-8"
        ListHeaderComponent={
          <View className="gap-4">
            <ScreenHeader
              nested
              showBack={false}
              kicker={t('journal.kicker')}
              title={t('journal.title')}
              subtitle={t('journal.subtitle')}
            />
            <StreakCard
              streakCount={streakCount}
              entryCount={entries.length}
              journaledToday={lastJournalDay === dayKey()}
            />
            {pending ? (
              <ChunkyCard tone="sunny" className="gap-2.5 px-4 py-4">
                <Text className="text-ink font-display text-[17px] leading-[22px]">
                  {t('journal.waiting', { title: pending.title })}
                </Text>
                <Text className="text-ink font-body text-[13.5px] leading-[20px]">
                  {t('journal.fresh')}
                </Text>
                <ChunkyButton
                  label={t('journal.write')}
                  variant="ink"
                  leading={<NotebookPen color={palette.cream} size={16} strokeWidth={2.5} />}
                  onPress={() => router.push(routes.missionJournal(pending.id))}
                />
              </ChunkyCard>
            ) : (
              <ChunkyCard tone="sky" className="gap-2.5 px-4 py-4">
                <Text className="text-ink font-display text-[18px] leading-[23px]">
                  {t('journal.dailyTitle')}
                </Text>
                <Text className="text-ink font-body text-[13.5px] leading-[20px]">
                  {t('journal.dailyBody')}
                </Text>
                <ChunkyButton
                  label={t('journal.dailyWrite')}
                  variant="ink"
                  leading={<NotebookPen color={palette.cream} size={16} strokeWidth={2.5} />}
                  onPress={() => router.push(routes.dailyJournal)}
                />
              </ChunkyCard>
            )}
          </View>
        }
        ListEmptyComponent={
          <ChunkyCard tone="canvas" className="gap-2.5 px-4 py-5">
            <Text className="text-ink font-display text-[18px]">{t('journal.empty')}</Text>
            <Text className="text-muted font-body text-[14px] leading-[20px]">
              {t('journal.emptyBody')}
            </Text>
            <ChunkyButton
              label={t('journal.browse')}
              onPress={() => router.push(routes.missions)}
            />
          </ChunkyCard>
        }
      />
    </Screen>
  );
}

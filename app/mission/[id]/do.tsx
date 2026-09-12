import { router, useLocalSearchParams } from 'expo-router';
import { BookOpen, ChevronDown, ChevronUp } from 'lucide-react-native';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, View } from 'react-native';

import { ChunkyButton } from '@/components/ChunkyButton';
import { ChunkyCard, ChunkyPressableCard } from '@/components/ChunkyCard';
import { MissionMetaBadges, MissionStatusBadge } from '@/components/MissionBadges';
import { MissionMissing } from '@/components/mission/MissionMissing';
import { Screen } from '@/components/Screen';
import { ScreenHeader } from '@/components/ScreenHeader';
import { getMission } from '@/lib/missions';
import { routes } from '@/lib/navigation';
import { useAppStore } from '@/lib/store';
import { palette } from '@/lib/theme';
import type { Mission } from '@/lib/types';

function DoMission({ mission }: { mission: Mission }) {
  const { t } = useTranslation();
  const statuses = useAppStore((state) => state.statuses);
  const storedStudied = useAppStore((state) => state.studied[mission.id]);
  const setStatus = useAppStore((state) => state.setStatus);
  const [phrasesOpen, setPhrasesOpen] = useState(false);

  const status = statuses[mission.id] ?? 'not_started';
  const studied = storedStudied ?? [];
  const selectedPhrases = mission.vocab.filter((item) => studied.includes(item.id));
  const pocketPhrases = (selectedPhrases.length > 0 ? selectedPhrases : mission.vocab).slice(0, 3);

  return (
    <Screen>
      <ScrollView contentContainerClassName="gap-5 px-5 pb-safe-offset-8">
        <ScreenHeader
          nested
          kicker={t('doMission.kicker')}
          title={mission.title}
          subtitle={mission.where}
          backFallback={routes.missionPrep(mission.id)}
          right={<MissionStatusBadge status={status} />}
        />

        <ChunkyCard tone={mission.accent} className="gap-3 px-4 py-4">
          <MissionMetaBadges mission={mission} />
          <Text className="text-ink font-body text-[14px] leading-[21px]">{mission.tagline}</Text>
        </ChunkyCard>

        <View className="gap-3">
          <Text className="text-ink font-display text-[19px]">{t('doMission.stepsTitle')}</Text>
          {mission.realLifeSteps.map((step, index) => (
            <View key={step} className="flex-row items-start gap-3">
              <View className="border-ink bg-sunny h-7 w-7 items-center justify-center rounded-full border-2">
                <Text className="text-ink font-display text-[13px]">{index + 1}</Text>
              </View>
              <Text className="text-ink font-strong flex-1 text-[14.5px] leading-[21px]">
                {step}
              </Text>
            </View>
          ))}
        </View>

        <ChunkyPressableCard
          tone="lime"
          offset={4}
          className="gap-3 px-4 py-3.5"
          accessibilityState={{ expanded: phrasesOpen }}
          accessibilityLabel={t('doMission.pocketPhrases')}
          onPress={() => setPhrasesOpen((current) => !current)}
        >
          <View className="flex-row items-center gap-3">
            <View className="border-ink h-9 w-9 items-center justify-center rounded-full border-2 bg-white/70">
              <BookOpen color={palette.ink} size={18} strokeWidth={2.5} />
            </View>
            <View className="min-w-0 flex-1">
              <Text className="text-ink font-display text-[15px]">
                {t('doMission.pocketPhrases')}
              </Text>
              <Text className="text-ink/70 font-body text-[12.5px] leading-[17px]">
                {phrasesOpen ? t('doMission.hideReference') : t('doMission.openReference')}
              </Text>
            </View>
            {phrasesOpen ? (
              <ChevronUp color={palette.ink} size={20} strokeWidth={2.5} />
            ) : (
              <ChevronDown color={palette.ink} size={20} strokeWidth={2.5} />
            )}
          </View>

          {phrasesOpen ? (
            <View className="border-ink gap-3 border-t-2 pt-3">
              {pocketPhrases.map((item) => (
                <View key={item.id} className="gap-0.5">
                  <Text className="text-ink font-display text-[14.5px]">{item.de}</Text>
                  <Text className="text-ink/65 font-body text-[12.5px]">{item.en}</Text>
                </View>
              ))}
            </View>
          ) : null}
        </ChunkyPressableCard>

        <ChunkyCard tone="canvas" offset={4} className="gap-1.5 px-4 py-3.5">
          <Text className="text-muted font-display text-[11px] tracking-widest">
            {t('doMission.noVerifying')}
          </Text>
          <Text className="text-ink font-body text-[13.5px] leading-[20px]">
            {t('doMission.noVerifyingBody')}
          </Text>
        </ChunkyCard>

        <View className="gap-2">
          {status === 'not_started' ? (
            <ChunkyButton
              label={t('doMission.headingOut')}
              size="lg"
              fullWidth
              onPress={() => setStatus(mission.id, 'in_progress')}
            />
          ) : null}

          {status === 'in_progress' ? (
            <>
              <ChunkyButton
                label={t('doMission.didIt')}
                size="lg"
                variant="lime"
                fullWidth
                trailing={<Text className="text-ink font-display text-[17px]">→</Text>}
                onPress={() => {
                  setStatus(mission.id, 'done');
                  router.replace(routes.missionJournal(mission.id));
                }}
              />
              <ChunkyButton
                label={t('doMission.pause')}
                variant="paper"
                fullWidth
                onPress={() => setStatus(mission.id, 'not_started')}
              />
            </>
          ) : null}

          {status === 'done' ? (
            <>
              <ChunkyButton
                label={t('doMission.writeJournal')}
                size="lg"
                fullWidth
                onPress={() => router.push(routes.missionJournal(mission.id))}
              />
              <ChunkyButton
                label={t('doMission.backToday')}
                variant="paper"
                fullWidth
                onPress={() => router.replace(routes.today)}
              />
            </>
          ) : null}
        </View>
      </ScrollView>
    </Screen>
  );
}

export default function DoMissionScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const mission = getMission(id);

  if (!mission) return <MissionMissing />;
  return <DoMission mission={mission} />;
}

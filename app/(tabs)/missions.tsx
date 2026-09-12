import { router } from 'expo-router';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { AutumnSpecialSection } from '@/components/AutumnSpecialSection';
import { ChunkyCard } from '@/components/ChunkyCard';
import { Screen } from '@/components/Screen';
import { ScreenHeader } from '@/components/ScreenHeader';
import { SearchableMissionsList } from '@/components/SearchableMissionsList';
import { AUTUMN_MISSIONS } from '@/lib/autumnMissions';
import { MISSIONS } from '@/lib/missions';
import { routes } from '@/lib/navigation';
import { useAppStore } from '@/lib/store';

export default function MissionsScreen() {
  const { t } = useTranslation();
  const statuses = useAppStore((state) => state.statuses);
  const level = useAppStore((state) => state.level);

  return (
    <Screen>
      <View className="px-5 pb-2">
        <ScreenHeader
          nested
          showBack={false}
          kicker={t('missions.kicker')}
          title={t('missions.title')}
          subtitle={t('missions.subtitle')}
        />
      </View>

      <SearchableMissionsList
        missions={MISSIONS}
        statuses={statuses}
        userLevel={level}
        onMissionPress={(mission) => router.push(routes.missionPrep(mission.id))}
        specialMissionIds={AUTUMN_MISSIONS.map((mission) => mission.id)}
        specialSection={
          <AutumnSpecialSection
            missions={AUTUMN_MISSIONS}
            statuses={statuses}
            onMissionPress={(mission) => router.push(routes.missionPrep(mission.id))}
          />
        }
        footer={
          <ChunkyCard tone="canvas" offset={4} className="mt-1 gap-1.5 px-4 py-3.5">
            <Text className="text-muted font-display text-[11px] tracking-widest">
              {t('missions.fixed')}
            </Text>
            <Text className="text-ink font-body text-[13.5px] leading-[20px]">
              {t('missions.fixedBody')}
            </Text>
          </ChunkyCard>
        }
      />
    </Screen>
  );
}

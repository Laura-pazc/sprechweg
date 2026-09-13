import { router } from 'expo-router';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Screen } from '@/components/Screen';
import { ScreenHeader } from '@/components/ScreenHeader';
import { SearchableMissionsList } from '@/components/SearchableMissionsList';
import { AUTUMN_MISSIONS } from '@/lib/autumnMissions';
import { routes } from '@/lib/navigation';
import { useAppStore } from '@/lib/store';

export default function MissionsScreen() {
  const { t } = useTranslation();
  const missions = useAppStore((state) => state.missions);
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
        missions={missions}
        statuses={statuses}
        userLevel={level}
        onMissionPress={(mission) => router.push(routes.missionPrep(mission.id))}
        highlightedMissionIds={AUTUMN_MISSIONS.map((mission) => mission.id)}
      />
    </Screen>
  );
}

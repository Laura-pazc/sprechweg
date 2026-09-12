import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { ChunkyButton } from '@/components/ChunkyButton';
import { ChunkyCard } from '@/components/ChunkyCard';
import { Screen } from '@/components/Screen';
import { ScreenHeader } from '@/components/ScreenHeader';
import { routes } from '@/lib/navigation';
import { Text } from 'react-native';
import { View } from 'react-native';

/** Shown when a mission id in the URL does not match any authored mission. */
export function MissionMissing() {
  const { t } = useTranslation();

  return (
    <Screen>
      <ScreenHeader
        title={t('missionMissing.title')}
        subtitle={t('missionMissing.subtitle')}
        backFallback={routes.missions}
      />
      <View className="px-5">
        <ChunkyCard tone="canvas" className="gap-3 px-4 py-4">
          <Text className="text-ink font-body text-[14px] leading-[20px]">
            {t('missionMissing.body')}
          </Text>
          <ChunkyButton
            label={t('missionMissing.seeAllMissions')}
            onPress={() => router.replace(routes.missions)}
          />
        </ChunkyCard>
      </View>
    </Screen>
  );
}

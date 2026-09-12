import { router } from 'expo-router';

import { ChunkyButton } from '@/components/ChunkyButton';
import { ChunkyCard } from '@/components/ChunkyCard';
import { Screen } from '@/components/Screen';
import { ScreenHeader } from '@/components/ScreenHeader';
import { routes } from '@/lib/navigation';
import { Text } from 'react-native';
import { View } from 'react-native';

/** Shown when a mission id in the URL does not match any authored mission. */
export function MissionMissing() {
  return (
    <Screen>
      <ScreenHeader
        title="Mission not found"
        subtitle="That link points at a mission we do not have."
        backFallback={routes.missions}
      />
      <View className="px-5">
        <ChunkyCard tone="canvas" className="gap-3 px-4 py-4">
          <Text className="text-ink font-body text-[14px] leading-[20px]">
            There are three missions in the Hamburg pilot. Pick one from the list and you are back
            on track.
          </Text>
          <ChunkyButton label="See all missions" onPress={() => router.replace(routes.missions)} />
        </ChunkyCard>
      </View>
    </Screen>
  );
}

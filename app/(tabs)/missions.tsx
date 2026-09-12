import { router } from 'expo-router';
import { FlatList, Text, View } from 'react-native';

import { ChunkyCard } from '@/components/ChunkyCard';
import { MissionCard } from '@/components/MissionCard';
import { Screen } from '@/components/Screen';
import { ScreenHeader } from '@/components/ScreenHeader';
import { LEVEL_LABEL } from '@/lib/levelChat';
import { MISSIONS } from '@/lib/missions';
import { routes } from '@/lib/navigation';
import { useAppStore } from '@/lib/store';
import type { Mission } from '@/lib/types';

export default function MissionsScreen() {
  const statuses = useAppStore((state) => state.statuses);
  const level = useAppStore((state) => state.level);

  const renderItem = ({ item }: { item: Mission }) => (
    <MissionCard
      mission={item}
      status={statuses[item.id] ?? 'not_started'}
      onPress={() => router.push(routes.missionPrep(item.id))}
    />
  );

  return (
    <Screen>
      <FlatList
        data={MISSIONS}
        keyExtractor={(mission) => mission.id}
        renderItem={renderItem}
        contentContainerClassName="gap-4 px-5 pb-8"
        ListHeaderComponent={
          <View className="gap-4">
            <ScreenHeader
              nested
              showBack={false}
              kicker="Explore"
              title="Real-life missions"
              subtitle={
                level === null
                  ? 'Three things to go and do in Hamburg this week.'
                  : `Three things to go and do in Hamburg. Your ${LEVEL_LABEL[level].toLowerCase()} tier decides how much help you get, not what you can open.`
              }
            />
          </View>
        }
        ListFooterComponent={
          <ChunkyCard tone="canvas" offset={4} className="mt-1 gap-1.5 px-4 py-3.5">
            <Text className="text-muted font-display text-[11px] tracking-widest">
              FIXED CONTENT
            </Text>
            <Text className="text-ink font-body text-[13.5px] leading-[20px]">
              These three missions are authored, not generated. What changes per learner is the prep
              inside them: which phrases lead, how much English shows, and the questions you get
              afterwards.
            </Text>
          </ChunkyCard>
        }
      />
    </Screen>
  );
}

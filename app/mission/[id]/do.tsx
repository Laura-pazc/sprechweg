import { router, useLocalSearchParams } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';

import { ChunkyButton } from '@/components/ChunkyButton';
import { ChunkyCard } from '@/components/ChunkyCard';
import { ChunkyChip } from '@/components/ChunkyChip';
import { MissionMissing } from '@/components/mission/MissionMissing';
import { Screen } from '@/components/Screen';
import { ScreenHeader } from '@/components/ScreenHeader';
import { getMission } from '@/lib/missions';
import { goBackOrReplace, routes } from '@/lib/navigation';
import { STATUS_LABEL } from '@/lib/progress';
import { useAppStore } from '@/lib/store';
import type { Mission } from '@/lib/types';

function DoMission({ mission }: { mission: Mission }) {
  const statuses = useAppStore((state) => state.statuses);
  const setStatus = useAppStore((state) => state.setStatus);

  const status = statuses[mission.id] ?? 'not_started';

  return (
    <Screen>
      <ScrollView contentContainerClassName="gap-5 px-5 pb-safe-offset-8">
        <ScreenHeader
          kicker="Do the mission"
          title={mission.title}
          subtitle={mission.where}
          backFallback={routes.missions}
          right={
            <ChunkyChip
              label={STATUS_LABEL[status]}
              tone={status === 'done' ? 'lime' : status === 'in_progress' ? 'sunny' : 'paper'}
            />
          }
        />

        <ChunkyCard tone={mission.accent} className="gap-2 px-4 py-4">
          <Text className="text-ink font-display text-[19px] leading-[24px]">
            {mission.minutes} minutes, outside, in German
          </Text>
          <Text className="text-ink font-body text-[14px] leading-[21px]">{mission.tagline}</Text>
        </ChunkyCard>

        <View className="gap-3">
          <Text className="text-ink font-display text-[19px]">Out there, do this</Text>
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

        <ChunkyCard tone="paper" offset={4} className="gap-2 px-4 py-4">
          <Text className="text-ink font-display text-[15px]">Pocket phrases</Text>
          {mission.vocab.slice(0, 3).map((item) => (
            <View key={item.id} className="gap-0.5">
              <Text className="text-ink font-display text-[14.5px]">{item.de}</Text>
              <Text className="text-muted font-body text-[12.5px]">{item.en}</Text>
            </View>
          ))}
        </ChunkyCard>

        <ChunkyCard tone="canvas" offset={4} className="gap-1.5 px-4 py-3.5">
          <Text className="text-muted font-display text-[11px] tracking-widest">NO VERIFYING</Text>
          <Text className="text-ink font-body text-[13.5px] leading-[20px]">
            The app cannot hear you and does not try. You mark this done yourself — then the journal
            turns it into something you keep.
          </Text>
        </ChunkyCard>

        <View className="gap-2">
          {status === 'not_started' ? (
            <>
              <ChunkyButton
                label="I'm heading out now"
                size="lg"
                fullWidth
                onPress={() => setStatus(mission.id, 'in_progress')}
              />
              <ChunkyButton
                label="Back to prep"
                variant="paper"
                fullWidth
                onPress={() => goBackOrReplace(routes.missionPrep(mission.id))}
              />
            </>
          ) : null}

          {status === 'in_progress' ? (
            <>
              <ChunkyButton
                label="I did it"
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
                label="Not today — pause this"
                variant="paper"
                fullWidth
                onPress={() => setStatus(mission.id, 'not_started')}
              />
            </>
          ) : null}

          {status === 'done' ? (
            <>
              <ChunkyButton
                label="Write my journal"
                size="lg"
                fullWidth
                onPress={() => router.push(routes.missionJournal(mission.id))}
              />
              <ChunkyButton
                label="Back to today"
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

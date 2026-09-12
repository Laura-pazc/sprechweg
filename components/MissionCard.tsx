import { Text, View } from 'react-native';

import { ChunkyButtonFace } from '@/components/ChunkyButton';
import { ChunkyPressableCard } from '@/components/ChunkyCard';
import { ChunkyChip } from '@/components/ChunkyChip';
import { DoneMark, MissionIcon } from '@/components/MissionIcon';
import { LEVEL_LABEL } from '@/lib/levelChat';
import type { Mission, MissionStatus } from '@/lib/types';

interface MissionCardProps {
  mission: Mission;
  status: MissionStatus;
  onPress: () => void;
}

const STATUS_NOTE: Record<MissionStatus, string | null> = {
  not_started: null,
  in_progress: 'In progress',
  done: 'Done',
};

export function MissionCard({ mission, status, onPress }: MissionCardProps) {
  const note = STATUS_NOTE[status];

  return (
    <ChunkyPressableCard
      tone={mission.accent}
      onPress={onPress}
      accessibilityLabel={`${mission.title}. ${mission.tagline}`}
      className="gap-4 px-4 py-4"
    >
      <View className="flex-row items-start justify-between gap-3">
        <View className="flex-row flex-wrap items-center gap-2">
          <ChunkyChip label={`${mission.minutes} min`} meta />
          <ChunkyChip label={LEVEL_LABEL[mission.level]} tone="cream" />
        </View>
        <View className="border-ink h-10 w-10 items-center justify-center rounded-full border-2 bg-white/70">
          <MissionIcon name={mission.icon} size={20} />
        </View>
      </View>

      <View className="gap-1.5">
        <Text className="text-ink font-display text-[24px] leading-[27px]">{mission.title}</Text>
        <Text className="text-ink font-strong text-[14px] leading-[20px]">{mission.tagline}</Text>
      </View>

      <View className="flex-row items-center justify-between gap-3">
        <ChunkyButtonFace
          label={status === 'done' ? 'Revisit' : 'Start practicing'}
          trailing={<Text className="text-ink font-display text-[15px]">→</Text>}
          variant="paper"
        />
        {note ? (
          <View className="flex-row items-center gap-1.5">
            {status === 'done' ? <DoneMark size={16} /> : null}
            <Text className="text-ink font-display text-[13px]">{note}</Text>
          </View>
        ) : null}
      </View>
    </ChunkyPressableCard>
  );
}

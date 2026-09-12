import { Flame } from 'lucide-react-native';
import { Text, View } from 'react-native';

import { ChunkyCard } from '@/components/ChunkyCard';
import { palette } from '@/lib/theme';

interface StreakCardProps {
  streakCount: number;
  entryCount: number;
  journaledToday: boolean;
}

export function StreakCard({ streakCount, entryCount, journaledToday }: StreakCardProps) {
  return (
    <ChunkyCard tone="lime" className="gap-3 px-4 py-4">
      <View className="flex-row items-center gap-3">
        <View className="border-ink h-12 w-12 items-center justify-center rounded-full border-2 bg-white">
          <Flame color={palette.ink} size={22} strokeWidth={2.25} />
        </View>
        <View className="flex-1">
          <Text className="text-ink font-display text-[22px] leading-[26px]">
            {streakCount} {streakCount === 1 ? 'day' : 'days'}
          </Text>
          <Text className="text-ink font-strong text-[13px]">
            Streak — one journal entry per day keeps it alive
          </Text>
        </View>
      </View>
      <Text className="text-ink font-body text-[13px] leading-[19px]">
        {journaledToday
          ? `Today is logged. ${entryCount} ${entryCount === 1 ? 'entry' : 'entries'} so far.`
          : 'Nothing logged today yet. Journal a mission before midnight to keep it.'}
      </Text>
    </ChunkyCard>
  );
}

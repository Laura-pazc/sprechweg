import { Text, View } from 'react-native';

import { ChunkyCard } from '@/components/ChunkyCard';

interface ProgressBarProps {
  /** Always labelled: colour alone never carries the meaning. */
  label: string;
  value: number;
}

export function ProgressBar({ label, value }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, Math.round(value)));

  return (
    <ChunkyCard tone="paper" offset={4} radius={18} className="px-4 py-3">
      <View className="flex-row items-center justify-between gap-3">
        <Text className="text-ink font-strong flex-1 text-[14px]">{label}</Text>
        <Text className="text-ink font-display text-[15px]">{clamped}%</Text>
      </View>
      <View
        accessibilityRole="progressbar"
        accessibilityValue={{ min: 0, max: 100, now: clamped }}
        className="bg-canvas border-ink mt-2.5 h-3.5 overflow-hidden rounded-full border-2"
      >
        <View className="bg-royal h-full rounded-full" style={{ width: `${clamped}%` }} />
      </View>
    </ChunkyCard>
  );
}

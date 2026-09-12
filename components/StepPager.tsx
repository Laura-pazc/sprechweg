import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { Text, View } from 'react-native';

import { ChunkyIconButton } from '@/components/ChunkyButton';
import { palette } from '@/lib/theme';

export interface StepItem<T extends string = string> {
  id: T;
  label: string;
}

interface StepPagerProps<T extends string> {
  items: StepItem<T>[];
  value: T;
  onChange: (id: T) => void;
}

/** Compact arrow pager: one line instead of a full-width segmented control. */
export function StepPager<T extends string>({ items, value, onChange }: StepPagerProps<T>) {
  const found = items.findIndex((item) => item.id === value);
  const index = found < 0 ? 0 : found;
  const current = items[index];
  if (!current) return null;

  const step = (delta: number) => {
    const next = items[(index + delta + items.length) % items.length];
    if (next) onChange(next.id);
  };

  const previous = items[(index - 1 + items.length) % items.length];
  const upcoming = items[(index + 1) % items.length];

  return (
    <View className="flex-row items-center gap-2">
      <ChunkyIconButton
        accessibilityLabel={previous ? `Back to ${previous.label}` : 'Previous section'}
        onPress={() => step(-1)}
        size={32}
      >
        <ChevronLeft color={palette.ink} size={16} strokeWidth={3} />
      </ChunkyIconButton>

      <View className="border-ink flex-1 flex-row items-center justify-center gap-2 rounded-full border-2 bg-white px-3 py-1.5">
        <Text className="text-ink font-display text-[12px] tracking-widest" numberOfLines={1}>
          {current.label.toUpperCase()}
        </Text>
        <Text className="text-muted font-display text-[10px] tracking-widest">
          {index + 1}/{items.length}
        </Text>
      </View>

      <ChunkyIconButton
        accessibilityLabel={upcoming ? `On to ${upcoming.label}` : 'Next section'}
        onPress={() => step(1)}
        size={32}
      >
        <ChevronRight color={palette.ink} size={16} strokeWidth={3} />
      </ChunkyIconButton>
    </View>
  );
}

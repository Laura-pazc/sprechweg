import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

import { ChunkyIconButton } from '@/components/ChunkyButton';
import { palette } from '@/lib/theme';

export interface StepPagerItem<T extends string> {
  value: T;
  label: string;
}

interface StepPagerProps<T extends string> {
  items: StepPagerItem<T>[];
  value: T;
  onChange: (value: T) => void;
}

export function StepPager<T extends string>({ items, value, onChange }: StepPagerProps<T>) {
  const { t } = useTranslation();
  const index = Math.max(
    0,
    items.findIndex((item) => item.value === value),
  );
  const isFirst = index === 0;
  const isLast = index === items.length - 1;

  const move = (delta: -1 | 1) => {
    const nextItem = items[index + delta];
    if (nextItem) onChange(nextItem.value);
  };

  return (
    <View
      accessibilityLabel={t('prep.stepCount', { current: index + 1, total: items.length })}
      className="flex-row items-center justify-between gap-3"
    >
      <ChunkyIconButton
        accessibilityLabel={t('prep.previousStep')}
        disabled={isFirst}
        onPress={() => move(-1)}
        size={44}
        tone="paper"
      >
        <ChevronLeft color={palette.ink} size={24} strokeWidth={3} />
      </ChunkyIconButton>

      <View className="border-ink min-w-0 flex-1 items-center rounded-full border-2 bg-white px-3 py-2.5">
        <Text className="text-ink font-display text-center text-[14px] leading-5">
          {items[index].label} · {index + 1}/{items.length}
        </Text>
      </View>

      <ChunkyIconButton
        accessibilityLabel={t('prep.nextStep')}
        disabled={isLast}
        onPress={() => move(1)}
        size={44}
        tone="lime"
      >
        <ChevronRight color={palette.ink} size={24} strokeWidth={3} />
      </ChunkyIconButton>
    </View>
  );
}

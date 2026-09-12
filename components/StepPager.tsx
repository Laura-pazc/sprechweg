import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { ChunkyIconButton } from '@/components/ChunkyButton';
import { palette } from '@/lib/theme';
import { cn } from '@/lib/utils';

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

  const move = (delta: number) => {
    const nextIndex = (index + delta + items.length) % items.length;
    onChange(items[nextIndex].value);
  };

  return (
    <View
      accessibilityLabel={t('prep.stepCount', { current: index + 1, total: items.length })}
      className="flex-row items-center justify-center gap-5"
    >
      <ChunkyIconButton
        accessibilityLabel={t('prep.previousStep')}
        onPress={() => move(-1)}
        size={44}
        tone="paper"
      >
        <ChevronLeft color={palette.ink} size={24} strokeWidth={3} />
      </ChunkyIconButton>

      <View className="min-w-[92px] flex-row items-center justify-center gap-2">
        {items.map((item, itemIndex) => (
          <View
            key={item.value}
            className={cn(
              'border-ink h-3 w-3 rounded-full border-2',
              itemIndex === index ? 'bg-royal' : 'bg-white',
            )}
          />
        ))}
      </View>

      <ChunkyIconButton
        accessibilityLabel={t('prep.nextStep')}
        onPress={() => move(1)}
        size={44}
        tone="lime"
      >
        <ChevronRight color={palette.ink} size={24} strokeWidth={3} />
      </ChunkyIconButton>
    </View>
  );
}

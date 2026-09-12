import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { ChunkyIconButton } from '@/components/ChunkyButton';
import { palette } from '@/lib/theme';
import { cn } from '@/lib/utils';

export interface StepItem<T extends string = string> {
  id: T;
  label: string;
}

interface StepPagerProps<T extends string> {
  items: StepItem<T>[];
  value: T;
  onChange: (id: T) => void;
}

export function StepPager<T extends string>({ items, value, onChange }: StepPagerProps<T>) {
  const { t } = useTranslation();
  const found = items.findIndex((item) => item.id === value);
  const index = found < 0 ? 0 : found;
  const current = items[index];
  if (!current) return null;

  const step = (delta: number) => {
    const next = items[(index + delta + items.length) % items.length];
    if (next) onChange(next.id);
  };

  return (
    <View className="gap-2">
      <View className="flex-row items-center gap-2">
        <ChunkyIconButton
          accessibilityLabel={t('prep.previousStep')}
          onPress={() => step(-1)}
          size={30}
        >
          <ChevronLeft color={palette.ink} size={15} strokeWidth={3} />
        </ChunkyIconButton>
        <Text className="text-ink font-strong flex-1 text-center text-[13px] leading-[18px]">
          {current.label}
        </Text>
        <ChunkyIconButton accessibilityLabel={t('prep.nextStep')} onPress={() => step(1)} size={30}>
          <ChevronRight color={palette.ink} size={15} strokeWidth={3} />
        </ChunkyIconButton>
      </View>
      <View
        className="flex-row justify-center gap-2"
        accessibilityLabel={t('prep.stepCount', { current: index + 1, total: items.length })}
      >
        {items.map((item, itemIndex) => (
          <View
            key={item.id}
            className={cn(
              'h-2 rounded-full',
              itemIndex === index ? 'bg-royal w-6' : 'bg-muted/30 w-2',
            )}
          />
        ))}
      </View>
    </View>
  );
}

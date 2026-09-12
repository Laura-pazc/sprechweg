import { Pressable, Text, View } from 'react-native';

import { cn } from '@/lib/utils';

export interface SegmentItem<T extends string = string> {
  id: T;
  label: string;
}

interface SegmentedTabsProps<T extends string> {
  items: SegmentItem<T>[];
  value: T;
  onChange: (id: T) => void;
}

export function SegmentedTabs<T extends string>({ items, value, onChange }: SegmentedTabsProps<T>) {
  return (
    <View className="border-ink flex-row gap-1 rounded-full border-2 bg-white p-1">
      {items.map((item) => {
        const active = item.id === value;
        return (
          <Pressable
            key={item.id}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            onPress={() => onChange(item.id)}
            className={cn(
              'flex-1 items-center justify-center rounded-full px-3 py-2.5',
              active && 'bg-ink',
            )}
          >
            <Text
              className={cn('font-display text-[13px]', active ? 'text-cream' : 'text-ink')}
              numberOfLines={1}
            >
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

import { Pressable, Text, View } from 'react-native';

import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  title: string;
  actionLabel?: string;
  onActionPress?: () => void;
  className?: string;
}

export function SectionHeading({
  title,
  actionLabel,
  onActionPress,
  className,
}: SectionHeadingProps) {
  return (
    <View className={cn('flex-row items-end justify-between gap-3', className)}>
      <Text className="text-ink font-display flex-1 text-[19px]">{title}</Text>
      {actionLabel && onActionPress ? (
        <Pressable accessibilityRole="button" onPress={onActionPress} className="py-1">
          <Text className="text-ink font-strong border-ink border-b-2 text-[14px]">
            {actionLabel}
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}

import { ArrowLeft } from 'lucide-react-native';
import type { ReactNode } from 'react';
import { Text, View } from 'react-native';
import type { Href } from 'expo-router';

import { ChunkyIconButton } from '@/components/ChunkyButton';
import { palette } from '@/lib/theme';
import { goBackOrReplace } from '@/lib/navigation';

interface ScreenHeaderProps {
  title: string;
  /** Small uppercase line above the title. */
  kicker?: string;
  subtitle?: string;
  /** Where back goes when the screen was opened directly (deep link, reload). */
  backFallback?: Href;
  showBack?: boolean;
  right?: ReactNode;
}

export function ScreenHeader({
  title,
  kicker,
  subtitle,
  backFallback = '/(tabs)',
  showBack = true,
  right,
}: ScreenHeaderProps) {
  return (
    <View className="gap-3 px-5 pt-2 pb-4">
      {(showBack || right) && (
        <View className="flex-row items-start justify-between">
          {showBack ? (
            <ChunkyIconButton
              accessibilityLabel="Go back"
              onPress={() => goBackOrReplace(backFallback)}
              size={42}
            >
              <ArrowLeft color={palette.ink} size={20} />
            </ChunkyIconButton>
          ) : (
            <View />
          )}
          {right}
        </View>
      )}

      <View className="gap-1.5">
        {kicker ? (
          <Text className="text-magenta font-display text-[12px] tracking-widest">
            {kicker.toUpperCase()}
          </Text>
        ) : null}
        <Text className="text-ink font-display text-[30px] leading-[34px]">{title}</Text>
        {subtitle ? (
          <Text className="text-muted font-strong text-[15px] leading-[21px]">{subtitle}</Text>
        ) : null}
      </View>
    </View>
  );
}

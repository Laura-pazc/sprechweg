import { ArrowLeft } from 'lucide-react-native';
import type { ReactNode } from 'react';
import { Text, View } from 'react-native';
import type { Href } from 'expo-router';

import { ChunkyIconButton } from '@/components/ChunkyButton';
import { palette } from '@/lib/theme';
import { goBackOrReplace } from '@/lib/navigation';
import { cn } from '@/lib/utils';

interface ScreenHeaderProps {
  title: string;
  /** Small uppercase line above the title. */
  kicker?: string;
  subtitle?: string;
  /** Where back goes when the screen was opened directly (deep link, reload). */
  backFallback?: Href;
  showBack?: boolean;
  right?: ReactNode;
  /** Tighter spacing and smaller type, for content-dense screens like mission prep. */
  compact?: boolean;
}

export function ScreenHeader({
  title,
  kicker,
  subtitle,
  backFallback = '/(tabs)',
  showBack = true,
  right,
  compact = false,
}: ScreenHeaderProps) {
  return (
    <View className={cn('px-5', compact ? 'gap-2 pt-1 pb-2' : 'gap-3 pt-2 pb-4')}>
      {(showBack || right) && (
        <View className="flex-row items-center justify-between">
          {showBack ? (
            <ChunkyIconButton
              accessibilityLabel="Go back"
              onPress={() => goBackOrReplace(backFallback)}
              size={compact ? 32 : 38}
            >
              <ArrowLeft color={palette.ink} size={compact ? 16 : 18} strokeWidth={2.5} />
            </ChunkyIconButton>
          ) : (
            <View />
          )}
          {right}
        </View>
      )}

      <View className={cn(compact ? 'gap-1' : 'gap-1.5')}>
        {kicker ? (
          <Text
            className={cn(
              'text-magenta font-display tracking-widest',
              compact ? 'text-[10.5px]' : 'text-[12px]',
            )}
          >
            {kicker.toUpperCase()}
          </Text>
        ) : null}
        <Text
          className={cn(
            'text-ink font-display',
            compact ? 'text-[23px] leading-[27px]' : 'text-[30px] leading-[34px]',
          )}
        >
          {title}
        </Text>
        {subtitle ? (
          <Text
            className={cn(
              'text-muted font-strong',
              compact ? 'text-[13px] leading-[18px]' : 'text-[15px] leading-[21px]',
            )}
          >
            {subtitle}
          </Text>
        ) : null}
      </View>
    </View>
  );
}

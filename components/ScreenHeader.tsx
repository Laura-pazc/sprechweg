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
  /** Corner action on the right — status chip, close button, level tag. */
  right?: ReactNode;
  /** Tighter spacing and smaller type, for content-dense screens like mission prep. */
  compact?: boolean;
  /** Set when the header already sits inside a horizontally padded container. */
  nested?: boolean;
}

export function ScreenHeader({
  title,
  kicker,
  subtitle,
  backFallback = '/(tabs)',
  showBack = true,
  right,
  compact = false,
  nested = false,
}: ScreenHeaderProps) {
  return (
    <View
      className={cn(
        nested ? undefined : 'px-3',
        nested ? undefined : compact ? 'pt-1 pb-2' : 'pt-1.5 pb-3',
      )}
    >
      <View className="flex-row items-start gap-2.5">
        {showBack ? (
          <ChunkyIconButton
            accessibilityLabel="Go back"
            onPress={() => goBackOrReplace(backFallback)}
            size={compact ? 32 : 36}
            className={cn('mt-0.5', nested && '-ml-2.5')}
          >
            <ArrowLeft color={palette.ink} size={compact ? 16 : 18} strokeWidth={2.5} />
          </ChunkyIconButton>
        ) : null}

        <View
          className={cn(
            'flex-1',
            compact ? 'gap-1' : 'gap-1.5',
            !showBack && !nested && 'pl-2',
            compact ? 'pt-0' : 'pt-0.5',
          )}
        >
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
              compact ? 'text-[23px] leading-[27px]' : 'text-[27px] leading-[31px]',
            )}
          >
            {title}
          </Text>
          {subtitle ? (
            <Text
              className={cn(
                'text-muted font-strong',
                compact ? 'text-[13px] leading-[18px]' : 'text-[14px] leading-[20px]',
              )}
            >
              {subtitle}
            </Text>
          ) : null}
        </View>

        {right ? (
          <View className={cn('max-w-[40%] shrink items-end', nested && '-mr-2.5')}>{right}</View>
        ) : null}
      </View>
    </View>
  );
}

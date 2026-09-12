import { ArrowLeft } from 'lucide-react-native';
import type { ReactNode } from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
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
  /** Optional deterministic back action for flows with a known previous screen. */
  onBack?: () => void;
  showBack?: boolean;
  /** Corner action on the right — close button, level tag, or other independent action. */
  right?: ReactNode;
  /** Context attached to the title, such as the current mission status. */
  titleAccessory?: ReactNode;
  /** Gives mission-detail headers a quieter kicker and more open title rhythm. */
  missionDetail?: boolean;
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
  onBack,
  showBack = true,
  right,
  titleAccessory,
  missionDetail = false,
  compact = false,
  nested = false,
}: ScreenHeaderProps) {
  const { t } = useTranslation();

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
            accessibilityLabel={t('common.back')}
            onPress={onBack ?? (() => goBackOrReplace(backFallback))}
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
                'font-display tracking-widest',
                missionDetail ? 'text-muted text-[10px]' : 'text-magenta',
                !missionDetail && (compact ? 'text-[10.5px]' : 'text-[12px]'),
              )}
            >
              {kicker.toUpperCase()}
            </Text>
          ) : null}
          <View className={cn(missionDetail && 'gap-2')}>
            <Text
              className={cn(
                'text-ink font-display',
                compact
                  ? 'text-[22px] leading-[26px]'
                  : missionDetail
                    ? 'text-[24px] leading-[32px]'
                    : 'text-[24px] leading-[29px]',
              )}
            >
              {title}
            </Text>
            {titleAccessory ? <View className="self-start">{titleAccessory}</View> : null}
          </View>
          {subtitle ? (
            <Text
              className={cn(
                'text-muted',
                missionDetail ? 'font-ui text-[14px] leading-[21px]' : 'font-strong',
                !missionDetail &&
                  (compact ? 'text-[13px] leading-[18px]' : 'text-[14px] leading-[20px]'),
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

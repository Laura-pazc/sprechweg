import type { ReactNode } from 'react';
import { Text, View } from 'react-native';

import { TONE_BG, TONE_TEXT, type CardTone } from '@/components/ChunkyCard';
import { cn } from '@/lib/utils';

interface ChunkyChipProps {
  label: string;
  tone?: CardTone;
  leading?: ReactNode;
  /** Uppercase, letter-spaced treatment used for meta tags like "15 MIN". */
  meta?: boolean;
  className?: string;
}

export function ChunkyChip({
  label,
  tone = 'paper',
  leading,
  meta = false,
  className,
}: ChunkyChipProps) {
  return (
    <View
      className={cn(
        'border-ink flex-row items-center gap-1.5 self-start rounded-full border-2 px-3 py-1.5',
        TONE_BG[tone],
        className,
      )}
    >
      {leading}
      <Text
        className={cn(
          TONE_TEXT[tone],
          meta ? 'font-display text-[11px] tracking-widest' : 'font-strong text-[13px]',
        )}
      >
        {meta ? label.toUpperCase() : label}
      </Text>
    </View>
  );
}

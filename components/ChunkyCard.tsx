import type { ReactNode } from 'react';
import {
  Pressable,
  View,
  type AccessibilityState,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { cn } from '@/lib/utils';

export type CardTone =
  | 'paper'
  | 'cream'
  | 'canvas'
  | 'autumn'
  | 'sky'
  | 'coral'
  | 'magenta'
  | 'sunny'
  | 'lime'
  | 'royal'
  | 'ink';

export const TONE_BG: Record<CardTone, string> = {
  paper: 'bg-white',
  cream: 'bg-cream',
  canvas: 'bg-canvas',
  autumn: 'bg-autumn',
  sky: 'bg-sky',
  coral: 'bg-coral',
  magenta: 'bg-magenta',
  sunny: 'bg-sunny',
  lime: 'bg-lime',
  royal: 'bg-royal',
  ink: 'bg-ink',
};

/** Foreground that clears AA contrast on each tone. */
export const TONE_TEXT: Record<CardTone, string> = {
  paper: 'text-ink',
  cream: 'text-ink',
  canvas: 'text-ink',
  autumn: 'text-ink',
  sky: 'text-ink',
  coral: 'text-ink',
  magenta: 'text-ink',
  sunny: 'text-ink',
  lime: 'text-ink',
  royal: 'text-cream',
  ink: 'text-cream',
};

/**
 * Hard offset shadow, drawn as an ink layer behind the surface instead of a
 * blurred platform shadow. Rendered first so it stays behind the content.
 */
function HardShadow({ offset, radius }: { offset: number; radius: number }) {
  return (
    <View
      pointerEvents="none"
      className="bg-ink absolute"
      style={{
        left: offset,
        top: offset,
        right: -offset,
        bottom: -offset,
        borderRadius: radius,
      }}
    />
  );
}

export interface ChunkyCardProps {
  tone?: CardTone;
  /** Shadow depth in px. Reserved as outer margin so cards never clip. */
  offset?: number;
  radius?: number;
  className?: string;
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
}

export function ChunkyCard({
  tone = 'paper',
  offset = 6,
  radius = 22,
  className,
  style,
  children,
}: ChunkyCardProps) {
  return (
    <View style={[{ marginRight: offset, marginBottom: offset }, style]}>
      <HardShadow offset={offset} radius={radius} />
      <View
        className={cn('border-ink overflow-hidden border-2', TONE_BG[tone], className)}
        style={{ borderRadius: radius }}
      >
        {children}
      </View>
    </View>
  );
}

export interface ChunkyPressableCardProps extends ChunkyCardProps {
  onPress: () => void;
  accessibilityLabel?: string;
  accessibilityState?: AccessibilityState;
}

/** Same surface as ChunkyCard, but the whole card presses into its shadow. */
export function ChunkyPressableCard({
  tone = 'paper',
  offset = 6,
  radius = 22,
  className,
  style,
  onPress,
  accessibilityLabel,
  accessibilityState,
  children,
}: ChunkyPressableCardProps) {
  return (
    <View style={[{ marginRight: offset, marginBottom: offset }, style]}>
      <HardShadow offset={offset} radius={radius} />
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        accessibilityState={accessibilityState}
        onPress={onPress}
        className={cn('border-ink overflow-hidden border-2', TONE_BG[tone], className)}
        style={({ pressed }) => [
          { borderRadius: radius },
          pressed ? { transform: [{ translateX: offset }, { translateY: offset }] } : null,
        ]}
      >
        {children}
      </Pressable>
    </View>
  );
}

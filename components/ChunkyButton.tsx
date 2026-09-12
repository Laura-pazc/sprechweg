import type { ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';

import { TONE_BG, TONE_TEXT, type CardTone } from '@/components/ChunkyCard';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'ink' | 'paper' | 'lime' | 'quiet';

const VARIANT_TONE: Record<ButtonVariant, CardTone> = {
  primary: 'royal',
  ink: 'ink',
  paper: 'paper',
  lime: 'lime',
  quiet: 'canvas',
};

type ButtonSize = 'sm' | 'md' | 'lg';

const SIZE_BOX: Record<ButtonSize, string> = {
  sm: 'px-3.5 py-2',
  md: 'px-4 py-3',
  lg: 'px-5 py-4',
};

const SIZE_TEXT: Record<ButtonSize, string> = {
  sm: 'text-[13px]',
  md: 'text-[15px]',
  lg: 'text-[16px]',
};

const SIZE_RADIUS: Record<ButtonSize, number> = { sm: 12, md: 14, lg: 16 };

interface ChunkyButtonFaceProps {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Trailing element, e.g. an arrow glyph or lucide icon. */
  trailing?: ReactNode;
  leading?: ReactNode;
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
}

/**
 * The button surface without any press handling. Use inside an already
 * pressable parent (e.g. ChunkyPressableCard) so the web build does not nest
 * one button element inside another.
 */
export function ChunkyButtonFace({
  label,
  variant = 'primary',
  size = 'md',
  trailing,
  leading,
  fullWidth = false,
  disabled = false,
  className,
}: ChunkyButtonFaceProps) {
  const tone = VARIANT_TONE[variant];
  const offset = size === 'sm' ? 3 : 4;
  const radius = SIZE_RADIUS[size];

  return (
    <View
      style={{ marginRight: offset, marginBottom: offset }}
      className={cn(fullWidth ? 'self-stretch' : 'self-start', className)}
    >
      {!disabled && (
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
      )}
      <View
        className={cn(
          'border-ink flex-row items-center justify-center gap-2 border-2',
          SIZE_BOX[size],
          disabled ? 'bg-canvas' : TONE_BG[tone],
        )}
        style={{ borderRadius: radius }}
      >
        {leading}
        <Text
          className={cn('font-display', SIZE_TEXT[size], disabled ? 'text-muted' : TONE_TEXT[tone])}
        >
          {label}
        </Text>
        {trailing}
      </View>
    </View>
  );
}

interface ChunkyButtonProps extends ChunkyButtonFaceProps {
  onPress: () => void;
}

export function ChunkyButton({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  trailing,
  leading,
  fullWidth = false,
  disabled = false,
  className,
}: ChunkyButtonProps) {
  const tone = VARIANT_TONE[variant];
  const offset = size === 'sm' ? 3 : 4;
  const radius = SIZE_RADIUS[size];

  return (
    <View
      style={{ marginRight: offset, marginBottom: offset }}
      className={cn(fullWidth ? 'self-stretch' : 'self-start', className)}
    >
      {!disabled && (
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
      )}
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ disabled }}
        disabled={disabled}
        onPress={onPress}
        className={cn(
          'border-ink flex-row items-center justify-center gap-2 border-2',
          SIZE_BOX[size],
          disabled ? 'bg-canvas' : TONE_BG[tone],
        )}
        style={({ pressed }) => [
          { borderRadius: radius },
          pressed && !disabled
            ? { transform: [{ translateX: offset }, { translateY: offset }] }
            : null,
        ]}
      >
        {leading}
        <Text
          className={cn('font-display', SIZE_TEXT[size], disabled ? 'text-muted' : TONE_TEXT[tone])}
        >
          {label}
        </Text>
        {trailing}
      </Pressable>
    </View>
  );
}

interface ChunkyIconButtonProps {
  onPress: () => void;
  children: ReactNode;
  accessibilityLabel: string;
  tone?: CardTone;
  size?: number;
  className?: string;
}

export function ChunkyIconButton({
  onPress,
  children,
  accessibilityLabel,
  tone = 'paper',
  size = 44,
  className,
}: ChunkyIconButtonProps) {
  const offset = 3;

  return (
    <View style={{ marginRight: offset, marginBottom: offset }} className={className}>
      <View
        pointerEvents="none"
        className="bg-ink absolute rounded-full"
        style={{ left: offset, top: offset, right: -offset, bottom: -offset }}
      />
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        onPress={onPress}
        className={cn(
          'border-ink items-center justify-center rounded-full border-2',
          TONE_BG[tone],
        )}
        style={({ pressed }) => [
          { width: size, height: size },
          pressed ? { transform: [{ translateX: offset }, { translateY: offset }] } : null,
        ]}
      >
        {children}
      </Pressable>
    </View>
  );
}

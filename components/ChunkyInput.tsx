import { useState } from 'react';
import { TextInput, type TextInputProps } from 'react-native';

import { palette } from '@/lib/theme';
import { cn } from '@/lib/utils';

interface ChunkyInputProps extends TextInputProps {
  className?: string;
}

export function ChunkyInput({ className, multiline, onBlur, onFocus, ...rest }: ChunkyInputProps) {
  const [focused, setFocused] = useState(false);

  return (
    <TextInput
      placeholderTextColor={palette.muted}
      multiline={multiline}
      onFocus={(event) => {
        setFocused(true);
        onFocus?.(event);
      }}
      onBlur={(event) => {
        setFocused(false);
        onBlur?.(event);
      }}
      style={multiline ? { textAlignVertical: 'top' } : undefined}
      className={cn(
        'font-body text-ink rounded-[14px] border-2 bg-white px-4 py-3 text-[15px]',
        focused ? 'border-royal' : 'border-ink',
        multiline && 'min-h-[104px]',
        className,
      )}
      {...rest}
    />
  );
}

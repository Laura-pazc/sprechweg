import { TextInput, type TextInputProps } from 'react-native';

import { palette } from '@/lib/theme';
import { cn } from '@/lib/utils';

interface ChunkyInputProps extends TextInputProps {
  className?: string;
}

export function ChunkyInput({ className, multiline, ...rest }: ChunkyInputProps) {
  return (
    <TextInput
      placeholderTextColor={palette.muted}
      multiline={multiline}
      style={multiline ? { textAlignVertical: 'top' } : undefined}
      className={cn(
        'border-ink font-body text-ink rounded-2xl border-2 bg-white px-4 py-3 text-[15px]',
        multiline && 'min-h-[104px]',
        className,
      )}
      {...rest}
    />
  );
}

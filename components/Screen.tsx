import type { ReactNode } from 'react';
import { View } from 'react-native';

import { cn } from '@/lib/utils';

/** Cream canvas with device-safe top and bottom breathing room. */
export function Screen({ children, className }: { children?: ReactNode; className?: string }) {
  return (
    <View className={cn('bg-cream pt-safe-offset-3 pb-safe-offset-3 flex-1', className)}>
      {children}
    </View>
  );
}

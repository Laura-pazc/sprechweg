import type { ReactNode } from 'react';
import { View } from 'react-native';

import { cn } from '@/lib/utils';

/** Cream canvas with top safe-area padding — every screen ships its own header. */
export function Screen({ children, className }: { children?: ReactNode; className?: string }) {
  return <View className={cn('bg-cream pt-safe flex-1', className)}>{children}</View>;
}

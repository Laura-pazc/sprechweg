import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { ChunkyCard } from '@/components/ChunkyCard';
import type { ConversationLine } from '@/lib/types';
import { cn } from '@/lib/utils';

interface ConversationSimProps {
  lines: ConversationLine[];
  /** Beginners keep the English on by default; advanced learners start without. */
  initialShowEnglish: boolean;
}

export function ConversationSim({ lines, initialShowEnglish }: ConversationSimProps) {
  const [showEnglish, setShowEnglish] = useState(initialShowEnglish);

  return (
    <View className="gap-2.5">
      <View className="flex-row items-center justify-between gap-3">
        <Text className="text-muted font-strong flex-1 text-[12px] leading-[17px]">
          One likely version of the exchange. Read your lines out loud before you go.
        </Text>
        <Pressable
          accessibilityRole="switch"
          accessibilityState={{ checked: showEnglish }}
          accessibilityLabel="Show English glosses"
          onPress={() => setShowEnglish((value) => !value)}
          className={cn(
            'border-ink rounded-full border-2 px-2.5 py-1.5',
            showEnglish ? 'bg-sunny' : 'bg-white',
          )}
        >
          <Text className="text-ink font-display text-[10.5px] tracking-wide">
            {showEnglish ? 'ENGLISH ON' : 'ENGLISH OFF'}
          </Text>
        </Pressable>
      </View>

      <View className="gap-2.5">
        {lines.map((line) => {
          const mine = line.speaker === 'you';
          return (
            <View key={line.id} className={cn('w-full', mine ? 'items-end' : 'items-start')}>
              <Text className="text-muted font-display mb-0.5 text-[9.5px] tracking-widest">
                {mine ? 'YOU' : 'THEM'}
              </Text>
              <ChunkyCard
                tone={mine ? 'lime' : 'paper'}
                offset={3}
                radius={16}
                style={{ maxWidth: '92%' }}
                className="gap-0.5 px-3 py-2.5"
              >
                <Text className="text-ink font-display text-[13.5px] leading-[19px]">
                  {line.de}
                </Text>
                {showEnglish ? (
                  <Text className="text-muted font-body text-[12px] leading-[17px]">{line.en}</Text>
                ) : null}
              </ChunkyCard>
            </View>
          );
        })}
      </View>
    </View>
  );
}

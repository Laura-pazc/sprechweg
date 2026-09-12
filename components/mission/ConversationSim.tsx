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
    <View className="gap-3">
      <View className="flex-row items-center justify-between gap-3">
        <Text className="text-muted font-strong flex-1 text-[13px] leading-[19px]">
          One likely version of the exchange. Read your lines out loud before you go.
        </Text>
        <Pressable
          accessibilityRole="switch"
          accessibilityState={{ checked: showEnglish }}
          accessibilityLabel="Show English glosses"
          onPress={() => setShowEnglish((value) => !value)}
          className={cn(
            'border-ink rounded-full border-2 px-3 py-2',
            showEnglish ? 'bg-sunny' : 'bg-white',
          )}
        >
          <Text className="text-ink font-display text-[12px] tracking-wide">
            {showEnglish ? 'ENGLISH ON' : 'ENGLISH OFF'}
          </Text>
        </Pressable>
      </View>

      <View className="gap-3">
        {lines.map((line) => {
          const mine = line.speaker === 'you';
          return (
            <View key={line.id} className={cn('w-full', mine ? 'items-end' : 'items-start')}>
              <Text className="text-muted font-display mb-1 text-[11px] tracking-widest">
                {mine ? 'YOU' : 'THEM'}
              </Text>
              <ChunkyCard
                tone={mine ? 'lime' : 'paper'}
                offset={4}
                radius={18}
                style={{ maxWidth: '90%' }}
                className="gap-1 px-3.5 py-3"
              >
                <Text className="text-ink font-display text-[15px] leading-[21px]">{line.de}</Text>
                {showEnglish ? (
                  <Text className="text-muted font-body text-[13px] leading-[19px]">{line.en}</Text>
                ) : null}
              </ChunkyCard>
            </View>
          );
        })}
      </View>
    </View>
  );
}

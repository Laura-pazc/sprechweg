import { Check } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { ChunkyCard } from '@/components/ChunkyCard';
import { palette } from '@/lib/theme';
import type { Mission } from '@/lib/types';
import { cn } from '@/lib/utils';

interface VocabListProps {
  mission: Mission;
  studiedIds: string[];
  onToggle: (vocabId: string) => void;
}

export function VocabList({ mission, studiedIds, onToggle }: VocabListProps) {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <View className="gap-2.5">
      <View className="flex-row items-center justify-between gap-3">
        <Text className="text-muted font-strong flex-1 text-[12px] leading-[17px]">
          Tap the phrases you want to remember.
        </Text>
        <Pressable
          accessibilityRole="button"
          accessibilityState={{ expanded: showHelp }}
          onPress={() => setShowHelp((value) => !value)}
          className="py-1"
        >
          <Text className="text-royal font-display text-[12px]">
            {showHelp ? 'Hide help' : 'Need help?'}
          </Text>
        </Pressable>
      </View>

      <ChunkyCard tone="paper" offset={3} className="px-0 py-0">
        {mission.vocab.map((item, index) => {
          const studied = studiedIds.includes(item.id);
          return (
            <Pressable
              key={item.id}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: studied }}
              accessibilityLabel={`${item.de} — ${item.en}`}
              onPress={() => onToggle(item.id)}
              className={cn(
                'flex-row items-start gap-2.5 px-3.5 py-2.5',
                index > 0 && 'border-ink border-t-2',
                studied && 'bg-lime/25',
              )}
            >
              <View
                className={cn(
                  'border-ink mt-0.5 h-6 w-6 items-center justify-center rounded-lg border-2',
                  studied ? 'bg-lime' : 'bg-white',
                )}
              >
                {studied ? <Check color={palette.ink} size={14} strokeWidth={3} /> : null}
              </View>
              <View className="flex-1 gap-0.5">
                <Text className="text-ink font-display text-[14px] leading-[19px]">{item.de}</Text>
                {showHelp ? (
                  <>
                    <Text className="text-ink font-strong text-[12.5px] leading-[17px]">{item.en}</Text>
                    <Text className="text-muted font-body text-[11.5px] leading-[16px]">{item.note}</Text>
                  </>
                ) : null}
              </View>
            </Pressable>
          );
        })}
      </ChunkyCard>
    </View>
  );
}

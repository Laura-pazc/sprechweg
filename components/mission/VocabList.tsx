import { Check } from 'lucide-react-native';
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
  const studiedCount = mission.vocab.filter((item) => studiedIds.includes(item.id)).length;

  return (
    <View className="gap-2.5">
      <Text className="text-muted font-strong text-[12px] leading-[17px]">
        {studiedCount} of {mission.vocab.length} marked as studied. Your recall quiz in the journal
        is built from the ones you tick.
      </Text>

      <ChunkyCard tone="paper" className="px-0 py-0">
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
                <Text className="text-ink font-strong text-[12.5px] leading-[17px]">{item.en}</Text>
                <Text className="text-muted font-body text-[11.5px] leading-[16px]">
                  {item.note}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </ChunkyCard>
    </View>
  );
}

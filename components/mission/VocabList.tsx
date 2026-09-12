import { CircleHelp } from 'lucide-react-native';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

import { ChunkyIconButton } from '@/components/ChunkyButton';
import { ChunkyPressableCard } from '@/components/ChunkyCard';
import { palette } from '@/lib/theme';
import type { VocabItem } from '@/lib/types';

interface VocabListProps {
  items: VocabItem[];
  selected: string[];
  onToggle: (id: string) => void;
}

export function VocabList({ items, selected, onToggle }: VocabListProps) {
  const { t } = useTranslation();
  const [showHelp, setShowHelp] = useState(false);

  return (
    <View className="gap-3">
      <View className="flex-row items-start justify-between gap-3">
        <Text className="text-ink font-strong flex-1 text-[14px] leading-5">
          {t('prep.vocabInstruction')}
        </Text>
        <ChunkyIconButton
          accessibilityLabel={t('prep.needHelp')}
          onPress={() => setShowHelp((visible) => !visible)}
          size={32}
          tone={showHelp ? 'lime' : 'paper'}
        >
          <CircleHelp color={palette.ink} size={17} strokeWidth={2.5} />
        </ChunkyIconButton>
      </View>

      {showHelp ? (
        <View className="border-ink bg-lime rounded-xl border-2 px-3 py-2.5">
          <Text className="text-ink font-body text-[13px] leading-[18px]">
            {t('prep.vocabHelp')}
          </Text>
        </View>
      ) : null}

      {items.map((item) => {
        const active = selected.includes(item.id);
        return (
          <ChunkyPressableCard
            key={item.id}
            tone={active ? 'lime' : 'paper'}
            offset={3}
            radius={13}
            className="px-3.5 py-3"
            onPress={() => onToggle(item.id)}
            accessibilityLabel={`${item.de}: ${item.en}`}
          >
            <View className="flex-row items-start justify-between gap-3">
              <View className="min-w-0 flex-1">
                <Text className="text-ink font-display text-[16px] leading-5">{item.de}</Text>
                <Text className="text-muted font-body mt-0.5 text-[13px] leading-[18px]">
                  {item.en}
                </Text>
                <Text className="text-ink/70 font-body mt-1 text-[11px] leading-4">
                  {item.note}
                </Text>
              </View>
              <View
                className={`border-ink h-5 w-5 items-center justify-center rounded-md border-2 ${active ? 'bg-ink' : 'bg-white'}`}
              >
                {active ? <Text className="text-cream font-display text-[10px]">✓</Text> : null}
              </View>
            </View>
          </ChunkyPressableCard>
        );
      })}
    </View>
  );
}

import { Pressable, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { ChunkyCard } from '@/components/ChunkyCard';
import { ChunkyInput } from '@/components/ChunkyInput';
import type { MissionRecallCheck as MissionRecallCheckData } from '@/lib/types';
import { cn } from '@/lib/utils';

export interface FullRecallAnswers {
  multipleChoice: number | null;
  fillBlank: string;
  fromRealLife: string;
}

interface MissionRecallCheckProps {
  check: MissionRecallCheckData;
  answers: FullRecallAnswers;
  onChange: (answers: FullRecallAnswers) => void;
}

export function MissionRecallCheck({ check, answers, onChange }: MissionRecallCheckProps) {
  const { t } = useTranslation();

  return (
    <View className="gap-3">
      <Text className="text-muted font-body text-[13px] leading-[18px]">{check.intro}</Text>

      <ChunkyCard tone="paper" offset={3} className="gap-3 px-4 py-4">
        <Text className="text-ink font-display text-[18px] leading-[23px]">
          {check.multipleChoice.prompt}
        </Text>
        <View accessibilityRole="radiogroup" className="gap-2">
          {check.multipleChoice.options.map((option, index) => (
            <Pressable
              key={option}
              accessibilityRole="radio"
              accessibilityState={{ selected: answers.multipleChoice === index }}
              onPress={() => onChange({ ...answers, multipleChoice: index })}
              className={cn(
                'border-ink rounded-2xl border-2 px-3.5 py-2.5',
                answers.multipleChoice === index ? 'bg-sky' : 'bg-white',
              )}
            >
              <Text className="text-ink font-strong text-[14px] leading-[19px]">{option}</Text>
            </Pressable>
          ))}
        </View>
      </ChunkyCard>

      <ChunkyCard tone="paper" offset={3} className="gap-2.5 px-4 py-4">
        <Text className="text-ink font-display text-[18px] leading-[23px]">
          {check.fillBlank.prompt}
        </Text>
        <Text className="text-muted font-body text-[13px] leading-[18px]">
          {check.fillBlank.sentence}
        </Text>
        <ChunkyInput
          value={answers.fillBlank}
          onChangeText={(fillBlank) => onChange({ ...answers, fillBlank })}
          placeholder={t('prep.missingWordPlaceholder')}
          autoCapitalize="none"
        />
      </ChunkyCard>

      <ChunkyCard tone="paper" offset={3} className="gap-2.5 px-4 py-4">
        <Text className="text-ink font-display text-[18px] leading-[23px]">
          {check.fromRealLife.prompt}
        </Text>
        <ChunkyInput
          value={answers.fromRealLife}
          onChangeText={(fromRealLife) => onChange({ ...answers, fromRealLife })}
          placeholder={t('missionJournal.realLifeRecallPlaceholder')}
          multiline
          className="min-h-[100px] px-4 py-3.5"
          textAlignVertical="top"
        />
      </ChunkyCard>
    </View>
  );
}

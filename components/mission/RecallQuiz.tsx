import { Pressable, Text, View } from 'react-native';

import { ChunkyCard } from '@/components/ChunkyCard';
import type { RecallQuestion } from '@/lib/types';
import { cn } from '@/lib/utils';

interface RecallQuizProps {
  questions: RecallQuestion[];
  /** One entry per question; null until the learner picks. */
  selections: (number | null)[];
  onSelect: (questionIndex: number, optionIndex: number) => void;
  revealed: boolean;
}

export function RecallQuiz({ questions, selections, onSelect, revealed }: RecallQuizProps) {
  return (
    <View className="gap-3">
      {questions.map((question, questionIndex) => {
        const selected = selections[questionIndex];

        return (
          <ChunkyCard key={question.id} tone="paper" className="gap-3 px-4 py-4">
            <View className="gap-1">
              <Text className="text-muted font-display text-[11px] tracking-widest">
                WORD {questionIndex + 1} OF {questions.length}
              </Text>
              <Text className="text-ink font-display text-[20px] leading-[25px]">
                {question.de}
              </Text>
            </View>

            <View className="gap-2">
              {question.options.map((option, optionIndex) => {
                const isSelected = selected === optionIndex;
                const isAnswer = optionIndex === question.answerIndex;
                return (
                  <Pressable
                    key={option}
                    accessibilityRole="radio"
                    accessibilityState={{ selected: isSelected }}
                    disabled={revealed}
                    onPress={() => onSelect(questionIndex, optionIndex)}
                    className={cn(
                      'border-ink rounded-2xl border-2 px-3.5 py-3',
                      isSelected ? 'bg-sky' : 'bg-white',
                      revealed && isAnswer && 'bg-lime',
                      revealed && isSelected && !isAnswer && 'bg-coral',
                    )}
                  >
                    <Text className="text-ink font-strong text-[15px] leading-[20px]">
                      {option}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </ChunkyCard>
        );
      })}
    </View>
  );
}

import { useEffect, useRef, useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { ChunkyButton } from '@/components/ChunkyButton';
import { ChunkyCard } from '@/components/ChunkyCard';
import { ChunkyChip } from '@/components/ChunkyChip';
import { ChunkyInput } from '@/components/ChunkyInput';
import { isFillBlankCorrect, missingFromSentence } from '@/lib/content';
import type { PracticeQuestion } from '@/lib/types';
import { cn } from '@/lib/utils';

interface AnswerState {
  value: string;
  checked: boolean;
  correct: boolean;
}

const KIND_LABEL: Record<PracticeQuestion['kind'], string> = {
  'multiple-choice': 'Multiple choice',
  'fill-blank': 'Fill in the blank',
  'write-sentence': 'Write a sentence',
};

interface PracticeQuizProps {
  questions: PracticeQuestion[];
  onAllAnswered: () => void;
}

export function PracticeQuiz({ questions, onAllAnswered }: PracticeQuizProps) {
  const [answers, setAnswers] = useState<Record<string, AnswerState>>({});
  const reported = useRef(false);

  const checkedCount = questions.filter((question) => answers[question.id]?.checked).length;

  useEffect(() => {
    if (!reported.current && questions.length > 0 && checkedCount === questions.length) {
      reported.current = true;
      onAllAnswered();
    }
  }, [checkedCount, questions.length, onAllAnswered]);

  const setValue = (id: string, value: string) =>
    setAnswers((current) => ({
      ...current,
      [id]: { value, checked: false, correct: false },
    }));

  const check = (question: PracticeQuestion) => {
    const value = answers[question.id]?.value ?? '';
    let correct = false;

    if (question.kind === 'multiple-choice') {
      correct = value === String(question.answerIndex);
    } else if (question.kind === 'fill-blank') {
      correct = isFillBlankCorrect(question, value);
    } else {
      correct = value.trim().length > 0 && missingFromSentence(question, value).length === 0;
    }

    setAnswers((current) => ({ ...current, [question.id]: { value, checked: true, correct } }));
  };

  return (
    <View className="gap-3">
      <Text className="text-muted font-strong text-[12px] leading-[17px]">
        Three questions, one of each kind. Answer them however you like — nothing is timed.
      </Text>

      {questions.map((question, index) => {
        const state = answers[question.id];
        const checked = state?.checked ?? false;
        const value = state?.value ?? '';
        const canCheck = value.trim().length > 0;

        return (
          <ChunkyCard key={question.id} tone="paper" className="gap-2.5 px-3.5 py-3.5">
            <View className="flex-row items-center justify-between gap-2">
              <Text className="text-magenta font-display text-[10px] tracking-widest">
                QUESTION {index + 1} OF {questions.length}
              </Text>
              <ChunkyChip label={KIND_LABEL[question.kind]} tone="cream" />
            </View>

            <Text className="text-ink font-display text-[15px] leading-[21px]">
              {question.prompt}
            </Text>

            {question.kind === 'multiple-choice' ? (
              <View className="gap-2">
                {question.options.map((option, optionIndex) => {
                  const selected = value === String(optionIndex);
                  const isAnswer = optionIndex === question.answerIndex;
                  return (
                    <Pressable
                      key={option}
                      accessibilityRole="radio"
                      accessibilityState={{ selected }}
                      disabled={checked}
                      onPress={() => setValue(question.id, String(optionIndex))}
                      className={cn(
                        'border-ink rounded-2xl border-2 px-3 py-2.5',
                        selected ? 'bg-sky' : 'bg-white',
                        checked && isAnswer && 'bg-lime',
                        checked && selected && !isAnswer && 'bg-coral',
                      )}
                    >
                      <Text className="text-ink font-strong text-[13.5px] leading-[19px]">
                        {option}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            ) : null}

            {question.kind === 'fill-blank' ? (
              <View className="gap-2">
                <View className="border-ink bg-canvas rounded-2xl border-2 px-3 py-2.5">
                  <Text className="text-ink font-display text-[13.5px] leading-[20px]">
                    {question.sentence}
                  </Text>
                </View>
                <ChunkyInput
                  value={value}
                  onChangeText={(text) => setValue(question.id, text)}
                  placeholder="Type the missing word"
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!checked}
                />
              </View>
            ) : null}

            {question.kind === 'write-sentence' ? (
              <View className="gap-2">
                <View className="flex-row flex-wrap gap-2">
                  {question.mustInclude.map((word) => (
                    <ChunkyChip key={word} label={word} tone="cream" />
                  ))}
                </View>
                <ChunkyInput
                  value={value}
                  onChangeText={(text) => setValue(question.id, text)}
                  placeholder="Write your sentence in German"
                  multiline
                  editable={!checked}
                />
              </View>
            ) : null}

            {checked ? (
              <View className="gap-2">
                <ChunkyChip
                  label={state?.correct ? 'Got it' : 'Close — look again'}
                  tone={state?.correct ? 'lime' : 'sunny'}
                />
                <Text className="text-ink font-body text-[13.5px] leading-[20px]">
                  {question.explanation}
                </Text>
                {question.kind === 'fill-blank' && !state?.correct ? (
                  <Text className="text-ink font-strong text-[13.5px]">
                    Answer: {question.answer}
                  </Text>
                ) : null}
                {question.kind === 'write-sentence' ? (
                  <Text className="text-muted font-body text-[13px] leading-[19px]">
                    One way to say it: {question.sample}
                  </Text>
                ) : null}
              </View>
            ) : (
              <ChunkyButton
                label="Check answer"
                variant="ink"
                size="sm"
                disabled={!canCheck}
                onPress={() => check(question)}
              />
            )}
          </ChunkyCard>
        );
      })}
    </View>
  );
}

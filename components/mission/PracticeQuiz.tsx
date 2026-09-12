import { useState } from 'react';
import { useTranslation } from 'react-i18next';
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

interface PracticeQuizProps {
  questions: PracticeQuestion[];
  initiallyComplete?: boolean;
  onAllAnswered: () => void;
}

export function PracticeQuiz({
  questions,
  initiallyComplete = false,
  onAllAnswered,
}: PracticeQuizProps) {
  const { t } = useTranslation();
  const [answers, setAnswers] = useState<Record<string, AnswerState>>({});
  const [questionIndex, setQuestionIndex] = useState(0);
  const [complete, setComplete] = useState(initiallyComplete);

  if (complete) {
    return (
      <ChunkyCard tone="lime" className="gap-1.5 px-4 py-3.5">
        <Text className="text-ink font-display text-[15px]">{t('prep.quizComplete')}</Text>
        <Text className="text-ink/75 font-body text-[13px] leading-[18px]">
          {t('prep.quizCompleteBody', { count: questions.length })}
        </Text>
      </ChunkyCard>
    );
  }

  const question = questions[questionIndex];
  if (!question) return null;

  const state = answers[question.id];
  const checked = state?.checked ?? false;
  const value = state?.value ?? '';
  const canCheck = value.trim().length > 0;
  const isLastQuestion = questionIndex === questions.length - 1;
  const kindLabel = t(`prep.quizKinds.${question.kind}`);

  const setValue = (nextValue: string) =>
    setAnswers((current) => ({
      ...current,
      [question.id]: { value: nextValue, checked: false, correct: false },
    }));

  const check = () => {
    let correct = false;

    if (question.kind === 'multiple-choice') {
      correct = value === String(question.answerIndex);
    } else if (question.kind === 'fill-blank') {
      correct = isFillBlankCorrect(question, value);
    } else {
      correct = value.trim().length > 0 && missingFromSentence(question, value).length === 0;
    }

    setAnswers((current) => ({
      ...current,
      [question.id]: { value, checked: true, correct },
    }));
  };

  const continueQuiz = () => {
    if (isLastQuestion) {
      setComplete(true);
      onAllAnswered();
      return;
    }

    setQuestionIndex((current) => current + 1);
  };

  return (
    <View className="gap-3">
      <Text className="text-muted font-strong text-[12px] leading-[17px]">
        {t('prep.quizIntro')}
      </Text>

      <ChunkyCard tone="paper" className="gap-2.5 px-3.5 py-3.5">
        <View className="flex-row items-center justify-between gap-2">
          <Text className="text-magenta font-display text-[10px] tracking-widest">
            {t('prep.quizProgress', { current: questionIndex + 1, total: questions.length })}
          </Text>
          <ChunkyChip label={kindLabel} tone="cream" />
        </View>

        <Text className="text-ink font-display text-[15px] leading-[21px]">{question.prompt}</Text>

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
                  onPress={() => setValue(String(optionIndex))}
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
              onChangeText={setValue}
              placeholder={t('prep.missingWordPlaceholder')}
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
              onChangeText={setValue}
              placeholder={t('prep.sentencePlaceholder')}
              multiline
              editable={!checked}
            />
          </View>
        ) : null}

        {checked ? (
          <View className="gap-2">
            <ChunkyChip
              label={state?.correct ? t('prep.gotIt') : t('prep.lookAgain')}
              tone={state?.correct ? 'lime' : 'sunny'}
            />
            <Text className="text-ink font-body text-[13.5px] leading-[20px]">
              {question.explanation}
            </Text>
            {question.kind === 'fill-blank' && !state?.correct ? (
              <Text className="text-ink font-strong text-[13.5px]">
                {t('prep.answerLabel', { answer: question.answer })}
              </Text>
            ) : null}
            {question.kind === 'write-sentence' ? (
              <Text className="text-muted font-body text-[13px] leading-[19px]">
                {t('prep.sampleLabel', { sample: question.sample })}
              </Text>
            ) : null}
            <ChunkyButton
              className="mt-1"
              label={isLastQuestion ? t('prep.finishPractice') : t('prep.nextQuestion')}
              variant="ink"
              size="sm"
              onPress={continueQuiz}
            />
          </View>
        ) : (
          <ChunkyButton
            label={t('prep.checkAnswer')}
            variant="ink"
            size="sm"
            disabled={!canCheck}
            onPress={check}
          />
        )}
      </ChunkyCard>
    </View>
  );
}

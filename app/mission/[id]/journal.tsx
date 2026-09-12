import { router, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';

import { ChunkyButton } from '@/components/ChunkyButton';
import { ChunkyCard } from '@/components/ChunkyCard';
import { ChunkyChip } from '@/components/ChunkyChip';
import { ChunkyInput } from '@/components/ChunkyInput';
import { MissionMissing } from '@/components/mission/MissionMissing';
import { RecallQuiz } from '@/components/mission/RecallQuiz';
import { Screen } from '@/components/Screen';
import { ScreenHeader } from '@/components/ScreenHeader';
import { buildRecallQuiz, buildReflectionPrompts, reflectionHint } from '@/lib/content';
import { getMission } from '@/lib/missions';
import { routes } from '@/lib/navigation';
import { useAppStore } from '@/lib/store';
import type { Mission } from '@/lib/types';

type JournalStage = 'reflection' | 'recall';

function MissionJournal({ mission }: { mission: Mission }) {
  const name = useAppStore((state) => state.name);
  const level = useAppStore((state) => state.level);
  const studied = useAppStore((state) => state.studied);
  const streakCount = useAppStore((state) => state.streakCount);
  const addJournalEntry = useAppStore((state) => state.addJournalEntry);

  const tier = level ?? 'beginner';
  const studiedIds = useMemo(() => studied[mission.id] ?? [], [studied, mission.id]);
  const prompts = useMemo(() => buildReflectionPrompts(mission, tier, name), [mission, tier, name]);
  const questions = useMemo(() => buildRecallQuiz(mission, studiedIds), [mission, studiedIds]);

  const [answers, setAnswers] = useState<string[]>(() => prompts.map(() => ''));
  const [selections, setSelections] = useState<(number | null)[]>(() => questions.map(() => null));
  const [stage, setStage] = useState<JournalStage>('reflection');
  const [reflectionIndex, setReflectionIndex] = useState(0);
  const [recallIndex, setRecallIndex] = useState(0);
  const [saved, setSaved] = useState(false);
  const [savedScore, setSavedScore] = useState(0);

  const currentAnswer = answers[reflectionIndex] ?? '';
  const currentSelection = selections[recallIndex] ?? null;
  const isLastPrompt = reflectionIndex === prompts.length - 1;
  const isLastRecall = recallIndex === questions.length - 1;

  const continueReflection = () => {
    if (isLastPrompt) setStage('recall');
    else setReflectionIndex((index) => index + 1);
  };

  const save = () => {
    const score = questions.reduce(
      (total, question, index) => total + (selections[index] === question.answerIndex ? 1 : 0),
      0,
    );
    addJournalEntry({
      missionId: mission.id,
      prompts,
      answers,
      quizScore: score,
      quizTotal: questions.length,
    });
    setSavedScore(score);
    setSaved(true);
  };

  return (
    <Screen>
      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerClassName="gap-5 px-5 pb-safe-offset-8"
          keyboardShouldPersistTaps="handled"
        >
          <ScreenHeader
            nested
            kicker="Journal"
            title={saved ? 'Saved.' : 'One thought at a time'}
            subtitle={saved ? undefined : reflectionHint(tier)}
            backFallback={routes.journalTab}
            right={<ChunkyChip label={mission.title} tone={mission.accent} />}
          />

          {saved ? (
            <View className="gap-5">
              <ChunkyCard tone="lime" className="gap-2 px-4 py-5">
                <Text className="text-ink font-display text-[26px] leading-[30px]">
                  {streakCount} {streakCount === 1 ? 'day' : 'days'} in a row
                </Text>
                <Text className="text-ink font-body text-[14px] leading-[21px]">
                  Entry saved and “{mission.title}” is marked done. Recall quiz: {savedScore} of{' '}
                  {questions.length}.
                </Text>
              </ChunkyCard>

              <ChunkyCard tone="sunny" className="flex-row items-center gap-3 px-4 py-4">
                <View className="border-ink h-14 w-14 items-center justify-center rounded-full border-2 bg-white">
                  <Text className="text-[24px]">{mission.badge.emoji}</Text>
                </View>
                <View className="flex-1 gap-0.5">
                  <Text className="text-muted font-display text-[11px] tracking-widest">BADGE EARNED</Text>
                  <Text className="text-ink font-display text-[17px]">{mission.badge.title}</Text>
                  <Text className="text-ink font-body text-[13px] leading-[19px]">
                    {mission.badge.description}
                  </Text>
                </View>
              </ChunkyCard>

              <View className="gap-2">
                <ChunkyButton label="Back to today" fullWidth onPress={() => router.replace(routes.today)} />
                <ChunkyButton
                  label="See my progress"
                  variant="paper"
                  fullWidth
                  onPress={() => router.replace(routes.profile)}
                />
              </View>
            </View>
          ) : stage === 'reflection' ? (
            <View className="gap-4">
              <Text className="text-muted font-display text-[10px] tracking-widest">
                THOUGHT {reflectionIndex + 1} OF {prompts.length}
              </Text>
              <View className="gap-2">
                <Text className="text-ink font-display text-[20px] leading-[25px]">
                  {prompts[reflectionIndex]}
                </Text>
                <ChunkyInput
                  value={currentAnswer}
                  onChangeText={(text) =>
                    setAnswers((current) =>
                      current.map((value, position) => (position === reflectionIndex ? text : value)),
                    )
                  }
                  placeholder={reflectionIndex === 0 ? 'A sentence is enough' : 'Optional'}
                  multiline
                />
              </View>
              <View className="gap-2">
                <ChunkyButton
                  label={isLastPrompt ? 'Continue to recall' : 'Next thought'}
                  fullWidth
                  disabled={reflectionIndex === 0 && currentAnswer.trim().length === 0}
                  onPress={continueReflection}
                />
                {reflectionIndex > 0 && currentAnswer.trim().length === 0 ? (
                  <ChunkyButton label="Skip this one" variant="quiet" fullWidth onPress={continueReflection} />
                ) : null}
              </View>
            </View>
          ) : (
            <View className="gap-4">
              <View className="gap-1">
                <Text className="text-ink font-display text-[20px]">A quick recall</Text>
                <Text className="text-muted font-body text-[13px] leading-[18px]">
                  One word at a time. No score is shown while you answer.
                </Text>
              </View>
              <RecallQuiz
                questions={questions}
                selections={selections}
                currentIndex={recallIndex}
                onSelect={(questionIndex, optionIndex) =>
                  setSelections((current) =>
                    current.map((value, position) =>
                      position === questionIndex ? optionIndex : value,
                    ),
                  )
                }
                revealed={false}
              />
              <ChunkyButton
                label={isLastRecall ? 'Save entry' : 'Next word'}
                fullWidth
                disabled={currentSelection === null}
                onPress={isLastRecall ? save : () => setRecallIndex((index) => index + 1)}
              />
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}

export default function MissionJournalScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const mission = getMission(id);

  if (!mission) return <MissionMissing />;
  return <MissionJournal mission={mission} />;
}

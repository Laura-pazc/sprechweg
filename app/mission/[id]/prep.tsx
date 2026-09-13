import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, MapPin } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { ChunkyButton, ChunkyIconButton } from '@/components/ChunkyButton';
import { ChunkyCard } from '@/components/ChunkyCard';
import { MissionMetaBadges, MissionStatusBadge } from '@/components/MissionBadges';
import { ConversationSim } from '@/components/mission/ConversationSim';
import { MissionMissing } from '@/components/mission/MissionMissing';
import { PracticeQuiz } from '@/components/mission/PracticeQuiz';
import { VocabList } from '@/components/mission/VocabList';
import { PracticeSuggestionsSheet } from '@/components/practice/PracticeSuggestionsSheet';
import { Screen } from '@/components/Screen';
import { StepPager, type StepPagerItem } from '@/components/StepPager';
import { goBackOrReplace, routes } from '@/lib/navigation';
import { useAppStore, useMission } from '@/lib/store';
import { palette } from '@/lib/theme';

const STEP_VALUES = ['intro', 'vocab', 'conversation', 'practice'] as const;
type PrepStep = (typeof STEP_VALUES)[number];

export default function MissionPrepScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { t } = useTranslation();
  const hydrated = useAppStore((state) => state.hydrated);
  const mission = useMission(id);
  const statuses = useAppStore((state) => state.statuses);
  const studied = useAppStore((state) => (id ? state.studied[id] : undefined));
  const practiceComplete = useAppStore((state) => (id ? state.practiceDone[id] : false));
  const learnerLevel = useAppStore((state) => state.level);
  const toggleVocabStudied = useAppStore((state) => state.toggleVocabStudied);
  const markPracticeDone = useAppStore((state) => state.markPracticeDone);
  const setStatus = useAppStore((state) => state.setStatus);
  const [step, setStep] = useState<PrepStep>('intro');
  const [showSuggestions, setShowSuggestions] = useState(false);

  if (!hydrated) {
    return <Screen />;
  }

  if (!mission) {
    return <MissionMissing />;
  }

  const steps: StepPagerItem<PrepStep>[] = [
    { value: 'intro', label: t('prep.introStep') },
    { value: 'vocab', label: t('prep.vocabStep') },
    { value: 'conversation', label: t('prep.conversationStep') },
    { value: 'practice', label: t('prep.practiceStep') },
  ];

  const selectedVocab = studied ?? [];
  const missionStatus = statuses[mission.id] ?? 'not_started';

  const changeStep = (nextStep: PrepStep) => {
    if (nextStep !== 'intro') setStatus(mission.id, 'in_progress');
    setStep(nextStep);
  };

  const beginMission = () => {
    setStatus(mission.id, 'in_progress');
    router.push(routes.missionDo(mission.id));
  };

  return (
    <Screen className="px-3">
      <View className="mx-auto w-full max-w-2xl flex-1">
        <View className="mb-2 h-9 justify-center">
          <ChunkyIconButton
            accessibilityLabel={t('common.back')}
            className="self-start"
            onPress={() => goBackOrReplace(routes.missions)}
            size={30}
            tone="canvas"
          >
            <ArrowLeft color={palette.ink} size={17} strokeWidth={2.5} />
          </ChunkyIconButton>
        </View>

        {step === 'intro' ? (
          <ChunkyCard tone={mission.accent} offset={5} radius={20} className="p-4">
            <Text className="text-ink font-display text-[24px] leading-7">{mission.title}</Text>
            <Text className="text-ink/80 font-body mt-1.5 text-[14px] leading-5">
              {mission.tagline}
            </Text>

            <View className="mt-3 flex-row flex-wrap items-center gap-2">
              <MissionMetaBadges mission={mission} />
              {missionStatus !== 'not_started' ? (
                <MissionStatusBadge status={missionStatus} />
              ) : null}
            </View>

            <View className="border-ink mt-3 flex-row items-start gap-2 rounded-2xl border-2 bg-white/75 px-3 py-2">
              <MapPin color={palette.ink} size={15} strokeWidth={2.5} />
              <Text className="text-ink font-strong min-w-0 flex-1 text-[12px] leading-4">
                {mission.where}
              </Text>
            </View>
          </ChunkyCard>
        ) : (
          <View className="px-2">
            <Text className="text-ink font-display text-[21px] leading-6">{mission.title}</Text>
            <View className="mt-2 flex-row flex-wrap items-center gap-2">
              <MissionMetaBadges mission={mission} />
              <MissionStatusBadge status={missionStatus} />
            </View>
          </View>
        )}

        {step !== 'practice' ? (
          <View className="mt-3 mb-2">
            <StepPager items={steps} value={step} onChange={changeStep} />
          </View>
        ) : null}

        <ScrollView
          className="flex-1"
          contentContainerClassName="px-2 pt-2 pb-safe-offset-8"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {step === 'intro' ? (
            <View className="pt-2">
              <Text className="text-muted font-body text-center text-[13px] leading-[18px]">
                {t('prep.introHint')}
              </Text>
              <ChunkyButton
                className="mt-4"
                fullWidth
                label={t('prep.startPrep')}
                onPress={() => changeStep('vocab')}
                trailing={<Text className="text-cream font-display text-[17px]">→</Text>}
              />
            </View>
          ) : null}

          {step === 'vocab' ? (
            <View>
              <Text className="text-ink font-display mb-3 text-[19px] leading-6">
                {t('prep.vocabTitle')}
              </Text>
              <VocabList
                items={mission.vocab}
                selected={selectedVocab}
                onToggle={(vocabId) => toggleVocabStudied(mission.id, vocabId)}
              />
              <ChunkyButton
                className="mt-5"
                fullWidth
                label={t('prep.continueConversation')}
                onPress={() => changeStep('conversation')}
                trailing={<Text className="text-cream font-display text-[17px]">→</Text>}
              />
            </View>
          ) : null}

          {step === 'conversation' ? (
            <View>
              <Text className="text-ink font-display mb-3 text-[19px] leading-6">
                {t('prep.conversationTitle')}
              </Text>
              <ConversationSim
                lines={mission.conversationSimulation}
                initialShowEnglish={learnerLevel !== 'advanced'}
              />
            </View>
          ) : null}

          {step === 'practice' ? (
            <View>
              <Text className="text-ink font-display mb-3 text-[19px] leading-6">
                {t('prep.practiceTitle')}
              </Text>
              <PracticeQuiz
                questions={mission.practiceQuestions}
                initiallyComplete={practiceComplete}
                onAllAnswered={() => markPracticeDone(mission.id)}
              />
              {practiceComplete ? (
                <ChunkyButton
                  className="mt-5"
                  fullWidth
                  label={t('prep.startMission')}
                  onPress={beginMission}
                  trailing={<Text className="text-cream font-display text-[17px]">→</Text>}
                />
              ) : null}
            </View>
          ) : null}
        </ScrollView>
      </View>

      <PracticeSuggestionsSheet
        isOpen={showSuggestions}
        suggestions={suggestions}
        onClose={() => setShowSuggestions(false)}
        onStartMission={() => {
          setShowSuggestions(false);
          setStep('conversation');
        }}
      />
    </Screen>
  );
}

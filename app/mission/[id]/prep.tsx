import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, MapPin } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { useMemo, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { ChunkyButton, ChunkyIconButton } from '@/components/ChunkyButton';
import { ChunkyCard } from '@/components/ChunkyCard';
import { MissionStatusBadge } from '@/components/MissionBadges';
import { ConversationAiPreview } from '@/components/mission/ConversationAiPreview';
import { ConversationSim } from '@/components/mission/ConversationSim';
import { MissionMissing } from '@/components/mission/MissionMissing';
import { PracticeQuiz } from '@/components/mission/PracticeQuiz';
import { VocabList } from '@/components/mission/VocabList';
import { PracticeSuggestionsSheet } from '@/components/practice/PracticeSuggestionsSheet';
import { Screen } from '@/components/Screen';
import { StepPager, type StepPagerItem } from '@/components/StepPager';
import { getPracticeSuggestions } from '@/lib/practiceSuggestions';
import { goBackOrReplace, routes } from '@/lib/navigation';
import { useAppStore, useMission } from '@/lib/store';
import { palette } from '@/lib/theme';

const LEARNING_STEP_VALUES = ['vocab', 'conversation', 'go-deeper', 'practice'] as const;
type LearningStep = (typeof LEARNING_STEP_VALUES)[number];
type PrepStep = 'overview' | LearningStep;

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
  const conversationAiPreviewViewed = useAppStore((state) => state.conversationAiPreviewViewed);
  const markConversationAiPreviewViewed = useAppStore(
    (state) => state.markConversationAiPreviewViewed,
  );
  const toggleVocabStudied = useAppStore((state) => state.toggleVocabStudied);
  const markPracticeDone = useAppStore((state) => state.markPracticeDone);
  const setStatus = useAppStore((state) => state.setStatus);
  const [step, setStep] = useState<PrepStep>('overview');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestions = useMemo(
    () => (mission && id ? getPracticeSuggestions(id) : []),
    [mission, id],
  );

  if (!hydrated) {
    return <Screen />;
  }

  if (!mission) {
    return <MissionMissing />;
  }

  const learningSteps: StepPagerItem<LearningStep>[] = [
    { value: 'vocab', label: t('prep.vocabStep') },
    { value: 'conversation', label: t('prep.conversationStep') },
    ...(mission.goDeeper ? [{ value: 'go-deeper' as const, label: t('prep.goDeeperStep') }] : []),
    { value: 'practice', label: t('prep.practiceStep') },
  ];

  const selectedVocab = studied ?? [];
  const missionStatus = statuses[mission.id] ?? 'not_started';

  const changeStep = (nextStep: LearningStep) => {
    setStatus(mission.id, 'in_progress');
    if (nextStep === 'conversation' && suggestions.length > 0) {
      setShowSuggestions(true);
    } else {
      setStep(nextStep);
    }
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

        {step === 'overview' ? (
          <ChunkyCard tone={mission.accent} offset={5} radius={20} className="p-4">
            <Text className="text-ink font-display text-[24px] leading-7">{mission.title}</Text>
            <Text className="text-ink/80 font-body mt-1.5 text-[14px] leading-5">
              {mission.tagline}
            </Text>

            {missionStatus === 'in_progress' ? (
              <View className="mt-3 flex-row flex-wrap items-center gap-2">
                <MissionStatusBadge status={missionStatus} />
              </View>
            ) : null}

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
            {missionStatus === 'in_progress' ? (
              <View className="mt-2 flex-row flex-wrap items-center gap-2">
                <MissionStatusBadge status={missionStatus} />
              </View>
            ) : null}
          </View>
        )}

        {step !== 'overview' ? (
          <View className="mt-3 mb-2">
            <StepPager items={learningSteps} value={step} onChange={changeStep} />
          </View>
        ) : null}

        <ScrollView
          className="flex-1"
          contentContainerClassName="px-2 pt-2 pb-safe-offset-8"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {step === 'overview' ? (
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
              <ConversationAiPreview
                hasViewed={conversationAiPreviewViewed}
                onViewed={markConversationAiPreviewViewed}
              />
              <ConversationSim
                lines={mission.conversationSimulation}
                initialShowEnglish={learnerLevel !== 'advanced'}
              />
              <ChunkyButton
                className="mt-5"
                fullWidth
                label={t('prep.continuePractice')}
                onPress={() => changeStep(mission.goDeeper ? 'go-deeper' : 'practice')}
                trailing={<Text className="text-cream font-display text-[17px]">→</Text>}
              />
            </View>
          ) : null}

          {step === 'go-deeper' && mission.goDeeper ? (
            <View className="gap-4">
              <Text className="text-ink font-display text-[19px] leading-6">
                {t('prep.goDeeperTitle')}
              </Text>
              <ChunkyCard tone="sky" offset={3} className="gap-1.5 px-4 py-4">
                <Text className="text-muted font-display text-[10px] tracking-widest">
                  {t('prep.reinforcementTitle')}
                </Text>
                <Text className="text-ink font-body text-[14px] leading-[20px]">
                  {mission.goDeeper.reinforcement}
                </Text>
              </ChunkyCard>
              <ChunkyCard tone="sunny" offset={3} className="gap-1.5 px-4 py-4">
                <Text className="text-muted font-display text-[10px] tracking-widest">
                  {t('prep.missionSpecificTitle')}
                </Text>
                <Text className="text-ink font-body text-[14px] leading-[20px]">
                  {mission.goDeeper.missionSpecific}
                </Text>
              </ChunkyCard>
              <ChunkyButton
                fullWidth
                label={t('prep.continuePractice')}
                onPress={() => changeStep('practice')}
                trailing={<Text className="text-cream font-display text-[17px]">→</Text>}
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

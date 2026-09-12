import { MapPin } from 'lucide-react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { ChunkyButton } from '@/components/ChunkyButton';
import { ChunkyCard } from '@/components/ChunkyCard';
import { ChunkyChip } from '@/components/ChunkyChip';
import { ConversationSim } from '@/components/mission/ConversationSim';
import { MissionMissing } from '@/components/mission/MissionMissing';
import { PracticeQuiz } from '@/components/mission/PracticeQuiz';
import { VocabList } from '@/components/mission/VocabList';
import { Screen } from '@/components/Screen';
import { ScreenHeader } from '@/components/ScreenHeader';
import { StepPager, type StepItem } from '@/components/StepPager';
import { LEVEL_LABEL } from '@/lib/levelChat';
import { getMission } from '@/lib/missions';
import { routes } from '@/lib/navigation';
import { useAppStore } from '@/lib/store';
import { palette } from '@/lib/theme';
import type { Mission } from '@/lib/types';

type PrepTab = 'vocab' | 'talk' | 'practice';

const TABS: StepItem<PrepTab>[] = [
  { id: 'vocab', label: 'Vocab' },
  { id: 'talk', label: 'Conversation' },
  { id: 'practice', label: 'Practice' },
];

function MissionPrep({ mission }: { mission: Mission }) {
  const level = useAppStore((state) => state.level);
  const studied = useAppStore((state) => state.studied);
  const practiceDone = useAppStore((state) => state.practiceDone);
  const toggleVocabStudied = useAppStore((state) => state.toggleVocabStudied);
  const markPracticeDone = useAppStore((state) => state.markPracticeDone);

  const [tab, setTab] = useState<PrepTab>('vocab');

  const studiedIds = studied[mission.id] ?? [];
  const tier = level ?? 'beginner';

  return (
    <Screen>
      <ScreenHeader
        compact
        kicker={`${mission.category} · ${mission.minutes} min`}
        title={mission.title}
        subtitle={mission.tagline}
        backFallback={routes.missions}
        right={<ChunkyChip label={LEVEL_LABEL[mission.level]} tone={mission.accent} />}
      />

      <View className="gap-2 px-5 pb-2">
        <View className="flex-row items-start gap-1.5">
          <MapPin color={palette.ink} size={13} strokeWidth={2.5} style={{ marginTop: 2 }} />
          <Text className="text-ink font-strong flex-1 text-[12px] leading-[17px]">
            {mission.where}
          </Text>
        </View>
        <StepPager items={TABS} value={tab} onChange={setTab} />
      </View>

      <ScrollView contentContainerClassName="gap-3 px-5 pb-6" keyboardShouldPersistTaps="handled">
        <Text className="text-muted font-display text-[10px] tracking-widest">
          PREPARED FOR YOUR {LEVEL_LABEL[tier].toUpperCase()} TIER
        </Text>

        {tab === 'vocab' ? (
          <VocabList
            mission={mission}
            studiedIds={studiedIds}
            onToggle={(vocabId) => toggleVocabStudied(mission.id, vocabId)}
          />
        ) : null}

        {tab === 'talk' ? (
          <ConversationSim
            lines={mission.conversationSimulation}
            initialShowEnglish={tier !== 'advanced'}
          />
        ) : null}

        {tab === 'practice' ? (
          <View className="gap-3">
            <PracticeQuiz
              questions={mission.practiceQuestions}
              onAllAnswered={() => markPracticeDone(mission.id)}
            />
            {practiceDone[mission.id] ? (
              <ChunkyCard tone="lime" className="gap-1 px-4 py-3.5">
                <Text className="text-ink font-display text-[15px]">Practice done</Text>
                <Text className="text-ink font-body text-[12.5px] leading-[18px]">
                  That is the desk part finished. The rest only happens outside.
                </Text>
              </ChunkyCard>
            ) : null}
          </View>
        ) : null}
      </ScrollView>

      <View className="border-ink bg-cream pb-safe-offset-3 border-t-2 px-5 pt-3">
        <ChunkyButton
          label="I'm ready — do it for real"
          fullWidth
          trailing={<Text className="text-cream font-display text-[15px]">→</Text>}
          onPress={() => router.push(routes.missionDo(mission.id))}
        />
      </View>
    </Screen>
  );
}

export default function MissionPrepScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const mission = getMission(id);

  if (!mission) return <MissionMissing />;
  return <MissionPrep mission={mission} />;
}

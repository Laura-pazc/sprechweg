import { ArrowRight, Check, Sparkles } from 'lucide-react-native';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { router } from 'expo-router';

import { ChunkyButton } from '@/components/ChunkyButton';
import { ChunkyCard } from '@/components/ChunkyCard';
import { ChunkyInput } from '@/components/ChunkyInput';
import { MissionCard } from '@/components/MissionCard';
import { Screen } from '@/components/Screen';
import { ScreenHeader } from '@/components/ScreenHeader';
import { generateMockMission } from '@/lib/mockMissionGenerator';
import { routes } from '@/lib/navigation';
import { useAppStore } from '@/lib/store';
import { palette } from '@/lib/theme';
import type { Mission } from '@/lib/types';

export default function CreateMissionScreen() {
  const { t } = useTranslation();
  const level = useAppStore((state) => state.level);
  const saveMission = useAppStore((state) => state.saveMission);
  const [name, setName] = useState('');
  const [draft, setDraft] = useState<Mission | null>(null);
  const [saving, setSaving] = useState(false);
  const canGenerate = name.trim().length >= 3;

  const handleSave = async () => {
    if (!draft || saving) return;
    setSaving(true);
    try {
      await saveMission(draft);
      router.replace(routes.missionPrep(draft.id));
    } finally {
      setSaving(false);
    }
  };

  return (
    <Screen>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerClassName="gap-5 px-5 pb-10"
        >
          <ScreenHeader
            nested
            compact
            backFallback={routes.missions}
            kicker={t('missions.create.kicker')}
            title={draft ? t('missions.create.reviewTitle') : t('missions.create.title')}
            subtitle={draft ? t('missions.create.reviewSubtitle') : t('missions.create.subtitle')}
          />

          {!draft ? (
            <ChunkyCard tone="sunny" offset={4} className="gap-4 px-4 py-5">
              <View className="bg-ink h-11 w-11 items-center justify-center rounded-full">
                <Sparkles color={palette.sunny} size={23} strokeWidth={2.4} />
              </View>
              <View className="gap-1.5">
                <Text className="text-ink font-display text-[18px]">
                  {t('missions.create.nameLabel')}
                </Text>
                <Text className="text-ink/75 font-body text-[14px] leading-[20px]">
                  {t('missions.create.nameHelp')}
                </Text>
              </View>
              <ChunkyInput
                value={name}
                onChangeText={setName}
                placeholder={t('missions.create.namePlaceholder')}
                accessibilityLabel={t('missions.create.nameLabel')}
                autoFocus
                returnKeyType="done"
                maxLength={70}
                onSubmitEditing={() => {
                  if (canGenerate) setDraft(generateMockMission(name, level));
                }}
              />
              <ChunkyButton
                label={t('missions.create.generate')}
                disabled={!canGenerate}
                fullWidth
                trailing={
                  <ArrowRight color={canGenerate ? palette.cream : palette.muted} size={18} />
                }
                onPress={() => setDraft(generateMockMission(name, level))}
              />
              <Text className="text-muted font-ui text-[12px] leading-[17px]">
                {t('missions.create.mockNote')}
              </Text>
            </ChunkyCard>
          ) : (
            <View className="gap-5">
              <MissionCard mission={draft} status="not_started" onPress={() => {}} />

              <ChunkyCard tone="paper" offset={3} className="gap-3 px-4 py-4">
                <Text className="text-ink font-display text-[16px]">
                  {t('missions.create.included')}
                </Text>
                <Text className="text-muted font-body text-[14px] leading-[20px]">
                  {t('missions.create.includedBody', {
                    vocab: draft.vocab.length,
                    questions: draft.practiceQuestions.length,
                  })}
                </Text>
              </ChunkyCard>

              <View className="gap-3">
                <ChunkyButton
                  label={saving ? t('missions.create.saving') : t('missions.create.save')}
                  disabled={saving}
                  fullWidth
                  leading={<Check color={saving ? palette.muted : palette.cream} size={18} />}
                  onPress={() => void handleSave()}
                />
                <ChunkyButton
                  label={t('missions.create.editName')}
                  variant="paper"
                  fullWidth
                  disabled={saving}
                  onPress={() => setDraft(null)}
                />
              </View>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}

import { ChevronDown, ChevronUp, Pencil, Sparkles } from 'lucide-react-native';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';

import { ChunkyButton } from '@/components/ChunkyButton';
import { ChunkyCard } from '@/components/ChunkyCard';
import { ChunkyChip } from '@/components/ChunkyChip';
import { ChunkyInput } from '@/components/ChunkyInput';
import { MissionMetaBadges } from '@/components/MissionBadges';
import { generateSmartMission } from '@/lib/missionGenerator';
import { palette } from '@/lib/theme';
import type { CefrLevel, Mission, MissionRegister } from '@/lib/types';
import { cn } from '@/lib/utils';

const REGISTERS: MissionRegister[] = ['practical', 'bureaucratic', 'friendly', 'formal'];

interface SmartMissionCreatorProps {
  cefrLevel: CefrLevel;
  onMissionCreated: (mission: Mission) => void;
  onClose: () => void;
}

export function SmartMissionCreator({
  cefrLevel,
  onMissionCreated,
  onClose,
}: SmartMissionCreatorProps) {
  const { t } = useTranslation();
  const [scenario, setScenario] = useState('');
  const [register, setRegister] = useState<MissionRegister>('practical');
  const [isCreating, setIsCreating] = useState(false);
  const [draftMission, setDraftMission] = useState<Mission | null>(null);
  const [showWords, setShowWords] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetAndClose = () => {
    setScenario('');
    setRegister('practical');
    setDraftMission(null);
    setShowWords(false);
    setError(null);
    onClose();
  };

  const createDraft = async () => {
    if (scenario.trim().length < 8 || isCreating) return;

    setError(null);
    setIsCreating(true);
    try {
      const mission = await generateSmartMission({
        scenario: scenario.trim(),
        register,
        cefrLevel,
      });
      setDraftMission(mission);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : t('missions.creator.genericError'));
    } finally {
      setIsCreating(false);
    }
  };

  const saveMission = () => {
    if (!draftMission) return;
    onMissionCreated(draftMission);
    resetAndClose();
  };

  return (
    <ChunkyCard tone="sunny" offset={4} radius={18} className="gap-4 px-4 py-4">
      <View className="flex-row items-start gap-3">
        <View className="border-ink h-10 w-10 items-center justify-center rounded-full border-2 bg-white/75">
          <Sparkles color={palette.ink} size={20} strokeWidth={2.5} />
        </View>
        <View className="min-w-0 flex-1 gap-1">
          <View className="flex-row flex-wrap items-center gap-2">
            <Text className="text-ink font-display text-[17px]">
              {draftMission ? t('missions.creator.reviewTitle') : t('missions.creator.formTitle')}
            </Text>
            <ChunkyChip label={t('missions.creator.mockBadge')} tone="cream" meta />
          </View>
          <Text className="text-muted font-body text-[13px] leading-[18px]">
            {draftMission
              ? t('missions.creator.reviewBody')
              : t('missions.creator.formBody', { level: cefrLevel })}
          </Text>
        </View>
      </View>

      {draftMission ? (
        <View className="gap-4">
          <ChunkyCard tone="paper" offset={3} radius={16} className="gap-3 px-4 py-4">
            <View className="gap-1">
              <Text className="text-ink font-display text-[20px] leading-[24px]">
                {draftMission.title}
              </Text>
              <Text className="text-muted font-body text-[14px] leading-[20px]">
                {draftMission.tagline}
              </Text>
            </View>
            <MissionMetaBadges mission={draftMission} />
            <Text className="text-ink font-body text-[13px] leading-[19px]">
              {draftMission.where}
            </Text>
            <ChunkyButton
              label={
                showWords
                  ? t('missions.creator.hidePreview')
                  : t('missions.creator.showPreview', { count: draftMission.vocab.length })
              }
              variant="paper"
              size="sm"
              leading={
                showWords ? (
                  <ChevronUp color={palette.ink} size={16} strokeWidth={2.5} />
                ) : (
                  <ChevronDown color={palette.ink} size={16} strokeWidth={2.5} />
                )
              }
              onPress={() => setShowWords((value) => !value)}
              fullWidth
            />
            {showWords ? (
              <View className="border-ink bg-canvas gap-2 rounded-[14px] border-2 px-3 py-3">
                {draftMission.vocab.slice(0, 4).map((item) => (
                  <View key={item.id} className="flex-row justify-between gap-3">
                    <Text className="text-ink font-strong flex-1 text-[13px]">{item.de}</Text>
                    <Text className="text-muted font-body flex-1 text-right text-[13px]">
                      {item.en}
                    </Text>
                  </View>
                ))}
              </View>
            ) : null}
          </ChunkyCard>

          <View className="flex-row gap-3">
            <ChunkyButton
              label={t('missions.creator.edit')}
              variant="paper"
              size="sm"
              leading={<Pencil color={palette.ink} size={15} strokeWidth={2.5} />}
              onPress={() => setDraftMission(null)}
              className="flex-1"
            />
            <ChunkyButton
              label={t('missions.creator.save')}
              size="sm"
              leading={<Sparkles color={palette.cream} size={15} strokeWidth={2.5} />}
              onPress={saveMission}
              className="flex-1"
            />
          </View>
        </View>
      ) : (
        <View className="border-ink gap-4 border-t-2 pt-4">
          <View className="gap-2">
            <Text className="text-ink font-display text-[14px]">
              {t('missions.creator.scenarioLabel')}
            </Text>
            <ChunkyInput
              value={scenario}
              onChangeText={(text) => {
                setScenario(text);
                setError(null);
              }}
              placeholder={t('missions.creator.scenarioPlaceholder')}
              multiline
              maxLength={500}
              className="min-h-[96px] px-4 py-3.5"
              textAlignVertical="top"
            />
          </View>

          <View className="gap-2">
            <Text className="text-ink font-display text-[14px]">
              {t('missions.creator.registerLabel')}
            </Text>
            <View accessibilityRole="radiogroup" className="flex-row flex-wrap gap-2">
              {REGISTERS.map((option) => {
                const selected = option === register;
                return (
                  <Pressable
                    key={option}
                    accessibilityRole="radio"
                    accessibilityState={{ selected }}
                    onPress={() => setRegister(option)}
                    className={cn(
                      'border-ink min-h-11 items-center justify-center rounded-[13px] border-2 px-3 py-2',
                      selected ? 'bg-lime' : 'bg-white',
                    )}
                    style={{ width: '47%' }}
                  >
                    <Text className="text-ink font-strong text-center text-[13px]">
                      {t(`missions.creator.registers.${option}.title`)}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {error ? (
            <View className="border-ink bg-coral rounded-[13px] border-2 px-3.5 py-3">
              <Text accessibilityRole="alert" className="text-ink font-strong text-[13px]">
                {error}
              </Text>
            </View>
          ) : null}

          <View className="flex-row gap-3">
            <ChunkyButton
              label={t('missions.creator.cancel')}
              variant="paper"
              size="sm"
              disabled={isCreating}
              onPress={resetAndClose}
              className="flex-1"
            />
            <ChunkyButton
              label={t('missions.creator.generate')}
              size="sm"
              disabled={scenario.trim().length < 8 || isCreating}
              leading={
                isCreating ? (
                  <ActivityIndicator color={palette.muted} size="small" />
                ) : (
                  <Sparkles color={palette.cream} size={15} strokeWidth={2.5} />
                )
              }
              onPress={() => void createDraft()}
              className="flex-1"
            />
          </View>
        </View>
      )}
    </ChunkyCard>
  );
}

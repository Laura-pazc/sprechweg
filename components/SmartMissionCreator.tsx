import { Sparkles } from 'lucide-react-native';
import { useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { ChunkyButton } from '@/components/ChunkyButton';
import { ChunkyCard, ChunkyPressableCard } from '@/components/ChunkyCard';
import { ChunkyInput } from '@/components/ChunkyInput';
import { generateSmartMission } from '@/lib/missionGenerator';
import { palette } from '@/lib/theme';
import type { CefrLevel, Mission, MissionRegister } from '@/lib/types';
import { cn } from '@/lib/utils';

const REGISTERS: MissionRegister[] = ['practical', 'bureaucratic', 'friendly', 'formal'];

interface SmartMissionCreatorProps {
  cefrLevel: CefrLevel | null;
  onMissionCreated: (mission: Mission) => void;
}

export function SmartMissionCreator({ cefrLevel, onMissionCreated }: SmartMissionCreatorProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [scenario, setScenario] = useState('');
  const [register, setRegister] = useState<MissionRegister>('practical');
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!cefrLevel) return null;

  const createMission = async () => {
    if (scenario.trim().length < 8 || isCreating) return;

    setError(null);
    setIsCreating(true);
    try {
      const mission = await generateSmartMission({
        scenario: scenario.trim(),
        register,
        cefrLevel,
      });
      onMissionCreated(mission);
      setScenario('');
      setOpen(false);
    } catch (reason) {
      setError(
        reason instanceof Error ? reason.message : t('missions.creator.genericError'),
      );
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <ChunkyCard tone="sky" offset={4} radius={18} className="gap-3 px-4 py-4">
      <View className="flex-row items-start gap-3">
        <View className="border-ink h-10 w-10 items-center justify-center rounded-full border-2 bg-white/75">
          <Sparkles color={palette.ink} size={20} strokeWidth={2.5} />
        </View>
        <View className="min-w-0 flex-1 gap-0.5">
          <Text className="text-ink font-display text-[17px]">
            {t('missions.creator.title')}
          </Text>
          <Text className="text-ink/75 font-body text-[13px] leading-[18px]">
            {t('missions.creator.body', { level: cefrLevel })}
          </Text>
        </View>
      </View>

      {!open ? (
        <ChunkyButton
          label={t('missions.creator.open')}
          variant="ink"
          fullWidth
          onPress={() => setOpen(true)}
          trailing={<Text className="text-cream font-display text-[17px]">→</Text>}
        />
      ) : (
        <View className="gap-4 border-ink border-t-2 pt-4">
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
              className="min-h-[112px] px-4 py-3.5"
              textAlignVertical="top"
            />
          </View>

          <View className="gap-2">
            <Text className="text-ink font-display text-[14px]">
              {t('missions.creator.registerLabel')}
            </Text>
            <View accessibilityRole="radiogroup" className="gap-2">
              {REGISTERS.map((option) => {
                const selected = option === register;
                return (
                  <Pressable
                    key={option}
                    accessibilityRole="radio"
                    accessibilityState={{ selected }}
                    onPress={() => setRegister(option)}
                    className={cn(
                      'border-ink rounded-[13px] border-2 px-3.5 py-3',
                      selected ? 'bg-lime' : 'bg-white',
                    )}
                  >
                    <Text className="text-ink font-strong text-[14px]">
                      {t(`missions.creator.registers.${option}.title`)}
                    </Text>
                    <Text className="text-muted font-body mt-0.5 text-[12px] leading-[17px]">
                      {t(`missions.creator.registers.${option}.body`)}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {error ? (
            <View className="border-ink bg-coral rounded-[13px] border-2 px-3.5 py-3">
              <Text className="text-ink font-strong text-[13px] leading-[18px]">{error}</Text>
            </View>
          ) : null}

          <View className="gap-2">
            <ChunkyButton
              label={isCreating ? t('missions.creator.creating') : t('missions.creator.create')}
              fullWidth
              disabled={scenario.trim().length < 8 || isCreating}
              leading={isCreating ? <ActivityIndicator color={palette.cream} size="small" /> : undefined}
              onPress={() => void createMission()}
            />
            <ChunkyButton
              label={t('missions.creator.cancel')}
              variant="quiet"
              fullWidth
              disabled={isCreating}
              onPress={() => {
                setOpen(false);
                setError(null);
              }}
            />
          </View>
        </View>
      )}
    </ChunkyCard>
  );
}

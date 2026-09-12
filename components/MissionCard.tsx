import { MapPin } from 'lucide-react-native';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { ChunkyPressableCard } from '@/components/ChunkyCard';
import { DoneMark, MissionIcon } from '@/components/MissionIcon';
import { palette } from '@/lib/theme';
import type { Mission, MissionStatus } from '@/lib/types';

interface MissionCardProps {
  mission: Mission;
  status: MissionStatus;
  onPress: () => void;
  featured?: boolean;
}

export function MissionCard({ mission, status, onPress, featured = false }: MissionCardProps) {
  const { t } = useTranslation();
  const note =
    status === 'in_progress' ? t('common.inProgress') : status === 'done' ? t('common.done') : null;

  return (
    <ChunkyPressableCard
      tone={featured ? mission.accent : 'paper'}
      offset={featured ? 6 : 3}
      radius={featured ? 22 : 18}
      onPress={onPress}
      accessibilityLabel={`${mission.title}. ${mission.tagline}`}
      className={featured ? 'gap-3 px-4 py-4' : 'gap-2.5 px-4 py-3.5'}
    >
      <View className="flex-row items-start justify-between gap-3">
        <View className="flex-1 gap-1">
          <View className="flex-row items-center gap-2">
            <View className={featured ? 'rounded-full bg-white/70 px-2 py-1' : undefined}>
              <Text
                className={
                  featured
                    ? 'text-ink font-display text-[10px] tracking-widest'
                    : 'text-muted font-display text-[10px] tracking-widest'
                }
              >
                {mission.minutes} {t('common.minutesShort')}
              </Text>
            </View>
            {note ? (
              <View className="flex-row items-center gap-1">
                {status === 'done' ? <DoneMark size={14} /> : null}
                <Text className="text-ink font-strong text-[11px]">{note}</Text>
              </View>
            ) : null}
          </View>
          <Text
            className={
              featured
                ? 'text-ink font-display text-[20px] leading-[24px]'
                : 'text-ink font-display text-[19px] leading-[23px]'
            }
          >
            {mission.title}
          </Text>
        </View>
        <View className="h-9 w-9 items-center justify-center rounded-full bg-white/70">
          <MissionIcon name={mission.icon} size={18} />
        </View>
      </View>

      <Text className="text-ink font-strong text-[13px] leading-[18px]">{mission.tagline}</Text>

      <View className="flex-row items-center gap-1.5">
        <MapPin color={featured ? palette.ink : palette.muted} size={13} strokeWidth={2.4} />
        <Text
          className={
            featured
              ? 'text-ink font-body flex-1 text-[12px] leading-[17px]'
              : 'text-muted font-body flex-1 text-[12px] leading-[17px]'
          }
          numberOfLines={1}
        >
          {mission.where}
        </Text>
        <Text className="text-ink font-display text-[16px]">→</Text>
      </View>
    </ChunkyPressableCard>
  );
}

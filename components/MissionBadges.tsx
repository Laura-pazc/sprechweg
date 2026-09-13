import { Check } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { ChunkyChip } from '@/components/ChunkyChip';
import { LEVEL_LABEL } from '@/lib/levelChat';
import { palette } from '@/lib/theme';
import type { Mission, MissionStatus } from '@/lib/types';

interface MissionMetaBadgesProps {
  mission: Mission;
  includeLevel?: boolean;
}

export function MissionMetaBadges({ mission, includeLevel = true }: MissionMetaBadgesProps) {
  const { t } = useTranslation();

  return (
    <View className="flex-row flex-wrap items-center gap-2">
      <ChunkyChip
        label={`${mission.category} · ${mission.minutes} ${t('common.minutesShort')}`}
        tone="cream"
        meta
        className="bg-white/75 px-2.5 py-1"
      />
      {includeLevel ? (
        <ChunkyChip
          label={mission.cefrLevel ?? LEVEL_LABEL[mission.level]}
          tone="lime"
          meta
          className="px-2 py-0.5"
        />
      ) : null}
    </View>
  );
}

interface MissionStatusBadgeProps {
  status: MissionStatus;
}

export function MissionStatusBadge({ status }: MissionStatusBadgeProps) {
  const { t } = useTranslation();
  const label =
    status === 'done'
      ? t('common.done')
      : status === 'in_progress'
        ? t('common.inProgress')
        : t('common.notStarted');

  return (
    <ChunkyChip
      label={label}
      tone={status === 'done' ? 'lime' : status === 'in_progress' ? 'sunny' : 'paper'}
      leading={
        status === 'done' ? <Check color={palette.ink} size={13} strokeWidth={3} /> : undefined
      }
      meta
      className="px-2.5 py-1"
    />
  );
}

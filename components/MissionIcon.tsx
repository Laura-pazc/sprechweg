import { Check, Compass, Users, Utensils } from 'lucide-react-native';

import { palette } from '@/lib/theme';
import type { MissionIcon as MissionIconName } from '@/lib/types';

const ICONS = {
  compass: Compass,
  utensils: Utensils,
  users: Users,
} as const;

interface MissionIconProps {
  name: MissionIconName;
  size?: number;
  color?: string;
}

export function MissionIcon({ name, size = 24, color = palette.ink }: MissionIconProps) {
  const Icon = ICONS[name];
  return <Icon color={color} size={size} strokeWidth={2.25} />;
}

export function DoneMark({ size = 18 }: { size?: number }) {
  return <Check color={palette.ink} size={size} strokeWidth={3} />;
}

import { Text } from 'react-native';
import { Compass, Users, Utensils } from 'lucide-react-native';

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
  if (name === 'leaf') {
    return <Text style={{ fontSize: size, lineHeight: Math.ceil(size * 1.25) }}>🍂</Text>;
  }

  const Icon = ICONS[name];
  return <Icon color={color} size={size} strokeWidth={2.25} />;
}

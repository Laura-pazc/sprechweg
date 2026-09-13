import { MapPin } from 'lucide-react-native';
import { Text, useWindowDimensions, View } from 'react-native';
import type { PracticeSuggestion } from '@/lib/types';
import { ChunkyButton } from '@/components/ChunkyButton';
import { palette } from '@/lib/theme';

interface SuggestionCardProps {
  suggestion: PracticeSuggestion;
  onMapPress?: () => void;
}

export function SuggestionCard({ suggestion, onMapPress }: SuggestionCardProps) {
  const { width } = useWindowDimensions();
  const hasLocation = !!suggestion.location;
  const stackMetadata = width < 360;

  return (
    <View className="rounded-12 bg-canvas w-full p-4 shadow-sm">
      <View className="mb-3 flex-row items-start gap-2">
        {hasLocation ? <MapPin size={16} color={palette.coral} /> : null}
        <Text className="font-display text-ink min-w-0 flex-1 text-[16px] font-semibold">
          {suggestion.title}
        </Text>
      </View>

      <Text className="font-body text-muted mb-3 text-[13px]">{suggestion.category}</Text>

      <View className="mb-3">
        <Text className="font-display text-muted text-[12px] font-semibold">Practice:</Text>
        <Text className="font-body text-ink text-[14px]">{suggestion.description}</Text>
      </View>

      <View className="mb-3">
        <Text className="font-display text-muted text-[12px] font-semibold">Tips:</Text>
        {suggestion.tips.map((tip) => (
          <Text key={tip} className="font-body text-ink text-[13px]">
            • {tip}
          </Text>
        ))}
      </View>

      <View className={`gap-3 ${stackMetadata ? '' : 'flex-row items-center justify-between'}`}>
        <View className="min-w-0 flex-row flex-wrap items-center gap-2">
          <View className="rounded-6 bg-muted/20 px-2 py-1">
            <Text className="font-display text-ink text-[11px] font-bold capitalize">
              {suggestion.difficulty}
            </Text>
          </View>
          {hasLocation && suggestion.location?.walkingDistanceMeters ? (
            <Text className="font-body text-muted text-[13px]">
              ~{Math.round(suggestion.location.walkingDistanceMeters / 100) * 100}m
            </Text>
          ) : null}
        </View>

        {hasLocation && onMapPress ? (
          <ChunkyButton size="sm" label="Map →" onPress={onMapPress} fullWidth={stackMetadata} />
        ) : null}
      </View>
    </View>
  );
}

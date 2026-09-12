import { MapPin } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';
import type { PracticeSuggestion } from '@/lib/types';
import { ChunkyButton } from '@/components/ChunkyButton';
import { palette } from '@/lib/theme';

interface SuggestionCardProps {
  suggestion: PracticeSuggestion;
  onMapPress?: () => void;
}

export function SuggestionCard({ suggestion, onMapPress }: SuggestionCardProps) {
  const hasLocation = !!suggestion.location;

  return (
    <View className="rounded-12 bg-canvas p-4 shadow-sm">
      {/* Header with location icon and title */}
      <View className="mb-3 flex-row items-center gap-2">
        {hasLocation && <MapPin size={16} color={palette.coral} />}
        <Text className="flex-1 font-display text-[16px] font-semibold text-ink">
          {suggestion.title}
        </Text>
      </View>

      {/* Category */}
      <Text className="mb-3 font-body text-[13px] text-muted">{suggestion.category}</Text>

      {/* Practice description */}
      <View className="mb-3">
        <Text className="font-display text-[12px] font-semibold text-muted">Practice:</Text>
        <Text className="font-body text-[14px] text-ink">{suggestion.description}</Text>
      </View>

      {/* Tips */}
      <View className="mb-3">
        <Text className="font-display text-[12px] font-semibold text-muted">Tips:</Text>
        {suggestion.tips.map((tip, idx) => (
          <Text key={idx} className="font-body text-[13px] text-ink">
            • {tip}
          </Text>
        ))}
      </View>

      {/* Metadata and button */}
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <View className="rounded-6 bg-muted/20 px-2 py-1">
            <Text className="font-display text-[11px] font-bold text-ink capitalize">
              {suggestion.difficulty}
            </Text>
          </View>
          {hasLocation && suggestion.location?.walkingDistanceMeters && (
            <Text className="font-body text-[13px] text-muted">
              ~{Math.round(suggestion.location.walkingDistanceMeters / 100) * 100}m
            </Text>
          )}
        </View>

        {hasLocation && (
          <ChunkyButton size="sm" tone="coral" onPress={onMapPress}>
            <Text className="font-display text-[13px] font-semibold">Map →</Text>
          </ChunkyButton>
        )}
      </View>
    </View>
  );
}

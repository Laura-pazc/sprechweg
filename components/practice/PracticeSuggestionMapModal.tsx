import { ArrowLeft } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';
import type { PracticeSuggestion } from '@/lib/types';
import { MapView } from '@/components/MapView';
import { ChunkyButton, ChunkyIconButton } from '@/components/ChunkyButton';
import { palette } from '@/lib/theme';

interface PracticeSuggestionMapModalProps {
  suggestion: PracticeSuggestion;
  onClose: () => void;
}

export function PracticeSuggestionMapModal({
  suggestion,
  onClose,
}: PracticeSuggestionMapModalProps) {
  if (!suggestion.location) return null;

  const { latitude, longitude, address, walkingDistanceMeters } = suggestion.location;

  const marker = {
    id: suggestion.id,
    coordinate: { latitude, longitude },
    title: suggestion.title,
    description: suggestion.category,
    color: 'coral' as const,
  };

  return (
    <>
      <View className="absolute inset-0 bg-black/40" />

      <View className="absolute bottom-0 left-0 right-0 flex-1 rounded-t-24 bg-paper">
        {/* Header */}
        <View className="flex-row items-center gap-3 border-b border-canvas px-5 py-4">
          <ChunkyIconButton onPress={onClose} size={30} tone="canvas">
            <ArrowLeft color={palette.ink} size={18} />
          </ChunkyIconButton>
          <Text className="flex-1 font-display text-[18px] font-semibold text-ink">
            {suggestion.title}
          </Text>
        </View>

        {/* Map */}
        <MapView
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          markers={[marker]}
          showsUserLocation
          className="h-64"
        />

        {/* Info card */}
        <View className="gap-3 px-5 py-4">
          <View>
            <Text className="font-display text-[16px] font-bold text-ink">{suggestion.title}</Text>
            <Text className="font-body text-[13px] text-muted">{address}</Text>
          </View>

          {suggestion.tips.length > 0 && (
            <View>
              <Text className="font-display text-[12px] font-semibold text-muted">
                Practice tips:
              </Text>
              {suggestion.tips.map((tip, idx) => (
                <Text key={idx} className="font-body text-[13px] text-ink">
                  • {tip}
                </Text>
              ))}
            </View>
          )}

          {walkingDistanceMeters && (
            <Text className="font-body text-[13px] text-muted">
              ~{Math.round(walkingDistanceMeters / 100) * 100}m walk away
            </Text>
          )}

          <ChunkyButton tone="coral" onPress={onClose}>
            <Text className="font-display text-[14px] font-semibold text-paper">Close Map</Text>
          </ChunkyButton>
        </View>
      </View>
    </>
  );
}

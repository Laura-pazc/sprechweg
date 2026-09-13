import { ArrowLeft } from 'lucide-react-native';
import { Text, View } from 'react-native';
import type { PracticeSuggestion } from '@/lib/types';
import MapView from '@/components/MapView';
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

      <View className="rounded-t-24 bg-paper absolute right-0 bottom-0 left-0 flex-1">
        {/* Header */}
        <View className="border-canvas flex-row items-center gap-3 border-b px-5 py-4">
          <ChunkyIconButton
            onPress={onClose}
            size={30}
            tone="canvas"
            accessibilityLabel="Close map"
          >
            <ArrowLeft color={palette.ink} size={18} />
          </ChunkyIconButton>
          <Text className="font-display text-ink flex-1 text-[18px] font-semibold">
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
            <Text className="font-display text-ink text-[16px] font-bold">{suggestion.title}</Text>
            <Text className="font-body text-muted text-[13px]">{address}</Text>
          </View>

          {suggestion.tips.length > 0 && (
            <View>
              <Text className="font-display text-muted text-[12px] font-semibold">
                Practice tips:
              </Text>
              {suggestion.tips.map((tip, idx) => (
                <Text key={idx} className="font-body text-ink text-[13px]">
                  • {tip}
                </Text>
              ))}
            </View>
          )}

          {walkingDistanceMeters && (
            <Text className="font-body text-muted text-[13px]">
              ~{Math.round(walkingDistanceMeters / 100) * 100}m walk away
            </Text>
          )}

          <ChunkyButton label="Close Map" variant="paper" onPress={onClose} />
        </View>
      </View>
    </>
  );
}

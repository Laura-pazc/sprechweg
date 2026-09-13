import { ArrowLeft } from 'lucide-react-native';
import { Modal, ScrollView, Text, useWindowDimensions, View } from 'react-native';
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
  const { width, height } = useWindowDimensions();

  if (!suggestion.location) return null;

  const { latitude, longitude, address, walkingDistanceMeters } = suggestion.location;
  const mapHeight = Math.max(220, Math.min(width - 32, height * 0.42, 360));

  const marker = {
    id: suggestion.id,
    coordinate: { latitude, longitude },
    title: suggestion.title,
    description: suggestion.category,
    color: 'coral' as const,
  };

  return (
    <Modal animationType="slide" onRequestClose={onClose} presentationStyle="fullScreen" visible>
      <View className="bg-paper pt-safe flex-1">
        <View className="border-canvas flex-row items-center gap-3 border-b px-4 py-3">
          <ChunkyIconButton
            onPress={onClose}
            size={36}
            tone="canvas"
            accessibilityLabel="Close map"
          >
            <ArrowLeft color={palette.ink} size={20} />
          </ChunkyIconButton>
          <Text
            className="font-display text-ink min-w-0 flex-1 text-[18px] font-semibold"
            numberOfLines={2}
          >
            {suggestion.title}
          </Text>
        </View>

        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 24 }}
          showsVerticalScrollIndicator
        >
          <View className="px-4 pt-4">
            <View className="rounded-16 border-ink overflow-hidden border-2">
              <MapView
                initialRegion={{
                  latitude,
                  longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
                markers={[marker]}
                showsUserLocation
                style={{ height: mapHeight, width: '100%' }}
              />
            </View>
          </View>

          <View className="gap-3 px-5 py-4">
            <View>
              <Text className="font-display text-ink text-[16px] font-bold">
                {suggestion.title}
              </Text>
              <Text className="font-body text-muted text-[13px]">{address}</Text>
            </View>

            {suggestion.tips.length > 0 ? (
              <View>
                <Text className="font-display text-muted text-[12px] font-semibold">
                  Practice tips:
                </Text>
                {suggestion.tips.map((tip) => (
                  <Text key={tip} className="font-body text-ink text-[13px]">
                    • {tip}
                  </Text>
                ))}
              </View>
            ) : null}

            {walkingDistanceMeters ? (
              <Text className="font-body text-muted text-[13px]">
                ~{Math.round(walkingDistanceMeters / 100) * 100}m walk away
              </Text>
            ) : null}

            <ChunkyButton label="Close Map" variant="paper" onPress={onClose} fullWidth />
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

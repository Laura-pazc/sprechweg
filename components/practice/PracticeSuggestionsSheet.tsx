import { X } from 'lucide-react-native';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import type { PracticeSuggestion } from '@/lib/types';
import { SuggestionCard } from './SuggestionCard';
import { PracticeSuggestionMapModal } from './PracticeSuggestionMapModal';
import { ChunkyButton, ChunkyIconButton } from '@/components/ChunkyButton';
import { palette } from '@/lib/theme';

interface PracticeSuggestionsSheetProps {
  isOpen: boolean;
  suggestions: PracticeSuggestion[];
  onClose: () => void;
  onStartMission: () => void;
}

export function PracticeSuggestionsSheet({
  isOpen,
  suggestions,
  onClose,
  onStartMission,
}: PracticeSuggestionsSheetProps) {
  const { t } = useTranslation();
  const [selectedMapSuggestion, setSelectedMapSuggestion] = useState<PracticeSuggestion | null>(
    null,
  );

  if (!isOpen) return null;

  const handleMapPress = (suggestion: PracticeSuggestion) => {
    if (suggestion.location) {
      setSelectedMapSuggestion(suggestion);
    }
  };

  const handleCloseMap = () => {
    setSelectedMapSuggestion(null);
  };

  return (
    <>
      <View className="absolute inset-0 bg-black/40" onTouchEnd={onClose} />

      <View className="absolute bottom-0 left-0 right-0 flex-1 rounded-t-24 bg-paper pt-4">
        {/* Header with close button */}
        <View className="flex-row items-start justify-between px-5 pb-4">
          <View className="flex-1">
            <Text className="font-display text-[20px] font-bold text-ink">
              Ready to practice?
            </Text>
            <Text className="font-body text-[14px] text-muted">
              Here are places in Hamburg where you can use these words
            </Text>
          </View>
          <ChunkyIconButton onPress={onClose} size={30} tone="canvas">
            <X color={palette.ink} size={18} />
          </ChunkyIconButton>
        </View>

        {/* Scrollable suggestions */}
        <ScrollView
          className="flex-1 px-5"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ gap: 12, paddingBottom: 20 }}
        >
          {suggestions.map((suggestion) => (
            <SuggestionCard
              key={suggestion.id}
              suggestion={suggestion}
              onMapPress={() => handleMapPress(suggestion)}
            />
          ))}
        </ScrollView>

        {/* Footer buttons */}
        <View className="flex-row gap-3 border-t border-canvas px-5 py-4">
          <ChunkyButton tone="canvas" onPress={onClose} className="flex-1">
            <Text className="font-display text-[14px] font-semibold text-ink">Back</Text>
          </ChunkyButton>
          <ChunkyButton tone="coral" onPress={onStartMission} className="flex-1">
            <Text className="font-display text-[14px] font-semibold text-paper">
              Start Mission
            </Text>
          </ChunkyButton>
        </View>
      </View>

      {/* Map modal */}
      {selectedMapSuggestion && (
        <PracticeSuggestionMapModal
          suggestion={selectedMapSuggestion}
          onClose={handleCloseMap}
        />
      )}
    </>
  );
}

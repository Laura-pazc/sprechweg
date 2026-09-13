import { X } from 'lucide-react-native';
import { Modal, Pressable, ScrollView, Text, useWindowDimensions, View } from 'react-native';
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
  const { width } = useWindowDimensions();
  const [selectedMapSuggestion, setSelectedMapSuggestion] = useState<PracticeSuggestion | null>(
    null,
  );
  const stackActions = width < 380;

  const handleMapPress = (suggestion: PracticeSuggestion) => {
    if (suggestion.location) {
      setSelectedMapSuggestion(suggestion);
    }
  };

  const handleClose = () => {
    setSelectedMapSuggestion(null);
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      onRequestClose={handleClose}
      presentationStyle="overFullScreen"
      statusBarTranslucent
      transparent
      visible={isOpen}
    >
      <View className="flex-1 justify-end">
        <Pressable
          accessibilityLabel={t('common.close')}
          className="absolute inset-0 bg-black/40"
          onPress={handleClose}
        />

        <View
          className="rounded-t-24 bg-paper overflow-hidden pt-4"
          style={{ maxHeight: '92%', minHeight: 0, width: '100%' }}
        >
          <View className="flex-row items-start justify-between gap-3 px-5 pb-4">
            <View className="min-w-0 flex-1">
              <Text className="font-display text-ink text-[20px] font-bold">
                Ready to practice?
              </Text>
              <Text className="font-body text-muted text-[14px]">
                Here are places in Hamburg where you can use these words
              </Text>
            </View>
            <ChunkyIconButton
              onPress={handleClose}
              size={30}
              tone="canvas"
              accessibilityLabel={t('common.close')}
            >
              <X color={palette.ink} size={18} />
            </ChunkyIconButton>
          </View>

          <ScrollView
            className="px-5"
            style={{ flexGrow: 0, flexShrink: 1, minHeight: 0 }}
            showsVerticalScrollIndicator
            contentContainerStyle={{ gap: 12, paddingBottom: 20 }}
            nestedScrollEnabled
          >
            {suggestions.map((suggestion) => (
              <SuggestionCard
                key={suggestion.id}
                suggestion={suggestion}
                onMapPress={() => handleMapPress(suggestion)}
              />
            ))}
          </ScrollView>

          <View
            className={`border-canvas pb-safe-or-4 gap-3 border-t px-5 pt-4 ${stackActions ? '' : 'flex-row'}`}
          >
            <ChunkyButton
              label="Back"
              variant="paper"
              onPress={handleClose}
              className={stackActions ? '' : 'flex-1'}
              fullWidth={stackActions}
            />
            <ChunkyButton
              label="Start Mission"
              onPress={onStartMission}
              className={stackActions ? '' : 'flex-1'}
              fullWidth={stackActions}
            />
          </View>
        </View>

        {selectedMapSuggestion ? (
          <PracticeSuggestionMapModal
            suggestion={selectedMapSuggestion}
            onClose={() => setSelectedMapSuggestion(null)}
          />
        ) : null}
      </View>
    </Modal>
  );
}

import { Check, Languages, X } from 'lucide-react-native';
import { Modal, Pressable, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { ChunkyCard } from '@/components/ChunkyCard';
import { ChunkyIconButton } from '@/components/ChunkyButton';
import { LANGUAGE_OPTIONS, type AppLocale } from '@/lib/i18n';
import { palette } from '@/lib/theme';

interface LanguagePickerProps {
  visible: boolean;
  locale: AppLocale;
  onSelect: (locale: AppLocale) => void;
  onClose: () => void;
}

export function LanguagePicker({ visible, locale, onSelect, onClose }: LanguagePickerProps) {
  const { t } = useTranslation();

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View className="flex-1 items-center justify-center px-5">
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={t('common.close')}
          className="bg-ink/45 absolute inset-0"
          onPress={onClose}
        />
        <View className="w-full max-w-[420px]">
          <ChunkyCard tone="cream" offset={6} className="gap-4 px-5 py-5">
            <View className="flex-row items-start justify-between gap-3">
              <View className="flex-1 gap-1.5">
                <View className="flex-row items-center gap-2">
                  <Languages color={palette.ink} size={20} strokeWidth={2.5} />
                  <Text className="text-ink font-display text-[21px] leading-[25px]">
                    {t('language.title')}
                  </Text>
                </View>
                <Text className="text-muted font-body text-[13.5px] leading-[19px]">
                  {t('language.subtitle')}
                </Text>
              </View>
              <ChunkyIconButton accessibilityLabel={t('common.close')} onPress={onClose} size={34}>
                <X color={palette.ink} size={17} strokeWidth={2.7} />
              </ChunkyIconButton>
            </View>

            <View className="gap-2.5">
              {LANGUAGE_OPTIONS.map((option) => {
                const selected = option.value === locale;
                return (
                  <Pressable
                    key={option.value}
                    accessibilityRole="radio"
                    accessibilityState={{ selected }}
                    onPress={() => onSelect(option.value)}
                    className={
                      selected
                        ? 'border-ink bg-sunny flex-row items-center justify-between rounded-2xl border-[2.5px] px-4 py-3.5'
                        : 'border-ink flex-row items-center justify-between rounded-2xl border-[2.5px] bg-white px-4 py-3.5'
                    }
                  >
                    <Text className="text-ink font-display text-[16px]">{option.label}</Text>
                    {selected ? (
                      <View className="flex-row items-center gap-1.5">
                        <Text className="text-ink font-strong text-[12px]">
                          {t('language.selected')}
                        </Text>
                        <Check color={palette.ink} size={18} strokeWidth={3} />
                      </View>
                    ) : null}
                  </Pressable>
                );
              })}
            </View>
          </ChunkyCard>
        </View>
      </View>
    </Modal>
  );
}

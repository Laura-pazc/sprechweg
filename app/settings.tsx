import { router } from 'expo-router';
import { Check, ChevronRight } from 'lucide-react-native';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { ChunkyButton } from '@/components/ChunkyButton';
import { ChunkyCard, ChunkyPressableCard } from '@/components/ChunkyCard';
import { ChunkyInput } from '@/components/ChunkyInput';
import { Screen } from '@/components/Screen';
import { ScreenHeader } from '@/components/ScreenHeader';
import { SectionHeading } from '@/components/SectionHeading';
import { LANGUAGE_OPTIONS, type AppLocale } from '@/lib/i18n';
import { routes } from '@/lib/navigation';
import { useAppStore } from '@/lib/store';
import { palette } from '@/lib/theme';
import type { Level } from '@/lib/types';
import { cn } from '@/lib/utils';

const LEVELS: Level[] = ['beginner', 'intermediate', 'advanced'];

function ChoiceButton({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      onPress={onPress}
      className={cn(
        'border-ink min-h-12 flex-row items-center justify-between rounded-[14px] border-2 px-4 py-3',
        selected ? 'bg-sunny' : 'bg-white',
      )}
    >
      <Text className="text-ink font-display text-[15px]">{label}</Text>
      {selected ? <Check color={palette.ink} size={18} strokeWidth={3} /> : null}
    </Pressable>
  );
}

export default function SettingsScreen() {
  const { t } = useTranslation();
  const storedName = useAppStore((state) => state.name);
  const storedLevel = useAppStore((state) => state.level);
  const storedLocale = useAppStore((state) => state.locale);
  const updateProfile = useAppStore((state) => state.updateProfile);
  const resetProgress = useAppStore((state) => state.resetProgress);

  const [name, setName] = useState(storedName);
  const [level, setLevel] = useState<Level>(storedLevel ?? 'beginner');
  const [locale, setLocale] = useState<AppLocale>(storedLocale);
  const [saved, setSaved] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  const handleSave = () => {
    updateProfile({ name, level, locale });
    setSaved(true);
  };

  return (
    <Screen>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1"
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerClassName="gap-5 px-5 pb-10"
        >
          <ScreenHeader
            nested
            compact
            backFallback={routes.profile}
            kicker={t('settings.kicker')}
            title={t('settings.title')}
            subtitle={t('settings.subtitle')}
          />

          <View className="gap-3">
            <SectionHeading title={t('settings.profile')} />
            <ChunkyCard tone="paper" offset={4} radius={18} className="gap-4 px-4 py-4">
              <View className="gap-2">
                <Text className="text-ink font-display text-[14px]">{t('settings.name')}</Text>
                <ChunkyInput
                  value={name}
                  onChangeText={(value) => {
                    setName(value);
                    setSaved(false);
                  }}
                  placeholder={t('settings.namePlaceholder')}
                  autoCapitalize="words"
                  returnKeyType="done"
                  maxLength={40}
                />
              </View>
            </ChunkyCard>
          </View>

          <View className="gap-3">
            <View className="gap-1">
              <SectionHeading title={t('settings.language')} />
              <Text className="text-muted font-body text-[13px] leading-[18px]">
                {t('settings.languageHint')}
              </Text>
            </View>
            <View accessibilityRole="radiogroup" className="gap-2.5">
              {LANGUAGE_OPTIONS.map((option) => (
                <ChoiceButton
                  key={option.value}
                  label={option.label}
                  selected={locale === option.value}
                  onPress={() => {
                    setLocale(option.value);
                    setSaved(false);
                  }}
                />
              ))}
            </View>
          </View>

          <View className="gap-3">
            <View className="gap-1">
              <SectionHeading title={t('settings.level')} />
              <Text className="text-muted font-body text-[13px] leading-[18px]">
                {t('settings.levelHint')}
              </Text>
            </View>
            <View accessibilityRole="radiogroup" className="gap-2.5">
              {LEVELS.map((option) => (
                <ChoiceButton
                  key={option}
                  label={t(`levels.${option}`)}
                  selected={level === option}
                  onPress={() => {
                    setLevel(option);
                    setSaved(false);
                  }}
                />
              ))}
            </View>
          </View>

          <View className="gap-2">
            <ChunkyButton
              label={saved ? t('settings.saved') : t('settings.save')}
              variant={saved ? 'lime' : 'primary'}
              fullWidth
              disabled={!name.trim()}
              onPress={handleSave}
            />
          </View>

          <View className="gap-3">
            <SectionHeading title={t('settings.more')} />
            <ChunkyPressableCard
              tone="paper"
              offset={4}
              radius={16}
              onPress={() => router.push(routes.levelResult)}
              className="flex-row items-center justify-between gap-3 px-4 py-3.5"
            >
              <Text className="text-ink font-strong flex-1 text-[14px]">
                {t('settings.retake')}
              </Text>
              <ChevronRight color={palette.ink} size={19} strokeWidth={2.5} />
            </ChunkyPressableCard>
            <ChunkyPressableCard
              tone="paper"
              offset={4}
              radius={16}
              onPress={() => router.push(routes.howItWorks)}
              className="flex-row items-center justify-between gap-3 px-4 py-3.5"
            >
              <Text className="text-ink font-strong flex-1 text-[14px]">
                {t('settings.howItWorks')}
              </Text>
              <ChevronRight color={palette.ink} size={19} strokeWidth={2.5} />
            </ChunkyPressableCard>
          </View>

          <ChunkyCard tone="canvas" offset={4} radius={18} className="gap-3 px-4 py-4">
            <View className="gap-1">
              <Text className="text-ink font-display text-[15px]">{t('settings.danger')}</Text>
              <Text className="text-muted font-body text-[13px] leading-[18px]">
                {t('settings.dangerHint')}
              </Text>
            </View>
            <ChunkyButton
              label={confirmReset ? t('progress.confirmReset') : t('progress.reset')}
              variant={confirmReset ? 'ink' : 'quiet'}
              onPress={() => {
                if (!confirmReset) {
                  setConfirmReset(true);
                  return;
                }
                resetProgress();
                router.replace(routes.onboarding);
              }}
            />
          </ChunkyCard>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}

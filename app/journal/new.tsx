import { router } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';

import { ChunkyButton } from '@/components/ChunkyButton';
import { ChunkyInput } from '@/components/ChunkyInput';
import { Screen } from '@/components/Screen';
import { ScreenHeader } from '@/components/ScreenHeader';
import { routes } from '@/lib/navigation';
import { useAppStore } from '@/lib/store';

export default function DailyJournalScreen() {
  const { t } = useTranslation();
  const addJournalEntry = useAppStore((state) => state.addJournalEntry);
  const [answer, setAnswer] = useState('');

  const save = () => {
    const prompt = t('journal.dailyPrompt');
    addJournalEntry({
      missionId: null,
      prompts: [prompt],
      answers: [answer.trim()],
      quizScore: 0,
      quizTotal: 0,
    });
    router.replace(routes.journalTab);
  };

  return (
    <Screen>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerClassName="gap-5 px-5 pb-safe-offset-8"
          keyboardShouldPersistTaps="handled"
        >
          <ScreenHeader
            nested
            compact
            kicker={t('journal.kicker')}
            title={t('journal.dailyTitle')}
            subtitle={t('journal.dailyBody')}
            onBack={() => router.replace(routes.journalTab)}
          />

          <View className="gap-3">
            <View className="border-ink bg-sky gap-1.5 rounded-[14px] border-2 px-4 py-4">
              <Text className="text-muted font-display text-[10px] tracking-widest">
                {t('journal.dailyEntry').toUpperCase()}
              </Text>
              <Text className="text-ink font-strong text-[21px] leading-[27px]">
                {t('journal.dailyPrompt')}
              </Text>
            </View>

            <ChunkyInput
              value={answer}
              onChangeText={setAnswer}
              placeholder={t('journal.dailyPlaceholder')}
              multiline
              className="min-h-[240px] px-4 py-4"
              textAlignVertical="top"
              autoFocus
            />
          </View>

          <ChunkyButton
            label={t('journal.dailySave')}
            size="lg"
            fullWidth
            disabled={answer.trim().length === 0}
            onPress={save}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}

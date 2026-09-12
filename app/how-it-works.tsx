import { X } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, View } from 'react-native';

import { ChunkyButton, ChunkyIconButton } from '@/components/ChunkyButton';
import { ChunkyCard } from '@/components/ChunkyCard';
import { Screen } from '@/components/Screen';
import { ScreenHeader } from '@/components/ScreenHeader';
import { goBackOrReplace, routes } from '@/lib/navigation';
import { palette } from '@/lib/theme';

// Indexes into the `howItWorks.perLearner` / `howItWorks.fixed` i18n resource entries.
const PER_LEARNER_KEYS = [0, 1, 2, 3] as const;
const FIXED_KEYS = [0, 1, 2, 3] as const;

export default function HowItWorksScreen() {
  const { t } = useTranslation();

  return (
    <Screen>
      <ScrollView contentContainerClassName="pb-safe-offset-8">
        <ScreenHeader
          showBack={false}
          kicker={t('today.howItWorks')}
          title={t('howItWorks.title')}
          subtitle={t('howItWorks.subtitle')}
          right={
            <ChunkyIconButton
              accessibilityLabel={t('common.close')}
              onPress={() => goBackOrReplace(routes.today)}
              size={36}
            >
              <X color={palette.ink} size={18} strokeWidth={2.5} />
            </ChunkyIconButton>
          }
        />

        <View className="gap-5 px-5">
          <ChunkyCard tone="sky" className="gap-2 px-4 py-4">
            <Text className="text-ink font-display text-[19px] leading-[24px]">
              {t('howItWorks.nothingVerifies')}
            </Text>
            <Text className="text-ink font-body text-[14px] leading-[21px]">
              {t('howItWorks.nothingVerifiesBody')}
            </Text>
          </ChunkyCard>

          <View className="gap-3">
            <Text className="text-ink font-display text-[19px]">
              {t('howItWorks.generatedForYou')}
            </Text>
            {PER_LEARNER_KEYS.map((index) => (
              <ChunkyCard key={index} tone="paper" offset={4} className="gap-1.5 px-4 py-3.5">
                <Text className="text-ink font-display text-[16px]">
                  {t(`howItWorks.perLearner.${index}.title`)}
                </Text>
                <Text className="text-muted font-body text-[13.5px] leading-[20px]">
                  {t(`howItWorks.perLearner.${index}.detail`)}
                </Text>
              </ChunkyCard>
            ))}
            <ChunkyCard tone="sunny" offset={4} className="gap-1.5 px-4 py-3.5">
              <Text className="text-ink font-display text-[14px]">
                {t('howItWorks.saidPlainly')}
              </Text>
              <Text className="text-ink font-body text-[13.5px] leading-[20px]">
                {t('howItWorks.saidPlainlyBody')}
              </Text>
            </ChunkyCard>
          </View>

          <View className="gap-3">
            <Text className="text-ink font-display text-[19px]">
              {t('howItWorks.fixedForEveryone')}
            </Text>
            {FIXED_KEYS.map((index) => (
              <ChunkyCard key={index} tone="canvas" offset={4} className="gap-1.5 px-4 py-3.5">
                <Text className="text-ink font-display text-[16px]">
                  {t(`howItWorks.fixed.${index}.title`)}
                </Text>
                <Text className="text-muted font-body text-[13.5px] leading-[20px]">
                  {t(`howItWorks.fixed.${index}.detail`)}
                </Text>
              </ChunkyCard>
            ))}
          </View>

          <ChunkyButton
            label={t('prep.gotIt')}
            size="lg"
            fullWidth
            onPress={() => goBackOrReplace(routes.today)}
          />
        </View>
      </ScrollView>
    </Screen>
  );
}

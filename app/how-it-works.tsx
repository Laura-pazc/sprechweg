import { BookOpenCheck, PencilLine, UsersRound, X } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, View } from 'react-native';

import { ChunkyButton, ChunkyIconButton } from '@/components/ChunkyButton';
import { ChunkyCard } from '@/components/ChunkyCard';
import { Screen } from '@/components/Screen';
import { ScreenHeader } from '@/components/ScreenHeader';
import { goBackOrReplace, routes } from '@/lib/navigation';
import { palette } from '@/lib/theme';

const HOW_IT_WORKS_CARDS = [
  { key: 'makeItYours', tone: 'sky', Icon: PencilLine },
  { key: 'reflectAndGrow', tone: 'sunny', Icon: BookOpenCheck },
  { key: 'keepItHuman', tone: 'paper', Icon: UsersRound },
] as const;

export default function HowItWorksScreen() {
  const { t } = useTranslation();

  return (
    <Screen>
      <ScrollView contentContainerClassName="pb-safe-offset-8">
        <ScreenHeader
          showBack={false}
          kicker={t('today.howItWorks')}
          title={t('howItWorks.title')}
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

        <View className="gap-4 px-5">
          {HOW_IT_WORKS_CARDS.map(({ key, tone, Icon }) => (
            <ChunkyCard key={key} tone={tone} offset={4} className="gap-3 px-4 py-4">
              <View className="flex-row items-center gap-2.5">
                <View className="h-9 w-9 items-center justify-center rounded-full bg-white/70">
                  <Icon color={palette.ink} size={19} strokeWidth={2.4} />
                </View>
                <Text className="text-ink font-display text-[19px] leading-[24px]">
                  {t(`howItWorks.${key}.title`)}
                </Text>
              </View>
              <Text className="text-ink font-body text-[14px] leading-[21px]">
                {t(`howItWorks.${key}.detail`)}
              </Text>
            </ChunkyCard>
          ))}

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

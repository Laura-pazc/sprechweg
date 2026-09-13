import { Link, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { View, Text } from 'react-native';

export default function NotFoundScreen() {
  const { t } = useTranslation();

  return (
    <>
      <Stack.Screen options={{ title: t('notFound.oopsTitle') }} />
      <View>
        <Text>{t('notFound.body')}</Text>

        <Link href="/">
          <Text>{t('notFound.goHome')}</Text>
        </Link>
      </View>
    </>
  );
}

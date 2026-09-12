import { Compass, Home, NotebookPen, Sparkles } from 'lucide-react-native';
import { Redirect, Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Platform, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

import { routes } from '@/lib/navigation';
import { useAppStore } from '@/lib/store';
import { palette } from '@/lib/theme';

export default function TabLayout() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const hydrated = useAppStore((state) => state.hydrated);
  const level = useAppStore((state) => state.level);
  const isWeb = Platform.OS === 'web';
  const bottomInset = isWeb ? 18 : Math.max(insets.bottom, 10);
  const tabBarHeight = (isWeb ? 68 : 64) + bottomInset;

  // Wait for storage before deciding: otherwise a returning learner flashes
  // through onboarding on every cold start.
  if (!hydrated) {
    return <View className="bg-cream flex-1" />;
  }

  if (level === null) {
    return <Redirect href={routes.onboarding} />;
  }

  return (
    <>
      {/* oxlint-disable-next-line react/style-prop-object -- expo-status-bar's `style` is a string enum ("dark" | "light" | "auto"), not a React Native style object */}
      <StatusBar style="dark" />
      <Tabs
        screenOptions={{
          headerShown: false,
          sceneStyle: { backgroundColor: palette.cream },
          tabBarStyle: {
            backgroundColor: palette.cream,
            borderTopColor: palette.ink,
            borderTopWidth: 2,
            height: tabBarHeight,
            paddingTop: 8,
            paddingBottom: bottomInset,
            elevation: 0,
            shadowColor: 'transparent',
            shadowOpacity: 0,
            shadowRadius: 0,
          },
          tabBarActiveTintColor: palette.ink,
          tabBarInactiveTintColor: palette.muted,
          tabBarLabelStyle: {
            fontFamily: 'Inter_600SemiBold',
            fontSize: 11,
            lineHeight: 16,
            marginBottom: 0,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: t('tabs.today'),
            tabBarIcon: ({ color, size }) => <Home color={color} size={size ?? 24} />,
          }}
        />
        <Tabs.Screen
          name="missions"
          options={{
            title: t('tabs.missions'),
            tabBarIcon: ({ color, size }) => <Compass color={color} size={size ?? 24} />,
          }}
        />
        <Tabs.Screen
          name="journal"
          options={{
            title: t('tabs.journal'),
            tabBarIcon: ({ color, size }) => <NotebookPen color={color} size={size ?? 24} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: t('tabs.progress'),
            tabBarIcon: ({ color, size }) => <Sparkles color={color} size={size ?? 24} />,
          }}
        />
      </Tabs>
    </>
  );
}

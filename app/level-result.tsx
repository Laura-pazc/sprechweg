import { Redirect, router } from 'expo-router';
import { Check } from 'lucide-react-native';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { ChunkyButton } from '@/components/ChunkyButton';
import { ChunkyCard } from '@/components/ChunkyCard';
import { ChunkyChip } from '@/components/ChunkyChip';
import { ProgressBar } from '@/components/ProgressBar';
import { Screen } from '@/components/Screen';
import { ScreenHeader } from '@/components/ScreenHeader';
import { LEVEL_SUMMARY, MAX_LEVEL_SCORE } from '@/lib/levelChat';
import { getMission, MISSIONS } from '@/lib/missions';
import { routes } from '@/lib/navigation';
import { useAppStore } from '@/lib/store';
import { palette } from '@/lib/theme';

export default function LevelResultScreen() {
  const hydrated = useAppStore((state) => state.hydrated);
  const level = useAppStore((state) => state.level);
  const name = useAppStore((state) => state.name);
  const levelScore = useAppStore((state) => state.levelScore);

  if (!hydrated) return <Screen />;
  if (level === null) return <Redirect href={routes.onboarding} />;

  const summary = LEVEL_SUMMARY[level];
  const firstMission = getMission(summary.startsWith) ?? MISSIONS[0];

  return (
    <Screen>
      <ScrollView contentContainerClassName="pb-safe-offset-8">
        <ScreenHeader
          kicker="Your starting point"
          title={`${summary.title}, ${name || 'friend'}.`}
          subtitle="You can retake the chat any time — nothing here is locked in."
        />

        <View className="gap-5 px-5">
          <ChunkyCard tone="lime" className="gap-3 px-4 py-5">
            <ChunkyChip label={`${summary.title} tier`} tone="paper" />
            <Text className="text-ink font-display text-[22px] leading-[27px]">
              {summary.headline}
            </Text>
            <Text className="text-ink font-body text-[15px] leading-[22px]">{summary.blurb}</Text>
          </ChunkyCard>

          <ProgressBar
            label={`Chat signal: ${levelScore} of ${MAX_LEVEL_SCORE} points`}
            value={(levelScore / MAX_LEVEL_SCORE) * 100}
          />

          <View className="gap-3">
            <Text className="text-ink font-display text-[19px]">What changes for you</Text>
            {summary.traits.map((trait) => (
              <View key={trait} className="flex-row items-start gap-2.5">
                <View className="border-ink bg-sunny mt-0.5 h-6 w-6 items-center justify-center rounded-full border-2">
                  <Check color={palette.ink} size={14} strokeWidth={3} />
                </View>
                <Text className="text-ink font-strong flex-1 text-[14.5px] leading-[21px]">
                  {trait}
                </Text>
              </View>
            ))}
          </View>

          <ChunkyCard tone="cream" offset={4} className="gap-2 px-4 py-4">
            <Text className="text-muted font-display text-[11px] tracking-widest">
              GENERATED FOR YOU
            </Text>
            <Text className="text-ink font-body text-[13.5px] leading-[20px]">
              This tier came from your five answers. The missions themselves are fixed and authored
              — the level only decides which one you meet first and how much English you see.
            </Text>
          </ChunkyCard>

          <View className="gap-2">
            <ChunkyButton
              label={`Start with “${firstMission.title}”`}
              size="lg"
              fullWidth
              trailing={<Text className="text-cream font-display text-[17px]">→</Text>}
              onPress={() => router.replace(routes.missionPrep(firstMission.id))}
            />
            <ChunkyButton
              label="Browse all missions"
              variant="paper"
              fullWidth
              onPress={() => router.replace(routes.missions)}
            />
            <Pressable
              accessibilityRole="button"
              onPress={() => router.replace(routes.onboarding)}
              className="self-start py-2"
            >
              <Text className="text-ink font-strong border-ink border-b-2 text-[14px]">
                Not quite right? Retake the chat
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}

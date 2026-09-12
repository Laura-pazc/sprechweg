import { X } from 'lucide-react-native';
import { ScrollView, Text, View } from 'react-native';

import { ChunkyButton, ChunkyIconButton } from '@/components/ChunkyButton';
import { ChunkyCard } from '@/components/ChunkyCard';
import { Screen } from '@/components/Screen';
import { ScreenHeader } from '@/components/ScreenHeader';
import { goBackOrReplace, routes } from '@/lib/navigation';
import { palette } from '@/lib/theme';

const PER_LEARNER = [
  {
    title: 'Your level estimate',
    detail:
      'Built from the five answers you gave in the onboarding chat. Three tiers only — beginner, intermediate, advanced.',
  },
  {
    title: 'Prep vocab and the conversation sim',
    detail:
      'Which phrases lead, how much English you see, and whether the exchange stays scripted or goes off-script depends on your tier.',
  },
  {
    title: 'Reflection prompts',
    detail:
      'The two journal questions are written against the mission you just did and your tier — a beginner gets asked about missing words, an advanced learner about what they could not prepare.',
  },
  {
    title: 'The recall quiz',
    detail:
      'Pulled from the vocab you personally ticked off in prep, with distractors drawn from the rest of that mission.',
  },
];

const FIXED = [
  {
    title: 'The mission library',
    detail:
      'Every mission has authored vocabulary, conversation text, practice, and a real-world action. The same source content is available to everyone.',
  },
  {
    title: 'Streak math',
    detail:
      'One journal entry per calendar day. Journal yesterday and today and it grows; skip a day and it restarts at one.',
  },
  {
    title: 'Badges',
    detail: 'One badge per mission completed, with no hidden criteria.',
  },
  {
    title: 'The confidence number',
    detail:
      'Fixed weights: marking vocab and finishing practice count a little, actually going outside counts most.',
  },
];

export default function HowItWorksScreen() {
  return (
    <Screen>
      <ScrollView contentContainerClassName="pb-safe-offset-8">
        <ScreenHeader
          showBack={false}
          kicker="How it works"
          title="Practice outside, not in a streak menu."
          subtitle="City Sidekick prepares one small real-life exchange at a time, then asks you what happened."
          right={
            <ChunkyIconButton
              accessibilityLabel="Close"
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
              Nothing here verifies you
            </Text>
            <Text className="text-ink font-body text-[14px] leading-[21px]">
              The app cannot hear your conversation and does not try. You mark the mission done
              yourself — the honesty is the point, and the journal is where the learning lands.
            </Text>
          </ChunkyCard>

          <View className="gap-3">
            <Text className="text-ink font-display text-[19px]">Generated for you</Text>
            {PER_LEARNER.map((item) => (
              <ChunkyCard key={item.title} tone="paper" offset={4} className="gap-1.5 px-4 py-3.5">
                <Text className="text-ink font-display text-[16px]">{item.title}</Text>
                <Text className="text-muted font-body text-[13.5px] leading-[20px]">
                  {item.detail}
                </Text>
              </ChunkyCard>
            ))}
            <ChunkyCard tone="sunny" offset={4} className="gap-1.5 px-4 py-3.5">
              <Text className="text-ink font-display text-[14px]">Said plainly</Text>
              <Text className="text-ink font-body text-[13.5px] leading-[20px]">
                In this version those four run as scripted on-device rules keyed to your tier, your
                mission, and the words you ticked — deterministic and offline. They are the exact
                seams a language model would take over later. No AI service is called today.
              </Text>
            </ChunkyCard>
          </View>

          <View className="gap-3">
            <Text className="text-ink font-display text-[19px]">Fixed for everyone</Text>
            {FIXED.map((item) => (
              <ChunkyCard key={item.title} tone="canvas" offset={4} className="gap-1.5 px-4 py-3.5">
                <Text className="text-ink font-display text-[16px]">{item.title}</Text>
                <Text className="text-muted font-body text-[13.5px] leading-[20px]">
                  {item.detail}
                </Text>
              </ChunkyCard>
            ))}
          </View>

          <ChunkyButton
            label="Got it"
            size="lg"
            fullWidth
            onPress={() => goBackOrReplace(routes.today)}
          />
        </View>
      </ScrollView>
    </Screen>
  );
}

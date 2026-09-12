import { router } from 'expo-router';
import { ArrowRight, Heart, MapPin, Sparkles } from 'lucide-react-native';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { ChunkyIconButton } from '@/components/ChunkyButton';
import { ChunkyCard } from '@/components/ChunkyCard';
import { ChunkyChip } from '@/components/ChunkyChip';
import { MissionCard } from '@/components/MissionCard';
import { ProgressBar } from '@/components/ProgressBar';
import { Screen } from '@/components/Screen';
import { SectionHeading } from '@/components/SectionHeading';
import { momentumFor } from '@/lib/content';
import { COMMUNITY_QUOTES, MISSIONS } from '@/lib/missions';
import { routes } from '@/lib/navigation';
import { confidencePercent, nextMission } from '@/lib/progress';
import { useAppStore } from '@/lib/store';
import { palette } from '@/lib/theme';
import { dayKey, hashString } from '@/lib/utils';

export default function TodayScreen() {
  const name = useAppStore((state) => state.name);
  const level = useAppStore((state) => state.level);
  const statuses = useAppStore((state) => state.statuses);
  const practiceDone = useAppStore((state) => state.practiceDone);
  const studied = useAppStore((state) => state.studied);
  const entries = useAppStore((state) => state.entries);
  const cheered = useAppStore((state) => state.cheered);
  const toggleCheer = useAppStore((state) => state.toggleCheer);

  const confidence = confidencePercent({
    level,
    statuses,
    practiceDone,
    studied,
    journalCount: entries.length,
  });

  const upNext = nextMission(level, statuses);
  const momentum = momentumFor(upNext);

  const quote = COMMUNITY_QUOTES[hashString(dayKey()) % COMMUNITY_QUOTES.length];
  const hasCheered = cheered.includes(quote.id);

  return (
    <Screen>
      <ScrollView contentContainerClassName="gap-5 px-5 pt-2 pb-8">
        <View className="flex-row items-center justify-between gap-3">
          <ChunkyChip
            label="Hamburg · German"
            tone="sky"
            leading={<MapPin color={palette.ink} size={14} strokeWidth={2.5} />}
          />
          <Pressable
            accessibilityRole="button"
            onPress={() => router.push(routes.howItWorks)}
            className="flex-row items-center gap-2 py-1"
          >
            <Text className="text-ink font-strong border-ink border-b-2 text-[14px]">
              How it works
            </Text>
            <Sparkles color={palette.ink} size={18} strokeWidth={2.25} />
          </Pressable>
        </View>

        <View className="gap-2">
          <Text className="text-ink font-display text-[30px] leading-[34px]">
            Hallo, {name || 'friend'}.{'\n'}What feels possible today?
          </Text>
          <Text className="text-muted font-strong text-[15px] leading-[21px]">
            Small real-life practice. Bigger everyday confidence.
          </Text>
        </View>

        <ProgressBar label="Your confidence: trying it outside" value={confidence} />

        <View className="gap-4">
          <SectionHeading
            title="Pick a real-life mission"
            actionLabel={`See all ${MISSIONS.length}`}
            onActionPress={() => router.push(routes.missions)}
          />
          {MISSIONS.map((mission) => (
            <MissionCard
              key={mission.id}
              mission={mission}
              status={statuses[mission.id] ?? 'not_started'}
              onPress={() => router.push(routes.missionPrep(mission.id))}
            />
          ))}
        </View>

        <ChunkyCard tone="paper" className="gap-3 px-4 py-4">
          <Text className="text-ink font-display text-[19px]">Keep your momentum</Text>
          <View className="flex-row items-center gap-3">
            <View className="border-ink bg-lime h-14 w-14 items-center justify-center rounded-2xl border-2">
              <Text className="text-[24px]">{momentum.emoji}</Text>
            </View>
            <View className="flex-1 gap-0.5">
              <Text className="text-ink font-display text-[15.5px] leading-[20px]">
                {momentum.title}
              </Text>
              <Text className="text-muted font-body text-[13px] leading-[18px]">
                {momentum.detail}
              </Text>
            </View>
            <ChunkyIconButton
              accessibilityLabel={`Open prep for ${upNext.title}`}
              tone="royal"
              size={42}
              onPress={() => router.push(routes.missionPrep(upNext.id))}
            >
              <ArrowRight color={palette.cream} size={20} strokeWidth={2.5} />
            </ChunkyIconButton>
          </View>
        </ChunkyCard>

        <ChunkyCard tone="sunny" className="gap-3 px-4 py-4">
          <Text className="text-ink font-display text-[19px]">Your people are trying too</Text>
          <Text className="text-ink font-display text-[26px] leading-[26px]">“</Text>
          <Text className="text-ink font-strong text-[15px] leading-[22px]">{quote.text}</Text>
          <View className="flex-row items-center gap-2.5">
            <View className="border-ink h-8 w-8 items-center justify-center rounded-full border-2 bg-white">
              <Text className="text-ink font-display text-[13px]">{quote.author.charAt(0)}</Text>
            </View>
            <Text className="text-ink font-strong text-[13.5px]">
              {quote.author} · {quote.city}
            </Text>
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ selected: hasCheered }}
            onPress={() => toggleCheer(quote.id)}
            className="border-ink flex-row items-center gap-2 self-start rounded-full border-2 bg-white px-3.5 py-2"
          >
            <Heart
              color={palette.ink}
              fill={hasCheered ? palette.magenta : 'transparent'}
              size={16}
              strokeWidth={2.5}
            />
            <Text className="text-ink font-strong text-[13px]">
              {quote.cheers + (hasCheered ? 1 : 0)} people cheered this on
            </Text>
          </Pressable>
        </ChunkyCard>
      </ScrollView>
    </Screen>
  );
}

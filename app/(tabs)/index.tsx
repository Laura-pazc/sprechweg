import { router } from 'expo-router';
import {
  CalendarDays,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Heart,
  MapPin,
  Sparkles,
} from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Linking, Pressable, ScrollView, Text, View } from 'react-native';

import { ChunkyButton } from '@/components/ChunkyButton';
import { ChunkyCard } from '@/components/ChunkyCard';
import { ChunkyChip } from '@/components/ChunkyChip';
import { MissionCard } from '@/components/MissionCard';
import { ProgressBar } from '@/components/ProgressBar';
import { Screen } from '@/components/Screen';
import { SectionHeading } from '@/components/SectionHeading';
import { COMMUNITY_QUOTES } from '@/lib/content/communityQuotes';
import { routes } from '@/lib/navigation';
import { confidencePercent, nextMission } from '@/lib/progress';
import { useAppStore } from '@/lib/store';
import { palette } from '@/lib/theme';
import { dayKey, hashString } from '@/lib/utils';

const HAMBURG_EVENTS_URL = 'https://www.hamburg-travel.com/see-explore/events/events-calendar/';

export default function TodayScreen() {
  const { t } = useTranslation();
  const [showMore, setShowMore] = useState(false);
  const missions = useAppStore((state) => state.missions);
  const name = useAppStore((state) => state.name);
  const level = useAppStore((state) => state.level);
  const statuses = useAppStore((state) => state.statuses);
  const practiceDone = useAppStore((state) => state.practiceDone);
  const studied = useAppStore((state) => state.studied);
  const entries = useAppStore((state) => state.entries);
  const cheered = useAppStore((state) => state.cheered);
  const toggleCheer = useAppStore((state) => state.toggleCheer);

  const confidence = confidencePercent({
    missions,
    level,
    statuses,
    practiceDone,
    studied,
    journalCount: entries.length,
  });
  const upNext = nextMission(missions, level, statuses);
  const otherMissions = missions.filter((mission) => mission.id !== upNext.id);
  const completedCount = Object.values(statuses).filter((status) => status === 'done').length;
  const quote = COMMUNITY_QUOTES[hashString(dayKey()) % COMMUNITY_QUOTES.length];
  const hasCheered = cheered.includes(quote.id);

  return (
    <Screen>
      <ScrollView contentContainerClassName="gap-5 px-5 pt-2 pb-8">
        <View className="flex-row items-center justify-between gap-3">
          <ChunkyChip
            label="Hamburg"
            tone="sky"
            leading={<MapPin color={palette.ink} size={14} strokeWidth={2.5} />}
            className="px-2.5"
          />
          <Pressable
            accessibilityRole="button"
            onPress={() => router.push(routes.howItWorks)}
            className="flex-row items-center gap-2 py-1"
          >
            <Text className="text-ink font-strong border-ink border-b-2 text-[13px]">
              {t('today.howItWorks')}
            </Text>
            <Sparkles color={palette.ink} size={17} strokeWidth={2.25} />
          </Pressable>
        </View>

        <View className="gap-1.5">
          <Text className="text-ink font-display text-[24px] leading-[29px]">
            {t('today.greeting', { name: name || t('today.friend') })}
          </Text>
          <Text className="text-muted font-strong text-[14px] leading-[20px]">
            {t('today.intro')}
          </Text>
        </View>

        <View className="gap-3">
          <View className="flex-row items-end justify-between gap-3">
            <View className="gap-0.5">
              <Text className="text-muted font-display text-[10px] tracking-widest">
                {t('today.upNext')}
              </Text>
              <Text className="text-ink font-display text-[19px]">{t('today.quickWin')}</Text>
            </View>
            <Text className="text-muted font-strong text-[12px]">
              {t('today.completed', { count: completedCount })}
            </Text>
          </View>
          <MissionCard
            featured
            mission={upNext}
            status={statuses[upNext.id] ?? 'not_started'}
            onPress={() => router.push(routes.missionPrep(upNext.id))}
          />
          <ChunkyButton
            label={t('today.practice')}
            fullWidth
            onPress={() => router.push(routes.missionPrep(upNext.id))}
          />
        </View>

        <View className="gap-3">
          <SectionHeading title={t('today.happening')} />
          <ChunkyCard tone="paper" offset={3} className="gap-3 px-4 py-4">
            <View className="flex-row items-start gap-3">
              <View className="bg-sky h-10 w-10 items-center justify-center rounded-full">
                <CalendarDays color={palette.ink} size={20} strokeWidth={2.4} />
              </View>
              <View className="flex-1 gap-1">
                <Text className="text-ink font-display text-[16px]">{t('today.findEvent')}</Text>
                <Text className="text-muted font-body text-[13px] leading-[18px]">
                  {t('today.eventBody')}
                </Text>
              </View>
            </View>
            <ChunkyButton
              label={t('today.openEvents')}
              variant="paper"
              size="sm"
              trailing={<ExternalLink color={palette.ink} size={15} strokeWidth={2.5} />}
              onPress={() => void Linking.openURL(HAMBURG_EVENTS_URL)}
            />
          </ChunkyCard>
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityState={{ expanded: showMore }}
          onPress={() => setShowMore((value) => !value)}
          className="flex-row items-center justify-center gap-2 py-2"
        >
          <Text className="text-ink font-display text-[14px]">
            {showMore ? t('today.showLess') : t('today.seeMore')}
          </Text>
          {showMore ? (
            <ChevronUp color={palette.ink} size={18} strokeWidth={2.7} />
          ) : (
            <ChevronDown color={palette.ink} size={18} strokeWidth={2.7} />
          )}
        </Pressable>

        {showMore ? (
          <View className="gap-5">
            <ProgressBar label={t('today.confidence')} value={confidence} />

            <View className="gap-3">
              <SectionHeading
                title={t('today.moreMissions')}
                actionLabel={t('common.seeAll')}
                onActionPress={() => router.push(routes.missions)}
              />
              {otherMissions.slice(0, 3).map((mission) => (
                <MissionCard
                  key={mission.id}
                  mission={mission}
                  status={statuses[mission.id] ?? 'not_started'}
                  onPress={() => router.push(routes.missionPrep(mission.id))}
                />
              ))}
            </View>

            <ChunkyCard tone="sunny" offset={3} className="gap-3 px-4 py-4">
              <Text className="text-ink font-display text-[17px]">{t('today.community')}</Text>
              <Text className="text-ink font-strong text-[14px] leading-[20px]">
                “{quote.text}”
              </Text>
              <View className="flex-row items-center justify-between gap-3">
                <Text className="text-ink font-strong text-[12.5px]">
                  {quote.author} · {quote.city}
                </Text>
                <Pressable
                  accessibilityRole="button"
                  accessibilityState={{ selected: hasCheered }}
                  accessibilityLabel={t('today.cheer')}
                  onPress={() => toggleCheer(quote.id)}
                  className="border-ink flex-row items-center gap-1.5 rounded-full border-2 bg-white px-3 py-2"
                >
                  <Heart
                    color={palette.ink}
                    fill={hasCheered ? palette.magenta : 'transparent'}
                    size={15}
                    strokeWidth={2.5}
                  />
                  <Text className="text-ink font-strong text-[12px]">
                    {quote.cheers + (hasCheered ? 1 : 0)}
                  </Text>
                </Pressable>
              </View>
            </ChunkyCard>
          </View>
        ) : null}
      </ScrollView>
    </Screen>
  );
}

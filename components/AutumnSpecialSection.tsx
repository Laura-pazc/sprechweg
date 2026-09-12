import { ArrowLeft, ArrowRight, Check, Clock3 } from 'lucide-react-native';
import { useRef, useState } from 'react';
import {
  FlatList,
  Pressable,
  Text,
  useWindowDimensions,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';
import { useTranslation } from 'react-i18next';

import { ChunkyButtonFace, ChunkyIconButton } from '@/components/ChunkyButton';
import { ChunkyPressableCard } from '@/components/ChunkyCard';
import { LinearGradient } from '@/components/ui/primitives/LinearGradient';
import { palette } from '@/lib/theme';
import type { Mission, MissionStatus } from '@/lib/types';
import { cn } from '@/lib/utils';

const CARD_GAP = 12;
const MAX_CARD_WIDTH = 720;

interface AutumnSpecialSectionProps {
  missions: Mission[];
  statuses: Record<string, MissionStatus>;
  onMissionPress: (mission: Mission) => void;
}

function actionKey(status: MissionStatus) {
  if (status === 'done') return 'missions.autumn.review';
  if (status === 'in_progress') return 'missions.autumn.continue';
  return 'missions.autumn.start';
}

export function AutumnSpecialSection({
  missions,
  statuses,
  onMissionPress,
}: AutumnSpecialSectionProps) {
  const { t } = useTranslation();
  const { width: viewportWidth } = useWindowDimensions();
  const listRef = useRef<FlatList<Mission>>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const cardWidth = Math.min(Math.max(viewportWidth - 40, 280), MAX_CARD_WIDTH);
  const snapInterval = cardWidth + CARD_GAP;

  const goTo = (nextIndex: number) => {
    const wrappedIndex = (nextIndex + missions.length) % missions.length;
    setActiveIndex(wrappedIndex);
    listRef.current?.scrollToOffset({ offset: wrappedIndex * snapInterval, animated: true });
  };

  const handleMomentumEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const nextIndex = Math.max(
      0,
      Math.min(missions.length - 1, Math.round(event.nativeEvent.contentOffset.x / snapInterval)),
    );
    setActiveIndex(nextIndex);
  };

  return (
    <View
      accessibilityRole="summary"
      accessibilityLabel={t('missions.autumn.accessibilityLabel')}
      className="border-autumn bg-autumn-soft overflow-hidden rounded-[22px] border-2"
    >
      <LinearGradient
        colors={[palette.autumnSoft, palette.autumnGlow]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="gap-4 px-4 py-4"
      >
        <View className="flex-row items-start gap-3">
          <View className="bg-autumn-gold border-autumn h-12 w-12 items-center justify-center rounded-full border-2">
            <Text accessibilityLabel={t('missions.autumn.leafIcon')} className="text-[25px]">
              🍂
            </Text>
          </View>
          <View className="flex-1 gap-0.5 pt-0.5">
            <Text className="text-autumn-dark font-display text-[19px] leading-[23px]">
              {t('missions.autumn.title')}
            </Text>
            <Text className="text-autumn font-strong text-[13px] leading-[18px]">
              {t('missions.autumn.subtitle')}
            </Text>
          </View>
          <View className="border-autumn rounded-full border bg-white/70 px-2.5 py-1.5">
            <Text className="text-autumn-dark font-display text-[10px] tracking-wider">
              {t('missions.autumn.season')}
            </Text>
          </View>
        </View>

        <FlatList
          ref={listRef}
          horizontal
          data={missions}
          keyExtractor={(mission) => mission.id}
          showsHorizontalScrollIndicator={false}
          snapToInterval={snapInterval}
          snapToAlignment="start"
          decelerationRate="fast"
          disableIntervalMomentum
          onMomentumScrollEnd={handleMomentumEnd}
          ItemSeparatorComponent={() => <View style={{ width: CARD_GAP }} />}
          renderItem={({ item: mission, index }) => {
            const status = statuses[mission.id] ?? 'not_started';
            const isDone = status === 'done';

            return (
              <View style={{ width: cardWidth }}>
                <ChunkyPressableCard
                  tone="paper"
                  offset={5}
                  radius={18}
                  onPress={() => onMissionPress(mission)}
                  accessibilityLabel={t('missions.autumn.cardAccessibility', {
                    title: mission.title,
                    minutes: mission.minutes,
                    position: index + 1,
                    count: missions.length,
                  })}
                  className="min-h-[255px] gap-3 px-4 py-4"
                >
                  <View className="flex-row items-start justify-between gap-3">
                    <View
                      className={cn(
                        'border-ink h-12 w-12 items-center justify-center rounded-[14px] border-2',
                        mission.accent === 'magenta'
                          ? 'bg-magenta'
                          : mission.accent === 'coral'
                            ? 'bg-coral'
                            : 'bg-sky',
                      )}
                    >
                      <Text className="text-[26px]">{mission.badge.emoji}</Text>
                    </View>
                    <View className="flex-row flex-wrap justify-end gap-2">
                      <View className="border-autumn bg-autumn-gold rounded-full border px-2.5 py-1.5">
                        <Text className="text-autumn-dark font-display text-[11px]">C1</Text>
                      </View>
                      {status !== 'not_started' ? (
                        <View
                          className={cn(
                            'border-ink flex-row items-center gap-1 rounded-full border px-2.5 py-1.5',
                            isDone ? 'bg-lime' : 'bg-sunny',
                          )}
                        >
                          {isDone ? <Check color={palette.ink} size={12} strokeWidth={3} /> : null}
                          <Text className="text-ink font-display text-[10.5px]">
                            {isDone ? t('missions.autumn.completed') : t('common.inProgress')}
                          </Text>
                        </View>
                      ) : null}
                    </View>
                  </View>

                  <View className="gap-1.5">
                    <Text className="text-ink font-display text-[18px] leading-[22px]">
                      {mission.title}
                    </Text>
                    <Text
                      className="text-muted font-body text-[14px] leading-[20px]"
                      numberOfLines={2}
                    >
                      {mission.tagline}
                    </Text>
                  </View>

                  <View
                    className={cn(
                      'h-1.5 rounded-full',
                      mission.accent === 'magenta'
                        ? 'bg-magenta'
                        : mission.accent === 'coral'
                          ? 'bg-coral'
                          : 'bg-sky',
                    )}
                  />

                  <View className="mt-auto flex-row items-end justify-between gap-3">
                    <View className="flex-row items-center gap-1.5 pb-1">
                      <Clock3 color={palette.muted} size={15} strokeWidth={2.4} />
                      <Text className="text-muted font-strong text-[13px]">
                        {t('missions.autumn.minutes', { count: mission.minutes })}
                      </Text>
                    </View>
                    <ChunkyButtonFace
                      label={t(actionKey(status))}
                      variant={isDone ? 'lime' : 'ink'}
                      size="sm"
                      trailing={
                        <ArrowRight color={isDone ? palette.ink : palette.cream} size={15} />
                      }
                    />
                  </View>
                </ChunkyPressableCard>
              </View>
            );
          }}
        />

        <View className="flex-row items-center justify-center gap-3">
          <ChunkyIconButton
            size={44}
            tone="paper"
            accessibilityLabel={t('missions.autumn.previous')}
            onPress={() => goTo(activeIndex - 1)}
          >
            <ArrowLeft color={palette.ink} size={18} strokeWidth={2.7} />
          </ChunkyIconButton>

          <View className="flex-row items-center">
            {missions.map((mission, index) => {
              const selected = index === activeIndex;
              return (
                <Pressable
                  key={mission.id}
                  accessibilityRole="button"
                  accessibilityState={{ selected }}
                  accessibilityLabel={t('missions.autumn.dotAccessibility', {
                    position: index + 1,
                    count: missions.length,
                  })}
                  onPress={() => goTo(index)}
                  className="h-11 w-11 items-center justify-center"
                >
                  <View
                    className={cn(
                      'border-autumn h-2.5 rounded-full border-2',
                      selected ? 'bg-autumn w-6' : 'w-2.5 bg-white/60',
                    )}
                  />
                </Pressable>
              );
            })}
          </View>

          <ChunkyIconButton
            size={44}
            tone="paper"
            accessibilityLabel={t('missions.autumn.next')}
            onPress={() => goTo(activeIndex + 1)}
          >
            <ArrowRight color={palette.ink} size={18} strokeWidth={2.7} />
          </ChunkyIconButton>
        </View>

        <Text className="text-autumn-dark font-strong text-center text-[12px]">
          {t('missions.autumn.swipeHint')}
        </Text>
      </LinearGradient>
    </View>
  );
}

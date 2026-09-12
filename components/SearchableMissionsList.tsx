import { ChevronDown, SlidersHorizontal, Search, X } from 'lucide-react-native';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { FlatList, Pressable, ScrollView, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { BottomSheet } from 'heroui-native';

import { ChunkyButton } from '@/components/ChunkyButton';
import { ChunkyCard } from '@/components/ChunkyCard';
import { ChunkyInput } from '@/components/ChunkyInput';
import { MissionCard } from '@/components/MissionCard';
import {
  useMissionSearch,
  type MissionMatchField,
  type MissionSearchResult,
} from '@/lib/missionSearch';
import { palette } from '@/lib/theme';
import type { Level, Mission, MissionStatus } from '@/lib/types';
import { cn } from '@/lib/utils';

const LEVELS: Array<Level | null> = [null, 'beginner', 'intermediate', 'advanced'];

interface FilterChoiceProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

function FilterChoice({ label, selected, onPress }: FilterChoiceProps) {
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      onPress={onPress}
      className={cn(
        'border-ink min-h-11 flex-1 items-center justify-center rounded-[12px] border-2 px-2 py-2.5',
        selected ? 'bg-royal' : 'bg-white',
      )}
    >
      <Text
        numberOfLines={1}
        className={cn('font-strong text-[12px]', selected ? 'text-cream' : 'text-ink')}
      >
        {label}
      </Text>
    </Pressable>
  );
}

function MatchIndicators({ fields }: { fields: MissionMatchField[] }) {
  const { t } = useTranslation();
  if (fields.length === 0) return null;

  return (
    <View className="flex-row flex-wrap gap-1.5">
      {fields.slice(0, 2).map((field) => (
        <View key={field} className="border-ink bg-sky rounded-full border px-2.5 py-1">
          <Text className="text-ink font-strong text-[10.5px]">{t(`missions.match.${field}`)}</Text>
        </View>
      ))}
    </View>
  );
}

interface FiltersSheetProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  categories: string[];
  selectedLevel: Level | null;
  selectedCategory: string | null;
  onApply: (level: Level | null, category: string | null) => void;
  onClear: () => void;
}

function FiltersSheet({
  isOpen,
  onOpenChange,
  categories,
  selectedLevel,
  selectedCategory,
  onApply,
  onClear,
}: FiltersSheetProps) {
  const { t } = useTranslation();
  const [draftLevel, setDraftLevel] = useState<Level | null>(selectedLevel);
  const [draftCategory, setDraftCategory] = useState<string | null>(selectedCategory);
  const [categoryExpanded, setCategoryExpanded] = useState(false);

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      setDraftLevel(selectedLevel);
      setDraftCategory(selectedCategory);
    } else {
      setCategoryExpanded(false);
    }
    onOpenChange(nextOpen);
  };

  return (
    <BottomSheet isOpen={isOpen} onOpenChange={handleOpenChange}>
      <BottomSheet.Portal>
        <BottomSheet.Overlay isCloseOnPress />
        <BottomSheet.Content contentContainerClassName="bg-cream px-5 pb-safe-or-6 pt-2">
          <View className="mb-6 gap-1.5">
            <BottomSheet.Title className="text-ink font-display text-[22px]">
              {t('missions.filters')}
            </BottomSheet.Title>
            <BottomSheet.Description className="text-muted font-body text-[14px]">
              {t('missions.filtersDescription')}
            </BottomSheet.Description>
          </View>

          <View className="gap-6">
            <View className="gap-2.5">
              <Text className="text-muted font-display text-[11px] tracking-widest">
                {t('missions.levelFilter')}
              </Text>
              <View accessibilityRole="radiogroup" className="flex-row gap-2">
                {LEVELS.map((level) => (
                  <FilterChoice
                    key={level ?? 'all'}
                    label={
                      level === null ? t('missions.allLevelsShort') : t(`missions.levels.${level}`)
                    }
                    selected={draftLevel === level}
                    onPress={() => setDraftLevel(level)}
                  />
                ))}
              </View>
            </View>

            <View className="gap-2.5">
              <Text className="text-muted font-display text-[11px] tracking-widest">
                {t('missions.categoryFilter')}
              </Text>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={t('missions.selectCategory')}
                accessibilityState={{ expanded: categoryExpanded }}
                onPress={() => setCategoryExpanded((expanded) => !expanded)}
                className="border-ink min-h-12 flex-row items-center justify-between rounded-[14px] border-2 bg-white px-4"
              >
                <Text className="text-ink font-strong flex-1 text-[14px]" numberOfLines={1}>
                  {draftCategory ?? t('missions.allCategories')}
                </Text>
                <ChevronDown
                  color={palette.ink}
                  size={19}
                  strokeWidth={2.5}
                  style={{ transform: [{ rotate: categoryExpanded ? '180deg' : '0deg' }] }}
                />
              </Pressable>

              {categoryExpanded ? (
                <View className="border-ink overflow-hidden rounded-[14px] border-2 bg-white">
                  <ScrollView
                    style={{ maxHeight: 220 }}
                    nestedScrollEnabled
                    keyboardShouldPersistTaps="handled"
                  >
                    {[null, ...categories].map((category) => {
                      const selected = draftCategory === category;
                      const label = category ?? t('missions.allCategories');

                      return (
                        <Pressable
                          key={category ?? 'all-categories'}
                          accessibilityRole="radio"
                          accessibilityState={{ selected }}
                          onPress={() => {
                            setDraftCategory(category);
                            setCategoryExpanded(false);
                          }}
                          className={cn(
                            'border-canvas min-h-11 justify-center border-b px-4 py-3',
                            selected ? 'bg-sky' : 'bg-white',
                          )}
                        >
                          <Text className="text-ink font-strong text-[13px]">{label}</Text>
                        </Pressable>
                      );
                    })}
                  </ScrollView>
                </View>
              ) : null}
            </View>

            <View className="flex-row gap-3 pt-1">
              <ChunkyButton
                label={t('missions.clear')}
                variant="paper"
                fullWidth
                className="flex-1"
                onPress={() => {
                  setDraftLevel(null);
                  setDraftCategory(null);
                  setCategoryExpanded(false);
                  onClear();
                  onOpenChange(false);
                }}
              />
              <ChunkyButton
                label={t('missions.apply')}
                fullWidth
                className="flex-1"
                onPress={() => {
                  setCategoryExpanded(false);
                  onApply(draftLevel, draftCategory);
                  onOpenChange(false);
                }}
              />
            </View>
          </View>
        </BottomSheet.Content>
      </BottomSheet.Portal>
    </BottomSheet>
  );
}

export interface SearchableMissionsListProps {
  missions: Mission[];
  statuses: Record<string, MissionStatus>;
  userLevel: Level | null;
  onMissionPress: (mission: Mission) => void;
  specialSection?: ReactNode;
  specialMissionIds?: string[];
  footer?: ReactNode;
}

type MissionListRow =
  | { kind: 'controls' }
  | { kind: 'special'; content: ReactNode }
  | { kind: 'heading' }
  | { kind: 'mission'; result: MissionSearchResult }
  | { kind: 'empty' };

export function SearchableMissionsList({
  missions,
  statuses,
  userLevel,
  onMissionPress,
  specialSection,
  specialMissionIds = [],
  footer,
}: SearchableMissionsListProps) {
  const { t } = useTranslation();
  const search = useMissionSearch(missions, userLevel);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const activeFilterCount =
    Number(search.filters.level !== null) + Number(search.filters.category !== null);
  const searchIsActive = search.query.trim().length > 0 || activeFilterCount > 0;
  const specialIds = new Set(specialMissionIds);
  const regularResults = searchIsActive
    ? search.results
    : search.results.filter(({ mission }) => !specialIds.has(mission.id));

  const rows: MissionListRow[] = [{ kind: 'controls' }];
  if (!searchIsActive && specialSection) {
    rows.push({ kind: 'special', content: specialSection }, { kind: 'heading' });
  }
  if (regularResults.length > 0) {
    rows.push(...regularResults.map((result): MissionListRow => ({ kind: 'mission', result })));
  } else {
    rows.push({ kind: 'empty' });
  }

  const renderItem = ({ item }: { item: MissionListRow }) => {
    if (item.kind === 'controls') {
      return (
        <View className="bg-cream flex-row gap-2 pt-1 pb-3">
          <View className="relative flex-1 justify-center">
            <Search
              pointerEvents="none"
              color={palette.muted}
              size={18}
              strokeWidth={2.5}
              style={{ position: 'absolute', left: 15, zIndex: 1 }}
            />
            <ChunkyInput
              value={search.query}
              onChangeText={search.setQuery}
              placeholder={t('missions.searchPlaceholder')}
              accessibilityLabel={t('missions.searchLabel')}
              returnKeyType="search"
              autoCapitalize="none"
              autoCorrect={false}
              className="pr-11 pl-11"
            />
            {search.query.length > 0 ? (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={t('missions.clearSearch')}
                onPress={search.clearSearch}
                hitSlop={10}
                className="absolute right-2 h-8 w-8 items-center justify-center rounded-full"
              >
                <X color={palette.ink} size={18} strokeWidth={2.6} />
              </Pressable>
            ) : null}
          </View>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel={t('missions.openFilters')}
            accessibilityState={{ expanded: filtersOpen }}
            onPress={() => setFiltersOpen(true)}
            className={cn(
              'border-ink min-h-12 flex-row items-center gap-1.5 rounded-[14px] border-2 px-3',
              activeFilterCount > 0 ? 'bg-lime' : 'bg-white',
            )}
          >
            <SlidersHorizontal color={palette.ink} size={17} strokeWidth={2.5} />
            <Text className="text-ink font-strong text-[13px]">
              {activeFilterCount > 0
                ? t('missions.filtersCount', { count: activeFilterCount })
                : t('missions.filters')}
            </Text>
          </Pressable>
        </View>
      );
    }

    if (item.kind === 'special') return <View className="pb-1">{item.content}</View>;

    if (item.kind === 'heading') {
      return (
        <View className="border-autumn/50 mt-1 border-t-2 pt-4">
          <Text className="text-ink font-display text-[18px]">{t('missions.allMissions')}</Text>
        </View>
      );
    }

    if (item.kind === 'empty') {
      return (
        <ChunkyCard tone="canvas" offset={4} className="px-4 py-5">
          <Text className="text-ink font-body text-[14px] leading-[20px]">
            {t('missions.noResultsCompact')}
          </Text>
        </ChunkyCard>
      );
    }

    return (
      <View className="gap-2">
        <MatchIndicators fields={item.result.matchedFields} />
        <MissionCard
          mission={item.result.mission}
          status={statuses[item.result.mission.id] ?? 'not_started'}
          onPress={() => onMissionPress(item.result.mission)}
        />
      </View>
    );
  };

  return (
    <>
      <FlatList
        data={rows}
        keyExtractor={(item, index) =>
          item.kind === 'mission' ? `mission-${item.result.mission.id}` : `${item.kind}-${index}`
        }
        renderItem={renderItem}
        stickyHeaderIndices={[0]}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerClassName="gap-4 px-5 pb-8"
        ListFooterComponent={footer ? <View className="pt-1">{footer}</View> : null}
      />

      <FiltersSheet
        isOpen={filtersOpen}
        onOpenChange={setFiltersOpen}
        categories={search.categories}
        selectedLevel={search.filters.level}
        selectedCategory={search.filters.category}
        onApply={(level, category) => {
          search.setLevel(level);
          search.setCategory(category);
        }}
        onClear={search.clearFilters}
      />
    </>
  );
}

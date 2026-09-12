import { SlidersHorizontal, Search, X } from 'lucide-react-native';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { BottomSheet, Select } from 'heroui-native';

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
const ALL_CATEGORIES = '__all__';

type SelectOption = { value: string; label: string };

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

  const categoryValue: SelectOption = {
    value: draftCategory ?? ALL_CATEGORIES,
    label: draftCategory ?? t('missions.allCategories'),
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      setDraftLevel(selectedLevel);
      setDraftCategory(selectedCategory);
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
              <Select
                value={categoryValue}
                onValueChange={(option) =>
                  setDraftCategory(
                    option?.value === ALL_CATEGORIES ? null : (option?.value ?? null),
                  )
                }
              >
                <Select.Trigger className="border-ink min-h-12 rounded-[14px] border-2 bg-white px-4">
                  <Select.Value placeholder={t('missions.selectCategory')} />
                  <Select.TriggerIndicator />
                </Select.Trigger>
                <Select.Portal>
                  <Select.Overlay />
                  <Select.Content presentation="popover" width="trigger">
                    <Select.Item value={ALL_CATEGORIES} label={t('missions.allCategories')} />
                    {categories.map((category) => (
                      <Select.Item key={category} value={category} label={category} />
                    ))}
                  </Select.Content>
                </Select.Portal>
              </Select>
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
                  onClear();
                  onOpenChange(false);
                }}
              />
              <ChunkyButton
                label={t('missions.apply')}
                fullWidth
                className="flex-1"
                onPress={() => {
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
  footer?: ReactNode;
}

export function SearchableMissionsList({
  missions,
  statuses,
  userLevel,
  onMissionPress,
  footer,
}: SearchableMissionsListProps) {
  const { t } = useTranslation();
  const search = useMissionSearch(missions, userLevel);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const activeFilterCount =
    Number(search.filters.level !== null) + Number(search.filters.category !== null);

  const renderItem = ({ item }: { item: MissionSearchResult }) => (
    <View className="gap-2">
      <MatchIndicators fields={item.matchedFields} />
      <MissionCard
        mission={item.mission}
        status={statuses[item.mission.id] ?? 'not_started'}
        onPress={() => onMissionPress(item.mission)}
      />
    </View>
  );

  return (
    <>
      <FlatList
        data={search.results}
        keyExtractor={({ mission }) => mission.id}
        renderItem={renderItem}
        stickyHeaderIndices={[0]}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerClassName="gap-4 px-5 pb-8"
        ListHeaderComponent={
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
        }
        ListEmptyComponent={
          <ChunkyCard tone="canvas" offset={4} className="px-4 py-5">
            <Text className="text-ink font-body text-[14px] leading-[20px]">
              {t('missions.noResultsCompact')}
            </Text>
          </ChunkyCard>
        }
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

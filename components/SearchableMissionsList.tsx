import { Search, X } from 'lucide-react-native';
import type { ReactNode } from 'react';
import { FlatList, Pressable, ScrollView, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

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

const LEVELS: Level[] = ['beginner', 'intermediate', 'advanced'];

interface FilterButtonProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

function FilterButton({ label, selected, onPress }: FilterButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      className={cn(
        'border-ink rounded-full border-2 px-3 py-1.5',
        selected ? 'bg-royal' : 'bg-white',
      )}
    >
      <Text className={cn('font-strong text-[12px]', selected ? 'text-cream' : 'text-ink')}>
        {label}
      </Text>
    </Pressable>
  );
}

function SearchControls({
  query,
  onChangeQuery,
  onClearQuery,
  selectedLevel,
  onSelectLevel,
  selectedCategory,
  onSelectCategory,
  categories,
  hasActiveFilters,
  onClearFilters,
}: {
  query: string;
  onChangeQuery: (value: string) => void;
  onClearQuery: () => void;
  selectedLevel: Level | null;
  onSelectLevel: (level: Level | null) => void;
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
  categories: string[];
  hasActiveFilters: boolean;
  onClearFilters: () => void;
}) {
  const { t } = useTranslation();

  return (
    <View className="bg-cream gap-3 pt-1 pb-3">
      <View className="relative justify-center">
        <Search
          pointerEvents="none"
          color={palette.muted}
          size={18}
          strokeWidth={2.5}
          style={{ position: 'absolute', left: 15, zIndex: 1 }}
        />
        <ChunkyInput
          value={query}
          onChangeText={onChangeQuery}
          placeholder={t('missions.searchPlaceholder')}
          accessibilityLabel={t('missions.searchLabel')}
          returnKeyType="search"
          autoCapitalize="none"
          autoCorrect={false}
          className="pr-12 pl-11"
        />
        {query.length > 0 ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={t('missions.clearSearch')}
            onPress={onClearQuery}
            hitSlop={10}
            className="absolute right-3 h-8 w-8 items-center justify-center rounded-full"
          >
            <X color={palette.ink} size={19} strokeWidth={2.6} />
          </Pressable>
        ) : null}
      </View>

      <View className="gap-2">
        <View className="flex-row items-center justify-between">
          <Text className="text-muted font-display text-[11px] tracking-widest">
            {t('missions.levelFilter')}
          </Text>
          {hasActiveFilters ? (
            <Pressable accessibilityRole="button" onPress={onClearFilters} hitSlop={8}>
              <Text className="text-royal font-strong text-[12px]">
                {t('missions.clearFilters')}
              </Text>
            </Pressable>
          ) : null}
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="gap-2 pr-5"
        >
          <FilterButton
            label={t('missions.allLevels')}
            selected={selectedLevel === null}
            onPress={() => onSelectLevel(null)}
          />
          {LEVELS.map((level) => (
            <FilterButton
              key={level}
              label={t(`missions.levels.${level}`)}
              selected={selectedLevel === level}
              onPress={() => onSelectLevel(selectedLevel === level ? null : level)}
            />
          ))}
        </ScrollView>
      </View>

      <View className="gap-2">
        <Text className="text-muted font-display text-[11px] tracking-widest">
          {t('missions.categoryFilter')}
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="gap-2 pr-5"
        >
          <FilterButton
            label={t('missions.allCategories')}
            selected={selectedCategory === null}
            onPress={() => onSelectCategory(null)}
          />
          {categories.map((category) => (
            <FilterButton
              key={category}
              label={category}
              selected={selectedCategory === category}
              onPress={() => onSelectCategory(selectedCategory === category ? null : category)}
            />
          ))}
        </ScrollView>
      </View>
    </View>
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
    <FlatList
      data={search.results}
      keyExtractor={({ mission }) => mission.id}
      renderItem={renderItem}
      stickyHeaderIndices={[0]}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
      contentContainerClassName="gap-4 px-5 pb-8"
      ListHeaderComponent={
        <SearchControls
          query={search.query}
          onChangeQuery={search.setQuery}
          onClearQuery={search.clearSearch}
          selectedLevel={search.filters.level}
          onSelectLevel={search.setLevel}
          selectedCategory={search.filters.category}
          onSelectCategory={search.setCategory}
          categories={search.categories}
          hasActiveFilters={search.hasActiveFilters}
          onClearFilters={search.clearFilters}
        />
      }
      ListEmptyComponent={
        <ChunkyCard tone="canvas" offset={4} className="gap-1.5 px-4 py-5">
          <Text className="text-ink font-display text-[17px]">{t('missions.noResults')}</Text>
          <Text className="text-muted font-body text-[14px] leading-[20px]">
            {t('missions.noResultsBody')}
          </Text>
        </ChunkyCard>
      }
      ListFooterComponent={footer ? <View className="pt-1">{footer}</View> : null}
    />
  );
}

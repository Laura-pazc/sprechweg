import { Bot, ChevronDown, ChevronUp, Mic, Send } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';

import { ChunkyCard } from '@/components/ChunkyCard';
import { ChunkyChip } from '@/components/ChunkyChip';
import { palette } from '@/lib/theme';

interface ConversationAiPreviewProps {
  hasViewed: boolean;
  onViewed: () => void;
}

export function ConversationAiPreview({ hasViewed, onViewed }: ConversationAiPreviewProps) {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(!hasViewed);

  useEffect(() => {
    if (!hasViewed) onViewed();
  }, [hasViewed, onViewed]);

  return (
    <ChunkyCard tone="sky" offset={4} radius={18} className="p-3.5">
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={
          expanded ? t('conversation.ai.hidePreview') : t('conversation.ai.showPreview')
        }
        accessibilityState={{ expanded }}
        className="flex-row items-center gap-3"
        onPress={() => setExpanded((value) => !value)}
      >
        <View className="border-ink h-10 w-10 items-center justify-center rounded-full border-2 bg-white">
          <Bot color={palette.ink} size={21} strokeWidth={2.4} />
        </View>
        <View className="min-w-0 flex-1">
          <View className="flex-row flex-wrap items-center gap-2">
            <Text className="text-ink font-display text-[16px] leading-5">
              {t('conversation.ai.title')}
            </Text>
            <ChunkyChip
              label={t('conversation.ai.comingSoon')}
              tone="sunny"
              meta
              className="px-2 py-0.5"
            />
          </View>
          <Text className="text-ink/75 font-body mt-0.5 text-[12px] leading-4">
            {t('conversation.ai.summary')}
          </Text>
        </View>
        {expanded ? (
          <ChevronUp color={palette.ink} size={19} strokeWidth={2.6} />
        ) : (
          <ChevronDown color={palette.ink} size={19} strokeWidth={2.6} />
        )}
      </Pressable>

      {expanded ? (
        <View className="mt-3 gap-2.5">
          <View className="border-ink self-start rounded-2xl rounded-tl-sm border-2 bg-white px-3 py-2">
            <Text className="text-muted font-display text-[9px] tracking-widest">
              {t('conversation.ai.botLabel')}
            </Text>
            <Text className="text-ink font-strong mt-0.5 text-[13px] leading-[18px]">
              {t('conversation.ai.botMessage')}
            </Text>
          </View>

          <View className="border-ink flex-row items-center gap-2 rounded-2xl border-2 bg-white/70 px-3 py-2.5 opacity-70">
            <Text className="text-muted font-body min-w-0 flex-1 text-[12px]">
              {t('conversation.ai.placeholder')}
            </Text>
            <Mic color={palette.muted} size={17} strokeWidth={2.3} />
            <Send color={palette.muted} size={17} strokeWidth={2.3} />
          </View>

          <Text className="text-ink/70 font-strong text-[11px] leading-4">
            {t('conversation.ai.previewOnly')}
          </Text>
        </View>
      ) : null}
    </ChunkyCard>
  );
}

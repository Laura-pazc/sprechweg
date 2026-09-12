import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';

import { ChunkyButton } from '@/components/ChunkyButton';
import { ChunkyCard } from '@/components/ChunkyCard';
import { ChunkyInput } from '@/components/ChunkyInput';
import { Screen } from '@/components/Screen';
import { ScreenHeader } from '@/components/ScreenHeader';
import { LEVEL_CHAT_STEPS, levelFromScore, type ChatChoice, type ChatStep } from '@/lib/levelChat';
import { routes } from '@/lib/navigation';
import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/utils';

interface ChatMessage {
  id: string;
  from: 'sidekick' | 'you';
  text: string;
}

function fillName(question: string, name: string): string {
  return question.replace('{name}', name.length > 0 ? name : 'friend');
}

function Bubble({ message }: { message: ChatMessage }) {
  const mine = message.from === 'you';

  return (
    <View className={cn('w-full', mine ? 'items-end' : 'items-start')}>
      <ChunkyCard
        tone={mine ? 'lime' : 'paper'}
        offset={4}
        radius={18}
        style={{ maxWidth: '88%' }}
        className="px-3.5 py-3"
      >
        <Text
          className={cn('text-ink text-[15px] leading-[21px]', mine ? 'font-strong' : 'font-body')}
        >
          {message.text}
        </Text>
      </ChunkyCard>
    </View>
  );
}

export default function OnboardingScreen() {
  const completeOnboarding = useAppStore((state) => state.completeOnboarding);

  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'q-0', from: 'sidekick', text: LEVEL_CHAT_STEPS[0].question },
  ]);
  const [stepIndex, setStepIndex] = useState(0);
  const [name, setName] = useState('');
  const [score, setScore] = useState(0);
  const [draft, setDraft] = useState('');
  const [finished, setFinished] = useState(false);

  const scrollRef = useRef<ScrollView>(null);
  const step: ChatStep | undefined = LEVEL_CHAT_STEPS[stepIndex];

  const advance = (nextIndex: number, nameValue: string, added: ChatMessage[]) => {
    const nextStep = LEVEL_CHAT_STEPS[nextIndex];

    if (nextStep) {
      setMessages((current) => [
        ...current,
        ...added,
        { id: `q-${nextIndex}`, from: 'sidekick', text: fillName(nextStep.question, nameValue) },
      ]);
    } else {
      setMessages((current) => [
        ...current,
        ...added,
        {
          id: 'closing',
          from: 'sidekick',
          text: `That's everything I need, ${nameValue}. Here is where I would start you.`,
        },
      ]);
      setFinished(true);
    }

    setStepIndex(nextIndex);
  };

  const submitName = () => {
    const trimmed = draft.trim();
    if (trimmed.length === 0) return;

    setName(trimmed);
    setDraft('');
    advance(1, trimmed, [{ id: 'a-0', from: 'you', text: trimmed }]);
  };

  const choose = (choice: ChatChoice) => {
    setScore((current) => current + choice.score);
    advance(stepIndex + 1, name, [
      { id: `a-${choice.id}`, from: 'you', text: choice.label },
      { id: `r-${choice.id}`, from: 'sidekick', text: choice.reply },
    ]);
  };

  const seeLevel = () => {
    const level = levelFromScore(score);
    completeOnboarding(name, level, score);
    router.replace(routes.levelResult);
  };

  const stepNumber = Math.min(stepIndex + 1, LEVEL_CHAT_STEPS.length);

  return (
    <Screen>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScreenHeader
          showBack={false}
          kicker={`Step ${stepNumber} of ${LEVEL_CHAT_STEPS.length} · Hamburg`}
          title="Let's find your level"
          subtitle="A short chat, not a CEFR test. It only decides where you start."
        />

        <ScrollView
          ref={scrollRef}
          className="flex-1"
          contentContainerClassName="gap-3 px-5 pb-4"
          keyboardShouldPersistTaps="handled"
          onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.map((message) => (
            <Bubble key={message.id} message={message} />
          ))}
        </ScrollView>

        <View className="border-ink bg-cream pb-safe-offset-4 border-t-2 px-5 pt-4">
          {finished ? (
            <ChunkyButton
              label="See my level"
              size="lg"
              fullWidth
              trailing={<Text className="text-cream font-display text-[17px]">→</Text>}
              onPress={seeLevel}
            />
          ) : null}

          {!finished && step?.kind === 'text' ? (
            <View className="gap-3">
              <ChunkyInput
                value={draft}
                onChangeText={setDraft}
                placeholder={step.placeholder}
                autoFocus
                autoCapitalize="words"
                returnKeyType="send"
                onSubmitEditing={submitName}
              />
              <ChunkyButton
                label="Send"
                fullWidth
                disabled={draft.trim().length === 0}
                onPress={submitName}
              />
            </View>
          ) : null}

          {!finished && step?.kind === 'choice' ? (
            <View className="gap-2.5">
              {step.choices?.map((choice) => (
                <ChunkyButton
                  key={choice.id}
                  label={choice.label}
                  variant="paper"
                  fullWidth
                  onPress={() => choose(choice)}
                />
              ))}
            </View>
          ) : null}
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}

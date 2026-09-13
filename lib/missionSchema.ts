import { z } from 'zod';

const levelSchema = z.enum(['beginner', 'intermediate', 'advanced']);
const accentSchema = z.enum(['sky', 'coral', 'magenta']);
const iconSchema = z.enum(['compass', 'utensils', 'users', 'leaf']);

const vocabSchema = z.object({
  id: z.string().min(1),
  de: z.string().min(1),
  en: z.string().min(1),
  note: z.string().min(1),
});

const conversationLineSchema = z.object({
  id: z.string().min(1),
  speaker: z.enum(['partner', 'you']),
  de: z.string().min(1),
  en: z.string().min(1),
});

const practiceQuestionSchema = z.discriminatedUnion('kind', [
  z.object({
    id: z.string().min(1),
    kind: z.literal('multiple-choice'),
    prompt: z.string().min(1),
    options: z.array(z.string().min(1)).min(2),
    answerIndex: z.number().int().nonnegative(),
    explanation: z.string().min(1),
  }),
  z.object({
    id: z.string().min(1),
    kind: z.literal('fill-blank'),
    prompt: z.string().min(1),
    sentence: z.string().min(1),
    answer: z.string().min(1),
    alternatives: z.array(z.string()),
    explanation: z.string().min(1),
  }),
  z.object({
    id: z.string().min(1),
    kind: z.literal('write-sentence'),
    prompt: z.string().min(1),
    mustInclude: z.array(z.string().min(1)).min(1),
    sample: z.string().min(1),
    explanation: z.string().min(1),
  }),
]);

export const missionSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  tagline: z.string().min(1),
  category: z.string().min(1),
  icon: iconSchema,
  season: z.literal('autumn').optional(),
  level: levelSchema,
  minutes: z.number().int().positive(),
  accent: accentSchema,
  where: z.string().min(1),
  realLifeSteps: z.array(z.string().min(1)).min(1),
  vocab: z.array(vocabSchema).min(1),
  conversationSimulation: z.array(conversationLineSchema).min(1),
  practiceQuestions: z.array(practiceQuestionSchema).min(1),
  badge: z.object({
    title: z.string().min(1),
    emoji: z.string().min(1),
    description: z.string().min(1),
  }),
  reflectionFocus: z.string().min(1),
});

export const missionListSchema = z.array(missionSchema);

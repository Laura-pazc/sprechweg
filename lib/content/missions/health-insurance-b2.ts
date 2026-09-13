import type { Mission } from '@/lib/types';
import { createScenarioMission } from '../createScenarioMission';

export const healthInsuranceB2: Mission = createScenarioMission({
  id: 'health-insurance-b2',
  title: 'Navigate health insurance',
  tagline: 'Compare coverage, premiums, and claim steps.',
  category: 'Everyday errands',
  icon: 'compass',
  level: 'advanced',
  minutes: 30,
  accent: 'magenta',
  where: 'A health-insurance service centre or advice call.',
  reflectionFocus: 'ask detailed questions about health insurance',
  realLifeSteps: [
    'Write down your employment and coverage needs.',
    'Ask about statutory and private options.',
    'Clarify premiums and included benefits.',
    'Ask about deductibles and referrals.',
    'Repeat back the next step before ending.',
  ],
  vocab: [
    ['die Krankenversicherung', 'health insurance'],
    ['der Versicherte', 'insured person'],
    ['der Beitrag', 'contribution / premium'],
    ['die Deckung', 'coverage'],
    ['der Selbstbehalt', 'deductible / out-of-pocket amount'],
    ['die Leistung', 'benefit / service'],
    ['Welche Leistungen sind in meinem Plan enthalten?', 'What benefits are included in my plan?'],
    ['Wie reiche ich einen Schadensfall ein?', 'How do I file a claim?'],
  ],
  dialogue: [
    ['partner', 'Welche Art von Deckung suchen Sie?', 'What type of coverage are you looking for?'],
    [
      'you',
      'Was sind die Unterschiede zwischen gesetzlicher und privater Versicherung?',
      'What are the differences between statutory and private insurance?',
    ],
    [
      'partner',
      'Die gesetzliche Versicherung hat niedrigere Beiträge.',
      'Statutory insurance has lower premiums.',
    ],
    [
      'partner',
      'Die private Versicherung bietet mehr Leistungen, aber höhere Beiträge.',
      'Private insurance offers more benefits but higher premiums.',
    ],
    [
      'you',
      'Welche Leistungen sind in einem typischen Plan enthalten?',
      'Which benefits are included in a typical plan?',
    ],
    [
      'partner',
      'Arztbesuche, Medikamente und teilweise Zahnbehandlung.',
      'Doctor visits, medication, and some dental treatment.',
    ],
    ['you', 'Wie reiche ich einen Schadensfall ein?', 'How do I file a claim?'],
    [
      'partner',
      'Meist zeigen Sie einfach Ihre Versicherungskarte.',
      'Usually you simply show your insurance card.',
    ],
  ],
  multipleChoice: {
    prompt: 'Was ist ein typischer Selbstbehalt?',
    options: ['50 bis 100 Euro', '0 bis 300 Euro', '500 bis 1000 Euro'],
    answerIndex: 1,
    explanation: 'The adviser gives a typical range of zero to 300 euros.',
  },
  fillBlank: {
    prompt: 'Complete the comparison.',
    sentence: 'Die private Versicherung hat höhere ___.',
    answer: 'Beiträge',
    explanation: '„Beiträge“ are the recurring insurance premiums.',
  },
  writeSentence: {
    prompt: 'Write why insurance matters.',
    mustInclude: ['Krankenversicherung'],
    sample: 'Eine Krankenversicherung ist für Arztbesuche und Medikamente wichtig.',
    explanation: 'Connect the insurance to a practical benefit.',
  },
  badge: {
    title: 'Versicherungs-Klar',
    emoji: '🛡️',
    description: 'Compared health-insurance options in German.',
  },
});

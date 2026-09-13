import type { Mission } from '@/lib/types';
import { createScenarioMission } from '../createScenarioMission';

export const doctorFirstVisitA2: Mission = createScenarioMission({
  id: 'doctor-first-visit-a2',
  title: 'First doctor visit',
  tagline: 'Check in and describe a simple symptom.',
  category: 'Everyday errands',
  icon: 'compass',
  level: 'beginner',
  minutes: 20,
  accent: 'sky',
  where: 'Your Hausarzt practice or a walk-in clinic.',
  reflectionFocus: 'check in and explain a symptom at the doctor',
  realLifeSteps: [
    'Bring your insurance card.',
    'State your appointment time at reception.',
    'Listen for the waiting-room instruction.',
    'Describe where it hurts and for how long.',
    'Ask what happens next.',
  ],
  vocab: [
    ['der Termin', 'appointment'],
    ['die Versicherungskarte', 'insurance card'],
    ['die Beschwerden', 'symptoms'],
    ['die Anmeldung', 'reception desk'],
    ['der Wartebereich', 'waiting room'],
    ['das Rezept', 'prescription'],
    ['Wo tut es weh?', 'Where does it hurt?'],
    ['Ich habe Kopfschmerzen.', 'I have a headache.'],
  ],
  dialogue: [
    ['partner', 'Guten Tag! Haben Sie einen Termin?', 'Hello! Do you have an appointment?'],
    [
      'you',
      'Ja, um zehn Uhr. Hier ist meine Versicherungskarte.',
      'Yes, at ten. Here is my insurance card.',
    ],
    ['partner', 'Bitte setzen Sie sich in den Wartebereich.', 'Please sit in the waiting room.'],
    ['partner', 'Guten Tag. Wo tut es weh?', 'Hello. Where does it hurt?'],
    ['you', 'Ich habe Kopfschmerzen seit zwei Tagen.', 'I have had a headache for two days.'],
    ['partner', 'Haben Sie noch andere Beschwerden?', 'Do you have any other symptoms?'],
    ['you', 'Nein, nur die Kopfschmerzen.', 'No, just the headache.'],
    ['partner', 'Gut, ich gebe Ihnen ein Rezept.', "Good, I'll give you a prescription."],
  ],
  multipleChoice: {
    prompt: 'Was fragt der Arzt zuerst?',
    options: ['Wo tut es weh?', 'Wie heißen Sie?', 'Wo wohnen Sie?'],
    answerIndex: 0,
    explanation: 'The doctor first asks where it hurts.',
  },
  fillBlank: {
    prompt: 'Describe the symptom.',
    sentence: 'Ich habe ___ seit zwei Tagen.',
    answer: 'Kopfschmerzen',
    explanation: 'Use the symptom directly after „Ich habe“.',
  },
  writeSentence: {
    prompt: 'Write one sentence about an appointment.',
    mustInclude: ['Termin'],
    sample: 'Ich habe morgen um zehn Uhr einen Termin.',
    explanation: 'Include the day or time to make the sentence useful.',
  },
  badge: {
    title: 'Praxis-Profi',
    emoji: '🩺',
    description: 'Handled a first doctor visit in German.',
  },
});

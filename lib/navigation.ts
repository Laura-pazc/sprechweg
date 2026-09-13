import { router, type Href } from 'expo-router';

export function goBackOrReplace(fallback: Href) {
  if (router.canGoBack()) router.back();
  else router.replace(fallback);
}

/** Typed hrefs for the mission flow, so no screen builds a dynamic path by hand. */
export const routes = {
  today: '/(tabs)' as Href,
  missions: '/(tabs)/missions' as Href,
  journalTab: '/(tabs)/journal' as Href,
  dailyJournal: '/journal/new' as Href,
  profile: '/(tabs)/profile' as Href,
  onboarding: '/onboarding' as Href,
  levelResult: '/level-result' as Href,
  howItWorks: '/how-it-works' as Href,
  createMission: '/mission/create' as Href,
  missionPrep: (id: string): Href => ({ pathname: '/mission/[id]/prep', params: { id } }),
  missionDo: (id: string): Href => ({ pathname: '/mission/[id]/do', params: { id } }),
  missionJournal: (id: string): Href => ({ pathname: '/mission/[id]/journal', params: { id } }),
};

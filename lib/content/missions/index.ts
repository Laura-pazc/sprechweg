import type { Mission } from '@/lib/types';
import { appleCiderCulture } from './apple-cider-culture';
import { findYourWay } from './find-your-way';
import { makeLifeHappen } from './make-life-happen';
import { meetYourPeople } from './meet-your-people';
import { casualConversationA1 } from './casual-conversation-a1';
import { runningClubFirstRunA1A2 } from './running-club-first-run-a1-a2';
import { doctorFirstVisitA2 } from './doctor-first-visit-a2';
import { bankAccountA2 } from './bank-account-a2';
import { forestHikingA2 } from './forest-hiking-a2';
import { auslanderbehordeAppointmentA2 } from './auslanderbehorde-appointment-a2';
import { apartmentViewingB1 } from './apartment-viewing-b1';
import { apartmentEmergencyB1 } from './apartment-emergency-b1';
import { datingFirstDateB1 } from './dating-first-date-b1';
import { expatMeetupB1 } from './expat-meetup-b1';
import { farmersMarketMastery } from './farmers-market-mastery';
import { furnitureShoppingB1 } from './furniture-shopping-b1';
import { invitingSomeoneOverB1 } from './inviting-someone-over-b1';
import { jobInterviewB1 } from './job-interview-b1';
import { libraryMembershipB1 } from './library-membership-b1';
import { mushroomForagingB1 } from './mushroom-foraging-b1';
import { publicTransportB1 } from './public-transport-b1';
import { restaurantReservationB1 } from './restaurant-reservation-b1';
import { teamMeetingB1 } from './team-meeting-b1';
import { universityOrientationB2 } from './university-orientation-b2';
import { healthInsuranceB2 } from './health-insurance-b2';

/**
 * Authored mission content. The original three missions retain their stable IDs
 * for saved progress and onboarding; the scenario catalog follows them.
 */
export const MISSIONS: Mission[] = [
  findYourWay,
  makeLifeHappen,
  meetYourPeople,
  casualConversationA1,
  runningClubFirstRunA1A2,
  doctorFirstVisitA2,
  bankAccountA2,
  forestHikingA2,
  auslanderbehordeAppointmentA2,
  apartmentViewingB1,
  apartmentEmergencyB1,
  datingFirstDateB1,
  expatMeetupB1,
  furnitureShoppingB1,
  invitingSomeoneOverB1,
  jobInterviewB1,
  libraryMembershipB1,
  mushroomForagingB1,
  appleCiderCulture,
  farmersMarketMastery,
  publicTransportB1,
  restaurantReservationB1,
  teamMeetingB1,
  universityOrientationB2,
  healthInsuranceB2,
];

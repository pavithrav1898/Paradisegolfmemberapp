import blackDiamondImage from 'figma:asset/e200055d855bc7d56e1151e84640ffb9b920191e.png';
import cypressRunImage from 'figma:asset/91dd6d8f828ef837e3f5cfb772d7c2fa3dad8d6c.png';
import southernHillsImage from 'figma:asset/29748bdedc4933bb4046ad779cb1e1c986fdbd3e.png';

export interface Tournament {
  id: string;
  title: string;
  image: string;
  date: string;
  location: string;
  memberPrice: string;
  pepMemberPrice: string;
  guestPrice: string;
  distance?: string;
  shotgunTime: string;
  formats: string[];
  included?: string;
  description?: string;
}

export const tournaments: Tournament[] = [
  {
    id: 'black-diamond',
    title: 'Paradise Play Day at Black Diamond',
    image: blackDiamondImage,
    date: 'Monday January 19, 2026',
    location: '3125 W. Black Diamond Circle, Lecanto, FL 34461',
    memberPrice: '$140',
    pepMemberPrice: '$130',
    guestPrice: '$150',
    distance: '4.5 mi',
    shotgunTime: '10AM',
    formats: [
      '4 person scramble',
      'Individual Quota',
      'Just play for FUN!'
    ],
    included: 'Range Balls, Donuts, and Lunch included',
    description: 'Join us for an exciting Play Day at Black Diamond Golf Club. Experience championship golf with fellow Paradise Golf members.'
  },
  {
    id: 'cypress-run',
    title: 'Paradise Play Day at Cypress Run',
    image: cypressRunImage,
    date: 'Monday January 5, 2026',
    location: '2669 St Andrews Blvd, Tarpon Springs, FL 34688',
    memberPrice: '$109',
    pepMemberPrice: '$99',
    guestPrice: '$119',
    distance: '8.2 mi',
    shotgunTime: '10AM',
    formats: [
      '4 person scramble',
      'Individual Quota',
      'Just play for FUN!'
    ],
    included: 'Range Balls Included',
    description: 'Experience the beautiful Cypress Run Golf Club with our Paradise Golf community. A day of great golf and camaraderie awaits.'
  },
  {
    id: 'southern-hills',
    title: 'Southern Hills Plantation - Brooksville, FL',
    image: southernHillsImage,
    date: 'Tuesday December 16, 2025',
    location: 'Brooksville, FL',
    memberPrice: '$120',
    pepMemberPrice: '$135',
    guestPrice: '$110',
    distance: '2.3 mi',
    shotgunTime: '7:30 AM - 1:30 PM',
    formats: [
      'Choice of 3 Formats: 4 person scramble',
      'Individual Quota',
      'or No game'
    ],
    description: 'Enjoy a fantastic day of golf at Southern Hills Plantation with exclusive member pricing and multiple format options.'
  }
];

export function getTournamentById(id: string): Tournament | undefined {
  return tournaments.find(t => t.id === id);
}

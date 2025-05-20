import { SuggestedAction } from '../types';

export const suggestedActions: SuggestedAction[] = [
  {
    id: '1',
    text: 'Get you an Ice-cream?',
    forMoodLevel: [2, 3, 4, 5],
    icon: 'heart-handshake',
  },
  {
    id: '2',
    text: 'Bring your favorite snack? that is me-',
    forMoodLevel: [1, 2, 3],
    icon: 'coffee',
  },
  {
    id: '3',
    text: 'Say sorry with a cute note',
    forMoodLevel: [1, 2, 3],
    icon: 'pen',
  },
  {
    id: '4',
    text: 'Wanna give a BJ?',
    forMoodLevel: [1, 2, 3, 4],
    icon: 'help-circle',
  },
  {
    id: '5',
    text: 'want some space?no?',
    forMoodLevel: [1, 2],
    icon: 'clock',
  },
  {
    id: '6',
    text: 'wanna smash?',
    forMoodLevel: [1, 2, 3, 4],
    icon: 'utensils',
  },
  {
    id: '7',
    text: 'Watch a movie together',
    forMoodLevel: [3, 4, 5],
    icon: 'film',
  },
  {
    id: '8',
    text: 'Get a DBC?',
    forMoodLevel: [3, 4, 5],
    icon: 'footprints',
  },
  {
    id: '9',
    text: 'Schedule a date night',
    forMoodLevel: [2, 3, 4, 5],
    icon: 'calendar-heart',
  },
  {
    id: '10',
    text: 'Listen without interrupting',
    forMoodLevel: [1, 2, 3],
    icon: 'ear',
  },
  {
    id: '11',
    text: 'Get you flowers?',
    forMoodLevel: [1, 2, 3, 4],
    icon: 'flower',
  },
  {
    id: '12',
    text: 'To show Love',
    forMoodLevel: [3, 4, 5],
    icon: 'badge-check',
  },
];

export const getSuggestedActionsForMood = (moodLevel: number): SuggestedAction[] => {
  return suggestedActions.filter(action => 
    action.forMoodLevel.includes(moodLevel as 1 | 2 | 3 | 4 | 5)
  );
};
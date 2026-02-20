export const CATEGORIES = [
  'All',
  'Restaurant',
  'Bakery',
  'Grocery',
  'Retail',
  'Entertainment',
  'Construction',
  'Landscape',
  'Healthcare',
  'Cleaning',
  'Professional Services',
  'Other',
];

export const SORTBY = [
  'None',
  'Alphabetical',
  'Closest',
];

export const WEEKDAY: string[] = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
] as const;

export type WeekDay = typeof WEEKDAY[number];
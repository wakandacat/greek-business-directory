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
  'Real Estate',
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

export const RESULTS_PER_PAGE = [6, 9, 12, 'All'] as const;
export type ResultsPerPage = typeof RESULTS_PER_PAGE[number];
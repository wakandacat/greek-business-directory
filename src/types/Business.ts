export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

export interface Business {
  id: string;
  name: string;
  categories: string[];
  description: string;
  address: string;
  phone: string;
  website?: string;
  email?: string;
  hours: Record<DayOfWeek, string>;
  coordinates: {
    lat: number;
    lng: number;
  };
  image?: string;
}
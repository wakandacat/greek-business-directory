import type { WeekDay } from "../data/constants";
import { Dayjs } from 'dayjs';

export interface Business {
  id: string;
  name: string;
  categories: string[];
  description: string;
  address: string;
  phone?: string;
  website?: string;
  email: string;
  hours: Record<WeekDay, string>;
  coordinates: {
    lat: number;
    lng: number;
  };
  image?: string;
}

export interface DayHours {
  open: Dayjs | null;
  close: Dayjs | null;
  closed: boolean;
}

export type HoursRecord = Record<string, DayHours>;
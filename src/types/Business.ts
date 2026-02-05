export interface Business {
  id: string;
  name: string;
  categories: string[];
  description: string;
  address: string;
  phone: string;
  website?: string;
  email?: string;
  hours: {
    monday?: string;
    tuesday?: string;
    wednesday?: string;
    thursday?: string;
    friday?: string;
    saturday?: string;
    sunday?: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  image?: string;
}
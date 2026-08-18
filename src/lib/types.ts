export interface VillageProfile {
  villageName: string;
  history: string;
  vision: string;
  mission: string[];
  address: string;
  email: string;
  workingHours: string;
  [key: string]: unknown;
}

export interface OrganizationStructureItem {
  id: string;
  name: string;
  position: string;
}

export interface NewsItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  [key: string]: unknown;
}

export interface GalleryItem {
  id: string;
  title: string;
  eventDate: string;
  [key: string]: unknown;
}

export interface PopulationStats {
  totalPopulation: number;
  familyCardCount: number;
  maleCount: number;
  femaleCount: number;
  dusunStats: { name: string; population: number }[];
  occupationStats: { name: string; count: number }[];
}

export type LetterRequestStatus = 'pending' | 'verified' | 'approved' | 'rejected' | 'completed';
export type ComplaintStatus = 'received' | 'in_progress' | 'resolved' | 'rejected';
export type UserRole = 'warga' | 'operator' | 'admin' | 'kepala_desa';
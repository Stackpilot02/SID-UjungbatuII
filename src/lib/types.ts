export interface VillageProfile {
  villageName: string;
  district?: string;
  regency?: string;
  province?: string;
  history: string;
  vision: string;
  mission: string[];
  address: string;
  phone?: string;
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
  coverImageUrl?: string;
  publishedAt: string;
  [key: string]: unknown;
}

export interface GalleryItem {
  id: string;
  title: string;
  description?: string;
  mediaUrl?: string;
  mediaType?: string;
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

export interface LetterRequest {
  id: string;
  requesterName: string;
  requesterNik: string;
  letterTypeId: string;
  phone?: string;
  email?: string;
  purpose: string;
  status: string;
  createdAt: string;
  additionalData?: Record<string, unknown>;
}

export interface Complaint {
  id: string;
  categoryId: string;
  description: string;
  location: string;
  status: string;
  reporterName: string;
  createdAt: string;
}

export interface ActivityLog {
  id: string;
  action: string;
  tableName: string;
  performedBy: string;
  createdAt: string;
}

export interface ArchivedLetter {
  id: string;
  letterNumber: string;
  letterTypeId: string;
  issuedAt: string;
}
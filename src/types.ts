export type CategoryType =
  | 'All'
  | 'Movies'
  | 'Web Series'
  | 'Commercials'
  | 'Promos/Music Video';

export interface ProjectCredits {
  director?: string;
  productionHouse?: string;
  brand?: string;
  role: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: CategoryType;
  year: string;
  thumbnail: string;
  overlay?: number;
  imagePosition?: string;
  credits: ProjectCredits;
  description: string;
  featuredInHero?: boolean;
  videoUrl?: string;
  gallery: string[];
}

export interface WorkExperience {
  role: string;
  project: string;
  productionHouse: string;
  year?: string;
}

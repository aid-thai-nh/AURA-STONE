export type PageView = 
  | 'home' 
  | 'projects' 
  | 'spaces' 
  | 'furniture-collection' 
  | 'philosophy' 
  | 'journal' 
  | 'private-consultation';

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  location: string;
  country: string;
  year: string;
  area: string;
  category: 'villa' | 'penthouse' | 'pavilion' | 'courtyard';
  categoryLabel: string;
  image: string;
  galleryImages: string[];
  description: string;
  architecturalIntent: string;
  coordinates: string;
  elevation: string;
  materiality: string;
  acousticCuration: string;
  lightSystem: string;
  specs: {
    grossVolume: string;
    ceilingDatum: string;
    stoneQuarry: string;
    joineryTimber: string;
    reverbDecay: string;
    airDisplacement: string;
  };
}

export interface FurniturePiece {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  edition: string;
  totalEditions: number;
  image: string;
  dimensions: string;
  weight: string;
  materiality: string;
  finish: string;
  joinery: string;
  description: string;
  provenance: string;
  leadTime: string;
}

export interface SpaceTypology {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  image: string;
  keyMaterials: string[];
  luxLevel: string;
  reverbRating: string;
  thermalMass: string;
  description: string;
  curationNotes: string[];
}

export interface JournalArticle {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  author: string;
  role: string;
  excerpt: string;
  content: string[];
  pullQuote?: string;
  citation?: string;
}

export interface MaterialSample {
  id: string;
  code: string;
  name: string;
  origin: string;
  finish: string;
  description: string;
  application: string;
  image: string;
}

export type EventStatus = 'UPCOMING' | 'HAPPENING_NOW' | 'LIMITED_SEATS' | 'COMPLETED';

export interface ArchitecturalEvent {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  time: string;
  location: string;
  city: string;
  atelier: string;
  status: EventStatus;
  statusLabel: string;
  remainingSeats?: number;
  totalSeats?: number;
  curator: string;
  image: string;
  description: string;
  highlights: string[];
  schedule: { time: string; activity: string }[];
  rsvpRequired: boolean;
}

export interface AtelierLocation {
  city: string;
  district: string;
  address: string;
  postal: string;
  coordinates: string;
  phone: string;
  email: string;
  director: string;
}

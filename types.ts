
export interface Report {
  type: string;
  date: string;
  notes: string;
}

export interface Hotel {
  id: string;
  name: string;
  city: string;
  status: 'Clean' | 'Pest Reported';
  lastUpdated: string;
  description: string;
  reports: Report[];
  image: string;
  avgRating: number;
  priceRange: string;
}

export interface BlogPost {
  id: string;
  title: string;
  author: string;
  date: string;
  category: string;
  excerpt: string;
  content?: string;
  image: string;
}


export enum AppView {
  COVER = 'COVER',
  HOME = 'HOME',
  MENU = 'MENU',
  SEARCH = 'SEARCH',
  PROFILE = 'PROFILE',
  RECOMMEND = 'RECOMMEND'
}

export enum MenuCategory {
  CAFE = 'Café',
  RESTOBAR = 'Restobar',
  BURGERS = 'Burgers',
  PASTAS = 'Pastas',
  COCKTAILS = 'Cocktails',
  LIMONADAS = 'Limonadas'
}

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  description: string;
  price: string;
  tags?: string[];
  image?: string;
}

export interface RecommendationRequest {
  mood: string;
  hungerLevel: 'snack' | 'meal' | 'feast';
  dietary?: string;
}

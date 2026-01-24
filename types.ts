
export enum AppView {
  COVER = 'COVER',
  HOME = 'HOME',
  MENU = 'MENU',
  SEARCH = 'SEARCH',
  PROFILE = 'PROFILE',
  RECOMMEND = 'RECOMMEND',
  ADMIN = 'ADMIN',
  DETAIL = 'DETAIL',
  JOURNEY = 'JOURNEY'
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
  chapter: number;
  history: string;
  description: string;
  price: string;
  tags?: string[];
  image?: string;
}

export interface ScrapbookElement {
  id: string;
  type: 'stamp' | 'ticket' | 'sketch' | 'photo';
  imageUrl: string;
  rotation: string;
  caption?: string;
}

export interface RecommendationRequest {
  mood: string;
  hungerLevel: 'snack' | 'meal' | 'feast';
  dietary?: string;
}

export interface HistoryPost {
  id: string;
  date: string; // Ej: "Madrid 2021" o "Hoy"
  title: string;
  content: string; // Puede soportar HTML básico o ser texto plano
  imageUrl?: string;
  mediaType?: 'image' | 'video';
  reactions: {
    likes: number;    // "Vibra Guapa"
    dislikes: number; // "Feedback Real"
  };
  isNews?: boolean; // Para diferenciar hitos históricos de noticias actuales
}

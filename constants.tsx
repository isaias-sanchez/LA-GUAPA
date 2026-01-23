
import { MenuItem, MenuCategory, ScrapbookElement } from './types';

export const DIARIO_NOTES = [
  "Esa tarde en Camden no paraba de llover...",
  "El secreto está en el término de la carne.",
  "Extraño el sonido de los pick-ups de la 92.",
  "¿Será que el picante allá sabía igual?",
  "Notas para mi yo del futuro: no olvides el romero."
];

export const DEFAULT_PUNK_IMAGE = "https://secaqjszqfywcoykllhx.supabase.co/storage/v1/object/sign/LA%20GUAPA/Generated%20Image%20January%2023,%202026%20-%2012_36AM.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zOGI0YTY5My0xNmVkLTRhYmYtYTgyNS0wMDAxZTU3N2RlNzMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJMQSBHVUFQQS9HZW5lcmF0ZWQgSW1hZ2UgSmFudWFyeSAyMywgMjAyNiAtIDEyXzM2QU0ucG5nIiwiaWF0IjoxNzY5MTQ2NjI4LCJleHAiOjE3NzE3Mzg2Mjh9.N2vXNjRjh5QQ0TZhOlWfcNa0FMY6_7kleBNkd6Ty2rs";

export const SCRAPBOOK_ELEMENTS: ScrapbookElement[] = [
  {
    id: 's1',
    type: 'ticket',
    imageUrl: DEFAULT_PUNK_IMAGE,
    rotation: 'rotate-12',
    caption: 'Billete de tren, Roma - Florencia. El viaje donde entendí que la pasta es religión.'
  },
  {
    id: 's2',
    type: 'stamp',
    imageUrl: DEFAULT_PUNK_IMAGE,
    rotation: '-rotate-6',
    caption: 'Sello de aduanas, 2017. El día que mi maleta pesaba más de recuerdos que de ropa.'
  },
  {
    id: 's3',
    type: 'sketch',
    imageUrl: DEFAULT_PUNK_IMAGE,
    rotation: 'rotate-3',
    caption: 'Boceto rápido de la Calle 92. Lo dibujé esperando un avión que nunca llegaba.'
  }
];

export const MENU_ITEMS: MenuItem[] = [
  // --- CAPÍTULO 1: LA MAÑANA DEL DESTIERRO (CAFÉ) ---
  {
    id: 'c-1',
    name: 'Onzas del Caribe',
    category: MenuCategory.CAFE,
    chapter: 1,
    history: 'Aquella mañana en Barranquilla el aire pesaba como plomo. Fue el último tinto antes de cruzar el charco. Juré que si el frío de Madrid lograba calarme los huesos, lo combatiría con este aroma a panela. No es café, es el combustible que me mantiene conectado a esa orilla que ya no piso.',
    description: 'Un latte frío endulzado con panela, tan refrescante como la brisa y tan auténtico como un vaso de tinto en la costa.',
    price: '13K',
    tags: ['Frío', 'Nostalgia', 'Signature'],
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'c-2',
    name: 'El de la Tarde de Colegio',
    category: MenuCategory.CAFE,
    chapter: 1,
    history: 'Londres, 2019. Llovía sobre el Támesis y yo solo quería mojar una galleta María en el olvido. Estaba solo, empapado y con el corazón en un puño. Este latte fue mi única cápsula del tiempo para no perder la cordura en una ciudad que me hablaba en un idioma que no sentía mío.',
    description: 'Latte frío, suave y con pedacitos de galleta María. Sabe a infancia, a meriendas de la abuela, pero vestido de latte.',
    price: '14K',
    tags: ['Infancia', 'Dulce'],
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'bur-1',
    name: 'Gigi Hadid',
    category: MenuCategory.BURGERS,
    chapter: 3,
    history: 'Nueva York, 2020. Buscando el éxito en las calles de Queens, encontré este sabor en un carrito perdido. Eran las 3 AM y mis dedos estaban congelados, pero al morder esta carne, el aire olió a la Calle 92. No estaba comiendo una burger, estaba intentando regresar a casa a través del paladar.',
    description: '150 gr de carne premium, pan artesanal, cheddar fundido, doble tocineta, pepinillos y salsa mayoajo.',
    price: '34K',
    tags: ['Clásica', 'Popular', 'Signature'],
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'bur-3',
    name: 'Luna de Miel',
    category: MenuCategory.BURGERS,
    chapter: 3,
    history: 'Madrid, 2024. Mezclar mermelada de tocineta con miel fue mi forma de decir que, incluso en el exilio más duro, hay momentos que valen el viaje. Es el caos de mi vida actual buscando un equilibrio dulce que aún no encuentro del todo.',
    description: 'Carne premium, pan de papa, cheddar, mermelada de tocineta en miel y ron, crotones de queso costeño y pulled pork.',
    price: '40K',
    tags: ['Dulce y Salado', 'Leyenda', 'Signature'],
    image: DEFAULT_PUNK_IMAGE
  },
  {
    id: 'cock-1',
    name: 'Cielo Tinto',
    category: MenuCategory.COCKTAILS,
    chapter: 5,
    history: 'Ciudad de México. Una tormenta me obligó a refugiarme en una cantina y mezclar lo que tenía a mano. El vino y el mezcal se convirtieron en el fuego sagrado que salvó mi noche de soledad. Bebí hasta que el cielo dejó de llorar.',
    description: 'Coctel que sabe al atardecer: tequila MEZCAL, Lychee fresco, vinotinto superficial, mariagold y un susurro de fuego.',
    price: '33K',
    tags: ['Fuego', 'Firma', 'Signature'],
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=600&auto=format&fit=crop'
  },
  // --- CAPÍTULO 6: EL CAOS Y EL EQUILIBRIO (PASTAS, LIMONADAS, RESTOBAR) ---
  {
    id: 'past-1',
    name: 'Pasta del Exilio',
    category: MenuCategory.PASTAS,
    chapter: 6,
    history: 'Roma me enseñó que la paciencia es un ingrediente. Esta pasta es el resultado de domingos lentos en un apartamento pequeño, intentando recrear el calor del hogar con lo que había en la despensa. Es mi conexión más pura con el Mediterráneo.',
    description: 'Pasta artesanal con salsa de tomates asados, albahaca fresca y láminas prolijas de parmesano.',
    price: '28K',
    tags: ['Artesanal', 'Clásico'],
    image: DEFAULT_PUNK_IMAGE
  },
  {
    id: 'lim-1',
    name: 'Limonada Caos y Coco',
    category: MenuCategory.LIMONADAS,
    chapter: 6,
    history: 'El Caribe en un vaso, pero con la actitud de la gran ciudad. La cremosidad del coco tratando de calmar la acidez del limón. Como yo, tratando de mantener la calma en medio del tráfico de Madrid.',
    description: 'Cremosa limonada de coco con un toque secreto de lima y espuma densa.',
    price: '16K',
    tags: ['Refrescante', 'Cremoso'],
    image: DEFAULT_PUNK_IMAGE
  },
  {
    id: 'rest-1',
    name: 'Bocados de Barrio',
    category: MenuCategory.RESTOBAR,
    chapter: 6,
    history: 'Inspirado en las esquinas de Buenos Aires y los mercados de Bogotá. Bocados pequeños para compartir historias grandes. Crujientes por fuera, con alma por dentro. Lo que pides cuando el sol ya se fue.',
    description: 'Mix de empanadas y croquetas de autor, acompañadas de salsas de la casa con un toque picante.',
    price: '22K',
    tags: ['Para Compartir', 'Fritura Fina'],
    image: DEFAULT_PUNK_IMAGE
  }
];


import { MenuItem, MenuCategory, ScrapbookElement } from './types';

export const DIARIO_NOTES = [
  "Esa tarde en Camden no paraba de llover...",
  "El secreto está en el término de la carne.",
  "Extraño el sonido de los pick-ups de la 92.",
  "¿Será que el picante allá sabía igual?",
  "Notas para mi yo del futuro: no olvides el romero."
];

export const SCRAPBOOK_ELEMENTS: ScrapbookElement[] = [
  {
    id: 's1',
    type: 'ticket',
    imageUrl: 'https://images.unsplash.com/photo-1544911845-1f34a3eb46b1?q=80&w=400&auto=format&fit=crop',
    rotation: 'rotate-12',
    caption: 'Billete de tren, Roma - Florencia. El viaje donde entendí que la pasta es religión.'
  },
  {
    id: 's2',
    type: 'stamp',
    imageUrl: 'https://images.unsplash.com/photo-1599071018591-912f94c04294?q=80&w=400&auto=format&fit=crop',
    rotation: '-rotate-6',
    caption: 'Sello de aduanas, 2017. El día que mi maleta pesaba más de recuerdos que de ropa.'
  },
  {
    id: 's3',
    type: 'sketch',
    imageUrl: 'https://images.unsplash.com/photo-1513364235739-ec02a2ec9079?q=80&w=400&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1550317138-10000687ad32?q=80&w=600&auto=format&fit=crop'
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
  }
];

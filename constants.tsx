
import { MenuItem, MenuCategory } from './types';

export const MENU_ITEMS: MenuItem[] = [
  // CAFÉ
  {
    id: 'c1',
    name: 'Onzas del Caribe',
    category: MenuCategory.CAFE,
    chapter: 2,
    history: 'El calor de Barranquilla pegado en la piel mientras caminaba por Madrid. Necesitaba que el café supiera a casa, a panela y a libertad.',
    description: 'Un latte frío endulzado con panela, tan refrescante como la brisa y tan auténtico como un vaso de tinto en la costa.',
    price: '13K',
    tags: ['Frío', 'Panela']
  },
  {
    id: 'c2',
    name: 'Merendao',
    category: MenuCategory.CAFE,
    chapter: 3,
    history: 'Las tardes de domingo eran para olvidar el exilio. Este café es ese postre que te hacía tu madre cuando el mundo se sentía demasiado grande.',
    description: 'Dulce, goloso y con espuma que parece nube. Es literalmente un tres leches convertido en café.',
    price: '15K',
    tags: ['Sweet', 'Clouds']
  },
  // BURGERS
  {
    id: 'b1',
    name: 'Gigi Hadid',
    category: MenuCategory.BURGERS,
    chapter: 1,
    history: 'Londres, 2018. El frío calaba los huesos y extrañaba el calor de mi casa. Esta burger fue mi primer intento de replicar ese abrazo en un mercado de Camden.',
    description: '150 gr de carne premium, pan artesanal, cheddar fundido, doble tocineta, pepinillos y salsa mayoajo.',
    price: '34K',
    tags: ['Classic', 'Nostalgia']
  },
  {
    id: 'b2',
    name: 'Belanova',
    category: MenuCategory.BURGERS,
    chapter: 4,
    history: 'Ganar un premio no llenó el vacío, pero cocinar con ron y cerveza artesanal nos recordó que el arte culinario es nuestra única patria verdadera.',
    description: '150 gr de carne premium, pan pretzel, cheddar, tocineta, piña caramelizada en cerveza artesanal y ron añejo.',
    price: '38K',
    tags: ['Award Winner', 'Ron']
  },
  {
    id: 'b3',
    name: 'Luna de Miel',
    category: MenuCategory.BURGERS,
    chapter: 6,
    history: 'Dulzura en medio del caos. Mezclar mermelada de tocineta con pulled pork fue nuestra forma de decir que incluso en el exilio hay momentos dulces.',
    description: 'Carne premium, pan de papa, cheddar, mermelada de tocineta a base de miel y ron, pulled pork caramelizado.',
    price: '40K',
    tags: ['Sweet & Savory']
  },
  // PASTAS
  {
    id: 'p1',
    name: 'Mia Thermopolis',
    category: MenuCategory.PASTAS,
    chapter: 7,
    history: 'Una reinvención necesaria. Como pasar de la calle a un palacio sin olvidar de dónde vienes. Cremosa, intensa, inolvidable.',
    description: 'Fettuccini en salsa Alfredo, tocineta, espinaca fresca, 100g de pechuga de pollo y parmesano.',
    price: '34K',
    tags: ['Creamy']
  },
  // COCKTAILS
  {
    id: 'ck1',
    name: 'Cielo Tinto',
    category: MenuCategory.COCKTAILS,
    chapter: 5,
    history: 'Nació una noche de tormenta. Queríamos algo que tuviera el fuego del mezcal pero la elegancia de un vino tinto bajo la lluvia de Madrid.',
    description: 'Tequila MEZCAL, Lychee fresco, vinotinto superficial, mariagold comestible y un susurro de fuego.',
    price: '33K',
    tags: ['New', 'Signature']
  },
  {
    id: 'ck2',
    name: 'Espresso Martini',
    category: MenuCategory.COCKTAILS,
    chapter: 8,
    history: 'La cafeína para resistir, el vodka para olvidar. El equilibrio perfecto para las noches largas donde el diario se escribe solo.',
    description: 'Licor de café, shot de espresso en prensa francesa, vodka, semillas de café.',
    price: '30K',
    tags: ['Fav del mes']
  }
];

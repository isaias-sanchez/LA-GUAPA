
import { MenuItem, MenuCategory } from './types';

export const MENU_ITEMS: MenuItem[] = [
  // CAFÉ
  {
    id: 'c1',
    name: 'Onzas del Caribe',
    category: MenuCategory.CAFE,
    description: 'Un latte frío endulzado con panela, tan refrescante como la brisa y tan auténtico como un vaso de tinto en la costa.',
    price: '13K',
    tags: ['Frío', 'Panela']
  },
  {
    id: 'c2',
    name: 'Merendao',
    category: MenuCategory.CAFE,
    description: 'Dulce, goloso y con espuma que parece nube. Es literalmente un tres leches convertido en café.',
    price: '15K',
    tags: ['Sweet', 'Clouds']
  },
  {
    id: 'c3',
    name: 'El Abuelita',
    category: MenuCategory.CAFE,
    description: 'El café de siempre con ese golpe de chocolate casero que huele a cocina familiar.',
    price: '15K',
    tags: ['Traditional']
  },
  // BURGERS
  {
    id: 'b1',
    name: 'Gigi Hadid',
    category: MenuCategory.BURGERS,
    description: '150 gr de carne premium, pan artesanal, cheddar fundido, doble tocineta, pepinillos y salsa mayoajo.',
    price: '34K',
    tags: ['Classic']
  },
  {
    id: 'b2',
    name: 'Belanova',
    category: MenuCategory.BURGERS,
    description: '150 gr de carne premium, pan pretzel, cheddar, tocineta, piña caramelizada en cerveza artesanal y ron añejo.',
    price: '38K',
    tags: ['Award Winner', 'Ron']
  },
  {
    id: 'b3',
    name: 'Luna de Miel',
    category: MenuCategory.BURGERS,
    description: 'Carne premium, pan de papa, cheddar, mermelada de tocineta a base de miel y ron, pulled pork caramelizado.',
    price: '40K',
    tags: ['Sweet & Savory']
  },
  // PASTAS
  {
    id: 'p1',
    name: 'Mia Thermopolis',
    category: MenuCategory.PASTAS,
    description: 'Fettuccini en salsa Alfredo, tocineta, espinaca fresca, 100g de pechuga de pollo y parmesano.',
    price: '34K',
    tags: ['Creamy']
  },
  {
    id: 'p2',
    name: 'Pastas al Pesto',
    category: MenuCategory.PASTAS,
    description: 'Salsa de pesto con almendras tostadas, tomates cherry y champiñones en aceite de oliva.',
    price: '28K',
    tags: ['Vegetarian']
  },
  // COCKTAILS
  {
    id: 'ck1',
    name: 'Cielo Tinto',
    category: MenuCategory.COCKTAILS,
    description: 'Tequila MEZCAL, Lychee fresco, vinotinto superficial, mariagold comestible y un susurro de fuego.',
    price: '33K',
    tags: ['New', 'Signature']
  },
  {
    id: 'ck2',
    name: 'Espresso Martini',
    category: MenuCategory.COCKTAILS,
    description: 'Licor de café, shot de espresso en prensa francesa, vodka, semillas de café.',
    price: '30K',
    tags: ['Fav del mes']
  }
];

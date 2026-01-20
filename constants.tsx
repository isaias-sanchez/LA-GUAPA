
import { MenuItem, MenuCategory } from './types';

export const MENU_ITEMS: MenuItem[] = [
  // --- CAPÍTULO 1: LA MAÑANA DEL DESTIERRO (CAFÉ) ---
  {
    id: 'c-1',
    name: 'Onzas del Caribe',
    category: MenuCategory.CAFE,
    chapter: 1,
    history: 'Barranquilla, 2017. El último café antes del avión. Prometí que si el frío de Madrid me alcanzaba, lo quemaría con este aroma a panela.',
    description: 'Un latte frío endulzado con panela, tan refrescante como la brisa y tan auténtico como un vaso de tinto en la costa.',
    price: '13K',
    tags: ['Frío', 'Nostalgia'],
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'c-2',
    name: 'El de la Tarde de Colegio',
    category: MenuCategory.CAFE,
    chapter: 1,
    history: 'Londres, 2019. Llovía sobre el Támesis y yo solo quería mojar una galleta María en el olvido. Este latte es mi cápsula del tiempo.',
    description: 'Latte frío, suave y con pedacitos de galleta María. Sabe a infancia, a meriendas de la abuela, pero vestido de latte.',
    price: '14K',
    tags: ['Infancia', 'Dulce'],
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'c-3',
    name: 'Merendao',
    category: MenuCategory.CAFE,
    chapter: 1,
    history: 'Berlín, invierno. Encontré un tres leches en una pastelería perdida y lloré. Decidí que mi café debía ser ese abrazo que me faltaba.',
    description: 'Dulce, goloso y con espuma que parece nube. Es literalmente un tres leches convertido en café.',
    price: '15K',
    tags: ['Nube', 'Tres Leches'],
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'c-4',
    name: 'El Abuelita',
    category: MenuCategory.CAFE,
    chapter: 1,
    history: 'Madrid, 2021. En el exilio, el chocolate no es postre, es medicina. Un tributo al tetero escondido y a las cocinas que huelen a hogar.',
    description: 'El café de siempre con ese golpe de chocolate casero que huele a cocina familiar. Cremita y sabor a memoria dulce.',
    price: '15K',
    tags: ['Tradicional', 'Calor'],
    image: 'https://images.unsplash.com/photo-1544787210-28271393638c?q=80&w=600&auto=format&fit=crop'
  },

  // --- CAPÍTULO 2: PEQUEÑAS REBELIONES (RESTOBAR / ENTRADAS) ---
  {
    id: 'rb-1',
    name: 'El Universal',
    category: MenuCategory.RESTOBAR,
    chapter: 2,
    history: 'París, medianoche. El pan era bueno pero me faltaba el jamón de mi barrio. Este guapito nació de esa carencia en un ático sin calefacción.',
    description: 'Masa suave, semi dulce relleno de jamón artesanal, tocineta y queso mozzarella.',
    price: '9K',
    tags: ['Artesanal', 'Street'],
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'rb-2',
    name: 'Las Nirvanas',
    category: MenuCategory.RESTOBAR,
    chapter: 2,
    history: 'Seattle, 2018. El grunge sonaba fuerte y las papas con fondue eran el único lujo. Una oda al queso que lo cura todo.',
    description: 'Papas en cascos, fondue de mix de quesos, un baño de tocineta y perejil. Perfecta para empezar la noche.',
    price: '24K',
    tags: ['Fuego', 'Intenso'],
    image: 'https://images.unsplash.com/photo-1573016608964-6c7c10c17196?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'rb-3',
    name: 'Burrata Raven',
    category: MenuCategory.RESTOBAR,
    chapter: 2,
    history: 'Roma, exilio dorado. La burrata era el corazón blanco en un mar de tomates rojos. Aprendí que la elegancia también puede ser punk.',
    description: 'Entrada de burrata cremosa sobre pasta de tomate, rúgula fresca, parmesano, tomates cherry y picadillo de aceitunas.',
    price: '27K',
    tags: ['Signature', 'Fresh'],
    image: 'https://images.unsplash.com/photo-1596701062351-8c2c14d1fcd1?q=80&w=600&auto=format&fit=crop'
  },

  // --- CAPÍTULO 3: EL HAMBRE DEL REBELDE (BURGERS) ---
  {
    id: 'bur-1',
    name: 'Gigi Hadid',
    category: MenuCategory.BURGERS,
    chapter: 3,
    history: 'Nueva York, 2020. Buscando el éxito encontré el sabor. Una burger clásica para quienes no tienen miedo de ensuciarse las manos.',
    description: '150 gr de carne premium, pan artesanal, cheddar fundido, doble tocineta, pepinillos y salsa mayoajo.',
    price: '34K',
    tags: ['Classic', 'Popular'],
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'bur-2',
    name: 'Belanova',
    category: MenuCategory.BURGERS,
    chapter: 3,
    history: 'Barcelona, GastroFest. La piña en ron fue un error afortunado en una noche de fiesta. Ganamos el tercer puesto y perdimos la cabeza.',
    description: '150 gr de carne premium, pan pretzel, cheddar, tocineta, piña caramelizada en cerveza artesanal y ron añejo.',
    price: '38K',
    tags: ['Award', 'Tropical'],
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'bur-3',
    name: 'Luna de Miel',
    category: MenuCategory.BURGERS,
    chapter: 3,
    history: 'Madrid, 2024. Mezclar mermelada de tocineta con pulled pork fue mi forma de decir que incluso en el exilio hay momentos dulces.',
    description: 'Carne premium, pan de papa, cheddar, mermelada de tocineta en miel y ron, crotones de queso costeño y pulled pork.',
    price: '40K',
    tags: ['Sweet & Savory', 'Legend'],
    image: 'https://images.unsplash.com/photo-1550317138-10000687ad32?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'bur-4',
    name: 'Spicy Krush',
    category: MenuCategory.BURGERS,
    chapter: 3,
    history: 'Tijuana, frontera. El picante era el único idioma que entendía. La mejor burger de pollo del mundo, mundial, ok?',
    description: '130 gr de pechuga empanizada y crocante bañada en salsa sweet pepper artesanal, pepinillos y pan brioche.',
    price: '35K',
    tags: ['Spicy', 'Crispy'],
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?q=80&w=600&auto=format&fit=crop'
  },

  // --- CAPÍTULO 4: LA MEMORIA DEL TRIGO (PASTAS) ---
  {
    id: 'pas-1',
    name: 'Emily in Paris',
    category: MenuCategory.PASTAS,
    chapter: 4,
    history: 'París, 2022. La boloñesa era mi refugio cuando el francés se me hacía imposible. Un toque de pesto para no olvidar quién soy.',
    description: 'Pastas cortas bañadas en salsa napolitana a la boloñesa, finas hierbas, pesto y 80gr de lomo fino salteado.',
    price: '29K',
    tags: ['Hearty', 'Classic'],
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'pas-2',
    name: 'Pastas a Palé',
    category: MenuCategory.PASTAS,
    chapter: 4,
    history: 'Nápoles, medianoche. Los ajos rostizados eran el secreto de mi casera. Hoy son el alma de nuestra consentida.',
    description: 'Pasta larga con 100 gr de lomo fino salteados, champiñones, fundido de quesos y ajos rostizados.',
    price: '37K',
    tags: ['Consentida', 'Garlic'],
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=600&auto=format&fit=crop'
  },

  // --- CAPÍTULO 5: NOCHES LARGAS (COCKTAILS) ---
  {
    id: 'cock-1',
    name: 'Cielo Tinto',
    category: MenuCategory.COCKTAILS,
    chapter: 5,
    history: 'Ciudad de México. Una tormenta eléctrica me obligó a mezclar mezcal con vinotinto. El susurro de fuego que salvó mi noche.',
    description: 'Coctel que sabe al atardecer: tequila MEZCAL, Lychee fresco, vinotinto superficial, mariagold y un susurro de fuego.',
    price: '33K',
    tags: ['Fire', 'Signature'],
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'cock-2',
    name: 'Espresso Martini',
    category: MenuCategory.COCKTAILS,
    chapter: 5,
    history: 'Milán, 2021. La cafeína para seguir escribiendo este diario y el vodka para olvidar que el invierno no terminaba nunca.',
    description: 'Licor de café, shot de espresso en prensa francesa, vodka y semillas de café.',
    price: '30K',
    tags: ['Energy', 'Fav'],
    image: 'https://images.unsplash.com/photo-1545696911-c43d23089199?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'cock-3',
    name: 'Roble Morado',
    category: MenuCategory.COCKTAILS,
    chapter: 5,
    history: 'Barranquilla, 2024. Un homenaje al árbol que florece en medio del asfalto. El aguardiente es la sangre de nuestra tierra lejana.',
    description: 'Homenaje al roble morado: aguardiente con almíbar de frutos rojos, limón y escarchado de Tajín con chamoy.',
    price: '29K',
    tags: ['Heritage', 'Vibrant'],
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=600&auto=format&fit=crop'
  },

  // --- CAPÍTULO 6: LA REFRESCANCIA DEL EXILIO (LIMONADAS) ---
  {
    id: 'lim-1',
    name: 'Limonada De Corozo',
    category: MenuCategory.LIMONADAS,
    chapter: 6,
    history: 'Cartagena, recuerdos. El corozo es el rubí de la costa que me traje en la maleta de los sueños.',
    description: 'Refrescante limonada natural infusionada con el sabor único y vibrante del corozo costeño.',
    price: '12K',
    tags: ['Coastal', 'Fresh'],
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'lim-2',
    name: 'Limonada De Coco',
    category: MenuCategory.LIMONADAS,
    chapter: 6,
    history: 'Isla Fuerte, 2016. La cremosidad del coco es la única paz que conozco en este exilio ruidoso.',
    description: 'Limonada cremosa con leche de coco artesanal, el equilibrio perfecto entre cítrico y dulce.',
    price: '13K',
    tags: ['Creamy', 'Island'],
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=600&auto=format&fit=crop'
  }
];

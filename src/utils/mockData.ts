import { Restaurant, Dish, Category, PromoBanner } from '@/types';
import { GiPizzaSlice, GiHamburger, GiSushis } from 'react-icons/gi';

export interface PromoCode {
  code: string;
  discount: number; // в рублях или процентах
  discountType: 'fixed' | 'percentage'; // тип скидки
  description: string;
  applicableCategories?: string[]; // категории, на которые действует (опционально)
  minOrderAmount?: number; // минимальная сумма заказа
  isActive: boolean;
}

export const categories: Category[] = [
  { id: 'all', name: 'Все', icon: () => null, color: 'var(--primary)' },
  { id: '1', name: 'Итальянская', icon: GiPizzaSlice, color: 'var(--secondary)' },
  { id: '3', name: 'Американская', icon: GiHamburger, color: 'var(--secondary)' },
  { id: '4', name: 'Японская', icon: GiSushis, color: 'var(--secondary)' },
];

export const promoBanners: PromoBanner[] = [
  {
    id: '1',
    title: 'Скидка 30%',
    description: 'На первое заказ от 500₽',
    image: '/promo1.jpg',
    discount: 30,
  },
  {
    id: '2',
    title: 'Бесплатная доставка',
    description: 'При заказе от 800₽',
    image: '/promo2.jpg',
  },
  {
    id: '3',
    title: 'Комбо обед',
    description: 'Суп + основное + напиток за 299₽',
    image: '/promo3.jpg',
  },
];

export const promoCodes: PromoCode[] = [
  {
    code: 'WELCOME20',
    discount: 20,
    discountType: 'fixed',
    description: 'Скидка 20₽ на первый заказ',
    minOrderAmount: 300,
    isActive: true,
  },
  {
    code: 'PIZZA15',
    discount: 15,
    discountType: 'percentage',
    description: 'Скидка 15% на пиццу',
    applicableCategories: ['Итальянская'],
    minOrderAmount: 500,
    isActive: true,
  },
  {
    code: 'BURGER200',
    discount: 200,
    discountType: 'fixed',
    description: 'Скидка 200₽ на бургеры',
    applicableCategories: ['Американская'],
    minOrderAmount: 800,
    isActive: true,
  },
  {
    code: 'SUSHI10',
    discount: 10,
    discountType: 'percentage',
    description: 'Скидка 10% на суши',
    applicableCategories: ['Японская'],
    minOrderAmount: 600,
    isActive: true,
  },
  {
    code: 'FIRSTORDER',
    discount: 150,
    discountType: 'fixed',
    description: 'Скидка 150₽ на первый заказ',
    minOrderAmount: 400,
    isActive: true,
  },
];

export const restaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Итальянский двор',
    image: '/images/restaurants/italian.webp',
    rating: 4.7,
    deliveryTime: '25-35 мин',
    deliveryFee: 150,
    distance: 1200, // 1.2 км
    address: 'ул. Ленина, 15',
    cuisines: ['Итальянская'],
    tags: ['пицца', 'паста', 'итальянская', 'тирамису', 'десерты'],
    isOpen: true,
    description: 'Лучшая итальянская кухня в городе с аутентичными рецептами',
  },
  {
    id: '2',
    name: 'Азиатский рай',
    image: '/images/restaurants/japan.webp',
    rating: 4.5,
    deliveryTime: '20-30 мин',
    deliveryFee: 120,
    distance: 800, // 800м
    address: 'пр. Победы, 7',
    cuisines: ['Китайская', 'Японская', 'Супа'],
    tags: ['том ям', 'супы', 'креветки', 'лайм'],
    isOpen: true,
    description: 'Широкий выбор азиатской кухни от суши до горячих блюд',
  },
  {
    id: '3',
    name: 'Бургер Хаус',
    image: '/images/restaurants/american.webp',
    rating: 4.3,
    deliveryTime: '15-25 мин',
    deliveryFee: 100,
    distance: 1500, // 1.5 км
    address: 'ул. Гагарина, 12',
    cuisines: ['Американская'],
    tags: ['американская', 'бургер', 'чизбургер', 'картофель фри'],
    isOpen: true,
    description: 'Вкусные бургеры из свежих ингредиентов',
  },
  {
    id: '4',
    name: 'Пицца Палас',
    image: '/images/restaurants/italian2.webp',
    rating: 4.6,
    deliveryTime: '30-40 мин',
    deliveryFee: 180,
    distance: 2200, // 2.2 км
    address: 'ул. Кирова, 25',
    cuisines: ['Итальянская'],
    tags: ['пицца', 'итальянская', 'маргарита', 'паста', 'карбонара'],
    isOpen: false,
    description: 'Традиционная итальянская пицца на тонком тесте',
  },
];

export const dishes: Dish[] = [
  {
    id: '1',
    name: 'Маргарита',
    description: 'Классическая пицца с томатным соусом, моцареллой и базиликом',
    price: 450,
    image: '/images/food/margarita.webp',
    category: 'Пицца',
    restaurantId: '1',
    ingredients: ['Томатный соус', 'Моцарелла', 'Базилик', 'Оливковое масло'],
    isVegetarian: true,
    isPopular: true,
    sizes: [
      { id: 'small', name: '25 см', price: 350, calories: 680 },
      { id: 'medium', name: '30 см', price: 450, calories: 920 },
      { id: 'large', name: '35 см', price: 550, calories: 1200 },
    ],
  },
  {
    id: '2',
    name: 'Карбонара',
    description: 'Спагетти с беконом, яйцом, пармезаном и чёрным перцем',
    price: 380,
    image: '/images/food/carbonara.webp',
    category: 'Паста',
    restaurantId: '1',
    ingredients: ['Спагетти', 'Бекон', 'Яйцо', 'Пармезан', 'Чёрный перец'],
    isPopular: true,
  },
  {
    id: '3',
    name: 'Чизбургер',
    description: 'Классический бургер с говяжьей котлетой и сыром',
    price: 280,
    image: '/images/food/cheesburger.jpeg',
    category: 'Бургеры',
    restaurantId: '3',
    ingredients: ['Говяжья котлета', 'Чеддер', 'Булочка', 'Салат', 'Помидор', 'Лук'],
  },
  {
    id: '10',
    name: 'Картофель фри',
    description: 'Хрустящий картофель фри с солью',
    price: 150,
    image: '/images/food/kartofelfree.webp',
    category: 'Закуски',
    restaurantId: '3',
    ingredients: ['Картофель', 'Соль', 'Масло'],
    isVegetarian: true,
  },
  {
    id: '11',
    name: 'Куриные наггетсы',
    description: 'Хрустящие куриные наггетсы с соусом барбекю',
    price: 220,
    image: '/images/food/nuggets.webp',
    category: 'Закуски',
    restaurantId: '3',
    ingredients: ['Курица', 'Панировка', 'Соус барбекю'],
  },
  {
    id: '4',
    name: 'Суши сет "Филадельфия"',
    description: 'Набор из 8 роллов Филадельфия с лососем и сливочным сыром',
    price: 650,
    image: '/images/food/margarita.webp',
    category: 'Роллы',
    restaurantId: '4',
    ingredients: ['Лосось', 'Рис', 'Нори', 'Сливочный сыр', 'Огурец'],
    isPopular: true,
  },
  {
    id: '12',
    name: 'Калифорния ролл',
    description: 'Ролл с крабом, авокадо и огурцом',
    price: 380,
    image: '/images/food/caesar.webp',
    category: 'Роллы',
    restaurantId: '4',
    ingredients: ['Краб', 'Авокадо', 'Огурец', 'Рис', 'Нори'],
    isVegetarian: true,
  },
  {
    id: '13',
    name: 'Мисо суп',
    description: 'Традиционный японский суп с тофу и водорослями',
    price: 180,
    image: '/images/food/tomyam.webp',
    category: 'Супы',
    restaurantId: '4',
    ingredients: ['Мисо паста', 'Тофу', 'Водоросли вакаме', 'Лук'],
    isVegetarian: true,
  },
  {
    id: '5',
    name: 'Том Ям',
    description: 'Острый тайский суп с креветками, грибами и лимонной травой',
    price: 420,
    image: '/images/food/tomyam.webp',
    category: 'Супы',
    restaurantId: '2',
    ingredients: ['Креветки', 'Грибы', 'Лимонная трава', 'Лайм', 'Кокосовое молоко', 'Чили'],
    isSpicy: true,
  },
  {
    id: '6',
    name: 'Тирамису',
    description: 'Классический итальянский десерт с маскарпоне и кофе',
    price: 250,
    image: '/images/food/tiramisu.webp',
    category: 'Десерты',
    restaurantId: '1',
    ingredients: ['Маскарпоне', 'Савоярди', 'Кофе', 'Какао', 'Яйцо'],
    isVegetarian: true,
  },
  {
    id: '7',
    name: 'Пепперони',
    description: 'Острая пицца с пепперони, томатным соусом и моцареллой',
    price: 480,
    image: '/images/food/peperoni.webp',
    category: 'Пицца',
    restaurantId: '1',
    ingredients: ['Томатный соус', 'Моцарелла', 'Пепперони', 'Орегано'],
    isPopular: true,
    isSpicy: true,
  },
  {
    id: '8',
    name: 'Цезарь с курицей',
    description: 'Салат с курицей, пармезаном, крутонами и соусом цезарь',
    price: 320,
    image: '/images/food/caesar.webp',
    category: 'Салаты',
    restaurantId: '1',
    ingredients: ['Курица', 'Салат ромэн', 'Пармезан', 'Крутоны', 'Соус цезарь'],
    isPopular: true,
  },
  {
    id: '9',
    name: 'Панна котта',
    description: 'Нежный итальянский десерт из сливок с ягодным соусом',
    price: 220,
    image: '/images/food/panacota.webp',
    category: 'Десерты',
    restaurantId: '1',
    ingredients: ['Сливки', 'Сахар', 'Желатин', 'Клубника', 'Малина'],
    isVegetarian: true,
  },
];

// Addons для блюд
export const dishAddons = {
  '1': [ // Маргарита
    { id: 'extra-cheese', name: 'Дополнительный сыр', price: 80, category: 'cheese' },
    { id: 'pepperoni', name: 'Пепперони', price: 120, category: 'meat' },
    { id: 'olives', name: 'Оливки', price: 60, category: 'vegetables' },
  ],
  '2': [ // Карбонара
    { id: 'extra-bacon', name: 'Дополнительный бекон', price: 100, category: 'meat' },
    { id: 'extra-egg', name: 'Дополнительное яйцо', price: 50, category: 'protein' },
    { id: 'extra-parmesan', name: 'Дополнительный пармезан', price: 70, category: 'cheese' },
  ],
  '3': [ // Чизбургер
    { id: 'bacon', name: 'Бекон', price: 80, category: 'meat' },
    { id: 'egg', name: 'Яйцо', price: 40, category: 'protein' },
    { id: 'cheese', name: 'Дополнительный сыр', price: 50, category: 'cheese' },
    { id: 'fries', name: 'Картофель фри', price: 120, category: 'side' },
  ],
  '4': [ // Суши сет
    { id: 'wasabi', name: 'Васаби', price: 30, category: 'condiment' },
    { id: 'ginger', name: 'Имбирь', price: 30, category: 'condiment' },
    { id: 'soy-sauce', name: 'Соевый соус', price: 50, category: 'sauce' },
  ],
  '5': [ // Том Ям
    { id: 'extra-shrimp', name: 'Дополнительные креветки', price: 150, category: 'protein' },
    { id: 'coconut-milk', name: 'Кокосовое молоко', price: 80, category: 'sauce' },
    { id: 'rice', name: 'Рис', price: 60, category: 'side' },
  ],
  '6': [ // Тирамису
    { id: 'chocolate', name: 'Шоколадная крошка', price: 40, category: 'topping' },
    { id: 'berries', name: 'Свежие ягоды', price: 80, category: 'topping' },
  ],
};

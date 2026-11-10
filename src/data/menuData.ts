import { MenuItem, BranchLocation } from '../types/restaurant';

// High-fidelity image assets generated for CHIKEN - bundled via Vite for hosting compatibility
import ASSET_BUCKET from '../assets/images/hero_chiken_bucket_1794243328708.jpg';
import ASSET_BURGER from '../assets/images/chiken_double_burger_1794243329781.jpg';
import ASSET_CRUNCH_BOX from '../assets/images/chiken_crunch_box_1794243329759.jpg';
import ASSET_TENDERS from '../assets/images/chiken_golden_tenders_1794243330789.jpg';
import ASSET_LOADED_FRIES from '../assets/images/chiken_loaded_fries_1794243330616.jpg';
import ASSET_FLYING_DRUMSTICK from '../assets/images/flying_crispy_drumstick_1794244082690.jpg';
import ASSET_FLYING_FRIES from '../assets/images/flying_golden_fries_1794244082780.jpg';
import ASSET_SERVING_PLATTER from '../assets/images/black_red_serving_platter_1794244526535.jpg';
import ASSET_CRISPY_THIGH from '../assets/images/crispy_fried_thigh_1794244528608.jpg';
import ASSET_CRISPY_WING from '../assets/images/crispy_fried_wing_1794244528659.jpg';

export {
  ASSET_BUCKET,
  ASSET_BURGER,
  ASSET_CRUNCH_BOX,
  ASSET_TENDERS,
  ASSET_LOADED_FRIES,
  ASSET_FLYING_DRUMSTICK,
  ASSET_FLYING_FRIES,
  ASSET_SERVING_PLATTER,
  ASSET_CRISPY_THIGH,
  ASSET_CRISPY_WING,
};

export const CATEGORIES = [
  { id: 'boxes', label: 'CHIKEN BOXES', description: 'Ultimate feast combos for solo or group cravings' },
  { id: 'burgers', label: 'BURGERS', description: 'Double fillet brioche towers with signature drips' },
  { id: 'meals', label: 'CHIKEN MEALS', description: 'Signature crispy pieces, tenders, and spiced rice' },
  { id: 'sides', label: 'SIDES', description: 'Golden crinkles, loaded fries, onion rings, and slaw' },
  { id: 'sauces', label: 'SAUCES', description: 'House crafted artisan dips made daily' },
  { id: 'drinks', label: 'DRINKS', description: 'Ice cold refreshments, mocktails, and sodas' },
] as const;

export const MENU_ITEMS: MenuItem[] = [
  // 1. THE CRUNCH BOX (Signature Product #1)
  {
    id: 'crunch-box',
    name: 'THE CRUNCH BOX',
    category: 'boxes',
    description: 'The heavyweight champ: 3 crispy bone-in chicken pieces, 2 golden tenders, seasoned crinkle fries, creamy coleslaw, toasted brioche bun & 2 signature dips.',
    price: 265,
    image: ASSET_CRUNCH_BOX,
    badge: 'CHEF SIGNATURE',
    isSignature: true,
    spiciness: 2,
    calories: 1140,
    pieces: '3 Pcs + 2 Tenders + Fries + Slaw + Bun',
    includedDips: ['Signature CHIKEN Dip', 'Garlic Mayo Crush'],
  },

  // 2. DOUBLE CHIKEN BURGER (Signature Product #2)
  {
    id: 'double-chiken-burger',
    name: 'DOUBLE CHIKEN BURGER',
    category: 'burgers',
    description: 'Two massive buttermilk-dredged chicken breast fillets stacked with double molten cheddar, jalapeño coins, crisp shredded iceberg & hot fire mayo in a toasted glossy brioche bun.',
    price: 225,
    image: ASSET_BURGER,
    badge: 'BEST SELLER',
    isSignature: true,
    spiciness: 2,
    calories: 980,
    pieces: '2x 150g Breast Fillets',
    includedDips: ['Signature Red Sauce'],
  },

  // 3. GOLDEN TENDERS (Signature Product #3)
  {
    id: 'golden-tenders',
    name: 'GOLDEN TENDERS',
    category: 'meals',
    description: '5 jumbo whole chicken breast tenderloins, 24-hour buttermilk soaked, double floured for maximum jagged crunch. Served with honey mustard & golden fries.',
    price: 185,
    image: ASSET_TENDERS,
    badge: 'FAN FAVORITE',
    isSignature: true,
    spiciness: 1,
    calories: 760,
    pieces: '5 Jumbo Tenders + Fries',
    includedDips: ['Golden Honey Mustard'],
  },

  // 4. SPICY CHIKEN MEAL (Signature Product #4)
  {
    id: 'spicy-chiken-meal',
    name: 'SPICY CHIKEN MEAL',
    category: 'meals',
    description: '3 pieces of spicy golden fried chicken dusted with our ghost chili spice blend, accompanied by spiced yellow rice, garlic whip, and warm buttered bun.',
    price: 210,
    image: ASSET_CRUNCH_BOX,
    badge: 'HOT & SPICY',
    isSignature: true,
    spiciness: 3,
    calories: 890,
    pieces: '3 Bone-in Pcs + Rice + Bun',
    includedDips: ['Garlic Mayo Crush'],
  },

  // 5. CLASSIC CHIKEN BUCKET (Signature Product #5)
  {
    id: 'classic-chiken-bucket',
    name: 'CLASSIC CHIKEN BUCKET',
    category: 'boxes',
    description: 'The iconic CHIKEN red bucket packed with 9 succulent drumsticks and thighs, 2 family-size seasoned fries, large coleslaw, 4 warm buns, and 4 artisan dipping sauces.',
    price: 495,
    image: ASSET_BUCKET,
    badge: 'FEAST FOR 3-4',
    isSignature: true,
    spiciness: 1,
    calories: 2280,
    pieces: '9 Pcs Chicken + 2 Family Fries + 4 Buns',
    includedDips: ['Signature Dip', 'Smoky Hickory BBQ', 'Garlic Mayo', 'Honey Mustard'],
  },

  // 6. LOADED FRIES (Signature Product #6)
  {
    id: 'loaded-fries',
    name: 'LOADED FRIES',
    category: 'sides',
    description: 'Crisp hand-cut golden fries piled high with chopped crispy chicken bites, piping hot molten cheddar sauce, pickled jalapeño slices, and smoky hickory barbecue drizzle.',
    price: 145,
    image: ASSET_LOADED_FRIES,
    badge: 'MUST TRY',
    isSignature: true,
    spiciness: 2,
    calories: 720,
    pieces: 'Sharable Basket (400g)',
    includedDips: ['Liquid Cheddar', 'Smoky BBQ'],
  },

  // Extra Burgers
  {
    id: 'truffle-royale-burger',
    name: 'TRUFFLE ROYALE BURGER',
    category: 'burgers',
    description: 'Crispy fried chicken breast fillet glazed in black truffle aioli, melted aged Swiss cheese, and fresh baby arugula in a butter-toasted brioche.',
    price: 240,
    image: ASSET_BURGER,
    badge: 'GOURMET',
    spiciness: 0,
    calories: 890,
    pieces: '1x 160g Breast Fillet',
  },
  {
    id: 'original-chiken-sandwich',
    name: 'ORIGINAL CHIKEN SANDWICH',
    category: 'burgers',
    description: 'The purist standard: thick crispy chicken fillet, thick cut crinkle dill pickles, and house secret CHIKEN mayo on toasted potato bun.',
    price: 175,
    image: ASSET_BURGER,
    spiciness: 1,
    calories: 680,
    pieces: '1x 140g Breast Fillet',
  },

  // Extra Boxes
  {
    id: 'mega-party-bucket',
    name: 'MEGA PARTY BUCKET',
    category: 'boxes',
    description: '15 golden fried chicken pieces, 6 chicken tenders, 3 family fries, 2 large slaws, 6 warm brioche buns, and 6 assorted dipping sauces.',
    price: 740,
    image: ASSET_BUCKET,
    badge: 'PARTY PACK',
    spiciness: 2,
    calories: 3850,
    pieces: '15 Pcs + 6 Tenders + 3 Large Fries',
  },
  {
    id: 'solo-crunch-box',
    name: 'SOLO CRUNCH BOX',
    category: 'boxes',
    description: '2 crispy drumsticks or thighs, regular seasoned fries, fresh coleslaw, bun, and cold Coca-Cola 330ml.',
    price: 165,
    image: ASSET_CRUNCH_BOX,
    spiciness: 1,
    calories: 780,
    pieces: '2 Pcs + Fries + Drink',
  },

  // Extra Meals
  {
    id: 'chiken-waffles-platter',
    name: 'CHIKEN & WAFFLES PLATTER',
    category: 'meals',
    description: '3 golden chicken tenders served over a crisp Belgian pearl sugar waffle with hot spiced honey drizzle and whipped butter.',
    price: 230,
    image: ASSET_TENDERS,
    badge: 'SWEET & SAVORY',
    spiciness: 1,
    calories: 910,
  },
  {
    id: 'spicy-crispy-wings',
    name: '8PC CRISPY WINGS MEAL',
    category: 'meals',
    description: '8 jumbo crispy wings tossed in buffalo hot glaze with celery sticks, blue cheese dip, and seasoned crinkle fries.',
    price: 195,
    image: ASSET_CRUNCH_BOX,
    spiciness: 3,
    calories: 840,
  },

  // Extra Sides
  {
    id: 'golden-crinkle-fries',
    name: 'SEASONED CRINKLE FRIES',
    category: 'sides',
    description: 'Crispy zigzag crinkle-cut potatoes tossed in CHIKEN signature 14-spice seasoning blend.',
    price: 60,
    image: ASSET_LOADED_FRIES,
    spiciness: 1,
    calories: 380,
  },
  {
    id: 'creamy-coleslaw',
    name: 'SIGNATURE CREAMY SLAW',
    category: 'sides',
    description: 'Shredded crisp green & purple cabbage and sweet carrots in our velvety buttermilk sweet dressing.',
    price: 45,
    image: ASSET_CRUNCH_BOX,
    spiciness: 0,
    calories: 160,
  },
  {
    id: 'cheddar-jalapeno-poppers',
    name: 'CHEDDAR JALAPEÑO BITES',
    category: 'sides',
    description: '6 molten cheddar stuffed jalapeño croquettes fried in panko crust with garlic mayo dip.',
    price: 85,
    image: ASSET_LOADED_FRIES,
    spiciness: 2,
    calories: 420,
  },

  // Sauces
  {
    id: 'sauce-signature',
    name: 'SIGNATURE CHIKEN SAUCE',
    category: 'sauces',
    description: 'The legendary recipe: smoked paprika, cracked black peppercorn, garlic whip, and secret aromatics.',
    price: 25,
    image: ASSET_TENDERS,
    spiciness: 1,
    calories: 110,
  },
  {
    id: 'sauce-honey-mustard',
    name: 'GOLDEN HONEY MUSTARD',
    category: 'sauces',
    description: 'Clover honey blended with coarse Dijon mustard seeds, creamy vinegar finish.',
    price: 25,
    image: ASSET_TENDERS,
    spiciness: 0,
    calories: 95,
  },
  {
    id: 'sauce-garlic-mayo',
    name: 'GARLIC MAYO CRUSH',
    category: 'sauces',
    description: 'Slow-roasted garlic confit folded into luscious whipped egg yolk mayonnaise.',
    price: 25,
    image: ASSET_TENDERS,
    spiciness: 0,
    calories: 120,
  },
  {
    id: 'sauce-fire-ghost',
    name: 'GHOST FIRE HOT SAUCE',
    category: 'sauces',
    description: 'Infused with roasted habanero and bhut jolokia ghost chilies for a slow building volcanic burn.',
    price: 25,
    image: ASSET_TENDERS,
    badge: 'EXTRA HOT',
    spiciness: 3,
    calories: 45,
  },

  // Drinks
  {
    id: 'drink-lemon-crush',
    name: 'CHIKEN LEMON MINT CRUSH',
    category: 'drinks',
    description: 'Freshly squeezed Egyptian lemons blended with crushed spearmint and sparkling sugarcane syrup.',
    price: 55,
    image: ASSET_CRUNCH_BOX,
    badge: 'REFRESHING',
    calories: 140,
  },
  {
    id: 'drink-berry-cooler',
    name: 'WILD BERRY FIZZ',
    category: 'drinks',
    description: 'Muddled blackberries, raspberries, and pomegranate topped with ice cold club soda and lime.',
    price: 60,
    image: ASSET_CRUNCH_BOX,
    calories: 130,
  },
  {
    id: 'drink-coca-cola',
    name: 'COCA-COLA ORIGINAL 330ML',
    category: 'drinks',
    description: 'Served ice cold with lemon slice upon request.',
    price: 30,
    image: ASSET_CRUNCH_BOX,
    calories: 139,
  },
  {
    id: 'drink-coca-cola-zero',
    name: 'COCA-COLA ZERO 330ML',
    category: 'drinks',
    description: 'Zero sugar, zero calories, maximum refreshment.',
    price: 30,
    image: ASSET_CRUNCH_BOX,
    calories: 0,
  },
];

export const BRANCHES: BranchLocation[] = [
  {
    id: 'new-cairo',
    name: 'New Cairo Flagship',
    area: '5th Settlement',
    address: 'South 90th Street, The Spot Mall Complex, Cairo',
    phone: '02 2810 5901',
    hours: '11:00 AM - 02:30 AM',
    dineIn: true,
    driveThru: true,
    delivery: true,
  },
  {
    id: 'zamalek',
    name: 'Zamalek Downtown',
    area: 'Zamalek',
    address: '26th of July Corridor, Near Brazil Street, Cairo',
    phone: '02 2736 4412',
    hours: '11:00 AM - 03:00 AM',
    dineIn: true,
    driveThru: false,
    delivery: true,
  },
  {
    id: 'sheikh-zayed',
    name: 'Sheikh Zayed Plaza',
    area: 'West Cairo',
    address: 'Capital Promenade, Opposite Arkan Plaza, Sheikh Zayed',
    phone: '02 3851 9920',
    hours: '11:00 AM - 02:00 AM',
    dineIn: true,
    driveThru: true,
    delivery: true,
  },
  {
    id: 'maadi',
    name: 'Maadi Degla',
    area: 'South Cairo',
    address: 'Street 233, Degla Landmark Square, Maadi',
    phone: '02 2521 8830',
    hours: '11:00 AM - 02:00 AM',
    dineIn: true,
    driveThru: false,
    delivery: true,
  },
  {
    id: 'alex-stanly',
    name: 'Alexandria Stanly Waterfront',
    area: 'Corniche Alexandria',
    address: 'El Geish Road, Facing Stanly Bridge, Alexandria',
    phone: '03 5431 1009',
    hours: '12:00 PM - 03:00 AM',
    dineIn: true,
    driveThru: true,
    delivery: true,
  },
];

export const PROMO_OFFERS = [
  {
    id: 'promo-1',
    code: 'CRUNCH25',
    title: 'WEEKEND CRUNCH FEAST',
    subtitle: 'Save 25% on orders above 400 EGP',
    discountPercent: 25,
    minOrder: 400,
    validUntil: 'Every Fri & Sat',
    tag: 'LIMITED DEAL',
  },
  {
    id: 'promo-2',
    code: 'FREEDELIVERY',
    title: 'FREE EXPRESS HOT DELIVERY',
    subtitle: 'On all orders above 350 EGP',
    discountAmount: 40,
    minOrder: 350,
    validUntil: 'All Week Long',
    tag: 'FREE DELIVERY',
  },
  {
    id: 'promo-3',
    code: 'DOUBLEUP',
    title: 'DUO BURGER COMBO',
    subtitle: 'Get 2 Double CHIKEN Burgers + Loaded Fries for only 499 EGP',
    dealPrice: 499,
    originalPrice: 595,
    validUntil: 'Daily after 6 PM',
    tag: 'COMBO SAVER',
  },
];

export type CategoryType = 'boxes' | 'burgers' | 'meals' | 'sides' | 'sauces' | 'drinks';

export interface MenuItem {
  id: string;
  name: string;
  category: CategoryType;
  description: string;
  price: number; // in EGP
  image: string;
  badge?: string;
  isSignature?: boolean;
  spiciness?: 0 | 1 | 2 | 3; // 0: None, 1: Mild, 2: Hot, 3: Ghost
  calories?: number;
  pieces?: string;
  includedDips?: string[];
}

export interface CartItem {
  id: string; // unique item instance id
  item: MenuItem;
  quantity: number;
  spiceLevel?: 'Mild' | 'Hot' | 'Ghost Spicy';
  selectedSauce?: string;
  specialInstructions?: string;
}

export interface BranchLocation {
  id: string;
  name: string;
  area: string;
  address: string;
  phone: string;
  hours: string;
  dineIn: boolean;
  driveThru: boolean;
  delivery: boolean;
}

export interface OrderData {
  orderId: string;
  customerName: string;
  phone: string;
  address: string;
  area: string;
  orderType: 'delivery' | 'pickup';
  paymentMethod: 'cash' | 'card_on_delivery';
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  notes?: string;
  createdAt: string;
  status: 'received' | 'cooking' | 'quality_check' | 'on_the_way' | 'delivered';
}

export type MenuCategory = 
  | 'hot_coffee' 
  | 'cold_coffee' 
  | 'frappes' 
  | 'indian_coffee' 
  | 'signature' 
  | 'bakery_snacks';

export type MilkOption = 'Whole Milk' | 'Oat Milk (+₹35)' | 'Almond Milk (+₹35)' | 'Soy Milk (+₹30)' | 'Toned Milk' | 'No Milk (Black)';
export type SweetnessLevel = 0 | 25 | 50 | 75 | 100;
export type TemperatureOption = 'Hot' | 'Iced' | 'Extra Hot';
export type IceLevel = 'None' | 'Less Ice' | 'Regular' | 'Extra Ice';
export type EspressoRoast = 'Chikmagalur Dark Roast' | 'Estate Medium Roast' | 'Monsooned Malabar' | 'Decaf';
export type CupSize = 'Regular (240ml)' | 'Large (360ml) (+₹30)';

export interface CustomizationOptions {
  size: CupSize;
  milk: string;
  sweetness: SweetnessLevel;
  temperature: TemperatureOption;
  iceLevel: IceLevel;
  shots: number;
  roast: EspressoRoast;
  syrups: string[];
  toppings: string[];
  specialInstructions?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  description: string;
  price: number; // in INR (₹)
  image: string;
  calories?: number;
  tags?: string[];
  isCustomizable: boolean;
  prepTimeMinutes: number;
  popular?: boolean;
  temperatureType: 'hot' | 'cold' | 'both';
  dietary?: ('Vegetarian' | 'Vegan' | 'Gluten-Free')[];
}

export interface ComboOffer {
  id: string;
  name: string;
  tagline: string;
  description: string;
  itemsIncluded: string[];
  regularPrice: number; // in INR
  comboPrice: number; // in INR
  savings: number; // regularPrice - comboPrice
  image: string;
  popular?: boolean;
  categoryTag?: 'Quick Bite' | 'For Two' | 'Sweet Pair' | 'Indian Classic';
}

export interface CartItem {
  cartItemId: string;
  menuItemId: string;
  name: string;
  basePrice: number;
  finalPrice: number;
  quantity: number;
  image: string;
  customization?: CustomizationOptions;
  isCombo?: boolean;
  comboDetails?: {
    items: string[];
  };
}

export type OrderType = 'dine_in' | 'takeaway';
export type OrderStatus = 'received' | 'brewing' | 'ready' | 'completed';

export interface CouponRule {
  code: string;
  discountType: 'percentage' | 'flat';
  value: number; // percentage (10) or flat (20)
  minOrderValue: number;
  maxDiscount?: number;
  description: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: CartItem[];
  orderType: OrderType;
  tableNumber?: string;
  pickupTimeLabel: string;
  subtotal: number;
  discountAmount: number;
  appliedCoupon?: string;
  tax: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
  customerName: string;
  paymentMethod: string;
}

export interface LoyaltyProfile {
  pointsBalance: number;
  punches: number; // 0 to 5
  completedOrdersCount: number;
  studentVerified: boolean;
  studentCollege?: string;
}

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  CartItem,
  MenuItem,
  CustomizationOptions,
  Order,
  OrderStatus,
  OrderType,
  ComboOffer,
  CouponRule,
  LoyaltyProfile
} from '../types/coffee';
import { VALID_COUPONS } from '../data/coffeeData';
import confetti from 'canvas-confetti';

interface CoffeeContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'cartItemId'>) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;

  orderType: OrderType;
  setOrderType: (type: OrderType) => void;
  tableNumber: string;
  setTableNumber: (num: string) => void;
  pickupTime: string;
  setPickupTime: (time: string) => void;

  // Coupon handling
  appliedCoupon: CouponRule | null;
  couponError: string | null;
  applyCouponCode: (code: string) => boolean;
  removeCoupon: () => void;

  // Student perk
  studentVerified: boolean;
  setStudentVerified: (verified: boolean) => void;

  // Orders
  orders: Order[];
  activeOrder: Order | null;
  setActiveOrder: (order: Order | null) => void;
  createOrder: (customerName: string, paymentMethod: string) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;

  // UI state
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isOrderTrackerOpen: boolean;
  setIsOrderTrackerOpen: (open: boolean) => void;
  isBaristaModalOpen: boolean;
  setIsBaristaModalOpen: (open: boolean) => void;

  // Customizer
  customizingDrink: MenuItem | null;
  customizingPreset?: Partial<CustomizationOptions>;
  openCustomizer: (drink: MenuItem, preset?: Partial<CustomizationOptions>) => void;
  closeCustomizer: () => void;
  quickAddCombo: (combo: ComboOffer) => void;
  quickAddDrink: (drink: MenuItem) => void;
}

const CoffeeContext = createContext<CoffeeContextType | undefined>(undefined);

const STORAGE_KEYS = {
  CART: 'brewco_india_cart_v2',
  ORDERS: 'brewco_india_orders_v2',
  STUDENT: 'brewco_india_student_v2'
};

export const CoffeeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Ordering mode
  const [orderType, setOrderType] = useState<OrderType>('dine_in');
  const [tableNumber, setTableNumber] = useState<string>('04');
  const [pickupTime, setPickupTime] = useState<string>('ASAP (5–7 mins)');

  // Coupon
  const [appliedCoupon, setAppliedCoupon] = useState<CouponRule | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);

  // Student verification
  const [studentVerified, setStudentVerifiedState] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.STUDENT) === 'true';
    } catch {
      return false;
    }
  });

  const setStudentVerified = (verified: boolean) => {
    setStudentVerifiedState(verified);
    try {
      localStorage.setItem(STORAGE_KEYS.STUDENT, String(verified));
    } catch {
      // ignore
    }
  };

  // Orders list
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return saved ? JSON.parse(saved) : [
        {
          id: 'ord-in-1',
          orderNumber: '#BC-104',
          items: [
            {
              cartItemId: 'mock-1',
              menuItemId: 'cappuccino',
              name: 'Cappuccino',
              basePrice: 139,
              finalPrice: 139,
              quantity: 1,
              image: '/src/assets/images/hot_cappuccino_ceramic_1792050880529.jpg'
            },
            {
              cartItemId: 'mock-2',
              menuItemId: 'choco-chip-cookie',
              name: 'Handcrafted Choco-Chip Cookie',
              basePrice: 69,
              finalPrice: 69,
              quantity: 1,
              image: '/src/assets/images/combo_student_crunch_1792049381048.jpg'
            }
          ],
          orderType: 'dine_in',
          tableNumber: '04',
          pickupTimeLabel: 'Table #04 Delivery',
          subtotal: 208,
          discountAmount: 20,
          appliedCoupon: 'COFFEE20',
          tax: 9.40,
          total: 197.40,
          status: 'ready',
          createdAt: '10 mins ago',
          customerName: 'Aarav Sharma',
          paymentMethod: 'UPI (PhonePe)'
        }
      ];
    } catch {
      return [];
    }
  });

  const [activeOrder, setActiveOrder] = useState<Order | null>(null);

  // UI Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrderTrackerOpen, setIsOrderTrackerOpen] = useState(false);
  const [isBaristaModalOpen, setIsBaristaModalOpen] = useState(false);

  // Customizer
  const [customizingDrink, setCustomizingDrink] = useState<MenuItem | null>(null);
  const [customizingPreset, setCustomizingPreset] = useState<Partial<CustomizationOptions> | undefined>(undefined);

  // Persistence
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
  }, [orders]);

  const addToCart = (item: Omit<CartItem, 'cartItemId'>) => {
    const newItem: CartItem = {
      ...item,
      cartItemId: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`
    };
    setCart(prev => [...prev, newItem]);
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
    setCouponError(null);
  };

  const applyCouponCode = (rawCode: string): boolean => {
    const code = rawCode.trim().toUpperCase();
    const subtotal = cart.reduce((sum, item) => sum + item.finalPrice * item.quantity, 0);

    const rule = VALID_COUPONS.find(c => c.code === code);
    if (!rule) {
      setCouponError(`Invalid coupon code "${rawCode}". Try WELCOME10, COFFEE20, or BREWDUO.`);
      return false;
    }

    if (subtotal < rule.minOrderValue) {
      setCouponError(`Coupon ${rule.code} requires a minimum order of ₹${rule.minOrderValue}. Your current subtotal is ₹${subtotal}.`);
      return false;
    }

    setAppliedCoupon(rule);
    setCouponError(null);
    try {
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
    } catch {
      // ignore
    }
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponError(null);
  };

  const openCustomizer = (drink: MenuItem, preset?: Partial<CustomizationOptions>) => {
    setCustomizingDrink(drink);
    setCustomizingPreset(preset);
  };

  const closeCustomizer = () => {
    setCustomizingDrink(null);
    setCustomizingPreset(undefined);
  };

  const quickAddDrink = (drink: MenuItem) => {
    addToCart({
      menuItemId: drink.id,
      name: drink.name,
      basePrice: drink.price,
      finalPrice: drink.price,
      quantity: 1,
      image: drink.image,
      customization: drink.isCustomizable ? {
        size: 'Regular (240ml)',
        milk: 'Whole Milk',
        sweetness: 50,
        temperature: drink.temperatureType === 'cold' ? 'Iced' : 'Hot',
        iceLevel: 'Regular',
        shots: 1,
        roast: 'Chikmagalur Dark Roast',
        syrups: [],
        toppings: []
      } : undefined
    });
  };

  const quickAddCombo = (combo: ComboOffer) => {
    addToCart({
      menuItemId: combo.id,
      name: combo.name,
      basePrice: combo.regularPrice,
      finalPrice: combo.comboPrice,
      quantity: 1,
      image: combo.image,
      isCombo: true,
      comboDetails: {
        items: combo.itemsIncluded
      }
    });
  };

  const createOrder = (customerName: string, paymentMethod: string): Order => {
    const rawSubtotal = cart.reduce((acc, item) => acc + item.finalPrice * item.quantity, 0);
    
    // Calculate valid discount
    let discountAmount = 0;
    if (appliedCoupon) {
      if (appliedCoupon.discountType === 'percentage') {
        const calculated = (rawSubtotal * appliedCoupon.value) / 100;
        discountAmount = appliedCoupon.maxDiscount ? Math.min(calculated, appliedCoupon.maxDiscount) : calculated;
      } else {
        discountAmount = appliedCoupon.value;
      }
    }

    // Optional student pass discount (flat ₹20 off if student verified)
    if (studentVerified && discountAmount === 0 && rawSubtotal >= 150) {
      discountAmount = 20;
    }

    const discountedSubtotal = Math.max(0, rawSubtotal - discountAmount);
    // Standard Indian restaurant GST (5%)
    const tax = Number((discountedSubtotal * 0.05).toFixed(2));
    const total = Number((discountedSubtotal + tax).toFixed(2));

    const orderNum = `#BC-${Math.floor(100 + Math.random() * 900)}`;

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: orderNum,
      items: [...cart],
      orderType,
      tableNumber: orderType === 'dine_in' ? tableNumber : undefined,
      pickupTimeLabel: orderType === 'dine_in' ? `Table #${tableNumber} Delivery` : pickupTime,
      subtotal: rawSubtotal,
      discountAmount: Number(discountAmount.toFixed(2)),
      appliedCoupon: appliedCoupon?.code,
      tax,
      total,
      status: 'received',
      createdAt: 'Just now',
      customerName: customerName.trim() || 'Guest',
      paymentMethod
    };

    setOrders(prev => [newOrder, ...prev]);
    setActiveOrder(newOrder);
    clearCart();
    setIsCartOpen(false);
    setIsOrderTrackerOpen(true);

    try {
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    } catch {
      // ignore
    }

    // Realistic Barista workflow simulation
    setTimeout(() => {
      setOrders(current => current.map(o => o.id === newOrder.id ? { ...o, status: 'brewing' } : o));
      setActiveOrder(curr => curr && curr.id === newOrder.id ? { ...curr, status: 'brewing' } : curr);
    }, 4000);

    setTimeout(() => {
      setOrders(current => current.map(o => o.id === newOrder.id ? { ...o, status: 'ready' } : o));
      setActiveOrder(curr => curr && curr.id === newOrder.id ? { ...curr, status: 'ready' } : curr);
    }, 9000);

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
    setActiveOrder(curr => curr && curr.id === orderId ? { ...curr, status } : curr);
  };

  return (
    <CoffeeContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        orderType,
        setOrderType,
        tableNumber,
        setTableNumber,
        pickupTime,
        setPickupTime,
        appliedCoupon,
        couponError,
        applyCouponCode,
        removeCoupon,
        studentVerified,
        setStudentVerified,
        orders,
        activeOrder,
        setActiveOrder,
        createOrder,
        updateOrderStatus,
        isCartOpen,
        setIsCartOpen,
        isOrderTrackerOpen,
        setIsOrderTrackerOpen,
        isBaristaModalOpen,
        setIsBaristaModalOpen,
        customizingDrink,
        customizingPreset,
        openCustomizer,
        closeCustomizer,
        quickAddCombo,
        quickAddDrink
      }}
    >
      {children}
    </CoffeeContext.Provider>
  );
};

export const useCoffee = () => {
  const context = useContext(CoffeeContext);
  if (!context) {
    throw new Error('useCoffee must be used within a CoffeeProvider');
  }
  return context;
};

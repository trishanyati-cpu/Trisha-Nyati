import React, { useState } from 'react';
import { useCoffee } from '../context/CoffeeContext';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Clock,
  Tag,
  CheckCircle2,
  GraduationCap,
  QrCode
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isCartOpen,
    setIsCartOpen,
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
    createOrder
  } = useCoffee();

  const [customerName, setCustomerName] = useState('Aarav Sharma');
  const [couponInput, setCouponInput] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cash'>('upi');

  if (!isCartOpen) return null;

  // Calculations in ₹
  const subtotal = cart.reduce((sum, item) => sum + item.finalPrice * item.quantity, 0);

  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'percentage') {
      const calculated = (subtotal * appliedCoupon.value) / 100;
      discountAmount = appliedCoupon.maxDiscount ? Math.min(calculated, appliedCoupon.maxDiscount) : calculated;
    } else {
      discountAmount = appliedCoupon.value;
    }
  }

  // Student pass discount (flat ₹20 off if order >= ₹150 when no other coupon is used)
  if (studentVerified && discountAmount === 0 && subtotal >= 150) {
    discountAmount = 20;
  }

  const discountedSubtotal = Math.max(0, subtotal - discountAmount);
  const tax = Number((discountedSubtotal * 0.05).toFixed(2)); // 5% café GST
  const total = Number((discountedSubtotal + tax).toFixed(2));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const ok = applyCouponCode(couponInput);
    if (ok) setCouponInput('');
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    createOrder(customerName, paymentMethod === 'upi' ? 'UPI (GPay / PhonePe)' : paymentMethod === 'card' ? 'Debit/Credit Card' : 'Cash at Counter');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#2B1D18]/70 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-lg bg-[#F7F1E8] h-full shadow-2xl flex flex-col border-l border-[#4A2F24]/20 animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 bg-white border-b border-[#4A2F24]/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#2B1D18] text-[#F7F1E8] flex items-center justify-center font-bold">
              <ShoppingBag className="w-4 h-4 text-[#C58B5A]" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold text-[#2B1D18]">Your Café Bag</h2>
              <div className="text-[11px] text-[#4A2F24]/60 font-mono">
                {cart.length} {cart.length === 1 ? 'item' : 'items'} in order
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-lg text-[#4A2F24]/60 hover:text-[#2B1D18] hover:bg-[#F7F1E8] transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5 text-xs">
          
          {/* Order Fulfilment Mode */}
          <div className="bg-white p-3.5 rounded-xl border border-[#4A2F24]/12 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-[#2B1D18] uppercase tracking-wide">
                Dining Preference
              </span>
              <span className="text-[11px] text-[#C58B5A] font-medium">
                Indiranagar Café
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setOrderType('dine_in')}
                className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  orderType === 'dine_in'
                    ? 'border-[#2B1D18] bg-[#2B1D18] text-white shadow-xs'
                    : 'border-[#4A2F24]/15 bg-white text-[#4A2F24] hover:bg-[#FAF6F0]'
                }`}
              >
                <span>☕ Dine-In Table</span>
              </button>

              <button
                type="button"
                onClick={() => setOrderType('takeaway')}
                className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  orderType === 'takeaway'
                    ? 'border-[#2B1D18] bg-[#2B1D18] text-white shadow-xs'
                    : 'border-[#4A2F24]/15 bg-white text-[#4A2F24] hover:bg-[#FAF6F0]'
                }`}
              >
                <Clock className="w-3.5 h-3.5 text-[#C58B5A]" />
                <span>Takeaway Pickup</span>
              </button>
            </div>

            {orderType === 'dine_in' ? (
              <div className="pt-2 border-t border-[#4A2F24]/10 flex items-center justify-between">
                <span className="text-[#4A2F24]/70">Table Number in Café:</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[#4A2F24]/50 font-mono">Table #</span>
                  <input
                    type="text"
                    value={tableNumber}
                    onChange={e => setTableNumber(e.target.value)}
                    className="w-14 text-center font-mono font-bold bg-[#F7F1E8] border border-[#4A2F24]/15 rounded px-1.5 py-0.5 text-xs text-[#2B1D18]"
                    maxLength={3}
                  />
                </div>
              </div>
            ) : (
              <div className="pt-2 border-t border-[#4A2F24]/10 flex items-center justify-between">
                <span className="text-[#4A2F24]/70">Pickup Timing:</span>
                <select
                  value={pickupTime}
                  onChange={e => setPickupTime(e.target.value)}
                  className="bg-[#F7F1E8] border border-[#4A2F24]/15 rounded-md px-2 py-1 text-xs font-medium text-[#2B1D18]"
                >
                  <option value="ASAP (5–7 mins)">ASAP (5–7 mins)</option>
                  <option value="In 15 mins">In 15 mins</option>
                  <option value="In 30 mins">In 30 mins</option>
                </select>
              </div>
            )}
          </div>

          {/* Cart Items List */}
          {cart.length === 0 ? (
            <div className="py-12 text-center bg-white rounded-xl border border-[#4A2F24]/15 p-6">
              <ShoppingBag className="w-8 h-8 mx-auto text-[#4A2F24]/30 mb-2" />
              <p className="text-sm font-semibold text-[#2B1D18]">Your café bag is empty</p>
              <p className="text-xs text-[#4A2F24]/60 mt-1">
                Choose a warm espresso, chilled cold coffee, or combo deal.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-4 px-4 py-2 text-xs font-semibold text-[#2B1D18] bg-[#F7F1E8] hover:bg-white rounded-lg border border-[#4A2F24]/15 cursor-pointer transition-colors"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map(item => (
                <div
                  key={item.cartItemId}
                  className="bg-white p-3.5 rounded-xl border border-[#4A2F24]/12 flex gap-3 items-start"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 rounded-lg object-cover bg-[#F7F1E8] shrink-0"
                    referrerPolicy="no-referrer"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-bold text-[#2B1D18] truncate">
                        {item.name}
                      </h4>
                      <span className="font-mono text-xs font-bold text-[#2B1D18] shrink-0">
                        ₹{(item.finalPrice * item.quantity).toFixed(0)}
                      </span>
                    </div>

                    {/* Combo inclusions */}
                    {item.isCombo && item.comboDetails && (
                      <div className="text-[10px] text-[#4A2F24]/70 mt-0.5 space-y-0.5">
                        {item.comboDetails.items.map((it, idx) => (
                          <div key={idx}>&bull; {it}</div>
                        ))}
                      </div>
                    )}

                    {/* Customization Details */}
                    {item.customization && (
                      <div className="text-[10px] text-[#4A2F24]/60 mt-0.5 space-y-0.5 leading-tight">
                        <div>
                          {item.customization.size.split(' ')[0]} &bull; {item.customization.temperature} &bull; {item.customization.milk}
                        </div>
                        <div>
                          {item.customization.sweetness}% Sweet &bull; {item.customization.shots} {item.customization.shots === 1 ? 'Shot' : 'Shots'}
                        </div>
                        {item.customization.syrups.length > 0 && (
                          <div>Syrups: {item.customization.syrups.join(', ')}</div>
                        )}
                        {item.customization.toppings.length > 0 && (
                          <div>Toppings: {item.customization.toppings.join(', ')}</div>
                        )}
                        {item.customization.specialInstructions && (
                          <div className="italic text-[#C58B5A]">&ldquo;{item.customization.specialInstructions}&rdquo;</div>
                        )}
                      </div>
                    )}

                    {/* Quantity Stepper */}
                    <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-[#4A2F24]/10">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.cartItemId, -1)}
                          className="w-6 h-6 rounded bg-[#F7F1E8] hover:bg-white flex items-center justify-center text-[#2B1D18] cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-mono font-semibold text-[#2B1D18] w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.cartItemId, 1)}
                          className="w-6 h-6 rounded bg-[#F7F1E8] hover:bg-white flex items-center justify-center text-[#2B1D18] cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="text-[#4A2F24]/40 hover:text-rose-600 transition-colors cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Coupon Code Section (Realistic & Trustworthy) */}
          <div className="bg-white p-3.5 rounded-xl border border-[#4A2F24]/12 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-[#2B1D18] flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-[#C58B5A]" />
                <span>Café Coupon Code</span>
              </span>
              <span className="text-[10px] text-[#4A2F24]/60">e.g. WELCOME10, COFFEE20</span>
            </div>

            {appliedCoupon ? (
              <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                  <span className="font-mono font-bold">{appliedCoupon.code}</span>
                  <span>({appliedCoupon.description})</span>
                </div>
                <button
                  type="button"
                  onClick={removeCoupon}
                  className="font-bold text-emerald-800 hover:underline cursor-pointer"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  value={couponInput}
                  onChange={e => setCouponInput(e.target.value.toUpperCase())}
                  placeholder="Enter coupon code"
                  className="flex-1 px-3 py-1.5 bg-[#F7F1E8] border border-[#4A2F24]/15 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2B1D18] font-mono text-xs uppercase text-[#2B1D18]"
                />
                <button
                  type="submit"
                  className="px-3.5 py-1.5 bg-[#2B1D18] hover:bg-[#4A2F24] text-white rounded-lg font-semibold transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </form>
            )}

            {couponError && (
              <div className="text-[11px] text-rose-700 bg-rose-50 p-2 rounded-md border border-rose-200">
                {couponError}
              </div>
            )}
          </div>

          {/* Student Pass Perk */}
          <div className="bg-white p-3.5 rounded-xl border border-[#4A2F24]/12 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-[#C58B5A] shrink-0" />
              <div>
                <div className="font-semibold text-[#2B1D18]">Student Campus Pass</div>
                <div className="text-[10px] text-[#4A2F24]/60">Flat ₹20 off orders above ₹150</div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setStudentVerified(!studentVerified)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                studentVerified
                  ? 'bg-[#C58B5A] text-white'
                  : 'bg-[#F7F1E8] text-[#4A2F24] hover:bg-white border border-[#4A2F24]/15'
              }`}
            >
              {studentVerified ? 'Applied (-₹20)' : 'Apply ID'}
            </button>
          </div>

          {/* Customer Details & Payment */}
          {cart.length > 0 && (
            <div className="bg-white p-3.5 rounded-xl border border-[#4A2F24]/12 space-y-3">
              <div>
                <label className="font-semibold text-[#2B1D18] block mb-1">
                  Name for Order Callout
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  placeholder="e.g. Aarav"
                  className="w-full px-3 py-2 bg-[#F7F1E8] border border-[#4A2F24]/15 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2B1D18] text-[#2B1D18]"
                  required
                />
              </div>

              <div>
                <label className="font-semibold text-[#2B1D18] block mb-1.5">
                  Payment Method
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-2 rounded-lg border text-center cursor-pointer transition-all ${
                      paymentMethod === 'upi'
                        ? 'border-[#2B1D18] bg-[#2B1D18] text-white font-semibold'
                        : 'border-[#4A2F24]/15 bg-[#F7F1E8] text-[#4A2F24]'
                    }`}
                  >
                    UPI / GPay
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-2 rounded-lg border text-center cursor-pointer transition-all ${
                      paymentMethod === 'card'
                        ? 'border-[#2B1D18] bg-[#2B1D18] text-white font-semibold'
                        : 'border-[#4A2F24]/15 bg-[#F7F1E8] text-[#4A2F24]'
                    }`}
                  >
                    Cards
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cash')}
                    className={`p-2 rounded-lg border text-center cursor-pointer transition-all ${
                      paymentMethod === 'cash'
                        ? 'border-[#2B1D18] bg-[#2B1D18] text-white font-semibold'
                        : 'border-[#4A2F24]/15 bg-[#F7F1E8] text-[#4A2F24]'
                    }`}
                  >
                    Cash
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Bottom Total & Checkout Bar */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 bg-white border-t border-[#4A2F24]/12 space-y-3 text-xs">
            
            <div className="space-y-1.5 text-[#4A2F24]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums">₹{subtotal.toFixed(0)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-800 font-medium">
                  <span>Discount ({appliedCoupon ? appliedCoupon.code : 'Student Pass'})</span>
                  <span className="font-mono tabular-nums">-₹{discountAmount.toFixed(0)}</span>
                </div>
              )}

              <div className="flex justify-between text-[#4A2F24]/60 text-[11px]">
                <span>Café GST (5%)</span>
                <span className="font-mono tabular-nums">₹{tax.toFixed(2)}</span>
              </div>

              <div className="pt-2 border-t border-[#4A2F24]/10 flex justify-between items-baseline font-bold text-sm text-[#2B1D18]">
                <span>Total Amount Payable</span>
                <span className="font-mono text-xl tabular-nums">₹{total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full py-3.5 text-sm font-semibold text-white bg-[#2B1D18] hover:bg-[#4A2F24] active:scale-98 rounded-xl shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Place Order &bull; ₹{total.toFixed(2)}</span>
              <ArrowRight className="w-4 h-4 text-[#C58B5A]" />
            </button>

          </div>
        )}

      </div>
    </div>
  );
};

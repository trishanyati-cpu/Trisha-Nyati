import React from 'react';
import { useCoffee } from '../context/CoffeeContext';
import { X, CheckCircle2, Clock, MapPin, QrCode } from 'lucide-react';
import { OrderStatus } from '../types/coffee';

const STATUS_STEPS: { key: OrderStatus; label: string; desc: string }[] = [
  { key: 'received', label: 'Order Confirmed', desc: 'Sent to our barista espresso bar' },
  { key: 'brewing', label: 'Crafting & Steaming', desc: 'Pulling espresso shots and preparing fresh bakes' },
  { key: 'ready', label: 'Ready for You', desc: 'Served to your table or ready at the pickup counter' },
  { key: 'completed', label: 'Enjoy Your Coffee', desc: 'Thank you for visiting Brew & Co.!' }
];

export const OrderTrackerModal: React.FC = () => {
  const { activeOrder, isOrderTrackerOpen, setIsOrderTrackerOpen, updateOrderStatus } = useCoffee();

  if (!isOrderTrackerOpen || !activeOrder) return null;

  const currentStepIndex = STATUS_STEPS.findIndex(s => s.key === activeOrder.status);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#2B1D18]/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-[#F7F1E8] w-full max-w-xl rounded-2xl border border-[#4A2F24]/20 shadow-2xl overflow-hidden flex flex-col">
        
        {/* Top Bar */}
        <div className="p-4 sm:p-5 bg-white border-b border-[#4A2F24]/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-[#2B1D18] text-[#F7F1E8] flex items-center justify-center font-bold text-xs">
              ☕
            </span>
            <div>
              <div className="text-[11px] font-mono text-[#4A2F24]/60 uppercase">
                Brew &amp; Co. Live Tracker
              </div>
              <h2 className="font-serif text-lg font-bold text-[#2B1D18]">
                Order {activeOrder.orderNumber}
              </h2>
            </div>
          </div>

          <button
            onClick={() => setIsOrderTrackerOpen(false)}
            className="p-2 rounded-lg text-[#4A2F24]/60 hover:text-[#2B1D18] hover:bg-[#F7F1E8] transition-colors cursor-pointer"
            aria-label="Close tracker"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tracker Body */}
        <div className="p-5 sm:p-6 space-y-6 text-xs">
          
          {/* Main Status Hero Card */}
          <div className="bg-white p-5 rounded-xl border border-[#4A2F24]/12 text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F7F1E8] text-[#2B1D18] rounded-lg text-xs font-semibold">
              <Clock className="w-3.5 h-3.5 text-[#C58B5A]" />
              <span>
                {activeOrder.status === 'ready'
                  ? 'Your Order is Ready!'
                  : activeOrder.status === 'brewing'
                  ? 'Barista is Handcrafting Your Order'
                  : 'Order Queued at Barista Station'}
              </span>
            </div>

            <h3 className="font-serif text-2xl font-bold text-[#2B1D18]">
              {activeOrder.status === 'ready' ? (
                <span className="text-emerald-700">Please Collect at Counter or Table</span>
              ) : (
                activeOrder.pickupTimeLabel
              )}
            </h3>

            {activeOrder.orderType === 'dine_in' && activeOrder.tableNumber && (
              <p className="text-xs text-[#4A2F24] flex items-center justify-center gap-1 font-medium">
                <MapPin className="w-3.5 h-3.5 text-[#C58B5A]" />
                <span>Delivering directly to Table #{activeOrder.tableNumber}</span>
              </p>
            )}

            <p className="text-xs text-[#4A2F24]/70 max-w-sm mx-auto">
              Guest: <span className="font-semibold text-[#2B1D18]">{activeOrder.customerName}</span> &bull; Placed {activeOrder.createdAt}
            </p>
          </div>

          {/* Stepper Timeline */}
          <div className="bg-white p-5 rounded-xl border border-[#4A2F24]/12 space-y-4">
            <div className="space-y-4">
              {STATUS_STEPS.map((step, idx) => {
                const isPassed = idx < currentStepIndex;
                const isCurrent = idx === currentStepIndex;

                return (
                  <div key={step.key} className="flex items-start gap-3 relative">
                    {idx < STATUS_STEPS.length - 1 && (
                      <div
                        className={`absolute left-4 top-8 w-0.5 h-8 transition-colors ${
                          idx < currentStepIndex ? 'bg-emerald-600' : 'bg-[#4A2F24]/15'
                        }`}
                      />
                    )}

                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-mono font-bold transition-all ${
                        isPassed
                          ? 'bg-emerald-700 text-white'
                          : isCurrent
                          ? 'bg-[#2B1D18] text-white ring-4 ring-[#C58B5A]/25'
                          : 'bg-[#F7F1E8] text-[#4A2F24]/50'
                      }`}
                    >
                      {isPassed ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                    </div>

                    <div className="flex-1 min-w-0 pt-0.5">
                      <div className="flex items-center justify-between">
                        <h4
                          className={`text-xs font-bold ${
                            isCurrent ? 'text-[#2B1D18] text-sm' : isPassed ? 'text-emerald-800' : 'text-[#4A2F24]/50'
                          }`}
                        >
                          {step.label}
                        </h4>
                        {isCurrent && (
                          <span className="text-[10px] font-mono font-semibold bg-[#F7F1E8] px-2 py-0.5 rounded text-[#2B1D18]">
                            IN PROGRESS
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#4A2F24]/70 mt-0.5">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Itemized Receipt in ₹ */}
          <div className="bg-white p-4 rounded-xl border border-[#4A2F24]/12 space-y-2">
            <div className="font-semibold text-[#2B1D18] mb-1">Items in this Order</div>
            {activeOrder.items.map((item, i) => (
              <div key={i} className="flex justify-between text-[#4A2F24]">
                <span>
                  {item.quantity}x {item.name}
                </span>
                <span className="font-mono tabular-nums">
                  ₹{(item.finalPrice * item.quantity).toFixed(0)}
                </span>
              </div>
            ))}

            {activeOrder.discountAmount > 0 && (
              <div className="flex justify-between text-emerald-800 font-medium pt-1">
                <span>Discount ({activeOrder.appliedCoupon || 'Student Pass'})</span>
                <span className="font-mono tabular-nums">-₹{activeOrder.discountAmount.toFixed(0)}</span>
              </div>
            )}

            <div className="pt-2 border-t border-[#4A2F24]/10 flex justify-between font-bold text-[#2B1D18] text-sm">
              <span>Total Paid ({activeOrder.paymentMethod})</span>
              <span className="font-mono tabular-nums">₹{activeOrder.total.toFixed(2)}</span>
            </div>
          </div>

          {/* Quick Simulation Bar */}
          <div className="pt-2 border-t border-[#4A2F24]/10 flex items-center justify-between">
            <span className="text-[#4A2F24]/60 text-[11px]">Advance Order State:</span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => updateOrderStatus(activeOrder.id, 'brewing')}
                className="px-2.5 py-1 bg-[#F7F1E8] text-[#2B1D18] border border-[#4A2F24]/15 rounded font-medium hover:bg-white cursor-pointer"
              >
                Brewing
              </button>
              <button
                type="button"
                onClick={() => updateOrderStatus(activeOrder.id, 'ready')}
                className="px-2.5 py-1 bg-[#C58B5A] text-white rounded font-medium hover:bg-[#b07849] cursor-pointer"
              >
                Ready
              </button>
              <button
                type="button"
                onClick={() => updateOrderStatus(activeOrder.id, 'completed')}
                className="px-2.5 py-1 bg-[#2B1D18] text-white rounded font-medium hover:bg-[#4A2F24] cursor-pointer"
              >
                Completed
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

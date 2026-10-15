import React, { useState } from 'react';
import { useCoffee } from '../context/CoffeeContext';
import { X, TrendingUp, Users, DollarSign, Clock, Star, CheckCircle, Coffee } from 'lucide-react';
import { OrderStatus } from '../types/coffee';

export const BaristaDashboardModal: React.FC = () => {
  const { isBaristaModalOpen, setIsBaristaModalOpen, orders, updateOrderStatus } = useCoffee();
  const [activeTab, setActiveTab] = useState<'kds' | 'metrics'>('kds');

  if (!isBaristaModalOpen) return null;

  // Indian Café Operations Metrics
  const dailyCustomers = 285;
  const totalSales = orders.reduce((sum, o) => sum + o.total, 38450);
  const totalOrdersCount = orders.length + 195;
  const averageOrderValue = Math.round(totalSales / totalOrdersCount);
  const preOrdersCount = orders.filter(o => o.orderType === 'takeaway').length + 62;
  const repeatCustomerRate = 66; // %
  const customerRating = 4.9;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#2B1D18]/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-[#F7F1E8] w-full max-w-4xl rounded-2xl border border-[#4A2F24]/20 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#2B1D18] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[#C58B5A] text-white flex items-center justify-center font-bold text-xs">
              KDS
            </span>
            <div>
              <div className="text-[10px] font-mono text-[#C58B5A] uppercase tracking-wider">
                Brew &amp; Co. Operations &bull; Indiranagar Bengaluru
              </div>
              <h2 className="font-serif text-lg sm:text-xl font-bold">
                Kitchen Display &amp; Performance Metrics
              </h2>
            </div>
          </div>

          <button
            onClick={() => setIsBaristaModalOpen(false)}
            className="p-2 rounded-lg text-stone-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close dashboard"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-5 py-2.5 bg-white border-b border-[#4A2F24]/10 flex items-center gap-2">
          <button
            onClick={() => setActiveTab('kds')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'kds'
                ? 'bg-[#2B1D18] text-white shadow-2xs'
                : 'text-[#4A2F24] hover:bg-[#F7F1E8]'
            }`}
          >
            Live Kitchen Display (KDS)
          </button>
          <button
            onClick={() => setActiveTab('metrics')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'metrics'
                ? 'bg-[#2B1D18] text-white shadow-2xs'
                : 'text-[#4A2F24] hover:bg-[#F7F1E8]'
            }`}
          >
            Café Sales &amp; Unit Economics
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6 text-xs">
          
          {/* TAB 1: KITCHEN DISPLAY */}
          {activeTab === 'kds' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#2B1D18]">
                  Active Espresso Station Tickets ({orders.length})
                </span>
                <span className="text-[#4A2F24]/60 font-mono text-[11px]">
                  Real-time kitchen order updates
                </span>
              </div>

              {orders.length === 0 ? (
                <div className="py-12 text-center bg-white rounded-xl border border-[#4A2F24]/12 p-6">
                  <Coffee className="w-8 h-8 mx-auto text-[#4A2F24]/30 mb-2" />
                  <p className="text-sm font-semibold text-[#2B1D18]">No active orders right now</p>
                  <p className="text-xs text-[#4A2F24]/60 mt-1">Place an order in the cart to test the kitchen workflow.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {orders.map(order => (
                    <div
                      key={order.id}
                      className="bg-white p-4 rounded-xl border border-[#4A2F24]/12 shadow-2xs flex flex-col justify-between"
                    >
                      <div>
                        {/* Ticket Header */}
                        <div className="flex items-start justify-between pb-2 mb-2 border-b border-[#4A2F24]/10">
                          <div>
                            <span className="font-mono text-sm font-bold text-[#2B1D18]">
                              {order.orderNumber}
                            </span>
                            <div className="text-[11px] text-[#4A2F24]/60">
                              Guest: <span className="font-semibold text-[#2B1D18]">{order.customerName}</span> &bull; {order.createdAt}
                            </div>
                          </div>

                          <span
                            className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded ${
                              order.status === 'ready'
                                ? 'bg-emerald-100 text-emerald-800'
                                : order.status === 'brewing'
                                ? 'bg-amber-100 text-amber-900'
                                : 'bg-[#F7F1E8] text-[#2B1D18]'
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>

                        {/* Mode badge */}
                        <div className="text-[11px] text-[#4A2F24] mb-2 font-mono">
                          {order.orderType === 'dine_in' ? '☕ Table Delivery' : '🚀 Takeaway'}:{' '}
                          <span className="font-bold text-[#2B1D18]">{order.pickupTimeLabel}</span>
                        </div>

                        {/* Order Items */}
                        <div className="space-y-2 py-1">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="bg-[#F7F1E8] p-2 rounded-lg border border-[#4A2F24]/10">
                              <div className="font-bold text-[#2B1D18] flex justify-between">
                                <span>{item.quantity}x {item.name}</span>
                                <span className="font-mono">₹{(item.finalPrice * item.quantity).toFixed(0)}</span>
                              </div>
                              {item.customization && (
                                <div className="text-[10px] text-[#4A2F24]/60 mt-0.5 space-y-0.5">
                                  <div>
                                    {item.customization.size.split(' ')[0]} &bull; {item.customization.temperature} &bull; {item.customization.milk}
                                  </div>
                                  <div>
                                    {item.customization.shots} Shot &bull; {item.customization.sweetness}% Sweet
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Ticket Action Buttons */}
                      <div className="mt-3 pt-3 border-t border-[#4A2F24]/10 flex items-center justify-between gap-2">
                        <span className="font-mono text-xs font-bold text-[#2B1D18]">
                          Total: ₹{order.total.toFixed(2)}
                        </span>

                        <div className="flex items-center gap-1.5">
                          {order.status === 'received' && (
                            <button
                              onClick={() => updateOrderStatus(order.id, 'brewing')}
                              className="px-2.5 py-1 text-xs font-semibold bg-[#C58B5A] hover:bg-[#b07849] text-white rounded-md cursor-pointer transition-colors"
                            >
                              Start Brewing
                            </button>
                          )}
                          {order.status === 'brewing' && (
                            <button
                              onClick={() => updateOrderStatus(order.id, 'ready')}
                              className="px-2.5 py-1 text-xs font-semibold bg-emerald-700 hover:bg-emerald-800 text-white rounded-md cursor-pointer transition-colors"
                            >
                              Call Ready
                            </button>
                          )}
                          {order.status === 'ready' && (
                            <button
                              onClick={() => updateOrderStatus(order.id, 'completed')}
                              className="px-2.5 py-1 text-xs font-semibold bg-[#2B1D18] hover:bg-[#4A2F24] text-white rounded-md cursor-pointer transition-colors"
                            >
                              Mark Served
                            </button>
                          )}
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: PRD SUCCESS METRICS */}
          {activeTab === 'metrics' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#2B1D18]">
                  Café Unit Economics &amp; Success Metrics
                </h3>
                <p className="text-xs text-[#4A2F24]/60 mt-0.5">
                  Real-time daily metrics in Indian Rupees (₹) for Brew &amp; Co. Indiranagar.
                </p>
              </div>

              {/* KPI Strip */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-xl border border-[#4A2F24]/12 shadow-2xs">
                  <div className="text-[10px] font-mono text-[#4A2F24]/60 uppercase">Daily Footfall</div>
                  <div className="font-mono text-2xl font-bold text-[#2B1D18] mt-1">{dailyCustomers} patrons</div>
                  <div className="text-[10px] text-emerald-700 mt-0.5">+18% vs target</div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-[#4A2F24]/12 shadow-2xs">
                  <div className="text-[10px] font-mono text-[#4A2F24]/60 uppercase">Daily Sales (₹)</div>
                  <div className="font-mono text-2xl font-bold text-[#2B1D18] mt-1">₹{totalSales.toLocaleString('en-IN')}</div>
                  <div className="text-[10px] text-emerald-700 mt-0.5">Healthy unit economics</div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-[#4A2F24]/12 shadow-2xs">
                  <div className="text-[10px] font-mono text-[#4A2F24]/60 uppercase">Average Order Value</div>
                  <div className="font-mono text-2xl font-bold text-[#C58B5A] mt-1">₹{averageOrderValue}</div>
                  <div className="text-[10px] text-[#4A2F24]/70 mt-0.5">Driven by ₹149+ combos</div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-[#4A2F24]/12 shadow-2xs">
                  <div className="text-[10px] font-mono text-[#4A2F24]/60 uppercase">Repeat Patrons</div>
                  <div className="font-mono text-2xl font-bold text-[#2B1D18] mt-1">{repeatCustomerRate}%</div>
                  <div className="text-[10px] text-emerald-700 mt-0.5">Strong neighborhood loyalty</div>
                </div>
              </div>

              {/* Additional Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-xl border border-[#4A2F24]/12">
                  <div className="font-semibold text-[#2B1D18]">Active Takeaway Pre-Orders</div>
                  <div className="font-mono text-xl font-bold text-[#2B1D18] mt-1">{preOrdersCount} pre-orders</div>
                  <p className="text-[11px] text-[#4A2F24]/60 mt-1">Average wait time under 3.5 minutes.</p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-[#4A2F24]/12">
                  <div className="font-semibold text-[#2B1D18]">Verified Patron Rating</div>
                  <div className="font-mono text-xl font-bold text-[#2B1D18] mt-1">★ {customerRating} / 5.0</div>
                  <p className="text-[11px] text-[#4A2F24]/60 mt-1">Based on 450+ verified Bengaluru reviews.</p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-[#4A2F24]/12">
                  <div className="font-semibold text-[#2B1D18]">Combo Share of Revenue</div>
                  <div className="font-mono text-xl font-bold text-[#2B1D18] mt-1">42% of orders</div>
                  <p className="text-[11px] text-[#4A2F24]/60 mt-1">Best Friends &amp; Coffee Break combos lead.</p>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};

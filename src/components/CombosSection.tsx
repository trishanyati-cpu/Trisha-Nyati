import React, { useState } from 'react';
import { COMBO_OFFERS, VALID_COUPONS } from '../data/coffeeData';
import { ComboOffer } from '../types/coffee';
import { useCoffee } from '../context/CoffeeContext';
import { Plus, Check, Tag, Sparkles, Copy } from 'lucide-react';

export const CombosSection: React.FC = () => {
  const { quickAddCombo, applyCouponCode } = useCoffee();
  const [justAddedId, setJustAddedId] = useState<string | null>(null);
  const [copiedCoupon, setCopiedCoupon] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string>('all');

  const handleAdd = (combo: ComboOffer) => {
    quickAddCombo(combo);
    setJustAddedId(combo.id);
    setTimeout(() => setJustAddedId(null), 1200);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    applyCouponCode(code);
    setCopiedCoupon(code);
    setTimeout(() => setCopiedCoupon(null), 2000);
  };

  const filteredCombos = selectedTag === 'all'
    ? COMBO_OFFERS
    : COMBO_OFFERS.filter(c => c.categoryTag === selectedTag);

  return (
    <section id="combos" className="py-12 sm:py-16 bg-[#F1E8DC] border-y border-[#4A2F24]/12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-mono font-semibold text-[#C58B5A] tracking-wider uppercase mb-1">
              Affordable Café Pairings
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B1D18]">
              Combos &amp; Special Offers
            </h2>
            <p className="text-[#4A2F24]/80 text-sm sm:text-base mt-1 max-w-xl">
              Freshly baked croissants, warm brownies, and grilled sandwiches paired with our signature coffees. Save up to ₹167 with our curated combos.
            </p>
          </div>

          {/* Tag Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {['all', 'Quick Bite', 'Sweet Pair', 'For Two', 'Indian Classic'].map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  selectedTag === tag
                    ? 'bg-[#2B1D18] text-white shadow-2xs'
                    : 'bg-white text-[#4A2F24] hover:bg-white/80 border border-[#4A2F24]/10'
                }`}
              >
                {tag === 'all' ? 'All 10 Combos' : tag}
              </button>
            ))}
          </div>
        </div>

        {/* Promo Coupons Banner (Section 6 requirement: realistic and trustworthy discounts) */}
        <div id="offers" className="mb-10 p-5 rounded-2xl bg-white border border-[#4A2F24]/15 shadow-2xs">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#C58B5A] uppercase tracking-wider">
                <Tag className="w-4 h-4" />
                <span>Verified Active Café Coupons</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-[#2B1D18] mt-0.5">
                Apply Honest Promotional Discounts
              </h3>
              <p className="text-xs text-[#4A2F24]/75 mt-0.5">
                Discounts calculate automatically at checkout on verified eligible order values.
              </p>
            </div>

            {/* Coupons list */}
            <div className="flex flex-wrap gap-2.5">
              {VALID_COUPONS.map(c => {
                const isCopied = copiedCoupon === c.code;

                return (
                  <div
                    key={c.code}
                    className="p-2.5 rounded-xl bg-[#F7F1E8] border border-[#4A2F24]/15 flex items-center gap-3 text-xs"
                  >
                    <div>
                      <span className="font-mono font-bold text-[#2B1D18] block tracking-wide">
                        {c.code}
                      </span>
                      <span className="text-[10px] text-[#4A2F24]/70">
                        {c.description}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCopyCode(c.code)}
                      className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-all cursor-pointer whitespace-nowrap ${
                        isCopied
                          ? 'bg-emerald-700 text-white'
                          : 'bg-[#2B1D18] text-white hover:bg-[#4A2F24]'
                      }`}
                    >
                      {isCopied ? 'Applied!' : 'Apply Code'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 10 Combo Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCombos.map((combo) => {
            const isAdded = justAddedId === combo.id;

            return (
              <div
                key={combo.id}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-[#4A2F24]/12 shadow-2xs hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative aspect-4/3 w-full bg-[#F7F1E8] overflow-hidden">
                  <img
                    src={combo.image}
                    alt={combo.name}
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />

                  {/* Savings Ribbon */}
                  <div className="absolute top-2.5 left-2.5 bg-[#2B1D18]/90 text-[#C58B5A] text-[11px] font-mono font-bold px-2.5 py-1 rounded-md shadow-xs">
                    Save ₹{combo.savings}
                  </div>

                  {combo.popular && (
                    <div className="absolute top-2.5 right-2.5 bg-[#C58B5A] text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                      Popular Deal
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[11px] font-mono text-[#C58B5A] font-medium uppercase tracking-wide">
                      {combo.tagline}
                    </div>
                    <h3 className="font-serif text-lg font-bold text-[#2B1D18] mt-1 group-hover:text-[#C58B5A] transition-colors">
                      {combo.name}
                    </h3>
                    <p className="text-xs text-[#4A2F24]/75 mt-1.5 leading-relaxed">
                      {combo.description}
                    </p>

                    {/* Exact Inclusions Box */}
                    <div className="mt-3 p-2.5 rounded-lg bg-[#F7F1E8] border border-[#4A2F24]/10 space-y-1 text-xs">
                      <div className="text-[10px] uppercase font-bold text-[#4A2F24]/70 font-mono">
                        Included in this combo:
                      </div>
                      {combo.itemsIncluded.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-[#2B1D18] font-medium text-[11px]">
                          <span className="text-[#C58B5A]">&bull;</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pricing and Action */}
                  <div className="pt-4 mt-4 border-t border-[#4A2F24]/10 flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-mono text-xl font-bold text-[#2B1D18] tabular-nums">
                          ₹{combo.comboPrice}
                        </span>
                        <span className="font-mono text-xs text-[#4A2F24]/50 line-through tabular-nums">
                          ₹{combo.regularPrice}
                        </span>
                      </div>
                      <span className="text-[10px] text-emerald-800 font-semibold block">
                        Verified savings of ₹{combo.savings}
                      </span>
                    </div>

                    <button
                      onClick={() => handleAdd(combo)}
                      disabled={isAdded}
                      className={`inline-flex items-center gap-1 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                        isAdded
                          ? 'bg-emerald-700 text-white'
                          : 'bg-[#2B1D18] hover:bg-[#4A2F24] text-white active:scale-95 shadow-xs'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Combo</span>
                        </>
                      )}
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

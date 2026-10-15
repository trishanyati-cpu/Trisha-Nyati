import React from 'react';
import { MENU_ITEMS } from '../data/coffeeData';
import { useCoffee } from '../context/CoffeeContext';
import { Sparkles, Plus, SlidersHorizontal } from 'lucide-react';

export const SignatureDrinks: React.FC = () => {
  const { quickAddDrink, openCustomizer } = useCoffee();

  // Signature picks
  const signatures = MENU_ITEMS.filter(item => 
    ['brew-co-signature-coffee', 'south-indian-filter-coffee', 'seasonal-special-coffee', 'cold-coffee-icecream'].includes(item.id)
  );

  return (
    <section className="py-12 sm:py-16 bg-[#F7F1E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs font-mono font-semibold text-[#C58B5A] tracking-wider uppercase mb-1 flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            <span>Master Crafts &amp; Indian Heritage</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B1D18]">
            Brew &amp; Co. Signature Creations
          </h2>
          <p className="text-[#4A2F24]/80 text-sm sm:text-base mt-2">
            The drinks that define our coffee house — combining heritage Indian brewing techniques with contemporary craft espresso.
          </p>
        </div>

        {/* 2-Column Split Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {signatures.map((drink) => (
            <div
              key={drink.id}
              className="bg-white rounded-2xl p-6 border border-[#4A2F24]/12 shadow-2xs flex flex-col sm:flex-row gap-6 items-center"
            >
              <div className="w-full sm:w-44 h-48 rounded-xl overflow-hidden bg-[#F7F1E8] shrink-0 relative">
                <img
                  src={drink.image}
                  alt={drink.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-2 left-2 bg-[#2B1D18]/90 text-white font-mono text-[10px] px-2 py-0.5 rounded">
                  {drink.prepTimeMinutes}m craft
                </span>
              </div>

              <div className="flex-1 flex flex-col justify-between h-full space-y-3">
                <div>
                  <span className="text-[10px] font-mono text-[#C58B5A] uppercase tracking-wider font-bold">
                    Signature Highlight
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#2B1D18] mt-0.5">
                    {drink.name}
                  </h3>
                  <p className="text-xs text-[#4A2F24]/75 mt-1.5 leading-relaxed">
                    {drink.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#4A2F24]/10 flex items-center justify-between">
                  <span className="font-mono text-xl font-bold text-[#2B1D18] tabular-nums">
                    ₹{drink.price}
                  </span>

                  <div className="flex items-center gap-2">
                    {drink.isCustomizable && (
                      <button
                        onClick={() => openCustomizer(drink)}
                        className="px-2.5 py-1.5 text-xs font-semibold text-[#4A2F24] bg-[#F7F1E8] hover:bg-[#FAF6F0] rounded-lg border border-[#4A2F24]/15 transition-all cursor-pointer flex items-center gap-1"
                      >
                        <SlidersHorizontal className="w-3 h-3 text-[#4A2F24]/70" />
                        <span>Craft</span>
                      </button>
                    )}

                    <button
                      onClick={() => quickAddDrink(drink)}
                      className="inline-flex items-center gap-1 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-[#2B1D18] hover:bg-[#4A2F24] text-white active:scale-95 shadow-xs transition-all cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Order</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

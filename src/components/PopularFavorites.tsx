import React, { useState } from 'react';
import { MENU_ITEMS } from '../data/coffeeData';
import { MenuItem } from '../types/coffee';
import { useCoffee } from '../context/CoffeeContext';
import { Plus, Check, SlidersHorizontal, Flame, Snowflake } from 'lucide-react';

export const PopularFavorites: React.FC = () => {
  const { quickAddDrink, openCustomizer } = useCoffee();
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  // Pick 6 popular crowd favorites
  const popularDrinks = MENU_ITEMS.filter(item => 
    ['south-indian-filter-coffee', 'cappuccino', 'cold-coffee-icecream', 'java-chip-frappe', 'brew-co-signature-coffee', 'cafe-mocha'].includes(item.id)
  );

  const handleAdd = (item: MenuItem) => {
    quickAddDrink(item);
    setJustAddedId(item.id);
    setTimeout(() => setJustAddedId(null), 1200);
  };

  return (
    <section className="py-12 sm:py-16 bg-[#F7F1E8] border-t border-[#4A2F24]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-mono font-semibold text-[#C58B5A] tracking-wider uppercase mb-1">
              Customer Loved Picks
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B1D18]">
              Popular Café Favorites
            </h2>
            <p className="text-[#4A2F24]/80 text-sm mt-1 max-w-xl">
              Hand-pulled espresso, traditional brass filter coffee, and blended icy frappes ordered most often by our patrons.
            </p>
          </div>

          <a
            href="#menu"
            className="text-xs font-semibold text-[#2B1D18] hover:text-[#C58B5A] transition-colors underline underline-offset-4 cursor-pointer whitespace-nowrap"
          >
            Explore Full Menu ({MENU_ITEMS.length} items) &rarr;
          </a>
        </div>

        {/* 6-Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularDrinks.map(drink => {
            const isAdded = justAddedId === drink.id;

            return (
              <div
                key={drink.id}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-[#4A2F24]/12 shadow-2xs hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative aspect-4/3 w-full bg-[#F7F1E8] overflow-hidden">
                  <img
                    src={drink.image}
                    alt={drink.name}
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />

                  {/* Temperature badge */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    {drink.temperatureType === 'hot' ? (
                      <span className="bg-[#2B1D18]/90 text-white text-[10px] font-medium px-2 py-0.5 rounded flex items-center gap-1">
                        <Flame className="w-3 h-3 text-[#C58B5A]" /> Hot
                      </span>
                    ) : (
                      <span className="bg-[#2B1D18]/90 text-white text-[10px] font-medium px-2 py-0.5 rounded flex items-center gap-1">
                        <Snowflake className="w-3 h-3 text-sky-400" /> Chilled
                      </span>
                    )}
                    {drink.tags && drink.tags[0] && (
                      <span className="bg-white/95 text-[#2B1D18] text-[10px] font-semibold px-2 py-0.5 rounded shadow-2xs">
                        {drink.tags[0]}
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-2 right-2 bg-[#2B1D18]/85 text-white text-[10px] font-mono px-2 py-0.5 rounded">
                    {drink.prepTimeMinutes}m prep
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#2B1D18] group-hover:text-[#C58B5A] transition-colors">
                      {drink.name}
                    </h3>
                    <p className="text-xs text-[#4A2F24]/75 mt-1.5 line-clamp-2 leading-relaxed">
                      {drink.description}
                    </p>
                  </div>

                  {/* Pricing and Action */}
                  <div className="pt-4 mt-4 border-t border-[#4A2F24]/10 flex items-center justify-between">
                    <div>
                      <span className="font-mono text-lg font-bold text-[#2B1D18] tabular-nums">
                        ₹{drink.price}
                      </span>
                      <span className="text-[11px] text-[#4A2F24]/60 block">Incl. all taxes</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {drink.isCustomizable && (
                        <button
                          onClick={() => openCustomizer(drink)}
                          className="px-2.5 py-1.5 text-xs font-semibold text-[#4A2F24] bg-[#F7F1E8] hover:bg-[#FAF6F0] rounded-lg border border-[#4A2F24]/15 transition-all cursor-pointer flex items-center gap-1"
                          title="Customize sweetness and milk"
                        >
                          <SlidersHorizontal className="w-3 h-3" />
                          <span>Customize</span>
                        </button>
                      )}

                      <button
                        onClick={() => handleAdd(drink)}
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
                            <span>Add</span>
                          </>
                        )}
                      </button>
                    </div>

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

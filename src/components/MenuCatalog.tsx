import React, { useState } from 'react';
import { MENU_ITEMS } from '../data/coffeeData';
import { MenuItem, MenuCategory } from '../types/coffee';
import { useCoffee } from '../context/CoffeeContext';
import { Search, SlidersHorizontal, Plus, Check, Flame, Snowflake } from 'lucide-react';

const CATEGORIES: { id: 'all' | MenuCategory; label: string }[] = [
  { id: 'all', label: 'All Items' },
  { id: 'hot_coffee', label: 'Hot Coffee' },
  { id: 'cold_coffee', label: 'Cold Coffee' },
  { id: 'frappes', label: 'Frappés' },
  { id: 'indian_coffee', label: 'Indian Coffee' },
  { id: 'signature', label: 'Signature Drinks' },
  { id: 'bakery_snacks', label: 'Bakery & Snacks' },
];

export const MenuCatalog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | MenuCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [tempFilter, setTempFilter] = useState<'all' | 'hot' | 'cold'>('all');
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const { openCustomizer, quickAddDrink } = useCoffee();

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTemp =
      tempFilter === 'all' || item.temperatureType === tempFilter || item.temperatureType === 'both';

    return matchesCategory && matchesSearch && matchesTemp;
  });

  const handleAdd = (item: MenuItem) => {
    quickAddDrink(item);
    setJustAddedId(item.id);
    setTimeout(() => setJustAddedId(null), 1200);
  };

  return (
    <section id="menu" className="py-12 sm:py-16 bg-[#F7F1E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-mono font-semibold text-[#C58B5A] tracking-wider uppercase mb-1">
              Freshly Brewed in Bengaluru
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B1D18]">
              Explore Our Coffee Menu
            </h2>
            <p className="text-[#4A2F24]/80 text-sm mt-1 max-w-xl">
              From ₹79 single espressos to ₹89 South Indian filter coffee in traditional brass and icy blended frappes.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#4A2F24]/50" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search cappuccino, filter coffee..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-[#4A2F24]/20 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#2B1D18] focus:border-[#2B1D18] placeholder:text-[#4A2F24]/50 transition-all text-[#2B1D18]"
            />
          </div>
        </div>

        {/* Category Navigation Pills */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-[#4A2F24]/12">
          
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#2B1D18] text-white shadow-xs'
                    : 'text-[#4A2F24] hover:text-[#2B1D18] hover:bg-white/80'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Temperature Filter */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-[#4A2F24]/60 text-[11px] mr-1">Style:</span>
            <button
              onClick={() => setTempFilter('all')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer ${
                tempFilter === 'all'
                  ? 'bg-white text-[#2B1D18] font-bold shadow-2xs border border-[#4A2F24]/15'
                  : 'text-[#4A2F24] hover:bg-white/50'
              }`}
            >
              All Styles
            </button>
            <button
              onClick={() => setTempFilter('hot')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer flex items-center gap-1 ${
                tempFilter === 'hot'
                  ? 'bg-white text-[#2B1D18] font-bold shadow-2xs border border-[#4A2F24]/15'
                  : 'text-[#4A2F24] hover:bg-white/50'
              }`}
            >
              <Flame className="w-3 h-3 text-[#C58B5A]" /> Hot
            </button>
            <button
              onClick={() => setTempFilter('cold')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer flex items-center gap-1 ${
                tempFilter === 'cold'
                  ? 'bg-white text-[#2B1D18] font-bold shadow-2xs border border-[#4A2F24]/15'
                  : 'text-[#4A2F24] hover:bg-white/50'
              }`}
            >
              <Snowflake className="w-3 h-3 text-sky-500" /> Cold
            </button>
          </div>

        </div>

        {/* Product Cards Grid */}
        {filteredItems.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-2xl border border-[#4A2F24]/15 p-8">
            <p className="text-[#4A2F24] text-sm">No items found matching "{searchQuery}".</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setTempFilter('all');
              }}
              className="mt-3 text-xs font-semibold text-[#2B1D18] underline cursor-pointer"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => {
              const isAdded = justAddedId === item.id;

              return (
                <div
                  key={item.id}
                  className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-[#4A2F24]/12 shadow-2xs hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Image */}
                  <div className="relative aspect-4/3 w-full bg-[#F7F1E8] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />

                    {/* Metadata tags */}
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                      {item.temperatureType === 'hot' && (
                        <span className="bg-[#2B1D18]/90 text-white text-[10px] font-medium px-2 py-0.5 rounded flex items-center gap-1">
                          <Flame className="w-2.5 h-2.5 text-[#C58B5A]" /> Hot
                        </span>
                      )}
                      {item.temperatureType === 'cold' && (
                        <span className="bg-[#2B1D18]/90 text-white text-[10px] font-medium px-2 py-0.5 rounded flex items-center gap-1">
                          <Snowflake className="w-2.5 h-2.5 text-sky-400" /> Cold
                        </span>
                      )}
                      {item.popular && (
                        <span className="bg-[#C58B5A] text-white text-[10px] font-medium px-2 py-0.5 rounded">
                          Popular
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-2 right-2 bg-[#2B1D18]/85 text-white text-[10px] font-mono px-2 py-0.5 rounded">
                      {item.prepTimeMinutes}m prep
                    </div>
                  </div>

                  {/* Body Details */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-[11px] text-[#4A2F24]/60">
                        <span className="uppercase font-mono tracking-wider">
                          {item.category.replace('_', ' ')}
                        </span>
                        {item.calories && (
                          <>
                            <span aria-hidden="true">&bull;</span>
                            <span>{item.calories} kcal</span>
                          </>
                        )}
                      </div>

                      <h3 className="font-serif text-base font-bold text-[#2B1D18] mt-1 line-clamp-1 group-hover:text-[#C58B5A] transition-colors">
                        {item.name}
                      </h3>

                      <p className="text-xs text-[#4A2F24]/75 mt-1.5 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Pricing and Action */}
                    <div className="pt-4 mt-3 border-t border-[#4A2F24]/10 flex items-center justify-between">
                      <div>
                        <span className="font-mono text-base font-bold text-[#2B1D18] tabular-nums">
                          ₹{item.price}
                        </span>
                        <span className="text-[10px] text-[#4A2F24]/60 block">Price in ₹</span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {item.isCustomizable && (
                          <button
                            onClick={() => openCustomizer(item)}
                            className="px-2.5 py-1.5 text-xs font-semibold text-[#4A2F24] bg-[#F7F1E8] hover:bg-[#FAF6F0] rounded-lg border border-[#4A2F24]/15 transition-all cursor-pointer flex items-center gap-1"
                            title="Customize sweetness, milk, shots"
                          >
                            <SlidersHorizontal className="w-3 h-3 text-[#4A2F24]/70" />
                            <span>Custom</span>
                          </button>
                        )}

                        <button
                          onClick={() => handleAdd(item)}
                          disabled={isAdded}
                          className={`p-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                            isAdded
                              ? 'bg-emerald-700 text-white'
                              : 'bg-[#2B1D18] hover:bg-[#4A2F24] text-white active:scale-95 shadow-xs'
                          }`}
                          aria-label={`Add ${item.name} to cart`}
                        >
                          {isAdded ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Plus className="w-4 h-4" />
                          )}
                        </button>
                      </div>

                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};

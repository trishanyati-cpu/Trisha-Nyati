import React, { useState, useEffect } from 'react';
import { useCoffee } from '../context/CoffeeContext';
import {
  CupSize,
  SweetnessLevel,
  TemperatureOption,
  IceLevel,
  EspressoRoast,
  CustomizationOptions
} from '../types/coffee';
import { X, Check, Coffee } from 'lucide-react';

const SIZES: { label: CupSize; priceDelta: number; ml: string }[] = [
  { label: 'Regular (240ml)', priceDelta: 0, ml: '240 ml' },
  { label: 'Large (360ml) (+₹30)', priceDelta: 30, ml: '360 ml' }
];

const MILKS = [
  { label: 'Whole Milk', priceDelta: 0 },
  { label: 'Oat Milk (+₹35)', priceDelta: 35 },
  { label: 'Almond Milk (+₹35)', priceDelta: 35 },
  { label: 'Soy Milk (+₹30)', priceDelta: 30 },
  { label: 'Toned Milk', priceDelta: 0 },
  { label: 'No Milk (Black)', priceDelta: 0 }
];

const SWEETNESS_LEVELS: { level: SweetnessLevel; label: string; desc: string }[] = [
  { level: 0, label: '0%', desc: 'No added sugar' },
  { level: 25, label: '25%', desc: 'Mild sweetness' },
  { level: 50, label: '50%', desc: 'Brew & Co. standard' },
  { level: 75, label: '75%', desc: 'Sweet & rich' },
  { level: 100, label: '100%', desc: 'Extra sweet' }
];

const ROASTS: { label: EspressoRoast; desc: string; priceDelta: number }[] = [
  { label: 'Chikmagalur Dark Roast', desc: 'Dark chocolate & roasted hazelnut', priceDelta: 0 },
  { label: 'Estate Medium Roast', desc: 'Citrus, floral & crisp acidity', priceDelta: 0 },
  { label: 'Monsooned Malabar', desc: 'Earthy, low acid, thick crema', priceDelta: 20 },
  { label: 'Decaf', desc: 'Water-processed decaf beans', priceDelta: 0 }
];

const SYRUP_OPTIONS = [
  { name: 'Madagascar Vanilla', price: 25 },
  { name: 'Salted Caramel', price: 25 },
  { name: 'Roasted Hazelnut', price: 25 },
  { name: 'Cardamom Cane', price: 25 }
];

const TOPPING_OPTIONS = [
  { name: 'Sweet Cold Foam', price: 35 },
  { name: 'Caramel Drizzle', price: 15 },
  { name: 'Organic Cocoa Powder', price: 0 },
  { name: 'Cinnamon Dust', price: 0 }
];

export const DrinkCustomizerModal: React.FC = () => {
  const { customizingDrink, customizingPreset, closeCustomizer, addToCart } = useCoffee();

  if (!customizingDrink) return null;

  // Customization state
  const [size, setSize] = useState<CupSize>('Regular (240ml)');
  const [milk, setMilk] = useState<string>('Whole Milk');
  const [sweetness, setSweetness] = useState<SweetnessLevel>(50);
  const [temperature, setTemperature] = useState<TemperatureOption>(
    customizingDrink.temperatureType === 'cold' ? 'Iced' : 'Hot'
  );
  const [iceLevel, setIceLevel] = useState<IceLevel>('Regular');
  const [shots, setShots] = useState<number>(1);
  const [roast, setRoast] = useState<EspressoRoast>('Chikmagalur Dark Roast');
  const [selectedSyrups, setSelectedSyrups] = useState<string[]>([]);
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState('');

  // Reset or preset
  useEffect(() => {
    if (customizingPreset) {
      if (customizingPreset.size) setSize(customizingPreset.size);
      if (customizingPreset.milk) setMilk(customizingPreset.milk);
      if (customizingPreset.sweetness !== undefined) setSweetness(customizingPreset.sweetness);
      if (customizingPreset.temperature) setTemperature(customizingPreset.temperature);
      if (customizingPreset.iceLevel) setIceLevel(customizingPreset.iceLevel);
      if (customizingPreset.shots !== undefined) setShots(customizingPreset.shots);
      if (customizingPreset.roast) setRoast(customizingPreset.roast);
      if (customizingPreset.syrups) setSelectedSyrups(customizingPreset.syrups);
      if (customizingPreset.toppings) setSelectedToppings(customizingPreset.toppings);
    } else {
      setSize('Regular (240ml)');
      setMilk('Whole Milk');
      setSweetness(50);
      setTemperature(customizingDrink.temperatureType === 'cold' ? 'Iced' : 'Hot');
      setIceLevel('Regular');
      setShots(1);
      setRoast('Chikmagalur Dark Roast');
      setSelectedSyrups([]);
      setSelectedToppings([]);
      setSpecialInstructions('');
    }
  }, [customizingPreset, customizingDrink]);

  // Price calculations in ₹
  const basePrice = customizingDrink.price;
  const sizeCost = SIZES.find(s => s.label === size)?.priceDelta || 0;
  const milkCost = MILKS.find(m => m.label === milk)?.priceDelta || 0;
  const shotsCost = shots > 1 ? (shots - 1) * 30 : 0;
  const roastCost = ROASTS.find(r => r.label === roast)?.priceDelta || 0;
  const syrupsCost = selectedSyrups.reduce((sum, name) => {
    const s = SYRUP_OPTIONS.find(item => item.name === name);
    return sum + (s?.price || 0);
  }, 0);
  const toppingsCost = selectedToppings.reduce((sum, name) => {
    const t = TOPPING_OPTIONS.find(item => item.name === name);
    return sum + (t?.price || 0);
  }, 0);

  const finalDrinkPrice = basePrice + sizeCost + milkCost + shotsCost + roastCost + syrupsCost + toppingsCost;

  const toggleSyrup = (name: string) => {
    setSelectedSyrups(prev =>
      prev.includes(name) ? prev.filter(s => s !== name) : [...prev, name]
    );
  };

  const toggleTopping = (name: string) => {
    setSelectedToppings(prev =>
      prev.includes(name) ? prev.filter(t => t !== name) : [...prev, name]
    );
  };

  const handleAddToCart = () => {
    const customConfig: CustomizationOptions = {
      size,
      milk,
      sweetness,
      temperature,
      iceLevel,
      shots,
      roast,
      syrups: selectedSyrups,
      toppings: selectedToppings,
      specialInstructions: specialInstructions.trim() || undefined
    };

    addToCart({
      menuItemId: customizingDrink.id,
      name: customizingDrink.name,
      basePrice: customizingDrink.price,
      finalPrice: finalDrinkPrice,
      quantity: 1,
      image: customizingDrink.image,
      customization: customConfig
    });

    closeCustomizer();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#2B1D18]/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-[#F7F1E8] w-full max-w-2xl rounded-2xl border border-[#4A2F24]/20 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Top Header */}
        <div className="p-4 sm:p-5 bg-white border-b border-[#4A2F24]/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F7F1E8] text-[#C58B5A] border border-[#4A2F24]/10 flex items-center justify-center">
              <Coffee className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-mono text-[#C58B5A] font-semibold uppercase tracking-wider">
                Custom Coffee Crafting
              </div>
              <h2 className="font-serif text-lg sm:text-xl font-bold text-[#2B1D18]">
                {customizingDrink.name}
              </h2>
            </div>
          </div>

          <button
            onClick={closeCustomizer}
            className="p-2 rounded-lg text-[#4A2F24]/60 hover:text-[#2B1D18] hover:bg-[#F7F1E8] transition-colors cursor-pointer"
            aria-label="Close customizer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Customization Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          
          {/* Summary Preview Banner */}
          <div className="bg-white p-4 rounded-xl border border-[#4A2F24]/12 flex items-center justify-between">
            <div>
              <div className="text-[11px] text-[#4A2F24]/70">Current Configuration:</div>
              <div className="text-xs font-bold text-[#2B1D18] mt-0.5">
                {size.split(' ')[0]} &bull; {temperature} &bull; {milk} &bull; {sweetness}% Sweet
              </div>
              <div className="text-[11px] text-[#4A2F24]/60 mt-0.5">
                {shots} {shots === 1 ? 'Shot' : 'Shots'} ({roast})
                {selectedSyrups.length > 0 && ` &bull; Syrups: ${selectedSyrups.join(', ')}`}
                {selectedToppings.length > 0 && ` &bull; Toppings: ${selectedToppings.join(', ')}`}
              </div>
            </div>

            <div className="text-right pl-4 border-l border-[#4A2F24]/10 shrink-0">
              <span className="font-mono text-2xl font-bold text-[#2B1D18] tabular-nums">
                ₹{finalDrinkPrice}
              </span>
              <span className="text-[10px] text-[#4A2F24]/60 block">Price in ₹</span>
            </div>
          </div>

          {/* 1. Cup Size */}
          <div className="space-y-2">
            <label className="font-semibold text-[#2B1D18] uppercase tracking-wide">
              1. Cup Size
            </label>
            <div className="grid grid-cols-2 gap-2">
              {SIZES.map(s => (
                <button
                  key={s.label}
                  type="button"
                  onClick={() => setSize(s.label)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    size === s.label
                      ? 'border-[#2B1D18] bg-white ring-1 ring-[#2B1D18] text-[#2B1D18] shadow-xs'
                      : 'border-[#4A2F24]/15 bg-white/70 hover:border-[#4A2F24]/30 text-[#4A2F24]'
                  }`}
                >
                  <div className="font-semibold">{s.label}</div>
                  <div className="text-[10px] text-[#4A2F24]/60 font-mono mt-0.5">
                    {s.priceDelta === 0 ? 'Standard Size' : `+₹${s.priceDelta}`}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Temperature & Ice */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="font-semibold text-[#2B1D18] uppercase tracking-wide">
                2. Temperature
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Hot', 'Iced', 'Extra Hot'] as TemperatureOption[]).map(t => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTemperature(t)}
                    className={`py-2 px-1 rounded-lg border transition-all cursor-pointer text-center font-medium ${
                      temperature === t
                        ? 'border-[#2B1D18] bg-[#2B1D18] text-white'
                        : 'border-[#4A2F24]/15 bg-white text-[#4A2F24] hover:bg-[#FAF6F0]'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {temperature === 'Iced' && (
              <div className="space-y-2">
                <label className="font-semibold text-[#2B1D18] uppercase tracking-wide">
                  Ice Level
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {(['None', 'Less Ice', 'Regular', 'Extra Ice'] as IceLevel[]).map(i => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setIceLevel(i)}
                      className={`py-2 px-1 text-[11px] rounded-lg border transition-all cursor-pointer text-center font-medium ${
                        iceLevel === i
                          ? 'border-[#2B1D18] bg-[#2B1D18] text-white'
                          : 'border-[#4A2F24]/15 bg-white text-[#4A2F24] hover:bg-[#FAF6F0]'
                      }`}
                    >
                      {i}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 3. Milk Choice */}
          <div className="space-y-2">
            <label className="font-semibold text-[#2B1D18] uppercase tracking-wide flex items-center justify-between">
              <span>3. Milk Choice</span>
              <span className="text-[11px] font-normal text-[#4A2F24]/60">Dairy &amp; Plant Options</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {MILKS.map(m => (
                <button
                  key={m.label}
                  type="button"
                  onClick={() => setMilk(m.label)}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    milk === m.label
                      ? 'border-[#2B1D18] bg-white ring-1 ring-[#2B1D18] text-[#2B1D18] shadow-xs'
                      : 'border-[#4A2F24]/15 bg-white/70 hover:border-[#4A2F24]/30 text-[#4A2F24]'
                  }`}
                >
                  <div className="font-semibold">{m.label}</div>
                  <div className="text-[10px] text-[#4A2F24]/60 mt-0.5">
                    {m.priceDelta > 0 ? `+₹${m.priceDelta}` : 'Included'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 4. Sweetness Scale (0% to 100%) */}
          <div className="space-y-2">
            <label className="font-semibold text-[#2B1D18] uppercase tracking-wide flex items-center justify-between">
              <span>4. Sweetness Level: {sweetness}%</span>
              <span className="text-[11px] font-normal text-[#C58B5A]">
                {SWEETNESS_LEVELS.find(s => s.level === sweetness)?.desc}
              </span>
            </label>
            <div className="grid grid-cols-5 gap-1.5">
              {SWEETNESS_LEVELS.map(s => (
                <button
                  key={s.level}
                  type="button"
                  onClick={() => setSweetness(s.level)}
                  className={`py-2 px-1 text-center rounded-lg border transition-all cursor-pointer ${
                    sweetness === s.level
                      ? 'border-[#2B1D18] bg-[#2B1D18] text-white font-bold'
                      : 'border-[#4A2F24]/15 bg-white text-[#4A2F24] hover:bg-[#FAF6F0]'
                  }`}
                >
                  <div className="font-mono">{s.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 5. Espresso Strength & Bean Roast */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="font-semibold text-[#2B1D18] uppercase tracking-wide flex items-center justify-between">
                <span>5. Espresso Strength</span>
                <span className="text-[11px] text-[#4A2F24]/60">
                  {shots > 1 ? `+₹${(shots - 1) * 30}` : 'Included'}
                </span>
              </label>
              <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-[#4A2F24]/15 justify-between">
                <span className="text-[#4A2F24]/75 pl-1 font-medium">Shots:</span>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3].map(num => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setShots(num)}
                      className={`w-8 h-8 rounded-lg font-bold font-mono transition-all cursor-pointer ${
                        shots === num
                          ? 'bg-[#2B1D18] text-white'
                          : 'bg-[#F7F1E8] text-[#4A2F24] hover:bg-[#FAF6F0]'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-semibold text-[#2B1D18] uppercase tracking-wide">
                Indian Bean Roast
              </label>
              <select
                value={roast}
                onChange={e => setRoast(e.target.value as EspressoRoast)}
                className="w-full p-2.5 bg-white border border-[#4A2F24]/15 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#2B1D18] text-[#2B1D18]"
              >
                {ROASTS.map(r => (
                  <option key={r.label} value={r.label}>
                    {r.label} {r.priceDelta > 0 ? `(+₹${r.priceDelta})` : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 6. Syrups */}
          <div className="space-y-2">
            <label className="font-semibold text-[#2B1D18] uppercase tracking-wide">
              6. Artisanal Syrups (+₹25)
            </label>
            <div className="grid grid-cols-2 gap-2">
              {SYRUP_OPTIONS.map(s => {
                const isSelected = selectedSyrups.includes(s.name);
                return (
                  <button
                    key={s.name}
                    type="button"
                    onClick={() => toggleSyrup(s.name)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-[#2B1D18] bg-[#2B1D18] text-white shadow-xs'
                        : 'border-[#4A2F24]/15 bg-white hover:border-[#4A2F24]/30 text-[#4A2F24]'
                    }`}
                  >
                    <div>
                      <div className="font-medium">{s.name}</div>
                      <div className={`text-[10px] font-mono ${isSelected ? 'text-stone-300' : 'text-[#4A2F24]/60'}`}>
                        +₹{s.price}
                      </div>
                    </div>
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 7. Toppings */}
          <div className="space-y-2">
            <label className="font-semibold text-[#2B1D18] uppercase tracking-wide">
              7. Toppings &amp; Cold Foam
            </label>
            <div className="grid grid-cols-2 gap-2">
              {TOPPING_OPTIONS.map(t => {
                const isSelected = selectedToppings.includes(t.name);
                return (
                  <button
                    key={t.name}
                    type="button"
                    onClick={() => toggleTopping(t.name)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-[#2B1D18] bg-[#2B1D18] text-white shadow-xs'
                        : 'border-[#4A2F24]/15 bg-white hover:border-[#4A2F24]/30 text-[#4A2F24]'
                    }`}
                  >
                    <div>
                      <div className="font-medium">{t.name}</div>
                      <div className={`text-[10px] font-mono ${isSelected ? 'text-stone-300' : 'text-[#4A2F24]/60'}`}>
                        {t.price > 0 ? `+₹${t.price}` : 'Free'}
                      </div>
                    </div>
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Barista Instructions */}
          <div className="space-y-1">
            <label className="font-semibold text-[#2B1D18] uppercase tracking-wide">
              Barista Note (Optional)
            </label>
            <input
              type="text"
              value={specialInstructions}
              onChange={e => setSpecialInstructions(e.target.value)}
              placeholder="e.g. In a ceramic mug, light stir, extra hot..."
              className="w-full p-2.5 bg-white border border-[#4A2F24]/15 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#2B1D18] text-[#2B1D18]"
            />
          </div>

        </div>

        {/* Modal Bottom Bar */}
        <div className="p-4 sm:p-5 bg-white border-t border-[#4A2F24]/10 flex items-center justify-between gap-4">
          <div>
            <div className="text-[11px] text-[#4A2F24]/60">Total Amount:</div>
            <div className="font-mono text-xl font-bold text-[#2B1D18] tabular-nums">
              ₹{finalDrinkPrice}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={closeCustomizer}
              className="px-4 py-2 text-xs font-medium text-[#4A2F24] hover:text-[#2B1D18] cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleAddToCart}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-[#2B1D18] hover:bg-[#4A2F24] active:scale-98 rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-2"
            >
              <Coffee className="w-4 h-4 text-[#C58B5A]" />
              <span>Add to Cart (₹{finalDrinkPrice})</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

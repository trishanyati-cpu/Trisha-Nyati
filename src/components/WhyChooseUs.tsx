import React from 'react';
import { Coffee, ShieldCheck, Heart, Sparkles, Smile, Clock } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  return (
    <section id="about" className="py-12 sm:py-16 bg-[#F7F1E8] border-t border-[#4A2F24]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-mono font-semibold text-[#C58B5A] tracking-wider uppercase mb-1">
            Our Coffee Promise
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B1D18]">
            Why Choose Brew &amp; Co.?
          </h2>
          <p className="text-[#4A2F24]/80 text-sm sm:text-base mt-2">
            We built Brew &amp; Co. to deliver specialty coffee house quality at prices that feel right every day.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="p-6 rounded-2xl bg-white border border-[#4A2F24]/12 shadow-2xs hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#F7F1E8] text-[#C58B5A] flex items-center justify-center mb-4">
              <Coffee className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#2B1D18]">
              Single-Origin Indian Beans
            </h3>
            <p className="text-xs text-[#4A2F24]/75 mt-2 leading-relaxed">
              We exclusively brew shade-grown 100% Arabica sourced directly from family-run estates in Chikmagalur and Coorg, roasted in small batches weekly.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#4A2F24]/12 shadow-2xs hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#F7F1E8] text-[#C58B5A] flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#2B1D18]">
              Honest &amp; Affordable Pricing
            </h3>
            <p className="text-xs text-[#4A2F24]/75 mt-2 leading-relaxed">
              Espresso at ₹79, creamy cold coffees at ₹139, and meal combos starting at ₹149. Premium coffee culture that respects student and everyday budgets.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#4A2F24]/12 shadow-2xs hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#F7F1E8] text-[#C58B5A] flex items-center justify-center mb-4">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#2B1D18]">
              Welcoming Café Ambience
            </h3>
            <p className="text-xs text-[#4A2F24]/75 mt-2 leading-relaxed">
              Warm teakwood furniture, acoustic warmth, gentle playlist, and lush greenery. An inviting third place to unwind, talk with friends, or take a peaceful pause.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#4A2F24]/12 shadow-2xs hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#F7F1E8] text-[#C58B5A] flex items-center justify-center mb-4">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#2B1D18]">
              Baked Fresh Daily
            </h3>
            <p className="text-xs text-[#4A2F24]/75 mt-2 leading-relaxed">
              Our French butter croissants and fudgy dark chocolate brownies are baked in-house fresh every morning at 7:00 AM for unmatched crispness and aroma.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

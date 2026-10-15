import React from 'react';
import { HERO_IMAGE } from '../data/coffeeData';
import { Coffee, Sparkles, ArrowRight, Heart } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="relative pt-6 pb-12 sm:pt-10 sm:pb-16 bg-[#F7F1E8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Brand Copy & Actions */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Indian Café Welcome Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#4A2F24]/15 rounded-full text-xs text-[#4A2F24] font-medium shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#C58B5A]" />
              <span>Bengaluru &bull; Indiranagar &bull; Freshly Brewed Indian Beans</span>
            </div>

            <div className="space-y-3">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#2B1D18] leading-[1.12]">
                Your cozy, modern <br />
                <span className="italic font-normal text-[#C58B5A]">neighborhood café</span>.
              </h1>
              <p className="text-[#4A2F24]/80 text-base sm:text-lg max-w-xl leading-relaxed">
                Welcome to Brew &amp; Co. — where artisanal Chikmagalur coffee, rich South Indian filter decoctions, creamy frappés, and warm bakery bites meet honest Indian pricing. The perfect spot for conversations, casual meetings, and relaxed coffee breaks.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#menu"
                className="px-6 py-3.5 text-sm font-semibold text-white bg-[#2B1D18] hover:bg-[#4A2F24] active:scale-98 rounded-xl shadow-xs transition-all whitespace-nowrap cursor-pointer inline-flex items-center gap-2"
              >
                <Coffee className="w-4 h-4 text-[#C58B5A]" />
                <span>Shop Coffee Menu</span>
              </a>

              <a
                href="#combos"
                className="px-5 py-3.5 text-sm font-semibold text-[#2B1D18] bg-white hover:bg-[#FAF6F0] active:scale-98 rounded-xl border border-[#4A2F24]/20 transition-all whitespace-nowrap cursor-pointer inline-flex items-center gap-2"
              >
                <span>Explore Combos</span>
                <span className="text-[#C58B5A] font-mono font-bold text-xs">from ₹129</span>
              </a>
            </div>

            {/* Honest Pricing Trust Badges */}
            <div className="pt-5 border-t border-[#4A2F24]/15 grid grid-cols-3 gap-4 text-xs text-[#4A2F24]">
              <div>
                <div className="font-mono text-base font-bold text-[#2B1D18]">₹79+</div>
                <div className="text-[11px] text-[#4A2F24]/70">Affordable Espressos</div>
              </div>
              <div>
                <div className="font-mono text-base font-bold text-[#2B1D18]">100%</div>
                <div className="text-[11px] text-[#4A2F24]/70">Single-Origin Arabica</div>
              </div>
              <div>
                <div className="font-mono text-base font-bold text-[#2B1D18]">₹149+</div>
                <div className="text-[11px] text-[#4A2F24]/70">Snack Combos</div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Café Interior Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#4A2F24]/15 aspect-4/3 lg:aspect-16/11 bg-[#F7F1E8]">
              <img
                src={HERO_IMAGE}
                alt="Brew & Co. modern cozy café interior in India"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-103"
                referrerPolicy="no-referrer"
              />

              {/* Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#2B1D18]/85 via-[#2B1D18]/25 to-transparent pointer-events-none" />

              {/* Bottom Card */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#2B1D18]/90 backdrop-blur-md text-white border border-white/10 shadow-lg">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#C58B5A]" />
                    <span className="font-semibold tracking-wide">Warm Indian Café Ambience</span>
                  </div>
                  <span className="font-mono text-[#C58B5A] font-semibold text-xs">
                    Open Daily 7:30 AM – 11:30 PM
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-stone-300">
                  Located at 12th Main Indiranagar, Bengaluru. Enjoy artisanal cold coffee, hot bakes, and relaxing conversations.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

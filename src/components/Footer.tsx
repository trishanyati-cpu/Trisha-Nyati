import React from 'react';
import { useCoffee } from '../context/CoffeeContext';
import { MapPin, Clock, Phone, Mail, Coffee } from 'lucide-react';
import { CAFE_INFO } from '../data/coffeeData';

export const Footer: React.FC = () => {
  const { setIsBaristaModalOpen } = useCoffee();

  return (
    <footer className="bg-[#2B1D18] text-[#F7F1E8]/80 pt-12 pb-8 border-t border-[#4A2F24]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-[#4A2F24]/40 text-xs">
          
          {/* Brand info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-[#C58B5A] text-white flex items-center justify-center font-bold text-xs">
                B&amp;C
              </span>
              <span className="font-serif text-xl font-bold text-white tracking-tight">
                Brew &amp; Co.
              </span>
            </div>
            <p className="text-[#F7F1E8]/70 leading-relaxed">
              A modern, aesthetic, and affordable coffee shop in India. Ethical Chikmagalur roasts, traditional brass filter coffee, and delicious baked pairings.
            </p>
            <div className="text-[11px] text-[#C58B5A] font-mono">
              All prices listed in Indian Rupees (₹)
            </div>
          </div>

          {/* Café Location & Timings */}
          <div className="space-y-2">
            <div className="font-mono text-white uppercase font-semibold text-[11px] tracking-wider">
              Bengaluru Flagship
            </div>
            <div className="text-[#F7F1E8]/70 space-y-1.5">
              <div className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#C58B5A] shrink-0 mt-0.5" />
                <span>{CAFE_INFO.address}</span>
              </div>
              <div className="flex items-start gap-1.5 pt-1">
                <Clock className="w-3.5 h-3.5 text-[#C58B5A] shrink-0 mt-0.5" />
                <span>{CAFE_INFO.hours}</span>
              </div>
              <div className="pl-5 text-[#F7F1E8]/50 text-[11px]">
                {CAFE_INFO.landmark}
              </div>
            </div>
          </div>

          {/* Contact & Payment */}
          <div className="space-y-2">
            <div className="font-mono text-white uppercase font-semibold text-[11px] tracking-wider">
              Get in Touch
            </div>
            <ul className="text-[#F7F1E8]/70 space-y-1.5">
              <li className="flex items-center gap-1.5">
                <Phone className="w-3 h-3 text-[#C58B5A]" />
                <a href={`tel:${CAFE_INFO.phone}`} className="hover:text-white transition-colors">
                  {CAFE_INFO.phone}
                </a>
              </li>
              <li className="flex items-center gap-1.5">
                <Mail className="w-3 h-3 text-[#C58B5A]" />
                <a href={`mailto:${CAFE_INFO.email}`} className="hover:text-white transition-colors">
                  {CAFE_INFO.email}
                </a>
              </li>
              <li className="pt-2 text-[11px] text-[#C58B5A]">
                UPI, Cards &amp; Cash Accepted
              </li>
            </ul>
          </div>

          {/* Quick Links & Operator Portal */}
          <div className="space-y-2">
            <div className="font-mono text-white uppercase font-semibold text-[11px] tracking-wider">
              Café Navigation
            </div>
            <div className="flex flex-col space-y-1.5 text-[#F7F1E8]/70">
              <a href="#home" className="hover:text-white transition-colors">
                Home
              </a>
              <a href="#menu" className="hover:text-white transition-colors">
                Artisanal Menu (₹79+)
              </a>
              <a href="#combos" className="hover:text-white transition-colors">
                Combos &amp; Offers (₹129+)
              </a>
              <a href="#about" className="hover:text-white transition-colors">
                About Our Chikmagalur Beans
              </a>
              <a href="#contact" className="hover:text-white transition-colors">
                Visit &amp; Contact
              </a>
              <button
                onClick={() => setIsBaristaModalOpen(true)}
                className="text-left text-[#C58B5A] hover:text-white transition-colors cursor-pointer pt-1"
              >
                Kitchen KDS &amp; Metrics
              </button>
            </div>
          </div>

        </div>

        {/* Quiet copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#F7F1E8]/50">
          <div>
            &copy; {new Date().getFullYear()} Brew &amp; Co. All rights reserved. Crafted for coffee lovers in India.
          </div>
          <div className="flex items-center gap-3">
            <span>100% Indian Arabica</span>
            <span>&bull;</span>
            <span>Compostable Cups</span>
            <span>&bull;</span>
            <span>Transparent Pricing</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

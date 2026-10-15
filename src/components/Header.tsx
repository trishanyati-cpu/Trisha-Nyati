import React, { useState } from 'react';
import { useCoffee } from '../context/CoffeeContext';
import { ShoppingBag, Coffee, Menu as MenuIcon, X } from 'lucide-react';

export const Header: React.FC = () => {
  const { cart, setIsCartOpen, setIsBaristaModalOpen } = useCoffee();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.finalPrice * item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-[#F7F1E8]/95 backdrop-blur-md border-b border-[#4A2F24]/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element wordmark */}
        <a href="#home" className="font-serif text-2xl font-bold tracking-tight text-[#2B1D18] whitespace-nowrap shrink-0 flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-lg bg-[#2B1D18] text-[#F7F1E8] flex items-center justify-center font-sans font-bold text-sm shadow-xs">
            B&amp;C
          </span>
          <span>Brew &amp; Co.</span>
        </a>

        {/* Zone 2: 4-5 concise single-line text nav links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#4A2F24]/80">
          <a href="#home" className="hover:text-[#2B1D18] transition-colors whitespace-nowrap shrink-0">
            Home
          </a>
          <a href="#menu" className="hover:text-[#2B1D18] transition-colors whitespace-nowrap shrink-0">
            Menu
          </a>
          <a href="#combos" className="hover:text-[#2B1D18] transition-colors whitespace-nowrap shrink-0">
            Combos
          </a>
          <a href="#offers" className="hover:text-[#2B1D18] transition-colors whitespace-nowrap shrink-0">
            Offers
          </a>
          <a href="#about" className="hover:text-[#2B1D18] transition-colors whitespace-nowrap shrink-0">
            About Us
          </a>
          <a href="#contact" className="hover:text-[#2B1D18] transition-colors whitespace-nowrap shrink-0">
            Contact
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Quick Staff Mode Link */}
          <button
            onClick={() => setIsBaristaModalOpen(true)}
            title="Kitchen Order Tickets"
            className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-medium text-[#4A2F24] bg-white/80 hover:bg-white rounded-lg border border-[#4A2F24]/15 transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <span>Kitchen View</span>
          </button>

          {/* Primary Cart CTA */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#2B1D18] hover:bg-[#4A2F24] active:scale-98 rounded-xl shadow-xs transition-all cursor-pointer whitespace-nowrap shrink-0"
            aria-label={`Open shopping cart with ${totalItems} items`}
          >
            <ShoppingBag className="w-4 h-4 text-[#C58B5A]" />
            <span>Cart</span>
            {totalItems > 0 && (
              <span className="font-mono text-xs bg-[#C58B5A] text-white rounded px-1.5 py-0.5">
                {totalItems} · ₹{cartSubtotal}
              </span>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#4A2F24] hover:text-[#2B1D18] cursor-pointer"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F7F1E8] border-b border-[#4A2F24]/15 px-4 pt-2 pb-4 space-y-2 text-sm font-medium text-[#4A2F24]">
          <a
            href="#home"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 hover:text-[#2B1D18]"
          >
            Home
          </a>
          <a
            href="#menu"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 hover:text-[#2B1D18]"
          >
            Menu
          </a>
          <a
            href="#combos"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 hover:text-[#2B1D18]"
          >
            Combos
          </a>
          <a
            href="#offers"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 hover:text-[#2B1D18]"
          >
            Offers &amp; Coupons
          </a>
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 hover:text-[#2B1D18]"
          >
            About Us
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 hover:text-[#2B1D18]"
          >
            Contact
          </a>
        </div>
      )}
    </header>
  );
};

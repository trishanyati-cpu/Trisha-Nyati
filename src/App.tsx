/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CoffeeProvider } from './context/CoffeeContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PopularFavorites } from './components/PopularFavorites';
import { MenuCatalog } from './components/MenuCatalog';
import { CombosSection } from './components/CombosSection';
import { SignatureDrinks } from './components/SignatureDrinks';
import { WhyChooseUs } from './components/WhyChooseUs';
import { CustomerReviews } from './components/CustomerReviews';
import { LocationContact } from './components/LocationContact';
import { Footer } from './components/Footer';
import { DrinkCustomizerModal } from './components/DrinkCustomizerModal';
import { CartDrawer } from './components/CartDrawer';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { BaristaDashboardModal } from './components/BaristaDashboardModal';

export default function App() {
  return (
    <CoffeeProvider>
      <div className="min-h-screen flex flex-col bg-[#F7F1E8] text-[#2B1D18] selection:bg-[#C58B5A]/20 selection:text-[#2B1D18]">
        {/* 1. Navigation Bar */}
        <Header />

        <main className="flex-1">
          {/* 2. Hero Section */}
          <Hero />

          {/* 3. Popular Favorites */}
          <PopularFavorites />

          {/* 4. Explore Our Coffee Menu */}
          <MenuCatalog />

          {/* 5. Combos & Offers */}
          <CombosSection />

          {/* 6. Signature Drinks */}
          <SignatureDrinks />

          {/* 7. Why Choose Brew & Co.? */}
          <WhyChooseUs />

          {/* 8. Customer Reviews */}
          <CustomerReviews />

          {/* 9. Location and Contact */}
          <LocationContact />
        </main>

        {/* 10. Footer */}
        <Footer />

        {/* Global Modals & Drawers */}
        <DrinkCustomizerModal />
        <CartDrawer />
        <OrderTrackerModal />
        <BaristaDashboardModal />
      </div>
    </CoffeeProvider>
  );
}

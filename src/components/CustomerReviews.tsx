import React from 'react';
import { Star, CheckCircle2, MessageSquareQuote } from 'lucide-react';

const REVIEWS = [
  {
    name: 'Ananya S.',
    role: 'College Student, Indiranagar',
    rating: 5,
    date: 'Verified Visit &bull; 2 days ago',
    text: 'Finally an aesthetic café in Indiranagar that doesn’t charge ₹350 for a simple iced latte! The Cold Coffee Combo with the fudge brownie is pure bliss at ₹179.'
  },
  {
    name: 'Rohan Deshmukh',
    role: 'Product Designer',
    rating: 5,
    date: 'Verified Visit &bull; Last week',
    text: 'Their South Indian Filter Coffee in brass tumbler is hands down the best decoction around. The warm lighting and welcoming staff make it my favorite morning coffee spot.'
  },
  {
    name: 'Pooja & Shruti',
    role: 'Frequent Patrons',
    rating: 5,
    date: 'Verified Visit &bull; 3 days ago',
    text: 'We always get the Best Friends Combo for ₹299 whenever we meet. Two large coffees and two cookies — amazing value and wonderful, calm ambience.'
  }
];

export const CustomerReviews: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 bg-[#F1E8DC] border-t border-[#4A2F24]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-mono font-semibold text-[#C58B5A] tracking-wider uppercase mb-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>Verified Patron Reviews</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B1D18]">
              What Our Regulars Say
            </h2>
            <p className="text-[#4A2F24]/80 text-sm mt-1 max-w-xl">
              Authentic feedback from students, professionals, and coffee lovers visiting our Bengaluru café.
            </p>
          </div>

          <div className="text-xs text-[#4A2F24] bg-white px-3 py-1.5 rounded-xl border border-[#4A2F24]/12 flex items-center gap-2">
            <span className="font-mono text-base font-bold text-[#2B1D18]">★ 4.9</span>
            <span className="text-[#4A2F24]/60">&bull;</span>
            <span>Over 450+ verified café ratings</span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((rev, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-[#4A2F24]/12 shadow-2xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-amber-500">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] text-[#4A2F24]/60 font-mono" dangerouslySetInnerHTML={{ __html: rev.date }} />
                </div>

                <p className="text-xs text-[#2B1D18] leading-relaxed italic">
                  &ldquo;{rev.text}&rdquo;
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-[#4A2F24]/10">
                <div className="font-serif text-sm font-bold text-[#2B1D18]">{rev.name}</div>
                <div className="text-[11px] text-[#4A2F24]/70">{rev.role}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

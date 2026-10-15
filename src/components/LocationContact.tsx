import React, { useState } from 'react';
import { CAFE_INFO } from '../data/coffeeData';
import { MapPin, Clock, Phone, Mail, Send, CheckCircle2, QrCode } from 'lucide-react';

export const LocationContact: React.FC = () => {
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formMessage.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormName('');
      setFormEmail('');
      setFormMessage('');
    }, 3000);
  };

  return (
    <section id="contact" className="py-12 sm:py-16 bg-[#F7F1E8] border-t border-[#4A2F24]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs font-mono font-semibold text-[#C58B5A] tracking-wider uppercase mb-1">
            Visit Our Bengaluru Café
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B1D18]">
            Location &amp; Café Hours
          </h2>
          <p className="text-[#4A2F24]/80 text-sm sm:text-base mt-2">
            Step in for morning espresso, mid-day cold brews, or evening catch-ups. Conveniently located in Indiranagar.
          </p>
        </div>

        {/* 2-Column Split: Info Left, Message Form Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Location, Hours, UPI */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Address & Hours Card */}
            <div className="bg-white p-6 rounded-2xl border border-[#4A2F24]/12 shadow-2xs space-y-5">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-[#F7F1E8] text-[#C58B5A] flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-bold text-[#2B1D18]">Café Address</h4>
                  <p className="text-xs text-[#4A2F24]/85 mt-1 leading-relaxed">
                    {CAFE_INFO.address}
                  </p>
                  <p className="text-[11px] text-[#C58B5A] font-medium mt-1">
                    {CAFE_INFO.landmark}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#4A2F24]/10 flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-[#F7F1E8] text-[#C58B5A] flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-bold text-[#2B1D18]">Opening Hours</h4>
                  <p className="text-xs text-[#4A2F24]/85 mt-1 font-mono">
                    {CAFE_INFO.hours}
                  </p>
                  <p className="text-[11px] text-[#4A2F24]/60 mt-0.5">
                    Fresh morning bakes ready at 7:30 AM every day
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#4A2F24]/10 grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-[11px] text-[#4A2F24]/60 block">Phone</span>
                  <a href={`tel:${CAFE_INFO.phone}`} className="font-mono font-bold text-[#2B1D18] hover:text-[#C58B5A]">
                    {CAFE_INFO.phone}
                  </a>
                </div>
                <div>
                  <span className="text-[11px] text-[#4A2F24]/60 block">Email Inquiries</span>
                  <a href={`mailto:${CAFE_INFO.email}`} className="font-mono font-bold text-[#2B1D18] hover:text-[#C58B5A]">
                    {CAFE_INFO.email}
                  </a>
                </div>
              </div>

            </div>

            {/* UPI & Payment Acceptance */}
            <div className="bg-white p-5 rounded-2xl border border-[#4A2F24]/12 shadow-2xs flex items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-xs font-bold text-[#2B1D18] flex items-center gap-1.5">
                  <QrCode className="w-4 h-4 text-[#C58B5A]" />
                  <span>Indian Digital Payments Accepted</span>
                </div>
                <p className="text-[11px] text-[#4A2F24]/75">
                  GPay &bull; PhonePe &bull; Paytm &bull; BHIM UPI &bull; Debit / Credit Cards &bull; Cash
                </p>
              </div>

              <span className="text-xs font-mono font-bold bg-[#F7F1E8] text-[#2B1D18] px-2.5 py-1 rounded-md border border-[#4A2F24]/15 shrink-0">
                ₹ INR Only
              </span>
            </div>

          </div>

          {/* Right Column: Contact & Feedback Form */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-7 rounded-2xl border border-[#4A2F24]/12 shadow-2xs">
            <h3 className="font-serif text-xl font-bold text-[#2B1D18]">
              Drop Us a Note
            </h3>
            <p className="text-xs text-[#4A2F24]/75 mt-1">
              Have a question about our beans, booking a table, or want to share feedback? We’d love to hear from you.
            </p>

            {submitted ? (
              <div className="mt-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                <div>
                  <div className="font-bold">Thank you for your message!</div>
                  <div>Our café manager will get back to you shortly.</div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-xs">
                <div>
                  <label className="font-semibold text-[#2B1D18] block mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Priya Nair"
                    className="w-full px-3 py-2 bg-[#F7F1E8] border border-[#4A2F24]/15 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#2B1D18] text-[#2B1D18]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#2B1D18] block mb-1">Email or Phone</label>
                  <input
                    type="text"
                    required
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="priya@example.com or +91 98765 43210"
                    className="w-full px-3 py-2 bg-[#F7F1E8] border border-[#4A2F24]/15 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#2B1D18] text-[#2B1D18]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#2B1D18] block mb-1">Your Note or Inquiry</label>
                  <textarea
                    rows={3}
                    required
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                    placeholder="Ask about our Chikmagalur roast, table reservations, or private party bookings..."
                    className="w-full px-3 py-2 bg-[#F7F1E8] border border-[#4A2F24]/15 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#2B1D18] text-[#2B1D18]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 text-xs font-semibold text-white bg-[#2B1D18] hover:bg-[#4A2F24] rounded-xl shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5 text-[#C58B5A]" />
                  <span>Send Message</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};

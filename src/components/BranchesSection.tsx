import React, { useState } from 'react';
import { MapPin, Phone, Clock, Send, CheckCircle2, Car, UtensilsCrossed, Bike } from 'lucide-react';
import { BRANCHES } from '../data/menuData';

export const BranchesSection: React.FC = () => {
  const [selectedBranch, setSelectedBranch] = useState(BRANCHES[0].id);
  const [inquirySent, setInquirySent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    type: 'feedback',
    message: '',
  });

  const activeBranch = BRANCHES.find((b) => b.id === selectedBranch) || BRANCHES[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySent(true);
    setTimeout(() => {
      setInquirySent(false);
      setFormData({ name: '', phone: '', email: '', type: 'feedback', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#151111] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#F5B82E] text-xs font-semibold mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>FIND YOUR NEAREST CHIKEN</span>
          </div>

          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-white tracking-wide uppercase leading-tight">
            VISIT OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5B82E] to-[#FFD369]">BRANCHES</span> OR GET IN TOUCH
          </h2>

          <p className="mt-3 text-white/70 text-sm sm:text-base font-sans">
            5 flagship destinations serving the ultimate crunch across Cairo and Alexandria, with nationwide delivery hotline 19888.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Branch Locator List */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <h3 className="font-heading text-2xl text-white tracking-wider mb-1 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#C8102E]" />
              SELECT A LOCATION
            </h3>

            {/* Branch Tabs */}
            <div className="space-y-3">
              {BRANCHES.map((branch) => {
                const isSelected = branch.id === selectedBranch;
                return (
                  <div
                    key={branch.id}
                    onClick={() => setSelectedBranch(branch.id)}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#1E1515] border-[#C8102E] shadow-xl shadow-[#C8102E]/20'
                        : 'bg-[#191313] border-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-heading text-xl text-white tracking-wide">
                            {branch.name}
                          </h4>
                          <span className="text-[11px] font-sans font-medium px-2 py-0.5 rounded bg-white/10 text-[#F5B82E]">
                            {branch.area}
                          </span>
                        </div>
                        <p className="text-xs text-white/70 font-sans mt-1">
                          {branch.address}
                        </p>
                      </div>

                      <a
                        href={`tel:${branch.phone}`}
                        onClick={(e) => e.stopPropagation()}
                        className="p-2.5 rounded-xl bg-white/5 hover:bg-[#C8102E] text-white transition-colors shrink-0"
                        title="Call branch"
                      >
                        <Phone className="w-4 h-4 text-[#F5B82E]" />
                      </a>
                    </div>

                    {isSelected && (
                      <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-white/60">
                        <div className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-[#F5B82E]" />
                          <span>Hours: {branch.hours}</span>
                        </div>

                        <div className="flex items-center gap-3">
                          {branch.dineIn && (
                            <span className="flex items-center gap-1 text-white/80">
                              <UtensilsCrossed className="w-3 h-3 text-[#F5B82E]" /> Dine-In
                            </span>
                          )}
                          {branch.driveThru && (
                            <span className="flex items-center gap-1 text-white/80">
                              <Car className="w-3 h-3 text-[#F5B82E]" /> Drive-Thru
                            </span>
                          )}
                          {branch.delivery && (
                            <span className="flex items-center gap-1 text-white/80">
                              <Bike className="w-3 h-3 text-[#F5B82E]" /> 30m Delivery
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Hotline Banner */}
            <div className="mt-4 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#C8102E] via-[#92051C] to-[#C8102E] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl shadow-[#C8102E]/30">
              <div>
                <p className="font-heading text-xs tracking-widest uppercase text-[#F5B82E]">
                  EXPRESS HOME DELIVERY
                </p>
                <p className="font-heading text-3xl tracking-wider">
                  HOTLINE 19888
                </p>
                <p className="text-xs text-white/80 font-sans mt-0.5 max-w-sm">
                  Direct dispatch from the nearest kitchen to preserve heat & crunch.
                </p>
              </div>

              <a
                href="tel:19888"
                className="btn-chamfer btn-sheen px-6 py-3 bg-[#F5B82E] hover:bg-[#FFD369] text-[#0B0B0B] font-heading text-lg tracking-wider transition-all shrink-0 font-black shadow-lg shadow-[#F5B82E]/30 active:scale-95 w-full sm:w-auto text-center"
              >
                CALL NOW
              </a>
            </div>
          </div>

          {/* Contact / Feedback Form */}
          <div className="lg:col-span-5 bg-[#1B1414] border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <h3 className="font-heading text-2xl text-white tracking-wider mb-2">
                CUSTOMER CARE & CATERING
              </h3>
              <p className="text-xs text-white/60 font-sans mb-6">
                Have a question, feedback, or hosting an event? Send a direct note to the CHIKEN kitchen management team.
              </p>

              {inquirySent ? (
                <div className="py-12 text-center bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 animate-in fade-in">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                  <p className="font-heading text-2xl text-white">MESSAGE RECEIVED!</p>
                  <p className="text-xs text-white/80 font-sans mt-2">
                    Thank you! Our guest relations team will get back to you within 2 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-heading tracking-wider text-white/80 mb-1">
                      YOUR FULL NAME
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Omar Tarek"
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-[#C8102E]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-heading tracking-wider text-white/80 mb-1">
                        PHONE NUMBER
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="010 1234 5678"
                        className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-[#C8102E]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-heading tracking-wider text-white/80 mb-1">
                        INQUIRY TYPE
                      </label>
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-[#C8102E]"
                      >
                        <option value="feedback">Food Quality Feedback</option>
                        <option value="catering">Party / Event Catering</option>
                        <option value="franchise">Franchise Opportunities</option>
                        <option value="other">General Question</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-heading tracking-wider text-white/80 mb-1">
                      EMAIL ADDRESS
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@example.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-[#C8102E]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-heading tracking-wider text-white/80 mb-1">
                      YOUR MESSAGE
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your order or party requirements..."
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-[#C8102E] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full btn-chamfer btn-sheen py-3.5 bg-gradient-to-r from-[#C8102E] to-[#92051C] hover:from-[#E51837] hover:to-[#B30622] text-white font-heading text-lg tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-[#C8102E]/40 active:scale-98"
                  >
                    <Send className="w-4 h-4 text-[#F5B82E]" />
                    <span>SEND MESSAGE</span>
                  </button>
                </form>
              )}
            </div>

            <div className="pt-6 border-t border-white/10 mt-6 text-center">
              <p className="text-xs text-white/50 font-sans">
                Official Support: <span className="text-[#F5B82E]">support@chiken.com</span>
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

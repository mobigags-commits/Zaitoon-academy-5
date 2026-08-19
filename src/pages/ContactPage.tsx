import React, { useState } from 'react';
import { PageId } from '../types';
import { CAMPUS_LOCATIONS } from '../data/academyData';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare, Sparkles, MessageCircle } from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: PageId) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Admission Inquiry');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 mb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-bold uppercase tracking-wider">
                Page 20: Nationwide Campuses & Contact Information
              </span>
              <span className="text-xs font-bold text-slate-400">|</span>
              <span className="text-xs font-semibold text-red-600">24/7 Admissions Helpline</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Campuses Directory, Helpdesk & Inquiries
            </h1>
            <p className="text-slate-600 text-sm max-w-3xl">
              رابطہ و کیمپس لوکیشنز: Connect with our admissions counselors, campus registrars, or visit our flagship smart campuses in Islamabad, Lahore, Karachi, and Dubai.
            </p>
          </div>
        </div>

        {/* Direct Owner & Executive WhatsApp VIP Banner */}
        <div className="mb-8 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-950 text-white shadow-xl border border-emerald-500/40 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-emerald-400/20 text-emerald-300 text-xs font-extrabold rounded-full border border-emerald-400/40 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  Direct Executive Desk • فوری رابطہ
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Academy Owner & Chancellor Direct WhatsApp
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                ڈائریکٹ اونر واٹس ایپ ہیلپ لائن: For urgent admission confirmations, scholarship queries, degree equivalence, or personal academic counseling directly from the academy management.
              </p>
              <div className="pt-2 flex items-center gap-3">
                <div className="px-4 py-2 rounded-xl bg-black/40 border border-emerald-500/40 font-mono text-lg sm:text-xl font-bold text-amber-300 tracking-wider">
                  0344-7956085
                </div>
                <span className="text-xs text-emerald-300 font-semibold">(Available 24/7 on WhatsApp)</span>
              </div>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row gap-3">
              <a
                href="https://wa.me/923447956085?text=Assalam-o-Alaikum%20Sir%2C%20I%20am%20contacting%20you%20regarding%20Zaitoon%20Roots%20Academy%20Admissions%20and%20Programs."
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm flex items-center justify-center gap-2.5 shadow-xl transition-all transform hover:scale-105"
                id="contact-owner-whatsapp-btn"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Chat on WhatsApp (0344-7956085)</span>
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Contact Inquiry Form */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-slate-900">Send an Official Inquiry to Admissions Helpdesk</h3>

            {formSubmitted ? (
              <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-lg font-bold text-emerald-900">Inquiry Dispatched Successfully!</h4>
                <p className="text-xs text-emerald-700">
                  Thank you, <strong>{name}</strong>. Our senior admissions counselor will contact you via WhatsApp/Phone within 2 working hours.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs font-bold cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Abdullah Tariq"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-red-600"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-red-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp / Phone *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+92 300 0000000"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-red-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Inquiry Purpose</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-medium focus:outline-none focus:border-red-600"
                  >
                    <option>Admission & Eligibility Inquiry</option>
                    <option>Scholarship Assessment</option>
                    <option>Degree Equivalence & Verification</option>
                    <option>Hostel Accommodation</option>
                    <option>Corporate Partnership & Hiring</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Detailed Message</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Specify your academic background, intended program, or question..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-red-600"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-red-700 hover:bg-red-800 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Inquiry to Helpdesk</span>
                </button>
              </form>
            )}
          </div>

          {/* Nationwide Campuses Cards */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-xl font-bold text-slate-900">Flagship Campus Locations</h3>
            <div className="space-y-4">
              {CAMPUS_LOCATIONS.map((c, i) => (
                <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900 text-base">{c.name}</h4>
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-red-50 text-red-700">
                      {c.type}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <span>{c.address}</span>
                  </p>
                  <div className="flex flex-wrap gap-4 text-xs text-slate-600 pt-2 border-t border-slate-100">
                    <span className="flex items-center gap-1 font-semibold">
                      <Phone className="w-3.5 h-3.5 text-red-600" />
                      {c.phone}
                    </span>
                    <span className="flex items-center gap-1 font-semibold">
                      <Mail className="w-3.5 h-3.5 text-red-600" />
                      {c.email}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

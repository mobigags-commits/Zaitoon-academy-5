import React, { useState } from 'react';
import { PageId } from '../types';
import { Home, Coffee, Shield, Wifi, Utensils, Award, CheckCircle2, ArrowRight } from 'lucide-react';

interface HostelLifePageProps {
  onNavigate: (page: PageId) => void;
}

export const HostelLifePage: React.FC<HostelLifePageProps> = ({ onNavigate }) => {
  const [selectedHostelType, setSelectedHostelType] = useState<'boys' | 'girls'>('boys');

  const facilities = [
    { name: 'High-Speed Fiber Wi-Fi (1 Gbps)', desc: 'Dedicated campus internet throughout all residential rooms & study lounges.' },
    { name: 'Hygienic 3-Time Mess & Dining Hall', desc: 'Balanced nutritious menu planned by certified dietitians and chefs.' },
    { name: '24/7 Biometric Security & CCTV', desc: 'Round-the-clock security personnel, automated RFID gate access, and perimeter surveillance.' },
    { name: 'Indoor Recreation & Gaming Zone', desc: 'Table tennis, snooker, PlayStation lounges, and fitness gym.' },
    { name: 'Emergency Healthcare Clinic', desc: 'On-duty medical doctor and 24/7 dedicated campus ambulance on standby.' },
    { name: 'Power Backup & Solar Microgrid', desc: 'Continuous zero-outage electricity with automatic generator and solar backup.' }
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-10 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
                  Page 18: Campus Hostel & Student Life
                </span>
                <span className="text-xs font-bold text-slate-400">|</span>
                <span className="text-xs font-semibold text-slate-600">Executive Residencies</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Modern Student Hostels & Vibrant Campus Life
              </h1>
              <p className="text-slate-600 text-sm max-w-3xl">
                ہاسٹل و طلبہ کی رہائش: Safe, comfortable, and state-of-the-art separate residential hostels for male and female scholars with full amenities, nutritious dining, and study lounges.
              </p>
            </div>

            <button
              onClick={() => onNavigate('admissions')}
              className="px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-md cursor-pointer"
            >
              <span>Apply for Hostel Allotment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {facilities.map((fac, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base">{fac.name}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{fac.desc}</p>
            </div>
          ))}
        </div>

        {/* Hostel Pricing Packages */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
          <h3 className="text-xl font-bold text-slate-900">Hostel Room Packages (Per Semester)</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-3">
              <span className="text-xs font-bold text-slate-500 uppercase">Triple Occupancy</span>
              <p className="text-2xl font-black text-slate-900">Rs. 35,000</p>
              <p className="text-xs text-slate-500">Shared room with study table, wardrobe & attached bath</p>
            </div>
            <div className="p-6 rounded-2xl bg-amber-50/70 border border-amber-200 text-center space-y-3 ring-2 ring-amber-400">
              <span className="text-xs font-bold text-amber-900 uppercase">Double Occupancy (Popular)</span>
              <p className="text-2xl font-black text-amber-950">Rs. 50,000</p>
              <p className="text-xs text-slate-600">Spacious 2-person executive room with attached modern bath</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-3">
              <span className="text-xs font-bold text-slate-500 uppercase">Single Private Suite</span>
              <p className="text-2xl font-black text-slate-900">Rs. 85,000</p>
              <p className="text-xs text-slate-500">Individual luxury room with air conditioning & private balcony</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

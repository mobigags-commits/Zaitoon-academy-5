import React, { useState } from 'react';
import { PageId } from '../types';
import { Building2, Eye, MapPin, Sparkles, CheckCircle2, Video, Layers } from 'lucide-react';

interface CampusTourPageProps {
  onNavigate: (page: PageId) => void;
}

export const CampusTourPage: React.FC<CampusTourPageProps> = ({ onNavigate }) => {
  const [selectedFacility, setSelectedFacility] = useState(0);

  const facilities = [
    {
      title: 'State-of-the-Art NVIDIA AI Supercomputing Center',
      tag: 'STEM & AI Hub',
      desc: 'Equipped with 64x NVIDIA H100 GPUs for deep learning neural training, autonomous robotics prototyping, and generative vision rendering.',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
      specs: ['High-Performance Cluster', '24/7 Student Sandbox', 'AI Startup Incubator']
    },
    {
      title: 'Attached 700-Bed ZRA Teaching & Clinical Hospital',
      tag: 'Medical Sciences',
      desc: 'Full-fledged clinical wards, modern MRI/CT diagnostics, modular operating theaters, and 3D Anatomy Hologram Dissection tables for MBBS and DPT students.',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop&q=80',
      specs: ['Emergency Triage', 'Hydrotherapy Wing', 'Critical Care ICU']
    },
    {
      title: 'Subsonic Wind Tunnel & Aerospace Propulsion Bay',
      tag: 'Aerospace & Aviation',
      desc: 'Subsonic airflow aerodynamics testing tunnel, composite airframe curing ovens, and high-fidelity flight simulation pods.',
      image: 'https://images.unsplash.com/photo-1517976487515-568772390f77?w=800&auto=format&fit=crop&q=80',
      specs: ['Wind Tunnel Rig', 'Flight Simulators', 'Avionics Avionics Bench']
    },
    {
      title: 'Olympic-Standard Sports Complex & Aquatic Center',
      tag: 'Student Wellness',
      desc: 'FIFA-certified football turf, indoor wooden basketball courts, heated Olympic swimming pool, gymnasiums, and martial arts dojos.',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=80',
      specs: ['Olympic Pool', 'FIFA Turf', 'Executive Gymnasium']
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-10 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-bold uppercase tracking-wider">
                  Page 12: Campus Infrastructure & Virtual Tour
                </span>
                <span className="text-xs font-bold text-slate-400">|</span>
                <span className="text-xs font-semibold text-slate-600">50-Acre Smart Campus</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Global Campus Infrastructure & High-Tech Facilities
              </h1>
              <p className="text-slate-600 text-sm max-w-3xl">
                کیمپس کی سہولیات و لیبارٹریاں: Explore world-class laboratories, specialized clinical hospitals, aerospace test tunnels, residential hostels, and student recreation arenas.
              </p>
            </div>

            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3.5 rounded-2xl bg-red-700 hover:bg-red-800 text-white font-bold text-xs flex items-center gap-2 shadow-md cursor-pointer"
            >
              <MapPin className="w-4 h-4" />
              <span>Book an On-Campus Guided Tour</span>
            </button>
          </div>
        </div>

        {/* Interactive Virtual Viewport */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 mb-12">
          <div className="flex flex-wrap gap-2 border-b border-slate-100 pb-4">
            {facilities.map((fac, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedFacility(idx)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedFacility === idx
                    ? 'bg-red-700 text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {fac.tag}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 rounded-2xl overflow-hidden shadow-xl border border-slate-200 relative group aspect-video">
              <img
                src={facilities[selectedFacility].image}
                alt={`${facilities[selectedFacility].title} - Campus Facility at Zaitoon Roots Academy`}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                <div>
                  <span className="px-2.5 py-1 rounded bg-red-600 text-white text-[11px] font-bold">
                    {facilities[selectedFacility].tag}
                  </span>
                  <h4 className="text-lg font-bold text-white mt-1">
                    {facilities[selectedFacility].title}
                  </h4>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold text-red-700 uppercase">Facility Specs & Capabilities</span>
              <h3 className="text-2xl font-black text-slate-900 leading-tight">
                {facilities[selectedFacility].title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {facilities[selectedFacility].desc}
              </p>

              <div className="space-y-2 pt-2">
                {facilities[selectedFacility].specs.map((sp, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{sp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

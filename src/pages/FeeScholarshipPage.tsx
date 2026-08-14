import React, { useState } from 'react';
import { PageId } from '../types';
import { ALL_DEGREES } from '../data/degreesData';
import { ALL_DIPLOMAS } from '../data/diplomasData';
import {
  Calculator,
  DollarSign,
  Award,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface FeeScholarshipPageProps {
  onNavigate: (page: PageId) => void;
}

export const FeeScholarshipPage: React.FC<FeeScholarshipPageProps> = ({ onNavigate }) => {
  const [selectedProgramId, setSelectedProgramId] = useState<string>(ALL_DEGREES[0].id);
  const [marksPercentage, setMarksPercentage] = useState<number>(85);
  const [hasNeedBasedAid, setHasNeedBasedAid] = useState(false);
  const [hasSportsAchievement, setHasSportsAchievement] = useState(false);

  const selectedDegree = ALL_DEGREES.find((d) => d.id === selectedProgramId);
  const selectedDiploma = ALL_DIPLOMAS.find((d) => d.id === selectedProgramId);

  // Base tuition extraction
  const rawFeeString = selectedDegree ? selectedDegree.semesterFee : selectedDiploma?.totalFee || 'Rs. 90,000';
  const rawNum = parseInt(rawFeeString.replace(/[^0-9]/g, ''), 10) || 90000;

  // Calculate scholarship discounts
  let meritDiscountPercent = 0;
  if (marksPercentage >= 90) meritDiscountPercent = 100;
  else if (marksPercentage >= 85) meritDiscountPercent = 50;
  else if (marksPercentage >= 75) meritDiscountPercent = 30;
  else if (marksPercentage >= 65) meritDiscountPercent = 15;

  let totalDiscountPercent = meritDiscountPercent;
  if (hasNeedBasedAid && totalDiscountPercent < 100) totalDiscountPercent = Math.min(100, totalDiscountPercent + 20);
  if (hasSportsAchievement && totalDiscountPercent < 100) totalDiscountPercent = Math.min(100, totalDiscountPercent + 15);

  const discountAmount = (rawNum * totalDiscountPercent) / 100;
  const netPayable = rawNum - discountAmount;
  const perInstallment = Math.round(netPayable / 3);

  return (
    <div className="bg-slate-50 min-h-screen py-10 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                  Page 6: Fee Structure & Scholarship Engine
                </span>
                <span className="text-xs font-bold text-slate-400">|</span>
                <span className="text-xs font-semibold text-slate-600">Up to 100% Merit Financial Aid</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Transparent Fee Structure & Scholarship Calculator
              </h1>
              <p className="text-slate-600 text-sm max-w-3xl">
                فیس کا مکمل نظام اور وظائف کیلکولیٹر: Calculate semester fees, flexible 3-installment payment plans, and test your eligibility for 100% merit, sports, and need-based scholarships.
              </p>
            </div>

            <button
              onClick={() => onNavigate('admissions')}
              className="px-6 py-3.5 rounded-2xl bg-red-700 hover:bg-red-800 text-white font-bold text-xs flex items-center gap-2 shadow-md cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Apply for Scholarship 2026</span>
            </button>
          </div>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Controls Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-red-600" />
              <span>Program & Eligibility Inputs</span>
            </h3>

            {/* Program Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Select Degree or Diploma Program
              </label>
              <select
                value={selectedProgramId}
                onChange={(e) => setSelectedProgramId(e.target.value)}
                className="w-full p-3.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-semibold focus:outline-none focus:border-red-600"
              >
                <optgroup label="All The World's Degrees (Semester Tuition)">
                  {ALL_DEGREES.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.title} ({d.semesterFee})
                    </option>
                  ))}
                </optgroup>
                <optgroup label="All The World's Diplomas (Total Course Fee)">
                  {ALL_DIPLOMAS.map((dp) => (
                    <option key={dp.id} value={dp.id}>
                      {dp.title} ({dp.totalFee})
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>

            {/* Marks Slider */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-slate-700">
                  Prior Examination Marks Percentage (%): <span className="text-red-700 font-black text-base">{marksPercentage}%</span>
                </label>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                  {meritDiscountPercent > 0 ? `${meritDiscountPercent}% Merit Discount` : 'Standard Tier'}
                </span>
              </div>
              <input
                type="range"
                min={50}
                max={100}
                value={marksPercentage}
                onChange={(e) => setMarksPercentage(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-700"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-semibold">
                <span>50%</span>
                <span>65% (15% Off)</span>
                <span>75% (30% Off)</span>
                <span>85% (50% Off)</span>
                <span>90%+ (100% Full Free)</span>
              </div>
            </div>

            {/* Additional Quota Checkboxes */}
            <div className="space-y-3 pt-2">
              <span className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                Additional Financial Aid & Quota Categories
              </span>

              <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100">
                <input
                  type="checkbox"
                  checked={hasNeedBasedAid}
                  onChange={(e) => setHasNeedBasedAid(e.target.checked)}
                  className="w-4 h-4 rounded text-red-700 accent-red-700"
                />
                <div>
                  <p className="text-xs font-bold text-slate-800">Need-Based / Zakat & Orphan Financial Aid (+20% Waiver)</p>
                  <p className="text-[11px] text-slate-500">Subject to income certificate verification</p>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100">
                <input
                  type="checkbox"
                  checked={hasSportsAchievement}
                  onChange={(e) => setHasSportsAchievement(e.target.checked)}
                  className="w-4 h-4 rounded text-red-700 accent-red-700"
                />
                <div>
                  <p className="text-xs font-bold text-slate-800">National / Provincial Sports Gala Performer (+15% Waiver)</p>
                  <p className="text-[11px] text-slate-500">For recognized athletic champions & debate medalists</p>
                </div>
              </label>
            </div>
          </div>

          {/* Results Summary Card */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between space-y-6 border border-slate-700">
            <div>
              <div className="flex items-center justify-between border-b border-slate-700/80 pb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Net Fee Calculation</span>
                  <h4 className="text-xl font-black mt-0.5">Estimated Breakdown</h4>
                </div>
                <span className="px-3 py-1 bg-red-600 text-white text-xs font-black rounded-lg">
                  {totalDiscountPercent}% TOTAL OFF
                </span>
              </div>

              <div className="mt-6 space-y-3 text-xs">
                <div className="flex justify-between py-2 border-b border-slate-800 text-slate-300">
                  <span>Gross Tuition (Per Semester / Course):</span>
                  <span className="font-bold text-white">Rs. {rawNum.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-800 text-emerald-400">
                  <span>Total Scholarship Concession ({totalDiscountPercent}%):</span>
                  <span className="font-bold">- Rs. {discountAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-slate-700 text-sm">
                  <span className="font-bold text-white">Net Payable Tuition:</span>
                  <span className="font-black text-amber-300 text-lg">
                    Rs. {netPayable.toLocaleString()}
                  </span>
                </div>

                <div className="bg-white/10 p-3.5 rounded-2xl border border-white/15 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-300 block">
                    3-Part Semester Installment Plan
                  </span>
                  <p className="text-base font-black text-white">
                    3 × Rs. {perInstallment.toLocaleString()} / month
                  </p>
                  <p className="text-[10px] text-slate-400">Payable via Bank Challan, JazzCash, EasyPaisa or Credit Card</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate('admissions')}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-sm shadow-xl flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Lock This Fee & Apply Online</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* General Scholarships Tiers Table */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 mb-4">Official ZRA Scholarship Policies (Session 2026-27)</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-700 uppercase font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3.5">Scholarship Category</th>
                  <th className="p-3.5">Eligibility Criteria</th>
                  <th className="p-3.5">Tuition Waiver</th>
                  <th className="p-3.5">Renewal Condition</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                <tr className="hover:bg-slate-50">
                  <td className="p-3.5 font-bold text-slate-900">Dr. Tariq Zaitoon Gold Merit Fellowship</td>
                  <td className="p-3.5">90%+ in FSc / Intermediate / Top 10 Entry Test</td>
                  <td className="p-3.5 font-bold text-emerald-700">100% Full Tuition Free</td>
                  <td className="p-3.5">Maintain 3.75+ CGPA</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3.5 font-bold text-slate-900">High Achiever Academic Scholarship</td>
                  <td className="p-3.5">85% to 89.9% in Intermediate</td>
                  <td className="p-3.5 font-bold text-emerald-700">50% Tuition Waiver</td>
                  <td className="p-3.5">Maintain 3.50+ CGPA</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3.5 font-bold text-slate-900">ZRA Talent Encouragement Award</td>
                  <td className="p-3.5">75% to 84.9% in Intermediate</td>
                  <td className="p-3.5 font-bold text-emerald-700">30% Tuition Waiver</td>
                  <td className="p-3.5">Maintain 3.00+ CGPA</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3.5 font-bold text-slate-900">Kinship / Sibling Concession</td>
                  <td className="p-3.5">Two or more siblings enrolled simultaneously</td>
                  <td className="p-3.5 font-bold text-blue-700">25% Waiver for Second Sibling</td>
                  <td className="p-3.5">Valid while both enrolled</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { useFloodSafe } from '../../context/FloodSafeContext';
import {
  BarChart3,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  ShieldAlert,
  Package,
  Users,
  Compass,
  CheckSquare,
  AlertTriangle,
  RotateCcw,
} from 'lucide-react';

export const PreparednessScoreView: React.FC = () => {
  const {
    preparednessScore,
    preparednessRating,
    preparednessSummary,
    prepareProgress,
    kitReadiness,
    simulatorState,
    familyPlan,
    setActiveTab,
  } = useFloodSafe();

  const isHigh = preparednessScore >= 80;
  const isModerate = preparednessScore >= 50 && preparednessScore < 80;

  return (
    <div className="space-y-8 py-4 max-w-4xl mx-auto">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950 border border-teal-800 text-teal-300 text-xs font-semibold">
          <BarChart3 className="w-3.5 h-3.5" />
          <span>Preparedness Completion Metric</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Personal Flood Preparedness Score
        </h1>
        <p className="text-sm sm:text-base text-slate-300">
          Measures your household&apos;s factual preparedness across physical supply kits, pre-flood protections, family rendezvous planning, and scenario decision mastery.
        </p>
      </div>

      {/* Main Score Hero Card */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
        <div className="space-y-1">
          <div className="text-xs uppercase font-mono font-bold tracking-widest text-slate-400">
            YOUR FLOOD PREPAREDNESS
          </div>
          <div className="flex items-baseline gap-4">
            <span
              className={`text-5xl sm:text-7xl font-black font-mono tracking-tight ${
                isHigh
                  ? 'text-teal-400'
                  : isModerate
                  ? 'text-amber-400'
                  : 'text-rose-400'
              }`}
            >
              {preparednessScore}%
            </span>
            <span
              className={`text-lg sm:text-2xl font-black uppercase tracking-wider px-3 py-1 rounded-xl border ${
                isHigh
                  ? 'bg-teal-950/80 border-teal-700 text-teal-300'
                  : isModerate
                  ? 'bg-amber-950/80 border-amber-700 text-amber-300'
                  : 'bg-rose-950/80 border-rose-800 text-rose-300'
              }`}
            >
              {preparednessRating.status}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-4 bg-slate-800 rounded-full overflow-hidden border border-slate-700/80">
          <div
            className={`h-full transition-all duration-500 ${
              isHigh
                ? 'bg-gradient-to-r from-teal-500 to-emerald-400'
                : isModerate
                ? 'bg-gradient-to-r from-amber-500 to-yellow-400'
                : 'bg-gradient-to-r from-rose-500 to-red-400'
            }`}
            style={{ width: `${preparednessScore}%` }}
          />
        </div>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
          {preparednessRating.description}
        </p>

        {/* Important Disclaimer Notice */}
        <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-4 text-xs text-slate-400 flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-slate-300">Important:</strong> This score represents preparedness completion only. It must NOT be presented as a prediction of flood occurrence.
          </p>
        </div>
      </div>

      {/* Breakdown Status (Completed vs Missing) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Completed Items */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm uppercase tracking-wider">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>Completed Preparedness Milestones</span>
          </div>

          {preparednessSummary.completedItems.length === 0 ? (
            <p className="text-xs text-slate-500 italic">
              No milestones completed yet. Review the modules below to boost your score.
            </p>
          ) : (
            <ul className="space-y-2 text-xs sm:text-sm text-slate-200">
              {preparednessSummary.completedItems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Missing Items */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm uppercase tracking-wider">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <span>Missing Actions Needed</span>
          </div>

          {preparednessSummary.missingItems.length === 0 ? (
            <div className="text-xs text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>All core preparedness items are in place!</span>
            </div>
          ) : (
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              {preparednessSummary.missingItems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-amber-400 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* 4 Pillar Breakdown Cards */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
          Preparedness Pillar Breakdown
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Pillar 1: Pre-Flood Checklist */}
          <div
            onClick={() => setActiveTab('prepare')}
            className="p-5 bg-slate-900 border border-slate-800 hover:border-teal-500/50 rounded-2xl cursor-pointer transition flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-teal-400 uppercase">
                  <CheckSquare className="w-4 h-4" />
                  <span>Pre-Flood Checklist (30%)</span>
                </div>
                <span className="text-xs font-mono font-bold text-white">
                  {prepareProgress}%
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Protects documents, secures utilities, stores potable water, and anchors outdoor objects.
              </p>
            </div>
            <div className="pt-3 mt-2 border-t border-slate-800 flex items-center justify-between text-xs text-teal-400 font-semibold">
              <span>{prepareProgress === 100 ? 'Completed' : 'Update Checklist'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Pillar 2: Emergency Kit */}
          <div
            onClick={() => setActiveTab('kit')}
            className="p-5 bg-slate-900 border border-slate-800 hover:border-teal-500/50 rounded-2xl cursor-pointer transition flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-teal-400 uppercase">
                  <Package className="w-4 h-4" />
                  <span>Emergency Kit (30%)</span>
                </div>
                <span className="text-xs font-mono font-bold text-white">
                  {kitReadiness}%
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Checks 12 essential survival items including water, flashlights, non-perishable food, and medical supplies.
              </p>
            </div>
            <div className="pt-3 mt-2 border-t border-slate-800 flex items-center justify-between text-xs text-teal-400 font-semibold">
              <span>{kitReadiness === 100 ? 'Fully Packed' : 'Equip Kit'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Pillar 3: Family Safety Plan */}
          <div
            onClick={() => setActiveTab('family')}
            className="p-5 bg-slate-900 border border-slate-800 hover:border-teal-500/50 rounded-2xl cursor-pointer transition flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-teal-400 uppercase">
                  <Users className="w-4 h-4" />
                  <span>Family Safety Plan (20%)</span>
                </div>
                <span className="text-xs font-mono font-bold text-white">
                  {familyPlan.isSaved && familyPlan.groupName ? 'Configured' : 'Missing'}
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Pre-arranges meeting spots, accountability for members, and out-of-area contacts.
              </p>
            </div>
            <div className="pt-3 mt-2 border-t border-slate-800 flex items-center justify-between text-xs text-teal-400 font-semibold">
              <span>{familyPlan.isSaved ? 'View Plan' : 'Create Plan'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Pillar 4: Simulator Knowledge */}
          <div
            onClick={() => setActiveTab('simulator')}
            className="p-5 bg-slate-900 border border-slate-800 hover:border-blue-500/50 rounded-2xl cursor-pointer transition flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase">
                  <Compass className="w-4 h-4" />
                  <span>Simulator Decision Mastery (20%)</span>
                </div>
                <span className="text-xs font-mono font-bold text-white">
                  {simulatorState.score} / 10 Safe
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Validates split-second judgment regarding fast water, live wires, evacuation orders, and vehicles.
              </p>
            </div>
            <div className="pt-3 mt-2 border-t border-slate-800 flex items-center justify-between text-xs text-blue-400 font-semibold">
              <span>Test Knowledge</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

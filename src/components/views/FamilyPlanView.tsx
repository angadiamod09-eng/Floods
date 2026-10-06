import React, { useState } from 'react';
import { useFloodSafe } from '../../context/FloodSafeContext';
import {
  Users,
  Save,
  CheckCircle2,
  MapPin,
  HeartPulse,
  Phone,
  RotateCcw,
  Printer,
  ShieldCheck,
  ArrowRight,
  Info,
} from 'lucide-react';

export const FamilyPlanView: React.FC = () => {
  const {
    familyPlan,
    updateFamilyPlan,
    saveFamilyPlan,
    resetFamilyPlan,
    setActiveTab,
  } = useFloodSafe();

  const [savedSuccessNotice, setSavedSuccessNotice] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveFamilyPlan();
    setSavedSuccessNotice(true);
    setTimeout(() => setSavedSuccessNotice(false), 4000);
  };

  const handlePrint = () => {
    window.print();
  };

  const isConfigured = familyPlan.isSaved && familyPlan.groupName.trim().length > 0;

  return (
    <div className="space-y-8 py-4 max-w-4xl mx-auto">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950 border border-teal-800 text-teal-300 text-xs font-semibold">
          <Users className="w-3.5 h-3.5" />
          <span>Household Coordination</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Family Safety Plan
        </h1>
        <p className="text-sm sm:text-base text-slate-300">
          During sudden evacuations, communications fail. A pre-arranged plan ensures every family member knows where to meet and whom to contact. No login or accounts required.
        </p>
      </div>

      {/* Status Banner */}
      {isConfigured && (
        <div className="bg-emerald-950/80 border border-emerald-700/80 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-emerald-200 shadow-xl">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-7 h-7 text-emerald-400 shrink-0" />
            <div>
              <div className="text-lg font-black text-emerald-300">
                Family Safety Plan Ready
              </div>
              <div className="text-xs text-emerald-200/80">
                Saved locally to your browser session for instant access during emergency.
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 border border-emerald-700/60 text-emerald-300 hover:text-white text-xs font-bold transition"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Plan</span>
            </button>
            <button
              onClick={resetFamilyPlan}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900/60 border border-slate-700 text-slate-300 hover:text-white text-xs font-medium transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      )}

      {/* Plan Form */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Group / Family Name */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                Family / Group Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                value={familyPlan.groupName}
                onChange={(e) => updateFamilyPlan({ groupName: e.target.value })}
                placeholder="e.g. Miller Family / Apartment 4B"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-teal-500 text-sm"
              />
            </div>

            {/* Number of People */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                Number of People <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                min="1"
                max="50"
                required
                value={familyPlan.peopleCount}
                onChange={(e) => updateFamilyPlan({ peopleCount: e.target.value })}
                placeholder="e.g. 4 (including children/elderly)"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-teal-500 text-sm"
              />
            </div>

            {/* Primary Meeting Location */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-teal-400" />
                <span>Primary Meeting Location</span> <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                value={familyPlan.primaryLocation}
                onChange={(e) => updateFamilyPlan({ primaryLocation: e.target.value })}
                placeholder="e.g. High School Stadium Bleachers / North Ridge Hill"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-teal-500 text-sm"
              />
              <span className="text-[11px] text-slate-500">
                Must be an elevated location away from riverbanks and canals.
              </span>
            </div>

            {/* Backup Meeting Location */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Backup Meeting Location</span>
              </label>
              <input
                type="text"
                value={familyPlan.backupLocation}
                onChange={(e) => updateFamilyPlan({ backupLocation: e.target.value })}
                placeholder="e.g. Regional Community Center or Aunt's home in West Hills"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-teal-500 text-sm"
              />
              <span className="text-[11px] text-slate-500">
                Use if primary route or site is inundated or inaccessible.
              </span>
            </div>

            {/* Emergency Contact */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-blue-400" />
                <span>Emergency Contact Person &amp; Phone</span> <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                value={familyPlan.emergencyContact}
                onChange={(e) => updateFamilyPlan({ emergencyContact: e.target.value })}
                placeholder="e.g. Uncle David (+1 555-019-2831, Out-of-town)"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-teal-500 text-sm"
              />
              <span className="text-[11px] text-slate-500">
                Tip: Out-of-town contacts are often easier to reach during local phone circuit overload.
              </span>
            </div>

            {/* Medical / Accessibility Needs */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <HeartPulse className="w-3.5 h-3.5 text-rose-400" />
                <span>Medical / Accessibility Needs</span>
              </label>
              <input
                type="text"
                value={familyPlan.medicalNeeds}
                onChange={(e) => updateFamilyPlan({ medicalNeeds: e.target.value })}
                placeholder="e.g. Insulin refrigeration, wheelchair assistance, infant formula"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-teal-500 text-sm"
              />
              <span className="text-[11px] text-slate-500">
                Special medical items that must travel with the group.
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Info className="w-4 h-4 text-teal-400 shrink-0" />
              <span>Data stored locally on your device only. Privacy protected.</span>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-sm uppercase tracking-wider transition shadow-lg shadow-teal-500/20 active:scale-95 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>SAVE SAFETY PLAN</span>
            </button>
          </div>
        </form>
      </div>

      {/* Saved Plan Summary Card (Printable) */}
      {isConfigured && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase text-teal-400">
                ACTIVE DOCUMENT
              </span>
              <h3 className="text-xl font-bold text-white">
                {familyPlan.groupName} — Emergency Plan Card
              </h3>
            </div>
            <span className="px-2.5 py-1 rounded bg-teal-950 border border-teal-800 text-teal-300 text-xs font-bold">
              {familyPlan.peopleCount} Members
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
              <div className="font-bold text-slate-400 uppercase tracking-wider text-[11px]">
                Primary Meeting Site
              </div>
              <div className="text-sm font-semibold text-white">
                {familyPlan.primaryLocation}
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
              <div className="font-bold text-slate-400 uppercase tracking-wider text-[11px]">
                Backup Meeting Site
              </div>
              <div className="text-sm font-semibold text-white">
                {familyPlan.backupLocation || 'Not specified'}
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
              <div className="font-bold text-slate-400 uppercase tracking-wider text-[11px]">
                Emergency Contact
              </div>
              <div className="text-sm font-semibold text-white">
                {familyPlan.emergencyContact}
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
              <div className="font-bold text-slate-400 uppercase tracking-wider text-[11px]">
                Medical / Accessibility Needs
              </div>
              <div className="text-sm font-semibold text-white">
                {familyPlan.medicalNeeds || 'None listed'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Footer */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-sm font-bold text-white">Next: Configure Emergency Contacts</div>
          <div className="text-xs text-slate-400">
            Store essential local dispatch and medical helpline numbers.
          </div>
        </div>

        <button
          onClick={() => {
            setActiveTab('contacts');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs sm:text-sm tracking-wide transition shadow-md shrink-0 cursor-pointer"
        >
          <span>EMERGENCY CONTACTS</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

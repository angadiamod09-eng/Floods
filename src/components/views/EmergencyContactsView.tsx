import React, { useState } from 'react';
import { useFloodSafe } from '../../context/FloodSafeContext';
import {
  PhoneCall,
  Save,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  PhoneForwarded,
  Info,
  Shield,
  ArrowRight,
} from 'lucide-react';

export const EmergencyContactsView: React.FC = () => {
  const { contacts, updateContacts, saveContacts, resetContacts, setActiveTab } =
    useFloodSafe();

  const [savedNotice, setSavedNotice] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveContacts();
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3500);
  };

  const hasAnyNumber =
    contacts.localEmergency ||
    contacts.familyContactPhone ||
    contacts.localAuthority ||
    contacts.medicalContactPhone;

  return (
    <div className="space-y-8 py-4 max-w-4xl mx-auto">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950 border border-blue-800 text-blue-300 text-xs font-semibold">
          <PhoneCall className="w-3.5 h-3.5" />
          <span>Local Communications Directory</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Emergency Contacts Directory
        </h1>
        <p className="text-sm sm:text-base text-slate-300">
          In severe floods, search engines and power grids may be unreachable. Save confirmed local numbers now for offline access.
        </p>
      </div>

      {/* Mandatory Verification Warning */}
      <div className="bg-amber-950/50 border border-amber-800/80 rounded-2xl p-5 flex items-start gap-4 text-amber-200">
        <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wide">
            Notice: Verification Required
          </h3>
          <p className="text-xs sm:text-sm text-amber-200/90 leading-relaxed font-medium">
            &ldquo;Verify emergency contact numbers with your local authorities.&rdquo;
          </p>
          <p className="text-xs text-amber-200/70">
            Emergency dispatch numbers vary by city, municipality, and region (e.g. 911 in North America, 112 in the European Union and parts of India, 999 in the UK). Check your local flood control bureau or police hotline.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Local Emergency Number */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                Local Emergency Dispatch Number
              </label>
              <input
                type="text"
                value={contacts.localEmergency}
                onChange={(e) => updateContacts({ localEmergency: e.target.value })}
                placeholder="e.g. 911 / 112 / 999 / Local Fire Station"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 text-sm"
              />
              <span className="text-[11px] text-slate-500">
                Primary response number for life-threatening flood danger.
              </span>
            </div>

            {/* Local Authority Contact */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                Local Authority / Flood Control Room
              </label>
              <input
                type="text"
                value={contacts.localAuthority}
                onChange={(e) => updateContacts({ localAuthority: e.target.value })}
                placeholder="e.g. Municipal Disaster Desk or City Helpline"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 text-sm"
              />
              <span className="text-[11px] text-slate-500">
                Local agency monitoring river levels, dam releases, and shelter openings.
              </span>
            </div>

            {/* Family Contact Name */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                Designated Family Contact Name
              </label>
              <input
                type="text"
                value={contacts.familyContactName}
                onChange={(e) => updateContacts({ familyContactName: e.target.value })}
                placeholder="e.g. Sarah Miller (Sister / Out-of-area)"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 text-sm"
              />
            </div>

            {/* Family Contact Phone */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                Family Contact Phone Number
              </label>
              <input
                type="tel"
                value={contacts.familyContactPhone}
                onChange={(e) => updateContacts({ familyContactPhone: e.target.value })}
                placeholder="e.g. +1 555-014-9982"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 text-sm"
              />
            </div>

            {/* Medical Contact Name */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                Medical / Physician Contact Name
              </label>
              <input
                type="text"
                value={contacts.medicalContactName}
                onChange={(e) => updateContacts({ medicalContactName: e.target.value })}
                placeholder="e.g. Dr. Roberts / Metro General Urgent Care"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 text-sm"
              />
            </div>

            {/* Medical Contact Phone */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                Medical Contact Phone Number
              </label>
              <input
                type="tel"
                value={contacts.medicalContactPhone}
                onChange={(e) => updateContacts({ medicalContactPhone: e.target.value })}
                placeholder="e.g. +1 555-012-3400"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 text-sm"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              {savedNotice && (
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 animate-fadeIn">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Contacts updated and saved locally!</span>
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={resetContacts}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition"
              >
                Reset
              </button>
              <button
                type="submit"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-sm uppercase tracking-wider transition shadow-lg shadow-teal-500/20 active:scale-95 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>SAVE CONTACTS</span>
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Quick Dial Cards if configured */}
      {hasAnyNumber && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <PhoneForwarded className="w-5 h-5 text-teal-400" />
            <span>Saved Emergency Directory (Offline Quick-Access)</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {contacts.localEmergency && (
              <div className="bg-slate-950 p-4 rounded-xl border border-red-900/60 space-y-2">
                <div className="text-[11px] text-red-400 font-bold uppercase">
                  Emergency Dispatch
                </div>
                <div className="text-base font-black text-white font-mono truncate">
                  {contacts.localEmergency}
                </div>
                <a
                  href={`tel:${contacts.localEmergency}`}
                  className="inline-flex items-center gap-1.5 text-xs text-red-400 font-bold hover:underline"
                >
                  <PhoneCall className="w-3.5 h-3.5" /> Call Now
                </a>
              </div>
            )}

            {contacts.localAuthority && (
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="text-[11px] text-blue-400 font-bold uppercase">
                  Local Authority
                </div>
                <div className="text-base font-black text-white font-mono truncate">
                  {contacts.localAuthority}
                </div>
                <a
                  href={`tel:${contacts.localAuthority}`}
                  className="inline-flex items-center gap-1.5 text-xs text-blue-400 font-bold hover:underline"
                >
                  <PhoneCall className="w-3.5 h-3.5" /> Call Bureau
                </a>
              </div>
            )}

            {contacts.familyContactPhone && (
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="text-[11px] text-teal-400 font-bold uppercase truncate">
                  {contacts.familyContactName || 'Family Contact'}
                </div>
                <div className="text-base font-black text-white font-mono truncate">
                  {contacts.familyContactPhone}
                </div>
                <a
                  href={`tel:${contacts.familyContactPhone}`}
                  className="inline-flex items-center gap-1.5 text-xs text-teal-400 font-bold hover:underline"
                >
                  <PhoneCall className="w-3.5 h-3.5" /> Call Family
                </a>
              </div>
            )}

            {contacts.medicalContactPhone && (
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="text-[11px] text-rose-400 font-bold uppercase truncate">
                  {contacts.medicalContactName || 'Medical Doctor'}
                </div>
                <div className="text-base font-black text-white font-mono truncate">
                  {contacts.medicalContactPhone}
                </div>
                <a
                  href={`tel:${contacts.medicalContactPhone}`}
                  className="inline-flex items-center gap-1.5 text-xs text-rose-400 font-bold hover:underline"
                >
                  <PhoneCall className="w-3.5 h-3.5" /> Call Clinic
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Navigation Footer */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-sm font-bold text-white">Next: Post-Flood Recovery Guide</div>
          <div className="text-xs text-slate-400">
            Learn crucial steps for when floodwaters begin to recede safely.
          </div>
        </div>

        <button
          onClick={() => {
            setActiveTab('recovery');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs sm:text-sm tracking-wide transition shadow-md shrink-0 cursor-pointer"
        >
          <span>RECOVERY GUIDE</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

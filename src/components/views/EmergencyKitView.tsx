import React from 'react';
import { useFloodSafe } from '../../context/FloodSafeContext';
import {
  Package,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  Droplet,
  Utensils,
  PlusCircle,
  Check,
  XCircle,
} from 'lucide-react';

export const EmergencyKitView: React.FC = () => {
  const {
    kitItems,
    toggleKitItem,
    resetKitItems,
    kitReadiness,
    missingKitItems,
    setActiveTab,
  } = useFloodSafe();

  const safeKitItems = Array.isArray(kitItems) ? kitItems : [];
  const selectedItems = safeKitItems.filter((i) => i?.selected);
  const safeMissing = Array.isArray(missingKitItems) ? missingKitItems : [];

  const handleSelectAll = () => {
    safeKitItems.forEach((i) => {
      if (!i?.selected) toggleKitItem(i.id);
    });
  };

  return (
    <div className="space-y-8 py-4 max-w-4xl mx-auto">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950 border border-teal-800 text-teal-300 text-xs font-semibold">
          <Package className="w-3.5 h-3.5" />
          <span>Go-Bag &amp; Evacuation Supplies</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Emergency Kit Builder
        </h1>
        <p className="text-sm sm:text-base text-slate-300">
          When floodwaters rise, municipal utilities fail and emergency supplies become unreachable. Build a portable, waterproof grab-and-go kit for every member of your household.
        </p>
      </div>

      {/* Readiness Status Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Emergency Kit Readiness
            </div>
            <div className="text-3xl font-black text-white mt-0.5 flex items-baseline gap-2">
              <span
                className={`${
                  kitReadiness >= 80
                    ? 'text-teal-400'
                    : kitReadiness >= 50
                    ? 'text-amber-400'
                    : 'text-rose-400'
                }`}
              >
                {kitReadiness}%
              </span>
              <span className="text-xs text-slate-400 font-normal">
                ({selectedItems.length} of {kitItems.length} packed)
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleSelectAll}
              className="px-3 py-1.5 rounded-lg bg-teal-950 border border-teal-800 text-teal-300 hover:bg-teal-900 text-xs font-semibold transition"
            >
              Select All
            </button>
            <button
              onClick={resetKitItems}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-semibold transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>RESET KIT</span>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-3.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
          <div
            className={`h-full transition-all duration-300 ${
              kitReadiness >= 80
                ? 'bg-gradient-to-r from-teal-500 to-emerald-400'
                : kitReadiness >= 50
                ? 'bg-gradient-to-r from-amber-500 to-yellow-400'
                : 'bg-gradient-to-r from-rose-500 to-amber-500'
            }`}
            style={{ width: `${kitReadiness}%` }}
          />
        </div>

        {/* Missing Items Warning or 100% Celebration */}
        {safeMissing.length > 0 ? (
          <div className="bg-amber-950/40 border border-amber-800/60 rounded-xl p-4 text-xs space-y-2">
            <div className="flex items-center gap-2 text-amber-300 font-bold uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Missing Essential Items ({safeMissing.length}):</span>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {safeMissing.map((item) => (
                <button
                  key={item.id}
                  onClick={() => toggleKitItem(item.id)}
                  className="px-2.5 py-1 rounded bg-slate-900/90 hover:bg-slate-800 border border-amber-700/50 text-amber-200 text-xs flex items-center gap-1.5 transition"
                  title="Click to mark as packed"
                >
                  <PlusCircle className="w-3 h-3 text-amber-400" />
                  <span>{item.name}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-emerald-950/80 border border-emerald-700/80 rounded-xl p-4 flex items-center gap-3 text-emerald-200">
            <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
            <div>
              <div className="font-bold text-sm text-emerald-300">
                Emergency Kit fully equipped!
              </div>
              <div className="text-xs text-emerald-200/80">
                All 12 life-saving items are checked and ready for rapid evacuation.
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Kit Items Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
            Select Your Kit Items
          </h2>
          <span className="text-xs text-slate-500">Click to toggle item in your go-bag</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {kitItems.map((item) => {
            const isPacked = item.selected;
            return (
              <div
                key={item.id}
                onClick={() => toggleKitItem(item.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer select-none flex flex-col justify-between ${
                  isPacked
                    ? 'bg-slate-900/90 border-teal-500/70 shadow-md shadow-teal-500/5'
                    : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 opacity-90'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-bold text-white text-base leading-snug">
                      {item.name}
                    </span>
                    <div
                      className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 border transition ${
                        isPacked
                          ? 'bg-teal-500 border-teal-400 text-slate-950 font-black'
                          : 'bg-slate-800 border-slate-700 text-slate-500'
                      }`}
                    >
                      {isPacked ? <Check className="w-4 h-4 stroke-[3]" /> : null}
                    </div>
                  </div>

                  <div className="text-xs text-teal-400 font-medium">
                    {item.recommendedQuantity}
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed pt-1">
                    {item.whyNeeded}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                  <span className={isPacked ? 'text-teal-400 font-semibold' : 'text-slate-500'}>
                    {isPacked ? '✓ Packed in Kit' : '+ Not yet packed'}
                  </span>
                  <span className="text-slate-500 text-[10px] uppercase font-mono tracking-wider">
                    {item.category.replace('_', ' ')}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Current Packed Inventory Preview */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Package className="w-5 h-5 text-teal-400" />
          <span>Your Emergency Kit</span>
        </h3>

        {selectedItems.length === 0 ? (
          <p className="text-xs text-slate-400 italic">
            No items selected yet. Tap the items above to add them to your emergency kit.
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {selectedItems.map((item) => (
              <span
                key={item.id}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-950/80 border border-teal-800 text-teal-200 text-xs font-medium"
              >
                <Check className="w-3.5 h-3.5 text-teal-400" />
                <span>{item.name}</span>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-sm font-bold text-white">Next: Test Emergency Decision Skills</div>
          <div className="text-xs text-slate-400">
            Practice real flood scenarios in the interactive decision simulator.
          </div>
        </div>

        <button
          onClick={() => {
            setActiveTab('simulator');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs sm:text-sm tracking-wide transition shadow-md shrink-0 cursor-pointer"
        >
          <span>GO TO SIMULATOR</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

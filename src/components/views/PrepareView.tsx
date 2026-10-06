import React from 'react';
import { useFloodSafe } from '../../context/FloodSafeContext';
import {
  CheckSquare,
  Square,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Package,
} from 'lucide-react';

export const PrepareView: React.FC = () => {
  const {
    prepareChecklist,
    togglePrepareItem,
    resetPrepareChecklist,
    prepareProgress,
    setActiveTab,
  } = useFloodSafe();

  const isCompleted = prepareProgress === 100;
  const completedCount = prepareChecklist.filter((item) => item.completed).length;

  return (
    <div className="space-y-8 py-4 max-w-4xl mx-auto">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950 border border-teal-800 text-teal-300 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Pre-Emergency Phase</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Prepare Before a Flood
        </h1>
        <p className="text-sm sm:text-base text-slate-300">
          Proactive preparation dramatically cuts risk of injury, electrocution, and property loss. Complete each critical item before water levels rise.
        </p>
      </div>

      {/* Progress Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Checklist Status
            </div>
            <div className="text-2xl font-black text-white mt-0.5">
              Preparation: <span className="text-teal-400">{prepareProgress}%</span>
            </div>
            <div className="text-xs text-slate-400 mt-1">
              {completedCount} of {prepareChecklist.length} precautions completed
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={resetPrepareChecklist}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>RESET CHECKLIST</span>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
          <div
            className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 transition-all duration-300"
            style={{ width: `${prepareProgress}%` }}
          />
        </div>

        {/* Completion Banner */}
        {isCompleted && (
          <div className="bg-emerald-950/80 border border-emerald-700/80 rounded-xl p-4 flex items-center gap-3 text-emerald-200">
            <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
            <div>
              <div className="font-bold text-sm text-emerald-300">
                Preparation checklist completed.
              </div>
              <div className="text-xs text-emerald-200/80">
                Your home and immediate pre-flood precautions are verified. Proceed to assemble and inspect your physical emergency kit.
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Checklist Items */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 px-1">
          Essential Pre-Flood Precautions
        </h2>

        <div className="space-y-2.5">
          {prepareChecklist.map((item, idx) => {
            const checked = item.completed;
            return (
              <div
                key={item.id}
                onClick={() => togglePrepareItem(item.id)}
                className={`flex items-start gap-4 p-4 rounded-xl border transition-all cursor-pointer select-none ${
                  checked
                    ? 'bg-slate-900/60 border-teal-800/80 text-slate-200'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300'
                }`}
              >
                <button
                  type="button"
                  className="mt-0.5 text-teal-400 focus:outline-none shrink-0"
                  aria-label={`Toggle ${item.label}`}
                >
                  {checked ? (
                    <CheckSquare className="w-5 h-5 text-teal-400" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-500 hover:text-slate-400" />
                  )}
                </button>

                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-500">#{idx + 1}</span>
                    <span
                      className={`text-sm sm:text-base font-semibold leading-tight ${
                        checked ? 'text-teal-200 line-through opacity-85' : 'text-white'
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                  {item.details && (
                    <p className="text-xs text-slate-400 leading-relaxed pr-2">
                      {item.details}
                    </p>
                  )}
                </div>

                {checked && (
                  <span className="shrink-0 px-2 py-0.5 rounded text-[10px] font-bold bg-teal-950 border border-teal-800 text-teal-400">
                    DONE
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-950 border border-teal-800 flex items-center justify-center text-teal-400">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-white">Next Step: Build Your Emergency Kit</div>
            <div className="text-xs text-slate-400">
              Verify your physical go-bag with essential food, water, and illumination tools.
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            setActiveTab('kit');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs sm:text-sm tracking-wide transition shadow-md shrink-0 cursor-pointer"
        >
          <span>BUILD EMERGENCY KIT</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
